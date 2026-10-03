// Exercise real OAuth initiation through both aliases, with synthetic Siteverify responses.
import { Test } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import type { INestApplication } from "@nestjs/common";
import request = require("supertest");
import { OwnerController } from "./owner.controller";
import { AnalyticsService } from "../analytics/analytics.service";
import type { AccountStore } from "./store/account.store";
import type { AnalyticsStore } from "../analytics/analytics.store";
import type { MfaService } from "./mfa/mfa.service";
import { TurnstileService } from "../security/turnstile/turnstile.service";
import { configureValidation } from "../bootstrap/configure-validation";

const origin = "http://localhost:3000";
const runtimeState = {
  increment: jest.fn().mockResolvedValue(1),
  enqueue: jest.fn().mockResolvedValue(1),
  take: jest.fn(),
  set: jest.fn().mockResolvedValue("OK"),
};
const valid = { success: true, action: "account_login", hostname: "localhost" };

describe("GitHub Turnstile HTTP boundary", () => {
  let app: INestApplication;
  beforeAll(async () => {
    const config = new ConfigService({
      QR_ANALYTICS_ENABLED: "false",
      TURNSTILE_SITE_KEY: "synthetic-public-key",
      TURNSTILE_SECRET_KEY: "synthetic-private-key",
      TURNSTILE_ALLOWED_HOSTNAMES: "localhost",
      NODE_ENV: "test",
    });
    const service = new AnalyticsService(
      config,
      {} as AnalyticsStore,
      {} as AccountStore,
      {} as MfaService,
      new TurnstileService(config)
    );
    Object.assign(service, {
      secret: "synthetic-session-key",
      origins: [origin],
      runtimeState,
      github: {
        clientId: "synthetic-client-id",
        clientSecret: "synthetic-client-secret",
        callback: `${origin}/api/owner/github/callback`,
      },
    });
    const module = await Test.createTestingModule({
      controllers: [OwnerController],
      providers: [{ provide: AnalyticsService, useValue: service }],
    }).compile();
    app = module.createNestApplication();
    configureValidation(app);
    await app.init();
  });
  beforeEach(() => runtimeState.set.mockClear());
  afterEach(() => jest.restoreAllMocks());
  afterAll(async () => app?.close());

  it.each(["account", "owner"])(
    "blocks legacy GET and missing POST proof through %s before issuing state",
    async (alias) => {
      const fetcher = jest.spyOn(global, "fetch");
      const path = `/api/${alias}/github/start`;
      await request(app.getHttpServer())
        .get(path)
        .query({ turnstileToken: "query-tokens-must-not-work" })
        .expect(403);
      const result = await request(app.getHttpServer())
        .post(path)
        .set("Origin", origin)
        .send({ intent: "login" })
        .expect(403);
      expect(result.body.code).toBe("TURNSTILE_REJECTED");
      expect(result.headers["set-cookie"]).toBeUndefined();
      expect(runtimeState.set).not.toHaveBeenCalled();
      expect(fetcher).not.toHaveBeenCalled();
    }
  );
  it("rejects an untrusted origin before contacting Cloudflare", async () => {
    const fetcher = jest.spyOn(global, "fetch");
    await request(app.getHttpServer())
      .post("/api/account/github/start")
      .set("Origin", "https://attacker.example")
      .send({ turnstileToken: "token" })
      .expect(403);
    expect(fetcher).not.toHaveBeenCalled();
    expect(runtimeState.set).not.toHaveBeenCalled();
  });
  it.each([
    { intent: "link", turnstileToken: "token" },
    { intent: "login", turnstileToken: "x".repeat(2049) },
    { intent: "login", turnstileToken: null },
  ])("validates the OAuth proof transport", async (body) => {
    await request(app.getHttpServer())
      .post("/api/account/github/start")
      .set("Origin", origin)
      .send(body)
      .expect(400);
    expect(runtimeState.set).not.toHaveBeenCalled();
  });
  it.each([
    { ...valid, action: "api_docs" },
    { ...valid, hostname: "attacker.example" },
  ])("rejects proof from another action or hostname", async (result) => {
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(JSON.stringify(result)));
    await request(app.getHttpServer())
      .post("/api/account/github/start")
      .set("Origin", origin)
      .send({ intent: "login", turnstileToken: "token" })
      .expect(403);
    expect(runtimeState.set).not.toHaveBeenCalled();
  });
  it.each([
    ["account", "login", "account_login"],
    ["owner", "register", "account_register"],
  ])(
    "issues bound PKCE state only after verified %s/%s proof, then rejects replay",
    async (alias, intent, action) => {
      const fetcher = jest
        .spyOn(global, "fetch")
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ ...valid, action }))
        )
        .mockResolvedValueOnce(
          new Response(
            JSON.stringify({
              success: false,
              "error-codes": ["timeout-or-duplicate"],
            })
          )
        );
      const post = () =>
        request(app.getHttpServer())
          .post(`/api/${alias}/github/start`)
          .set("Origin", origin)
          .send({ intent, turnstileToken: "single-use-token" });
      const result = await post().expect(200);
      const url = new URL(result.body.url);
      expect(url.origin).toBe("https://github.com");
      expect(url.pathname).toBe("/login/oauth/authorize");
      expect(url.searchParams.get("code_challenge_method")).toBe("S256");
      expect(url.searchParams.has("turnstileToken")).toBe(false);
      expect(result.headers["set-cookie"][0]).toContain(
        `webdev_github_state=${url.searchParams.get("state")}`
      );
      expect(result.headers["set-cookie"][0]).toContain("HttpOnly");
      expect(result.headers["set-cookie"][0]).toContain("SameSite=Lax");
      expect(runtimeState.set).toHaveBeenCalledTimes(1);
      const params = fetcher.mock.calls[0][1]!.body as URLSearchParams;
      expect(params.get("response")).toBe("single-use-token");
      const replay = await post().expect(403);
      expect(replay.headers["set-cookie"]).toBeUndefined();
      expect(runtimeState.set).toHaveBeenCalledTimes(1);
    }
  );
});
