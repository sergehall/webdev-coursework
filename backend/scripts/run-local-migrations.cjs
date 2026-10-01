const { resolve } = require("node:path");
process.loadEnvFile(resolve(__dirname, "../.env.local"));
const destination = new URL(process.env.DATABASE_URL || "");
if (
  destination.hostname !== "127.0.0.1" ||
  destination.port !== "55432" ||
  destination.pathname !== "/webdev_coursework_local"
)
  throw new Error("This script is restricted to the dedicated local database");
require("ts-node/register");
const { AppDataSource } = require("../src/db/data-source");
const { DataSource } = require("typeorm");
const localDatabase = new DataSource({
  ...AppDataSource.options,
  logging: false,
});
(async () => {
  try {
    await localDatabase.initialize();
    const migrations = await localDatabase.runMigrations();
    console.log(
      "Local migrations applied:",
      migrations.map((m) => m.name)
    );
  } catch {
    console.error(
      "Local migration failed; check local database availability. Credential values are not printed."
    );
    process.exitCode = 1;
  } finally {
    if (localDatabase.isInitialized) await localDatabase.destroy();
  }
})();
