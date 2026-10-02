import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { afterEach, expect, it, vi } from "vitest";

import AccountProvidersPanel from "./AccountProvidersPanel";
import { OwnerContext, type OwnerState } from "./owner-context";
import type { OwnerSession } from "./owner-api";
import { securityReturn } from "./auth-return";
const session: OwnerSession = {
  role: "admin",
  issuedAt: new Date().toISOString(),
  expiresAt: new Date(Date.now() + 3600000).toISOString(),
  authMethod: "password",
  profile: {
    username: "preview",
    displayName: "Preview",
    email: null,
    emailVerified: false,
    passwordEnabled: true,
    githubLinked: true,
    githubUsername: "preview-github",
    registrationMethod: "administrator",
    timeZone: "UTC",
    theme: "system",
    reportDays: 30,
  },
};
const available = {
  githubAvailable: true,
  emailAvailable: true,
  pendingEmail: null,
  pendingEmailExpiresAt: null,
};
const response = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status });
function show(value = session) {
  const owner: OwnerState = {
    session: value,
    status: "authenticated",
    error: "",
    refresh: vi.fn(),
    logout: vi.fn(),
    clear: vi.fn(),
  };
  render(
    <MemoryRouter initialEntries={["/account/security#providers"]}>
      <OwnerContext.Provider value={owner}>
        <Routes>
          <Route
            path="/account/security"
            element={<AccountProvidersPanel session={value} mfa={null} />}
          />
          <Route path="/account/login" element={<p>Login page</p>} />
        </Routes>
      </OwnerContext.Provider>
    </MemoryRouter>
  );
  return owner;
}
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
it("requests confirmation without assigning an unverified email and can cancel it", async () => {
  const fetcher = vi
    .fn()
    .mockResolvedValueOnce(response(available))
    .mockResolvedValueOnce(response({ accepted: true }, 202))
    .mockResolvedValueOnce(
      response({
        ...available,
        pendingEmail: "preview@example.test",
        pendingEmailExpiresAt: "2099-01-01T00:00:00Z",
      })
    )
    .mockResolvedValueOnce(response({ cancelled: true }))
    .mockResolvedValueOnce(response(available));
  vi.stubGlobal("fetch", fetcher);
  show();
  await waitFor(() =>
    expect(screen.getByLabelText("Email address")).toBeEnabled()
  );
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "preview@example.test" },
  });
  fireEvent.click(
    screen.getByRole("button", { name: "Send confirmation email" })
  );
  await screen.findByText("Confirmation pending");
  expect(fetcher.mock.calls[1][0]).toContain("providers/email");
  expect(JSON.parse(fetcher.mock.calls[1][1].body)).toEqual({
    email: "preview@example.test",
  });
  expect(screen.queryByText("Verified")).not.toBeInTheDocument();
  fireEvent.click(
    screen.getByRole("button", { name: "Cancel email addition" })
  );
  await screen.findByLabelText("Email address");
  expect(fetcher.mock.calls[3][0]).toContain("providers/email/cancel");
});
it("requires confirmation to disconnect and returns to password sign-in", async () => {
  const fetcher = vi
    .fn()
    .mockResolvedValueOnce(response(available))
    .mockResolvedValueOnce(response({ authenticated: false }));
  vi.stubGlobal("fetch", fetcher);
  const owner = show();
  const button = screen.getByRole("button", { name: "Disconnect GitHub" });
  expect(button).toBeDisabled();
  fireEvent.click(
    screen.getByRole("checkbox", { name: "I want to disconnect GitHub" })
  );
  fireEvent.click(button);
  await screen.findByText("Login page");
  expect(owner.clear).toHaveBeenCalledOnce();
  expect(fetcher.mock.calls[1][0]).toContain("providers/github/disconnect");
});
it("keeps the last sign-in method and explains missing configuration", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(
      response({
        ...available,
        emailAvailable: false,
        githubAvailable: false,
      })
    )
  );
  show({
    ...session,
    role: "client",
    profile: {
      ...session.profile,
      passwordEnabled: false,
      registrationMethod: "github",
    },
  });
  expect(
    screen.queryByRole("button", { name: "Disconnect GitHub" })
  ).not.toBeInTheDocument();
  await screen.findByText(
    "Email confirmation is currently unavailable. Try again later."
  );
  expect(screen.getByLabelText("Email address")).toBeDisabled();
});
it("offers recent sign-in and MFA proof after a security gate rejects an action", async () => {
  vi.stubGlobal(
    "fetch",
    vi
      .fn()
      .mockResolvedValueOnce(response(available))
      .mockResolvedValueOnce(response({ code: "RECENT_SIGN_IN_REQUIRED" }, 403))
      .mockResolvedValueOnce(response({ code: "MFA_STEP_UP_REQUIRED" }, 403))
  );
  show({ ...session, profile: { ...session.profile, githubLinked: false } });
  const button = await screen.findByRole("button", { name: "Connect GitHub" });
  await waitFor(() => expect(button).toBeEnabled());
  fireEvent.click(button);
  await screen.findByRole("link", { name: "Sign in again to continue" });
  fireEvent.click(button);
  await screen.findByRole("link", { name: "Verify your current session" });
});
it("retries failed loading and disables unavailable GitHub connections", async () => {
  vi.stubGlobal(
    "fetch",
    vi
      .fn()
      .mockResolvedValueOnce(response({}, 503))
      .mockResolvedValueOnce(response({ ...available, githubAvailable: false }))
  );
  show({ ...session, profile: { ...session.profile, githubLinked: false } });
  fireEvent.click(
    await screen.findByRole("button", { name: "Retry sign-in settings" })
  );
  await screen.findByText(
    "GitHub connection is currently unavailable. Try again later."
  );
  expect(screen.getByRole("button", { name: "Connect GitHub" })).toBeDisabled();
});
it("restricts post-authentication navigation to known security settings", () => {
  expect(securityReturn("/account/security#providers")).toBe(
    "/account/security#providers"
  );
  for (const target of [
    "https://evil.test",
    "//evil.test",
    "/account/security#providers?redirect=https://evil.test",
    {},
    null,
  ])
    expect(securityReturn(target)).toBeNull();
});
