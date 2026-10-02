import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import Redis from "ioredis";
import { randomUUID } from "crypto";
import { RequestThrottleService } from "../../src/security/request-throttle.service";

const run =
  process.env.API_SECURITY_INTEGRATION_TEST === "true"
    ? describe
    : describe.skip;
run("shared PostgreSQL and Redis throttle storage", () => {
  let db: DataSource;
  beforeAll(async () => {
    // Fixed, disposable test service. Never point this suite at an application DB.
    db = new DataSource({
      type: "postgres",
      url: "postgres://postgres:test-local-only@127.0.0.1:55439/owner_test",
      extra: { options: "-c search_path=webdev_throttle_test" },
    });
    await db.initialize();
    await db.query("CREATE SCHEMA IF NOT EXISTS webdev_throttle_test");
    await db.query(
      "CREATE TABLE IF NOT EXISTS webdev_runtime_state(key text PRIMARY KEY, value text NOT NULL, expires_at timestamptz NOT NULL)"
    );
  });
  afterAll(async () => {
    if (db?.isInitialized) {
      await db.query("DROP SCHEMA webdev_throttle_test CASCADE");
      await db.destroy();
    }
  });

  it("counts concurrent requests atomically across replicas, caps rejected counters and resets expired windows", async () => {
    const config = new ConfigService({
      NODE_ENV: "test",
      API_THROTTLE_SECRET: "shared-integration-secret-at-least-32-characters",
      REDIS_URL: "",
    });
    const first = new RequestThrottleService(config, db);
    const second = new RequestThrottleService(config, db);
    await first.onModuleInit();
    await second.onModuleInit();
    const bucket = randomUUID();
    try {
      const results = await Promise.all(
        Array.from({ length: 25 }, (_, i) =>
          (i % 2 ? first : second).consume("192.0.2.1", bucket, 10, 60)
        )
      );
      expect(results.filter((result) => result.count <= 10)).toHaveLength(10);
      expect(Math.max(...results.map((result) => result.count))).toBe(11);
      expect(
        results.every(
          (result) => result.retryAfter >= 1 && result.retryAfter <= 60
        )
      ).toBe(true);
      const rows = await db.query(
        "SELECT key FROM webdev_runtime_state WHERE key LIKE $1",
        [`webdev:api-throttle:${bucket}:%`]
      );
      expect(rows).toHaveLength(1);
      expect(rows[0].key).not.toContain("192.0.2.1");
      await db.query(
        "UPDATE webdev_runtime_state SET expires_at=now()-interval '1 second' WHERE key=$1",
        [rows[0].key]
      );
      expect((await second.consume("192.0.2.1", bucket, 10, 60)).count).toBe(1);
    } finally {
      first.onModuleDestroy();
      second.onModuleDestroy();
    }
  });

  it("fails closed on PostgreSQL errors", async () => {
    const unavailable = {
      query: jest.fn().mockRejectedValue(new Error("private storage error")),
    } as unknown as DataSource;
    const service = new RequestThrottleService(
      new ConfigService({ NODE_ENV: "test", REDIS_URL: "" }),
      unavailable
    );
    await expect(service.consume("192.0.2.1", "test", 10, 60)).rejects.toThrow(
      "Request protection is temporarily unavailable"
    );
  });

  it("uses atomic Redis TTL windows across replicas and does not fall back after Redis failure", async () => {
    const redisUrl = "redis://127.0.0.1:56380";
    const config = new ConfigService({
      NODE_ENV: "test",
      API_THROTTLE_SECRET: "shared-integration-secret-at-least-32-characters",
      REDIS_URL: redisUrl,
    });
    const first = new RequestThrottleService(config, db),
      second = new RequestThrottleService(config, db);
    const redis = new Redis(redisUrl);
    await first.onModuleInit();
    await second.onModuleInit();
    const bucket = randomUUID();
    try {
      const results = await Promise.all(
        Array.from({ length: 25 }, (_, i) =>
          (i % 2 ? first : second).consume("192.0.2.1", bucket, 10, 60)
        )
      );
      expect(results.filter((result) => result.count <= 10)).toHaveLength(10);
      expect(Math.max(...results.map((result) => result.count))).toBe(11);
      const keys = await redis.keys(`webdev:api-throttle:${bucket}:*`);
      expect(keys).toHaveLength(1);
      expect(await redis.ttl(keys[0])).toBeGreaterThan(0);
      await redis.del(...keys);
      expect((await first.consume("192.0.2.1", bucket, 10, 60)).count).toBe(1);
      await redis.del(...keys);
      first.onModuleDestroy();
      await expect(first.consume("192.0.2.1", bucket, 10, 60)).rejects.toThrow(
        "Request protection is temporarily unavailable"
      );
    } finally {
      first.onModuleDestroy();
      second.onModuleDestroy();
      redis.disconnect();
    }
  });
});
