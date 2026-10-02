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
