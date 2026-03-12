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
import type { Request } from "express";
import { AnswersTokenGuard } from "../../guards/answers-token.guard";
import { AdminApiKeyGuard } from "../../guards/admin-api-key.guard";
import { ApiDocService } from "../../swagger/api-doc.service";
import { EndpointKeys } from "../../swagger/enums/endpoint-keys.enum";
import { QuizzesMethods } from "../../swagger/enums/quizzes-methods.enum";
import { CorrectAnswerDto } from "../dto/correct-answer.dto";
import { QuizProgressDto } from "../dto/quiz-progress.dto";
import { QuizQuestionDto } from "../dto/quiz-question.dto";
import { ResetProgressDto } from "../dto/reset-progress.dto";

import { QuizService } from "../service/quiz.service";
import { CreateQuestionDto } from "../dto/create-question.dto";

const MAX_QUESTION_IMAGE_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB per file
const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
]);

@Controller("quizzes")
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @ApiDocService.apply(EndpointKeys.Quizzes, QuizzesMethods.GetQuizQuestions)
  @Get(":quizId/questions")
  async getQuizQuestions(
    @Param("quizId") quizId: string
  ): Promise<QuizQuestionDto[]> {
    return await this.quizService.getQuizWithQuestions(quizId);
  }

  @UseGuards(AnswersTokenGuard)
  @ApiDocService.apply(EndpointKeys.Quizzes, QuizzesMethods.GetQuizAnswers)
  @Get(":quizId/answers")
  async getQuizAnswers(
    @Param("quizId") quizId: string
  ): Promise<CorrectAnswerDto[]> {
    return await this.quizService.getCorrectAnswers(quizId);
  }

  @ApiDocService.apply(EndpointKeys.Quizzes, QuizzesMethods.CreateQuestion)
  @Post(":quizId/questions")
  @UseGuards(AdminApiKeyGuard)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: "images", maxCount: 5 }], {
      limits: {
        files: 5,
        fileSize: MAX_QUESTION_IMAGE_UPLOAD_BYTES,
      },
      fileFilter: (
        _req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, acceptFile: boolean) => void
      ) => {
        callback(null, ALLOWED_IMAGE_MIME_TYPES.has(file.mimetype));
      },
    })
  )
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

  @ApiDocService.apply(EndpointKeys.Quizzes, QuizzesMethods.GetProgress)
  @Get("progress")
  async getProgress(
    @Query("clientId") clientId: string,
    @Query("appId") appId: string,
    @Query("courseId") courseId: string
  ): Promise<number[]> {
    return this.quizService.getProgress(clientId, appId, courseId);
  }

  @ApiDocService.apply(EndpointKeys.Quizzes, QuizzesMethods.MarkProgress)
  @Post("progress")
  async markProgress(@Body() body: QuizProgressDto): Promise<void> {
    return this.quizService.markModuleCompleted(
      body.clientId,
      body.appId,
      body.courseId,
      body.moduleNumber
    );
  }

  @ApiDocService.apply(EndpointKeys.Quizzes, QuizzesMethods.UnmarkProgress)
  @Delete("progress")
  async unmarkProgress(@Body() body: QuizProgressDto): Promise<void> {
    return this.quizService.unmarkModuleCompleted(
      body.clientId,
      body.appId,
      body.courseId,
      body.moduleNumber
    );
  }

  @ApiDocService.apply(EndpointKeys.Quizzes, QuizzesMethods.ResetProgress)
  @Post("progress/reset")
  async resetProgress(@Body() body: ResetProgressDto): Promise<void> {
    const { clientId, appId, courseId } = body;
    return this.quizService.resetProgress(clientId, appId, courseId);
  }
}
