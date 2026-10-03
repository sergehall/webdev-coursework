import { describe, expect, it } from "vitest";

import { parseOwnerSession } from "./owner-contracts";

const session = {
  role: "client",
  issuedAt: "2026-10-03T00:00:00.000Z",
  expiresAt: "2026-10-03T01:00:00.000Z",
  profile: {
    displayName: "Learner",
    timeZone: "America/Los_Angeles",
    theme: "system",
    reportDays: 30,
  },
};

describe("account session contract", () => {
  it("accepts the documented session shape", () => {
    expect(parseOwnerSession(session)).toMatchObject(session);
  });

  it("rejects invalid account roles before they reach the provider", () => {
    expect(() => parseOwnerSession({ ...session, role: "root" })).toThrow();
  });
});
