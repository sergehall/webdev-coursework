import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountProviders1790924400000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      ALTER TABLE webdev_accounts ADD COLUMN github_username varchar(39);
      ALTER TABLE webdev_account_tokens ADD COLUMN target_email varchar(254);
      ALTER TABLE webdev_mail_outbox ADD COLUMN recipient varchar(254);
      ALTER TABLE webdev_account_tokens DROP CONSTRAINT webdev_account_tokens_purpose_check;
      ALTER TABLE webdev_account_tokens ADD CONSTRAINT webdev_account_tokens_purpose_check CHECK(purpose IN ('verify','reset','add-email'));
      ALTER TABLE webdev_mail_outbox DROP CONSTRAINT webdev_mail_outbox_template_check;
      ALTER TABLE webdev_mail_outbox ADD CONSTRAINT webdev_mail_outbox_template_check CHECK(template IN ('verify','reset','add-email'));
    `);
  }
  async down(q: QueryRunner): Promise<void> {
    // Refuse rollback while live confirmation intents require the new schema.
    const [row]: { active: string }[] = await q.query(
      "SELECT count(*) AS active FROM webdev_account_tokens WHERE purpose='add-email' AND used_at IS NULL AND expires_at>now()"
    );
    if (Number(row.active))
      throw new Error(
        "Pending email confirmations prevent provider migration rollback"
      );
    await q.query(`
      DELETE FROM webdev_mail_outbox WHERE template='add-email';
      DELETE FROM webdev_account_tokens WHERE purpose='add-email';
      ALTER TABLE webdev_mail_outbox DROP CONSTRAINT webdev_mail_outbox_template_check;
      ALTER TABLE webdev_mail_outbox ADD CONSTRAINT webdev_mail_outbox_template_check CHECK(template IN ('verify','reset'));
      ALTER TABLE webdev_account_tokens DROP CONSTRAINT webdev_account_tokens_purpose_check;
      ALTER TABLE webdev_account_tokens ADD CONSTRAINT webdev_account_tokens_purpose_check CHECK(purpose IN ('verify','reset'));
      ALTER TABLE webdev_mail_outbox DROP COLUMN recipient;
      ALTER TABLE webdev_account_tokens DROP COLUMN target_email;
      ALTER TABLE webdev_accounts DROP COLUMN github_username;
    `);
  }
}
