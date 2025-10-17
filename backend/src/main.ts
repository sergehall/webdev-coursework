//  src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { createApp } from "./create-app.js";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  createApp(app);

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5050;

  // Start the application and listen on the specified port
  await app.listen(port, () => {
    console.log(`🚀 Backend API is running on http://localhost:${port}`);
  });

  const baseUrl = await app.getUrl();
  console.log(`📡 App is reachable at: ${baseUrl}`);
}

bootstrap().catch((err) => {
  console.error("❌ Error starting app:", err);
});
