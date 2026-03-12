// src/tokens/config/quiz-answers-jwt.config.ts
import { ConfigModule, ConfigService } from "@nestjs/config";
import type { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";
import type { StringValue } from "ms";

export class QuizAnswersJwtConfig {
  static getAsyncConfig(): JwtModuleAsyncOptions {
    return {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService): JwtModuleOptions => {
        const ttl = cfg.get<string>("QUIZ_ANSWERS_JWT_TTL") ?? undefined;

        // Преобразуем env в ожидаемый тип:
        // - "3600" -> number
        // - "1h"/"30m" -> StringValue (только приведение типа для TS)
        const expiresIn: number | StringValue | undefined =
          ttl == null
            ? undefined
            : /^\d+$/.test(ttl)
              ? Number(ttl)
              : (ttl as unknown as StringValue);

        return {
          secret: cfg.getOrThrow<string>("QUIZ_ANSWERS_JWT_SECRET"),
          signOptions: {
            expiresIn,
            issuer: cfg.get<string>("QUIZ_JWT_ISSUER"),
            audience: cfg.get<string>("QUIZ_JWT_AUDIENCE"),
            algorithm: "HS256",
          },
        };
      },
    };
  }
}
