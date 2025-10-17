import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { applySavedTheme } from "./utils/theme";

import AppProviders from "@/AppProviders";

import "./index.css";

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
