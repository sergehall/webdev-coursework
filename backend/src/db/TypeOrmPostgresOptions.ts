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
    const databaseUrl = process.env.DATABASE_URL?.trim();
    if (!databaseUrl) {
      throw new Error(
        "DATABASE_URL is required for database connection configuration"
      );
    }

    const isProduction = process.env.NODE_ENV === "production";
    // Keep schema sync opt-in only. Implicit dev synchronize can trigger
    // noisy/unsafe startup behavior and should not run by default.
    const synchronize = process.env.TYPEORM_SYNCHRONIZE === "true";
    // Heroku PostgreSQL can be slow to accept connections on cold start.
    // Default: 10 attempts × 3 s = up to 30 s total wait time.
    const retryAttempts = parseIntEnv(process.env.TYPEORM_RETRY_ATTEMPTS, 10);
    const retryDelay = parseIntEnv(process.env.TYPEORM_RETRY_DELAY_MS, 3000);
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
      url: databaseUrl,
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
      ...(useSsl ? { ssl: { rejectUnauthorized: sslRejectUnauthorized } } : {}),
    };
  }
}
