import request = require("supertest");
import { randomUUID } from "crypto";
import type { Request } from "express";
import { AnalyticsStore } from "../../../../src/analytics/analytics.store";
import type { AnalyticsIntegrationContextProvider } from "../support/test-environment";

export function registerActiveSessionScenarios(
  getContext: AnalyticsIntegrationContextProvider
): void {
  it("paginates only live sessions of the current account without leaking session credentials", async () => {
    const { app, db, service, origin } = getContext();
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
        runtimeState: { remove: (key: string) => Promise<unknown> };
      }
    ).runtimeState.remove(`webdev:qr:session:${service.digest(tokens[5])}`);
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
    const { app, db, service } = getContext();
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
}
