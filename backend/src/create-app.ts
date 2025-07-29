// src/create-quiz-app.ts
import type { INestApplication } from "@nestjs/common";
import { ValidationPipe, BadRequestException } from "@nestjs/common";
import { useContainer } from "class-validator";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import type { Request, Response, NextFunction } from "express";

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

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle("SMC Backend API")
    .setDescription("API for JS Programming Course (CS81)")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  // CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") ?? "*",
    credentials: true,
  });

  return app;
};
