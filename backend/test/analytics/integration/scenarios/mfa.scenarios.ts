import request = require("supertest");
import { randomUUID } from "crypto";
import { ConfigService } from "@nestjs/config";
import { AnalyticsStore } from "../../../../src/analytics/analytics.store";
import { MfaService } from "../../../../src/accounts/mfa/mfa.service";
import { MfaCrypto, totp } from "../../../../src/accounts/mfa/mfa.crypto";
import { hashOwnerPassword } from "../../../../src/analytics/owner-password";
import type { AnalyticsIntegrationContextProvider } from "../support/test-environment";

export function registerMfaScenarios(
  getContext: AnalyticsIntegrationContextProvider
): void {
  it("enforces MFA for password and GitHub, consumes codes once, and safely disables it", async () => {
    const { app, db, service, password, origin } = getContext();
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
    const { app, db } = getContext();
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
    const { app, db, service } = getContext();
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
}
