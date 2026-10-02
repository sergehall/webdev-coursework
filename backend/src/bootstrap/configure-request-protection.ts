import { HttpException, type INestApplication } from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";
import { ApiAbuseGuard } from "../security/api-abuse.guard";

export function configureRequestProtection(app: INestApplication): void {
  const protection = app.get(ApiAbuseGuard);
  // Register before Nest's body parser: malformed JSON and unmatched API paths
  // consume the same budgets as ordinary requests. The global guard is idempotent.
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await protection.protect(req, res);
      next();
    } catch (error) {
      res.setHeader("Cache-Control", "no-store");
      if (error instanceof HttpException) {
        const body = error.getResponse();
        res
          .status(error.getStatus())
          .json(
            typeof body === "string"
              ? { statusCode: error.getStatus(), message: body }
              : { ...body, statusCode: error.getStatus() }
          );
      } else {
        res.status(503).json({
          statusCode: 503,
          message: "Request protection is temporarily unavailable",
        });
      }
    }
  });
}
