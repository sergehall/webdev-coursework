import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, expect, it, vi } from "vitest";

import ThemeToggle from "../../components/ThemeToggle";
import { ThemeProvider } from "../../context/ThemeProvider";

import OwnerPage from "./OwnerPage";
import OwnerProvider from "./OwnerProvider";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  localStorage.removeItem("theme");
  document.documentElement.classList.remove("dark");
});

it.each(["light", "system"] as const)(
  "applies the %s account preference and lets the labeled header switch the whole cabinet",
  async (accountTheme) => {
    localStorage.setItem("theme", "dark");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((url: string) =>
        Promise.resolve(
          new Response(
            JSON.stringify(
              url.endsWith("/session")
                ? {
                    role: "client",
                    issuedAt: new Date().toISOString(),
                    expiresAt: new Date(Date.now() + 3600000).toISOString(),
                    profile: {
                      displayName: "Test",
                      username: "test_user",
                      email: "test@example.test",
                      theme: accountTheme,
                      timeZone: "UTC",
                      reportDays: 30,
                    },
                  }
                : { saved: true }
            )
          )
        )
      )
    );
    render(
      <MemoryRouter initialEntries={["/account/profile"]}>
        <ThemeProvider>
          <OwnerProvider>
            <ThemeToggle />
            <OwnerPage />
          </OwnerProvider>
        </ThemeProvider>
      </MemoryRouter>
    );
    await screen.findByLabelText("Username");
    const original = accountTheme === "system" ? "Dark Mode" : "Light Mode";
    const switched = accountTheme === "system" ? "Light Mode" : "Dark Mode";
    const toggle = screen.getByRole("button", {
      name: `Toggle Theme: ${original}`,
    });
    expect(toggle).toHaveTextContent(original);
    fireEvent.click(toggle);
    expect(
      screen.getByRole("button", { name: `Toggle Theme: ${switched}` })
    ).toHaveTextContent(switched);
    expect(document.documentElement.classList.contains("dark")).toBe(
      switched === "Dark Mode"
    );
    expect(document.querySelector(".owner-workspace")).not.toHaveAttribute(
      "data-theme"
    );
    fireEvent.click(screen.getByRole("button", { name: "Save profile" }));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(3));
    expect(document.documentElement.classList.contains("dark")).toBe(
      switched === "Dark Mode"
    );
    fireEvent.click(
      screen.getByRole("button", { name: `Toggle Theme: ${switched}` })
    );
    expect(document.documentElement.classList.contains("dark")).toBe(
      original === "Dark Mode"
    );
  }
);
