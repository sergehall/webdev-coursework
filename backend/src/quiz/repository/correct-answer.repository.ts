import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CorrectAnswer } from "../entities/correct-answer.entity";

@Injectable()
export class CorrectAnswerRepository {
  constructor(
    @InjectRepository(CorrectAnswer)
    private readonly repo: Repository<CorrectAnswer>
  ) {}

  async findAllByQuizId(quizId: string): Promise<CorrectAnswer[]> {
    return this.repo.find({
      where: { quizId },
      order: { questionId: "ASC" },
    });
  }
}
