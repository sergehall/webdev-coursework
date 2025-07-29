// src/AppProviders.test.tsx

import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";

import AppProviders from "@/AppProviders";

it("wraps children and renders them without error", () => {
  render(
    <AppProviders>
      <div>Test child</div>
    </AppProviders>
  );

  expect(screen.getByText("Test child")).toBeInTheDocument();
});
