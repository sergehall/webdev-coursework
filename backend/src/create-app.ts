// src/create-quiz-app.ts
import type { INestApplication } from "@nestjs/common";
import { ValidationPipe, BadRequestException } from "@nestjs/common";
import { useContainer } from "class-validator";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import type { Request, Response, NextFunction } from "express";
import { SWAGGER_SECURITY } from "./swagger/security.constants";

export const createApp = (app: INestApplication): INestApplication => {
  // DI support in validators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Cookie middleware
  app.use(cookieParser());

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl === "/") {
      res.redirect("/api");
    } else {
      next();
    }
  });

  // Set global prefix for API routes
  app.setGlobalPrefix("api");

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
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
    .setTitle("SMC Backend API")
    .setDescription("API for Web Developer Learning Portal")
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

  SwaggerModule.setup("/api/docs", app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  // CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") ?? "*",
    credentials: true,
  });

  return app;
};
