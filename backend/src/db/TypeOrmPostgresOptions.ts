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
    const isProduction = process.env.NODE_ENV === "production";
    const synchronize =
      process.env.TYPEORM_SYNCHRONIZE === "true" ||
      (!isProduction && process.env.TYPEORM_SYNCHRONIZE !== "false");
    const retryAttempts = Number.parseInt(
      process.env.TYPEORM_RETRY_ATTEMPTS ?? "3",
      10
    );
    const retryDelay = Number.parseInt(
      process.env.TYPEORM_RETRY_DELAY_MS ?? "1000",
      10
    );
    const useSsl = process.env.POSTGRES_SSL !== "false";

    return {
      type: "postgres",
      host,
      port,
      username,
      password,
      database,
      autoLoadEntities: true,
      entities: [CorrectAnswer, QuizQuestion],
      synchronize,
      retryAttempts: Number.isNaN(retryAttempts) ? 3 : retryAttempts,
      retryDelay: Number.isNaN(retryDelay) ? 1000 : retryDelay,
      logging: false,
      ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
    };
  }
}
