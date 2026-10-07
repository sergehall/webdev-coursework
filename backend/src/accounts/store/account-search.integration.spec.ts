import { DataSource } from "typeorm";
import { AccountStore } from "./account.store";

const integration =
  process.env.ACCOUNT_SEARCH_INTEGRATION_TEST === "true"
    ? describe
    : describe.skip;

integration("primary administration account search", () => {
  let db: DataSource;
  let store: AccountStore;

  beforeAll(async () => {
    db = new DataSource({
      type: "postgres",
      url: "postgres://postgres:test-local-only@127.0.0.1:55439/account_search_test",
    });
    await db.initialize();
    await db.query(`CREATE TABLE webdev_accounts (
      id text PRIMARY KEY,
      username text NOT NULL,
      display_name text NOT NULL,
      email text,
      role text NOT NULL,
      email_verified_at timestamptz,
      created_at timestamptz NOT NULL
    )`);
    await db.query(`INSERT INTO webdev_accounts
      (id,username,display_name,email,role,created_at)
      VALUES ('older','taylor','Taylor','taylor@example.test','client','2020-01-01')`);
    await db.query(`INSERT INTO webdev_accounts
      (id,username,display_name,role,created_at)
      VALUES ('literal','sign%up','Literal','client','2020-01-02')`);
    await db.query(`INSERT INTO webdev_accounts
      (id,username,display_name,role,created_at)
      SELECT 'recent-'||n, 'recent-'||n, 'Recent '||n, 'client',
        '2026-10-01'::timestamptz + n * interval '1 minute'
      FROM generate_series(1,101) AS n`);
    store = new AccountStore(db);
  });

  afterAll(async () => {
    if (db?.isInitialized) await db.destroy();
  });

  it("returns ten newest accounts per page and searches beyond the first hundred", async () => {
    expect(await store.listForAdministration()).toHaveLength(100);
    const first = await store.pageForAdministration("", 1);
    expect(first.entries).toHaveLength(10);
    expect(first.entries[0].id).toBe("recent-101");
    expect(first.entries[9].id).toBe("recent-92");
    expect(first.hasMore).toBe(true);
    const second = await store.pageForAdministration("", 2);
    expect(second.entries[0].id).toBe("recent-91");
    expect(second.entries).toHaveLength(10);
    const last = await store.pageForAdministration("", 11);
    expect(last.entries.map((account: { id: string }) => account.id)).toEqual([
      "recent-1",
      "literal",
      "older",
    ]);
    expect(last.hasMore).toBe(false);
    expect(
      (await store.pageForAdministration("TAYLOR@EXAMPLE.TEST", 1)).entries.map(
        (account: { id: string }) => account.id
      )
    ).toEqual(["older"]);
    expect(
      (await store.pageForAdministration("tAyLoR", 1)).entries.map(
        (account: { id: string }) => account.id
      )
    ).toEqual(["older"]);
    expect(
      (await store.pageForAdministration("%", 1)).entries.map(
        (account: { id: string }) => account.id
      )
    ).toEqual(["literal"]);
    expect(
      (await store.pageForAdministration("%_ OR 1=1 --", 1)).entries
    ).toEqual([]);
  });
});
