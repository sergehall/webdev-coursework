import type { MigrationInterface, QueryRunner } from "typeorm";
export class UseAdminAndClientRoles1790906400000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`ALTER TABLE webdev_accounts DROP CONSTRAINT webdev_accounts_role_check;
      DROP INDEX webdev_accounts_root;
      UPDATE webdev_accounts SET role=CASE WHEN role='root_owner' THEN 'admin' ELSE 'client' END;
      ALTER TABLE webdev_accounts ALTER COLUMN role SET DEFAULT 'client';
      ALTER TABLE webdev_accounts ADD CONSTRAINT webdev_accounts_role_check CHECK(role IN ('admin','client'));
      ALTER TABLE webdev_accounts ADD CONSTRAINT webdev_accounts_primary_admin CHECK(id<>'00000000-0000-4000-8000-000000000001' OR role='admin');`);
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query(`ALTER TABLE webdev_accounts DROP CONSTRAINT webdev_accounts_primary_admin;
      ALTER TABLE webdev_accounts DROP CONSTRAINT webdev_accounts_role_check;
      UPDATE webdev_accounts SET role=CASE WHEN id='00000000-0000-4000-8000-000000000001' THEN 'root_owner' ELSE 'user' END;
      ALTER TABLE webdev_accounts ALTER COLUMN role SET DEFAULT 'user';
      ALTER TABLE webdev_accounts ADD CONSTRAINT webdev_accounts_role_check CHECK(role IN ('root_owner','user'));
      CREATE UNIQUE INDEX webdev_accounts_root ON webdev_accounts(role) WHERE role='root_owner';`);
  }
}
