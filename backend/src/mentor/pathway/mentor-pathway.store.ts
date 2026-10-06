import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { randomUUID } from "crypto";
import { DataSource, QueryRunner } from "typeorm";
import type { MilestoneInput } from "../api/mentor-input";
import { returnedRows } from "../mentor-sql";

type PathRow = { id: string; current_revision: number };
type RevisionRow = {
  id: string;
  path_id: string;
  revision: number | null;
  base_revision: number;
  profile_version: number;
  state: string;
  content: MilestoneInput[];
  created_at: string;
};
@Injectable()
export class MentorPathwayStore {
  constructor(@InjectDataSource() private readonly db: DataSource) {}
  async current(accountId: string) {
    const paths: PathRow[] = await this.db.query(
      `SELECT id,current_revision FROM webdev_learning_paths WHERE account_id=$1`,
      [accountId]
    );
    const path = paths[0];
    if (!path || !path.current_revision) return null;
    const revisions: RevisionRow[] = await this.db.query(
      `SELECT id,revision,content FROM webdev_learning_path_revisions
       WHERE path_id=$1 AND account_id=$2 AND revision=$3 AND state='accepted'`,
      [path.id, accountId, path.current_revision]
    );
    const progress: {
      milestone_id: string;
      status: string;
      version: number;
    }[] = await this.db.query(
      `SELECT milestone_id,status,version FROM webdev_learning_milestone_progress WHERE path_id=$1 AND account_id=$2`,
      [path.id, accountId]
    );
    return {
      id: path.id,
      version: path.current_revision,
      revisionId: revisions[0].id,
      milestones: revisions[0].content,
      progress,
    };
  }
  async revisions(accountId: string, limit: number, cursor: string | null) {
    const rows: RevisionRow[] = await this.db.query(
      `SELECT id,revision,content,created_at FROM webdev_learning_path_revisions
       WHERE account_id=$1 AND state='accepted' AND
       ($2::uuid IS NULL OR (created_at,id)<(SELECT created_at,id FROM webdev_learning_path_revisions WHERE id=$2 AND account_id=$1))
       ORDER BY created_at DESC,id DESC LIMIT $3`,
      [accountId, cursor, limit + 1]
    );
    return {
      entries: rows.slice(0, limit),
      nextCursor: rows.length > limit ? rows[limit - 1].id : null,
    };
  }
  async proposal(accountId: string, proposalId: string) {
    const rows: RevisionRow[] = await this.db.query(
      `SELECT id,path_id,base_revision,profile_version,state,content,created_at
       FROM webdev_learning_path_revisions WHERE id=$1 AND account_id=$2`,
      [proposalId, accountId]
    );
    if (!rows.length) throw new NotFoundException("Proposal not found");
    return rows[0];
  }
  async latestProposal(accountId: string) {
    const rows: RevisionRow[] = await this.db.query(
      `SELECT id,path_id,base_revision,profile_version,state,content,created_at
       FROM webdev_learning_path_revisions WHERE account_id=$1 AND state='proposed'
       ORDER BY created_at DESC,id DESC LIMIT 1`,
      [accountId]
    );
    return rows[0] ?? null;
  }
  async propose(
    accountId: string,
    milestones: MilestoneInput[],
    expectedProfileVersion: number
  ) {
    return this.transaction(async (runner) => {
      const profiles: { version: number }[] = await runner.query(
        `SELECT version FROM webdev_learner_profiles WHERE account_id=$1`,
        [accountId]
      );
      if (!profiles.length || profiles[0].version !== expectedProfileVersion)
        throw new ConflictException("Profile version changed");
      await runner.query(
        `INSERT INTO webdev_learning_paths(id,account_id) VALUES($1,$2) ON CONFLICT(account_id) DO NOTHING`,
        [randomUUID(), accountId]
      );
      const [path]: PathRow[] = await runner.query(
        `SELECT id,current_revision FROM webdev_learning_paths WHERE account_id=$1 FOR UPDATE`,
        [accountId]
      );
      const id = randomUUID();
      await runner.query(
        `INSERT INTO webdev_learning_path_revisions(id,path_id,account_id,base_revision,profile_version,state,content)
         VALUES($1,$2,$3,$4,$5,'proposed',$6::jsonb)`,
        [
          id,
          path.id,
          accountId,
          path.current_revision,
          expectedProfileVersion,
          JSON.stringify(milestones),
        ]
      );
      return {
        id,
        baseRevision: path.current_revision,
        profileVersion: expectedProfileVersion,
        milestones,
      };
    });
  }
  async accept(
    accountId: string,
    proposalId: string,
    expectedVersion: number,
    expectedProfileVersion: number
  ) {
    const accepted = await this.transaction(async (runner) => {
      const [path]: PathRow[] = await runner.query(
        `SELECT id,current_revision FROM webdev_learning_paths WHERE account_id=$1 FOR UPDATE`,
        [accountId]
      );
      if (!path) throw new NotFoundException("Proposal not found");
      const rows: RevisionRow[] = await runner.query(
        `SELECT id,base_revision,profile_version,state,content FROM webdev_learning_path_revisions
         WHERE id=$1 AND path_id=$2 AND account_id=$3 FOR UPDATE`,
        [proposalId, path.id, accountId]
      );
      const proposal = rows[0];
      if (!proposal) throw new NotFoundException("Proposal not found");
      const profiles: { version: number }[] = await runner.query(
        `SELECT version FROM webdev_learner_profiles WHERE account_id=$1`,
        [accountId]
      );
      if (
        proposal.state !== "proposed" ||
        path.current_revision !== expectedVersion ||
        proposal.base_revision !== expectedVersion ||
        proposal.profile_version !== expectedProfileVersion ||
        profiles[0]?.version !== expectedProfileVersion
      )
        throw new ConflictException("Path or profile version changed");
      const revision = path.current_revision + 1;
      await runner.query(
        `UPDATE webdev_learning_path_revisions SET state='accepted',revision=$3,accepted_at=now()
         WHERE id=$1 AND account_id=$2`,
        [proposalId, accountId, revision]
      );
      await runner.query(
        `UPDATE webdev_learning_paths SET current_revision=$2,updated_at=now() WHERE id=$1`,
        [path.id, revision]
      );
      const ids = proposal.content.map((step) => step.id);
      await runner.query(
        `DELETE FROM webdev_learning_milestone_progress WHERE path_id=$1 AND account_id=$2 AND NOT(milestone_id=ANY($3::varchar[]))`,
        [path.id, accountId, ids]
      );
      return true;
    });
    if (accepted) return this.current(accountId);
  }
  async discard(accountId: string, proposalId: string) {
    const rows = returnedRows<{ id: string }>(
      await this.db.query(
        `UPDATE webdev_learning_path_revisions SET state='discarded'
       WHERE id=$1 AND account_id=$2 AND state='proposed' RETURNING id`,
        [proposalId, accountId]
      )
    );
    if (!rows.length) throw new NotFoundException("Proposal not found");
    return { discarded: true };
  }
  async progress(
    accountId: string,
    milestoneId: string,
    status: "done" | "pending",
    expectedVersion: number | null,
    expectedPathVersion: number
  ) {
    return this.transaction(async (runner) => {
      const [path]: PathRow[] = await runner.query(
        `SELECT id,current_revision FROM webdev_learning_paths WHERE account_id=$1 FOR UPDATE`,
        [accountId]
      );
      if (!path || path.current_revision !== expectedPathVersion)
        throw new ConflictException("Path version changed");
      const [revision]: RevisionRow[] = await runner.query(
        `SELECT content FROM webdev_learning_path_revisions WHERE path_id=$1 AND account_id=$2 AND revision=$3 AND state='accepted'`,
        [path.id, accountId, path.current_revision]
      );
      if (!revision.content.some((step) => step.id === milestoneId))
        throw new NotFoundException("Milestone not found");
      if (expectedVersion === null) {
        const rows: { version: number }[] = await runner.query(
          `INSERT INTO webdev_learning_milestone_progress(path_id,account_id,milestone_id,status)
           VALUES($1,$2,$3,$4) ON CONFLICT(path_id,milestone_id) DO NOTHING RETURNING version`,
          [path.id, accountId, milestoneId, status]
        );
        if (!rows.length)
          throw new ConflictException("Progress version changed");
        return { milestoneId, status, version: rows[0].version };
      }
      const rows = returnedRows<{ version: number }>(
        await runner.query(
          `UPDATE webdev_learning_milestone_progress SET status=$4,version=version+1,updated_at=now()
         WHERE path_id=$1 AND account_id=$2 AND milestone_id=$3 AND version=$5 RETURNING version`,
          [path.id, accountId, milestoneId, status, expectedVersion]
        )
      );
      if (!rows.length) throw new ConflictException("Progress version changed");
      return { milestoneId, status, version: rows[0].version };
    });
  }
  async deleteWorkspace(accountId: string) {
    await this.transaction(async (runner) => {
      await runner.query(
        `UPDATE webdev_mentor_generations SET state='cancel_requested',updated_at=now()
         WHERE account_id=$1 AND state IN ('reserved','dispatched','streaming')`,
        [accountId]
      );
      await runner.query(
        `DELETE FROM webdev_mentor_conversations WHERE account_id=$1`,
        [accountId]
      );
      await runner.query(
        `DELETE FROM webdev_learning_paths WHERE account_id=$1`,
        [accountId]
      );
      await runner.query(
        `DELETE FROM webdev_learner_profiles WHERE account_id=$1`,
        [accountId]
      );
    });
    return { deleted: true };
  }
  private async transaction<T>(
    work: (runner: QueryRunner) => Promise<T>
  ): Promise<T> {
    const runner = this.db.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const result = await work(runner);
      await runner.commitTransaction();
      return result;
    } catch (error) {
      await runner.rollbackTransaction();
      throw error;
    } finally {
      await runner.release();
    }
  }
}
