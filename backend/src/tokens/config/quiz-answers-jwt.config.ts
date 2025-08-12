// src/tokens/config/quiz-answers-jwt.config.ts
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export class QuizAnswersJwtConfig {
  static getAsyncConfig(): JwtModuleAsyncOptions {
    return {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get<string>("QUIZ_ANSWERS_JWT_SECRET")!,
        signOptions: {
          expiresIn: cfg.get<string>("QUIZ_ANSWERS_JWT_TTL"),
          issuer: cfg.get<string>("QUIZ_JWT_ISSUER"),
          audience: cfg.get<string>("QUIZ_JWT_AUDIENCE"),
          algorithm: "HS256",
        },
      }),
    };
  }
}
