import { UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";
import type { AnalyticsService } from "../../analytics/analytics.service";
import { MentorAccountAccess } from "./mentor-account-access";

describe("mentor account audience", () => {
  const previous = {
    node: process.env.NODE_ENV,
    enabled: process.env.AI_MENTOR_ENABLED,
    beta: process.env.AI_MENTOR_BETA_ACCOUNT_IDS,
    public: process.env.AI_MENTOR_PUBLIC_ENABLED,
  };
  const analytics = {
    assertOrigin: jest.fn(),
    authorize: jest.fn().mockResolvedValue({ accountId: "invited-account" }),
  };
  const access = new MentorAccountAccess(
    analytics as unknown as AnalyticsService
  );

  afterEach(() => {
    for (const [key, value] of Object.entries({
      NODE_ENV: previous.node,
      AI_MENTOR_ENABLED: previous.enabled,
      AI_MENTOR_BETA_ACCOUNT_IDS: previous.beta,
      AI_MENTOR_PUBLIC_ENABLED: previous.public,
    })) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    jest.clearAllMocks();
  });

  it("keeps every mentor API closed in production while the feature flag is off", async () => {
    process.env.NODE_ENV = "production";
    process.env.AI_MENTOR_ENABLED = "false";
    process.env.AI_MENTOR_PUBLIC_ENABLED = "true";
    await expect(
      access.accountId({} as Request, "bootstrap")
    ).rejects.toMatchObject({
      status: 503,
    });
  });

  it("allows only invited accounts and keeps write origin checks", async () => {
    process.env.NODE_ENV = "production";
    process.env.AI_MENTOR_ENABLED = "true";
    process.env.AI_MENTOR_PUBLIC_ENABLED = "false";
    process.env.AI_MENTOR_BETA_ACCOUNT_IDS = "another-account";
    await expect(
      access.accountId({} as Request, "profile.save", true)
    ).rejects.toMatchObject({
      status: 403,
    });
    expect(analytics.assertOrigin).toHaveBeenCalledTimes(1);
    process.env.AI_MENTOR_BETA_ACCOUNT_IDS = "another-account,invited-account";
    await expect(access.accountId({} as Request, "bootstrap")).resolves.toBe(
      "invited-account"
    );
  });

  it("opens to signed-in accounts only with the explicit public switch", async () => {
    process.env.NODE_ENV = "production";
    process.env.AI_MENTOR_ENABLED = "true";
    process.env.AI_MENTOR_BETA_ACCOUNT_IDS = "another-account";
    process.env.AI_MENTOR_PUBLIC_ENABLED = "true";
    await expect(access.accountId({} as Request, "bootstrap")).resolves.toBe(
      "invited-account"
    );
    await expect(
      access.accountId({} as Request, "profile.save", true)
    ).resolves.toBe("invited-account");
    expect(analytics.assertOrigin).toHaveBeenCalledTimes(1);

    analytics.authorize.mockRejectedValueOnce(new UnauthorizedException());
    await expect(
      access.accountId({} as Request, "bootstrap")
    ).rejects.toMatchObject({ status: 401 });
  });
});
