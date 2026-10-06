import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddMentorGenerationPause1791255600000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE webdev_ai_generation_control (
        id smallint PRIMARY KEY CHECK (id = 1),
        muted_at timestamptz,
        reason varchar(32) CHECK (reason IN ('app_budget','cloudflare_quota')),
        CHECK ((muted_at IS NULL) = (reason IS NULL))
      );
      INSERT INTO webdev_ai_generation_control(id) VALUES (1);
      CREATE TABLE webdev_ai_budget_alerts (
        id uuid PRIMARY KEY,
        reason varchar(32) NOT NULL CHECK (reason IN ('app_budget','cloudflare_quota')),
        budget_day date NOT NULL,
        accounted_neurons integer NOT NULL CHECK (accounted_neurons >= 0),
        created_at timestamptz NOT NULL DEFAULT now(),
        status varchar(12) NOT NULL DEFAULT 'pending'
          CHECK (status IN ('pending','sending','sent')),
        attempts integer NOT NULL DEFAULT 0 CHECK (attempts >= 0),
        next_attempt_at timestamptz NOT NULL DEFAULT now(),
        lease_until timestamptz,
        sent_at timestamptz
      );
      CREATE INDEX webdev_ai_budget_alerts_due
        ON webdev_ai_budget_alerts(status,next_attempt_at,created_at);
      CREATE TABLE webdev_ai_control_audit (
        id uuid PRIMARY KEY,
        action varchar(16) NOT NULL CHECK (action IN ('pause','resume')),
        reason varchar(32),
        actor varchar(120) NOT NULL,
        occurred_at timestamptz NOT NULL DEFAULT now()
      );
    `);
  }

  async down(q: QueryRunner): Promise<void> {
    await q.query(`
      DROP TABLE webdev_ai_control_audit;
      DROP TABLE webdev_ai_budget_alerts;
      DROP TABLE webdev_ai_generation_control;
    `);
  }
}
