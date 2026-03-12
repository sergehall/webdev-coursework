// src/create-quiz-app.ts
import type { INestApplication } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { configureCors } from "./bootstrap/configure-cors";
import { configureSwagger } from "./bootstrap/configure-swagger";
import { configureValidation } from "./bootstrap/configure-validation";

export const createApp = (app: INestApplication): INestApplication => {
  // Cookie middleware!
  app.use(cookieParser());

  configureValidation(app);
  configureSwagger(app);
  configureCors(app);

  return app;
};
