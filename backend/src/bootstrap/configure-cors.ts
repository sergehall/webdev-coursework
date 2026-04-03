import type { INestApplication } from "@nestjs/common";
import { Logger } from "@nestjs/common";

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
      logger.warn(msg);
    } else {
      logger.log(msg);
    }
  } else {
    logger.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
  }

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void
    ) => {
      // Allow non-browser clients (no Origin header).
      if (!origin) {
        callback(null, true);
        return;
      }

      // If no explicit allowlist is configured, allow all origins.
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
  });
}
