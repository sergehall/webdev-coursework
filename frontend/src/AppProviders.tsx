// src/AppProviders.tsx
import type { ReactNode } from "react";

import ProgressProvider from "./context/ProgressProvider";

import { ThemeProvider } from "@/context/ThemeProvider";
import { ErrorBoundary } from "@/components/errors/ErrorBoundary";

const AppProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <ProgressProvider>
      <ErrorBoundary>{children}</ErrorBoundary>
    </ProgressProvider>
  </ThemeProvider>
);

export default AppProviders;
