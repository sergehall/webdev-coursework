import { Test } from "@nestjs/testing";
import {
  Module,
  NotFoundException,
  type INestApplication,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as request from "supertest";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import sharp = require("sharp");
import type sharpDefault from "sharp";
const createImage = sharp as unknown as typeof sharpDefault;
import { AppController } from "../../src/app/app.controller";
import { CircuitBreakerService } from "../../src/app/circuit-breaker.service";
import { createApp } from "../../src/create-app";
import { AdminApiKeyGuard } from "../../src/security/guards/admin-api-key.guard";
import { AnswersTokenGuard } from "../../src/tokens/guards/answers-token.guard";
import { QuizController } from "../../src/quiz/api/quiz.controller";
import { QuizService } from "../../src/quiz/service/quiz.service";
import { TokensModule } from "../../src/tokens/tokens.module";
import { ApiAbuseGuard } from "../../src/security/api-abuse.guard";
import { TurnstileModule } from "../../src/security/turnstile/turnstile.module";
import { QuizImageController } from "../../src/quiz/images/quiz-image.controller";
import {
  QUIZ_IMAGE_S3_CLIENT,
  QuizImageStorage,
} from "../../src/quiz/images/quiz-image.storage";

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
const createQuestion = jest.fn().mockResolvedValue({
  quizId: "QuizModule1",
  questionId: 99,
  questionText: "A test question",
  options: ["A", "B"],
  images: [],
});
const objects = new Map<string, Buffer>();
const s3Send = jest.fn(async (command: unknown) => {
  if (command instanceof PutObjectCommand) {
    objects.set(command.input.Key!, Buffer.from(command.input.Body as Buffer));
    return {};
  }
  if (command instanceof GetObjectCommand) {
    const body = objects.get(command.input.Key!);
    if (!body)
      throw Object.assign(new Error("Missing image"), { name: "NoSuchKey" });
    return {
      ContentLength: body.length,
      Body: { transformToByteArray: async () => body },
    };
  }
  if (command instanceof DeleteObjectCommand) {
    objects.delete(command.input.Key!);
    return {};
  }
  throw new Error("Unexpected S3 command");
});

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
          QUIZ_IMAGE_S3_BUCKET: "e2e-quiz-images",
        }),
      ],
    }),
    TokensModule,
    TurnstileModule,
  ],
  controllers: [AppController, QuizController, QuizImageController],
  providers: [
    // These tests isolate quiz contracts; global protection has its own HTTP suite.
    { provide: ApiAbuseGuard, useValue: { protect: async () => true } },
    {
      provide: CircuitBreakerService,
      useValue: circuitBreaker,
    },
    {
      provide: QuizService,
      useValue: { ...quizService, createAndSaveQuestion: createQuestion },
    },
    QuizImageStorage,
    { provide: QUIZ_IMAGE_S3_CLIENT, useValue: { send: s3Send } },
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

  it("accepts bounded multipart fields with an administrator key", async () => {
    createQuestion.mockClear();
    const res = await request(app.getHttpServer())
      .post(`/quizzes/${quizId}/questions`)
      .set("x-admin-key", "e2e-admin-key")
      .field("quizId", quizId)
      .field("questionId", "99")
      .field("questionText", "A test question")
      .field("options", "A")
      .field("options", "B");

    expect(res.status).toBe(201);
    expect(createQuestion).toHaveBeenCalledWith(
      expect.objectContaining({
        quizId,
        questionId: 99,
        options: ["A", "B"],
      }),
      []
    );
  });

  it("rejects an image above the upload size limit", async () => {
    createQuestion.mockClear();
    const res = await request(app.getHttpServer())
      .post(`/quizzes/${quizId}/questions`)
      .set("x-admin-key", "e2e-admin-key")
      .field("quizId", quizId)
      .field("questionId", "99")
      .field("questionText", "A test question")
      .field("options", "A")
      .field("options", "B")
      .attach("images", Buffer.alloc(5 * 1024 * 1024 + 1), {
        filename: "too-large.png",
        contentType: "image/png",
      });

    expect(res.status).toBe(413);
    expect(createQuestion).not.toHaveBeenCalled();
  });

  it("stores a decoded image and serves it from the private object store", async () => {
    createQuestion.mockClear();
    const image = await createImage({
      create: {
        width: 2,
        height: 2,
        channels: 4,
        background: "#ff0000",
      },
    })
      .png()
      .toBuffer();
    const upload = await request(app.getHttpServer())
      .post(`/quizzes/${quizId}/questions`)
      .set("x-admin-key", "e2e-admin-key")
      .field("quizId", quizId)
      .field("questionId", "99")
      .field("questionText", "A test question")
      .field("options", "A")
      .field("options", "B")
      .attach("images", image, {
        filename: "original-name.png",
        contentType: "image/png",
      });

    expect(upload.status).toBe(201);
    const paths = createQuestion.mock.calls[0]?.[1] as string[];
    expect(paths).toHaveLength(1);
    expect(paths[0]).toMatch(/^\/uploads\/[0-9a-f-]{36}\.png$/);
    const download = await request(app.getHttpServer()).get(paths[0]);
    expect(download.status).toBe(200);
    expect(download.headers["content-type"]).toMatch(/^image\/png/);
    expect(download.headers["cross-origin-resource-policy"]).toBe(
      "cross-origin"
    );
    expect(download.headers["x-content-type-options"]).toBe("nosniff");
    expect(download.body).toEqual(expect.any(Buffer));
    expect(await createImage(download.body).metadata()).toMatchObject({
      format: "png",
      width: 2,
      height: 2,
    });
  });

  it("rejects an image whose declared MIME type does not match its content", async () => {
    createQuestion.mockClear();
    const upload = await request(app.getHttpServer())
      .post(`/quizzes/${quizId}/questions`)
      .set("x-admin-key", "e2e-admin-key")
      .field("quizId", quizId)
      .field("questionId", "99")
      .field("questionText", "A test question")
      .field("options", "A")
      .field("options", "B")
      .attach("images", Buffer.from("<html>not an image</html>"), {
        filename: "fake.png",
        contentType: "image/png",
      });

    expect(upload.status).toBe(400);
    expect(createQuestion).not.toHaveBeenCalled();
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
