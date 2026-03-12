// src/create-quiz-app.ts
import type { INestApplication } from "@nestjs/common";
import { ValidationPipe, BadRequestException } from "@nestjs/common";
import { useContainer } from "class-validator";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SWAGGER_SECURITY } from "./swagger/security.constants";

function parseAllowedOrigins(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export const createApp = (app: INestApplication): INestApplication => {
  // DI support in validators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Cookie middleware
  app.use(cookieParser());

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      stopAtFirstError: false,
      exceptionFactory: (errors) => {
        const customErrors = errors.map((e) => ({
          field: e.property,
          message: Object.values(e.constraints ?? {}).join(", "),
        }));
        throw new BadRequestException(customErrors);
      },
    })
  );

  // Swagger setup — register a named Bearer scheme (no global lock)
  const config = new DocumentBuilder()
    .setTitle("Webdev Coursework API")
    .setDescription(
      "Public API for coursework progress, quizzes, tokenized answer access, and service metadata."
    )
    .setVersion("1.0")
    .addApiKey(
      {
        type: "apiKey",
        in: "header",
        name: "x-admin-key",
        description: "Admin key for utility/debug endpoints",
      },
      "adminKey"
    )
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description:
          'Use a JWT in the Authorization header. In Swagger, click "Authorize" and paste the token only (without the "Bearer " prefix).',
      },
      SWAGGER_SECURITY.ANSWERS_TOKEN
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/docs", app, document, {
    swaggerOptions: { persistAuthorization: true },
    jsonDocumentUrl: "/openapi.json",
  });

  // CORS
  const allowedOrigins = parseAllowedOrigins(process.env.ALLOWED_ORIGINS);
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

  return app;
};
