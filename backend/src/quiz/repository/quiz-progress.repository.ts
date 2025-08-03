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
    const existing = await this.findByClientAppAndCourse(
      clientId,
      appId,
      courseId
    );
    const current = existing?.completedModules ?? [];

    if (current.includes(moduleNumber)) return;

    const updated = [...new Set([...current, moduleNumber])].sort(
      (a, b) => a - b
    );

    if (existing) {
      existing.completedModules = updated;
      await this.save(existing);
    } else {
      await this.save({
        clientId,
        appId,
        courseId,
        completedModules: [moduleNumber],
        createdAt: new Date().toISOString(),
      });
    }
  }

  async unmarkCompleted(
    clientId: string,
    appId: string,
    courseId: string,
    moduleNumber: number
  ): Promise<void> {
    const existing = await this.findByClientAppAndCourse(
      clientId,
      appId,
      courseId
    );
    if (!existing) return;

    existing.completedModules = existing.completedModules.filter(
      (m) => m !== moduleNumber
    );
    await this.save(existing);
  }

  async resetProgress(
    clientId: string,
    appId: string,
    courseId: string
  ): Promise<void> {
    await this.delete({ clientId, appId, courseId });
  }
}
