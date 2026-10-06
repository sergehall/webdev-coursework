import { randomUUID } from "crypto";
import type { DataSource, EntityManager, QueryRunner } from "typeorm";
import { returnedRows } from "../mentor-sql";

export const GLOBAL_DAILY_NEURON_LIMIT = 8000;
export type PauseReason = "app_budget" | "cloudflare_quota";
type Sql = Pick<EntityManager, "query"> | Pick<QueryRunner, "query">;

export async function generationPaused(q: Sql): Promise<boolean> {
  const [row]: { paused: boolean }[] = await q.query(
    "SELECT muted_at IS NOT NULL AS paused FROM webdev_ai_generation_control WHERE id=1"
  );
  return row?.paused ?? false;
}

/** Call under the generation advisory lock, in the same transaction as quota checks. */
export async function pauseGeneration(
  q: Sql,
  reason: PauseReason,
  budgetDay: string | Date,
  accountedNeurons: number
): Promise<boolean> {
  const changed = returnedRows<{ muted_at: Date }>(
    await q.query(
      `UPDATE webdev_ai_generation_control
       SET muted_at=now(),reason=$1 WHERE id=1 AND muted_at IS NULL
       RETURNING muted_at`,
      [reason]
    )
  );
  if (!changed.length) return false;
  const id = randomUUID();
  await q.query(
    `INSERT INTO webdev_ai_budget_alerts(id,reason,budget_day,accounted_neurons)
     VALUES($1,$2,$3,$4)`,
    [
      id,
      reason,
      (budgetDay instanceof Date ? budgetDay.toISOString() : budgetDay).slice(
        0,
        10
      ),
      Math.max(0, accountedNeurons),
    ]
  );
  await q.query(
    `INSERT INTO webdev_ai_control_audit(id,action,reason,actor)
     VALUES($1,'pause',$2,'system')`,
    [randomUUID(), reason]
  );
  return true;
}

export async function pauseAfterCloudflareQuota(db: DataSource): Promise<void> {
  await db.transaction(async (q) => {
    await q.query("SELECT pg_advisory_xact_lock(1791248400)");
    const day = new Date();
    day.setUTCHours(0, 0, 0, 0);
    const [bucket]: { total: number }[] = await q.query(
      `SELECT consumed_neurons + reserved_neurons AS total
       FROM webdev_ai_budget_buckets
       WHERE scope='global-day' AND subject_key='all' AND period_start=$1`,
      [day.toISOString()]
    );
    await pauseGeneration(
      q,
      "cloudflare_quota",
      day.toISOString(),
      bucket?.total ?? 0
    );
  });
}
