// src/tokens/tokens.module.ts
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { TokensController } from "./api/tokens.controller";
import { QuizAnswersJwtConfig } from "./config/quiz-answers-jwt.config";
import { TokensService } from "./service/tokens.service";

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync(QuizAnswersJwtConfig.getAsyncConfig()),
  ],
  controllers: [TokensController],
  providers: [TokensService],
  exports: [TokensService, JwtModule],
})
export class TokensModule {}
