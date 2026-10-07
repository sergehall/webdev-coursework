import { z } from "@/config/zod";

const usageNumbers = {
  requestCount: z.number().int().nonnegative(),
  completedCount: z.number().int().nonnegative(),
  inputTokens: z.number().int().nonnegative(),
  outputTokens: z.number().int().nonnegative(),
  tokenReportedCount: z.number().int().nonnegative(),
  accountedNeurons: z.number().int().nonnegative(),
};

const entrySchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  displayName: z.string(),
  email: z.string().nullable(),
  role: z.enum(["admin", "client"]),
  ...usageNumbers,
  lastUsedAt: z.string().datetime().nullable(),
  disabledAt: z.string().datetime().nullable(),
});

const reportSchema = z.object({
  days: z.union([z.literal(7), z.literal(30)]),
  page: z.number().int().positive(),
  generatedAt: z.string().datetime(),
  since: z.string().datetime(),
  totals: z.object({
    ...usageNumbers,
    activeAccounts: z.number().int().nonnegative(),
  }),
  entries: z.array(entrySchema),
  hasMore: z.boolean(),
});

export type MentorUsageEntry = z.infer<typeof entrySchema>;
export type MentorUsageReport = z.infer<typeof reportSchema>;
export const parseMentorUsage = (value: unknown): MentorUsageReport =>
  reportSchema.parse(value);
