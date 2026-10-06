import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { randomUUID } from "crypto";
import { DataSource, type QueryRunner } from "typeorm";
import { returnedRows } from "../mentor-sql";
import { MODEL, RESERVATION_NEURONS } from "./generation-config";
import {
  GLOBAL_DAILY_NEURON_LIMIT,
  generationPaused,
  pauseAfterCloudflareQuota,
  pauseGeneration,
} from "./generation-safety";

export type GenerationRow = {
  id: string;
  account_id: string;
  conversation_id: string | null;
  user_message_id: string | null;
  assistant_message_id: string | null;
  proposal_id: string | null;
  payload_hash: string;
  state:
    | "reserved"
    | "dispatched"
    | "streaming"
    | "cancel_requested"
    | "completed"
    | "failed"
    | "cancelled"
    | "abandoned";
  failure_kind: string | null;
  dispatched_at: string | null;
  budget_day: string;
  created_at: string;
};
type StartResult = {
  row: GenerationRow;
  duplicate: boolean;
  remaining: number;
};
const active = "('reserved','dispatched','streaming','cancel_requested')";

function limit(code: string, retryAfterSeconds: number): never {
  throw new HttpException({ code, retryAfterSeconds }, 429);
}
function periods(now: Date) {
  const day = new Date(now);
  day.setUTCHours(0, 0, 0, 0);
  const minute = new Date(now);
  minute.setUTCSeconds(0, 0);
  return { day: day.toISOString(), minute: minute.toISOString() };
}

@Injectable()
export class GenerationStore {
  constructor(@InjectDataSource() private readonly db: DataSource) {}

