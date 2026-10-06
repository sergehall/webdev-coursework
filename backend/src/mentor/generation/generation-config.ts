import { ServiceUnavailableException } from "@nestjs/common";

export const MODEL = "@cf/openai/gpt-oss-20b";
export const RESERVATION_NEURONS = 400;
export const MAX_OUTPUT_TOKENS = 1200;
// The validated eight-step Cloudflare sample used 2380 output tokens including reasoning.
export const PLAN_OUTPUT_TOKENS = 3200;
export const DEADLINE_MS = 45_000;

export function generationEnabled(accountId?: string): boolean {
  const beta = (process.env.AI_MENTOR_BETA_ACCOUNT_IDS ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  return (
    process.env.AI_MENTOR_ENABLED === "true" &&
    process.env.AI_GENERATION_ENABLED === "true" &&
    (accountId === undefined || beta.includes(accountId)) &&
    (!process.env.AI_MODEL || process.env.AI_MODEL === MODEL) &&
    (process.env.AI_PROVIDER_MODE === "cloudflare"
      ? Boolean(
          process.env.CLOUDFLARE_ACCOUNT_ID &&
          (process.env.CLOUDFLARE_AI_API_TOKEN ||
            process.env.CLOUDFLARE_API_TOKEN)
        )
      : process.env.AI_PROVIDER_MODE === "mock" &&
        process.env.NODE_ENV !== "production")
  );
}

export function assertGenerationReady(accountId: string): void {
  if (!generationEnabled(accountId))
    throw new ServiceUnavailableException({ code: "GENERATION_DISABLED" });
  if (process.env.AI_MODEL !== undefined && process.env.AI_MODEL !== MODEL)
    throw new ServiceUnavailableException({ code: "GENERATION_DISABLED" });
  if (process.env.AI_PROVIDER_MODE === "mock") {
    if (process.env.NODE_ENV === "production")
      throw new ServiceUnavailableException({ code: "GENERATION_DISABLED" });
    return;
  }
  if (
    process.env.AI_PROVIDER_MODE !== "cloudflare" ||
    !process.env.CLOUDFLARE_ACCOUNT_ID ||
    !(process.env.CLOUDFLARE_AI_API_TOKEN || process.env.CLOUDFLARE_API_TOKEN)
  )
    throw new ServiceUnavailableException({ code: "GENERATION_DISABLED" });
}
