// src/test/renderWithProviders.tsx
import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import AppProviders from "@/AppProviders";

/**
 * Renders the given React element wrapped in all global providers.
 * Also sets up MemoryRouter with initial route for testing purposes.
 *
 * @param ui - React element to render
 * @param route - Initial route path (default: '/')
 */
export function renderWithProviders(ui: ReactElement, route: string = "/") {
  window.history.pushState({}, "Test page", route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <AppProviders>{ui}</AppProviders>
    </MemoryRouter>
  );
}
