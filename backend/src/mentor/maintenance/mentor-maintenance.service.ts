import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { returnedRows } from "../mentor-sql";
import { GenerationStore } from "../generation/generation.store";

const HOUR_MS = 60 * 60 * 1000;
const BATCH_SIZE = 500;
const ACTIVE = "('reserved','dispatched','streaming','cancel_requested')";

type RetentionCounts = {
  conversations: number;
  proposals: number;
  generations: number;
  budgetBuckets: number;
};

@Injectable()
export class MentorMaintenanceService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MentorMaintenanceService.name);
  private timer?: ReturnType<typeof setInterval>;
  private running = false;

  constructor(
    @InjectDataSource() private readonly db: DataSource,
    private readonly generations: GenerationStore
  ) {}

  onModuleInit(): void {
    // Backend may be deployed before mentor migrations with its flag off.
    if (process.env.AI_MENTOR_ENABLED !== "true") return;
    void this.run().catch(() =>
      this.logger.warn("Mentor maintenance deferred; retry scheduled")
    );
    this.timer = setInterval(() => {
      void this.run().catch(() =>
        this.logger.warn("Mentor maintenance deferred; retry scheduled")
      );
    }, HOUR_MS);
    this.timer.unref();
  }

  onModuleDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  async run(): Promise<RetentionCounts | null> {
    if (this.running) return null;
    this.running = true;
    try {
      // Expire abandoned work before checking for active generations.
      await this.generations.reap();
      const counts = await this.db.transaction(async (q) => {
        const [lock]: { locked: boolean }[] = await q.query(
          "SELECT pg_try_advisory_xact_lock(1791260000) AS locked"
        );
        if (!lock.locked) return null;
        const conversations = returnedRows<{ id: string }>(
          await q.query(
            `WITH stale AS (
             SELECT c.id FROM webdev_mentor_conversations c
             WHERE c.updated_at < now() - interval '90 days'
               AND NOT EXISTS (
                 SELECT 1 FROM webdev_mentor_generations g
                 WHERE g.conversation_id=c.id AND g.state IN ${ACTIVE}
               )
             ORDER BY c.updated_at LIMIT $1 FOR UPDATE OF c SKIP LOCKED
           )
           DELETE FROM webdev_mentor_conversations c USING stale
           WHERE c.id=stale.id RETURNING c.id`,
            [BATCH_SIZE]
          )
        );
        const proposals = returnedRows<{ id: string }>(
          await q.query(
            `DELETE FROM webdev_learning_path_revisions
           WHERE id IN (
             SELECT id FROM webdev_learning_path_revisions
             WHERE state IN ('proposed','discarded')
               AND created_at < now() - interval '30 days'
             ORDER BY created_at LIMIT $1
           ) RETURNING id`,
            [BATCH_SIZE]
          )
        );
        const generations = returnedRows<{ id: string }>(
          await q.query(
            `DELETE FROM webdev_mentor_generations
           WHERE id IN (
             SELECT id FROM webdev_mentor_generations
             WHERE state IN ('completed','failed','cancelled','abandoned')
               AND created_at < now() - interval '30 days'
             ORDER BY created_at LIMIT $1
           ) RETURNING id`,
            [BATCH_SIZE]
          )
        );
        const budgetBuckets = returnedRows<{ scope: string }>(
          await q.query(
            `WITH stale AS (
             SELECT scope,subject_key,period_start FROM webdev_ai_budget_buckets
             WHERE (scope='account-minute' AND period_start < now() - interval '2 days')
                OR (scope<>'account-minute' AND period_start < now() - interval '90 days')
             ORDER BY period_start LIMIT $1
           )
           DELETE FROM webdev_ai_budget_buckets b USING stale
           WHERE b.scope=stale.scope AND b.subject_key=stale.subject_key
             AND b.period_start=stale.period_start RETURNING b.scope`,
            [BATCH_SIZE]
          )
        );
        return {
          conversations: conversations.length,
          proposals: proposals.length,
          generations: generations.length,
          budgetBuckets: budgetBuckets.length,
        };
      });
      if (counts && Object.values(counts).some(Boolean))
        this.logger.log(
          `Mentor retention completed: ${JSON.stringify(counts)}`
        );
      return counts;
    } finally {
      this.running = false;
    }
  }
}
