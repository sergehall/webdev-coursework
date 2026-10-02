import { randomUUID } from "crypto";
import { IndexSecurityActivity1790910000000 } from "../db/migrations/2026/10/1790910000000-IndexSecurityActivity";
import { UseAdminAndClientRoles1790906400000 } from "../db/migrations/2026/10/1790906400000-UseAdminAndClientRoles";
import type { Request } from "express";
import { Test } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import type { INestApplication } from "@nestjs/common";
import { DataSource } from "typeorm";
import { AccountController } from "../accounts/account.controller";
import { TurnstileService } from "../security/turnstile/turnstile.service";
import { AccountService } from "../accounts/account.service";
import { AuthMailService } from "../accounts/auth-mail";
import { AddPublicAccounts1790902800000 } from "../db/migrations/2026/10/1790902800000-AddPublicAccounts";
import request = require("supertest");
import { AnalyticsController, OwnerController } from "./analytics.controller";
import { AnalyticsStore } from "./analytics.store";
import { AnalyticsService } from "./analytics.service";
import { AddQrAnalytics1790899200000 } from "../db/migrations/2026/10/1790899200000-AddQrAnalytics";
import { hashOwnerPassword } from "./owner-password";
import { createApp } from "../create-app";
import { MfaService } from "../accounts/mfa/mfa.service";
import { MfaCrypto, totp } from "../accounts/mfa/mfa.crypto";
import { MfaController } from "../accounts/mfa/mfa.controller";
import { AddAccountMfa1790913600000 } from "../db/migrations/2026/10/1790913600000-AddAccountMfa";

import { AddAccountPreferences1790917200000 } from "../db/migrations/2026/10/1790917200000-AddAccountPreferences";

import { AddAccountSessions1790920800000 } from "../db/migrations/2026/10/1790920800000-AddAccountSessions";
import { AddAccountProviders1790924400000 } from "../db/migrations/2026/10/1790924400000-AddAccountProviders";
import { AccountProvidersController } from "../accounts/account-providers.controller";
import { AccountProvidersService } from "../accounts/account-providers.service";
import { ApiAbuseGuard } from "../security/api-abuse.guard";

const run =
  process.env.OWNER_INTEGRATION_TEST === "true" ? describe : describe.skip;
