import { ConfigService } from "@nestjs/config";
import type { Request } from "express";
import { TurnstileService } from "../security/turnstile/turnstile.service";
import { AnalyticsService } from "./analytics.service";
import type { AnalyticsStore } from "./analytics.store";
import type { AccountStore } from "../accounts/store/account.store";
import {
  hashOwnerPassword,
  verifyOwnerPassword,
} from "../accounts/owner-password";
import { normalizeDevice } from "../security/device";
import type { MfaService } from "../accounts/mfa/mfa.service";

function fixture() {
  const store = {
    owner: jest.fn().mockResolvedValue({
      id: "00000000-0000-4000-8000-000000000001",
      role: "admin",
      revision: "current",
      passwordHash: "",
      displayName: "Serge",
      timeZone: "UTC",
      theme: "system",
      reportDays: 30,
    }),
    dashboard: jest.fn(),
    audits: jest.fn(),
    recordSession: jest.fn().mockResolvedValue(undefined),
    forgetSession: jest.fn().mockResolvedValue(undefined),
  };
  Object.assign(store, {
    account: store.owner,
    githubAccount: jest
      .fn()
      .mockImplementation(async (identity: { id: number }) => ({
        ...(await store.owner()),
        role: identity.id === 42 ? "admin" : "client",
      })),
  });
  const runtimeState = {
    get: jest.fn(),
    set: jest.fn(),
    increment: jest.fn().mockResolvedValue(1),
    enqueue: jest.fn().mockResolvedValue(1),
    take: jest.fn(),
    remove: jest.fn(),
  };
  const mfa = {
    enabled: jest.fn().mockResolvedValue(false),
    challenge: jest.fn().mockResolvedValue(null),
  };
  const service = new AnalyticsService(
    new ConfigService(),
    store as unknown as AnalyticsStore,
    store as unknown as AccountStore,
    mfa as unknown as MfaService,
    new TurnstileService(
      new ConfigService({
        TURNSTILE_SECRET_KEY: "",
        TURNSTILE_SITE_KEY: "",
        TURNSTILE_ALLOWED_HOSTNAMES: "",
      })
    )
  );
  Object.assign(service, {
    runtimeState,
    secret: "a".repeat(40),
    origins: ["http://localhost:3000"],
    github: {
      clientId: "id",
      clientSecret: "secret",
      ownerId: "42",
      callback: "http://localhost:3000/api/owner/github/callback",
    },
  });
  const req = {
    cookies: {},
    ip: "127.0.0.1",
    query: {},
    get: jest.fn().mockReturnValue("http://localhost:3000"),
  } as unknown as Request;
  return { service, store, runtimeState, req, mfa };
}

