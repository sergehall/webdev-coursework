//  src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { createApp } from "./create-app";

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

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
