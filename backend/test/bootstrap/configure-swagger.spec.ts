// HTTP boundary coverage: Basic Auth, Turnstile, schemas/assets, clearance cookies and CORS.
import { TurnstileModule } from "../../src/security/turnstile/turnstile.module";
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
import { AnalyticsController } from "../../src/analytics/analytics.controller";
import { OwnerController } from "../../src/accounts/owner.controller";
import { AnalyticsService } from "../../src/analytics/analytics.service";
import { AnalyticsStore } from "../../src/analytics/analytics.store";
import { AccountStore } from "../../src/accounts/store/account.store";
import { QuizController } from "../../src/quiz/api/quiz.controller";
import { QuizService } from "../../src/quiz/service/quiz.service";
import { TokensController } from "../../src/tokens/api/tokens.controller";
import { TokensService } from "../../src/tokens/service/tokens.service";
import { AnswersTokenGuard } from "../../src/tokens/guards/answers-token.guard";
import { AdminApiKeyGuard } from "../../src/security/guards/admin-api-key.guard";
import { RequestThrottleService } from "../../src/security/request-throttle.service";
import { configureCors } from "../../src/bootstrap/configure-cors";
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
    "ALLOWED_ORIGINS",
    "TURNSTILE_SECRET_KEY",
    "TURNSTILE_SITE_KEY",
    "TURNSTILE_ALLOWED_HOSTNAMES",
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
  async function create(withCors = false) {
    const module = await Test.createTestingModule({
      // Resolve the real exported provider through its module, as application bootstrap does.
      imports: [TurnstileModule],
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
          AccountStore,
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
    if (withCors) configureCors(app);
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
    expect(count).toBe(74);
    expect(doc.paths["/api/account/github/start"].post).toBeDefined();
    expect(doc.paths["/api/owner/github/start"].post).toBeDefined();
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
  it("requires Turnstile in addition to Basic auth for docs, assets and schema; accepts a scoped expiring cookie", async () => {
    process.env.NODE_ENV = "production";
    process.env.SWAGGER_ENABLED = "true";
    process.env.SWAGGER_USERNAME = "docs-reader";
    process.env.SWAGGER_PASSWORD = "test-documentation-password-unique";
    process.env.TURNSTILE_SECRET_KEY = "private-test-secret";
    process.env.TURNSTILE_SITE_KEY = "public-site-key";
    process.env.TURNSTILE_ALLOWED_HOSTNAMES = "api.example.test";
    process.env.ALLOWED_ORIGINS = "http://frontend.example.test";
    const server = await create(true);
    const get = (path: string, cookie?: string) => {
      const req = request(server)
        .get(path)
        .set("Host", "api.example.test")
        .auth("docs-reader", process.env.SWAGGER_PASSWORD!);
      return cookie ? req.set("Cookie", cookie) : req;
    };
    const page = await get("/docs").expect(200);
    expect(page.text).toContain('data-sitekey="public-site-key"');
    expect(page.text).not.toContain("private-test-secret");
    expect(page.text).not.toContain("swagger-ui-init.js");
    for (const path of [
      "/openapi.json",
      "/openapi.yaml",
      "/openapi.json/",
      "/docs/swagger-ui-init.js",
      "/docs-json",
      "/docs-yaml",
    ])
      await get(path).expect(403);
    await get("/docs/turnstile.js").expect(200);
    const verify = (origin: string, token = "test-token") =>
      request(server)
        .post("/docs/turnstile-verify")
        .set("Host", "api.example.test")
        .set("Origin", origin)
        .auth("docs-reader", process.env.SWAGGER_PASSWORD!)
        .type("form")
        .send({ token });
    const fetcher = jest.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          hostname: "api.example.test",
          action: "api_docs",
        })
      )
    );
    await verify("http://attacker.example").expect(403);
    expect(fetcher).not.toHaveBeenCalled();
    fetcher.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: true,
          hostname: "api.example.test",
          action: "account_login",
        })
      )
    );
    await verify("http://api.example.test").expect(403);
    const passed = await verify("http://api.example.test").expect(200);
    const setCookie = passed.headers["set-cookie"][0];
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie).toContain("Secure");
    expect(setCookie).toContain("SameSite=Strict");
    expect(setCookie).toContain("Path=/;");
    const cookie = setCookie.split(";")[0];
    await get("/docs", cookie)
      .expect(200)
      .expect((response) =>
        expect(response.text).toContain("swagger-ui-init.js")
      );
    await get("/openapi.json", cookie).expect(200);
    await request(server)
      .get("/openapi.json")
      .set("Cookie", cookie)
      .expect(401);
    await get("/openapi.json", cookie.slice(0, -1) + "!").expect(403);
    const now = Date.now();
    const clock = jest.spyOn(Date, "now").mockReturnValue(now + 601000);
    await get("/openapi.json", cookie).expect(403);
    clock.mockRestore();
    fetcher.mockRestore();
  });
});
