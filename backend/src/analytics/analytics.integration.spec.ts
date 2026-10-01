import { randomUUID } from "crypto";
import { IndexSecurityActivity1790910000000 } from "../db/migrations/1790910000000-IndexSecurityActivity";
import { UseAdminAndClientRoles1790906400000 } from "../db/migrations/1790906400000-UseAdminAndClientRoles";
import type { Request } from "express";
import { Test } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import type { INestApplication } from "@nestjs/common";
import { DataSource } from "typeorm";
import { AccountController } from "../accounts/account.controller";
import { AccountService } from "../accounts/account.service";
import { AuthMailService } from "../accounts/auth-mail";
import { AddPublicAccounts1790902800000 } from "../db/migrations/1790902800000-AddPublicAccounts";
import request = require("supertest");
import { AnalyticsController, OwnerController } from "./analytics.controller";
import { AnalyticsStore } from "./analytics.store";
import { AnalyticsService } from "./analytics.service";
import { AddQrAnalytics1790899200000 } from "../db/migrations/1790899200000-AddQrAnalytics";
import { hashOwnerPassword } from "./owner-password";
import { createApp } from "../create-app";
import { MfaService } from "../accounts/mfa/mfa.service";
import { MfaCrypto, totp } from "../accounts/mfa/mfa.crypto";
import { MfaController } from "../accounts/mfa/mfa.controller";
import { AddAccountMfa1790913600000 } from "../db/migrations/1790913600000-AddAccountMfa";

import { AddAccountPreferences1790917200000 } from "../db/migrations/1790917200000-AddAccountPreferences";

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
      ],
    });
    await db.initialize();
    await db.query(
      "CREATE TABLE IF NOT EXISTS reference_app_data (id integer PRIMARY KEY, value text); INSERT INTO reference_app_data VALUES(1, 'preserve me') ON CONFLICT DO NOTHING"
    );
    await db.runMigrations();
    // This database belongs exclusively to the temporary test container.
    await db.query(
      "TRUNCATE webdev_accounts, webdev_mfa_methods, webdev_mfa_recovery_codes, webdev_mfa_challenges, webdev_account_tokens, webdev_mail_outbox, webdev_runtime_state, webdev_runtime_queue, webdev_owner_account, webdev_qr_events, webdev_qr_daily_stats, webdev_analytics_access_audit"
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
      ],
      providers: [
        AnalyticsService,
        AnalyticsStore,
        AccountService,
        AuthMailService,
        MfaCrypto,
        MfaService,
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
});
