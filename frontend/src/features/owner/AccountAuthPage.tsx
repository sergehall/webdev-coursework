import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

import { ownerRequest, OwnerApiError } from "./owner-api";
import {
  parseAuthResponse,
  parseGithubRedirect,
  parseLoginOptions,
} from "./owner-contracts";
import { useOwner } from "./owner-context";
import { securityReturn } from "./auth-return";
import TurnstileWidget from "./auth/TurnstileWidget";

type Mode =
  | "login"
  | "reauthenticate"
  | "register"
  | "verify-email"
  | "forgot-password"
  | "reset-password"
  | "resend-verification";
export const authPages = [
  "login",
  "reauthenticate",
  "register",
  "verify-email",
  "forgot-password",
  "reset-password",
  "resend-verification",
];
const titles: Record<Mode, string> = {
  login: "Welcome back",
  reauthenticate: "Confirm your sign-in",
  register: "Create your account",
  "verify-email": "Confirm your email",
  "forgot-password": "Forgot your password?",
  "reset-password": "Choose a new password",
  "resend-verification": "Resend confirmation",
};
export default function AccountAuthPage({ mode }: { mode: Mode }) {
  const owner = useOwner()!,
    location = useLocation(),
    navigate = useNavigate();
  const isLogin = mode === "login" || mode === "reauthenticate";
  const [options, setOptions] = useState<{
    githubEnabled: boolean;
    registrationEnabled: boolean;
    turnstileRequired?: boolean;
    turnstileSiteKey?: string;
  } | null>(null);
  const [identity, setIdentity] = useState(""),
    [email, setEmail] = useState(""),
    [username, setUsername] = useState("");
  const [password, setPassword] = useState(""),
    [confirmation, setConfirmation] = useState("");
  const [show, setShow] = useState(false),
    [busy, setBusy] = useState(false),
    [done, setDone] = useState(false),
    [error, setError] = useState("");
  const [showVerificationHelp, setShowVerificationHelp] = useState(false);
  // Keep verification tokens in memory only; never persist them with account preferences.
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileAttempt, setTurnstileAttempt] = useState(0);
  const [optionsError, setOptionsError] = useState(false);
  const [optionsAttempt, setOptionsAttempt] = useState(0);
  const protectedForm = isLogin || mode === "register";
  const requiresTurnstile = protectedForm && !!options?.turnstileRequired;
  const verificationPending =
    protectedForm && (!options || (requiresTurnstile && !turnstileToken));
  function refreshVerification() {
    if (requiresTurnstile) {
      setTurnstileToken("");
      setTurnstileAttempt((value) => value + 1);
    }
  }
  async function startGithub() {
    if (busy || verificationPending) return;
    setError("");
    setShowVerificationHelp(false);
    setBusy(true);
    try {
      // Redeem proof server-side before navigating; a disabled button alone cannot protect OAuth.
      const result = await ownerRequest<{ url: string }>("github/start", {
        method: "POST",
        parseResponse: parseGithubRedirect,
        body: {
          intent: mode === "register" ? "register" : "login",
          ...(requiresTurnstile ? { turnstileToken } : {}),
        },
      });
      const url = new URL(result.url);
      if (
        url.origin !== "https://github.com" ||
        url.pathname !== "/login/oauth/authorize"
      )
        throw new Error("Unable to start GitHub sign-in.");
      window.location.assign(url.href);
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "Unable to start GitHub sign-in."
      );
    } finally {
      refreshVerification();
      setBusy(false);
    }
  }
  const [token] = useState(
    () => new URLSearchParams(location.hash.slice(1)).get("token") ?? ""
  );
  useEffect(() => {
    if (token && window.location.hash)
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname + window.location.search
      );
  }, [token]);
  const navigationState = location.state as {
    notice?: string;
    returnTo?: unknown;
  } | null;
  const githubLinked =
    new URLSearchParams(location.search).get("notice") === "github-linked";
  const returnTo =
    securityReturn(navigationState?.returnTo) ??
    (githubLinked ? "/account/security#providers" : null);
  const notice =
    navigationState?.notice ??
    (new URLSearchParams(location.search).get("notice") === "github-linked"
      ? "GitHub connected. All previous sessions ended. Sign in again to continue."
      : undefined);
  useEffect(() => {
    let disposed = false;
    void ownerRequest("login-options", { parseResponse: parseLoginOptions })
      .then((value) => {
        if (!disposed) {
          setOptions(value);
          setOptionsError(false);
        }
      })
      .catch(() => {
        if (!disposed) setOptionsError(true);
      });
    return () => {
      disposed = true;
    };
  }, [optionsAttempt]);
  const hasPassword = [
    "login",
    "reauthenticate",
    "register",
    "reset-password",
  ].includes(mode);
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    setShowVerificationHelp(false);
    if (!isLogin && hasPassword && password !== confirmation) {
      setError("Passwords do not match.");
      return;
    }
    // Missing configuration or an expired challenge must block submission, including Enter.
    if (verificationPending) {
      setError("Complete human verification before continuing.");
      return;
    }
    setBusy(true);
    try {
      const body = isLogin
        ? {
            identity,
            password,
            ...(requiresTurnstile ? { turnstileToken } : {}),
          }
        : mode === "register"
          ? {
              username,
              email,
              password,
              ...(requiresTurnstile ? { turnstileToken } : {}),
            }
          : mode === "verify-email"
            ? { token }
            : mode === "reset-password"
              ? { token, password }
              : { email };
      const response = await ownerRequest(isLogin ? "login" : mode, {
        method: "POST",
        body,
        parseResponse: parseAuthResponse,
      });
      setPassword("");
      setConfirmation("");
      if (isLogin && response.mfaRequired) {
        owner.clear();
        navigate("/account/mfa", { replace: true, state: { returnTo } });
      } else if (isLogin) {
        await owner.refresh();
        if (returnTo || mode === "reauthenticate")
          navigate(returnTo ?? "/account/security#mfa", { replace: true });
      } else {
        if (response.signInRequired) owner.clear();
        setDone(true);
      }
    } catch (err) {
      const signInRejected =
        isLogin && err instanceof OwnerApiError && err.status === 401;
      setShowVerificationHelp(signInRejected);
      setError(
        err instanceof OwnerApiError && err.status === 401
          ? "Unable to sign in. Check your username/email and password, and confirm your email first."
          : err instanceof Error
            ? err.message
            : "Unable to complete this request."
      );
    } finally {
      // Siteverify consumes tokens once, including failed credential attempts. Mount a fresh widget.
      refreshVerification();
      setBusy(false);
    }
  }
  const github =
    options?.githubEnabled &&
    ["login", "reauthenticate", "register"].includes(mode);
  return (
    <div className="owner-login">
      <section
        className="owner-login-card"
        aria-labelledby="account-auth-title"
      >
        <div className="owner-login-icon">
          <LockKeyhole size={28} aria-hidden="true" />
        </div>
        <p className="owner-eyebrow">Web Engineering Portfolio</p>
        <h1 id="account-auth-title">{titles[mode]}</h1>
        <p className="owner-auth-description">
          {isLogin
            ? "Sign in with GitHub, or your username/email and password."
            : mode === "register"
              ? "Join with GitHub, or create an account and confirm your email."
              : mode === "verify-email"
                ? "Confirm that this email address belongs to you."
                : "Manage access to your account."}
        </p>
        {notice && (
          <p role="status" className="owner-message">
            {notice}
          </p>
        )}
        {new URLSearchParams(location.search).get("error") === "github" && (
          <p role="alert" className="owner-message owner-message--error">
            GitHub sign-in failed. Please try again.
          </p>
        )}
        {requiresTurnstile && options?.turnstileSiteKey && !done && (
          <div className="owner-form">
            <p className="owner-muted">
              {github
                ? "Complete human verification to continue with GitHub or password."
                : "Complete human verification before continuing."}
            </p>
            <TurnstileWidget
              key={`${mode}:${turnstileAttempt}`}
              siteKey={options.turnstileSiteKey}
              action={isLogin ? "account_login" : "account_register"}
              onToken={setTurnstileToken}
            />
          </div>
        )}
        {github && !done && (
          <button
            type="button"
            className="owner-button owner-button--wide owner-github"
            disabled={busy || verificationPending}
            onClick={() => void startGithub()}
          >
            Continue with GitHub
          </button>
        )}
        {done ? (
          <div role="status" className="owner-message">
            {mode === "verify-email"
              ? "Email confirmed. Sign in again to see your updated account."
              : mode === "reset-password"
                ? "Password saved. All previous sessions ended. Sign in with your new password."
                : "If these details are eligible, an email will arrive shortly. Check your inbox and spam folder."}
          </div>
        ) : (
          <form className="owner-form" onSubmit={(e) => void submit(e)}>
            {isLogin && (
              <label>
                Username or email
                <input
                  required
                  autoComplete="username"
                  maxLength={254}
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                />
              </label>
            )}
            {mode === "register" && (
              <>
                <label>
                  Username
                  <input
                    required
                    autoComplete="username"
                    aria-describedby="account-username-help"
                    minLength={3}
                    maxLength={40}
                    pattern="[a-zA-Z0-9_\-]{3,40}"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
                <small id="account-username-help">
                  3–40 letters, numbers, underscores or hyphens.
                </small>
              </>
            )}
            {["register", "forgot-password", "resend-verification"].includes(
              mode
            ) && (
              <label>
                Email
                <input
                  required
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            )}
            {hasPassword && (
              <>
                <div className="owner-password-heading">
                  <label htmlFor="account-password">
                    {mode === "reset-password" ? "New password" : "Password"}
                  </label>
                  {isLogin && (
                    <Link
                      className="owner-text-link owner-password-help"
                      to="/account/forgot-password"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="owner-password-field">
                  <input
                    id="account-password"
                    required
                    type={show ? "text" : "password"}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    minLength={12}
                    maxLength={128}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    aria-controls="account-password"
                    aria-label={show ? "Hide password" : "Show password"}
                    onClick={() => setShow(!show)}
                  >
                    {show ? "Hide" : "Show"}
                  </button>
                </div>
              </>
            )}
            {hasPassword && !isLogin && (
              <>
                <label>
                  Confirm password
                  <input
                    required
                    type="password"
                    autoComplete="new-password"
                    minLength={12}
                    maxLength={128}
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                  />
                </label>
                <small>
                  Use a unique password with at least 12 characters.
                </small>
              </>
            )}
            {(mode === "verify-email" || mode === "reset-password") &&
              !token && (
                <p role="alert">Open the link from your email to continue.</p>
              )}
            {requiresTurnstile && !options?.turnstileSiteKey && (
              <p role="alert">
                Human verification is unavailable. Please try again later.
              </p>
            )}
            {protectedForm && optionsError && (
              <p role="alert">
                Sign-in options could not load.{" "}
                <button
                  type="button"
                  className="owner-text-link"
                  onClick={() => {
                    setOptionsError(false);
                    setOptionsAttempt((value) => value + 1);
                  }}
                >
                  Try again
                </button>
              </p>
            )}
            <button
              type="submit"
              className="owner-button owner-button--primary owner-button--wide"
              disabled={
                busy ||
                verificationPending ||
                ((mode === "verify-email" || mode === "reset-password") &&
                  !token)
              }
            >
              {busy
                ? "Please wait…"
                : isLogin
                  ? "Log in"
                  : mode === "register"
                    ? "Create account"
                    : mode === "verify-email"
                      ? "Confirm email"
                      : mode === "reset-password"
                        ? "Save password"
                        : "Send email"}
            </button>
          </form>
        )}
        {(error || owner.error) && (
          <p role="alert" className="owner-message owner-message--error">
            {error || owner.error}
          </p>
        )}
        {(showVerificationHelp ||
          (mode === "register" && done) ||
          (mode === "verify-email" && !done)) && (
          <p className="owner-auth-verification">
            Need to confirm your email?{" "}
            <Link className="owner-text-link" to="/account/resend-verification">
              Resend confirmation email
            </Link>
          </p>
        )}
        <div className="owner-auth-links">
          {mode !== "login" && (
            <Link className="owner-text-link" to="/account/login">
              Back to sign in
            </Link>
          )}
          {mode === "login" && (
            <p className="owner-auth-signup">
              New here?{" "}
              <Link className="owner-text-link" to="/account/register">
                Create an account
              </Link>
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
