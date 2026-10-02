import { type INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { OpenAPIObject } from "@nestjs/swagger";
import request = require("supertest");
import { AccountController } from "../../src/accounts/account.controller";
import { AccountService } from "../../src/accounts/account.service";
import { AccountProvidersController } from "../../src/accounts/account-providers.controller";
import { AccountProvidersService } from "../../src/accounts/account-providers.service";
import { MfaController } from "../../src/accounts/mfa/mfa.controller";
import { MfaService } from "../../src/accounts/mfa/mfa.service";
import {
  AnalyticsController,
  OwnerController,
} from "../../src/analytics/analytics.controller";
import { AnalyticsService } from "../../src/analytics/analytics.service";
import { AnalyticsStore } from "../../src/analytics/analytics.store";
import { QuizController } from "../../src/quiz/api/quiz.controller";
import { QuizService } from "../../src/quiz/service/quiz.service";
import { TokensController } from "../../src/tokens/api/tokens.controller";
import { TokensService } from "../../src/tokens/service/tokens.service";
import { AnswersTokenGuard } from "../../src/guards/answers-token.guard";
import { AdminApiKeyGuard } from "../../src/guards/admin-api-key.guard";
import { RequestThrottleService } from "../../src/security/request-throttle.service";
import { configureSwagger } from "../../src/bootstrap/configure-swagger";

type OperationObject = NonNullable<
  NonNullable<OpenAPIObject["paths"][string]>["get"]
>;
type SchemaObject = Exclude<
  NonNullable<NonNullable<OpenAPIObject["components"]>["schemas"]>[string],
  { $ref: string }
>;

describe("Swagger API contracts and production access", () => {
  const names = [
    "NODE_ENV",
    "SWAGGER_ENABLED",
    "SWAGGER_USERNAME",
    "SWAGGER_PASSWORD",
  ];
  let original: (string | undefined)[];
  let app: INestApplication | undefined;
  beforeEach(() => {
    original = names.map((name) => process.env[name]);
    names.forEach((name) => delete process.env[name]);
    process.env.NODE_ENV = "test";
  });
  afterEach(async () => {
    await app?.close();
    app = undefined;
    names.forEach((name, i) => {
      if (original[i] === undefined) delete process.env[name];
      else process.env[name] = original[i];
    });
  });
  async function create() {
    const module = await Test.createTestingModule({
      controllers: [
        AccountController,
        AccountProvidersController,
        MfaController,
        AnalyticsController,
        OwnerController,
        QuizController,
        TokensController,
      ],
      providers: [
        {
          provide: RequestThrottleService,
          useValue: {
            consume: jest.fn(async () => ({ count: 1, retryAfter: 60 })),
          },
        },
        ...[
          AccountService,
          AccountProvidersService,
          MfaService,
          AnalyticsService,
          AnalyticsStore,
          QuizService,
          TokensService,
        ].map((provide) => ({ provide, useValue: {} })),
      ],
    })
      .overrideGuard(AnswersTokenGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AdminApiKeyGuard)
      .useValue({ canActivate: () => true })
      .compile();
    app = module.createNestApplication();
    configureSwagger(app);
    await app.init();
    return app.getHttpServer();
  }

  it("exports every route with success/error contracts, correct auth and unique client operation IDs", async () => {
    const server = await create();
    const response = await request(server).get("/openapi.json").expect(200);
    const doc = response.body as OpenAPIObject;
    const ids = new Set<string>();
    let count = 0;
    for (const item of Object.values(doc.paths)) {
      for (const method of ["get", "post", "put", "delete", "patch"] as const) {
        const operation = item?.[method] as OperationObject | undefined;
        if (!operation) continue;
        count++;
        expect(operation.summary).toBeTruthy();
        expect(operation.description).toBeTruthy();
        expect(ids.has(operation.operationId!)).toBe(false);
        ids.add(operation.operationId!);
        expect(
          Object.keys(operation.responses).some((status) =>
            /^[23]/.test(status)
          )
        ).toBe(true);
        expect(operation.responses["429"]).toBeDefined();
        expect(operation.responses["503"]).toBeDefined();
      }
    }
    expect(count).toBe(72);
    expect(doc.paths["/api/account/session"].get!.security).toEqual([
      { "account-session": [] },
    ]);
    expect(doc.paths["/api/account/mfa/challenge"].post!.security).toEqual([
      { "mfa-challenge": [] },
    ]);
    expect(doc.paths["/api/account/login"].post!.security ?? []).toEqual([]);
    expect(doc.paths["/api/account/logout"].post!.security).toEqual([
      { "account-session": [] },
    ]);
    expect(doc.paths["/quizzes/{quizId}/answers"].get!.security).toEqual([
      { answersToken: [] },
    ]);
    expect(doc.paths["/quizzes/{quizId}/questions"].post!.security).toEqual([
      { adminKey: [] },
    ]);
    const schemas = doc.components!.schemas!;
    const register = schemas.RegisterDto as SchemaObject;
    expect(register.required).toEqual(
      expect.arrayContaining(["email", "username", "password"])
    );
    expect((register.properties!.password as SchemaObject).minLength).toBe(12);
    expect((register.properties!.password as SchemaObject).maxLength).toBe(128);
    expect(
      (schemas.OwnerPreferencesDto as SchemaObject).required
    ).not.toContain("clockFormat");
    const serialized = JSON.stringify(schemas);
    for (const field of [
      "passwordHash",
      "tokenHash",
      "revision",
      "secret_encrypted",
      "providerSecrets",
      "Redis",
      "BullMQ",
    ])
      expect(serialized).not.toContain(field);
    function verifyReferences(value: unknown): void {
      if (!value || typeof value !== "object") return;
      if (
        "$ref" in value &&
        typeof value.$ref === "string" &&
        value.$ref.startsWith("#/components/schemas/")
      ) {
        expect(
          schemas[value.$ref.replace("#/components/schemas/", "")]
        ).toBeDefined();
      }
      Object.values(value).forEach(verifyReferences);
    }
    verifyReferences(doc);
    await request(server).get("/docs").expect(200);
  });

  it("does not expose UI or JSON/YAML by default in production", async () => {
    process.env.NODE_ENV = "production";
    const server = await create();
    for (const path of ["/docs", "/openapi.json", "/openapi.yaml"])
      await request(server).get(path).expect(404);
  });
  it("rejects production enablement without dedicated strong credentials", async () => {
    process.env.NODE_ENV = "production";
    process.env.SWAGGER_ENABLED = "true";
    await expect(create()).rejects.toThrow("Production Swagger requires");
  });
  it("protects UI, assets and JSON/YAML including trailing-slash aliases", async () => {
    process.env.NODE_ENV = "production";
    process.env.SWAGGER_ENABLED = "true";
    process.env.SWAGGER_USERNAME = "docs-reader";
    process.env.SWAGGER_PASSWORD = "test-documentation-password-unique";
    const server = await create();
    for (const path of [
      "/docs",
      "/docs/",
      "/docs/swagger-ui-init.js",
      "/openapi.json",
      "/openapi.json/",
      "/openapi.yaml",
    ]) {
      await request(server).get(path).expect(401);
      await request(server)
        .get(path)
        .auth("docs-reader", "wrong-password")
        .expect(401);
      const response = await request(server)
        .get(path)
        .auth("docs-reader", process.env.SWAGGER_PASSWORD)
        .expect(200);
      expect(response.headers["cache-control"]).toBe("no-store");
      expect(response.headers["x-robots-tag"]).toBe("noindex, nofollow");
    }
    const response = await request(server)
      .get("/openapi.json")
      .auth("docs-reader", process.env.SWAGGER_PASSWORD);
    expect(
      response.body.components.securitySchemes["account-session"].name
    ).toBe("__Secure-webdev_owner");
  });
  it("throttles documentation credential guessing and fails closed on storage errors", async () => {
    process.env.NODE_ENV = "production";
    process.env.SWAGGER_ENABLED = "true";
    process.env.SWAGGER_USERNAME = "docs-reader";
    process.env.SWAGGER_PASSWORD = "test-documentation-password-unique";
    const server = await create();
    const consume = jest.spyOn(app!.get(RequestThrottleService), "consume");
    consume.mockResolvedValue({ count: 31, retryAfter: 57 });
    const response = await request(server).get("/openapi.json").expect(429);
    expect(response.headers["retry-after"]).toBe("57");
    consume.mockRejectedValue(new Error("private infrastructure error"));
    const failure = await request(server).get("/docs").expect(503);
    expect(failure.text).not.toContain("private infrastructure");
  });
});
