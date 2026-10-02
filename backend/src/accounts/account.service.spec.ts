// Account-domain coverage: bot rejection must precede account persistence and mail delivery.
import { ConfigService } from "@nestjs/config";
import type { Request } from "express";
import { AccountService } from "./account.service";
import type { AnalyticsService } from "../analytics/analytics.service";
import type { AnalyticsStore } from "../analytics/analytics.store";
import type { AuthMailService } from "./auth-mail";
import { TurnstileService } from "../security/turnstile/turnstile.service";

function service() {
  return new TurnstileService(
    new ConfigService({
      TURNSTILE_SECRET_KEY: "private-test-secret",
      TURNSTILE_SITE_KEY: "public-site-key",
      TURNSTILE_ALLOWED_HOSTNAMES: "localhost",
      NODE_ENV: "test",
    })
  );
}
describe("Account registration human verification", () => {
  it("blocks registration before password hashing or account/email persistence", async () => {
    const auth = {
      assertOrigin: jest.fn(),
      rateLimit: jest.fn().mockResolvedValue(undefined),
      digest: () => "digest",
    };
    const store = { db: { transaction: jest.fn() } };
    const account = new AccountService(
      auth as unknown as AnalyticsService,
      store as unknown as AnalyticsStore,
      { enabled: true } as AuthMailService,
      service()
    );
    await expect(
      account.register({ ip: "127.0.0.1" } as Request, {
        email: "test@example.test",
        username: "test",
        password: "a long private password",
      })
    ).rejects.toMatchObject({ response: { code: "TURNSTILE_REJECTED" } });
    expect(store.db.transaction).not.toHaveBeenCalled();
    expect(auth.rateLimit).toHaveBeenCalled();
  });
});
