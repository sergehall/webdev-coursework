// Run only this account feature's migrations; never apply unrelated course migrations.
require("reflect-metadata");
const { DataSource } = require("typeorm");
const { AppDataSource } = require("../dist/db/data-source");
const {
  AddQrAnalytics1790899200000,
} = require("../dist/db/migrations/1790899200000-AddQrAnalytics");
const {
  AddPublicAccounts1790902800000,
} = require("../dist/db/migrations/1790902800000-AddPublicAccounts");
const {
  UseAdminAndClientRoles1790906400000,
} = require("../dist/db/migrations/1790906400000-UseAdminAndClientRoles");
const {
  IndexSecurityActivity1790910000000,
} = require("../dist/db/migrations/1790910000000-IndexSecurityActivity");
const {
  AddAccountMfa1790913600000,
} = require("../dist/db/migrations/1790913600000-AddAccountMfa");
const {
  AddAccountPreferences1790917200000,
} = require("../dist/db/migrations/1790917200000-AddAccountPreferences");
const {
  AddAccountSessions1790920800000,
} = require("../dist/db/migrations/1790920800000-AddAccountSessions");
const db = new DataSource({
  ...AppDataSource.options,
  logging: false,
  synchronize: false,
  migrations: [
    AddQrAnalytics1790899200000,
    AddPublicAccounts1790902800000,
    UseAdminAndClientRoles1790906400000,
    IndexSecurityActivity1790910000000,
    AddAccountMfa1790913600000,
    AddAccountPreferences1790917200000,
    AddAccountSessions1790920800000,
    require("../dist/db/migrations/1790924400000-AddAccountProviders")
      .AddAccountProviders1790924400000,
  ],
});
(async () => {
  try {
    const target = new URL(process.env.DATABASE_URL || "");
    if (
      !process.env.DYNO &&
      !(
        target.hostname === "127.0.0.1" &&
        target.port === "55432" &&
        target.pathname === "/webdev_coursework_local"
      )
    )
      throw new Error("Unapproved destination");
    await db.initialize();
    const applied = await db.runMigrations();
    if (await db.showMigrations())
      throw new Error("Account migrations remain pending");
    console.log(
      "Account migrations applied:",
      applied.map((m) => m.name)
    );
    console.log(
      "Account migration verification passed: no pending migrations."
    );
  } catch {
    console.error(
      "Account migrations failed; database credentials and private error details suppressed."
    );
    process.exitCode = 1;
  } finally {
    if (db.isInitialized) await db.destroy();
  }
})();
