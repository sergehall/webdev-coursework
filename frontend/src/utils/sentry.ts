// src/utils/sentry.ts
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN, // We use a Vite/Yarn 4 compatible env variable.
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0, // 0–1 (0%–100% tracing, can be changed)
});
