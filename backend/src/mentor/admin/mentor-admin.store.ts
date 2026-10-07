import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { randomUUID } from "crypto";
import { DataSource } from "typeorm";
import { AccountStore } from "../../accounts/store/account.store";

const PAGE_SIZE = 25;

type UsageRow = {
  id: string;
  username: string;
  displayName: string;
  email: string | null;
  role: "admin" | "client";
  requestCount: number;
  completedCount: number;
  inputTokens: string;
  outputTokens: string;
  tokenReportedCount: number;
  accountedNeurons: string;
  lastUsedAt: Date | null;
  disabledAt: Date | null;
};

type TotalsRow = {
  requestCount: number;
  completedCount: number;
  activeAccounts: number;
  inputTokens: string;
  outputTokens: string;
  tokenReportedCount: number;
  accountedNeurons: string;
};

function usageNumbers(row: Omit<TotalsRow, "activeAccounts">) {
  return {
    requestCount: row.requestCount,
    completedCount: row.completedCount,
    inputTokens: Number(row.inputTokens),
    outputTokens: Number(row.outputTokens),
    tokenReportedCount: row.tokenReportedCount,
    accountedNeurons: Number(row.accountedNeurons),
  };
}

@Injectable()
export class MentorAdminStore {
  constructor(@InjectDataSource() private readonly db: DataSource) {}

  async usage(days: 7 | 30, page: number) {
    const generatedAt = new Date();
    const since = new Date(generatedAt.getTime() - days * 86_400_000);
    const bounds = [since.toISOString(), generatedAt.toISOString()];
    return this.db.transaction("REPEATABLE READ", async (q) => {
      const [totals]: TotalsRow[] = await q.query(
        `SELECT count(*)::int AS "requestCount",
         count(*) FILTER (WHERE state='completed')::int AS "completedCount",
         count(DISTINCT account_id)::int AS "activeAccounts",
         coalesce(sum(input_tokens),0)::bigint AS "inputTokens",
         coalesce(sum(output_tokens),0)::bigint AS "outputTokens",
         count(*) FILTER (WHERE input_tokens IS NOT NULL AND output_tokens IS NOT NULL)::int AS "tokenReportedCount",
         coalesce(sum(accounted_neurons),0)::bigint AS "accountedNeurons"
       FROM webdev_mentor_generations
       WHERE created_at >= $1 AND created_at < $2`,
        bounds
      );
      const rows: UsageRow[] = await q.query(
        `WITH usage AS (
         SELECT account_id, count(*)::int AS request_count,
           count(*) FILTER (WHERE state='completed')::int AS completed_count,
           coalesce(sum(input_tokens),0)::bigint AS input_tokens,
           coalesce(sum(output_tokens),0)::bigint AS output_tokens,
           count(*) FILTER (WHERE input_tokens IS NOT NULL AND output_tokens IS NOT NULL)::int AS token_reported_count,
           coalesce(sum(accounted_neurons),0)::bigint AS accounted_neurons,
           max(created_at) AS last_used_at
         FROM webdev_mentor_generations
         WHERE created_at >= $1 AND created_at < $2
         GROUP BY account_id
       )
       SELECT a.id,a.username,a.display_name AS "displayName",a.email,a.role,
         coalesce(u.request_count,0)::int AS "requestCount",
         coalesce(u.completed_count,0)::int AS "completedCount",
         coalesce(u.input_tokens,0)::bigint AS "inputTokens",
         coalesce(u.output_tokens,0)::bigint AS "outputTokens",
         coalesce(u.token_reported_count,0)::int AS "tokenReportedCount",
         coalesce(u.accounted_neurons,0)::bigint AS "accountedNeurons",
         u.last_used_at AS "lastUsedAt", c.disabled_at AS "disabledAt"
       FROM webdev_accounts a
       LEFT JOIN usage u ON u.account_id=a.id
       LEFT JOIN webdev_ai_account_controls c ON c.account_id=a.id
       ORDER BY u.last_used_at DESC NULLS LAST,a.created_at DESC,a.id
       LIMIT $3 OFFSET $4`,
        [...bounds, PAGE_SIZE + 1, (page - 1) * PAGE_SIZE]
      );
      return {
        days,
        page,
        generatedAt: generatedAt.toISOString(),
        since: since.toISOString(),
        totals: {
          ...usageNumbers(totals),
          activeAccounts: totals.activeAccounts,
        },
        entries: rows.slice(0, PAGE_SIZE).map((row) => ({
          id: row.id,
          username: row.username,
          displayName: row.displayName,
          email: row.email,
          role: row.role,
          ...usageNumbers(row),
          lastUsedAt: row.lastUsedAt,
          disabledAt: row.disabledAt,
        })),
        hasMore: rows.length > PAGE_SIZE,
      };
    });
  }

  async setGenerationEnabled(
    accountId: string,
    enabled: boolean,
    actorAccountId: string
  ): Promise<{ enabled: boolean }> {
    return this.db.transaction(async (q) => {
      // The same lock as GenerationStore.start closes the disable/start race.
      await q.query("SELECT pg_advisory_xact_lock(1791248400)");
      const [account]: { id: string }[] = await q.query(
        "SELECT id FROM webdev_accounts WHERE id=$1 FOR UPDATE",
        [accountId]
      );
      if (!account) throw new NotFoundException("Account not found");
      if (accountId === AccountStore.ROOT_ID)
        throw new BadRequestException(
          "Primary administrator AI access is protected"
        );
      const [control]: { account_id: string }[] = await q.query(
        "SELECT account_id FROM webdev_ai_account_controls WHERE account_id=$1 FOR UPDATE",
        [accountId]
      );
      if (Boolean(control) === !enabled) return { enabled };
      if (enabled) {
        await q.query(
          "DELETE FROM webdev_ai_account_controls WHERE account_id=$1",
          [accountId]
        );
      } else {
        await q.query(
          "INSERT INTO webdev_ai_account_controls(account_id,disabled_by) VALUES($1,$2)",
          [accountId, actorAccountId]
        );
        await q.query(
          `UPDATE webdev_mentor_generations
           SET state='cancel_requested',updated_at=now()
           WHERE account_id=$1 AND state IN ('reserved','dispatched','streaming')`,
          [accountId]
        );
      }
      await q.query(
        `INSERT INTO webdev_ai_account_control_audit(id,account_id,actor_account_id,enabled)
         VALUES($1,$2,$3,$4)`,
        [randomUUID(), accountId, actorAccountId, enabled]
      );
      return { enabled };
    });
  }
}
