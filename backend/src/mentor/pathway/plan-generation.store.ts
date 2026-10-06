import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { randomUUID } from "node:crypto";
import { DataSource } from "typeorm";
import { RESERVATION_NEURONS } from "../generation/generation-config";
import type { PlanProposal } from "./plan-proposal";

type Generation = {
  state: string;
  conversation_id: string | null;
  budget_day: string;
  dispatched_at: string | null;
  lease_until: string;
};

@Injectable()
export class PlanGenerationStore {
  constructor(@InjectDataSource() private readonly db: DataSource) {}

  async complete(
    accountId: string,
    generationId: string,
    plan: PlanProposal,
    expectedProfileVersion: number,
    expectedPathVersion: number,
    catalogVersion: string,
    usage?: { inputTokens: number; outputTokens: number; neurons?: number }
  ): Promise<{
    state: "completed" | "cancelled" | "failed";
    proposalId?: string;
    messageId?: string;
  }> {
    const q = this.db.createQueryRunner();
    await q.connect();
    await q.startTransaction();
    try {
      const [generation]: Generation[] = await q.query(
        `SELECT state,conversation_id,budget_day,dispatched_at,lease_until FROM webdev_mentor_generations
         WHERE id=$1 AND account_id=$2 AND intent='propose_plan' FOR UPDATE`,
        [generationId, accountId]
      );
      if (!generation) throw new NotFoundException();
      if (generation.state !== "dispatched") {
        await q.commitTransaction();
        return {
          state: ["cancel_requested", "cancelled"].includes(generation.state)
            ? "cancelled"
            : "failed",
        };
      }
      if (new Date(generation.lease_until).getTime() <= Date.now())
        throw new Error("AI_TIMEOUT");
      const [conversation]: { id: string }[] = await q.query(
        `SELECT id FROM webdev_mentor_conversations
         WHERE id=$1 AND account_id=$2 AND status='active' FOR UPDATE`,
        [generation.conversation_id, accountId]
      );
      if (!conversation) throw new Error("WORKSPACE_CHANGED");
      const [profile]: { version: number }[] = await q.query(
        `SELECT version FROM webdev_learner_profiles WHERE account_id=$1 FOR UPDATE`,
        [accountId]
      );
      if (profile?.version !== expectedProfileVersion)
        throw new Error("PROFILE_CHANGED");
      await q.query(
        `INSERT INTO webdev_learning_paths(id,account_id) VALUES($1,$2)
         ON CONFLICT(account_id) DO NOTHING`,
        [randomUUID(), accountId]
      );
      const [path]: { id: string; current_revision: number }[] = await q.query(
        `SELECT id,current_revision FROM webdev_learning_paths WHERE account_id=$1 FOR UPDATE`,
        [accountId]
      );
      if (path.current_revision !== expectedPathVersion)
        throw new Error("PATH_CHANGED");
      const proposalId = randomUUID();
      await q.query(
        `INSERT INTO webdev_learning_path_revisions
         (id,path_id,account_id,base_revision,profile_version,state,content,metadata,catalog_version,generation_id)
         VALUES($1,$2,$3,$4,$5,'proposed',$6::jsonb,$7::jsonb,$8,$9)`,
        [
          proposalId,
          path.id,
          accountId,
          expectedPathVersion,
          expectedProfileVersion,
          JSON.stringify(plan.milestones),
          JSON.stringify(plan.metadata),
          catalogVersion,
          generationId,
        ]
      );
      const [{ next }]: { next: number }[] = await q.query(
        `SELECT coalesce(max(sequence),0)+1 AS next FROM webdev_mentor_messages
         WHERE conversation_id=$1`,
        [conversation.id]
      );
      const messageId = randomUUID();
      await q.query(
        `INSERT INTO webdev_mentor_messages(id,conversation_id,account_id,sequence,role,content)
         VALUES($1,$2,$3,$4,'assistant',$5)`,
        [
          messageId,
          conversation.id,
          accountId,
          next,
          "Your four-week draft is ready. Review the milestones and sources in My path before accepting it.",
        ]
      );
      await q.query(
        `UPDATE webdev_mentor_generations
         SET state='completed',proposal_id=$3,assistant_message_id=$4,
             accounted_neurons=$5,input_tokens=$6,output_tokens=$7,
             reported_neurons=$8,updated_at=now()
         WHERE id=$1 AND account_id=$2`,
        [
          generationId,
          accountId,
          proposalId,
          messageId,
          RESERVATION_NEURONS,
          usage?.inputTokens ?? null,
          usage?.outputTokens ?? null,
          usage?.neurons ?? null,
        ]
      );
      await q.query(
        `UPDATE webdev_ai_budget_buckets
         SET reserved_neurons=reserved_neurons-$2,
             consumed_neurons=consumed_neurons+$2
         WHERE scope='global-day' AND subject_key='all' AND period_start=$1`,
        [generation.budget_day, RESERVATION_NEURONS]
      );
      await q.commitTransaction();
      return { state: "completed", proposalId, messageId };
    } catch (error) {
      await q.rollbackTransaction();
      throw error;
    } finally {
      await q.release();
    }
  }
}
