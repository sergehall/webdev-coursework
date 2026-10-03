import { useState, type ReactNode } from "react";
import {
  cleanup,
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import MfaSettingsPanel from "./MfaSettingsPanel";
import MfaChallengePage from "./MfaChallengePage";
import OwnerPage from "./OwnerPage";
import { OwnerContext, type OwnerState } from "./owner-context";
import type { MfaStatus } from "./mfa-api";

vi.mock("qrcode", () => ({
  default: {
    toDataURL: vi.fn().mockResolvedValue("data:image/png;base64,dGVzdA=="),
  },
}));
const disabled: MfaStatus = {
  configured: true,
  enabled: false,
  pendingEnrollment: false,
  enrolledAt: null,
  recoveryCodesRemaining: 0,
  currentSessionVerifiedAt: null,
};
const enabled: MfaStatus = {
  ...disabled,
  enabled: true,
  enrolledAt: new Date().toISOString(),
  recoveryCodesRemaining: 10,
};
const response = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status });
function context(authenticated = true): OwnerState {
  return {
    session: authenticated
      ? {
          role: "client",
          issuedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 3600000).toISOString(),
          profile: {
            username: "student",
            email: "student@example.test",
            displayName: "Student",
            passwordEnabled: true,
            githubLinked: true,
            theme: "system",
            timeZone: "UTC",
            reportDays: 30,
          },
        }
      : null,
    status: authenticated ? "authenticated" : "anonymous",
    error: "",
    refresh: vi.fn().mockResolvedValue(undefined),
    logout: vi.fn(),
    clear: vi.fn(),
  };
}
function Settings({ initial = disabled }: { initial?: MfaStatus }) {
  const [status, setStatus] = useState(initial);
  return <MfaSettingsPanel status={status} onChange={setStatus} />;
}
function show(
  element: ReactNode,
  path = "/account/security#mfa",
  state = context()
) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <OwnerContext.Provider value={state}>{element}</OwnerContext.Provider>
    </MemoryRouter>
  );
  return state;
}
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});
describe("Two-factor account flows", () => {
  it("adapts the security windows to actual providers and MFA data", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((url: string) =>
        Promise.resolve(
          response(
            url.endsWith("/providers")
              ? {
                  githubAvailable: true,
                  emailAvailable: true,
                  pendingEmail: null,
                  pendingEmailExpiresAt: null,
                }
              : disabled
          )
        )
      )
    );
    show(<OwnerPage />);
    expect(
      await screen.findByRole("button", { name: "Start 2FA setup" })
    ).toBeEnabled();
    expect(screen.getByRole("link", { name: /^Two-factor/ })).toHaveAttribute(
      "aria-current",
      "page"
    );
    fireEvent.click(
      screen.getByRole("link", {
        name: /^Overview.*Status and sign-in methods$/,
      })
    );
    expect(
      screen.getByRole("heading", { name: "Sign-in and recovery" })
    ).toBeInTheDocument();
    expect(screen.getByText("Connected")).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Two-factor authentication" })
    ).not.toBeInTheDocument();
  });
  it("confirms enrollment and shows recovery codes only once", async () => {
    const setup = {
      enrollmentId: "test-enrollment",
      expiresAt: new Date(Date.now() + 600000).toISOString(),
      issuer: "Web Engineering Portfolio",
      accountName: "student",
      secret: "TEST-SECRET",
      otpauthUri: "otpauth://totp/test?secret=TEST",
    };
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(
        response({ mfa: { ...disabled, pendingEnrollment: true }, setup })
      )
      .mockResolvedValueOnce(
        response({ mfa: enabled, recoveryCodes: ["AAAAA-BBBBB-CCCCC-DDDDD"] })
      );
    vi.stubGlobal("fetch", fetcher);
    const state = show(<Settings />);
    fireEvent.click(screen.getByRole("button", { name: "Start 2FA setup" }));
    expect(
      await screen.findByAltText("Authenticator setup QR code")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("TEST-SECRET")).toHaveAttribute("readonly");
    fireEvent.change(screen.getByLabelText("Authenticator code"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Verify setup" }));
    expect(
      await screen.findByText("AAAAA-BBBBB-CCCCC-DDDDD")
    ).toBeInTheDocument();
    expect(JSON.parse(fetcher.mock.calls[1][1].body)).toEqual({
      enrollmentId: "test-enrollment",
      code: "123456",
    });
    expect(
      screen.queryByAltText("Authenticator setup QR code")
    ).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue("TEST-SECRET")).not.toBeInTheDocument();
    expect(state.refresh).toHaveBeenCalledOnce();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    fireEvent.click(screen.getByRole("button", { name: "Copy codes" }));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith("AAAAA-BBBBB-CCCCC-DDDDD")
    );
    const createObjectURL = vi.fn().mockReturnValue("blob:test-recovery");
    vi.stubGlobal(
      "URL",
      class extends URL {
        static createObjectURL = createObjectURL;
        static revokeObjectURL = vi.fn();
      }
    );
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});
    fireEvent.click(screen.getByRole("button", { name: "Download codes" }));
    expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(click.mock.instances[0]).toHaveAttribute(
      "download",
      "webdev-recovery-codes.txt"
    );
    click.mockRestore();
    expect(screen.getByRole("button", { name: "Hide codes" })).toBeDisabled();
    fireEvent.click(screen.getByLabelText("I saved my recovery codes"));
    fireEvent.click(screen.getByRole("button", { name: "Hide codes" }));
    expect(
      screen.queryByText("AAAAA-BBBBB-CCCCC-DDDDD")
    ).not.toBeInTheDocument();
  });
  it("clears expired enrollment secrets and allows a fresh setup", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce(
          response({
            mfa: { ...disabled, pendingEnrollment: true },
            setup: {
              enrollmentId: "test-enrollment",
              expiresAt: new Date(Date.now() + 1000).toISOString(),
              issuer: "Portfolio",
              accountName: "student",
              secret: "TEMPORARY-SECRET",
              otpauthUri: "otpauth://totp/test?secret=TEST",
            },
          })
        )
        .mockResolvedValueOnce(response(disabled))
    );
    show(<Settings />);
    await act(async () =>
      fireEvent.click(screen.getByRole("button", { name: "Start 2FA setup" }))
    );
    expect(screen.getByDisplayValue("TEMPORARY-SECRET")).toBeInTheDocument();
    await act(async () => vi.advanceTimersByTimeAsync(1001));
    expect(
      screen.queryByDisplayValue("TEMPORARY-SECRET")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByAltText("Authenticator setup QR code")
    ).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("setup expired");
    expect(
      screen.getByRole("button", { name: "Start 2FA setup" })
    ).toBeEnabled();
  });
  it("retries a network failure without treating the challenge as expired", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockRejectedValueOnce(new Error("offline"))
        .mockResolvedValueOnce(
          response({ expiresAt: new Date(Date.now() + 300000).toISOString() })
        )
    );
    show(<MfaChallengePage />, "/account/mfa", context(false));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Check your connection"
    );
    expect(
      screen.queryByText(/Verification expired\./)
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Retry verification" }));
    expect(
      await screen.findByText(/Verification expires in/)
    ).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
  it("requires a fresh proof and explicit confirmation before disabling", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(response({ authenticated: false }));
    vi.stubGlobal("fetch", fetcher);
    const state = context();
    show(
      <Routes>
        <Route
          path="/account/security"
          element={<Settings initial={enabled} />}
        />
        <Route path="/account/sign-in" element={<p>Sign in again</p>} />
      </Routes>,
      undefined,
      state
    );
    const button = screen.getByRole("button", { name: "Disable MFA" });
    expect(button).toBeDisabled();
    fireEvent.change(screen.getByLabelText("Authenticator or recovery code"), {
      target: { value: "123456" },
    });
    expect(button).toBeDisabled();
    fireEvent.click(
      screen.getByLabelText("I want to disable two-factor authentication")
    );
    fireEvent.click(button);
    expect(await screen.findByText("Sign in again")).toBeInTheDocument();
    expect(state.clear).toHaveBeenCalledOnce();
    expect(JSON.parse(fetcher.mock.calls[0][1].body)).toEqual({
      code: "123456",
    });
  });
  it("keeps password login pending until the MFA challenge succeeds", async () => {
    const fetcher = vi.fn().mockImplementation((url: string) =>
      Promise.resolve(
        response(
          url.endsWith("login-options")
            ? {
                githubEnabled: true,
                registrationEnabled: true,
                turnstileRequired: false,
                turnstileSiteKey: "",
              }
            : url.endsWith("/login")
              ? { authenticated: false, mfaRequired: true }
              : { expiresAt: new Date(Date.now() + 300000).toISOString() }
        )
      )
    );
    vi.stubGlobal("fetch", fetcher);
    const state = show(<OwnerPage />, "/account/sign-in", context(false));
    await screen.findByRole("button", { name: "Continue with GitHub" });
    fireEvent.change(screen.getByLabelText("Username or email"), {
      target: { value: "student" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "private test password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(
      await screen.findByRole("heading", { name: "Two-factor verification" })
    ).toBeInTheDocument();
    expect(state.clear).toHaveBeenCalledOnce();
    expect(state.refresh).not.toHaveBeenCalled();
  });
  it("supports recovery login and does not refresh on a rejected code", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(
        response({ expiresAt: new Date(Date.now() + 300000).toISOString() })
      )
      .mockResolvedValueOnce(response({ code: "MFA_INVALID_CODE" }, 400))
      .mockResolvedValueOnce(response({ authenticated: true }));
    vi.stubGlobal("fetch", fetcher);
    const state = context(false);
    show(
      <Routes>
        <Route path="/account/mfa" element={<MfaChallengePage />} />
        <Route path="/account/security" element={<p>Signed in</p>} />
      </Routes>,
      "/account/mfa",
      state
    );
    await screen.findByText(/Verification expires in/);
    fireEvent.click(screen.getByRole("button", { name: "Recovery code" }));
    fireEvent.change(screen.getByLabelText("Recovery code"), {
      target: { value: "aaaaa-bbbbb-ccccc-ddddd" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Finish sign-in" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Invalid or already used code"
    );
    expect(state.refresh).not.toHaveBeenCalled();
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Finish sign-in" })
      ).toBeEnabled()
    );
    fireEvent.click(screen.getByRole("button", { name: "Finish sign-in" }));
    expect(await screen.findByText("Signed in")).toBeInTheDocument();
    expect(state.refresh).toHaveBeenCalledOnce();
    expect(JSON.parse(fetcher.mock.calls[2][1].body)).toEqual({
      code: "AAAAA-BBBBB-CCCCC-DDDDD",
    });
  });
  it("ends an expired challenge without allowing verification", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(response({ expiresAt: new Date(0).toISOString() }))
    );
    show(<MfaChallengePage />, "/account/mfa", context(false));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Verification expired"
    );
    expect(
      screen.queryByRole("button", { name: "Finish sign-in" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Start again" })
    ).toBeInTheDocument();
  });
});
