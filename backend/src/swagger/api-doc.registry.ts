// src/swagger/api-doc.registry.ts
import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { CorrectAnswerDto } from "../quiz/dto/correct-answer.dto";
import { QuizQuestionDto } from "../quiz/dto/quiz-question.dto";
import { EndpointKeys } from "./enums/endpoint-keys.enum";
import { QuizzesMethods } from "./enums/quizzes-methods.enum";
import { AppMethods } from "./enums/app-methods.enum";
import { ApiDoc } from "./api-doc.builder";
import { SWAGGER_SECURITY } from "./security.constants";

export const ApiDocRegistry = {
  [EndpointKeys.Quizzes]: {
    [QuizzesMethods.GetQuizAnswers]: (description?: string) =>
      ApiDoc({
        summary: "Get correct answers by quizId (requires AnswersToken)",
        description,
        security: [{ type: "bearer", name: SWAGGER_SECURITY.ANSWERS_TOKEN }],
        ok: { type: CorrectAnswerDto, isArray: true },
        responses: [{ status: 404, description: "Quiz not found" }],
      }),

    [QuizzesMethods.GetQuizQuestions]: (description?: string) =>
      ApiDoc({
        summary: "Get quiz questions by quizId (public)",
        description,
        ok: { type: QuizQuestionDto, isArray: true },
        responses: [{ status: 404, description: "Quiz not found" }],
      }),

    [QuizzesMethods.CreateQuestion]: (description?: string) =>
      applyDecorators(
        ApiDoc({
          summary: "Create a question for a quiz (public)",
          description,
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
        ok: { schema: { example: [1, 2, 5] } },
      }),

    [QuizzesMethods.MarkProgress]: (description?: string) =>
      ApiDoc({
        summary: "Mark a module as completed (public)",
        description,
        ok: { schema: { example: {} } },
        responses: [{ status: 400, description: "Bad Request" }],
      }),

    [QuizzesMethods.UnmarkProgress]: (description?: string) =>
      ApiDoc({
        summary: "Unmark a completed module (public)",
        description,
        ok: { schema: { example: {} } },
        responses: [{ status: 400, description: "Bad Request" }],
      }),

    [QuizzesMethods.ResetProgress]: (description?: string) =>
      ApiDoc({
        summary: "Reset user progress (public)",
        description,
        ok: { schema: { example: {} } },
      }),

    [QuizzesMethods.VerifyAnswersToken]: (description?: string) =>
      ApiDoc({
        summary: "Verify a previously issued answers token (admin only)",
        description,
        security: [{ type: "apiKey", name: "adminKey" }],
        ok: {
          schema: {
            oneOf: [
              { example: { ok: true, payload: { quizId: "quiz-1" } } },
              { example: { ok: false, error: "Invalid or expired token" } },
            ],
          },
        },
      }),
  },

  [EndpointKeys.App]: {
    [AppMethods.GetHello]: (description?: string) =>
      ApiDoc({
        summary: "Hello endpoint",
        description,
        ok: {
          schema: {
            example:
              "Hello from backend --- Web Developer Learning Portal! ---",
          },
        },
      }),
    [AppMethods.Health]: (description?: string) =>
      ApiDoc({
        summary: "Service health check",
        description,
        ok: { schema: { example: { ok: true } } },
      }),
    [AppMethods.Info]: (description?: string) =>
      ApiDoc({
        summary: "Service info",
        description,
        ok: {
          schema: {
            example: {
              name: "SMC Backend API",
              version: "1.0.0",
            },
          },
        },
      }),
  },
} as const;
