import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import MentorPage from "./MentorPage";
import { hasMentorReturn } from "./mentor-preview";

import {
  OwnerContext,
  type OwnerState,
} from "@/features/account/owner-context";

afterEach(() => {
  cleanup();
  sessionStorage.clear();
  vi.unstubAllGlobals();
});
function show(status: OwnerState["status"] = "anonymous") {
  const state: OwnerState = {
    session: null,
    status,
    error: "",
    refresh: vi.fn().mockResolvedValue(undefined),
    logout: vi.fn(),
    clear: vi.fn(),
  };
  render(
    <MemoryRouter>
      <OwnerContext.Provider value={state}>
        <MentorPage />
      </OwnerContext.Provider>
    </MemoryRouter>
  );
  return state;
}
describe("mentor entry and session boundary", () => {
  it("gates the workspace and remembers the fixed return destination on sign-in", () => {
    show();
    expect(
      screen.queryByRole("textbox", { name: /message/i })
    ).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("link", { name: "Sign in to build my path" })
    );
    expect(hasMentorReturn()).toBe(true);
  });
  it("offers an explicit retry after an account check fails", () => {
    const state = show("error");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "couldn't check your account"
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Check account again" })
    );
    expect(state.refresh).toHaveBeenCalledOnce();
  });
  it("walks through onboarding and clears private workspace state on expiry", () => {
    show();
    fireEvent.click(
      screen.getByRole("button", { name: "Explore with an example profile" })
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Find my starting point" })
    );
    expect(
      screen.getByRole("heading", { name: "My AI pathway." })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Preview controls"));
    fireEvent.click(
      screen.getByRole("button", { name: "Preview expired session" })
    );
    expect(screen.getByRole("alert")).toHaveTextContent("session expired");
    expect(
      screen.queryByRole("heading", { name: "Pathway mentor" })
    ).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Explore with an example profile" })
    );
    expect(
      screen.getByRole("button", { name: "Find my starting point" })
    ).toBeInTheDocument();
  });
  it("clears a stale account session when the private bootstrap rejects it", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json({}, { status: 401 }))
    );
    const state: OwnerState = {
      session: {
        role: "client",
        issuedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 60_000).toISOString(),
        profile: {
          username: "learner",
          displayName: "Learner",
          timeZone: "UTC",
          theme: "system",
          reportDays: 30,
        },
      },
      status: "authenticated",
      error: "",
      refresh: vi.fn(),
      logout: vi.fn(),
      clear: vi.fn(),
    };
    render(
      <MemoryRouter>
        <OwnerContext.Provider value={state}>
          <MentorPage />
        </OwnerContext.Provider>
      </MemoryRouter>
    );
    expect(
      await screen.findByText(/Your account session ended/)
    ).toBeInTheDocument();
    expect(state.clear).toHaveBeenCalledOnce();
    expect(screen.queryByRole("textbox", { name: /message/i })).toBeNull();
  });
});
