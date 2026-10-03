import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import OwnerPage from "./OwnerPage";
import { OwnerContext, type OwnerState } from "./owner-context";
import type { OwnerSession } from "./owner-api";
const session: OwnerSession = {
  role: "admin",
  issuedAt: new Date().toISOString(),
  expiresAt: new Date(Date.now() + 3600000).toISOString(),
  profile: {
    username: "sergehall",
    email: "serge@example.test",
    emailVerified: true,
    githubLinked: true,
    passwordEnabled: true,
    registrationMethod: "administrator",
    displayName: "Serge",
    timeZone: "UTC",
    theme: "system",
    reportDays: 30,
  },
};
function show(path: string, authenticated = true) {
  const state: OwnerState = {
    session: authenticated ? session : null,
    status: authenticated ? "authenticated" : "anonymous",
    error: "",
    refresh: vi.fn().mockResolvedValue(undefined),
    logout: vi.fn(),
    clear: vi.fn(),
  };
  render(
    <MemoryRouter initialEntries={[path]}>
      <OwnerContext.Provider value={state}>
        <OwnerPage />
      </OwnerContext.Provider>
    </MemoryRouter>
  );
  return state;
}
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
describe("Owner account", () => {
  it("saves the site username separately and keeps email read-only", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ saved: true })));
    vi.stubGlobal("fetch", fetcher);
    const state = show("/account/profile");
    const email = screen.getByLabelText("Email (cannot be changed)");
    expect(email).toHaveAttribute("readonly");
    expect(email).toHaveValue("serge@example.test");
    expect(screen.getByText("Site administrator account")).toBeInTheDocument();
    expect(screen.getByText("Connected")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "new_username" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save profile" }));
    expect(await screen.findByText("Profile saved.")).toBeInTheDocument();
    expect(JSON.parse(fetcher.mock.calls[0][1].body)).toEqual({
      displayName: "Serge",
      username: "new_username",
    });
    expect(state.refresh).toHaveBeenCalledOnce();
  });
  it("explains a taken username and preserves the entered name", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("{}", { status: 409 }))
    );
    show("/account/profile");
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "taken_name" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save profile" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "This username is already in use"
    );
    expect(screen.getByLabelText("Username")).toHaveValue("taken_name");
  });
  it("shows GitHub registration without substituting a provider name for email", () => {
    const githubSession: OwnerSession = {
      ...session,
      profile: {
        ...session.profile,
        email: null,
        passwordEnabled: false,
        registrationMethod: "github",
      },
    };
    render(
      <MemoryRouter initialEntries={["/account/profile"]}>
        <OwnerContext.Provider
          value={{
            session: githubSession,
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
    expect(screen.getByText("GitHub · Social sign-up")).toBeInTheDocument();
    expect(
      screen.queryByLabelText("Email (cannot be changed)")
    ).not.toBeInTheDocument();
    expect(screen.getByText("Sign-in method")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(
      screen.getByText(/Use your GitHub account to sign in/)
    ).toBeInTheDocument();
    expect(screen.getByText("Not enabled")).toBeInTheDocument();
  });
  it("offers configured GitHub sign-in and password backup", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            githubEnabled: true,
            registrationEnabled: true,
            turnstileRequired: false,
            turnstileSiteKey: "",
          })
        )
      )
    );
    show("/owner/login", false);
    expect(
      await screen.findByRole("button", { name: "Continue with GitHub" })
    ).toBeEnabled();
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "autocomplete",
      "current-password"
    );
  });
  it("saves preferences with cookies and without caching", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ saved: true })));
    vi.stubGlobal("fetch", fetcher);
    const state = show("/owner/preferences");
    fireEvent.change(screen.getByLabelText("Account theme"), {
      target: { value: "dark" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save preferences" }));
    expect(await screen.findByText("Preferences saved.")).toBeInTheDocument();
    const options = fetcher.mock.calls[0][1];
    expect(options.credentials).toBe("include");
    expect(options.cache).toBe("no-store");
    expect(JSON.parse(options.body).theme).toBe("dark");
    expect(state.refresh).toHaveBeenCalledOnce();
  });
  it("explains empty reports and excludes booking/email sections", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((url) =>
        Promise.resolve(
          new Response(
            JSON.stringify({
              campaign: "esl10g-presentation-1",
              days: 30,
              total: 0,
              daily: {},
              devices: {},
              systems: {},
              browsers: {},
              generatedAt: new Date().toISOString(),
              ...(String(url).includes("/audit?")
                ? { entries: [], nextCursor: null }
                : {}),
            })
          )
        )
      )
    );
    show("/owner/administration");
    expect(
      await screen.findByText("Your first QR visit will appear here")
    ).toBeInTheDocument();
    expect(screen.queryByText("Booking")).not.toBeInTheDocument();
    expect(screen.queryByText("Email")).not.toBeInTheDocument();
  });
  it("clears owner state when report authorization expires", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("{}", { status: 401 }))
    );
    const state = show("/owner/administration");
    await waitFor(() => expect(state.clear).toHaveBeenCalled());
  });
});

