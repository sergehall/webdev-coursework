// src/swagger/api-doc.registry.ts
import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { CorrectAnswerDto } from "../quiz/dto/correct-answer.dto";
import { QuizQuestionDto } from "../quiz/dto/quiz-question.dto";
import { EndpointKeys } from "./enums/endpoint-keys.enum";
import { QuizzesMethods } from "./enums/quizzes-methods.enum";
import { AppMethods } from "./enums/app-methods.enum";
import { ApiDoc } from "./api-doc.builder";

export const ApiDocRegistry = {
  [EndpointKeys.Quizzes]: {
    [QuizzesMethods.GetQuizAnswers]: (description?: string) =>
      ApiDoc({
        summary: "Get correct answers by quizId (requires AnswersToken)",
        description,
        security: [{ type: "answersToken" }],
        ok: { type: CorrectAnswerDto, isArray: true },
        responses: [{ status: 404, description: "Quiz not found" }],
      }),

    [QuizzesMethods.GetQuizQuestions]: (description?: string) =>
      ApiDoc({
        summary: "Get quiz questions by quizId (public)",
        description,
        security: [], // public
        ok: { type: QuizQuestionDto, isArray: true },
        responses: [{ status: 404, description: "Quiz not found" }],
      }),

    [QuizzesMethods.CreateQuestion]: (description?: string) =>
      applyDecorators(
        ApiDoc({
          summary: "Create a question for a quiz (public)",
          description,
          security: [],
          ok: { type: QuizQuestionDto, isArray: false },
          responses: [{ status: 400, description: "Bad Request" }],
        }),
        ApiConsumes("multipart/form-data"),
        ApiBody({
          description: "Question payload with optional images[]",
          schema: {
            type: "object",
            properties: {
              // fields from CreateQuestionDto
              questionText: { type: "string", example: "What is JavaScript?" },
              options: {
                type: "array",
                items: { type: "string" },
                example: ["Lang", "DB", "OS", "Browser API"],
              },
              images: {
                type: "array",
                items: { type: "string", format: "binary" },
              },
            },
            required: ["questionText", "options"],
          },
        })
      ),

    [QuizzesMethods.GetProgress]: (description?: string) =>
      ApiDoc({
        summary: "Get user progress (public)",
        description,
        security: [],
        ok: { schema: { example: [1, 2, 5] } },
      }),

    [QuizzesMethods.MarkProgress]: (description?: string) =>
      ApiDoc({
        summary: "Mark a module as completed (public)",
        description,
        security: [],
        ok: { schema: { example: {} } },
        responses: [{ status: 400, description: "Bad Request" }],
      }),

    [QuizzesMethods.UnmarkProgress]: (description?: string) =>
      ApiDoc({
        summary: "Unmark a completed module (public)",
        description,
        security: [],
        ok: { schema: { example: {} } },
        responses: [{ status: 400, description: "Bad Request" }],
      }),

    [QuizzesMethods.ResetProgress]: (description?: string) =>
      ApiDoc({
        summary: "Reset user progress (public)",
        description,
        security: [],
        ok: { schema: { example: {} } },
      }),
  },

  [EndpointKeys.App]: {
    [AppMethods.Health]: (description?: string) =>
      ApiDoc({
        summary: "Service health check",
        description,
        security: [],
        ok: { schema: { example: { ok: true } } },
      }),
  },
} as const;
