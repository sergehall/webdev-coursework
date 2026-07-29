import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { QuizProgress } from "../entities/quiz-progress.entity";

@Injectable()
export class QuizProgressRepository extends Repository<QuizProgress> {
  constructor(dataSource: DataSource) {
    super(QuizProgress, dataSource.createEntityManager());
  }

  async findByClientAppAndCourse(
    clientId: string,
    appId: string,
    courseId: string
  ): Promise<QuizProgress | null> {
    return this.findOne({ where: { clientId, appId, courseId } });
  }

  async markCompleted(
    clientId: string,
    appId: string,
    courseId: string,
    moduleNumber: number
  ): Promise<void> {
    await this.query(
      `
        INSERT INTO "webdev_quiz_progress"
          ("clientId", "appId", "courseId", "completedModules", "createdAt")
        VALUES ($1, $2, $3, ARRAY[$4]::integer[], $5)
        ON CONFLICT ("clientId", "appId", "courseId")
        DO UPDATE SET "completedModules" = (
          SELECT ARRAY(
            SELECT DISTINCT completed_module
            FROM unnest(
              "webdev_quiz_progress"."completedModules"
              || EXCLUDED."completedModules"
            ) AS completed_module
            ORDER BY completed_module
          )
        )
      `,
      [clientId, appId, courseId, moduleNumber, new Date().toISOString()]
    );
  }

  async unmarkCompleted(
    clientId: string,
    appId: string,
    courseId: string,
    moduleNumber: number
  ): Promise<void> {
    await this.query(
      `
        UPDATE "webdev_quiz_progress"
        SET "completedModules" = array_remove("completedModules", $4)
        WHERE "clientId" = $1
          AND "appId" = $2
          AND "courseId" = $3
          AND $4 = ANY("completedModules")
      `,
      [clientId, appId, courseId, moduleNumber]
    );
  }

  async resetProgress(
    clientId: string,
    appId: string,
    courseId: string
  ): Promise<void> {
    await this.delete({ clientId, appId, courseId });
  }
}
