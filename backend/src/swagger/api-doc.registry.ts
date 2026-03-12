// src/swagger/api-doc.registry.ts
import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { AppHealthDto } from "../app/dto/app-health.dto";
import { AppInfoDto } from "../app/dto/app-info.dto";
import { CorrectAnswerDto } from "../quiz/dto/correct-answer.dto";
import { CreatedQuizQuestionDto } from "../quiz/dto/created-quiz-question.dto";
import { QuizQuestionDto } from "../quiz/dto/quiz-question.dto";
import { IssueAnswersTokenResponseDto } from "../tokens/dto/issue-answers-token-response.dto";
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
        params: [
          {
            name: "quizId",
            required: true,
            schema: { type: "string" },
            example: "QuizModule1",
            description: "Quiz identifier.",
          },
        ],
        responses: [
          { status: 404, description: "Quiz not found" },
          { status: 401, description: "Missing/invalid/expired answers token" },
        ],
      }),

    [QuizzesMethods.GetQuizQuestions]: (description?: string) =>
      ApiDoc({
        summary: "Get quiz questions by quizId (public)",
        description,
        ok: { type: QuizQuestionDto, isArray: true },
        params: [
          {
            name: "quizId",
            required: true,
            schema: { type: "string" },
            example: "QuizModule1",
            description: "Quiz identifier.",
          },
        ],
        responses: [{ status: 404, description: "Quiz not found" }],
      }),

    [QuizzesMethods.CreateQuestion]: (description?: string) =>
      applyDecorators(
        ApiDoc({
          summary: "Create a question for a quiz (admin only)",
          description,
          security: [{ type: "apiKey", name: "adminKey" }],
          ok: { type: CreatedQuizQuestionDto, status: 201, isArray: false },
          params: [
            {
              name: "quizId",
              required: true,
              schema: { type: "string" },
              example: "QuizModule1",
              description:
                "Quiz identifier in route. Must match body.quizId if provided.",
            },
          ],
          responses: [
            { status: 400, description: "Bad Request" },
            { status: 401, description: "Invalid admin key" },
            { status: 413, description: "Uploaded files are too large" },
          ],
        }),
        ApiConsumes("multipart/form-data"),
        ApiBody({
          description:
            "Question payload with optional images[]. Current validation expects quizId and questionId in body.",
          schema: {
            type: "object",
            properties: {
              quizId: {
                type: "string",
                example: "QuizModule1",
              },
              questionId: { type: "number", example: 3 },
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
            required: ["quizId", "questionId", "questionText", "options"],
          },
        })
      ),

    [QuizzesMethods.IssueAnswersToken]: (description?: string) =>
      ApiDoc({
        summary: "Issue a short-lived answers token for quizId",
        description,
        ok: { type: IssueAnswersTokenResponseDto, status: 201 },
        params: [
          {
            name: "quizId",
            required: true,
            schema: { type: "string" },
            example: "QuizModule1",
            description: "Quiz identifier bound into JWT payload.",
          },
        ],
      }),

    [QuizzesMethods.GetProgress]: (description?: string) =>
      ApiDoc({
        summary: "Get user progress (public)",
        description,
        queries: [
          {
            name: "clientId",
            required: true,
            schema: { type: "string" },
            example: "35b43a38-e845-449d-9ee2-b43f1016bd27",
            description: "Client/device identifier.",
          },
          {
            name: "appId",
            required: true,
            schema: { type: "string" },
            example: "Internet-Programming",
            description: "Frontend app/course slug.",
          },
          {
            name: "courseId",
            required: true,
            schema: { type: "string" },
            example: "CS80",
            description: "Course identifier.",
          },
        ],
        ok: { schema: { example: [1, 2, 5] } },
      }),

    [QuizzesMethods.MarkProgress]: (description?: string) =>
      ApiDoc({
        summary: "Mark a module as completed (public)",
        description,
        ok: {
          status: 201,
          description: "Progress marked successfully.",
          schema: { example: {} },
        },
        responses: [{ status: 400, description: "Bad Request" }],
      }),

    [QuizzesMethods.UnmarkProgress]: (description?: string) =>
      ApiDoc({
        summary: "Unmark a completed module (public)",
        description,
        ok: {
          status: 200,
          description: "Progress unmarked successfully.",
          schema: { example: {} },
        },
        responses: [{ status: 400, description: "Bad Request" }],
      }),

    [QuizzesMethods.ResetProgress]: (description?: string) =>
      ApiDoc({
        summary: "Reset user progress (public)",
        description,
        ok: {
          status: 201,
          description: "Progress reset successfully.",
          schema: { example: {} },
        },
      }),

    [QuizzesMethods.VerifyAnswersToken]: (description?: string) =>
      ApiDoc({
        summary: "Verify a previously issued answers token (admin only)",
        description,
        security: [{ type: "apiKey", name: "adminKey" }],
        params: [
          {
            name: "quizId",
            required: true,
            schema: { type: "string" },
            example: "QuizModule1",
            description: "Quiz identifier expected inside token payload.",
          },
        ],
        ok: {
          status: 201,
          schema: {
            oneOf: [
              {
                type: "object",
                properties: {
                  ok: { type: "boolean", example: true },
                  payload: {
                    type: "object",
                    properties: {
                      quizId: { type: "string", example: "QuizModule1" },
                    },
                    required: ["quizId"],
                  },
                },
                required: ["ok", "payload"],
              },
              {
                type: "object",
                properties: {
                  ok: { type: "boolean", example: false },
                  error: {
                    type: "string",
                    example: "Invalid or expired token",
                  },
                },
                required: ["ok", "error"],
              },
            ],
          },
        },
        responses: [{ status: 400, description: "token is required" }],
      }),
  },

  [EndpointKeys.App]: {
    [AppMethods.GetHello]: (description?: string) =>
      ApiDoc({
        summary: "API landing page (HTML)",
        description,
        ok: {
          schema: {
            type: "string",
            example: "<!doctype html>...",
          },
        },
      }),
    [AppMethods.Health]: (description?: string) =>
      ApiDoc({
        summary: "Service health check",
        description,
        ok: { type: AppHealthDto },
      }),
    [AppMethods.Info]: (description?: string) =>
      ApiDoc({
        summary: "Service info",
        description,
        ok: { type: AppInfoDto },
      }),
    [AppMethods.Robots]: (description?: string) =>
      ApiDoc({
        summary: "Robots directives for crawlers",
        description,
        ok: {
          schema: {
            type: "string",
            example: "User-agent: *\nAllow: /",
          },
        },
      }),
  },
} as const;
