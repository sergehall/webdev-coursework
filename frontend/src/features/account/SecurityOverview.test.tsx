import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, expect, it, vi } from "vitest";

import OwnerPage from "./OwnerPage";
import { OwnerContext } from "./owner-context";
import type { OwnerSession } from "./owner-api";
import type { MfaStatus } from "./mfa-api";

const session: OwnerSession = {
  role: "client",
  authMethod: "github",
  issuedAt: "2026-10-02T08:00:00.000Z",
  expiresAt: "2026-10-02T10:00:00.000Z",
  profile: {
    displayName: "Student",
    username: "student",
    email: "student@example.test",
    emailVerified: true,
    passwordEnabled: true,
    githubLinked: true,
    theme: "system",
    timeZone: "UTC",
    reportDays: 30,
  },
};
const disabled: MfaStatus = {
  configured: true,
  enabled: false,
  pendingEnrollment: false,
  enrolledAt: null,
  recoveryCodesRemaining: 0,
  currentSessionVerifiedAt: null,
};
function show(
  path = "/account/security",
  mfa: MfaStatus | "error" | "loading" = disabled
) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockImplementation((url: string) => {
      if (url.endsWith("/mfa/status")) {
        if (mfa === "loading") return new Promise(() => {});
        return Promise.resolve(
          new Response(JSON.stringify(mfa === "error" ? {} : mfa), {
            status: mfa === "error" ? 503 : 200,
          })
        );
      }
      return Promise.resolve(
        new Response(
          JSON.stringify({
            githubAvailable: true,
            emailAvailable: true,
            pendingEmail: null,
            pendingEmailExpiresAt: null,
          })
        )
      );
    })
  );
  render(
    <MemoryRouter initialEntries={[path]}>
      <OwnerContext.Provider
        value={{
          session,
          status: "authenticated",
          error: "",
          refresh: vi.fn(),
          logout: vi.fn(),
          clear: vi.fn(),
        }}
      >
        <OwnerPage />
      </OwnerContext.Provider>
    </MemoryRouter>
  );
}
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it.each([
  "/account/security",
  "/account/security#overview",
  "/account/security#providers",
])(
  "opens Security Overview for %s and preserves provider access",
  async (path) => {
    show(path);
    const windows = screen.getByRole("navigation", {
      name: "Security windows",
    });
    expect(
      within(windows).getByRole("link", { name: /^Overview/ })
    ).toHaveAttribute("aria-current", "page");
    expect(
      within(windows).queryByRole("link", { name: /^Providers/ })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Security summary" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Sign-in and recovery" })
    ).toBeInTheDocument();
    const providers = screen.getByRole("region", {
      name: "Sign-in and recovery",
    });
    expect(
      within(providers)
        .getAllByRole("heading", { level: 3 })
        .map((el) => el.textContent)
    ).toEqual(["GitHub", "Recovery email"]);
    expect(
      await screen.findByText("Two-factor protection is off.")
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Current password")).not.toBeInTheDocument();

    fireEvent.click(within(windows).getByRole("link", { name: /^Password/ }));
    expect(screen.getByLabelText("Current password")).toBeInTheDocument();
    expect(screen.getByText("student")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Manage site username" })
    ).toHaveAttribute("href", "/account/profile");
    expect(
      screen.queryByRole("region", { name: "Security summary" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Sign-in and recovery" })
    ).not.toBeInTheDocument();

    fireEvent.click(within(windows).getByRole("link", { name: /^Overview/ }));
    expect(
      screen.getByRole("region", { name: "Security summary" })
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Current password")).not.toBeInTheDocument();
  }
);

it("does not report loading MFA data as disabled or as a clean security state", () => {
  show("/account/security", "loading");
  expect(screen.getByText("Checking two-factor status…")).toBeInTheDocument();
  expect(
    screen.queryByText("Two-factor protection is off.")
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText(
      "No setup reminders from the currently loaded account data."
    )
  ).not.toBeInTheDocument();
});

it("keeps providers accessible when the security status cannot be loaded", async () => {
  show("/account/security", "error");
  expect(
    await screen.findByText("Two-factor status is unavailable.")
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Sign-in and recovery" })
  ).toBeInTheDocument();
  expect(
    screen.queryByText("Checking two-factor status…")
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText("Two-factor protection is off.")
  ).not.toBeInTheDocument();
});

it("links an enabled account with no remaining recovery codes to the MFA settings", async () => {
  show("/account/security", { ...disabled, enabled: true });
  expect(
    await screen.findByText("No unused recovery codes remain.")
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Manage recovery codes" })
  ).toHaveAttribute("href", "/account/security#mfa");
  expect(
    screen.queryByText("Two-factor protection is off.")
  ).not.toBeInTheDocument();
});
