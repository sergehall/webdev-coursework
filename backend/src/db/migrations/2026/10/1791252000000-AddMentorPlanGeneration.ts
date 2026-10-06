import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddMentorPlanGeneration1791252000000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      ALTER TABLE webdev_mentor_generations
        ADD COLUMN intent varchar(16) NOT NULL DEFAULT 'chat'
          CHECK (intent IN ('chat','propose_plan')),
        ADD COLUMN proposal_id uuid REFERENCES webdev_learning_path_revisions(id) ON DELETE SET NULL;
      ALTER TABLE webdev_learning_path_revisions
        ADD COLUMN metadata jsonb,
        ADD COLUMN catalog_version varchar(80),
        ADD COLUMN generation_id uuid UNIQUE REFERENCES webdev_mentor_generations(id) ON DELETE SET NULL;
    `);
  }

  async down(q: QueryRunner): Promise<void> {
    await q.query(`
      ALTER TABLE webdev_learning_path_revisions
        DROP COLUMN generation_id, DROP COLUMN catalog_version, DROP COLUMN metadata;
      ALTER TABLE webdev_mentor_generations
        DROP COLUMN proposal_id, DROP COLUMN intent;
    `);
  }
}
