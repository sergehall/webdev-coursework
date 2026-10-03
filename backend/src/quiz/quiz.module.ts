// src/quiz/quiz.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminApiKeyGuard } from "../security/guards/admin-api-key.guard";
import { AnswersTokenGuard } from "../tokens/guards/answers-token.guard";
import { TokensModule } from "../tokens/tokens.module";
import { QuizProgress } from "./entities/quiz-progress.entity";
import { QuizQuestion } from "./entities/quiz-question.entity";
import { CorrectAnswerRepository } from "./repository/correct-answer.repository";
import { QuizProgressRepository } from "./repository/quiz-progress.repository";
import { QuizQuestionRepository } from "./repository/quiz-question.repository";
import { QuizService } from "./service/quiz.service";
import { QuizController } from "./api/quiz.controller";
import { CorrectAnswer } from "./entities/correct-answer.entity";
import { ConfigService } from "@nestjs/config";
import { QuizImageController } from "./images/quiz-image.controller";
import {
  createQuizImageS3Client,
  QUIZ_IMAGE_S3_CLIENT,
  QuizImageStorage,
} from "./images/quiz-image.storage";

@Module({
  imports: [
    TokensModule,
    TypeOrmModule.forFeature([CorrectAnswer, QuizQuestion, QuizProgress]),
  ],
  controllers: [QuizController, QuizImageController],
  providers: [
    QuizService,
    QuizQuestionRepository,
    CorrectAnswerRepository,
    QuizProgressRepository,
    AnswersTokenGuard,
    AdminApiKeyGuard,
    QuizImageStorage,
    {
      provide: QUIZ_IMAGE_S3_CLIENT,
      useFactory: createQuizImageS3Client,
      inject: [ConfigService],
    },
  ],
})
export class QuizModule {}
