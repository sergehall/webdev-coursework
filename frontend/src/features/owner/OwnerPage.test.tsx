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
  it("offers configured GitHub sign-in and password backup", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response(JSON.stringify({ githubEnabled: true }))
        )
    );
    show("/owner/login", false);
    expect(
      await screen.findByRole("link", { name: "Continue with GitHub" })
    ).toHaveAttribute(
      "href",
      expect.stringContaining("/api/account/github/start")
    );
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
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            days: 30,
            total: 0,
            daily: {},
            devices: {},
            systems: {},
            browsers: {},
            generatedAt: new Date().toISOString(),
          })
        )
      )
    );
    show("/owner/overview");
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
  it("registers only after matching confirmation, without choosing a role", async () => {
    const fetcher = vi
      .fn()
      .mockImplementation(() =>
        Promise.resolve(
          new Response(JSON.stringify({ githubEnabled: true, accepted: true }))
        )
      );
    vi.stubGlobal("fetch", fetcher);
    show("/account/register", false);
    await screen.findByRole("link", { name: "Continue with GitHub" });
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
    const [, options] = fetcher.mock.calls.find(([url]) =>
      String(url).endsWith("/register")
    )!;
    expect(JSON.parse(options.body)).toEqual({
      username: "student",
      email: "student@example.test",
      password: "student private password",
    });
  });
  it("keeps analytics and administration out of a client's workspace", async () => {
    const fetcher = vi.fn();
    vi.stubGlobal("fetch", fetcher);
    render(
      <MemoryRouter initialEntries={["/account/overview"]}>
        <OwnerContext.Provider
          value={{
            session: { ...session, role: "client" },
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
      screen.queryByRole("link", { name: "Administration" })
    ).not.toBeInTheDocument();
    expect(screen.queryByText("QR-link visits")).not.toBeInTheDocument();
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("waits for an explicit email confirmation click instead of consuming links on load", async () => {
    const fetcher = vi
      .fn()
      .mockImplementation(() =>
        Promise.resolve(new Response(JSON.stringify({ githubEnabled: true })))
      );
    vi.stubGlobal("fetch", fetcher);
    show(`/account/verify-email#token=${"t".repeat(43)}`, false);
    await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
    expect(screen.getByRole("button", { name: "Confirm email" })).toBeEnabled();
    fireEvent.click(screen.getByRole("button", { name: "Confirm email" }));
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Email confirmed"
    );
    expect(fetcher.mock.calls[1][1].method).toBe("POST");
  });
});
