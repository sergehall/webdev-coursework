import { Injectable, NotFoundException } from "@nestjs/common";
import { CorrectAnswerDto } from "../dto/correct-answer.dto";
import { CreateQuestionDto } from "../dto/create-question.dto";
import { QuizQuestionDto } from "../dto/quiz-question.dto";
import { QuizQuestion } from "../entities/quiz-question.entity";
import { CorrectAnswerRepository } from "../repository/correct-answer.repository";
import { QuizProgressRepository } from "../repository/quiz-progress.repository";
import { QuizQuestionRepository } from "../repository/quiz-question.repository";

@Injectable()
export class QuizService {
  constructor(
    private readonly quizQuestionRepo: QuizQuestionRepository,
    private readonly correctAnswerRepo: CorrectAnswerRepository,
    private readonly quizProgressRepo: QuizProgressRepository
  ) {}

  async getQuizWithQuestions(quizId: string): Promise<QuizQuestionDto[]> {
    const records = await this.quizQuestionRepo.findAllByQuizId(quizId);
    if (!records.length) {
      throw new NotFoundException(`Quiz with ID "${quizId}" not found`);
    }

    return records.map(({ questionId, questionText, options, images }) => ({
      questionId,
      questionText,
      options,
      images: images ?? [],
    }));
  }

  async getCorrectAnswers(quizId: string): Promise<CorrectAnswerDto[]> {
    const records = await this.correctAnswerRepo.findAllByQuizId(quizId);
    if (!records.length) {
      throw new NotFoundException(`Answers for quiz "${quizId}" not found`);
    }

    return records.map(({ questionId, correctAnswer }) => ({
      quizId,
      questionId,
      correctAnswer,
    }));
  }

  async createAndSaveQuestion(
    dto: CreateQuestionDto,
    images: string[]
  ): Promise<QuizQuestion> {
    const question = this.quizQuestionRepo.create({
      quizId: dto.quizId,
      questionId: dto.questionId,
      questionText: dto.questionText,
      options: dto.options,
      images,
    });

    return this.quizQuestionRepo.save(question);
  }

  async getProgress(
    clientId: string,
    appId: string,
    courseId: string
  ): Promise<number[]> {
    const record = await this.quizProgressRepo.findByClientAppAndCourse(
      clientId,
      appId,
      courseId
    );
    return record?.completedModules ?? [];
  }

  async markModuleCompleted(
    clientId: string,
    appId: string,
    courseId: string,
    moduleNumber: number
  ): Promise<void> {
    return this.quizProgressRepo.markCompleted(
      clientId,
      appId,
      courseId,
      moduleNumber
    );
  }

  async unmarkModuleCompleted(
    clientId: string,
    appId: string,
    courseId: string,
    moduleNumber: number
  ): Promise<void> {
    return this.quizProgressRepo.unmarkCompleted(
      clientId,
      appId,
      courseId,
      moduleNumber
    );
  }

  async resetProgress(
    clientId: string,
    appId: string,
    courseId: string
  ): Promise<void> {
    return this.quizProgressRepo.resetProgress(clientId, appId, courseId);
  }
}
