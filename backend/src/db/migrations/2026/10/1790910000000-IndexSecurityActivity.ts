import type { MigrationInterface, QueryRunner } from "typeorm";
export class IndexSecurityActivity1790910000000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(
      "CREATE INDEX webdev_analytics_audit_page ON webdev_analytics_access_audit(occurred_at DESC,event_id DESC)"
    );
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query("DROP INDEX webdev_analytics_audit_page");
  }
}
