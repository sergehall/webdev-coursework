import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { applySavedTheme } from "./utils/theme";
import { envSchema } from "./config/env/env.schema";

import AppProviders from "@/AppProviders";

import "./index.css";

// Validate environment variables at runtime startup so misconfigured
// deployments fail immediately with a clear message rather than producing
// cryptic network errors later.
const envResult = envSchema.safeParse(import.meta.env);
if (!envResult.success) {
  const formatted = envResult.error.issues
    .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(`Invalid environment variables:\n${formatted}`);
}

// Apply saved theme preference or fall back to system setting
try {
  applySavedTheme();
} catch (error) {
  console.error("Failed to apply saved theme:", error);
}

const container = document.getElementById("root");
if (!container) {
  console.error("Root container #root not found. App not mounted.");
  throw new Error("Root container #root not found");
}

const root = ReactDOM.createRoot(container);

function renderApp() {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AppProviders>
          <App />
        </AppProviders>
      </BrowserRouter>
    </React.StrictMode>
  );
}

renderApp();
