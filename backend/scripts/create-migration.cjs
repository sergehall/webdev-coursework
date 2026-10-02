const { spawnSync } = require("node:child_process");
const { existsSync, readFileSync, writeFileSync } = require("node:fs");
const { resolve } = require("node:path");
const prettier = require("prettier");
const { planMigration } = require("./migration-layout.cjs");

async function main() {
  const [mode, name, ...flags] = process.argv.slice(2);
  if (["--help", "-h"].includes(name)) {
    console.log(
      "Usage: yarn migration:create <PascalCaseName>\n       yarn migration:generate <PascalCaseName> [--pretty] [--dryrun] [--check]\nFiles use src/db/migrations/YYYY/MM/<timestamp>-<name>.ts (UTC)."
    );
    return;
  }
  const allowedFlags =
    mode === "generate" ? ["--pretty", "--dryrun", "--check"] : [];
  for (const flag of flags) {
    if (!allowedFlags.includes(flag))
      throw new Error(`Unsupported option: ${flag}`);
  }
  const plan = planMigration(mode, name);
  const cli = require.resolve(
    mode === "generate" ? "typeorm/cli-ts-node-commonjs.js" : "typeorm/cli.js"
  );
  const result = spawnSync(process.execPath, [cli, ...plan.args, ...flags], {
    cwd: resolve(__dirname, ".."),
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
  if (process.exitCode === 0 && existsSync(plan.file)) {
    const config = await prettier.resolveConfig(plan.file);
    writeFileSync(
      plan.file,
      await prettier.format(readFileSync(plan.file, "utf8"), {
        ...config,
        filepath: plan.file,
      })
    );
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
