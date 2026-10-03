import { BadRequestException } from "@nestjs/common";

export const auditGroups: Record<string, string[]> = {
  "sign-in": [
    "owner.login%",
    "owner.github.%",
    "account.github.%",
    "account.mfa.login",
  ],
  sessions: ["owner.session%", "owner.logout"],
  profile: ["owner.profile.%", "owner.preferences.%"],
  security: ["owner.password.%", "owner.sessions.revoke", "account.mfa.%"],
  administration: ["accounts.%"],
  analytics: ["analytics.%"],
  limits: ["rate.%"],
};

export function decodeActivityCursor(cursor?: string): {
  before: string | null;
  beforeId: string | null;
} {
  let before: string | null = null,
    beforeId: string | null = null;
  if (cursor) {
    try {
      const parsed = JSON.parse(
        Buffer.from(cursor, "base64url").toString("utf8")
      ) as { at: string; id: string };
      if (
        typeof parsed.at !== "string" ||
        !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3,6}Z$/.test(parsed.at) ||
        new Date(parsed.at).toISOString().slice(0, 19) !==
          parsed.at.slice(0, 19) ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          parsed.id
        )
      )
        throw new Error();
      before = parsed.at;
      beforeId = parsed.id;
    } catch {
      throw new BadRequestException("Invalid activity cursor");
    }
  }
  return { before, beforeId };
}
