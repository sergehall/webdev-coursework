import type { DataSource } from "typeorm";
import {
  GLOBAL_DAILY_NEURON_LIMIT,
  generationPaused,
} from "./generation-safety";

export function periods(now: Date) {
  const day = new Date(now);
  day.setUTCHours(0, 0, 0, 0);
  const minute = new Date(now);
  minute.setUTCSeconds(0, 0);
  return { day: day.toISOString(), minute: minute.toISOString() };
}

export async function generationLimits(db: DataSource, accountId: string) {
  const { day, minute } = periods(new Date());
  const rows: {
    scope: string;
    request_count: number;
    reserved_neurons: number;
    consumed_neurons: number;
  }[] = await db.query(
    `SELECT scope,request_count,reserved_neurons,consumed_neurons FROM webdev_ai_budget_buckets
     WHERE (scope='global-day' AND subject_key='all' AND period_start=$2)
        OR (scope='account-day' AND subject_key=$1 AND period_start=$2)
        OR (scope='account-minute' AND subject_key=$1 AND period_start=$3)`,
    [accountId, day, minute]
  );
  const bucket = (scope: string) => rows.find((row) => row.scope === scope);
  const global = bucket("global-day");
  const [paused, disabledRows] = await Promise.all([
    generationPaused(db),
    db.query(
      "SELECT account_id FROM webdev_ai_account_controls WHERE account_id=$1",
      [accountId]
    ) as Promise<{ account_id: string }[]>,
  ]);
  return {
    dailyRemaining: Math.max(
      0,
      15 - (bucket("account-day")?.request_count ?? 0)
    ),
    minuteRemaining: Math.max(
      0,
      5 - (bucket("account-minute")?.request_count ?? 0)
    ),
    globalNeuronsRemaining: Math.max(
      0,
      paused
        ? 0
        : GLOBAL_DAILY_NEURON_LIMIT -
            (global?.reserved_neurons ?? 0) -
            (global?.consumed_neurons ?? 0)
    ),
    generationPaused: paused,
    accountDisabled: disabledRows.length > 0,
    resetAt: new Date(new Date(day).getTime() + 86_400_000).toISOString(),
  };
}
