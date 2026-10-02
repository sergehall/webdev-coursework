import type { Request } from "express";
import type { CorsOptions } from "cors";
import type { INestApplication } from "@nestjs/common";
import { ForbiddenException, Logger } from "@nestjs/common";

const logger = new Logger("CORS");

function parseAllowedOrigins(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function configureCors(app: INestApplication): void {
  const allowedOrigins = parseAllowedOrigins(process.env.ALLOWED_ORIGINS);

  if (allowedOrigins.length === 0) {
    const isProduction = process.env.NODE_ENV === "production";
    const msg =
      "ALLOWED_ORIGINS is not set — all origins are permitted. " +
      "Set ALLOWED_ORIGINS to a comma-separated list of trusted origins in production.";
    if (isProduction) {
      throw new Error(
        "ALLOWED_ORIGINS must be configured in production; credentialed wildcard CORS is prohibited"
      );
    } else {
      logger.log(msg);
    }
  } else {
    logger.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
  }

  app.enableCors(
    (
      req: Request,
      done: (error: Error | null, options?: CorsOptions) => void
    ) => {
      // The documentation gate posts to this API's own origin, independent of
      // the frontend's cross-origin allowlist. Its handler also validates Origin.
      const docsVerification =
        req.method === "POST" &&
        req.path === "/docs/turnstile-verify" &&
        req.get("origin") === `${req.protocol}://${req.get("host")}`;
      done(null, {
        origin: (
          origin: string | undefined,
          callback: (error: Error | null, allow?: boolean) => void
        ) => {
          if (
            !origin ||
            docsVerification ||
            allowedOrigins.length === 0 ||
            allowedOrigins.includes(origin)
          ) {
            callback(null, true);
            return;
          }
          callback(new ForbiddenException("Not allowed by CORS"), false);
        },
        credentials: true,
        exposedHeaders: ["Retry-After"],
      });
    }
  );
}