  async limits(accountId: string) {
    const now = new Date();
    const { day, minute } = periods(now);
    const rows: {
      scope: string;
      request_count: number;
      reserved_neurons: number;
      consumed_neurons: number;
    }[] = await this.db.query(
      `SELECT scope,request_count,reserved_neurons,consumed_neurons FROM webdev_ai_budget_buckets
         WHERE (scope='global-day' AND subject_key='all' AND period_start=$2)
            OR (scope='account-day' AND subject_key=$1 AND period_start=$2)
            OR (scope='account-minute' AND subject_key=$1 AND period_start=$3)`,
      [accountId, day, minute]
    );
    const bucket = (scope: string) => rows.find((row) => row.scope === scope);
    const global = bucket("global-day");
    const paused = await generationPaused(this.db);
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
      resetAt: new Date(new Date(day).getTime() + 86_400_000).toISOString(),
    };
  }

  private async settle(q: QueryRunner, row: GenerationRow, bill: boolean) {
    const [bucket] = returnedRows<{ total: number }>(
      await q.query(
        `UPDATE webdev_ai_budget_buckets
       SET reserved_neurons=reserved_neurons-$2,
           consumed_neurons=consumed_neurons+$3
       WHERE scope='global-day' AND subject_key='all' AND period_start=$1
       RETURNING reserved_neurons+consumed_neurons AS total`,
        [row.budget_day, RESERVATION_NEURONS, bill ? RESERVATION_NEURONS : 0]
      )
    );
    if (bucket?.total >= GLOBAL_DAILY_NEURON_LIMIT)
      await pauseGeneration(q, "app_budget", row.budget_day, bucket.total);
  }

  private async expire(q: QueryRunner) {
    const stale: GenerationRow[] = await q.query(
      `SELECT * FROM webdev_mentor_generations
       WHERE state IN ${active} AND lease_until<now() FOR UPDATE`
    );
    for (const row of stale) {
      await q.query(
        `UPDATE webdev_mentor_generations SET state='abandoned',failure_kind='AI_TIMEOUT',
         updated_at=now() WHERE id=$1`,
        [row.id]
      );
      await this.settle(q, row, Boolean(row.dispatched_at));
    }
  }

  async start(
    accountId: string,
    conversationId: string,
    requestId: string,
    hash: string,
    content: string,
    intent: "chat" | "propose_plan" = "chat"
  ): Promise<StartResult> {
    const q = this.db.createQueryRunner();
    await q.connect();
    await q.startTransaction();
    try {
      // Serializes quota checks across all app instances, including cleanup of old leases.
      await q.query("SELECT pg_advisory_xact_lock(1791248400)");
      await this.expire(q);
      const existing: GenerationRow[] = await q.query(
        `SELECT * FROM webdev_mentor_generations WHERE account_id=$1 AND client_request_id=$2`,
        [accountId, requestId]
      );
      if (existing.length) {
        if (existing[0].payload_hash !== hash)
          throw new ConflictException({ code: "REQUEST_ID_CONFLICT" });
        await q.commitTransaction();
        return { row: existing[0], duplicate: true, remaining: 0 };
      }
      if (await generationPaused(q))
        throw new ServiceUnavailableException({ code: "GENERATION_PAUSED" });
      const owners: { id: string }[] = await q.query(
        `SELECT id FROM webdev_mentor_conversations WHERE id=$1 AND account_id=$2 AND status='active' FOR UPDATE`,
        [conversationId, accountId]
      );
      if (!owners.length) throw new NotFoundException();
      const [{ count }]: { count: string }[] = await q.query(
        `SELECT count(*)::text AS count FROM webdev_mentor_messages WHERE conversation_id=$1`,
        [conversationId]
      );
      if (Number(count) >= 100) limit("USER_LIMIT_REACHED", 86400);
      const current: GenerationRow[] = await q.query(
        `SELECT id FROM webdev_mentor_generations WHERE account_id=$1 AND state IN ${active}`,
        [accountId]
      );
      if (current.length)
        throw new ConflictException({ code: "GENERATION_ACTIVE" });
      const [{ count: globalCount }]: { count: string }[] = await q.query(
        `SELECT count(*)::text AS count FROM webdev_mentor_generations WHERE state IN ${active}`
      );
      if (Number(globalCount) >= 3) limit("DAILY_BUDGET_REACHED", 30);
      const now = new Date();
      const { day, minute } = periods(now);
      const keys = [
        ["global-day", "all", day],
        ["account-day", accountId, day],
        ["account-minute", accountId, minute],
      ];
      for (const [scope, subject, period] of keys)
        await q.query(
          `INSERT INTO webdev_ai_budget_buckets(scope,subject_key,period_start)
           VALUES($1,$2,$3) ON CONFLICT DO NOTHING`,
          [scope, subject, period]
        );
      const buckets: {
        scope: string;
        request_count: number;
        reserved_neurons: number;
        consumed_neurons: number;
      }[] = [];
      for (const [scope, subject, period] of keys)
        buckets.push(
          ...(await q.query(
            `SELECT scope,request_count,reserved_neurons,consumed_neurons FROM webdev_ai_budget_buckets
           WHERE scope=$1 AND subject_key=$2 AND period_start=$3 FOR UPDATE`,
            [scope, subject, period]
          ))
        );
      if (buckets[1].request_count >= 15)
        limit(
          "USER_LIMIT_REACHED",
          Math.ceil((new Date(day).getTime() + 86400000 - now.getTime()) / 1000)
        );
      if (buckets[2].request_count >= 5) limit("USER_LIMIT_REACHED", 60);
      if (
        buckets[0].reserved_neurons +
          buckets[0].consumed_neurons +
          RESERVATION_NEURONS >
        GLOBAL_DAILY_NEURON_LIMIT
      ) {
        await pauseGeneration(
          q,
          "app_budget",
          day,
          buckets[0].reserved_neurons + buckets[0].consumed_neurons
        );
        await q.commitTransaction();
        throw new ServiceUnavailableException({ code: "GENERATION_PAUSED" });
      }
      const userMessageId = randomUUID();
      const [{ next }]: { next: number }[] = await q.query(
        `SELECT coalesce(max(sequence),0)+1 AS next FROM webdev_mentor_messages WHERE conversation_id=$1`,
        [conversationId]
      );
      await q.query(
        `INSERT INTO webdev_mentor_messages(id,conversation_id,account_id,sequence,role,content)
         VALUES($1,$2,$3,$4,'user',$5)`,
        [userMessageId, conversationId, accountId, next, content]
      );
      const rows: GenerationRow[] = await q.query(
        `INSERT INTO webdev_mentor_generations
         (id,account_id,conversation_id,client_request_id,payload_hash,user_message_id,state,model,reserved_neurons,budget_day,lease_until,intent)
         VALUES($1,$2,$3,$4,$5,$6,'reserved',$7,$8,$9,now()+interval '55 seconds',$10) RETURNING *`,
        [
          randomUUID(),
          accountId,
          conversationId,
          requestId,
          hash,
          userMessageId,
          MODEL,
          RESERVATION_NEURONS,
          day,
          intent,
        ]
      );
      for (const [scope, subject, period] of keys)
        await q.query(
          `UPDATE webdev_ai_budget_buckets SET request_count=request_count+1,
           reserved_neurons=reserved_neurons+$4
           WHERE scope=$1 AND subject_key=$2 AND period_start=$3`,
          [
            scope,
            subject,
            period,
            scope === "global-day" ? RESERVATION_NEURONS : 0,
          ]
        );
      await q.query(
        `UPDATE webdev_mentor_conversations SET updated_at=now() WHERE id=$1`,
        [conversationId]
      );
      await q.commitTransaction();
      return {
        row: rows[0],
        duplicate: false,
        remaining: 15 - buckets[1].request_count - 1,
      };
    } catch (error) {
      if (q.isTransactionActive) await q.rollbackTransaction();
      throw error;
    } finally {
      await q.release();
    }
  }

  async get(accountId: string, generationId: string): Promise<GenerationRow> {
    const rows: GenerationRow[] = await this.db.query(
      `SELECT id,account_id,conversation_id,user_message_id,assistant_message_id,proposal_id,payload_hash,state,failure_kind,created_at
       FROM webdev_mentor_generations WHERE id=$1 AND account_id=$2`,
      [generationId, accountId]
    );
    if (!rows.length) throw new NotFoundException();
    return rows[0];
  }

  async reap(): Promise<void> {
    const q = this.db.createQueryRunner();
    await q.connect();
    await q.startTransaction();
    try {
      await q.query("SELECT pg_advisory_xact_lock(1791248400)");
      await this.expire(q);
      await q.commitTransaction();
    } catch (error) {
      await q.rollbackTransaction();
      throw error;
    } finally {
      await q.release();
    }
  }

  async markDispatched(accountId: string, id: string): Promise<boolean> {
    const rows = returnedRows<GenerationRow>(
      await this.db.query(
        `UPDATE webdev_mentor_generations SET state='dispatched',dispatched_at=now(),updated_at=now()
       WHERE id=$1 AND account_id=$2 AND state='reserved'
         AND NOT EXISTS (SELECT 1 FROM webdev_ai_generation_control
                         WHERE id=1 AND muted_at IS NOT NULL)
       RETURNING id`,
        [id, accountId]
      )
    );
    return rows.length > 0;
  }

  async pauseForCloudflareQuota(): Promise<void> {
    await pauseAfterCloudflareQuota(this.db);
  }

  async markStreaming(accountId: string, id: string) {
    await this.db.query(
      `UPDATE webdev_mentor_generations SET state='streaming',updated_at=now()
       WHERE id=$1 AND account_id=$2 AND state='dispatched'`,
      [id, accountId]
    );
  }

  async cancel(accountId: string, id: string): Promise<GenerationRow> {
    await this.db.query(
      `UPDATE webdev_mentor_generations SET state='cancel_requested',updated_at=now()
       WHERE id=$1 AND account_id=$2 AND state IN ('reserved','dispatched','streaming')`,
      [id, accountId]
    );
    return this.get(accountId, id);
  }

  async cancelled(accountId: string, id: string): Promise<boolean> {
    const row = await this.get(accountId, id);
    return (
      row.state === "cancel_requested" ||
      row.state === "cancelled" ||
      row.state === "abandoned"
    );
  }

  async finish(
    accountId: string,
    id: string,
    outcome: "completed" | "failed" | "cancelled",
    content: string,
    usage?: { inputTokens: number; outputTokens: number; neurons?: number },
    failureKind?: string
  ): Promise<GenerationRow> {
    const q = this.db.createQueryRunner();
    await q.connect();
    await q.startTransaction();
    try {
      const rows: GenerationRow[] = await q.query(
        `SELECT * FROM webdev_mentor_generations WHERE id=$1 AND account_id=$2 FOR UPDATE`,
        [id, accountId]
      );
      const row = rows[0];
      if (!row) throw new NotFoundException();
      if (
        ["completed", "failed", "cancelled", "abandoned"].includes(row.state)
      ) {
        await q.commitTransaction();
        return row;
      }
      const finalState =
        row.state === "cancel_requested" ? "cancelled" : outcome;
      let messageId: string | null = null;
      if (content && row.conversation_id) {
        const owners: { id: string }[] = await q.query(
          `SELECT id FROM webdev_mentor_conversations WHERE id=$1 AND account_id=$2 FOR UPDATE`,
          [row.conversation_id, accountId]
        );
        if (owners.length) {
          const [{ next }]: { next: number }[] = await q.query(
            `SELECT coalesce(max(sequence),0)+1 AS next FROM webdev_mentor_messages WHERE conversation_id=$1`,
            [row.conversation_id]
          );
          messageId = randomUUID();
          await q.query(
            `INSERT INTO webdev_mentor_messages(id,conversation_id,account_id,sequence,role,content,status)
             VALUES($1,$2,$3,$4,'assistant',$5,$6)`,
            [
              messageId,
              row.conversation_id,
              accountId,
              next,
              content.slice(0, 4000),
              finalState === "completed" ? "complete" : "partial",
            ]
          );
        }
      }
      const bill = Boolean(row.dispatched_at);
      await q.query(
        `UPDATE webdev_mentor_generations SET state=$3,assistant_message_id=$4,
         accounted_neurons=$5,input_tokens=$6,output_tokens=$7,failure_kind=$8,
         reported_neurons=$9,updated_at=now()
         WHERE id=$1 AND account_id=$2`,
        [
          id,
          accountId,
          finalState,
          messageId,
          bill ? RESERVATION_NEURONS : 0,
          usage?.inputTokens ?? null,
          usage?.outputTokens ?? null,
          failureKind ?? null,
          usage?.neurons ?? null,
        ]
      );
      await this.settle(q, row, bill);
      await q.commitTransaction();
      return {
        ...row,
        state: finalState,
        assistant_message_id: messageId,
        failure_kind: failureKind ?? null,
      };
    } catch (error) {
      await q.rollbackTransaction();
      throw error;
    } finally {
      await q.release();
    }
  }

  async receipt(accountId: string, id: string) {
    await this.reap();
    const row = await this.get(accountId, id);
    const messages: { content: string; status: string }[] =
      row.assistant_message_id
        ? await this.db.query(
            `SELECT content,status FROM webdev_mentor_messages WHERE id=$1 AND account_id=$2`,
            [row.assistant_message_id, accountId]
          )
        : [];
    return {
      generationId: row.id,
      state: row.state,
      userMessageId: row.user_message_id,
      messageId: row.assistant_message_id,
      proposalId: row.proposal_id,
      content: messages[0]?.content ?? null,
      partial: messages[0]?.status === "partial",
      failureCode: row.failure_kind,
    };
  }
}
