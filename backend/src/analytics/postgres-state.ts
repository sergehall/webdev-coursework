import type { DataSource } from "typeorm";

// A bounded PostgreSQL fallback for installations without a Redis subscription.
// Only private constant scripts from AnalyticsService are interpreted here.
export class PostgresState {
  readonly status = "ready";
  constructor(private readonly db: DataSource) {}
  async get(key: string): Promise<string | null> {
    const rows = await this.db.query(
      "SELECT value FROM webdev_runtime_state WHERE key=$1 AND expires_at>now()",
      [key]
    );
    return rows[0]?.value ?? null;
  }
  async set(
    key: string,
    value: string,
    _ex: string,
    ttl: number,
    nx?: string
  ): Promise<string | null> {
    const rows = await this.db.query(
      `INSERT INTO webdev_runtime_state(key,value,expires_at) VALUES($1,$2,now()+$3*interval '1 second') ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value,expires_at=EXCLUDED.expires_at ${nx ? "WHERE webdev_runtime_state.expires_at<=now()" : ""} RETURNING key`,
      [key, value, ttl]
    );
    return rows.length ? "OK" : null;
  }
  async del(key: string): Promise<number> {
    if (key.endsWith(":processing")) {
      const rows = await this.db.query(
        "WITH removed AS (DELETE FROM webdev_runtime_queue WHERE queue_key=$1 AND processing RETURNING id) SELECT id FROM removed",
        [key.replace(/:processing$/, ":pending")]
      );
      return rows.length;
    }
    const rows = await this.db.query(
      "WITH removed AS (DELETE FROM webdev_runtime_state WHERE key=$1 RETURNING key) SELECT key FROM removed",
      [key]
    );
    return rows.length;
  }
  async eval(
    script: string,
    numberOfKeys: number,
    ...args: (string | number)[]
  ): Promise<unknown> {
    const key = String(args[0]);
    if (script.includes("'INCR'")) {
      const rows = await this.db.query(
        `INSERT INTO webdev_runtime_state(key,value,expires_at) VALUES($1,'1',now()+$2*interval '1 second') ON CONFLICT(key) DO UPDATE SET value=CASE WHEN webdev_runtime_state.expires_at<=now() THEN '1' ELSE (webdev_runtime_state.value::integer+1)::text END,expires_at=CASE WHEN webdev_runtime_state.expires_at<=now() THEN EXCLUDED.expires_at ELSE webdev_runtime_state.expires_at END RETURNING value`,
        [key, args[1]]
      );
      return Number(rows[0].value);
    }
    if (script.startsWith("local v=")) {
      const rows = await this.db.query(
        "WITH removed AS (DELETE FROM webdev_runtime_state WHERE key=$1 AND expires_at>now() RETURNING value) SELECT value FROM removed",
        [key]
      );
      return rows[0]?.value ?? null;
    }
    if (numberOfKeys === 1 && script.includes("'RPUSH'")) {
      return this.db.transaction(async (q) => {
        await q.query("SELECT pg_advisory_xact_lock(hashtext($1))", [key]);
        const [{ count }] = await q.query(
          "SELECT count(*)::integer AS count FROM webdev_runtime_queue WHERE queue_key=$1",
          [key]
        );
        if (count >= Number(args[2])) return 0;
        await q.query(
          "INSERT INTO webdev_runtime_queue(queue_key,item) VALUES($1,$2::jsonb)",
          [key, args[1]]
        );
        return 1;
      });
    }
    if (numberOfKeys === 2 && script.includes("'LRANGE'")) {
      return this.db.transaction(async (q) => {
        await q.query("SELECT pg_advisory_xact_lock(hashtext($1))", [key]);
        await q.query(
          `UPDATE webdev_runtime_queue SET processing=true WHERE id IN (SELECT id FROM webdev_runtime_queue WHERE queue_key=$1 AND NOT processing ORDER BY id LIMIT 500) AND NOT EXISTS(SELECT 1 FROM webdev_runtime_queue WHERE queue_key=$1 AND processing)`,
          [key]
        );
        const rows = await q.query(
          "SELECT item::text FROM webdev_runtime_queue WHERE queue_key=$1 AND processing ORDER BY id",
          [key]
        );
        return rows.map((r: { item: string }) => r.item);
      });
    }
    throw new Error("Unsupported private state operation");
  }
  disconnect(): void {}
}
