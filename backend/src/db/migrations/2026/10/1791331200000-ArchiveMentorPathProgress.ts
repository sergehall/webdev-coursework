import type { MigrationInterface, QueryRunner } from "typeorm";

export class ArchiveMentorPathProgress1791331200000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      ALTER TABLE webdev_learning_path_revisions
      ADD COLUMN progress_snapshot jsonb
      CONSTRAINT webdev_learning_path_progress_snapshot_array
      CHECK (progress_snapshot IS NULL OR jsonb_typeof(progress_snapshot) = 'array')
    `);
  }

  async down(q: QueryRunner): Promise<void> {
    await q.query(`
      ALTER TABLE webdev_learning_path_revisions
      DROP COLUMN progress_snapshot
    `);
  }
}
