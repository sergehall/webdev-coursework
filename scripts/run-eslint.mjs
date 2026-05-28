import { ESLint } from "eslint";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const workspaceDefaults = {
  frontend: {
    patterns: ["**/*.{js,jsx,ts,tsx}"],
  },
  backend: {
    patterns: ["{src,apps,libs,test}/**/*.ts"],
  },
};

const [workspace, ...rawArgs] = process.argv.slice(2);

if (!workspace || !workspaceDefaults[workspace]) {
  console.error(
    "Usage: yarn node scripts/run-eslint.mjs <frontend|backend> [--fix] [patterns...]",
  );
  process.exit(1);
}

const fix = rawArgs.includes("--fix");
const patterns = rawArgs.filter((arg) => arg !== "--fix");
const cwd = path.join(repoRoot, workspace);
const configUrl = pathToFileURL(path.join(cwd, "eslint.config.js")).href;
const configModule = await import(configUrl);
const config = configModule.default ?? configModule;

const eslint = new ESLint({
  cwd,
  fix,
  overrideConfig: config,
  overrideConfigFile: true,
});

const results = await eslint.lintFiles(
  patterns.length > 0 ? patterns : workspaceDefaults[workspace].patterns,
);

if (fix) {
  await ESLint.outputFixes(results);
}

const formatter = await eslint.loadFormatter("stylish");
const output = await formatter.format(results);

if (output) {
  process.stdout.write(output);
}

const hasErrors = results.some(
  (result) => result.errorCount > 0 || result.fatalErrorCount > 0,
);

process.exit(hasErrors ? 1 : 0);
