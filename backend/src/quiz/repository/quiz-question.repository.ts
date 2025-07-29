import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuizQuestion } from "../entities/quiz-question.entity";

@Injectable()
export class QuizQuestionRepository {
  constructor(
    @InjectRepository(QuizQuestion)
    private readonly repo: Repository<QuizQuestion>
  ) {}

  async findAllByQuizId(quizId: string): Promise<QuizQuestion[]> {
    return this.repo.find({
      where: { quizId },
      order: { questionId: "ASC" },
    });
  }

  async save(question: QuizQuestion): Promise<QuizQuestion> {
    return this.repo.save(question);
  }

  create(data: Partial<QuizQuestion>): QuizQuestion {
    return this.repo.create(data);
  }
}
