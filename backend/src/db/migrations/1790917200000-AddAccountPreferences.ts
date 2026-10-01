import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountPreferences1790917200000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`ALTER TABLE webdev_accounts
      ADD COLUMN date_format varchar(12) NOT NULL DEFAULT 'medium' CHECK (date_format IN ('medium','day-first','iso')),
      ADD COLUMN clock_format varchar(3) NOT NULL DEFAULT '12h' CHECK (clock_format IN ('12h','24h')),
      ADD COLUMN activity_days integer NOT NULL DEFAULT 7 CHECK (activity_days IN (1,7,30,365)),
      ADD COLUMN activity_page_size integer NOT NULL DEFAULT 10 CHECK (activity_page_size IN (10,25,50))`);
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query(`ALTER TABLE webdev_accounts DROP COLUMN date_format,
      DROP COLUMN clock_format, DROP COLUMN activity_days, DROP COLUMN activity_page_size`);
  }
}
