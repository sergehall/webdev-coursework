import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountMfa1790913600000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE webdev_mfa_methods (
        account_id uuid PRIMARY KEY REFERENCES webdev_accounts(id),
        method_id uuid NOT NULL, type varchar(8) NOT NULL DEFAULT 'totp' CHECK(type='totp'),
        status varchar(8) NOT NULL CHECK(status IN ('pending','verified','disabled')),
        secret_encrypted text, enrollment_expires_at timestamptz,
        verified_at timestamptz, disabled_at timestamptz, last_used_at timestamptz,
        last_step bigint NOT NULL DEFAULT -1, attempts integer NOT NULL DEFAULT 0,
        locked_until timestamptz, created_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE TABLE webdev_mfa_recovery_codes (
        id uuid PRIMARY KEY, account_id uuid NOT NULL REFERENCES webdev_accounts(id),
        code_hash text NOT NULL, used_at timestamptz, created_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE INDEX webdev_mfa_recovery_account ON webdev_mfa_recovery_codes(account_id) WHERE used_at IS NULL;
      CREATE TABLE webdev_mfa_challenges (
        token_hash char(64) PRIMARY KEY, account_id uuid NOT NULL REFERENCES webdev_accounts(id),
        revision uuid NOT NULL, auth_method varchar(8) NOT NULL CHECK(auth_method IN ('password','github')),
        status varchar(8) NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','consumed','locked')),
        attempts integer NOT NULL DEFAULT 0, expires_at timestamptz NOT NULL,
        consumed_at timestamptz, created_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE INDEX webdev_mfa_challenges_expiry ON webdev_mfa_challenges(expires_at);
    `);
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query(
      "DROP TABLE webdev_mfa_challenges, webdev_mfa_recovery_codes, webdev_mfa_methods"
    );
  }
}
