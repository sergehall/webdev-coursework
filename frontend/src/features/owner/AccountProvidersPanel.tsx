import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { Mail } from "lucide-react";

import { ownerRequest, OwnerApiError, type OwnerSession } from "./owner-api";
import { useOwner } from "./owner-context";
import { formatAccountTime } from "./account-time";

import { z } from "@/config/zod";

const providerStatus = z.object({
  githubAvailable: z.boolean(),
  emailAvailable: z.boolean(),
  pendingEmail: z.string().email().nullable(),
  pendingEmailExpiresAt: z.string().datetime().nullable(),
});
type ProviderStatus = z.infer<typeof providerStatus>;
export default function AccountProvidersPanel({
  session,
}: {
  session: OwnerSession;
}) {
  const owner = useOwner();
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<ProviderStatus | null>(null);
  const [revision, setRevision] = useState(0);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [help, setHelp] = useState<"signin" | "mfa" | null>(null);
  useEffect(() => {
    let active = true;
    void ownerRequest("providers", {
      parseResponse: (value) => providerStatus.parse(value),
    })
      .then((value) => {
        if (active) setStatus(value);
      })
      .catch(() => {
        if (active) setError("Unable to load sign-in settings. Try again.");
      });
    return () => {
      active = false;
    };
  }, [revision]);
  const profile = session.profile;
  const hasPassword = profile.passwordEnabled === true;
  const canDisconnect =
    hasPassword &&
    (profile.emailVerified === true ||
      profile.registrationMethod === "administrator");
  async function run(
    action: "connect" | "disconnect" | "email" | "cancel",
    targetEmail?: string
  ) {
    if (busy || !owner) return;
    setBusy(true);
    setError("");
    setMessage("");
    setHelp(null);
    try {
      const path = {
        connect: "github/connect",
        disconnect: "github/disconnect",
        email: "email",
        cancel: "email/cancel",
      }[action];
      const result = await ownerRequest<{ url?: string }>(`providers/${path}`, {
        method: "POST",
        body: action === "email" ? { email: targetEmail?.trim() } : undefined,
        parseResponse: (value) =>
          z.object({ url: z.string().url().optional() }).parse(value),
      });
      if (action === "connect") {
        const url = new URL(result.url ?? "");
        if (
          url.origin !== "https://github.com" ||
          url.pathname !== "/login/oauth/authorize"
        )
          throw new Error("Unable to start GitHub verification.");
        window.location.assign(url.href);
      } else if (action === "disconnect") {
        owner.clear();
        navigate("/account/login", {
          replace: true,
          state: {
            notice:
              "GitHub disconnected. All sessions ended. Sign in with your password.",
            returnTo: "/account/security#overview",
          },
        });
      } else {
        setRevision((value) => value + 1);
        setMessage(
          action === "email"
            ? "If this address is eligible, a confirmation email will arrive shortly. Open it to finish adding your email. Current sign-in methods stay available."
            : "Pending email confirmation cancelled."
        );
        if (action === "email") setEmail("");
      }
    } catch (err) {
      if (err instanceof OwnerApiError) {
        if (err.status === 401) {
          owner.clear();
          navigate("/account/login", { replace: true });
          return;
        }
        if (err.code === "RECENT_SIGN_IN_REQUIRED") setHelp("signin");
        if (err.code === "MFA_STEP_UP_REQUIRED") setHelp("mfa");
      }
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update sign-in settings."
      );
    } finally {
      setBusy(false);
    }
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    void run("email", email);
  }
  return (
    <section
      className="owner-providers"
      id="providers"
      aria-labelledby="providers-title"
    >
      <h2 id="providers-title">Sign-in and recovery</h2>
      <p className="owner-muted">
        Manage your GitHub connection and recovery email.
      </p>
      <div className="owner-grid owner-provider-grid">
        <section className="owner-card">
          <div className="owner-provider-heading">
            <FaGithub aria-hidden="true" />
            <h3>GitHub</h3>
            <span className="owner-provider-status">
              {profile.githubLinked ? "Connected" : "Not connected"}
            </span>
          </div>
          {profile.githubLinked ? (
            <>
              <p className="owner-muted">
                {profile.githubUsername
                  ? `Connected as @${profile.githubUsername}.`
                  : "A GitHub account is connected to this account."}{" "}
                Sign in through GitHub without entering your site password.
              </p>
              <a
                className="owner-text-link"
                href="https://github.com/settings/applications"
                target="_blank"
                rel="noopener noreferrer"
              >
                Review GitHub app access
              </a>
              {canDisconnect ? (
                <>
                  <p className="owner-muted">
                    Disconnecting ends every session. Your password sign-in will
                    remain available.
                  </p>
                  <label className="owner-confirmation">
                    <input
                      type="checkbox"
                      checked={confirmed}
                      onChange={(e) => setConfirmed(e.target.checked)}
                    />
                    I want to disconnect GitHub
                  </label>
                  <button
                    className="owner-button owner-button--danger"
                    disabled={busy || !confirmed}
                    onClick={() => void run("disconnect")}
                  >
                    Disconnect GitHub
                  </button>
                </>
              ) : (
                <p className="owner-muted">
                  Keep GitHub connected until you have a verified email and
                  password sign-in. Add a recovery email here, then configure a
                  backup in Password.
                </p>
              )}
            </>
          ) : (
            <>
              <p className="owner-muted">
                Connect your GitHub account to sign in with it. Connecting ends
                existing sessions; sign in again to continue.
              </p>
              <button
                className="owner-button owner-button--primary"
                disabled={busy || !status?.githubAvailable}
                onClick={() => void run("connect")}
              >
                Connect GitHub
              </button>
              {status && !status.githubAvailable && (
                <p className="owner-muted">
                  GitHub connection is currently unavailable. Try again later.
                </p>
              )}
            </>
          )}
        </section>
        <section
          className="owner-card"
          id="recovery-email"
          aria-labelledby="recovery-email-title"
        >
          <div className="owner-provider-heading">
            <Mail aria-hidden="true" />
            <h3 id="recovery-email-title">Recovery email</h3>
            <span className="owner-provider-status">
              {profile.email
                ? profile.emailVerified
                  ? "Verified"
                  : "Not verified"
                : status?.pendingEmail
                  ? "Confirmation pending"
                  : "Not added"}
            </span>
          </div>
          {profile.email ? (
            <>
              <p className="owner-provider-email">{profile.email}</p>
              <p className="owner-muted">
                {profile.emailVerified
                  ? "This address is confirmed. It supports password recovery when password sign-in is configured."
                  : "Confirm this address to activate email sign-in and recovery."}{" "}
                Your confirmed account email cannot be changed here.
              </p>
              {!profile.emailVerified && (
                <Link
                  className="owner-button"
                  to="/account/resend-verification"
                >
                  Resend email confirmation
                </Link>
              )}
              {hasPassword && profile.emailVerified && (
                <Link className="owner-text-link" to="/account/forgot-password">
                  Recover a forgotten password
                </Link>
              )}
            </>
          ) : status?.pendingEmail ? (
            <>
              <p className="owner-provider-email">{status.pendingEmail}</p>
              <p className="owner-muted">
                Check this inbox and spam folder. This address becomes part of
                your account only after you confirm it. Confirmation ends
                existing sessions.
              </p>
              {status.pendingEmailExpiresAt && (
                <p className="owner-muted">
                  Link expires{" "}
                  {formatAccountTime(status.pendingEmailExpiresAt, profile)}.
                </p>
              )}
              <div className="owner-actions">
                <button
                  className="owner-button"
                  disabled={busy || !status.emailAvailable}
                  onClick={() =>
                    void run("email", status.pendingEmail ?? undefined)
                  }
                >
                  Resend confirmation
                </button>
                <button
                  className="owner-button"
                  disabled={busy}
                  onClick={() => void run("cancel")}
                >
                  Cancel email addition
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="owner-muted">
                Add an address you control. Your current sign-in methods stay
                available until confirmation is complete.
              </p>
              <form className="owner-form" onSubmit={submit}>
                <label>
                  Email address
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    disabled={busy || !status?.emailAvailable}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <button
                  className="owner-button owner-button--primary"
                  disabled={busy || !status?.emailAvailable || !email.trim()}
                >
                  Send confirmation email
                </button>
              </form>
              {status && !status.emailAvailable && (
                <p className="owner-muted">
                  Email confirmation is currently unavailable. Try again later.
                </p>
              )}
            </>
          )}
        </section>
      </div>
      {!status && !error && (
        <p role="status" className="owner-muted">
          Loading sign-in settings…
        </p>
      )}
      {help === "signin" && (
        <Link
          className="owner-button"
          to="/account/reauthenticate"
          state={{ returnTo: "/account/security#overview" }}
        >
          Sign in again to continue
        </Link>
      )}
      {help === "mfa" && (
        <Link className="owner-button" to="#mfa">
          Verify your current session
        </Link>
      )}
      {message && (
        <p role="status" className="owner-message">
          {message}
        </p>
      )}
      {new URLSearchParams(location.search).get("providerError") ===
        "github" && (
        <p role="alert" className="owner-message owner-message--error">
          GitHub could not be connected. Check that it is not linked to another
          account, sign in again and retry.
        </p>
      )}
      {error && (
        <p role="alert" className="owner-message owner-message--error">
          {error}
        </p>
      )}
      {!status && error && (
        <button
          className="owner-button"
          onClick={() => {
            setError("");
            setRevision((value) => value + 1);
          }}
        >
          Retry sign-in settings
        </button>
      )}
    </section>
  );
}
