import type {
  ActiveSessionsPage,
  OwnerSession,
  QrStatistics,
} from "./owner-api";
import type { MfaResponse, MfaStatus } from "./mfa-api";

import { z } from "@/config/zod";

const ownerProfileSchema = z.object({
  username: z.string().optional(),
  email: z.string().nullable().optional(),
  emailVerified: z.boolean().optional(),
  passwordEnabled: z.boolean().optional(),
  githubLinked: z.boolean().optional(),
  githubUsername: z.string().nullable().optional(),
  registrationMethod: z.enum(["administrator", "github", "email"]).optional(),
  displayName: z.string(),
  timeZone: z.string(),
  theme: z.enum(["system", "light", "dark"]),
  reportDays: z.number().int().positive(),
  dateFormat: z.enum(["medium", "day-first", "iso"]).optional(),
  clockFormat: z.enum(["12h", "24h"]).optional(),
  activityDays: z.number().int().positive().optional(),
  activityPageSize: z.number().int().positive().optional(),
});

const ownerSessionSchema = z.object({
  role: z.enum(["admin", "client"]),
  canManageRoles: z.boolean().optional(),
  mfaEnabled: z.boolean().optional(),
  mfaVerifiedAt: z.string().optional(),
  authMethod: z.enum(["password", "github", "unknown"]).optional(),
  issuedAt: z.string(),
  expiresAt: z.string(),
  profile: ownerProfileSchema,
});

export function parseOwnerSession(value: unknown): OwnerSession {
  return ownerSessionSchema.parse(value);
}

const mfaStatusSchema = z.object({
  configured: z.boolean(),
  enabled: z.boolean(),
  pendingEnrollment: z.boolean(),
  enrolledAt: z.string().nullable(),
  recoveryCodesRemaining: z.number().int().nonnegative(),
  currentSessionVerifiedAt: z.string().nullable(),
});

const mfaResponseSchema = z.object({
  mfa: mfaStatusSchema,
  setup: z
    .object({
      enrollmentId: z.string(),
      expiresAt: z.string(),
      issuer: z.string(),
      accountName: z.string(),
      secret: z.string(),
      otpauthUri: z.string(),
    })
    .optional(),
  recoveryCodes: z.array(z.string()).optional(),
});

const activeSessionsPageSchema = z.object({
  entries: z.array(
    z.object({
      id: z.string(),
      issuedAt: z.string(),
      expiresAt: z.string(),
      lastSeenAt: z.string(),
      device: z.string(),
      os: z.string(),
      browser: z.string(),
      authMethod: z.string(),
      current: z.boolean(),
    })
  ),
  nextCursor: z.string().nullable(),
});

const auditPageSchema = z.object({
  entries: z.array(
    z.object({
      eventId: z.string(),
      occurredAt: z.string(),
      action: z.string(),
      allowed: z.boolean(),
      actor: z.string(),
    })
  ),
  nextCursor: z.string().nullable(),
});

const accountsSchema = z.array(
  z.object({
    id: z.string(),
    username: z.string(),
    displayName: z.string(),
    role: z.enum(["admin", "client"]),
    email: z.string().nullable(),
    createdAt: z.string(),
  })
);
const accountPageSchema = z.object({
  entries: accountsSchema,
  page: z.number().int().positive(),
  hasMore: z.boolean(),
});

const qrStatisticsSchema = z.object({
  campaign: z.string(),
  days: z.number(),
  total: z.number(),
  daily: z.record(z.string(), z.number()),
  devices: z.record(z.string(), z.number()),
  systems: z.record(z.string(), z.number()),
  browsers: z.record(z.string(), z.number()),
  generatedAt: z.string(),
});

export const parseMfaStatus = (value: unknown): MfaStatus =>
  mfaStatusSchema.parse(value);
export const parseMfaResponse = (value: unknown): MfaResponse =>
  mfaResponseSchema.parse(value);
export const parseActiveSessionsPage = (value: unknown): ActiveSessionsPage =>
  activeSessionsPageSchema.parse(value);
export const parseAuditPage = (value: unknown) => auditPageSchema.parse(value);
export const parseAccounts = (value: unknown) => accountsSchema.parse(value);
export const parseAccountPage = (value: unknown) =>
  accountPageSchema.parse(value);
export const parseQrStatistics = (value: unknown): QrStatistics =>
  qrStatisticsSchema.parse(value);
export const parseLoginOptions = (value: unknown) =>
  z
    .object({
      githubEnabled: z.boolean(),
      registrationEnabled: z.boolean(),
      turnstileRequired: z.boolean(),
      turnstileSiteKey: z.string(),
    })
    .parse(value);
export const parseAuthResponse = (value: unknown) =>
  z
    .object({
      mfaRequired: z.boolean().optional(),
      signInRequired: z.boolean().optional(),
    })
    .parse(value);
export const parseGithubRedirect = (value: unknown) =>
  z.object({ url: z.string().url() }).parse(value);
export const parseMfaChallenge = (value: unknown) =>
  z.object({ expiresAt: z.string().datetime() }).parse(value);
export const parseSignedOut = (value: unknown) =>
  z.object({ authenticated: z.literal(false) }).parse(value);
