export type OwnerProfile = {
  username?: string;
  email?: string | null;
  emailVerified?: boolean;
  passwordEnabled?: boolean;
  githubLinked?: boolean;
  registrationMethod?: "administrator" | "github" | "email";
  displayName: string;
  timeZone: string;
  theme: "system" | "light" | "dark";
  reportDays: number;
};
export type OwnerSession = {
  role: "admin" | "client";
  canManageRoles?: boolean;
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
    message: string
  ) {
    super(message);
  }
}

export async function ownerRequest<T>(
  path: string,
  options: { method?: "GET" | "POST" | "PUT"; body?: unknown } = {}
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
  return (await response.json()) as T;
}
