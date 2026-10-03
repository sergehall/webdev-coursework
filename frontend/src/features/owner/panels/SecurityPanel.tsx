import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ActiveSessionsPanel from "../ActiveSessionsPanel";
import MfaSettingsPanel from "../MfaSettingsPanel";
import { Message, PageHeader } from "../OwnerPageElements";
import SecurityOverview from "../SecurityOverview";
import type { MfaStatus } from "../mfa-api";
import { ownerRequest, type OwnerSession } from "../owner-api";
import { useOwner } from "../owner-context";

export function SecurityPanel({ session }: { session: OwnerSession }) {
  const owner = useOwner()!;
  const navigate = useNavigate();
  const hash = useLocation().hash.slice(1);
  const windowId = ["password", "mfa", "sessions"].includes(hash)
    ? hash
    : "overview";
  const [mfaStatus, setMfaStatus] = useState<MfaStatus | null>(null);
  const [mfaError, setMfaError] = useState("");
  useEffect(() => {
    let active = true;
    void ownerRequest<MfaStatus>("mfa/status")
      .then((value) => {
        if (active) setMfaStatus(value);
      })
      .catch((err) => {
        if (active)
          setMfaError(
            err instanceof Error
              ? err.message
              : "Unable to load security status."
          );
      });
    return () => {
      active = false;
    };
  }, []);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [confirmRevoke, setConfirmRevoke] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (confirmRevoke) dialog.current?.showModal();
  }, [confirmRevoke]);
  async function change(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmation) {
      setError("New passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      await ownerRequest(
        session.profile.passwordEnabled === false
          ? "providers/password"
          : "password",
        {
          method: "POST",
          body:
            session.profile.passwordEnabled === false
              ? { newPassword }
              : { password, newPassword },
        }
      );
      owner.clear();
      navigate("/account/login", {
        replace: true,
        state: {
          notice:
            "Password changed. All sessions ended. Sign in with your new password.",
        },
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to change password."
      );
    } finally {
      setBusy(false);
    }
  }
  async function revoke() {
    setBusy(true);
    setError("");
    try {
      await ownerRequest("revoke-sessions", { method: "POST" });
      owner.clear();
      navigate("/account/login", {
        replace: true,
        state: {
          notice: "All account sessions ended. Sign in again to continue.",
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to end sessions.");
      setConfirmRevoke(false);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <PageHeader
        title="Security"
        description="Manage your password, connected sign-in providers, two-factor protection and account sessions."
      />
      <section className="owner-card">
        <h2>Security sections</h2>
        <p className="owner-muted">
          Start with your security overview, or open a specific setting.
        </p>
        <nav className="owner-security-windows" aria-label="Security windows">
          {[
            {
              id: "overview",
              label: "Overview",
              note: "Status and sign-in methods",
            },
            {
              id: "password",
              label: "Password",
              note: "Credentials and recovery",
            },
            {
              id: "mfa",
              label: "Two-factor",
              note: "Authenticator and recovery codes",
            },
            {
              id: "sessions",
              label: "Sessions",
              note: "Active devices and sign-ins",
            },
          ].map((item) => (
            <Link
              key={item.id}
              to={`#${item.id}`}
              className="owner-card owner-security-window"
              aria-current={windowId === item.id ? "page" : undefined}
            >
              <strong>{item.label}</strong>
              <span className="owner-muted">{item.note}</span>
            </Link>
          ))}
        </nav>
      </section>
      {mfaError && <Message error>{mfaError}</Message>}
      {windowId === "mfa" && (
        <MfaSettingsPanel status={mfaStatus} onChange={setMfaStatus} />
      )}
      {windowId === "overview" && (
        <SecurityOverview
          session={session}
          mfa={mfaStatus}
          statusUnavailable={!!mfaError}
        />
      )}
      {(windowId === "password" || windowId === "sessions") && (
        <div>
          {windowId === "password" && (
            <section className="owner-card">
              <h2>Password</h2>
              <dl className="owner-details">
                <div>
                  <dt>Site username</dt>
                  <dd>{session.profile.username ?? "Not available"}</dd>
                </div>
              </dl>
              <Link className="owner-text-link" to="/account/profile">
                Manage site username
              </Link>
              <p className="owner-muted">
                Changing your password signs you out on every device.
              </p>
              {session.profile.passwordEnabled !== false ||
              session.profile.emailVerified ? (
                <form className="owner-form" onSubmit={(e) => void change(e)}>
                  {session.profile.passwordEnabled !== false && (
                    <label>
                      Current password
                      <input
                        autoComplete="current-password"
                        type="password"
                        minLength={12}
                        maxLength={128}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </label>
                  )}
                  <label>
                    New password
                    <input
                      autoComplete="new-password"
                      type="password"
                      minLength={12}
                      maxLength={128}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </label>
                  <label>
                    Confirm new password
                    <input
                      autoComplete="new-password"
                      type="password"
                      minLength={12}
                      maxLength={128}
                      required
                      value={confirmation}
                      onChange={(e) => setConfirmation(e.target.value)}
                    />
                  </label>
                  <p className="owner-muted">
                    Use a unique password of at least 12 characters.
                  </p>
                  <button
                    type="submit"
                    disabled={busy}
                    className="owner-button owner-button--primary"
                  >
                    {busy
                      ? "Saving…"
                      : session.profile.passwordEnabled === false
                        ? "Set up password"
                        : "Change password"}
                  </button>
                </form>
              ) : (
                <p className="owner-muted">
                  You sign in through GitHub. Your GitHub account manages your
                  password. Add and confirm an email in Overview to set up a
                  site password.
                  <Link className="owner-text-link" to="#overview">
                    Add recovery email
                  </Link>
                </p>
              )}
            </section>
          )}
          {windowId === "sessions" && (
            <section className="owner-card">
              <h2>Account sessions</h2>
              <ActiveSessionsPanel
                profile={session.profile}
                access={session.role}
                ending={busy}
                onEndSessions={() => setConfirmRevoke(true)}
              />
            </section>
          )}
        </div>
      )}
      {error && (
        <>
          <Message error>{error}</Message>
          <Link
            className="owner-text-link"
            to="/account/reauthenticate"
            state={{ returnTo: "/account/security#password" }}
          >
            Confirm your sign-in
          </Link>
          <Link className="owner-text-link" to="#mfa">
            Verify your current session
          </Link>
        </>
      )}
      {confirmRevoke && (
        <dialog
          ref={dialog}
          className="owner-dialog"
          onCancel={(e) => {
            if (busy) e.preventDefault();
            else setConfirmRevoke(false);
          }}
          aria-labelledby="owner-revoke-heading"
        >
          <h2 id="owner-revoke-heading">End all sessions?</h2>
          <p>You will need to sign in again on every device.</p>
          <div className="owner-actions">
            <button
              className="owner-button"
              disabled={busy}
              onClick={() => setConfirmRevoke(false)}
            >
              Cancel
            </button>
            <button
              className="owner-button owner-button--primary"
              disabled={busy}
              onClick={() => void revoke()}
            >
              {busy ? "Ending sessions…" : "End sessions"}
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}
