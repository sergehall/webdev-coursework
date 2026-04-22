// frontend/src/config/env/env.schema.ts
import { z } from "zod";

export const envSchema = z
  .object({
    VITE_ENVIRONMENT: z
      .enum(["development", "production", "test"], {
        errorMap: () => ({
          message:
            "VITE_ENVIRONMENT must be one of: 'development', 'production', 'test'",
        }),
      })
      .default("production"),

    // Empty string = same-origin relative URLs (valid for single-dyno deploys).
    // Set to a full URL only when the API lives on a different origin.
    VITE_API_URL: z
      .union([
        z
          .string()
          .url("VITE_API_URL must be a valid URL starting with http or https"),
        z.literal(""),
      ])
      .default(""),

    VITE_QUIZ_SECRET: z
      .string()
      .min(1, "VITE_QUIZ_SECRET must be defined and not empty"),

    VITE_SENTRY_DSN: z
      .string()
      .url("VITE_SENTRY_DSN must be a valid URL")
      .optional(),
  })
  .passthrough();
