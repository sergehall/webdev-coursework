import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { CorrectAnswer } from "../quiz/entities/correct-answer.entity";
import { QuizQuestion } from "../quiz/entities/quiz-question.entity";

function parseIntEnv(
  value: string | undefined,
  fallback: number,
  min = 1
): number {
  const parsed = Number.parseInt(value ?? "", 10);
  if (Number.isNaN(parsed)) return fallback;
  return parsed < min ? min : parsed;
}

function parseBoolEnv(value: string | undefined): boolean | undefined {
  if (value == null) return undefined;
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

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
    const retryAttempts = parseIntEnv(
      process.env.TYPEORM_RETRY_ATTEMPTS,
      3
    );
    const retryDelay = parseIntEnv(
      process.env.TYPEORM_RETRY_DELAY_MS,
      1000
    );
    const poolMax = parseIntEnv(process.env.TYPEORM_POOL_MAX, 10);
    const statementTimeoutMs = parseIntEnv(
      process.env.TYPEORM_STATEMENT_TIMEOUT_MS,
      15000
    );
    const useSsl = parseBoolEnv(process.env.POSTGRES_SSL) ?? true;
    const isHerokuDyno = Boolean(process.env.DYNO);
    const sslRejectUnauthorized =
      parseBoolEnv(process.env.POSTGRES_SSL_REJECT_UNAUTHORIZED) ??
      (isHerokuDyno ? false : isProduction);

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
      retryAttempts,
      retryDelay,
      logging: false,
      extra: {
        max: poolMax,
        statement_timeout: statementTimeoutMs,
      },
      ...(useSsl
        ? { ssl: { rejectUnauthorized: sslRejectUnauthorized } }
        : {}),
    };
  }
}
