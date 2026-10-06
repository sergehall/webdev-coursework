import { hasMentorReturn, MENTOR_PATH } from "@/features/mentor/mentor-preview";

export function securityReturn(value: unknown): string | null {
  return typeof value === "string" &&
    [
      "/account/security#providers",
      "/account/security#password",
      "/account/security#mfa",
    ].includes(value)
    ? value
    : null;
}

export function accountReturn(value: unknown): string | null {
  return securityReturn(value) ?? (hasMentorReturn() ? MENTOR_PATH : null);
}
