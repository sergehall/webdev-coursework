// src/components/errors/ErrorBoundary.tsx

import { Component, type ErrorInfo, type ReactNode } from "react";
import * as Sentry from "@sentry/react";

// Props expected by the ErrorBoundary component
type Props = {
  children: ReactNode; // React children to render
  fallback?: ReactNode; // Optional fallback UI when an error is caught
};

// Internal component state
type State = {
  hasError: boolean; // Whether an error has been caught
};

/**
 * ErrorBoundary
 * Catches rendering errors in descendant components and displays a fallback UI.
 * Prevents the entire React app from crashing due to runtime errors.
 */
export class ErrorBoundary extends Component<Props, State> {
  // Initialize error state to false
  state: State = { hasError: false };

  /**
   * Lifecycle method triggered when a child component throws during rendering.
   * Sets internal state to indicate that an error has occurred.
   * React will re-render and call the `render()` method, allowing us to show a fallback UI.
   */
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  /**
   * Lifecycle method triggered after an error is caught.
   * Allows side effects like logging the error to console or monitoring services (e.g., Sentry).
   */
  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    // Log the error and component stack trace to the console
    console.error(
      "Unhandled error in component tree:",
      error instanceof Error ? error.message : error,
      errorInfo
    );

    // Optionally send the error to Sentry in production only
    if (import.meta.env.PROD) {
      Sentry.captureException(error, {
        extra: {
          componentStack: errorInfo.componentStack,
        },
      });
    }
  }

  /**
   * Renders fallback UI if an error occurred.
   * Otherwise, renders children as usual.
   */
  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="rounded bg-red-50 p-4 text-red-500 dark:bg-red-900/10">
            <p className="font-semibold">Something went wrong.</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
