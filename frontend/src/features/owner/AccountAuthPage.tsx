import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

import { ownerRequest, OwnerApiError } from "./owner-api";
import { useOwner } from "./owner-context";

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
  const notice = (location.state as { notice?: string } | null)?.notice;
  useEffect(() => {
    void ownerRequest<typeof options>("login-options")
      .then(setOptions)
      .catch(() => {});
  }, []);
  const hasPassword = [
    "login",
    "reauthenticate",
    "register",
    "reset-password",
  ].includes(mode);
  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setShowVerificationHelp(false);
    if (!isLogin && hasPassword && password !== confirmation) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const body = isLogin
        ? { identity, password }
        : mode === "register"
          ? { username, email, password }
          : mode === "verify-email"
            ? { token }
            : mode === "reset-password"
              ? { token, password }
              : { email };
      const response = await ownerRequest<{ mfaRequired?: boolean }>(
        isLogin ? "login" : mode,
        { method: "POST", body }
      );
      setPassword("");
      setConfirmation("");
      if (isLogin && response.mfaRequired) {
        owner.clear();
        navigate("/account/mfa", { replace: true });
      } else if (isLogin) {
        await owner.refresh();
        if (mode === "reauthenticate")
          navigate("/account/security#mfa", { replace: true });
      } else setDone(true);
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
                ? "Confirm your email to activate password sign-in."
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
        {github && (
          <a
            className="owner-button owner-button--wide owner-github"
            href={`${import.meta.env.VITE_OWNER_API_URL ?? import.meta.env.VITE_API_URL ?? ""}/api/account/github/start`}
          >
            Continue with GitHub
          </a>
        )}
        {done ? (
          <div role="status" className="owner-message">
            {mode === "verify-email"
              ? "Email confirmed. You can now sign in."
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
            <button
              type="submit"
              className="owner-button owner-button--primary owner-button--wide"
              disabled={
                busy ||
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
