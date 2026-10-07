/** The public switch is separate from the private beta allowlist. */
export function mentorAudienceAllows(accountId: string): boolean {
  if (!accountId) return false;
  if (process.env.AI_MENTOR_PUBLIC_ENABLED === "true") return true;
  return (process.env.AI_MENTOR_BETA_ACCOUNT_IDS ?? "")
    .split(",")
    .some((id) => id.trim() === accountId);
}
