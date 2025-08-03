// src/AppProviders.tsx
import type { ReactNode } from "react";

import { ThemeProvider } from "@/context/ThemeProvider";
import { ErrorBoundary } from "@/components/errors/ErrorBoundary";

const AppProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <ErrorBoundary>{children}</ErrorBoundary>
  </ThemeProvider>
);

export default AppProviders;
