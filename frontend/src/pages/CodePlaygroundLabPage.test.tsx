import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CodePlaygroundPage from "@/pages/CodePlaygroundLabPage";
import { renderWithProviders } from "@/test/renderWithProviders";

describe("<CodePlaygroundPage />", () => {
  it("presents the runtime boundaries and workspace controls", () => {
    renderWithProviders(<CodePlaygroundPage />, "/code-playground");

    expect(
      screen.getByRole("heading", { name: /code playground run\. inspect/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /select a file and inspect its behavior/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/isolated execution/i)).toBeInTheDocument();
    expect(screen.getByText(/network restricted/i)).toBeInTheDocument();
    expect(screen.getByText(/bounded runtime/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "JavaScript" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Python" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "HTML" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "JSON" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /run again/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /stop/i })).toBeInTheDocument();
  });

  it("starts with a clear source and console empty state", () => {
    renderWithProviders(<CodePlaygroundPage />, "/code-playground");

    expect(screen.getByText(/no source loaded/i)).toBeInTheDocument();
    expect(screen.getByText(/console is ready/i)).toBeInTheDocument();
    expect(screen.getByText(/workspace ready/i)).toBeInTheDocument();
  });
});