describe("Owner access and anonymous analytics", () => {
  it("removes a newly issued cache token if registering its session fails", async () => {
    const { service, store, runtimeState } = fixture();
    store.recordSession.mockRejectedValueOnce(
      new Error("database unavailable")
    );
    await expect(service.createSession(await store.owner())).rejects.toThrow(
      "database unavailable"
    );
    expect(runtimeState.remove).toHaveBeenCalledWith(
      runtimeState.set.mock.calls[0][0]
    );
    expect(store.recordSession.mock.calls[0][0]).not.toHaveProperty("token");
    expect(store.recordSession.mock.calls[0][0].tokenHash).toMatch(
      /^[0-9a-f]{64}$/
    );
  });
  it("blocks password login and owner aliases before looking up credentials when Turnstile is required", async () => {
    const { service, req, store, runtimeState } = fixture();
    Object.assign(service, {
      turnstile: new TurnstileService(
        new ConfigService({
          TURNSTILE_SECRET_KEY: "test-private-secret",
          TURNSTILE_SITE_KEY: "test-site-key",
          TURNSTILE_ALLOWED_HOSTNAMES: "localhost",
        })
      ),
    });
    await expect(
      service.login(req, "a long private password")
    ).rejects.toMatchObject({ response: { code: "TURNSTILE_REJECTED" } });
    expect(store.owner).not.toHaveBeenCalled();
    expect(runtimeState.increment).toHaveBeenCalledTimes(2);
  });
  it("hashes passwords and rejects incorrect or malformed hashes", async () => {
    const hash = await hashOwnerPassword("a long private password");
    expect(await verifyOwnerPassword("a long private password", hash)).toBe(
      true
    );
    expect(await verifyOwnerPassword("another password", hash)).toBe(false);
    expect(await verifyOwnerPassword("anything", "bad")).toBe(false);
  });
  it.each(["root_owner", "client", "support", "owner"])(
    "denies a %s session",
    async (role) => {
      const { service, req, runtimeState, store } = fixture();
      req.cookies.webdev_owner = "x".repeat(43);
      runtimeState.get.mockResolvedValue(
        JSON.stringify({
          accountId: "00000000-0000-4000-8000-000000000001",
          role,
          revision: "current",
          expiresAt: new Date(Date.now() + 60000).toISOString(),
        })
      );
      await expect(service.dashboard(req, 30)).rejects.toThrow(
        "Owner sign-in required"
      );
      expect(store.dashboard).not.toHaveBeenCalled();
    }
  );
  it.each(["expired", "revoked"])("denies %s root sessions", async (reason) => {
    const { service, req, runtimeState } = fixture();
    req.cookies.webdev_owner = "x".repeat(43);
    runtimeState.get.mockResolvedValue(
      JSON.stringify({
        accountId: "00000000-0000-4000-8000-000000000001",
        role: "admin",
        revision: reason === "revoked" ? "old" : "current",
        expiresAt: new Date(
          reason === "expired" ? 0 : Date.now() + 60000
        ).toISOString(),
      })
    );
    await expect(service.session(req)).rejects.toThrow();
  });
  it("returns only safe session fields to the browser", async () => {
    const { service, req, runtimeState } = fixture();
    req.cookies.webdev_owner = "x".repeat(43);
    runtimeState.get.mockResolvedValue(
      JSON.stringify({
        accountId: "00000000-0000-4000-8000-000000000001",
        role: "admin",
        revision: "current",
        issuedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 60000).toISOString(),
      })
    );
    const result = await service.session(req);
    expect(result.profile.displayName).toBe("Serge");
    expect(JSON.stringify(result)).not.toContain("passwordHash");
    expect(result).not.toHaveProperty("token");
  });
  it("rejects password login from an untrusted origin", async () => {
    const { service, req, store } = fixture();
    (req.get as jest.Mock).mockReturnValue("https://attacker.example");
    await expect(service.login(req, "some password")).rejects.toThrow(
      "Untrusted origin"
    );
    expect(store.owner).not.toHaveBeenCalled();
  });
  it("creates PKCE challenge and ten-minute one-time OAuth state", async () => {
    const { service, req, runtimeState } = fixture();
    const result = await service.githubStart(req);
    const url = new URL(result.url);
    expect(url.origin).toBe("https://github.com");
    expect(url.searchParams.get("code_challenge_method")).toBe("S256");
    expect(url.searchParams.has("scope")).toBe(false);
    expect(runtimeState.set).toHaveBeenCalledWith(
      expect.stringContaining(":oauth:"),
      expect.any(String),
      600,
      true
    );
    expect(result.state).toHaveLength(43);
  });
  it("rejects unbound OAuth state without exchanging credentials", async () => {
    const { service, req } = fixture();
    req.query = { code: "code", state: "x".repeat(43) };
    const fetcher = jest.spyOn(global, "fetch");
    await expect(service.githubCallback(req)).rejects.toThrow(
      "Unable to sign in"
    );
    expect(fetcher).not.toHaveBeenCalled();
  });
  it.each([42, 999])(
    "creates a correctly scoped GitHub session for ID %s",
    async (id) => {
      const { service, req, runtimeState } = fixture();
      req.query = { code: "code", state: "x".repeat(43) };
      req.cookies.webdev_github_state = req.query.state;
      runtimeState.take.mockResolvedValue("verifier");
      jest
        .spyOn(global, "fetch")
        .mockResolvedValueOnce(
          new Response(
            JSON.stringify({
              access_token: "ephemeral-token",
              token_type: "bearer",
            })
          )
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ id, login: "test-user" }))
        );
      expect(await service.githubCallback(req)).toEqual({
        token: expect.stringMatching(/^[A-Za-z0-9_-]{43}$/),
      });
      expect(JSON.parse(runtimeState.set.mock.calls[0][1]).role).toBe(
        id === 42 ? "admin" : "client"
      );
    }
  );
  it("rejects consumed OAuth states", async () => {
    const { service, req, runtimeState } = fixture();
    req.query = { code: "code", state: "x".repeat(43) };
    req.cookies.webdev_github_state = req.query.state;
    runtimeState.take.mockResolvedValue(null);
    await expect(service.githubCallback(req)).rejects.toThrow();
    expect(runtimeState.set).not.toHaveBeenCalled();
  });
  it("normalizes devices without retaining raw UA or identifying models", () => {
    expect(
      normalizeDevice(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1 Version/18 Mobile Safari/604.1"
      )
    ).toEqual({ device: "phone", os: "iOS", browser: "Safari" });
  });
  it("buffers only anonymous categories and server time", async () => {
    const { service, req, runtimeState } = fixture();
    (req.get as jest.Mock).mockReturnValue(
      "Mozilla/5.0 Android Chrome/100 Mobile"
    );
    await service.ingest(req, {
      eventId: "b884fa37-6fab-4a47-8da9-b195c9d9af5a",
      campaign: "esl10g-presentation-1",
    });
    const event = JSON.parse(runtimeState.enqueue.mock.calls[0][1] as string);
    expect(Object.keys(event).sort()).toEqual([
      "browser",
      "campaign",
      "device",
      "eventId",
      "occurredAt",
      "os",
    ]);
    expect(JSON.stringify(event)).not.toContain("127.0.0.1");
  });
});
