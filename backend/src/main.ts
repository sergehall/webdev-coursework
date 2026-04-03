//  src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { Logger } from "@nestjs/common";
import { createApp } from "./create-app";

const startupLogger = new Logger("Bootstrap");

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  // Warn when running on Heroku's ephemeral filesystem.
  // Files written to /uploads will be lost on every dyno restart/cycle.
  // Replace Multer disk storage with an object-store (S3, Cloudinary, etc.)
  // before using the image-upload feature in production.
  if (process.env.DYNO) {
    startupLogger.warn(
      "Running on Heroku ephemeral filesystem — uploaded files in /uploads " +
        "will be lost on dyno restart. Migrate Multer to object storage (S3 / Cloudinary)."
    );
  }

  createApp(app);

  // Enable NestJS lifecycle shutdown hooks (SIGTERM/SIGINT).
  // This gives in-flight requests time to finish before the process exits.
  app.enableShutdownHooks();

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5050;

  // Start the application and listen on the specified port
  await app.listen(port, () => {
    console.log(`🚀 Backend API is running on http://localhost:${port}`);
  });

  const baseUrl = await app.getUrl();
  console.log(`📡 App is reachable at: ${baseUrl}`);
}

if (process.env.NODE_ENV !== "test") {
  bootstrap().catch((err) => {
    console.error("❌ Error starting app:", err);
  });
}
