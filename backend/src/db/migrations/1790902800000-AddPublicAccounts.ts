import type { MigrationInterface, QueryRunner } from "typeorm";
export class AddPublicAccounts1790902800000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE webdev_accounts (
        id uuid PRIMARY KEY, role varchar(16) NOT NULL DEFAULT 'user' CHECK (role IN ('root_owner','user')),
        username varchar(40) NOT NULL, email varchar(254), email_verified_at timestamptz,
        github_id varchar(32), password_hash text, revision uuid NOT NULL,
        display_name varchar(80) NOT NULL, time_zone varchar(64) NOT NULL DEFAULT 'America/Los_Angeles',
        theme varchar(8) NOT NULL DEFAULT 'system' CHECK(theme IN ('system','light','dark')),
        report_days integer NOT NULL DEFAULT 30 CHECK(report_days IN (7,30,90)),
        created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE UNIQUE INDEX webdev_accounts_username ON webdev_accounts(lower(username));
      CREATE UNIQUE INDEX webdev_accounts_email ON webdev_accounts(lower(email)) WHERE email IS NOT NULL;
      CREATE UNIQUE INDEX webdev_accounts_github ON webdev_accounts(github_id) WHERE github_id IS NOT NULL;
      CREATE UNIQUE INDEX webdev_accounts_root ON webdev_accounts(role) WHERE role='root_owner';
      INSERT INTO webdev_accounts(id,role,username,password_hash,revision,display_name,time_zone,theme,report_days)
      SELECT '00000000-0000-4000-8000-000000000001','root_owner','sergehall',password_hash,revision,display_name,time_zone,theme,report_days FROM webdev_owner_account;
      CREATE TABLE webdev_account_tokens (
        token_hash char(64) PRIMARY KEY, account_id uuid NOT NULL REFERENCES webdev_accounts(id),
        purpose varchar(16) NOT NULL CHECK(purpose IN ('verify','reset')), expires_at timestamptz NOT NULL,
        revision uuid NOT NULL, used_at timestamptz, created_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE INDEX webdev_account_tokens_expiry ON webdev_account_tokens(expires_at);
      CREATE TABLE webdev_mail_outbox (
        id uuid PRIMARY KEY, account_id uuid NOT NULL REFERENCES webdev_accounts(id),
        template varchar(16) NOT NULL CHECK(template IN ('verify','reset')), token_ciphertext text,
        expires_at timestamptz NOT NULL, status varchar(16) NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','sending','sent','failed')),
        attempts integer NOT NULL DEFAULT 0, next_attempt_at timestamptz NOT NULL DEFAULT now(), lease_until timestamptz,
        failure_kind varchar(16), sent_at timestamptz, created_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE INDEX webdev_mail_outbox_due ON webdev_mail_outbox(status,next_attempt_at);
      CREATE TABLE webdev_runtime_state (key text PRIMARY KEY, value text NOT NULL, expires_at timestamptz NOT NULL);
      CREATE INDEX webdev_runtime_state_expiry ON webdev_runtime_state(expires_at);
      CREATE TABLE webdev_runtime_queue (id bigserial PRIMARY KEY, queue_key text NOT NULL, item jsonb NOT NULL, processing boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now());
      CREATE INDEX webdev_runtime_queue_key ON webdev_runtime_queue(queue_key,processing,id);
    `);
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query(
      "DROP TABLE webdev_runtime_queue, webdev_runtime_state, webdev_mail_outbox, webdev_account_tokens, webdev_accounts"
    );
  }
}
