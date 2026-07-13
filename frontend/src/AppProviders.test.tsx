// src/AppProviders.test.tsx

import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import AppProviders from "@/AppProviders";

describe("AppProviders", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the application tree when providers initialize", () => {
    render(
      <AppProviders>
        <div>Test child</div>
      </AppProviders>
    );

    expect(screen.getByText("Test child")).toBeInTheDocument();
  });

  it("shows the root fallback when a descendant fails during rendering", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <AppProviders>
        <ThrowingChild />
      </AppProviders>
    );

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });
});

function ThrowingChild(): never {
  throw new Error("Startup render failed");
}
