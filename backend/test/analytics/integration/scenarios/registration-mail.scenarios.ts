import request = require("supertest");
import type { Request } from "express";
import { AnalyticsStore } from "../../../../src/analytics/analytics.store";
import { AccountService } from "../../../../src/accounts/account.service";
import { AuthMailService } from "../../../../src/accounts/auth-mail";
import type { AnalyticsIntegrationContextProvider } from "../support/test-environment";

export function registerRegistrationMailScenarios(
  getContext: AnalyticsIntegrationContextProvider
): void {
  it("preserves other tables and keeps registration, confirmation and reset scoped to members", async () => {
    const { app, db, origin } = getContext();
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
    const { app, db, origin } = getContext();
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
}
