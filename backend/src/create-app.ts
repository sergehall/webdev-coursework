// src/create-quiz-app.ts
import type { INestApplication } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { configureCors } from "./bootstrap/configure-cors";
import { configureSecurityHeaders } from "./bootstrap/security-headers";
import { configureSwagger } from "./bootstrap/configure-swagger";
import { configureValidation } from "./bootstrap/configure-validation";
import { configureRequestProtection } from "./bootstrap/configure-request-protection";
import type { Request, Response, NextFunction, Express } from "express";

export const createApp = (app: INestApplication): INestApplication => {
  const server = app.getHttpAdapter().getInstance() as Express;
  server.disable("x-powered-by");
  // Heroku appends the actual peer to the right of X-Forwarded-For.
  // Trust exactly its router hop, never a client-supplied leftmost address.
  if (process.env.DYNO) {
    server.set("trust proxy", 1);
  } else if (process.env.TRUST_PROXY_CIDRS) {
    server.set(
      "trust proxy",
      process.env.TRUST_PROXY_CIDRS.split(",")
        .map((value) => value.trim())
        .filter(Boolean)
    );
  }
  // Cookie middleware
  app.use(cookieParser());
  app.use(
    ["/api/owner", "/api/account"],
    (_req: Request, res: Response, next: NextFunction) => {
      res.setHeader("Cache-Control", "no-store");
      next();
    }
  );

  configureSecurityHeaders(app);
  configureCors(app);
  configureRequestProtection(app);
  configureValidation(app);
  configureSwagger(app);

  return app;
};
