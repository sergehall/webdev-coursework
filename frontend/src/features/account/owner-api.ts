export type OwnerProfile = {
  username?: string;
  email?: string | null;
  emailVerified?: boolean;
  passwordEnabled?: boolean;
  githubLinked?: boolean;
  githubUsername?: string | null;
  registrationMethod?: "administrator" | "github" | "email";
  displayName: string;
  timeZone: string;
  theme: "system" | "light" | "dark";
  reportDays: number;
  dateFormat?: "medium" | "day-first" | "iso";
  clockFormat?: "12h" | "24h";
  activityDays?: number;
  activityPageSize?: number;
};
export type OwnerSession = {
  role: "admin" | "client";
  canManageRoles?: boolean;
  mfaEnabled?: boolean;
  mfaVerifiedAt?: string;
  authMethod?: "password" | "github" | "unknown";
  issuedAt: string;
  expiresAt: string;
  profile: OwnerProfile;
};
export type QrStatistics = {
  campaign: string;
  days: number;
  total: number;
  daily: Record<string, number>;
  devices: Record<string, number>;
  systems: Record<string, number>;
  browsers: Record<string, number>;
  generatedAt: string;
};
export type AuditEntry = {
  eventId?: string;
  occurredAt: string;
  action: string;
  allowed: boolean;
  actor: string;
};

export class OwnerApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string
  ) {
    super(message);
  }
}

export async function ownerRequest<T>(
  path: string,
  options: {
    method?: "GET" | "POST" | "PUT";
    body?: unknown;
    parseResponse?: (value: unknown) => T;
  } = {}
): Promise<T> {
  const response = await fetch(
    `${import.meta.env.VITE_OWNER_API_URL ?? import.meta.env.VITE_API_URL ?? ""}/api/account/${path}`,
    {
      method: options.method ?? "GET",
      credentials: "include",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body:
        options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: AbortSignal.timeout(10_000),
    }
  ).catch(() => {
    throw new OwnerApiError(
      0,
      "Unable to reach the account. Please try again."
    );
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      code?: string;
    } | null;
    const mfaMessages: Record<string, string> = {
      // Use stable server codes, without exposing Cloudflare responses or infrastructure details.
      TURNSTILE_REJECTED: "Complete human verification and try again.",
      TURNSTILE_UNAVAILABLE:
        "Human verification is unavailable. Please try again later.",
      MFA_INVALID_CODE:
        "Invalid or already used code. Wait for a new authenticator code or use a recovery code.",
      MFA_ENROLLMENT_EXPIRED: "Authenticator setup expired. Start again.",
      MFA_STEP_UP_REQUIRED:
        "Verify your authenticator in Security before retrying this action.",
      RECENT_SIGN_IN_REQUIRED:
        "Sign in again before changing your security settings.",
      LAST_SIGN_IN_METHOD:
        "Set up a verified email and password before disconnecting your last sign-in method.",
      VERIFIED_EMAIL_REQUIRED:
        "Confirm your email before setting up password sign-in.",
      EMAIL_ALREADY_SET:
        "This account already has an email address. It cannot be replaced here.",
      EMAIL_UNAVAILABLE:
        "This email cannot be added. Request another confirmation.",
      PASSWORD_TOO_COMMON:
        "Choose a less common password, such as a unique passphrase or one from a password manager.",
    };
    if (body?.code && mfaMessages[body.code])
      throw new OwnerApiError(
        response.status,
        mfaMessages[body.code],
        body.code
      );
    const message =
      response.status === 401
        ? "Your session ended. Please sign in again."
        : response.status === 429
          ? "Too many attempts. Please wait before trying again."
          : response.status === 503
            ? "The account is not available yet. Please try again later."
            : "The request could not be completed. Please check your details and try again.";
    throw new OwnerApiError(response.status, message);
  }
  const value: unknown = await response.json();
  return options.parseResponse ? options.parseResponse(value) : (value as T);
}

export type ActiveSession = {
  id: string;
  issuedAt: string;
  expiresAt: string;
  lastSeenAt: string;
  device: string;
  os: string;
  browser: string;
  authMethod: string;
  current: boolean;
};
export type ActiveSessionsPage = {
  entries: ActiveSession[];
  nextCursor: string | null;
};
