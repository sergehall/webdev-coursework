import request = require("supertest");
import { AnalyticsStore } from "../../../../src/analytics/analytics.store";
import type { AnalyticsIntegrationContextProvider } from "../support/test-environment";

export function registerQrReportingScenarios(
  getContext: AnalyticsIntegrationContextProvider
): void {
  it("protects reports, persists deduplicated visits and revokes sessions", async () => {
    const { app, db, service, password, origin } = getContext();
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
}
