// frontend/src/config/env/env.schema.ts
import { z } from "zod";

export const envSchema = z
  .object({
    VITE_ENVIRONMENT: z.enum(["development", "production", "test"], {
      errorMap: () => ({
        message:
          "VITE_ENVIRONMENT must be one of: 'development', 'production', 'test'",
      }),
    }),
    VITE_API_URL: z
      .string()
      .url("VITE_API_URL must be a valid URL starting with http or https"),

    VITE_QUIZ_SECRET: z
      .string()
      .min(1, "VITE_QUIZ_SECRET must be defined and not empty"),
    VITE_SENTRY_DSN: z
      .string()
      .url("VITE_SENTRY_DSN must be a valid URL")
      .optional(),
  })
  .passthrough();