run("Owner HTTP and PostgreSQL integration", () => {
  let app: INestApplication;
  let db: DataSource;
  let service: AnalyticsService;
  const password = "private integration password";
  const origin = "http://127.0.0.1:3000";
  beforeAll(async () => {
    db = new DataSource({
      type: "postgres",
      url: "postgres://postgres:test-local-only@127.0.0.1:55439/owner_test",
      migrations: [
        AddQrAnalytics1790899200000,
        AddPublicAccounts1790902800000,
        UseAdminAndClientRoles1790906400000,
        IndexSecurityActivity1790910000000,
        AddAccountMfa1790913600000,
        AddAccountPreferences1790917200000,
        AddAccountSessions1790920800000,
        AddAccountProviders1790924400000,
      ],
    });
    await db.initialize();
    await db.query(
      "CREATE TABLE IF NOT EXISTS reference_app_data (id integer PRIMARY KEY, value text); INSERT INTO reference_app_data VALUES(1, 'preserve me') ON CONFLICT DO NOTHING"
    );
    await db.runMigrations();
    // This database belongs exclusively to the temporary test container.
    await db.query(
      "TRUNCATE webdev_account_sessions, webdev_accounts, webdev_mfa_methods, webdev_mfa_recovery_codes, webdev_mfa_challenges, webdev_account_tokens, webdev_mail_outbox, webdev_runtime_state, webdev_runtime_queue, webdev_owner_account, webdev_qr_events, webdev_qr_daily_stats, webdev_analytics_access_audit"
    );
    const config = new ConfigService({
      QR_ANALYTICS_ENABLED: "true",

      OWNER_SESSION_SECRET: "test-secret-unique-to-temporary-integration-only",
      OWNER_PASSWORD_HASH: await hashOwnerPassword(password),
      OWNER_ALLOWED_ORIGINS: origin,
      NODE_ENV: "test",
      MFA_ENCRYPTION_KEY: Buffer.alloc(32, 7).toString("base64"),
    });
    const module = await Test.createTestingModule({
      controllers: [
        AnalyticsController,
        OwnerController,
        AccountController,
        MfaController,
        AccountProvidersController,
      ],
      providers: [
        // Account-service limits are exercised here; global budgets have a separate HTTP/storage suite.
        { provide: ApiAbuseGuard, useValue: { protect: async () => true } },
        AnalyticsService,
        AnalyticsStore,
        AccountService,
        TurnstileService,
        AuthMailService,
        MfaCrypto,
        MfaService,
        AccountProvidersService,
        { provide: ConfigService, useValue: config },
        { provide: DataSource, useValue: db },
      ],
    }).compile();
    app = createApp(module.createNestApplication());
    await app.init();
    service = app.get(AnalyticsService);
    Object.assign(app.get(AuthMailService), {
      provider: { send: jest.fn().mockResolvedValue(undefined) },
    });
  }, 15000);
  afterAll(async () => {
    await app?.close();
    if (db?.isInitialized) await db.destroy();
  });
  beforeEach(async () => {
    await db.query("DELETE FROM webdev_runtime_state");
  });
  it("enforces MFA for password and GitHub, consumes codes once, and safely disables it", async () => {
    const server = app.getHttpServer(),
      store = app.get(AnalyticsStore);
    const id = randomUUID();
    await db.query(
      "INSERT INTO webdev_accounts(id,role,username,email,email_verified_at,password_hash,revision,display_name,github_id) VALUES($1,'client','mfa_member','mfa@example.test',now(),$2,$3,'MFA Test','81230001')",
      [id, await hashOwnerPassword(password), randomUUID()]
    );
    const post = (
      path: string,
      cookie: string,
      body?: Record<string, unknown>
    ) =>
      request(server)
        .post(`/api/account/mfa/${path}`)
        .set("Origin", origin)
        .set("Cookie", cookie)
        .send(body);
    const cookieFrom = (response: request.Response, name: string) => {
      const cookies = response.headers["set-cookie"] as unknown as string[];
      return cookies
        .find(
          (value) =>
            value.startsWith(`${name}=`) && !value.startsWith(`${name}=;`)
        )!
        .split(";")[0];
    };
    const oldCookie = `webdev_owner=${await service.createSession((await store.account(id))!)}`;
    const staleCookie = `webdev_owner=${await service.createSession((await store.account(id))!)}`;
    const enrolled = await post("enroll", oldCookie).expect(200);
    expect(enrolled.body.mfa.enabled).toBe(false);
    expect(enrolled.body.mfa.pendingEnrollment).toBe(true);
    const setup = enrolled.body.setup;
    expect(Date.parse(setup.expiresAt)).toBeGreaterThan(Date.now());
    expect(Date.parse(setup.expiresAt)).toBeLessThanOrEqual(
      Date.now() + 600000
    );
    const [{ secret_encrypted: encrypted }] = await db.query(
      "SELECT secret_encrypted FROM webdev_mfa_methods WHERE account_id=$1",
      [id]
    );
    expect(encrypted).not.toContain(setup.secret);
    expect(app.get(MfaCrypto).decrypt(encrypted, id)).toBe(setup.secret);
    const currentStep = Math.floor(Date.now() / 30000);
    const enabled = await post("verify-enrollment", oldCookie, {
      enrollmentId: setup.enrollmentId,
      code: totp(setup.secret, currentStep),
    }).expect(200);
    let cookie = cookieFrom(enabled, "webdev_owner");
    const codes: string[] = enabled.body.recoveryCodes;
    expect(codes).toHaveLength(10);
    const hashes = await db.query(
      "SELECT code_hash FROM webdev_mfa_recovery_codes WHERE account_id=$1",
      [id]
    );
    expect(
      hashes.every((row: { code_hash: string }) =>
        row.code_hash.startsWith("$2")
      )
    ).toBe(true);
    expect(JSON.stringify(hashes)).not.toContain(codes[0]);
    await request(server)
      .get("/api/account/session")
      .set("Cookie", staleCookie)
      .expect(401);
    const status = await request(server)
      .get("/api/account/mfa/status")
      .set("Cookie", cookie)
      .expect(200);
    expect(status.body.enabled).toBe(true);
    expect(status.body).not.toHaveProperty("secret");
    const login = () =>
      request(server)
        .post("/api/account/login")
        .set("Origin", origin)
        .send({ identity: "mfa_member", password });
    let pending = await login().expect(200);
    expect(pending.body).toEqual({ authenticated: false, mfaRequired: true });
    let challengeCookie = cookieFrom(pending, "webdev_mfa");
    await request(server)
      .post("/api/account/mfa/challenge")
      .set("Cookie", challengeCookie)
      .set("Origin", "https://attacker.example")
      .send({ code: codes[0] })
      .expect(403);
    await request(server)
      .post("/api/account/mfa/challenge")
      .set("Cookie", challengeCookie)
      .send({ code: codes[0] })
      .expect(403);
    await post("challenge", challengeCookie, {
      code: codes[0],
      accountId: id,
    }).expect(400);
    await request(server)
      .get("/api/account/mfa/status")
      .set("Cookie", challengeCookie)
      .expect(401);
    expect(
      (pending.headers["set-cookie"] as unknown as string[]).find((v) =>
        v.startsWith("webdev_mfa=")
      )
    ).toContain("HttpOnly");
    expect(
      (pending.headers["set-cookie"] as unknown as string[]).find((v) =>
        v.startsWith("webdev_mfa=")
      )
    ).toContain("SameSite=Strict");
    await request(server)
      .get("/api/account/session")
      .set("Cookie", challengeCookie)
      .expect(401);
    await post("challenge", challengeCookie, {
      code: totp(setup.secret, currentStep),
    }).expect(400);
    const verified = await post("challenge", challengeCookie, {
      code: totp(setup.secret, currentStep + 1),
    }).expect(200);
    cookie = cookieFrom(verified, "webdev_owner");
    await post("challenge", challengeCookie, { code: codes[0] }).expect(401);

    // Real OAuth callback: the linked provider cannot issue a full session before MFA.
    Object.assign(service, {
      github: {
        clientId: "test-id",
        clientSecret: "test-secret",
        ownerId: "42",
        callback: `${origin}/api/owner/github/callback`,
      },
    });
    const started = await request(server)
      .get("/api/account/github/start")
      .expect(303);
    const state = new URL(started.headers.location).searchParams.get("state")!;
    const stateCookie = cookieFrom(started, "webdev_github_state");
    const fetcher = jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            access_token: "test-ephemeral",
            token_type: "bearer",
          })
        )
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ id: 81230001, login: "mfa-member" }))
      );
    pending = await request(server)
      .get("/api/owner/github/callback")
      .query({ code: "test-code", state })
      .set("Cookie", stateCookie)
      .expect(303);
    fetcher.mockRestore();
    expect(pending.headers.location).toBe(`${origin}/account/mfa`);
    challengeCookie = cookieFrom(pending, "webdev_mfa");
    await request(server)
      .get("/api/account/session")
      .set("Cookie", challengeCookie)
      .expect(401);
    const raced = await Promise.all([
      post("challenge", challengeCookie, { code: codes[0] }),
      post("challenge", challengeCookie, { code: codes[0] }),
    ]);
    expect(raced.map((value) => value.status).sort()).toEqual([200, 401]);
    cookie = cookieFrom(
      raced.find((value) => value.status === 200)!,
      "webdev_owner"
    );
    pending = await login().expect(200);
    challengeCookie = cookieFrom(pending, "webdev_mfa");
    await post("challenge", challengeCookie, { code: codes[0] }).expect(400);
    await post("cancel-challenge", challengeCookie).expect(200);
    await post("challenge", challengeCookie, { code: codes[1] }).expect(401);
    pending = await login().expect(200);
    challengeCookie = cookieFrom(pending, "webdev_mfa");
    await db.query(
      "UPDATE webdev_mfa_challenges SET expires_at=now()-interval '1 second' WHERE account_id=$1 AND status='pending'",
      [id]
    );
    await post("challenge", challengeCookie, { code: codes[1] }).expect(401);

    // Privileged routes require a recent second factor; refresh does not extend session lifetime.
    await db.query("UPDATE webdev_accounts SET role='admin' WHERE id=$1", [id]);
    const account = (await store.account(id))!;
    const token = await service.createSession(
      account,
      new Date(Date.now() - 360000).toISOString()
    );
    cookie = `webdev_owner=${token}`;
    const blocked = await request(server)
      .get("/api/account/audit")
      .set("Cookie", cookie)
      .expect(403);
    expect(blocked.body.code).toBe("MFA_STEP_UP_REQUIRED");
    const before = await request(server)
      .get("/api/account/session")
      .set("Cookie", cookie)
      .expect(200);
    await post("step-up", cookie, { code: codes[1] }).expect(200);
    const after = await request(server)
      .get("/api/account/session")
      .set("Cookie", cookie)
      .expect(200);
    expect(after.body.expiresAt).toBe(before.body.expiresAt);
    await request(server)
      .get("/api/account/audit")
      .set("Cookie", cookie)
      .expect(200);
    const replacement = await post("recovery-codes", cookie, {
      code: codes[2],
    }).expect(200);
    expect(replacement.body.recoveryCodes).toHaveLength(10);
    await post("step-up", cookie, { code: codes[3] }).expect(400);
    await post("step-up", cookie, {
      code: replacement.body.recoveryCodes[0],
    }).expect(200);
    // Five attempts lock the account factor as well as the pending challenge.
    pending = await login().expect(200);
    challengeCookie = cookieFrom(pending, "webdev_mfa");
    for (let attempt = 0; attempt < 5; attempt++)
      await post("challenge", challengeCookie, {
        code: "FFFFF-FFFFF-FFFFF-FFFFF",
      }).expect(400);
    await post("challenge", challengeCookie, {
      code: replacement.body.recoveryCodes[1],
    }).expect(401);
    const [{ locked_until: lock }] = await db.query(
      "SELECT locked_until FROM webdev_mfa_methods WHERE account_id=$1",
      [id]
    );
    expect(lock.getTime()).toBeGreaterThan(Date.now());
    await post("disable", cookie, {
      code: replacement.body.recoveryCodes[1],
    }).expect(400);
    await db.query(
      "UPDATE webdev_mfa_methods SET locked_until=now()-interval '1 second' WHERE account_id=$1",
      [id]
    );
    await post("disable", cookie, {
      code: replacement.body.recoveryCodes[1],
    }).expect(200);
    expect(await app.get(MfaService).enabled(id)).toBe(false);
    await request(server)
      .get("/api/account/session")
      .set("Cookie", cookie)
      .expect(401);
    expect(
      (
        await db.query(
          "SELECT secret_encrypted FROM webdev_mfa_methods WHERE account_id=$1",
          [id]
        )
      )[0].secret_encrypted
    ).toBeNull();
    expect(
      await db.query(
        "SELECT id FROM webdev_mfa_recovery_codes WHERE account_id=$1",
        [id]
      )
    ).toHaveLength(0);
    // Advance only the test login throttle after this test's five legitimate attempts.
    await db.query(
      "UPDATE webdev_runtime_state SET expires_at=now()-interval '1 second' WHERE key LIKE '%:rate:login:%'"
    );
    expect((await login().expect(200)).body).toEqual({ authenticated: true });
    expect(
      (await db.query("SELECT value FROM reference_app_data WHERE id=1"))[0]
        .value
    ).toBe("preserve me");
    Object.assign(service, { github: undefined });
  }, 30000);
  it("isolates and expires enrollment and requires a recent sign-in", async () => {
    const store = app.get(AnalyticsStore),
      mfa = app.get(MfaService);
    const account = (await store.owner())!;
    const old = new Date(Date.now() - 360000).toISOString();
    await expect(mfa.enroll(account, old)).rejects.toMatchObject({
      status: 403,
    });
    const { setup } = await mfa.enroll(account, new Date().toISOString());
    await expect(
      mfa.verifyEnrollment(account, randomUUID(), "123456")
    ).rejects.toMatchObject({ status: 400 });
    await db.query(
      "UPDATE webdev_mfa_methods SET enrollment_expires_at=now()-interval '1 second' WHERE account_id=$1",
      [account.id]
    );
    expect((await mfa.status(account.id)).pendingEnrollment).toBe(false);
    await expect(
      mfa.verifyEnrollment(
        account,
        setup.enrollmentId,
        totp(setup.secret, Math.floor(Date.now() / 30000))
      )
    ).rejects.toMatchObject({ status: 400 });
    await mfa.cancel(account);
    expect(
      (
        await db.query(
          "SELECT secret_encrypted FROM webdev_mfa_methods WHERE account_id=$1",
          [account.id]
        )
      )[0].secret_encrypted
    ).toBeNull();
  });
  it("fails closed without the encryption key and consumes recovery across distinct challenges once", async () => {
    const store = app.get(AnalyticsStore),
      mfa = app.get(MfaService);
    const id = randomUUID();
    await db.query(
      "INSERT INTO webdev_accounts(id,role,username,revision,display_name) VALUES($1,'client',$2,$3,'MFA Key Test')",
      [id, `key-${id.slice(0, 8)}`, randomUUID()]
    );
    let account = (await store.account(id))!;
    const { setup } = await mfa.enroll(account, new Date().toISOString());
    const step = Math.floor(Date.now() / 30000);
    const { recoveryCodes } = await mfa.verifyEnrollment(
      account,
      setup.enrollmentId,
      totp(setup.secret, step)
    );
    account = (await store.account(id))!;
    await expect(service.createSession(account)).rejects.toMatchObject({
      status: 401,
    });
    const unavailable = new MfaService(
      store,
      new MfaCrypto(new ConfigService({}))
    );
    const first = (await unavailable.challenge(account, "password"))!;
    const second = (await unavailable.challenge(account, "github"))!;
    await expect(
      unavailable.verifyChallenge(
        first.challengeToken,
        totp(setup.secret, step + 1)
      )
    ).rejects.toMatchObject({ status: 503 });
    expect((await unavailable.status(id)).enabled).toBe(true);
    const results = await Promise.allSettled([
      unavailable.verifyChallenge(first.challengeToken, recoveryCodes[0]),
      unavailable.verifyChallenge(second.challengeToken, recoveryCodes[0]),
    ]);
    expect(
      results.filter((value) => value.status === "fulfilled")
    ).toHaveLength(1);
    expect(results.filter((value) => value.status === "rejected")).toHaveLength(
      1
    );
    expect((await unavailable.status(id)).recoveryCodesRemaining).toBe(9);
  });
  it("paginates only live sessions of the current account without leaking session credentials", async () => {
    const server = app.getHttpServer(),
      store = app.get(AnalyticsStore);
    const id = randomUUID(),
      otherId = randomUUID();
    for (const [accountId, username] of [
      [id, "sessions_client"],
      [otherId, "sessions_other"],
    ])
      await db.query(
        "INSERT INTO webdev_accounts(id,role,username,revision,display_name) VALUES($1,'client',$2,$3,'Session Test')",
        [accountId, username, randomUUID()]
      );
    const account = (await store.account(id))!,
      other = (await store.account(otherId))!;
    const tokens: string[] = [];
    for (let i = 0; i < 8; i++)
      tokens.push(
        await service.createSession(account, undefined, {
          method: i % 2 ? "github" : "password",
          req: {
            get: () =>
              "Mozilla/5.0 (iPhone; CPU iPhone OS 17) AppleWebKit Safari/605.1 Mobile",
          } as unknown as Request,
        })
      );
    for (let i = 0; i < tokens.length; i++)
      await db.query(
        "UPDATE webdev_account_sessions SET issued_at=$1 WHERE token_hash=$2",
        [
          new Date(Date.now() - 20000 + i * 1000).toISOString(),
          service.digest(tokens[i]),
        ]
      );
    await service.createSession(other);
    const cookie = `webdev_owner=${tokens[0]}`;
    const list = (cursor?: string) =>
      request(server)
        .get("/api/account/sessions")
        .query(cursor ? { cursor } : {})
        .set("Cookie", cookie);
    await request(server).get("/api/account/sessions").expect(401);
    const first = await list().expect(200);
    expect(first.body.entries).toHaveLength(5);
    expect(first.body.entries[0]).toMatchObject({
      device: "phone",
      os: "iOS",
      browser: "Safari",
    });
    const safeKeys = [
      "id",
      "issuedAt",
      "expiresAt",
      "lastSeenAt",
      "device",
      "os",
      "browser",
      "authMethod",
      "current",
    ].sort();
    for (const entry of first.body.entries)
      expect(Object.keys(entry).sort()).toEqual(safeKeys);
    for (const token of tokens)
      expect(JSON.stringify(first.body)).not.toContain(token);
    // A sign-in arriving after the first page must not shift or duplicate later pages.
    await service.createSession(account);
    const second = await list(first.body.nextCursor).expect(200);
    expect(second.body.entries).toHaveLength(3);
    expect(second.body.nextCursor).toBeNull();
    expect(
      new Set(
        [...first.body.entries, ...second.body.entries].map(
          (entry: { id: string }) => entry.id
        )
      ).size
    ).toBe(8);
    expect(
      second.body.entries.filter((entry: { current: boolean }) => entry.current)
    ).toHaveLength(1);
    const afterLogin = await list().expect(200);
    const loggedOut = afterLogin.body.entries[0].id;
    const latest = await service.createSession(account);
    const latestRow = (
      await db.query(
        "SELECT id FROM webdev_account_sessions WHERE token_hash=$1",
        [service.digest(latest)]
      )
    )[0];
    await request(server)
      .post("/api/account/logout")
      .set("Origin", origin)
      .set("Cookie", `webdev_owner=${latest}`)
      .expect(200);
    expect(
      (
        await db.query("SELECT id FROM webdev_account_sessions WHERE id=$1", [
          latestRow.id,
        ])
      ).length
    ).toBe(0);
    // Expired, revoked and cache-evicted entries never appear as active.
    await db.query(
      "UPDATE webdev_account_sessions SET expires_at=now()-interval '1 second' WHERE token_hash=$1",
      [service.digest(tokens[7])]
    );
    await db.query(
      "UPDATE webdev_account_sessions SET revision=$1 WHERE token_hash=$2",
      [randomUUID(), service.digest(tokens[6])]
    );
    await (
      service as unknown as {
        redis: { del: (key: string) => Promise<unknown> };
      }
    ).redis.del(`webdev:qr:session:${service.digest(tokens[5])}`);
    let page = await list().expect(200);
    const ids: string[] = [];
    while (true) {
      ids.push(...page.body.entries.map((entry: { id: string }) => entry.id));
      if (!page.body.nextCursor) break;
      page = await list(page.body.nextCursor).expect(200);
    }
    expect(ids).toHaveLength(6);
    expect(ids).toContain(loggedOut);
    const otherCookie = `webdev_owner=${await service.createSession(other)}`;
    const isolated = await request(server)
      .get("/api/account/sessions")
      .set("Cookie", otherCookie)
      .expect(200);
    expect(
      isolated.body.entries.every(
        (entry: { id: string }) => !ids.includes(entry.id)
      )
    ).toBe(true);
    for (const cursor of [
      "invalid",
      Buffer.from(
        JSON.stringify({ at: "not-date", id: randomUUID() })
      ).toString("base64url"),
    ])
      await list(cursor).expect(400);
    await request(server)
      .get("/api/account/sessions?limit=1000")
      .set("Cookie", cookie)
      .expect(400);
    await request(server)
      .post("/api/account/revoke-sessions")
      .set("Origin", origin)
      .set("Cookie", cookie)
      .expect(200);
    await list().expect(401);
    const renewed = `webdev_owner=${await service.createSession((await store.account(id))!)}`;
    const emptyOld = await request(server)
      .get("/api/account/sessions")
      .set("Cookie", renewed)
      .expect(200);
    expect(emptyOld.body.entries).toHaveLength(1);
  });
  it("filters active sessions before pagination and keeps account isolation", async () => {
    const server = app.getHttpServer(),
      store = app.get(AnalyticsStore);
    const id = randomUUID(),
      otherId = randomUUID();
    for (const [accountId, username] of [
      [id, "filtered_sessions"],
      [otherId, "filtered_other"],
    ])
      await db.query(
        "INSERT INTO webdev_accounts(id,role,username,revision,display_name) VALUES($1,'client',$2,$3,'Filter Test')",
        [accountId, username, randomUUID()]
      );
    const account = (await store.account(id))!;
    let token = "";
    for (let i = 0; i < 9; i++) {
      token = await service.createSession(account, undefined, {
        method: i < 7 ? "github" : "password",
        req: {
          get: () =>
            i < 7
              ? "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
              : "Mozilla/5.0 (iPhone; CPU iPhone OS 17) AppleWebKit Safari/605.1 Mobile",
        } as unknown as Request,
      });
      await db.query(
        "UPDATE webdev_account_sessions SET issued_at=$1 WHERE token_hash=$2",
        [new Date(Date.now() - 20000 + i * 1000), service.digest(token)]
      );
    }
    await service.createSession((await store.account(otherId))!, undefined, {
      method: "github",
    });
    const list = (query: Record<string, string>) =>
      request(server)
        .get("/api/account/sessions")
        .set("Cookie", `webdev_owner=${token}`)
        .query(query);
    const first = await list({
      device: "desktop",
      authMethod: "github",
    }).expect(200);
    expect(first.body.entries).toHaveLength(5);
    expect(
      first.body.entries.every(
        (entry: { device: string; authMethod: string; current: boolean }) =>
          entry.device === "desktop" &&
          entry.authMethod === "github" &&
          !entry.current
      )
    ).toBe(true);
    const second = await list({
      device: "desktop",
      authMethod: "github",
      cursor: first.body.nextCursor,
    }).expect(200);
    expect(second.body.entries).toHaveLength(2);
    expect(second.body.nextCursor).toBeNull();
    expect(
      new Set(
        [...first.body.entries, ...second.body.entries].map(
          (entry: { id: string }) => entry.id
        )
      ).size
    ).toBe(7);
    const phone = await list({
      device: "phone",
      authMethod: "password",
    }).expect(200);
    expect(phone.body.entries).toHaveLength(2);
    expect(
      phone.body.entries.filter((entry: { current: boolean }) => entry.current)
    ).toHaveLength(1);
    expect((await list({ device: "tablet" }).expect(200)).body.entries).toEqual(
      []
    );
    await list({ device: "desktop OR 1=1" }).expect(400);
    await list({ authMethod: "oauth" }).expect(400);
  });
  it("persists validated preferences per account and restricts administration defaults", async () => {
    const server = app.getHttpServer(),
      store = app.get(AnalyticsStore);
    const adminId = randomUUID(),
      clientId = randomUUID();
    for (const [id, role, username] of [
      [adminId, "admin", "preferences_admin"],
      [clientId, "client", "preferences_client"],
    ]) {
      await db.query(
        "INSERT INTO webdev_accounts(id,role,username,revision,display_name) VALUES($1,$2,$3,$4,'Preferences Test')",
        [id, role, username, randomUUID()]
      );
    }
    const adminCookie = `webdev_owner=${await service.createSession((await store.account(adminId))!)}`;
    const clientCookie = `webdev_owner=${await service.createSession((await store.account(clientId))!)}`;
    const update = (cookie: string, body: Record<string, unknown>) =>
      request(server)
        .put("/api/account/preferences")
        .set("Origin", origin)
        .set("Cookie", cookie)
        .send(body);
    const before = await store.account(clientId);
    const preferences = {
      timeZone: "Asia/Tokyo",
      theme: "dark",
      reportDays: 90,
      dateFormat: "iso",
      clockFormat: "24h",
      activityDays: 30,
      activityPageSize: 25,
    };
    await update(adminCookie, preferences).expect(200);
    const session = await request(server)
      .get("/api/account/session")
      .set("Cookie", adminCookie)
      .expect(200);
    expect(session.body.profile).toMatchObject(preferences);
    expect(await store.account(clientId)).toEqual(before);
    for (const invalid of [
      { dateFormat: "bogus" },
      { dateFormat: null },
      { clockFormat: "25h" },
      { activityDays: 8 },
      { activityPageSize: 10000 },
      { timeZone: "Not/AZone" },
      { role: "admin" },
      { accountId: clientId },
    ])
      await update(adminCookie, { ...preferences, ...invalid }).expect(400);
    await update(clientCookie, preferences).expect(403);
    await update(clientCookie, {
      timeZone: "UTC",
      theme: "light",
      reportDays: 30,
      dateFormat: "day-first",
      clockFormat: "24h",
    }).expect(200);
    expect(await store.account(clientId)).toMatchObject({
      timeZone: "UTC",
      theme: "light",
      reportDays: 30,
      dateFormat: "day-first",
      clockFormat: "24h",
      activityDays: 7,
      activityPageSize: 10,
    });
    expect(await store.account(adminId)).toMatchObject(preferences);
    // Old clients may omit new fields; an update must preserve saved choices.
    await update(adminCookie, {
      timeZone: "UTC",
      theme: "light",
      reportDays: 7,
    }).expect(200);
    expect(await store.account(adminId)).toMatchObject({
      dateFormat: "iso",
      clockFormat: "24h",
      activityDays: 30,
      activityPageSize: 25,
    });
    expect(
      (await db.query("SELECT value FROM reference_app_data WHERE id=1"))[0]
        .value
    ).toBe("preserve me");
  });
  it("changes only the current account username, preserves email and GitHub identity, and rejects occupied names", async () => {
    const server = app.getHttpServer();
    const store = app.get(AnalyticsStore);
    const id = randomUUID();
    const email = "profile@example.test";
    await db.query(
      "INSERT INTO webdev_accounts(id,role,username,email,email_verified_at,password_hash,revision,display_name) VALUES($1,'client','profile_before',$2,now(),$3,$4,'Profile Test')",
      [id, email, await hashOwnerPassword(password), randomUUID()]
    );
    const cookie = `webdev_owner=${await service.createSession((await store.account(id))!)}`;
    const update = (body: Record<string, unknown>) =>
      request(server)
        .put("/api/account/profile")
        .set("Origin", origin)
        .set("Cookie", cookie)
        .send(body);
    await update({ displayName: "Renamed", username: "profile_after" }).expect(
      200
    );
    const account = await store.account(id);
    expect(account).toMatchObject({
      username: "profile_after",
      displayName: "Renamed",
      email,
      role: "client",
    });
    const session = await request(server)
      .get("/api/account/session")
      .set("Cookie", cookie)
      .expect(200);
    expect(session.body.profile.registrationMethod).toBe("email");
    await request(server)
      .post("/api/account/login")
      .set("Origin", origin)
      .send({ identity: "profile_before", password })
      .expect(401);
    await request(server)
      .post("/api/account/login")
      .set("Origin", origin)
      .send({ identity: "PROFILE_AFTER", password })
      .expect(200);
    await update({ displayName: "Rejected", username: "SERGEHALL" }).expect(
      409
    );
    for (const username of ["ab", "has spaces", null])
      await update({ displayName: "Rejected", username }).expect(400);
    await update({
      displayName: "Rejected",
      email: "changed@example.test",
    }).expect(400);
    await update({
      displayName: "Rejected",
      username: "other",
      accountId: AnalyticsStore.ROOT_ID,
    }).expect(400);
    expect(await store.account(id)).toMatchObject({
      username: "profile_after",
      displayName: "Renamed",
      email,
    });
    expect(await store.owner()).toMatchObject({
      username: "sergehall",
      displayName: "Serge",
      role: "admin",
    });

    const github = await store.githubAccount(
      { id: 81234567, login: "profile_github" },
      "42"
    );
    const githubCookie = `webdev_owner=${await service.createSession(github)}`;
    await request(server)
      .put("/api/account/profile")
      .set("Origin", origin)
      .set("Cookie", githubCookie)
      .send({ displayName: "GitHub member", username: "site_username" })
      .expect(200);
    expect(await store.account(github.id)).toMatchObject({
      username: "site_username",
      githubId: "81234567",
      email: null,
      role: "client",
    });
    const githubSession = await request(server)
      .get("/api/account/session")
      .set("Cookie", githubCookie)
      .expect(200);
    expect(githubSession.body.profile).toMatchObject({
      username: "site_username",
      registrationMethod: "github",
      githubLinked: true,
      email: null,
    });
    expect(
      (
        await store.githubAccount(
          { id: 81234567, login: "renamed_github" },
          "42"
        )
      ).id
    ).toBe(github.id);
    // The old display-name-only payload remains valid for existing clients.
    await update({ displayName: "Final Name" }).expect(200);
    expect((await store.account(id))?.username).toBe("profile_after");
  });
  it("protects reports, persists deduplicated visits and revokes sessions", async () => {
    const server = app.getHttpServer();
    await request(server)
      .get("/api/owner/analytics")
      .expect("Cache-Control", "no-store")
      .expect(401);
    await request(server)
      .post("/api/owner/login")
      .set("Origin", "https://attacker.example")
      .send({ password })
      .expect(403);
    const login = await request(server)
      .post("/api/owner/login")
      .set("Origin", origin)
      .send({ password })
      .expect(200);
    const cookie = login.headers["set-cookie"][0].split(";")[0];
    expect(login.headers["set-cookie"][0]).toContain("HttpOnly");
    expect(login.headers["set-cookie"][0]).toContain("SameSite=Strict");
    const event = {
      eventId: "b884fa37-6fab-4a47-8da9-b195c9d9af5a",
      campaign: "esl10g-presentation-1",
    };
    await request(server)
      .post("/api/analytics/qr-events")
      .send({ ...event, email: "reject@example.com" })
      .expect(400);
    for (let i = 0; i < 2; i++)
      await request(server)
        .post("/api/analytics/qr-events")
        .set("User-Agent", "Mozilla/5.0 Android Chrome/100 Mobile")
        .send(event)
        .expect(202);
    const persist = jest.spyOn(app.get(AnalyticsStore), "persistEvents");
    persist.mockRejectedValueOnce(new Error("simulated database outage"));
    await expect(
      (service as unknown as { flush(): Promise<void> }).flush()
    ).rejects.toThrow("simulated database outage");
    // A failed batch remains staged and is retried without losing or doubling visits.
    // Run the same worker callback without waiting for the ten-second scheduler.
    await (service as unknown as { flush(): Promise<void> }).flush();
    const report = await request(server)
      .get("/api/owner/analytics?days=7")
      .set("Cookie", cookie)
      .expect(200);
    expect(report.body.total).toBe(1);
    expect(report.body.devices.phone).toBe(1);
    const raw = await db.query("SELECT * FROM webdev_qr_events");
    expect(raw).toHaveLength(1);
    expect(Object.keys(raw[0]).sort()).toEqual([
      "browser",
      "campaign",
      "device",
      "event_id",
      "occurred_at",
      "os",
    ]);
    await request(server)
      .post("/api/owner/password")
      .set("Origin", origin)
      .set("Cookie", cookie)
      .send({ password, newPassword: "new integration password" })
      .expect(200);
    await request(server)
      .get("/api/owner/session")
      .set("Cookie", cookie)
      .expect(401);
    await request(server)
      .post("/api/owner/login")
      .set("Origin", origin)
      .send({ password: "new integration password" })
      .expect(200);
  });
  it("preserves other tables and keeps registration, confirmation and reset scoped to members", async () => {
    const server = app.getHttpServer();
    const mail = app.get(AuthMailService);
    const registration = {
      username: "student_one",
      email: "student@example.test",
      password: "student private password",
    };
    await request(server)
      .post("/api/account/register")
      .set("Origin", origin)
      .send({ ...registration, role: "admin" })
      .expect(400);
    await request(server)
      .post("/api/account/register")
      .set("Origin", origin)
      .send(registration)
      .expect("Cache-Control", "no-store")
      .expect(202);
    await request(server)
      .post("/api/account/register")
      .set("Origin", origin)
      .send(registration)
      .expect(202);
    const outbox = await db.query(
      "SELECT * FROM webdev_mail_outbox WHERE template='verify'"
    );
    expect(outbox).toHaveLength(1);
    const token = mail.decrypt(outbox[0].token_ciphertext);
    expect(outbox[0].token_ciphertext).not.toContain(token);
    await request(server)
      .post("/api/account/login")
      .set("Origin", origin)
      .send({ identity: registration.email, password: registration.password })
      .expect(401);
    await mail.deliverOne();
    expect(
      (
        await db.query(
          "SELECT status,token_ciphertext FROM webdev_mail_outbox WHERE id=$1",
          [outbox[0].id]
        )
      )[0]
    ).toEqual({ status: "sent", token_ciphertext: null });
    await request(server)
      .post("/api/account/verify-email")
      .set("Origin", origin)
      .send({ token })
      .expect(200);
    await request(server)
      .post("/api/account/verify-email")
      .set("Origin", origin)
      .send({ token })
      .expect(400);
    const login = await request(server)
      .post("/api/account/login")
      .set("Origin", origin)
      .send({
        identity: registration.username,
        password: registration.password,
      })
      .expect(200);
    const cookie = login.headers["set-cookie"][0].split(";")[0];
    const session = await request(server)
      .get("/api/account/session")
      .set("Cookie", cookie)
      .expect(200);
    expect(session.body.role).toBe("client");
    expect(JSON.stringify(session.body)).not.toMatch(
      /passwordHash|revision|githubId|token/
    );
    await request(server)
      .get("/api/account/analytics")
      .set("Cookie", cookie)
      .expect(403);
    await request(server)
      .get("/api/owner/audit")
      .set("Cookie", cookie)
      .expect(403);
    await request(server)
      .put("/api/account/profile")
      .set("Origin", origin)
      .set("Cookie", cookie)
      .send({ displayName: "Student One" })
      .expect(200);
    expect((await app.get(AnalyticsStore).owner()).displayName).toBe("Serge");
    await request(server)
      .post("/api/account/forgot-password")
      .set("Origin", origin)
      .send({ email: registration.email })
      .expect(202);
    await request(server)
      .post("/api/account/forgot-password")
      .set("Origin", origin)
      .send({ email: "unknown@example.test" })
      .expect(202);
    const reset = (
      await db.query(
        "SELECT token_ciphertext FROM webdev_mail_outbox WHERE template='reset'"
      )
    )[0];
    const resetToken = mail.decrypt(reset.token_ciphertext);
    await request(server)
      .post("/api/account/reset-password")
      .set("Origin", origin)
      .send({ token: resetToken, password: "replacement student password" })
      .expect(200);
    await request(server)
      .get("/api/account/session")
      .set("Cookie", cookie)
      .expect(401);
    await request(server)
      .post("/api/account/reset-password")
      .set("Origin", origin)
      .send({ token: resetToken, password: "replacement student password" })
      .expect(400);
    expect(
      (await db.query("SELECT value FROM reference_app_data WHERE id=1"))[0]
        .value
    ).toBe("preserve me");
  });
  it("rolls back accounts when durable mail intent fails, and retries transient SMTP failures", async () => {
    const mail = app.get(AuthMailService);
    const enqueue = jest
      .spyOn(mail, "enqueue")
      .mockRejectedValueOnce(new Error("outbox unavailable"));
    const accounts = app.get(AccountService);
    const req = {
      ip: "127.0.0.2",
      get: () => origin,
    } as unknown as Request;
    await expect(
      accounts.register(req, {
        username: "rollback_user",
        email: "rollback@example.test",
        password: "rollback private password",
      })
    ).rejects.toThrow("outbox unavailable");
    expect(
      await db.query(
        "SELECT id FROM webdev_accounts WHERE username='rollback_user'"
      )
    ).toHaveLength(0);
    enqueue.mockRestore();
    await accounts.register(req, {
      username: "retry_user",
      email: "retry@example.test",
      password: "retry private password",
    });
    const provider = {
      send: jest
        .fn()
        .mockRejectedValueOnce({ responseCode: 421 })
        .mockResolvedValue(undefined),
    };
    Object.assign(mail, { provider });
    await db.query(
      "UPDATE webdev_mail_outbox SET status='sent',token_ciphertext=NULL WHERE template='reset'"
    );
    await mail.deliverOne();
    const [row] = await db.query(
      "SELECT * FROM webdev_mail_outbox WHERE status='pending'"
    );
    expect(row.failure_kind).toBe("transient");
    expect(row.attempts).toBe(1);
    expect(row.token_ciphertext).toBeTruthy();
    await db.query(
      "UPDATE webdev_mail_outbox SET next_attempt_at=now() WHERE id=$1",
      [row.id]
    );
    await Promise.all([mail.deliverOne(), mail.deliverOne()]);
    expect(provider.send).toHaveBeenCalledTimes(2);
    expect(
      (
        await db.query("SELECT status FROM webdev_mail_outbox WHERE id=$1", [
          row.id,
        ])
      )[0].status
    ).toBe("sent");
  });
  it("lets only the primary admin manage roles and invalidates changed sessions", async () => {
    const store = app.get(AnalyticsStore),
      server = app.getHttpServer();
    const member = await store.githubAccount(
      { id: 7654321, login: "github-student" },
      "42"
    );
    expect(member.role).toBe("client");
    expect(member.email).toBeNull();
    const principal = await store.owner();
    const memberCookie = `${service.cookieName}=${await service.createSession(member)}`;
    const principalCookie = `${service.cookieName}=${await service.createSession(principal)}`;
    await request(server)
      .get("/api/account/accounts")
      .set("Cookie", memberCookie)
      .expect(403);
    await request(server)
      .put(`/api/account/accounts/${member.id}/role`)
      .set("Cookie", memberCookie)
      .set("Origin", origin)
      .send({ role: "admin" })
      .expect(403);
    await request(server)
      .put(`/api/account/accounts/${principal.id}/role`)
      .set("Cookie", principalCookie)
      .set("Origin", origin)
      .send({ role: "client" })
      .expect(400);
    await request(server)
      .put(`/api/account/accounts/${member.id}/role`)
      .set("Cookie", principalCookie)
      .set("Origin", origin)
      .send({ role: "admin" })
      .expect(200);
    await request(server)
      .get("/api/account/session")
      .set("Cookie", memberCookie)
      .expect(401);
    const adminCookie = `${service.cookieName}=${await service.createSession((await store.account(member.id))!)}`;
    await request(server)
      .get("/api/account/analytics")
      .set("Cookie", adminCookie)
      .expect(200);
    await request(server)
      .get("/api/account/accounts")
      .set("Cookie", adminCookie)
      .expect(403);
    await request(server)
      .put(`/api/account/accounts/${member.id}/role`)
      .set("Cookie", principalCookie)
      .set("Origin", origin)
      .send({ role: "client" })
      .expect(200);
    await request(server)
      .get("/api/account/session")
      .set("Cookie", adminCookie)
      .expect(401);
    // OAuth state is atomically consumed once in the PostgreSQL fallback.
    const state = new (await import("./postgres-state")).PostgresState(db);
    await state.set("test-oauth", "private-verifier", "EX", 60, "NX");
    const results = await Promise.all([
      state.eval(
        "local v=redis.call('GET',KEYS[1]); redis.call('DEL',KEYS[1]); return v",
        1,
        "test-oauth"
      ),
      state.eval(
        "local v=redis.call('GET',KEYS[1]); redis.call('DEL',KEYS[1]); return v",
        1,
        "test-oauth"
      ),
    ]);
    expect(results.sort()).toEqual(["private-verifier", null].sort());
  });
  it("uses the Heroku-added rightmost client address rather than spoofed prefixes", async () => {
    const instance = app.getHttpAdapter().getInstance();
    instance.set("trust proxy", 1);
    try {
      for (let n = 0; n < 5; n++)
        await request(app.getHttpServer())
          .post("/api/account/login")
          .set("Origin", origin)
          .set("X-Forwarded-For", `198.51.100.${n}, 203.0.113.4`)
          .send({
            identity: "missing-account",
            password: "wrong private password",
          })
          .expect(401);
      await request(app.getHttpServer())
        .post("/api/account/login")
        .set("Origin", origin)
        .set("X-Forwarded-For", "198.51.100.99, 203.0.113.4")
        .send({
          identity: "missing-account",
          password: "wrong private password",
        })
        .expect(429);
      await request(app.getHttpServer())
        .post("/api/account/login")
        .set("Origin", origin)
        .set("X-Forwarded-For", "203.0.113.5")
        .send({
          identity: "missing-account",
          password: "wrong private password",
        })
        .expect(401);
    } finally {
      instance.set("trust proxy", false);
    }
  });
  it("paginates security activity on the server and filters without loading the entire history", async () => {
    const store = app.get(AnalyticsStore),
      server = app.getHttpServer();
    const cookie = `${service.cookieName}=${await service.createSession(await store.owner())}`;
    await db.query("DELETE FROM webdev_analytics_access_audit");
    const at = new Date(Date.now() - 60000).toISOString();
    await store.persistAudits(
      Array.from({ length: 37 }, (_, n) => ({
        eventId: randomUUID(),
        occurredAt: at.replace("Z", `${n % 2 ? "123" : "456"}Z`),
        actor: "site-owner" as const,
        action: n % 2 ? "owner.login" : "owner.sessions.revoke",
        allowed: n % 3 !== 0,
      }))
    );
    await store.persistAudits([
      {
        eventId: randomUUID(),
        occurredAt: new Date(Date.now() - 30 * 86400000).toISOString(),
        actor: "site-owner",
        action: "owner.login",
        allowed: false,
      },
    ]);
    let cursor: string | null = null;
    const seen: string[] = [];
    do {
      const page: {
        body: { entries: { eventId: string }[]; nextCursor: string | null };
      } = await request(server)
        .get(`/api/account/audit?days=1${cursor ? `&cursor=${cursor}` : ""}`)
        .set("Cookie", cookie)
        .expect(200);
      expect(page.body.entries.length).toBeLessThanOrEqual(10);
      seen.push(
        ...page.body.entries.map((row: { eventId: string }) => row.eventId)
      );
      cursor = page.body.nextCursor;
    } while (cursor);
    expect(seen).toHaveLength(37);
    expect(new Set(seen).size).toBe(37);
    const denied = await request(server)
      .get("/api/account/audit?days=1&result=denied&group=sign-in&limit=25")
      .set("Cookie", cookie)
      .expect(200);
    expect(denied.body.entries).toHaveLength(6);
    expect(
      denied.body.entries.every(
        (row: { action: string; allowed: boolean }) =>
          row.action === "owner.login" && !row.allowed
      )
    ).toBe(true);
    await request(server)
      .get("/api/account/audit?limit=1000")
      .set("Cookie", cookie)
      .expect(400);
    await request(server)
      .get("/api/account/audit?cursor=invalid")
      .set("Cookie", cookie)
      .expect(400);
  });
  async function providerAccount(
    username: string,
    githubId: string | null = null
  ) {
    const id = randomUUID();
    await db.query(
      "INSERT INTO webdev_accounts(id,role,username,github_id,revision,display_name) VALUES($1,'client',$2,$3,$4,'Provider Test')",
      [id, username, githubId, randomUUID()]
    );
    return (await app.get(AnalyticsStore).account(id))!;
  }
  async function providerCookie(id: string, proof?: string) {
    return `webdev_owner=${await service.createSession((await app.get(AnalyticsStore).account(id))!, proof)}`;
  }
  function providerPost(path: string, cookie: string, body?: object) {
    return request(app.getHttpServer())
      .post(`/api/account/providers/${path}`)
      .set("Origin", origin)
      .set("Cookie", cookie)
      .send(body);
  }
  async function emailToken(id: string) {
    const [row] = await db.query(
      "SELECT * FROM webdev_mail_outbox WHERE account_id=$1 AND template='add-email' ORDER BY created_at DESC LIMIT 1",
      [id]
    );
    return {
      row,
      token: app.get(AuthMailService).decrypt(row.token_ciphertext),
    };
  }
  function confirmEmail(token: string) {
    return request(app.getHttpServer())
      .post("/api/account/verify-email")
      .set("Origin", origin)
      .send({ token });
  }
  it("adds a verified recovery email, sets a backup password and safely disconnects GitHub", async () => {
    const account = await providerAccount("providers_complete", "91000001");
    let cookie = await providerCookie(account.id);
    await providerPost("github/disconnect", cookie)
      .expect(400)
      .expect(({ body }) => expect(body.code).toBe("LAST_SIGN_IN_METHOD"));
    await providerPost("password", cookie, { newPassword: password }).expect(
      400
    );
    await providerPost("email", cookie, {
      email: "Recovery@example.test",
    }).expect(202);
    expect(
      (await app.get(AnalyticsStore).account(account.id))?.email
    ).toBeNull();
    const pending = await request(app.getHttpServer())
      .get("/api/account/providers")
      .set("Cookie", cookie)
      .expect(200);
    expect(pending.body.pendingEmail).toBe("recovery@example.test");
    const { row, token } = await emailToken(account.id);
    expect(row.recipient).toBe("recovery@example.test");
    expect(row.token_ciphertext).not.toContain(token);
    const [intent] = await db.query(
      "SELECT token_hash,target_email FROM webdev_account_tokens WHERE account_id=$1",
      [account.id]
    );
    expect(intent.token_hash).not.toBe(token);
    expect(intent.target_email).toBe(row.recipient);
    const confirmed = await confirmEmail(token).expect(200);
    expect(confirmed.body.signInRequired).toBe(true);
    await confirmEmail(token).expect(400);
    await request(app.getHttpServer())
      .get("/api/account/session")
      .set("Cookie", cookie)
      .expect(401);
    expect(
      (await app.get(AnalyticsStore).account(account.id))?.emailVerified
    ).toBe(true);
    cookie = await providerCookie(account.id);
    await providerPost("email", cookie, {
      email: "change@example.test",
    }).expect(409);
    await providerPost("password", cookie, { newPassword: password }).expect(
      200
    );
    await request(app.getHttpServer())
      .get("/api/account/session")
      .set("Cookie", cookie)
      .expect(401);
    const login = await request(app.getHttpServer())
      .post("/api/account/login")
      .set("Origin", origin)
      .send({ identity: "recovery@example.test", password })
      .expect(200);
    cookie = (login.headers["set-cookie"] as unknown as string[])
      .find((c) => c.startsWith("webdev_owner="))!
      .split(";")[0];
    await providerPost("github/disconnect", cookie).expect(200);
    await request(app.getHttpServer())
      .get("/api/account/session")
      .set("Cookie", cookie)
      .expect(401);
    expect(
      (await app.get(AnalyticsStore).account(account.id))?.githubId
    ).toBeNull();
    await request(app.getHttpServer())
      .post("/api/account/login")
      .set("Origin", origin)
      .send({ identity: account.username, password })
      .expect(200);
  });
  it("invalidates resend/cancel/expired email links and never sends stale outbox intents", async () => {
    const account = await providerAccount("providers_cancel");
    const cookie = await providerCookie(account.id);
    await providerPost("email", cookie, {
      email: "cancel@example.test",
    }).expect(202);
    const first = await emailToken(account.id);
    await providerPost("email", cookie, {
      email: "cancel@example.test",
    }).expect(202);
    const second = await emailToken(account.id);
    await confirmEmail(first.token).expect(400);
    await providerPost("email/cancel", cookie).expect(200);
    await confirmEmail(second.token).expect(400);
    await db.query(
      "UPDATE webdev_mail_outbox SET status='sent',token_ciphertext=NULL WHERE account_id<>$1",
      [account.id]
    );
    const send = jest.fn();
    Object.assign(app.get(AuthMailService), { provider: { send } });
    await app.get(AuthMailService).deliverOne();
    await app.get(AuthMailService).deliverOne();
    expect(send).not.toHaveBeenCalled();
    await providerPost("email", cookie, {
      email: "expired@example.test",
    }).expect(202);
    const expired = await emailToken(account.id);
    await db.query(
      "UPDATE webdev_account_tokens SET expires_at=now()-interval '1 second' WHERE account_id=$1",
      [account.id]
    );
    await confirmEmail(expired.token).expect(400);
    expect(
      (await app.get(AnalyticsStore).account(account.id))?.email
    ).toBeNull();
  });
  it("serializes competing email confirmations and does not enumerate occupied addresses", async () => {
    const first = await providerAccount("providers_race_one"),
      second = await providerAccount("providers_race_two");
    const c1 = await providerCookie(first.id),
      c2 = await providerCookie(second.id);
    await providerPost("email", c1, { email: "race@example.test" }).expect(202);
    await providerPost("email", c2, { email: "race@example.test" }).expect(202);
    const t1 = await emailToken(first.id),
      t2 = await emailToken(second.id);
    const results = await Promise.all([
      confirmEmail(t1.token),
      confirmEmail(t2.token),
    ]);
    expect(results.map((r) => r.status).sort()).toEqual([200, 400]);
    expect(
      (
        await db.query(
          "SELECT id FROM webdev_accounts WHERE email='race@example.test'"
        )
      ).length
    ).toBe(1);
    const third = await providerAccount("providers_race_three");
    const response = await providerPost(
      "email",
      await providerCookie(third.id),
      { email: "race@example.test" }
    ).expect(202);
    expect(response.body).toEqual({ accepted: true });
    expect(
      (
        await db.query(
          "SELECT * FROM webdev_account_tokens WHERE account_id=$1",
          [third.id]
        )
      ).length
    ).toBe(0);
  });
  it("rejects CSRF, stale sign-in, stale MFA proof, invalid fields and unavailable mail", async () => {
    const account = await providerAccount("providers_gates");
    const token = await service.createSession(account),
      cookie = `webdev_owner=${token}`;
    await request(app.getHttpServer())
      .post("/api/account/providers/email")
      .set("Cookie", cookie)
      .set("Origin", "https://attacker.example")
      .send({ email: "gates@example.test" })
      .expect(403);
    await providerPost("email", cookie, {
      email: "gates@example.test",
      accountId: AnalyticsStore.ROOT_ID,
    }).expect(400);
    const redis = (
      service as unknown as {
        redis: {
          get: (k: string) => Promise<string>;
          set: (...args: unknown[]) => Promise<unknown>;
        };
      }
    ).redis;
    const key = `webdev:qr:session:${service.digest(token)}`;
    const cached = JSON.parse(await redis.get(key));
    await redis.set(
      key,
      JSON.stringify({
        ...cached,
        issuedAt: new Date(Date.now() - 901000).toISOString(),
      }),
      "EX",
      3600
    );
    await providerPost("email", cookie, { email: "gates@example.test" })
      .expect(403)
      .expect(({ body }) => expect(body.code).toBe("RECENT_SIGN_IN_REQUIRED"));
    await redis.set(key, JSON.stringify(cached), "EX", 3600);
    await db.query(
      "INSERT INTO webdev_mfa_methods(account_id,method_id,status,secret_encrypted,verified_at) VALUES($1,$2,'verified',$3,now())",
      [
        account.id,
        randomUUID(),
        app.get(MfaCrypto).encrypt("JBSWY3DPEHPK3PXP", account.id),
      ]
    );
    await providerPost("email", cookie, { email: "gates@example.test" }).expect(
      401
    );
    const staleProof = await providerCookie(
      account.id,
      new Date(Date.now() - 901000).toISOString()
    );
    await providerPost("email", staleProof, { email: "gates@example.test" })
      .expect(403)
      .expect(({ body }) => expect(body.code).toBe("MFA_STEP_UP_REQUIRED"));
    const proofCookie = await providerCookie(
      account.id,
      new Date().toISOString()
    );
    await providerPost("email", proofCookie, {
      email: "gates@example.test",
    }).expect(202);
    expect(await app.get(MfaService).enabled(account.id)).toBe(true);
    Object.assign(app.get(AuthMailService), { provider: undefined });
    await providerPost("email", proofCookie, {
      email: "unavailable@example.test",
    }).expect(503);
    Object.assign(app.get(AuthMailService), {
      provider: { send: jest.fn().mockResolvedValue(undefined) },
    });
  });
  it("rolls back email intent creation when the mail queue fails", async () => {
    const account = await providerAccount("providers_rollback");
    const enqueue = jest
      .spyOn(app.get(AuthMailService), "enqueue")
      .mockRejectedValueOnce(new Error("test queue failure"));
    await providerPost("email", await providerCookie(account.id), {
      email: "providers-rollback@example.test",
    }).expect(503);
    enqueue.mockRestore();
    expect(
      (
        await db.query(
          "SELECT * FROM webdev_account_tokens WHERE account_id=$1",
          [account.id]
        )
      ).length
    ).toBe(0);
    expect(
      (await app.get(AnalyticsStore).account(account.id))?.email
    ).toBeNull();
  });
  it("binds GitHub connection to the originating session, consumes state once and denies occupied providers", async () => {
    Object.assign(service, {
      github: {
        clientId: "test-id",
        clientSecret: "test-secret",
        ownerId: "42",
        callback: `${origin}/api/owner/github/callback`,
      },
    });
    const account = await providerAccount("providers_github");
    const cookie = await providerCookie(account.id);
    const start = async (c: string) => {
      const res = await providerPost("github/connect", c).expect(200);
      expect(
        new URL(res.body.url).searchParams.get("code_challenge_method")
      ).toBe("S256");
      expect(new URL(res.body.url).searchParams.get("allow_signup")).toBe(
        "false"
      );
      return {
        state: new URL(res.body.url).searchParams.get("state")!,
        cookie: (res.headers["set-cookie"] as unknown as string[])
          .find((v) => v.startsWith("webdev_github_state="))!
          .split(";")[0],
      };
    };
    const callback = async (
      intent: Awaited<ReturnType<typeof start>>,
      id: number
    ) => {
      const fetcher = jest
        .spyOn(global, "fetch")
        .mockResolvedValueOnce(
          new Response(
            JSON.stringify({ access_token: "test-token", token_type: "bearer" })
          )
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ id, login: "linked-member" }))
        );
      try {
        return await request(app.getHttpServer())
          .get("/api/owner/github/callback")
          .query({ state: intent.state, code: "test-code" })
          .set("Cookie", intent.cookie)
          .expect(303);
      } finally {
        fetcher.mockRestore();
      }
    };
    const successIntent = await start(cookie);
    const success = await callback(successIntent, 91000002);
    expect(success.headers.location).toBe(
      `${origin}/account/login?notice=github-linked`
    );
    expect(
      (success.headers["set-cookie"] as unknown as string[])
        .filter((c) => c.startsWith("webdev_owner="))
        .every((c) => c.startsWith("webdev_owner=;"))
    ).toBe(true);
    expect(await app.get(AnalyticsStore).account(account.id)).toMatchObject({
      githubId: "91000002",
      githubUsername: "linked-member",
      email: null,
    });
    await request(app.getHttpServer())
      .get("/api/account/session")
      .set("Cookie", cookie)
      .expect(401);
    const replay = await callback(successIntent, 91000003);
    expect(replay.headers.location).not.toContain("notice=github-linked");
    const other = await providerAccount("providers_occupied"),
      otherCookie = await providerCookie(other.id);
    const occupied = await callback(await start(otherCookie), 91000002);
    expect(occupied.headers.location).toBe(
      `${origin}/account/security?providerError=github#providers`
    );
    expect(
      (await app.get(AnalyticsStore).account(other.id))?.githubId
    ).toBeNull();
    const revokedIntent = await start(otherCookie);
    await request(app.getHttpServer())
      .post("/api/account/logout")
      .set("Origin", origin)
      .set("Cookie", otherCookie)
      .expect(200);
    const revoked = await callback(revokedIntent, 91000004);
    expect(revoked.headers.location).toContain("providerError=github");
    expect(
      (await app.get(AnalyticsStore).account(other.id))?.githubId
    ).toBeNull();
    await expect(
      app.get(AnalyticsStore).githubAccount({ id: 42, login: "owner" }, "42")
    ).rejects.toThrow("GitHub is not connected");
  });
});
