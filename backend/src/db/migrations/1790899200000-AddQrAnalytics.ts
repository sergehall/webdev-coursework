import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddQrAnalytics1790899200000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE webdev_owner_account (
        owner_id smallint PRIMARY KEY CHECK (owner_id = 1),
        password_hash text NOT NULL,
        revision uuid NOT NULL,
        display_name varchar(80) NOT NULL DEFAULT 'Serge',
        time_zone varchar(64) NOT NULL DEFAULT 'America/Los_Angeles',
        theme varchar(8) NOT NULL DEFAULT 'system' CHECK (theme IN ('system', 'light', 'dark')),
        report_days integer NOT NULL DEFAULT 30 CHECK (report_days IN (7, 30, 90)),
        updated_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE TABLE webdev_qr_events (
        event_id uuid PRIMARY KEY,
        campaign varchar(64) NOT NULL,
        occurred_at timestamptz NOT NULL,
        device varchar(16) NOT NULL,
        os varchar(16) NOT NULL,
        browser varchar(16) NOT NULL
      );
      CREATE INDEX webdev_qr_events_time ON webdev_qr_events (occurred_at);
      CREATE TABLE webdev_qr_daily_stats (
        day date NOT NULL,
        campaign varchar(64) NOT NULL,
        device varchar(16) NOT NULL,
        os varchar(16) NOT NULL,
        browser varchar(16) NOT NULL,
        visits integer NOT NULL CHECK (visits > 0),
        PRIMARY KEY (day, campaign, device, os, browser)
      );
      CREATE TABLE webdev_analytics_access_audit (
        event_id uuid PRIMARY KEY,
        occurred_at timestamptz NOT NULL,
        actor varchar(32) NOT NULL,
        action varchar(64) NOT NULL,
        allowed boolean NOT NULL
      );
      CREATE INDEX webdev_analytics_audit_time ON webdev_analytics_access_audit (occurred_at);
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE webdev_analytics_access_audit; DROP TABLE webdev_qr_daily_stats; DROP TABLE webdev_qr_events; DROP TABLE webdev_owner_account;`
    );
  }
}
