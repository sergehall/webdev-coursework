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

  const rawPort = process.env.PORT;
  const port = rawPort ? parseInt(rawPort, 10) : 5050;
  if (rawPort && (Number.isNaN(port) || port < 1 || port > 65535)) {
    startupLogger.warn(
      `Invalid PORT value "${rawPort}" — falling back to 5050`
    );
  }
  const resolvedPort = Number.isNaN(port) || port < 1 || port > 65535 ? 5050 : port;

  await app.listen(resolvedPort);

  const baseUrl = await app.getUrl();
  startupLogger.log(`App is reachable at: ${baseUrl}`);
}

if (process.env.NODE_ENV !== "test") {
  // Catch unhandled promise rejections that escape all other handlers.
  process.on("unhandledRejection", (reason: unknown) => {
    startupLogger.error("Unhandled promise rejection", String(reason));
    process.exit(1);
  });

  // Catch synchronous exceptions that were never caught.
  process.on("uncaughtException", (err: Error) => {
    startupLogger.error(`Uncaught exception: ${err.message}`, err.stack);
    process.exit(1);
  });

  bootstrap().catch((err: unknown) => {
    startupLogger.error(
      "Fatal error during bootstrap",
      err instanceof Error ? err.stack : String(err)
    );
    process.exit(1);
  });
}
