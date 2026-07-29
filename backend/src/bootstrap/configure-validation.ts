import type { INestApplication } from "@nestjs/common";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";

export function configureValidation(app: INestApplication): void {
  useContainer(app, { fallbackOnErrors: true });

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
