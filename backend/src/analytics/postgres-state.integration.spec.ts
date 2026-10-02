// Shared-store guarantees: replicas must agree on TTL, one-time consumption and queue ownership.
import { DataSource } from "typeorm";
import { randomUUID } from "crypto";
import { PostgresState } from "./postgres-state";

const run =
  process.env.OWNER_INTEGRATION_TEST === "true" ? describe : describe.skip;
run("PostgreSQL runtime state across replicas", () => {
  let db: DataSource;
  let first: PostgresState;
  let second: PostgresState;
  beforeAll(async () => {
    db = new DataSource({
      type: "postgres",
      url: `postgres://postgres:test-local-only@127.0.0.1:${Number(process.env.OWNER_INTEGRATION_PORT ?? 55439)}/owner_test`,
      extra: { options: "-c search_path=webdev_state_test" },
    });
    await db.initialize();
    await db.query("CREATE SCHEMA IF NOT EXISTS webdev_state_test");
    await db.query(
      "CREATE TABLE webdev_runtime_state(key text PRIMARY KEY,value text NOT NULL,expires_at timestamptz NOT NULL)"
    );
    await db.query(
      "CREATE TABLE webdev_runtime_queue(id bigserial PRIMARY KEY,queue_key text NOT NULL,item jsonb NOT NULL,processing boolean NOT NULL DEFAULT false)"
    );
    first = new PostgresState(db);
    second = new PostgresState(db);
  });
  afterAll(async () => {
    if (db?.isInitialized) {
      await db.query("DROP SCHEMA webdev_state_test CASCADE");
      await db.destroy();
    }
  });

  it("preserves live state, atomically consumes once and ignores expired proof", async () => {
    const key = randomUUID();
    expect(await first.set(key, "private-verifier", 600, true)).toBe("OK");
    expect(await second.set(key, "overwrite", 600, true)).toBeNull();
    expect(await second.get(key)).toBe("private-verifier");
    const results = await Promise.all(
      Array.from({ length: 10 }, (_, index) =>
        (index % 2 ? first : second).take(key)
      )
    );
    expect(results.filter((value) => value !== null)).toEqual([
      "private-verifier",
    ]);
    expect(await first.get(key)).toBeNull();
    await first.set(key, "expired-proof", 60);
    await db.query(
      "UPDATE webdev_runtime_state SET expires_at=now()-interval '1 second' WHERE key=$1",
      [key]
    );
    expect(await second.get(key)).toBeNull();
    expect(await second.take(key)).toBeNull();
    expect(await second.set(key, "fresh-proof", 600, true)).toBe("OK");
    expect(await first.take(key)).toBe("fresh-proof");
  });

  it("counts concurrent requests in one TTL window and resets expired counters", async () => {
    const key = randomUUID();
    const counts = await Promise.all(
      Array.from({ length: 25 }, (_, index) =>
        (index % 2 ? first : second).increment(key, 60)
      )
    );
    expect(counts.sort((a, b) => a - b)).toEqual(
      Array.from({ length: 25 }, (_, index) => index + 1)
    );
    await db.query(
      "UPDATE webdev_runtime_state SET expires_at=now()-interval '1 second' WHERE key=$1",
      [key]
    );
    expect(await first.increment(key, 60)).toBe(1);
    expect(await second.remove(key)).toBe(1);
    expect(await first.get(key)).toBeNull();
  });

  it("bounds concurrent enqueue, retains failed processing batches and acknowledges only staged items", async () => {
    const key = randomUUID();
    const accepted = await Promise.all(
      Array.from({ length: 10 }, (_, index) =>
        (index % 2 ? first : second).enqueue(
          key,
          JSON.stringify({ event: index }),
          3
        )
      )
    );
    expect(accepted.filter((value) => value === 1)).toHaveLength(3);
    const batch = await first.stage(key);
    expect(batch).toHaveLength(3);
    expect(await second.stage(key)).toEqual(batch);
    expect(
      await second.enqueue(key, JSON.stringify({ event: "blocked" }), 3)
    ).toBe(0);
    expect(await first.acknowledge(key)).toBe(3);
    expect(await second.stage(key)).toEqual([]);
    expect(
      await second.enqueue(key, JSON.stringify({ event: "next" }), 3)
    ).toBe(1);
    expect(await first.acknowledge(key)).toBe(0);
    expect((await first.stage(key)).map((value) => JSON.parse(value))).toEqual([
      { event: "next" },
    ]);
    expect(await second.acknowledge(key)).toBe(1);
  });
});
