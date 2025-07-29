import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../src/app.module";
import { createApp } from "../../src/create-app";
import { createHash } from "crypto";
import { ConfigService } from "@nestjs/config";

describe("Quiz API (e2e)", () => {
  let app: INestApplication;
  let configService: ConfigService;

  const quizId = "QuizModule1";

  function generateToken(quizId: string, secret: string) {
    return createHash("sha256").update(`${quizId}:${secret}`).digest("hex");
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app = createApp(app);
    await app.init();

    configService = app.get(ConfigService);
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /api/quizzes/:quizId/questions should return 200", async () => {
    const res = await request(app.getHttpServer()).get(
      `/api/quizzes/${quizId}/questions`
    );
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/quizzes/:quizId/questions should return 404 for non-existent quizId", async () => {
    const res = await request(app.getHttpServer()).get(
      "/api/quizzes/NonExistentQuiz/questions"
    );
    expect(res.status).toBe(404);
  });

  it("GET /api/quizzes/:quizId/answers should return 200 with valid token", async () => {
    const secret = configService.get<string>("QUIZ_SECRET_KEY");
    if (!secret) {
      throw new Error("QUIZ_SECRET_KEY is not defined in test environment");
    }
    const token = generateToken(quizId, secret);

    const res = await request(app.getHttpServer())
      .get(`/api/quizzes/${quizId}/answers?token=${token}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/quizzes/:quizId/answers should return 401 without token", async () => {
    const res = await request(app.getHttpServer()).get(
      `/api/quizzes/${quizId}/answers`
    );

    expect(res.status).toBe(401);
  });

  it("GET /api/quizzes/:quizId/answers should return 401 with invalid token", async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/quizzes/${quizId}/answers`)
      .set("Authorization", `Bearer invalidtoken`);

    expect(res.status).toBe(401);
  });
});
