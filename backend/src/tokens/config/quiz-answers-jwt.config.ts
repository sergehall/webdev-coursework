// src/tokens/config/quiz-answers-jwt.config.ts
import { ConfigModule, ConfigService } from "@nestjs/config";
import type { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";

export class QuizAnswersJwtConfig {
  static getAsyncConfig(): JwtModuleAsyncOptions {
    return {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService): JwtModuleOptions => {
        const ttl = cfg.get<string>("QUIZ_ANSWERS_JWT_TTL") || "5m";
        const match = /^([1-9]\d*)(s|m|h)?$/.exec(ttl);
        const expiresIn = match
          ? Number(match[1]) * ({ s: 1, m: 60, h: 3600 }[match[2] ?? "s"] ?? 0)
          : 0;
        if (
          !Number.isSafeInteger(expiresIn) ||
          expiresIn < 1 ||
          expiresIn > 3600
        ) {
          throw new Error(
            "QUIZ_ANSWERS_JWT_TTL must be 1–3600 seconds, or an s/m/h duration up to one hour"
          );
        }
        const secret = cfg.getOrThrow<string>("QUIZ_ANSWERS_JWT_SECRET");
        if (
          cfg.get<string>("NODE_ENV") === "production" &&
          secret.length < 32
        ) {
          throw new Error(
            "QUIZ_ANSWERS_JWT_SECRET must contain at least 32 characters in production"
          );
        }
        const issuer = cfg.get<string>("QUIZ_JWT_ISSUER");
        const audience = cfg.get<string>("QUIZ_JWT_AUDIENCE");

        return {
          secret,
          signOptions: {
            expiresIn,
            issuer,
            audience,
            algorithm: "HS256",
          },
          verifyOptions: {
            algorithms: ["HS256"],
            issuer,
            audience,
            maxAge: "1h",
          },
        };
      },
    };
  }
}
