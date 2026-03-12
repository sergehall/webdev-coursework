import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../src/app.module";
import { createApp } from "../../src/create-app";

describe("Quiz API (e2e)", () => {
  let app: INestApplication;

  const quizId = "QuizModule1";

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app = createApp(app);
    await app.init();
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
    const tokenRes = await request(app.getHttpServer()).post(
      `/api/tokens/${quizId}/answers-token`
    );
    expect(tokenRes.status).toBe(201);
    expect(typeof tokenRes.body?.token).toBe("string");
    const token = tokenRes.body.token as string;

    const res = await request(app.getHttpServer())
      .get(`/api/quizzes/${quizId}/answers`)
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
