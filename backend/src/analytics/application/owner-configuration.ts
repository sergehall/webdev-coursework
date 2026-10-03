import type { ConfigService } from "@nestjs/config";

import { OWNER_HASH_PATTERN } from "../owner-password";

export type GithubConfiguration = {
  clientId: string;
  clientSecret: string;
  ownerId: string;
  callback: string;
};

export function loadOwnerConfiguration(
  config: ConfigService,
  secureCookie: boolean
) {
  const secret = config.get<string>("OWNER_SESSION_SECRET") ?? "";
  const passwordHash = config.get<string>("OWNER_PASSWORD_HASH") ?? "";
  const origins = (config.get<string>("OWNER_ALLOWED_ORIGINS") ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  if (
    secret.length < 32 ||
    !OWNER_HASH_PATTERN.test(passwordHash) ||
    !origins.length
  ) {
    throw new Error(
      "Accounts require OWNER_PASSWORD_HASH, OWNER_SESSION_SECRET (32+ characters), and OWNER_ALLOWED_ORIGINS"
    );
  }
  for (const origin of origins) {
    const parsed = new URL(origin);
    if (
      parsed.origin !== origin ||
      (secureCookie && parsed.protocol !== "https:")
    )
      throw new Error(
        "OWNER_ALLOWED_ORIGINS must contain exact trusted origins; production requires HTTPS"
      );
  }
  const githubKeys = [
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "GITHUB_OWNER_ID",
    "GITHUB_CALLBACK_URL",
  ];
  const githubValues = githubKeys.map((key) => config.get<string>(key) ?? "");
  let github: GithubConfiguration | undefined;
  if (githubValues.some(Boolean)) {
    if (!githubValues.every(Boolean) || !/^\d+$/.test(githubValues[2]))
      throw new Error("Complete GitHub owner OAuth configuration is required");
    const callback = new URL(githubValues[3]);
    if (
      callback.pathname !== "/api/owner/github/callback" ||
      callback.search ||
      callback.hash ||
      (secureCookie && callback.protocol !== "https:")
    )
      throw new Error("Invalid GitHub callback URL");
    github = {
      clientId: githubValues[0],
      clientSecret: githubValues[1],
      ownerId: githubValues[2],
      callback: callback.href,
    };
  }
  return { secret, passwordHash, origins, github };
}
