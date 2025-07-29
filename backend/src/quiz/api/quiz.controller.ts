import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
  Get,
  Param,
  UseGuards,
  Query,
  Delete,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AnswersTokenGuard } from "../../guards/answers-token.guard";
import { CorrectAnswerDto } from "../dto/correct-answer.dto";
import { QuizProgressDto } from "../dto/quiz-progress.dto";
import { QuestionDto } from "../dto/question.dto";
import { ResetProgressDto } from "../dto/reset-progress.dto";

import { QuizService } from "../service/quiz.service";
import { CreateQuestionDto } from "../dto/create-question.dto";

@Controller("quizzes")
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get(":quizId/questions")
  async getQuizQuestions(
    @Param("quizId") quizId: string
  ): Promise<QuestionDto[]> {
    return await this.quizService.getQuizWithQuestions(quizId);
  }

  @UseGuards(AnswersTokenGuard)
  @Get(":quizId/answers")
  async getQuizAnswers(
    @Param("quizId") quizId: string
  ): Promise<CorrectAnswerDto[]> {
    return await this.quizService.getCorrectAnswers(quizId);
  }

  @Post(":quizId/questions")
  @UseInterceptors(FileFieldsInterceptor([{ name: "images", maxCount: 5 }]))
  async createQuestion(
    @Param("quizId") quizId: string,
    @Body() dto: CreateQuestionDto,
    @UploadedFiles() files: { images?: Express.Multer.File[] }
  ) {
    const imagePaths =
      files?.images?.map((f) => `/uploads/${f.filename}`) || [];
    return await this.quizService.createAndSaveQuestion(
      { ...dto, quizId },
      imagePaths
    );
  }

  @Get("progress")
  async getProgress(
    @Query("clientId") clientId: string,
    @Query("appId") appId: string
  ): Promise<number[]> {
    return this.quizService.getProgress(clientId, appId);
  }

  @Post("progress")
  async markProgress(@Body() body: QuizProgressDto): Promise<void> {
    return this.quizService.markModuleCompleted(
      body.clientId,
      body.appId,
      body.moduleNumber
    );
  }

  @Delete("progress")
  async unmarkProgress(@Body() body: QuizProgressDto): Promise<void> {
    return this.quizService.unmarkModuleCompleted(
      body.clientId,
      body.appId,
      body.moduleNumber
    );
  }

  @Post("progress/reset")
  async resetProgress(@Body() body: ResetProgressDto): Promise<void> {
    const { clientId, appId } = body;
    return this.quizService.resetProgress(clientId, appId);
  }
}
