import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddMentorWorkspace1791244800000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE webdev_learner_profiles (
        account_id uuid PRIMARY KEY REFERENCES webdev_accounts(id) ON DELETE CASCADE,
        goal varchar(16) NOT NULL CHECK (goal IN ('frontend','backend','full-stack','explore')),
        level varchar(24) NOT NULL CHECK (level IN ('beginner','foundations','building-projects')),
        weekly_hours smallint NOT NULL CHECK (weekly_hours BETWEEN 1 AND 40),
        goal_text varchar(500) NOT NULL DEFAULT '', language varchar(8) NOT NULL DEFAULT 'en' CHECK(language='en'),
        version integer NOT NULL DEFAULT 1 CHECK(version > 0),
        created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE TABLE webdev_mentor_conversations (
        id uuid PRIMARY KEY, account_id uuid NOT NULL REFERENCES webdev_accounts(id) ON DELETE CASCADE,
        title varchar(100) NOT NULL, status varchar(12) NOT NULL DEFAULT 'active' CHECK(status IN ('active','archived')),
        created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
        UNIQUE(id,account_id)
      );
      CREATE INDEX webdev_mentor_conversations_history ON webdev_mentor_conversations(account_id,updated_at DESC,id DESC);
      CREATE TABLE webdev_mentor_messages (
        id uuid PRIMARY KEY, conversation_id uuid NOT NULL, account_id uuid NOT NULL,
        sequence integer NOT NULL CHECK(sequence > 0), role varchar(12) NOT NULL CHECK(role IN ('user','assistant')),
        content varchar(4000) NOT NULL, status varchar(16) NOT NULL DEFAULT 'complete' CHECK(status IN ('complete','partial')),
        created_at timestamptz NOT NULL DEFAULT now(),
        FOREIGN KEY(conversation_id,account_id) REFERENCES webdev_mentor_conversations(id,account_id) ON DELETE CASCADE,
        UNIQUE(conversation_id,sequence)
      );
      CREATE INDEX webdev_mentor_messages_history ON webdev_mentor_messages(account_id,conversation_id,sequence DESC);
      CREATE TABLE webdev_learning_paths (
        id uuid PRIMARY KEY, account_id uuid NOT NULL UNIQUE REFERENCES webdev_accounts(id) ON DELETE CASCADE,
        current_revision integer NOT NULL DEFAULT 0 CHECK(current_revision >= 0),
        created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
        UNIQUE(id,account_id)
      );
      CREATE TABLE webdev_learning_path_revisions (
        id uuid PRIMARY KEY, path_id uuid NOT NULL, account_id uuid NOT NULL,
        revision integer, base_revision integer NOT NULL CHECK(base_revision >= 0),
        profile_version integer NOT NULL CHECK(profile_version > 0),
        state varchar(12) NOT NULL CHECK(state IN ('proposed','accepted','discarded')),
        content jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), accepted_at timestamptz,
        FOREIGN KEY(path_id,account_id) REFERENCES webdev_learning_paths(id,account_id) ON DELETE CASCADE,
        UNIQUE(path_id,revision), UNIQUE(id,path_id,account_id)
      );
      CREATE INDEX webdev_learning_path_revisions_history ON webdev_learning_path_revisions(account_id,created_at DESC,id DESC);
      CREATE TABLE webdev_learning_milestone_progress (
        path_id uuid NOT NULL, account_id uuid NOT NULL, milestone_id varchar(100) NOT NULL,
        status varchar(12) NOT NULL CHECK(status IN ('pending','done')),
        version integer NOT NULL DEFAULT 1 CHECK(version > 0), updated_at timestamptz NOT NULL DEFAULT now(),
        PRIMARY KEY(path_id,milestone_id),
        FOREIGN KEY(path_id,account_id) REFERENCES webdev_learning_paths(id,account_id) ON DELETE CASCADE
      );
    `);
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query(
      `DROP TABLE webdev_learning_milestone_progress, webdev_learning_path_revisions, webdev_learning_paths, webdev_mentor_messages, webdev_mentor_conversations, webdev_learner_profiles`
    );
  }
}