describe("Public accounts", () => {
  it("keeps confirmation help contextual and offers it after rejected sign-in", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((url) =>
        Promise.resolve(
          String(url).endsWith("/login")
            ? new Response("{}", { status: 401 })
            : new Response(
                JSON.stringify({
                  githubEnabled: false,
                  registrationEnabled: true,
                  turnstileRequired: false,
                  turnstileSiteKey: "",
                })
              )
        )
      )
    );
    show("/account/login", false);
    expect(
      screen.queryByRole("link", { name: "Resend confirmation email" })
    ).not.toBeInTheDocument();
    expect(screen.getByText("New here?")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Create an account" })
    ).toHaveAttribute("href", "/account/register");
    expect(
      screen.getByRole("link", { name: "Forgot password?" })
    ).toHaveAttribute("href", "/account/forgot-password");
    expect(
      screen.queryByRole("link", { name: "Back to the portfolio" })
    ).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Username or email"), {
      target: { value: "student" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "student private password" },
    });
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Log in" })).toBeEnabled()
    );
    fireEvent.click(screen.getByRole("button", { name: "Log in" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "confirm your email first"
    );
    expect(
      screen.getByRole("link", { name: "Resend confirmation email" })
    ).toHaveAttribute("href", "/account/resend-verification");
    fireEvent.click(
      screen.getByRole("link", { name: "Resend confirmation email" })
    );
    expect(
      await screen.findByRole("heading", { name: "Resend confirmation" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });
  it("registers only after matching confirmation, without choosing a role", async () => {
    const fetcher = vi.fn().mockImplementation(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            githubEnabled: true,
            registrationEnabled: true,
            turnstileRequired: false,
            turnstileSiteKey: "",
            accepted: true,
          })
        )
      )
    );
    vi.stubGlobal("fetch", fetcher);
    show("/account/register", false);
    await screen.findByRole("button", { name: "Continue with GitHub" });
    expect(
      screen.queryByRole("link", { name: "Resend confirmation email" })
    ).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "student" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "student@example.test" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "student private password" },
    });
    fireEvent.change(screen.getByLabelText("Confirm password"), {
      target: { value: "different private password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create account" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Passwords do not match"
    );
    expect(fetcher).toHaveBeenCalledTimes(1);
    fireEvent.change(screen.getByLabelText("Confirm password"), {
      target: { value: "student private password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create account" }));
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Check your inbox"
    );
    expect(
      screen.getByRole("link", { name: "Resend confirmation email" })
    ).toHaveAttribute("href", "/account/resend-verification");
    const [, options] = fetcher.mock.calls.find(([url]) =>
      String(url).endsWith("/register")
    )!;
    expect(JSON.parse(options.body)).toEqual({
      username: "student",
      email: "student@example.test",
      password: "student private password",
    });
  });
  it.each(["client", "admin"] as const)(
    "shows the same personal overview without report requests for %s",
    (role) => {
      const fetcher = vi.fn();
      vi.stubGlobal("fetch", fetcher);
      render(
        <MemoryRouter initialEntries={["/account/overview"]}>
          <OwnerContext.Provider
            value={{
              session: { ...session, role },
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
      expect(
        screen.getByRole("heading", { name: "Hello, Serge" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Your profile" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Sign-in & protection" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Current session" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Your preferences" })
      ).toBeInTheDocument();
      expect(screen.getByText("serge@example.test")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Manage active sessions" })
      ).toHaveAttribute("href", "/account/security#sessions");
      if (role === "client") {
        expect(
          screen.queryByRole("link", { name: "Administration" })
        ).not.toBeInTheDocument();
      } else {
        expect(
          screen.getByRole("link", { name: "Administration" })
        ).toBeInTheDocument();
      }
      expect(screen.queryByText("QR-link visits")).not.toBeInTheDocument();
      expect(screen.queryByText("Security activity")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("Report period")).not.toBeInTheDocument();
      expect(fetcher).not.toHaveBeenCalled();
    }
  );
  it("waits for an explicit email confirmation click instead of consuming links on load", async () => {
    const fetcher = vi.fn().mockImplementation(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            githubEnabled: true,
            registrationEnabled: true,
            turnstileRequired: false,
            turnstileSiteKey: "",
          })
        )
      )
    );
    vi.stubGlobal("fetch", fetcher);
    show(`/account/verify-email#token=${"t".repeat(43)}`, false);
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
    expect(screen.getByRole("button", { name: "Confirm email" })).toBeEnabled();
    expect(
      screen.getByRole("link", { name: "Resend confirmation email" })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Confirm email" }));
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Email confirmed"
    );
    expect(
      screen.queryByRole("link", { name: "Resend confirmation email" })
    ).not.toBeInTheDocument();
    expect(fetcher.mock.calls[1][1].method).toBe("POST");
  });
});
