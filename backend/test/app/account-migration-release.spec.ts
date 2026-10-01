import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const source = readFileSync(
  resolve(__dirname, "../../scripts/run-account-migrations.cjs"),
  "utf8"
);

async function runRelease(pending = false, failure?: Error) {
  const db = {
    isInitialized: false,
    initialize: jest.fn(async () => {
      db.isInitialized = true;
    }),
    runMigrations: jest.fn(async () => {
      if (failure) throw failure;
      return [];
    }),
    showMigrations: jest.fn(async () => pending),
    destroy: jest.fn(),
  };
  const process = {
    env: {
      DYNO: "release.1",
      DATABASE_URL: "postgres://localhost/release_test",
    },
    exitCode: undefined,
  };
  const console = { log: jest.fn(), error: jest.fn() };
  await runInNewContext(source, {
    require: (name: string) => {
      if (name === "typeorm")
        return {
          DataSource: class {
            constructor() {
              return db;
            }
          },
        };
      if (name === "../dist/db/data-source")
        return { AppDataSource: { options: {} } };
      return {};
    },
    URL,
    process,
    console,
  });
  return { db, process, console };
}

describe("Account migrations release gate", () => {
  it("runs and verifies migrations even when none were newly applied", async () => {
    const { db, process, console } = await runRelease();
    expect(db.runMigrations).toHaveBeenCalledTimes(1);
    expect(db.showMigrations).toHaveBeenCalledTimes(1);
    expect(process.exitCode).toBeUndefined();
    expect(console.log).toHaveBeenCalledWith(
      "Account migration verification passed: no pending migrations."
    );
    expect(db.destroy).toHaveBeenCalledTimes(1);
  });

  it("blocks release when migrations remain pending", async () => {
    const { db, process, console } = await runRelease(true);
    expect(process.exitCode).toBe(1);
    expect(console.log).not.toHaveBeenCalled();
    expect(db.destroy).toHaveBeenCalledTimes(1);
  });

  it("blocks release on migration errors without exposing private details", async () => {
    const { db, process, console } = await runRelease(
      false,
      new Error("private database credentials")
    );
    expect(process.exitCode).toBe(1);
    expect(db.showMigrations).not.toHaveBeenCalled();
    expect(JSON.stringify(console.error.mock.calls)).not.toContain(
      "private database credentials"
    );
    expect(db.destroy).toHaveBeenCalledTimes(1);
  });

  it("registers the account runner as the Heroku release process", () => {
    const procfile = readFileSync(
      resolve(__dirname, "../../../Procfile"),
      "utf8"
    );
    expect(procfile).toMatch(
      /^release: yarn --cwd backend migration:run:accounts$/m
    );
  });
});
