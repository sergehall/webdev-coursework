// src/utils/sentry.ts
import * as Sentry from "@sentry/react";

// Keep traces at 100 % in development/test for full visibility.
// In production reduce to 10 % to limit overhead and cost.
const tracesSampleRate = import.meta.env.PROD ? 0.1 : 1.0;

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN, // We use a Vite/Yarn 4 compatible env variable.
  environment: import.meta.env.MODE,
  tracesSampleRate,
  sendDefaultPii: false,
  beforeSend(event) {
    return /\/(?:account|owner)(?:\/|$)/.test(window.location.pathname)
      ? null
      : event;
  },
  beforeSendTransaction(event) {
    return /\/(?:account|owner)(?:\/|$)/.test(window.location.pathname)
      ? null
      : event;
  },
  beforeBreadcrumb(breadcrumb) {
    // Account URLs may include short-lived verification tokens in their fragment.
    if (
      /\/(?:account|owner)(?:\/|$)/.test(window.location.pathname) ||
      /\/(?:api\/)?(?:account|owner)(?:\/|$)/.test(
        JSON.stringify(breadcrumb.data ?? {})
      )
    )
      return null;
    return breadcrumb;
  },
});
