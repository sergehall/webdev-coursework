// Account-form tests cover token submission, expiry and fail-closed configuration loading.
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { TurnstileOptions } from "./auth/turnstile-client";
import AccountAuthPage from "./AccountAuthPage";
import { OwnerContext, type OwnerState } from "./owner-context";

let widgetOptions: TurnstileOptions;
const renderWidget = vi.fn(
  (_container: HTMLElement, options: TurnstileOptions) => {
    widgetOptions = options;
    return "widget-id";
  }
);
const removeWidget = vi.fn();
beforeEach(() => {
  renderWidget.mockClear();
  removeWidget.mockClear();
  window.turnstile = { render: renderWidget, remove: removeWidget };
});
afterEach(() => {
  cleanup();
  delete window.turnstile;
  vi.unstubAllGlobals();
});
function auth(mode: "login" | "register" | "reauthenticate" = "login") {
  const owner: OwnerState = {
    session: null,
    status: "anonymous",
    error: "",
    clear: vi.fn(),
    refresh: vi.fn().mockResolvedValue(undefined),
    logout: vi.fn(),
  };
  render(
    <MemoryRouter>
      <OwnerContext.Provider value={owner}>
        <AccountAuthPage mode={mode} />
      </OwnerContext.Provider>
    </MemoryRouter>
  );
  return owner;
}
describe("Turnstile account integration", () => {
  it.each(["login", "reauthenticate", "register"] as const)(
    "requires and submits an action-bound token for %s; refreshes it after failure",
    async (mode) => {
      const fetcher = vi.fn((url: string) =>
        Promise.resolve(
          new Response(
            JSON.stringify(
              url.endsWith("/login-options")
                ? {
                    turnstileRequired: true,
                    turnstileSiteKey: "public-key",
                    githubEnabled: false,
                    registrationEnabled: true,
                  }
                : { code: "TURNSTILE_REJECTED" }
            ),
            { status: url.endsWith("/login-options") ? 200 : 403 }
          )
        )
      );
      vi.stubGlobal("fetch", fetcher);
      auth(mode);
      const button = screen.getByRole("button", {
        name: mode === "register" ? "Create account" : "Log in",
      });
      expect(button).toBeDisabled();
      await waitFor(() => expect(renderWidget).toHaveBeenCalledOnce());
      expect(widgetOptions.action).toBe(
        mode === "register" ? "account_register" : "account_login"
      );
      expect(button).toBeDisabled();
      fireEvent.change(
        screen.getByLabelText(
          mode === "register" ? "Username" : "Username or email"
        ),
        { target: { value: "test_member" } }
      );
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "a long test-only password" },
      });
      if (mode === "register") {
        fireEvent.change(screen.getByLabelText("Email"), {
          target: { value: "test@example.test" },
        });
        fireEvent.change(screen.getByLabelText("Confirm password"), {
          target: { value: "a long test-only password" },
        });
      }
      act(() => widgetOptions.callback("one-use-token"));
      expect(button).toBeEnabled();
      act(() => widgetOptions["expired-callback"]());
      expect(button).toBeDisabled();
      act(() => widgetOptions.callback("fresh-token"));
      fireEvent.click(button);
      await screen.findByText("Complete human verification and try again.");
      const post = fetcher.mock.calls.find(
        ([url]) => !url.endsWith("/login-options")
      );
      expect(post).toBeDefined();
      const requestCall = (
        fetcher.mock.calls as unknown as [string, RequestInit][]
      ).find(([url]) => !url.endsWith("/login-options"))!;
      expect(JSON.parse(requestCall[1].body as string).turnstileToken).toBe(
        "fresh-token"
      );
      await waitFor(() => expect(renderWidget).toHaveBeenCalledTimes(2));
      expect(button).toBeDisabled();
    }
  );
  it.each(["login", "reauthenticate", "register"] as const)(
    "locks GitHub and password actions for %s until verification and sends proof before OAuth",
    async (mode) => {
      const fetcher = vi.fn((url: string) =>
        Promise.resolve(
          new Response(
            JSON.stringify(
              url.endsWith("/login-options")
                ? {
                    githubEnabled: true,
                    turnstileRequired: true,
                    turnstileSiteKey: "public-key",
                    registrationEnabled: true,
                  }
                : { code: "TURNSTILE_REJECTED" }
            ),
            { status: url.endsWith("/login-options") ? 200 : 403 }
          )
        )
      );
      vi.stubGlobal("fetch", fetcher);
      auth(mode);
      const github = await screen.findByRole("button", {
        name: "Continue with GitHub",
      });
      const password = screen.getByRole("button", {
        name: mode === "register" ? "Create account" : "Log in",
      });
      expect(github).toBeDisabled();
      expect(password).toBeDisabled();
      expect(
        screen.queryByRole("link", { name: "Continue with GitHub" })
      ).not.toBeInTheDocument();
      fireEvent.click(github);
      expect(fetcher).toHaveBeenCalledOnce();
      await waitFor(() => expect(renderWidget).toHaveBeenCalledOnce());
      act(() => widgetOptions.callback("verified-token"));
      expect(github).toBeEnabled();
      expect(password).toBeEnabled();
      act(() => widgetOptions["expired-callback"]());
      expect(github).toBeDisabled();
      act(() => widgetOptions.callback("fresh-token"));
      // GitHub initiation does not require filling unrelated password fields.
      fireEvent.click(github);
      expect(github).toBeDisabled();
      await screen.findByText("Complete human verification and try again.");
      const post = (
        fetcher.mock.calls as unknown as [string, RequestInit][]
      ).find(([url]) => url.endsWith("/github/start"))!;
      expect(post[1].method).toBe("POST");
      expect(JSON.parse(post[1].body as string)).toEqual({
        intent: mode === "register" ? "register" : "login",
        turnstileToken: "fresh-token",
      });
      expect(post[0]).not.toContain("fresh-token");
      await waitFor(() => expect(renderWidget).toHaveBeenCalledTimes(2));
      expect(github).toBeDisabled();
      expect(password).toBeDisabled();
    }
  );
  it("supports unconfigured GitHub sign-in and refuses an unexpected redirect URL", async () => {
    const fetcher = vi.fn((url: string) =>
      Promise.resolve(
        new Response(
          JSON.stringify(
            url.endsWith("/login-options")
              ? {
                  githubEnabled: true,
                  registrationEnabled: true,
                  turnstileRequired: false,
                  turnstileSiteKey: "",
                }
              : { url: "https://attacker.example/login" }
          )
        )
      )
    );
    vi.stubGlobal("fetch", fetcher);
    auth();
    const button = await screen.findByRole("button", {
      name: "Continue with GitHub",
    });
    expect(button).toBeEnabled();
    fireEvent.click(button);
    await screen.findByText("Unable to start GitHub sign-in.");
    const post = (
      fetcher.mock.calls as unknown as [string, RequestInit][]
    ).find(([url]) => url.endsWith("/github/start"))!;
    expect(JSON.parse(post[1].body as string)).toEqual({ intent: "login" });
    expect(renderWidget).not.toHaveBeenCalled();
  });
  it("keeps protected submissions blocked when options fail and offers a configuration retry", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockRejectedValueOnce(new Error("offline"))
        .mockResolvedValue(
          new Response(
            JSON.stringify({
              githubEnabled: false,
              registrationEnabled: true,
              turnstileRequired: false,
              turnstileSiteKey: "",
            })
          )
        )
    );
    auth();
    await screen.findByText("Sign-in options could not load.");
    expect(screen.getByRole("button", { name: "Log in" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Log in" })).toBeEnabled()
    );
  });
});
