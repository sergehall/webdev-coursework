import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { createRequire } from "node:module";
import { DataSource } from "typeorm";

interface MigrationFile {
  timestamp: number;
  name: string;
  className: string;
  file: string;
}
interface MigrationPlan {
  timestamp: number;
  file: string;
  args: string[];
}
const { migrationDirectory, readMigrations, planMigration } = createRequire(
  __filename
)("../../scripts/migration-layout.cjs") as {
  migrationDirectory: (timestamp: number) => string;
  readMigrations: (root?: string) => MigrationFile[];
  planMigration: (
    mode: string,
    name: string,
    options?: { root: string; now: number }
  ) => MigrationPlan;
};

const existingNames = [
  "PrefixQuizTablesWithWebdev1778371200000",
  "AddQrAnalytics1790899200000",
  "AddPublicAccounts1790902800000",
  "UseAdminAndClientRoles1790906400000",
  "IndexSecurityActivity1790910000000",
  "AddAccountMfa1790913600000",
  "AddAccountPreferences1790917200000",
  "AddAccountSessions1790920800000",
  "AddAccountProviders1790924400000",
];

function writeMigration(root: string, timestamp: number, name = "First") {
  const directory = join(root, migrationDirectory(timestamp));
  mkdirSync(directory, { recursive: true });
  const file = join(directory, `${timestamp}-${name}.ts`);
  writeFileSync(
    file,
    `export class ${name}${timestamp} implements MigrationInterface {}`
  );
  return file;
}

class MetadataDataSource extends DataSource {
  loadMetadata() {
    return this.buildMetadatas();
  }
}

describe("Migration layout and generation", () => {
  let root: string;
  const now = Date.UTC(2027, 0, 1, 0, 0, 0);

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), "webdev-migrations-"));
  });
  afterEach(() => rmSync(root, { recursive: true, force: true }));

  it("uses UTC at year/month boundaries regardless of the local calendar", () => {
    expect(migrationDirectory(now - 1)).toBe("2026/12");
    expect(migrationDirectory(now)).toBe("2027/01");
    expect(migrationDirectory(Date.UTC(2028, 1, 29))).toBe("2028/02");
    expect(migrationDirectory(Date.UTC(2028, 2, 1))).toBe("2028/03");
  });

  it("routes create and generate to the same dated TypeScript filename", () => {
    for (const mode of ["create", "generate"]) {
      const plan = planMigration(mode, "AddUserPreferences", { root, now });
      expect(plan.file).toBe(
        join(root, "2027/01", `${now}-AddUserPreferences.ts`)
      );
      expect(plan.args.slice(0, 4)).toEqual([
        `migration:${mode}`,
        join(root, "2027/01/AddUserPreferences"),
        "--timestamp",
        String(now),
      ]);
      expect(plan.args.includes("--dataSource")).toBe(mode === "generate");
    }
  });

  it("keeps timestamps unique when two migrations use the same millisecond", () => {
    writeMigration(root, now);
    expect(planMigration("create", "Second", { root, now }).timestamp).toBe(
      now + 1
    );
  });

  it("detects a clock older than migration history instead of backdating", () => {
    writeMigration(root, now + 1000);
    expect(() => planMigration("create", "Second", { root, now })).toThrow(
      "dated in the future"
    );
  });

  it.each(["../Escape", "src/db/migrations/Name", "add-users", "Name.ts", ""])(
    "rejects invalid names and paths: %s",
    (name) => {
      expect(() => planMigration("create", name, { root, now })).toThrow(
        "PascalCase"
      );
    }
  );

  it.each([0, Number.NaN, now + 0.5, -now])(
    "rejects invalid timestamps: %s",
    (timestamp) => {
      expect(() => migrationDirectory(timestamp)).toThrow("timestamp");
    }
  );

  it("rejects misplaced files and duplicate timestamps", () => {
    writeFileSync(join(root, `${now}-WrongFolder.ts`), "");
    expect(() => readMigrations(root)).toThrow("must be stored");
    rmSync(join(root, `${now}-WrongFolder.ts`));
    writeMigration(root, now, "First");
    writeMigration(root, now, "Second");
    expect(() => readMigrations(root)).toThrow("Duplicate migration timestamp");
  });

  it("rejects filenames whose class or explicit name changes migration identity", () => {
    const file = writeMigration(root, now);
    writeFileSync(
      file,
      `export class Wrong${now} implements MigrationInterface {}`
    );
    expect(() => readMigrations(root)).toThrow("class/name must match");
    writeFileSync(
      file,
      `export class First${now} implements MigrationInterface { name = "Other${now}"; }`
    );
    expect(() => readMigrations(root)).toThrow("class/name must match");
  });

  it("preserves every historical migration identity in chronological order", () => {
    expect(readMigrations().map((migration) => migration.className)).toEqual(
      existingNames
    );
  });

  it("ignores class/name examples in comments and SQL strings", () => {
    const file = writeMigration(root, now);
    writeFileSync(
      file,
      `// export class Example1234567890123 {}\nexport class First${now} implements MigrationInterface {\n  name = "First${now}";\n  async up(q: QueryRunner) { await q.query("UPDATE example SET name = 'Changed'"); }\n}`
    );
    expect(readMigrations(root)[0].className).toBe(`First${now}`);
  });

  it("loads all nested migrations with TypeORM without opening a connection", async () => {
    const db = new MetadataDataSource({
      type: "postgres",
      entities: [],
      migrations: [resolve(__dirname, "../../src/db/migrations/**/*.ts")],
    });
    await db.loadMetadata();
    expect(
      db.migrations
        .map((migration) => migration.name ?? migration.constructor.name)
        .sort((a, b) => Number(a.slice(-13)) - Number(b.slice(-13)))
    ).toEqual(existingNames);
    expect(db.isInitialized).toBe(false);
  });
});
