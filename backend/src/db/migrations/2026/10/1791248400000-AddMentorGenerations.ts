import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddMentorGenerations1791248400000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE webdev_mentor_generations (
        id uuid PRIMARY KEY,
        account_id uuid NOT NULL REFERENCES webdev_accounts(id) ON DELETE CASCADE,
        conversation_id uuid,
        client_request_id uuid NOT NULL,
        payload_hash char(64) NOT NULL,
        user_message_id uuid,
        assistant_message_id uuid,
        state varchar(20) NOT NULL CHECK (state IN ('reserved','dispatched','streaming','cancel_requested','completed','failed','cancelled','abandoned')),
        model varchar(80) NOT NULL,
        reserved_neurons integer NOT NULL CHECK (reserved_neurons >= 0),
        budget_day timestamptz NOT NULL,
        accounted_neurons integer NOT NULL DEFAULT 0 CHECK (accounted_neurons >= 0),
        reported_neurons numeric(12,3),
        input_tokens integer,
        output_tokens integer,
        failure_kind varchar(32),
        dispatched_at timestamptz,
        lease_until timestamptz NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        UNIQUE(account_id,client_request_id),
        FOREIGN KEY(conversation_id,account_id) REFERENCES webdev_mentor_conversations(id,account_id) ON DELETE SET NULL (conversation_id),
        FOREIGN KEY(user_message_id) REFERENCES webdev_mentor_messages(id) ON DELETE SET NULL,
        FOREIGN KEY(assistant_message_id) REFERENCES webdev_mentor_messages(id) ON DELETE SET NULL
      );
      CREATE UNIQUE INDEX webdev_mentor_one_active_generation ON webdev_mentor_generations(account_id)
        WHERE state IN ('reserved','dispatched','streaming','cancel_requested');
      CREATE INDEX webdev_mentor_generation_leases ON webdev_mentor_generations(state,lease_until);
      CREATE INDEX webdev_mentor_generation_retention ON webdev_mentor_generations(created_at);
      CREATE TABLE webdev_ai_budget_buckets (
        scope varchar(16) NOT NULL CHECK (scope IN ('global-day','account-day','account-minute')),
        subject_key varchar(64) NOT NULL,
        period_start timestamptz NOT NULL,
        request_count integer NOT NULL DEFAULT 0 CHECK (request_count >= 0),
        reserved_neurons integer NOT NULL DEFAULT 0 CHECK (reserved_neurons >= 0),
        consumed_neurons integer NOT NULL DEFAULT 0 CHECK (consumed_neurons >= 0),
        PRIMARY KEY(scope,subject_key,period_start)
      );
    `);
  }

  async down(q: QueryRunner): Promise<void> {
    await q.query(
      "DROP TABLE webdev_ai_budget_buckets, webdev_mentor_generations"
    );
  }
}
