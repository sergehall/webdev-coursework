import request = require("supertest");
import { randomUUID } from "crypto";
import { AnalyticsStore } from "../../../../src/analytics/analytics.store";
import { AuthMailService } from "../../../../src/accounts/auth-mail";
import { MfaService } from "../../../../src/accounts/mfa/mfa.service";
import { MfaCrypto } from "../../../../src/accounts/mfa/mfa.crypto";
import type { AnalyticsIntegrationContextProvider } from "../support/test-environment";

export function registerAccountProviderScenarios(
  getContext: AnalyticsIntegrationContextProvider
): void {
  async function providerAccount(
    username: string,
    githubId: string | null = null
  ) {
    const { app, db } = getContext();
    const id = randomUUID();
    await db.query(
      "INSERT INTO webdev_accounts(id,role,username,github_id,revision,display_name) VALUES($1,'client',$2,$3,$4,'Provider Test')",
      [id, username, githubId, randomUUID()]
    );
    return (await app.get(AnalyticsStore).account(id))!;
  }
  async function providerCookie(id: string, proof?: string) {
    const { app, service } = getContext();
    return `webdev_owner=${await service.createSession((await app.get(AnalyticsStore).account(id))!, proof)}`;
  }
  function providerPost(path: string, cookie: string, body?: object) {
    const { app, origin } = getContext();
    return request(app.getHttpServer())
      .post(`/api/account/providers/${path}`)
      .set("Origin", origin)
      .set("Cookie", cookie)
      .send(body);
  }
  async function emailToken(id: string) {
    const { app, db } = getContext();
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
    const { app, origin } = getContext();
    return request(app.getHttpServer())
      .post("/api/account/verify-email")
      .set("Origin", origin)
      .send({ token });
  }

  it("adds a verified recovery email, sets a backup password and safely disconnects GitHub", async () => {
    const { app, db, password, origin } = getContext();
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
    const { app, db } = getContext();
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
    const { db } = getContext();
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
    const { app, db, service } = getContext();
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
    const runtimeState = (
      service as unknown as {
        runtimeState: {
          get: (k: string) => Promise<string>;
          set: (...args: unknown[]) => Promise<unknown>;
        };
      }
    ).runtimeState;
    const key = `webdev:qr:session:${service.digest(token)}`;
    const cached = JSON.parse(await runtimeState.get(key));
    await runtimeState.set(
      key,
      JSON.stringify({
        ...cached,
        issuedAt: new Date(Date.now() - 901000).toISOString(),
      }),
      3600
    );
    await providerPost("email", cookie, { email: "gates@example.test" })
      .expect(403)
      .expect(({ body }) => expect(body.code).toBe("RECENT_SIGN_IN_REQUIRED"));
    await runtimeState.set(key, JSON.stringify(cached), 3600);
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
    const { app, db } = getContext();
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
    const { app, service, origin } = getContext();
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
}
