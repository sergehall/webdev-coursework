const { readdirSync, readFileSync } = require("node:fs");
const { resolve, relative, join, sep } = require("node:path");
const ts = require("typescript");

const migrationRoot = resolve(__dirname, "../src/db/migrations");
const migrationNamePattern = /^[A-Z][A-Za-z0-9]*$/;

function migrationDirectory(timestamp) {
  if (!Number.isSafeInteger(timestamp) || !/^\d{13}$/.test(String(timestamp))) {
    throw new Error(
      "Migration timestamp must be a 13-digit Unix timestamp in milliseconds"
    );
  }
  const date = new Date(timestamp);
  return `${date.getUTCFullYear()}/${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

function readMigrations(root = migrationRoot) {
  const migrations = [];
  const timestamps = new Set();
  function visit(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(file);
      } else if (entry.name.endsWith(".ts")) {
        const match = /^(\d{13})-([A-Z][A-Za-z0-9]*)\.ts$/.exec(entry.name);
        if (!match)
          throw new Error(
            `Invalid migration filename: ${relative(root, file)}`
          );
        const timestamp = Number(match[1]);
        const expected = `${migrationDirectory(timestamp)}/${entry.name}`;
        const actual = relative(root, file).split(sep).join("/");
        if (actual !== expected)
          throw new Error(`Migration must be stored at ${expected}: ${actual}`);
        if (timestamps.has(timestamp))
          throw new Error(`Duplicate migration timestamp: ${timestamp}`);
        timestamps.add(timestamp);
        const className = `${match[2]}${timestamp}`;
        const source = ts.createSourceFile(
          file,
          readFileSync(file, "utf8"),
          ts.ScriptTarget.Latest,
          true
        );
        const classes = source.statements.filter(
          (statement) =>
            ts.isClassDeclaration(statement) &&
            statement.modifiers?.some(
              (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword
            )
        );
        const declaredClass = classes[0];
        const nameProperty = declaredClass?.members.find(
          (member) =>
            ts.isPropertyDeclaration(member) &&
            member.name?.getText(source) === "name"
        );
        const declaredName = nameProperty?.initializer;
        if (
          classes.length !== 1 ||
          declaredClass?.name?.text !== className ||
          (nameProperty &&
            (!declaredName ||
              !ts.isStringLiteral(declaredName) ||
              declaredName.text !== className))
        ) {
          throw new Error(
            `Migration class/name must match ${className}: ${actual}`
          );
        }
        migrations.push({ timestamp, name: match[2], className, file });
      }
    }
  }
  visit(root);
  return migrations.sort((a, b) => a.timestamp - b.timestamp);
}

function planMigration(mode, name, options = {}) {
  if (!["create", "generate"].includes(mode))
    throw new Error("Use migration:create or migration:generate");
  if (!migrationNamePattern.test(name ?? "")) {
    throw new Error(
      "Provide a PascalCase migration name only, for example AddUserPreferences (no path or extension)"
    );
  }
  const root = options.root ?? migrationRoot;
  const now = options.now ?? Date.now();
  migrationDirectory(now);
  const migrations = readMigrations(root);
  const latest = migrations.at(-1)?.timestamp ?? 0;
  if (latest > now)
    throw new Error(
      "Latest migration is dated in the future; check the system clock before creating a migration"
    );
  const timestamp = Math.max(now, latest + 1);
  const target = join(root, migrationDirectory(timestamp), name);
  const args = [`migration:${mode}`, target, "--timestamp", String(timestamp)];
  if (mode === "generate")
    args.push("--dataSource", resolve(__dirname, "../src/db/data-source.ts"));
  return {
    timestamp,
    args,
    file: join(root, migrationDirectory(timestamp), `${timestamp}-${name}.ts`),
  };
}

module.exports = {
  migrationRoot,
  migrationDirectory,
  readMigrations,
  planMigration,
};
