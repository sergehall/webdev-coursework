import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { randomUUID } from "crypto";
import { DataSource } from "typeorm";
import { AccountStore } from "../../accounts/store/account.store";

const PAGE_SIZE = 10;

export type MentorAccountFilters = {
  search: string;
  role: "all" | "admin" | "client";
  access: "all" | "enabled" | "disabled";
  activity: "all" | "used" | "never";
};

type UsageRow = {
  id: string;
  username: string;
  displayName: string;
  email: string | null;
  role: "admin" | "client";
  requestCount: number;
  completedCount: number;
  failedCount: number;
  cancelledCount: number;
  activeCount: number;
  chatCount: number;
  planCount: number;
  inputTokens: string;
  outputTokens: string;
  tokenReportedCount: number;
  accountedNeurons: string;
  lastUsedAt: Date | null;
  disabledAt: Date | null;
  disabledComment: string | null;
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

  async usage(days: 7 | 30, page: number, filters: MentorAccountFilters) {
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
           count(*) FILTER (WHERE state IN ('failed','abandoned'))::int AS failed_count,
           count(*) FILTER (WHERE state='cancelled')::int AS cancelled_count,
           count(*) FILTER (WHERE state IN ('reserved','dispatched','streaming','cancel_requested'))::int AS active_count,
           count(*) FILTER (WHERE intent='chat')::int AS chat_count,
           count(*) FILTER (WHERE intent='propose_plan')::int AS plan_count,
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
         coalesce(u.failed_count,0)::int AS "failedCount",
         coalesce(u.cancelled_count,0)::int AS "cancelledCount",
         coalesce(u.active_count,0)::int AS "activeCount",
         coalesce(u.chat_count,0)::int AS "chatCount",
         coalesce(u.plan_count,0)::int AS "planCount",
         coalesce(u.input_tokens,0)::bigint AS "inputTokens",
         coalesce(u.output_tokens,0)::bigint AS "outputTokens",
         coalesce(u.token_reported_count,0)::int AS "tokenReportedCount",
         coalesce(u.accounted_neurons,0)::bigint AS "accountedNeurons",
         u.last_used_at AS "lastUsedAt", c.disabled_at AS "disabledAt",
         c.admin_comment AS "disabledComment"
       FROM webdev_accounts a
       LEFT JOIN usage u ON u.account_id=a.id
       LEFT JOIN webdev_ai_account_controls c ON c.account_id=a.id
       WHERE ($3::text='' OR strpos(lower(a.username),lower($3))>0
         OR strpos(lower(a.display_name),lower($3))>0
         OR strpos(lower(coalesce(a.email,'')),lower($3))>0)
         AND ($4::text='all' OR a.role=$4)
         AND ($5::text='all' OR (c.account_id IS NOT NULL)=($5='disabled'))
         AND ($6::text='all' OR (u.last_used_at IS NOT NULL)=($6='used'))
       ORDER BY u.last_used_at DESC NULLS LAST,a.created_at DESC,a.id
       LIMIT $7 OFFSET $8`,
        [
          ...bounds,
          filters.search,
          filters.role,
          filters.access,
          filters.activity,
          PAGE_SIZE + 1,
          (page - 1) * PAGE_SIZE,
        ]
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
          failedCount: row.failedCount,
          cancelledCount: row.cancelledCount,
          activeCount: row.activeCount,
          chatCount: row.chatCount,
          planCount: row.planCount,
          lastUsedAt: row.lastUsedAt,
          disabledAt: row.disabledAt,
          disabledComment: row.disabledComment,
        })),
        hasMore: rows.length > PAGE_SIZE,
      };
    });
  }

  async setGenerationEnabled(
    accountId: string,
    enabled: boolean,
    actorAccountId: string,
    comment: string | null
  ): Promise<{ enabled: boolean }> {
    const adminComment = comment?.trim() ?? null;
    if (
      (!enabled && (!adminComment || adminComment.length > 500)) ||
      (enabled && adminComment !== null)
    )
      throw new BadRequestException("Invalid AI access comment");
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
          "INSERT INTO webdev_ai_account_controls(account_id,disabled_by,admin_comment) VALUES($1,$2,$3)",
          [accountId, actorAccountId, adminComment]
        );
        await q.query(
          `UPDATE webdev_mentor_generations
           SET state='cancel_requested',updated_at=now()
           WHERE account_id=$1 AND state IN ('reserved','dispatched','streaming')`,
          [accountId]
        );
      }
      await q.query(
        `INSERT INTO webdev_ai_account_control_audit(id,account_id,actor_account_id,enabled,admin_comment)
         VALUES($1,$2,$3,$4,$5)`,
        [randomUUID(), accountId, actorAccountId, enabled, adminComment]
      );
      return { enabled };
    });
  }
}
