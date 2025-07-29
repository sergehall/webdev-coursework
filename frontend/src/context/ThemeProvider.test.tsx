// src/context/ThemeProvider.test.tsx
import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { act } from "react";

import { ThemeProvider } from "./ThemeProvider";
import { useThemeContext } from "./useThemeContext";

import { renderWithProviders } from "@/test/renderWithProviders";

function TestComponent() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

describe("<ThemeProvider />", () => {
  it("provides default theme and toggles correctly", async () => {
    renderWithProviders(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const textBefore = screen.getByText(/current theme:/i);
    expect(textBefore).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /toggle theme/i });

    await act(async () => {
      button.click();
    });

    const textAfter = screen.getByText(/current theme:/i);
    expect(textAfter).toBeInTheDocument();
  });
});
