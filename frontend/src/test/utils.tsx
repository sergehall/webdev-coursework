// src/test/utils.tsx
import React, { type ReactElement } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { ThemeProvider } from "@/context/ThemeProvider";
import ProgressProvider from "@/context/ProgressProvider";
import { ErrorBoundary } from "@/components/errors/ErrorBoundary";

export function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter>
      <ThemeProvider>
        <ProgressProvider>
          <ErrorBoundary>{children}</ErrorBoundary>
        </ProgressProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
}

export function renderWithProviders(ui: ReactElement, route = "/") {
  window.history.pushState({}, "Test page", route);

  return render(<AllTheProviders>{ui}</AllTheProviders>);
}
