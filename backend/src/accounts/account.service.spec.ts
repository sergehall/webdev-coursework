// Account-domain coverage: bot rejection must precede account persistence and mail delivery.
import { ConfigService } from "@nestjs/config";
import type { Request } from "express";
import { AccountService } from "./account.service";
import type { AnalyticsService } from "../analytics/analytics.service";
import type { AccountStore } from "./store/account.store";
import type { AuthMailService } from "./auth-mail";
import { TurnstileService } from "../security/turnstile/turnstile.service";
import * as ownerPassword from "./owner-password";

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
  it.each([
    [{ email_taken: true, username_taken: false }, "EMAIL_ALREADY_REGISTERED"],
    [{ email_taken: false, username_taken: true }, "USERNAME_TAKEN"],
  ])(
    "explains a local registration conflict without queuing mail",
    async (existing, code) => {
      const previousEnvironment = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";
      const query = jest
        .fn()
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([existing]);
      const mail = { enabled: true, enqueue: jest.fn() };
      const hash = jest
        .spyOn(ownerPassword, "hashOwnerPassword")
        .mockResolvedValue("hash");
      try {
        const account = new AccountService(
          {
            assertOrigin: jest.fn(),
            rateLimit: jest.fn(),
            digest: () => "digest",
          } as unknown as AnalyticsService,
          {
            db: {
              transaction: (work: (q: { query: typeof query }) => unknown) =>
                work({ query }),
            },
          } as unknown as AccountStore,
          mail as unknown as AuthMailService,
          { verify: jest.fn() } as unknown as TurnstileService
        );
        await expect(
          account.register({ ip: "127.0.0.1" } as Request, {
            email: "student@example.test",
            username: "student",
            password: "distinct-passphrase-5821",
          })
        ).rejects.toMatchObject({ response: { code } });
        expect(mail.enqueue).not.toHaveBeenCalled();
      } finally {
        hash.mockRestore();
        process.env.NODE_ENV = previousEnvironment;
      }
    }
  );

  it("keeps duplicate registration indistinguishable in production", async () => {
    const previousEnvironment = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    const query = jest.fn().mockResolvedValue([]);
    const mail = { enabled: true, enqueue: jest.fn() };
    const hash = jest
      .spyOn(ownerPassword, "hashOwnerPassword")
      .mockResolvedValue("hash");
    try {
      const account = new AccountService(
        {
          assertOrigin: jest.fn(),
          rateLimit: jest.fn(),
          digest: () => "digest",
        } as unknown as AnalyticsService,
        {
          db: {
            transaction: (work: (q: { query: typeof query }) => unknown) =>
              work({ query }),
          },
        } as unknown as AccountStore,
        mail as unknown as AuthMailService,
        { verify: jest.fn() } as unknown as TurnstileService
      );
      await expect(
        account.register({ ip: "127.0.0.1" } as Request, {
          email: "student@example.test",
          username: "student",
          password: "distinct-passphrase-5821",
        })
      ).resolves.toBeUndefined();
      expect(query).toHaveBeenCalledTimes(1);
      expect(mail.enqueue).not.toHaveBeenCalled();
    } finally {
      hash.mockRestore();
      process.env.NODE_ENV = previousEnvironment;
    }
  });

  it("blocks registration before password hashing or account/email persistence", async () => {
    const auth = {
      assertOrigin: jest.fn(),
      rateLimit: jest.fn().mockResolvedValue(undefined),
      digest: () => "digest",
    };
    const store = { db: { transaction: jest.fn() } };
    const account = new AccountService(
      auth as unknown as AnalyticsService,
      store as unknown as AccountStore,
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

  it("rejects a blocklisted password before account or email persistence", async () => {
    const auth = {
      assertOrigin: jest.fn(),
      rateLimit: jest.fn().mockResolvedValue(undefined),
      digest: () => "digest",
    };
    const store = { db: { transaction: jest.fn() } };
    const turnstile = { verify: jest.fn().mockResolvedValue(undefined) };
    const account = new AccountService(
      auth as unknown as AnalyticsService,
      store as unknown as AccountStore,
      { enabled: true } as AuthMailService,
      turnstile as unknown as TurnstileService
    );
    await expect(
      account.register({ ip: "127.0.0.1" } as Request, {
        email: "test@example.test",
        username: "test",
        password: "123456789987654321",
      })
    ).rejects.toMatchObject({
      response: { code: "PASSWORD_TOO_COMMON" },
    });
    expect(turnstile.verify).toHaveBeenCalledWith(
      undefined,
      "account_register"
    );
    expect(store.db.transaction).not.toHaveBeenCalled();
  });
});

describe("Password reset token verification", () => {
  it("rejects an invalid token before deriving a password hash", async () => {
    const auth = {
      assertOrigin: jest.fn(),
      rateLimit: jest.fn().mockResolvedValue(undefined),
      digest: () => "digest",
    };
    const query = jest.fn().mockResolvedValue([]);
    const store = {
      db: {
        transaction: (work: (q: { query: typeof query }) => unknown) =>
          work({ query }),
      },
    };
    const account = new AccountService(
      auth as unknown as AnalyticsService,
      store as unknown as AccountStore,
      { enabled: true } as AuthMailService,
      service()
    );
    const hash = jest.spyOn(ownerPassword, "hashOwnerPassword");
    try {
      await expect(
        account.consume(
          { ip: "127.0.0.1" } as Request,
          "A".repeat(43),
          "reset",
          "distinct-passphrase-5821"
        )
      ).rejects.toMatchObject({ status: 400 });
      expect(query).toHaveBeenCalledTimes(1);
      expect(hash).not.toHaveBeenCalled();
    } finally {
      hash.mockRestore();
    }
  });

  it("derives and persists the password only after finding a current reset token", async () => {
    const auth = {
      assertOrigin: jest.fn(),
      rateLimit: jest.fn().mockResolvedValue(undefined),
      digest: () => "digest",
    };
    const query = jest
      .fn()
      .mockResolvedValueOnce([
        {
          account_id: "account-1",
          revision: "current",
          current_revision: "current",
          purpose: "reset",
        },
      ])
      .mockResolvedValue([]);
    const store = {
      db: {
        transaction: (work: (q: { query: typeof query }) => unknown) =>
          work({ query }),
      },
    };
    const account = new AccountService(
      auth as unknown as AnalyticsService,
      store as unknown as AccountStore,
      { enabled: true } as AuthMailService,
      service()
    );
    const hash = jest
      .spyOn(ownerPassword, "hashOwnerPassword")
      .mockResolvedValue("derived-hash");
    try {
      await expect(
        account.consume(
          { ip: "127.0.0.1" } as Request,
          "A".repeat(43),
          "reset",
          "distinct-passphrase-5821"
        )
      ).resolves.toEqual({ signInRequired: false });
      expect(hash).toHaveBeenCalledWith("distinct-passphrase-5821");
      expect(query.mock.calls[1][1][0]).toBe("derived-hash");
      expect(query).toHaveBeenCalledTimes(3);
    } finally {
      hash.mockRestore();
    }
  });
});
