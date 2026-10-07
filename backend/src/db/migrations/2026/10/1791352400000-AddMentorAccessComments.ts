import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddMentorAccessComments1791352400000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      ALTER TABLE webdev_ai_account_controls
        ADD COLUMN admin_comment varchar(500)
          CHECK (admin_comment IS NULL OR length(btrim(admin_comment)) > 0);
      ALTER TABLE webdev_ai_account_control_audit
        ADD COLUMN admin_comment varchar(500)
          CHECK (admin_comment IS NULL OR length(btrim(admin_comment)) > 0);
    `);
  }

  async down(q: QueryRunner): Promise<void> {
    await q.query(`
      ALTER TABLE webdev_ai_account_control_audit DROP COLUMN admin_comment;
      ALTER TABLE webdev_ai_account_controls DROP COLUMN admin_comment;
    `);
  }
}
