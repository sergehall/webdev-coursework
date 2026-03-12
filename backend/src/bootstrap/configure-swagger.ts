import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SWAGGER_SECURITY } from "../swagger/security.constants";

export function configureSwagger(app: INestApplication): void {
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
}
