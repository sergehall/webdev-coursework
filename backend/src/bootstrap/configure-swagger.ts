import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SWAGGER_SECURITY } from "../swagger/security.constants";
import { createHash, timingSafeEqual } from "crypto";
import type { Request, Response, NextFunction } from "express";
import { RequestThrottleService } from "../security/request-throttle.service";

export function isSwaggerEnabled(): boolean {
  return (
    process.env.SWAGGER_ENABLED === "true" ||
    (process.env.NODE_ENV !== "production" &&
      process.env.SWAGGER_ENABLED !== "false")
  );
}

export function swaggerConfig() {
  const production = process.env.NODE_ENV === "production";
  return new DocumentBuilder()
    .setTitle("Webdev Coursework API")
    .setDescription(
      "API contract for client-practice quizzes, anonymous QR events, accounts, MFA and administrator reports. /api/account and /api/owner aliases share limits and permissions. Cookie authentication requires credentials: include; unsafe account requests require a trusted Origin. Global per-IP limits: 20/second, 120/minute, writes 30/minute and sensitive operations 10/minute. Additional login, email and MFA limits apply. Public answer-token issuance supports practice only, not protected graded exams."
    )
    .setVersion("1.1")
    .addCookieAuth(
      production ? "__Secure-webdev_owner" : "webdev_owner",
      {
        type: "apiKey",
        in: "cookie",
        description:
          "Opaque HttpOnly session cookie set by sign-in. Use the browser cookie jar; never store the session in localStorage.",
      },
      "account-session"
    )
    .addCookieAuth(
      production ? "__Secure-webdev_mfa" : "webdev_mfa",
      {
        type: "apiKey",
        in: "cookie",
        description:
          "Short-lived HttpOnly MFA challenge cookie set after password/GitHub sign-in.",
      },
      "mfa-challenge"
    )
    .addApiKey(
      {
        type: "apiKey",
        in: "header",
        name: "x-admin-key",
        description:
          "Server-managed admin key for quiz writes and token verification.",
      },
      "adminKey"
    )
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description:
          "Quiz-specific practice answers token. Paste only the token in Authorize.",
      },
      SWAGGER_SECURITY.ANSWERS_TOKEN
    )
    .build();
}

export function configureSwagger(app: INestApplication): void {
  if (!isSwaggerEnabled()) return;
  const username = process.env.SWAGGER_USERNAME;
  const password = process.env.SWAGGER_PASSWORD;
  if (
    process.env.NODE_ENV === "production" &&
    (!username || !password || password.length < 24 || username.includes(":"))
  ) {
    throw new Error(
      "Production Swagger requires SWAGGER_USERNAME and a separate SWAGGER_PASSWORD of at least 24 characters"
    );
  }
  const expected =
    username && password
      ? createHash("sha256").update(`${username}:${password}`).digest()
      : null;
  const throttle = expected ? app.get(RequestThrottleService) : null;
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (!/^\/(?:docs(?:[/-]|$)|openapi\.(?:json|yaml)\/?$)/i.test(req.path))
      return next();
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
    if (throttle) {
      try {
        const result = await throttle.consume(
          req.ip ?? req.socket.remoteAddress ?? "unknown",
          "documentation",
          30,
          60
        );
        if (result.count > 30) {
          res.setHeader("Retry-After", String(result.retryAfter));
          res.status(429).json({
            statusCode: 429,
            message: "Too many documentation requests",
          });
          return;
        }
      } catch {
        res.status(503).json({
          statusCode: 503,
          message: "Request protection is temporarily unavailable",
        });
        return;
      }
    }
    if (expected) {
      const header = req.get("authorization") ?? "";
      const supplied =
        /^Basic [A-Za-z0-9+/]+=*$/i.test(header) && header.length <= 2048
          ? Buffer.from(header.slice(6), "base64").toString("utf8")
          : "";
      if (
        !timingSafeEqual(
          createHash("sha256").update(supplied).digest(),
          expected
        )
      ) {
        res.setHeader(
          "WWW-Authenticate",
          'Basic realm="API documentation", charset="UTF-8"'
        );
        res.status(401).json({
          statusCode: 401,
          message: "Documentation credentials required",
        });
        return;
      }
    }
    next();
  });
  const document = SwaggerModule.createDocument(app, swaggerConfig(), {
    operationIdFactory: (controller, method, version) =>
      `${controller}_${method}${version ? `_${version}` : ""}`,
  });
  // Aliased controller routes must have unique, stable IDs for client generators.
  for (const [path, item] of Object.entries(document.paths)) {
    for (const [method, operation] of Object.entries(item ?? {})) {
      if (
        operation &&
        typeof operation === "object" &&
        "operationId" in operation
      ) {
        operation.operationId = `${method}_${path.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_|_$/g, "")}`;
      }
    }
  }

  SwaggerModule.setup("/docs", app, document, {
    swaggerOptions: {
      persistAuthorization: false,
      displayRequestDuration: true,
      filter: true,
      tryItOutEnabled: false,
    },
    jsonDocumentUrl: "/openapi.json",
    yamlDocumentUrl: "/openapi.yaml",
  });
}
