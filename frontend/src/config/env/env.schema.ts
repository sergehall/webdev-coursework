// frontend/src/config/env/env.schema.ts
import { z } from "../zod";
import { normalizeApiOrigin } from "../../api/request-url";

const apiOriginSchema = z.string().refine((value) => {
  try {
    normalizeApiOrigin(value, false);
    return true;
  } catch {
    return false;
  }
}, "API URL must be a valid URL using an HTTP(S) origin without credentials, path, query or fragment");

export const envSchema = z
  .object({
    VITE_ENVIRONMENT: z
      .enum(["development", "production", "test"], {
        error:
          "VITE_ENVIRONMENT must be one of: 'development', 'production', 'test'",
      })
      .default("production"),

    // Empty string = same-origin relative URLs (valid for single-dyno deploys).
    // Set to a full URL only when the API lives on a different origin.
    VITE_API_URL: apiOriginSchema.default(""),
    VITE_OWNER_API_URL: apiOriginSchema.optional(),

    VITE_QUIZ_SECRET: z
      .string()
      .min(1, "VITE_QUIZ_SECRET must be defined and not empty"),

    VITE_SENTRY_DSN: z
      .string()
      .url("VITE_SENTRY_DSN must be a valid URL")
      .optional(),
  })
  .passthrough()
  .superRefine((env, ctx) => {
    if (env.VITE_ENVIRONMENT !== "production") return;
    for (const key of ["VITE_API_URL", "VITE_OWNER_API_URL"] as const) {
      try {
        normalizeApiOrigin(env[key] ?? "", true);
      } catch {
        ctx.addIssue({
          code: "custom",
          path: [key],
          message: `${key} requires HTTPS in production`,
        });
      }
    }
  });
