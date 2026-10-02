import request = require("supertest");
import { randomUUID } from "crypto";
import { AnalyticsStore } from "../../../../src/analytics/analytics.store";
import type { AnalyticsIntegrationContextProvider } from "../support/test-environment";

export function registerAccessSecurityScenarios(
  getContext: AnalyticsIntegrationContextProvider
): void {
  it("lets only the primary admin manage roles and invalidates changed sessions", async () => {
    const { app, db, service, origin } = getContext();
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
    // OAuth state is atomically consumed once in the shared PostgreSQL store.
    const state = new (
      await import("../../../../src/analytics/postgres-state")
    ).PostgresState(db);
    await state.set("test-oauth", "private-verifier", 60, true);
    const results = await Promise.all([
      state.take("test-oauth"),
      state.take("test-oauth"),
    ]);
    expect(results.sort()).toEqual(["private-verifier", null].sort());
  });
  it("uses the Heroku-added rightmost client address rather than spoofed prefixes", async () => {
    const { app, origin } = getContext();
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
    const { app, db, service } = getContext();
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
}
