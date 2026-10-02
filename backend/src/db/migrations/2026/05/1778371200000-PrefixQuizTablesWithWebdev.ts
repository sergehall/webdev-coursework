import type { MigrationInterface, QueryRunner } from "typeorm";

export class PrefixQuizTablesWithWebdev1778371200000 implements MigrationInterface {
  name = "PrefixQuizTablesWithWebdev1778371200000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DO $$
      BEGIN
        IF to_regclass('quiz_questions') IS NOT NULL
          AND to_regclass('webdev_quiz_questions') IS NULL THEN
          ALTER TABLE "quiz_questions" RENAME TO "webdev_quiz_questions";
        END IF;
      END $$`
    );
    await queryRunner.query(
      `DO $$
      BEGIN
        IF to_regclass('correct_answers') IS NOT NULL
          AND to_regclass('webdev_correct_answers') IS NULL THEN
          ALTER TABLE "correct_answers" RENAME TO "webdev_correct_answers";
        END IF;
      END $$`
    );
    await queryRunner.query(
      `DO $$
      BEGIN
        IF to_regclass('quiz_progress') IS NOT NULL
          AND to_regclass('webdev_quiz_progress') IS NULL THEN
          ALTER TABLE "quiz_progress" RENAME TO "webdev_quiz_progress";
        END IF;
      END $$`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DO $$
      BEGIN
        IF to_regclass('webdev_quiz_progress') IS NOT NULL
          AND to_regclass('quiz_progress') IS NULL THEN
          ALTER TABLE "webdev_quiz_progress" RENAME TO "quiz_progress";
        END IF;
      END $$`
    );
    await queryRunner.query(
      `DO $$
      BEGIN
        IF to_regclass('webdev_correct_answers') IS NOT NULL
          AND to_regclass('correct_answers') IS NULL THEN
          ALTER TABLE "webdev_correct_answers" RENAME TO "correct_answers";
        END IF;
      END $$`
    );
    await queryRunner.query(
      `DO $$
      BEGIN
        IF to_regclass('webdev_quiz_questions') IS NOT NULL
          AND to_regclass('quiz_questions') IS NULL THEN
          ALTER TABLE "webdev_quiz_questions" RENAME TO "quiz_questions";
        END IF;
      END $$`
    );
  }
}
