import request = require("supertest");
import { randomUUID } from "crypto";
import { AnalyticsStore } from "../../../../src/analytics/analytics.store";
import { hashOwnerPassword } from "../../../../src/analytics/owner-password";
import type { AnalyticsIntegrationContextProvider } from "../support/test-environment";

export function registerProfilePreferenceScenarios(
  getContext: AnalyticsIntegrationContextProvider
): void {
  it("persists validated preferences per account and restricts administration defaults", async () => {
    const { app, db, service, origin } = getContext();
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
    const { app, db, service, password, origin } = getContext();
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
}
