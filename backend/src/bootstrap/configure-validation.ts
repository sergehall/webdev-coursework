import type { INestApplication } from "@nestjs/common";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";
import { AppModule } from "../app.module";

export function configureValidation(app: INestApplication): void {
  // DI support in validators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

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
}
