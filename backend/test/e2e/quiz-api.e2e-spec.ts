import { Test } from "@nestjs/testing";
import {
  Module,
  NotFoundException,
  type INestApplication,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as request from "supertest";
import { AppController } from "../../src/app.controller";
import { CircuitBreakerService } from "../../src/app/circuit-breaker.service";
import { createApp } from "../../src/create-app";
import { AdminApiKeyGuard } from "../../src/guards/admin-api-key.guard";
import { AnswersTokenGuard } from "../../src/guards/answers-token.guard";
import { QuizController } from "../../src/quiz/api/quiz.controller";
import { QuizService } from "../../src/quiz/service/quiz.service";
import { TokensModule } from "../../src/tokens/tokens.module";

type QuizServiceReadContract = jest.Mocked<
  Pick<QuizService, "getQuizWithQuestions" | "getCorrectAnswers">
>;

const quizService: QuizServiceReadContract = {
  getQuizWithQuestions: jest.fn(async (quizId: string) => {
    if (quizId !== "QuizModule1") {
      throw new NotFoundException(`Quiz with ID "${quizId}" not found`);
    }

    return [
      {
        questionId: 1,
        questionText: "What does API stand for?",
        options: ["Application Programming Interface", "Applied PHP Input"],
        images: [],
      },
    ];
  }),
  getCorrectAnswers: jest.fn(async (quizId: string) => [
    {
      quizId,
      questionId: 1,
      correctAnswer: [0],
    },
  ]),
};

const circuitBreaker = {
  probe: jest.fn(async () => true),
  getState: jest.fn(() => "CLOSED" as const),
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [
        () => ({
          ADMIN_API_KEY: "e2e-admin-key",
          QUIZ_ANSWERS_JWT_SECRET:
            "e2e-only-secret-with-at-least-thirty-two-characters",
          QUIZ_ANSWERS_JWT_TTL: "5m",
          QUIZ_JWT_ISSUER: "webdev-coursework-e2e",
          QUIZ_JWT_AUDIENCE: "webdev-coursework-e2e-client",
        }),
      ],
    }),
    TokensModule,
  ],
  controllers: [AppController, QuizController],
  providers: [
    {
      provide: CircuitBreakerService,
      useValue: circuitBreaker,
    },
    {
      provide: QuizService,
      useValue: quizService,
    },
    AnswersTokenGuard,
    AdminApiKeyGuard,
  ],
})
class QuizApiE2ETestModule {}

describe("Quiz API (e2e)", () => {
  let app: INestApplication;

  const quizId = "QuizModule1";

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [QuizApiE2ETestModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app = createApp(app);
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it("GET /quizzes/:quizId/questions should return 200", async () => {
    const res = await request(app.getHttpServer()).get(
      `/quizzes/${quizId}/questions`
    );
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /quizzes/:quizId/questions should return 404 for non-existent quizId", async () => {
    const res = await request(app.getHttpServer()).get(
      "/quizzes/NonExistentQuiz/questions"
    );
    expect(res.status).toBe(404);
  });

  it("GET /quizzes/:quizId/answers should return 200 with valid token", async () => {
    const tokenRes = await request(app.getHttpServer()).post(
      `/tokens/${quizId}/answers-token`
    );
    expect(tokenRes.status).toBe(201);
    expect(typeof tokenRes.body?.token).toBe("string");
    const token = tokenRes.body.token as string;

    const res = await request(app.getHttpServer())
      .get(`/quizzes/${quizId}/answers`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /quizzes/:quizId/answers should return 401 without token", async () => {
    const res = await request(app.getHttpServer()).get(
      `/quizzes/${quizId}/answers`
    );

    expect(res.status).toBe(401);
  });

  it("GET /quizzes/:quizId/answers should return 401 with invalid token", async () => {
    const res = await request(app.getHttpServer())
      .get(`/quizzes/${quizId}/answers`)
      .set("Authorization", `Bearer invalidtoken`);

    expect(res.status).toBe(401);
  });

  it("GET /quizzes/:quizId/answers should reject a token issued for another quiz", async () => {
    const tokenRes = await request(app.getHttpServer()).post(
      `/tokens/${quizId}/answers-token`
    );
    const token = tokenRes.body.token as string;

    const res = await request(app.getHttpServer())
      .get("/quizzes/QuizModule2/answers")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Token quizId mismatch");
  });

  it("POST /quizzes/:quizId/questions should reject missing admin credentials", async () => {
    const res = await request(app.getHttpServer())
      .post(`/quizzes/${quizId}/questions`)
      .send({
        quizId,
        questionId: 99,
        questionText: "Unauthorized question",
        options: ["A", "B"],
      });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid admin key");
  });

  it("POST /quizzes/progress should reject non-whitelisted fields", async () => {
    const res = await request(app.getHttpServer())
      .post("/quizzes/progress")
      .send({
        clientId: "security-test-client",
        appId: "webdev-coursework",
        courseId: "CS85",
        moduleNumber: 1,
        isAdmin: true,
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: "isAdmin",
          message: expect.stringContaining("should not exist"),
        }),
      ])
    );
  });

  it("POST /quizzes/progress should reject an invalid module number", async () => {
    const res = await request(app.getHttpServer())
      .post("/quizzes/progress")
      .send({
        clientId: "security-test-client",
        appId: "webdev-coursework",
        courseId: "CS85",
        moduleNumber: "not-a-number",
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: "moduleNumber",
          message: expect.stringContaining("number"),
        }),
      ])
    );
  });

  it("GET /docs should return swagger UI", async () => {
    const res = await request(app.getHttpServer()).get("/docs");
    expect(res.status).toBe(200);
    expect(String(res.text)).toContain("Swagger UI");
  });

  it("GET /openapi.json should return OpenAPI document", async () => {
    const res = await request(app.getHttpServer()).get("/openapi.json");
    expect(res.status).toBe(200);
    expect(res.body?.openapi).toMatch(/^3\./);
    expect(res.body?.paths).toBeDefined();
  });

  it("GET / should return API landing page", async () => {
    const res = await request(app.getHttpServer()).get("/");
    expect(res.status).toBe(200);
    expect(String(res.text)).toContain("Webdev Coursework API");
  });

  it("GET /robots.txt should return robots config", async () => {
    const res = await request(app.getHttpServer()).get("/robots.txt");
    expect(res.status).toBe(200);
    expect(String(res.text)).toContain("User-agent: *");
  });
});
