import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountSessions1790920800000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`CREATE TABLE webdev_account_sessions (
      id uuid PRIMARY KEY, token_hash char(64) NOT NULL UNIQUE,
      account_id uuid NOT NULL REFERENCES webdev_accounts(id), revision uuid NOT NULL,
      issued_at timestamptz NOT NULL, expires_at timestamptz NOT NULL,
      last_seen_at timestamptz NOT NULL DEFAULT now(),
      device varchar(8) NOT NULL CHECK (device IN ('phone','tablet','desktop','unknown')),
      os varchar(8) NOT NULL CHECK (os IN ('iOS','Android','Windows','macOS','Linux','Other')),
      browser varchar(8) NOT NULL CHECK (browser IN ('Chrome','Safari','Firefox','Edge','Other')),
      auth_method varchar(8) NOT NULL CHECK (auth_method IN ('password','github','unknown'))
    );
    CREATE INDEX webdev_account_sessions_page ON webdev_account_sessions(account_id,revision,issued_at DESC,id DESC);`);
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query("DROP TABLE webdev_account_sessions");
  }
}
