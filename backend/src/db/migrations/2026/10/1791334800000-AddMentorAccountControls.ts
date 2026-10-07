import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddMentorAccountControls1791334800000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE webdev_ai_account_controls (
        account_id uuid PRIMARY KEY REFERENCES webdev_accounts(id) ON DELETE CASCADE,
        disabled_at timestamptz NOT NULL DEFAULT now(),
        disabled_by uuid NOT NULL REFERENCES webdev_accounts(id)
      );
      CREATE TABLE webdev_ai_account_control_audit (
        id uuid PRIMARY KEY,
        account_id uuid NOT NULL,
        actor_account_id uuid NOT NULL,
        enabled boolean NOT NULL,
        occurred_at timestamptz NOT NULL DEFAULT now()
      );
    `);
  }

  async down(q: QueryRunner): Promise<void> {
    await q.query(`
      DROP TABLE webdev_ai_account_control_audit;
      DROP TABLE webdev_ai_account_controls;
    `);
  }
}
