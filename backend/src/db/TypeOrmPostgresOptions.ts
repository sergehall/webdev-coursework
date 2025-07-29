import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { CorrectAnswer } from "../quiz/entities/correct-answer.entity";
import { QuizQuestion } from "../quiz/entities/quiz-question.entity";

@Injectable()
export class TypeOrmPostgresOptions implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const host = process.env.POSTGRES_HOST;
    const port = parseInt(process.env.PG_PORT as string, 10) || 5432;
    const username = process.env.POSTGRES_USER;
    const password = process.env.POSTGRES_PASSWORD;
    const database = process.env.POSTGRES_NAME_DB;

    return {
      type: "postgres",
      host,
      port,
      username,
      password,
      database,
      autoLoadEntities: true,
      ssl: { rejectUnauthorized: false },
      entities: [CorrectAnswer, QuizQuestion],
      synchronize: true,
      logging: false,
    };
  }
}
