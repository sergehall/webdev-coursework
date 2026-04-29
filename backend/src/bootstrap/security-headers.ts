import type { INestApplication } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";

export const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net https://code.jquery.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://avatars.githubusercontent.com https://randomuser.me https://www.smc.edu https://www.google.com",
  "font-src 'self' data:",
  "connect-src 'self' https://cdn.jsdelivr.net https://*.ingest.sentry.io https://*.ingest.us.sentry.io",
  "media-src 'self' data: blob:",
  "worker-src 'self' blob:",
  "frame-src 'self' blob:",
  "manifest-src 'self'",
].join("; ");

export const securityHeaders = {
  "Content-Security-Policy": contentSecurityPolicy,
  "Cross-Origin-Resource-Policy": "same-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
} as const;

export function configureSecurityHeaders(app: INestApplication): void {
  app.use((_req: Request, res: Response, next: NextFunction) => {
    for (const [header, value] of Object.entries(securityHeaders)) {
      res.setHeader(header, value);
    }
    next();
  });
}
