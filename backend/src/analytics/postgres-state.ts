import type { DataSource } from "typeorm";

/** Shared PostgreSQL state/queue operations used identically by local and production replicas. */
export class PostgresState {
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
    ttlSeconds: number,
    ifAbsent = false
  ): Promise<string | null> {
    const rows = await this.db.query(
      `INSERT INTO webdev_runtime_state(key,value,expires_at) VALUES($1,$2,now()+$3*interval '1 second') ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value,expires_at=EXCLUDED.expires_at ${ifAbsent ? "WHERE webdev_runtime_state.expires_at<=now()" : ""} RETURNING key`,
      [key, value, ttlSeconds]
    );
    return rows.length ? "OK" : null;
  }

  async remove(key: string): Promise<number> {
    const rows = await this.db.query(
      "WITH removed AS (DELETE FROM webdev_runtime_state WHERE key=$1 RETURNING key) SELECT key FROM removed",
      [key]
    );
    return rows.length;
  }

  /** Consume an unexpired OAuth state atomically; competing callbacks cannot reuse it. */
  async take(key: string): Promise<string | null> {
    const rows = await this.db.query(
      "WITH removed AS (DELETE FROM webdev_runtime_state WHERE key=$1 AND expires_at>now() RETURNING value) SELECT value FROM removed",
      [key]
    );
    return rows[0]?.value ?? null;
  }

  async increment(key: string, seconds: number): Promise<number> {
    const rows = await this.db.query(
      `INSERT INTO webdev_runtime_state(key,value,expires_at) VALUES($1,'1',now()+$2*interval '1 second') ON CONFLICT(key) DO UPDATE SET value=CASE WHEN webdev_runtime_state.expires_at<=now() THEN '1' ELSE (webdev_runtime_state.value::integer+1)::text END,expires_at=CASE WHEN webdev_runtime_state.expires_at<=now() THEN EXCLUDED.expires_at ELSE webdev_runtime_state.expires_at END RETURNING value`,
      [key, seconds]
    );
    return Number(rows[0].value);
  }

  /** Serialize capacity checks and inserts for the same bounded queue across replicas. */
  async enqueue(key: string, value: string, maxSize: number): Promise<number> {
    return this.db.transaction(async (q) => {
      await q.query("SELECT pg_advisory_xact_lock(hashtext($1))", [key]);
      const [{ count }] = await q.query(
        "SELECT count(*)::integer AS count FROM webdev_runtime_queue WHERE queue_key=$1",
        [key]
      );
      if (count >= maxSize) return 0;
      await q.query(
        "INSERT INTO webdev_runtime_queue(queue_key,item) VALUES($1,$2::jsonb)",
        [key, value]
      );
      return 1;
    });
  }

  /** Keep an existing processing batch for retry; claim at most 500 ordered rows otherwise. */
  async stage(key: string): Promise<string[]> {
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
      return rows.map((row: { item: string }) => row.item);
    });
  }

  async acknowledge(key: string): Promise<number> {
    const rows = await this.db.query(
      "WITH removed AS (DELETE FROM webdev_runtime_queue WHERE queue_key=$1 AND processing RETURNING id) SELECT id FROM removed",
      [key]
    );
    return rows.length;
  }
}
