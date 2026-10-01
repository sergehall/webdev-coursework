// src/create-quiz-app.ts
import type { INestApplication } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { configureCors } from "./bootstrap/configure-cors";
import { configureSecurityHeaders } from "./bootstrap/security-headers";
import { configureSwagger } from "./bootstrap/configure-swagger";
import { configureValidation } from "./bootstrap/configure-validation";
import type { Request, Response, NextFunction, Express } from "express";

export const createApp = (app: INestApplication): INestApplication => {
  // Heroku appends the actual peer to the right of X-Forwarded-For.
  // Trust exactly its router hop, never a client-supplied leftmost address.
  if (process.env.DYNO) {
    const server = app.getHttpAdapter().getInstance() as Express;
    server.set("trust proxy", 1);
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
  configureValidation(app);
  configureSwagger(app);
  configureCors(app);

  return app;
};
