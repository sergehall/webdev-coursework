import { ESLint } from "eslint";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import base from "./eslint-base.cjs";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const scopes = ["root", "frontend", "backend"];
const defaultPatterns = base.codeFiles;
const args = process.argv.slice(2);
const fix = args.includes("--fix");
const positionalArgs = args.filter((arg) => arg !== "--fix");
const [scope, ...patterns] = positionalArgs;

if (scope && !scopes.includes(scope)) {
  console.error(
    "Usage: yarn node scripts/run-eslint.mjs [root|frontend|backend] [--fix] [patterns...]"
  );
  process.exit(1);
}

let hasErrors = false;

// Visit every scope even when an earlier scope has lint errors.
for (const currentScope of scope ? [scope] : scopes) {
  const cwd =
    currentScope === "root" ? repoRoot : path.join(repoRoot, currentScope);
  const configUrl = pathToFileURL(path.join(cwd, "eslint.config.js")).href;
  const configModule = await import(configUrl);
  const eslint = new ESLint({
    cwd,
    fix,
    overrideConfig: configModule.default ?? configModule,
    overrideConfigFile: true,
  });
  const results = await eslint.lintFiles(
    patterns.length ? patterns : defaultPatterns
  );

  if (fix) {
    await ESLint.outputFixes(results);
  }

  const formatter = await eslint.loadFormatter("stylish");
  const output = await formatter.format(results);
  console.log(`${currentScope}: checked ${results.length} files`);

  if (output) {
    process.stdout.write(output);
  }

  hasErrors ||= results.some(
    (result) => result.errorCount > 0 || result.fatalErrorCount > 0
  );
}

process.exitCode = hasErrors ? 1 : 0;
