// backend/src/db/data-source.ts
// TypeORM DataSource used by the TypeORM CLI for generating and running migrations.
//
// Usage:
//   yarn migration:generate src/db/migrations/DescriptiveName
//   yarn migration:run
//   yarn migration:revert
//
// This file is intentionally separate from TypeOrmPostgresOptions so that the
// CLI can load it without booting the full NestJS application.

import "reflect-metadata";
import { DataSource } from "typeorm";
import { CorrectAnswer } from "../quiz/entities/correct-answer.entity";
import { QuizQuestion } from "../quiz/entities/quiz-question.entity";
import { QuizProgress } from "../quiz/entities/quiz-progress.entity";

// The TypeORM CLI reads DATABASE_URL from the environment.
// In local dev set it via:  export $(cat .env | xargs) && yarn migration:run
// or use a tool like dotenv-cli:  npx dotenv -e .env -- yarn migration:run

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) {
  throw new Error("DATABASE_URL must be set to use the TypeORM CLI");
}

const isHerokuDyno = Boolean(process.env.DYNO);
const isProduction = process.env.NODE_ENV === "production";
const useSsl = process.env.POSTGRES_SSL !== "false";
const sslRejectUnauthorized =
  process.env.POSTGRES_SSL_REJECT_UNAUTHORIZED === "true"
    ? true
    : isHerokuDyno
      ? false
      : isProduction;

export const AppDataSource = new DataSource({
  type: "postgres",
  url: databaseUrl,
  entities: [CorrectAnswer, QuizQuestion, QuizProgress],
  migrations: [`${__dirname}/migrations/**/*.{ts,js}`],
  synchronize: false,
  logging: true,
  ...(useSsl ? { ssl: { rejectUnauthorized: sslRejectUnauthorized } } : {}),
});
