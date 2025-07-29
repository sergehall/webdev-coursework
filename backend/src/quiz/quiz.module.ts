// src/quiz/quiz.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizProgress } from "./entities/quiz-progress.entity";
import { QuizQuestion } from "./entities/quiz-question.entity";
import { CorrectAnswerRepository } from "./repository/correct-answer.repository";
import { QuizProgressRepository } from "./repository/quiz-progress.repository";
import { QuizQuestionRepository } from "./repository/quiz-question.repository";
import { QuizService } from "./service/quiz.service";
import { QuizController } from "./api/quiz.controller";
import { CorrectAnswer } from "./entities/correct-answer.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([CorrectAnswer, QuizQuestion, QuizProgress]),
  ],
  controllers: [QuizController],
  providers: [
    QuizService,
    QuizQuestionRepository,
    CorrectAnswerRepository,
    QuizProgressRepository,
  ],
})
export class QuizModule {}
