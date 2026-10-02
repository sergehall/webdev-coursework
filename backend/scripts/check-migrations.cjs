const { readMigrations, migrationRoot } = require("./migration-layout.cjs");

try {
  const migrations = readMigrations();
  console.log(
    `Migration layout verified: ${migrations.length} migrations in ${migrationRoot} (UTC year/month).`
  );
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
