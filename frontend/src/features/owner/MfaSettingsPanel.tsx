import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import { ShieldCheck } from "lucide-react";

import { formatAccountTime } from "./account-time";
import { ownerRequest, OwnerApiError } from "./owner-api";
import { useOwner } from "./owner-context";
import type { MfaResponse, MfaSetup, MfaStatus } from "./mfa-api";

export default function MfaSettingsPanel({
  status,
  onChange,
}: {
  status: MfaStatus | null;
  onChange: (value: MfaStatus) => void;
}) {
  const owner = useOwner()!,
    navigate = useNavigate();
  const [setup, setSetup] = useState<MfaSetup | null>(null),
    [qr, setQr] = useState("");
  const [code, setCode] = useState(""),
    [proof, setProof] = useState("");
  const [codes, setCodes] = useState<string[]>([]),
    [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [message, setMessage] = useState("");
  const [recentRequired, setRecentRequired] = useState(false),
    [confirmDisable, setConfirmDisable] = useState(false);
  useEffect(() => {
    if (!setup) return;
    const timer = window.setTimeout(
      () => {
        setSetup(null);
        setQr("");
        setCode("");
        setError("Authenticator setup expired. Start again.");
        void ownerRequest<MfaStatus>("mfa/status")
          .then(onChange)
          .catch(() => {});
      },
      Math.max(0, Date.parse(setup.expiresAt) - Date.now())
    );
    return () => window.clearTimeout(timer);
  }, [setup, onChange]);
  useEffect(() => {
    let active = true;
    setQr("");
    if (setup)
      void QRCode.toDataURL(setup.otpauthUri, {
        width: 224,
        margin: 4,
        errorCorrectionLevel: "M",
        color: { dark: "#111827", light: "#ffffff" },
      })
        .then((value) => {
          if (active) setQr(value);
        })
        .catch(() => {
          if (active)
            setError(
              "Unable to prepare the QR code. Use the secret key instead."
            );
        });
    return () => {
      active = false;
    };
  }, [setup]);
  async function run(path: string, body?: unknown) {
    if (busy) return;
    setBusy(true);
    setError("");
    setMessage("");
    setRecentRequired(false);
    try {
      const result = await ownerRequest<MfaResponse>(`mfa/${path}`, {
        method: "POST",
        body,
      });
      if (path === "disable") {
        owner.clear();
        navigate("/account/login", {
          replace: true,
          state: {
            notice:
              "Two-factor authentication disabled. All sessions ended. Sign in again.",
          },
        });
        return;
      }
      onChange(result.mfa);
      if (path === "enroll") {
        setSetup(result.setup!);
        setCodes([]);
        setSaved(false);
      }
      if (path === "cancel" || path === "verify-enrollment") {
        setSetup(null);
        setQr("");
        setCode("");
      }
      if (result.recoveryCodes) {
        setCodes(result.recoveryCodes);
        setSaved(false);
      }
      if (["verify-enrollment", "recovery-codes", "step-up"].includes(path)) {
        setProof("");
        await owner.refresh();
        setMessage(
          path === "step-up"
            ? "Current session verified. You can return to your previous action."
            : "Two-factor settings saved."
        );
      }
    } catch (err) {
      if (
        err instanceof OwnerApiError &&
        err.code === "MFA_ENROLLMENT_EXPIRED"
      ) {
        setSetup(null);
        setQr("");
        setCode("");
      }
      if (err instanceof OwnerApiError && err.status === 401) {
        owner.clear();
        navigate("/account/login", { replace: true });
        return;
      }
      if (
        err instanceof OwnerApiError &&
        err.code === "RECENT_SIGN_IN_REQUIRED"
      )
        setRecentRequired(true);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update two-factor settings."
      );
    } finally {
      setBusy(false);
    }
  }
  const time = (value: string | null) =>
    value
      ? formatAccountTime(value, owner.session?.profile)
      : "Not verified yet";
  const hasProof = /^(?:\d{6}|[A-Fa-f0-9]{5}(?:-[A-Fa-f0-9]{5}){3})$/.test(
    proof.trim()
  );
  function confirm(e: FormEvent) {
    e.preventDefault();
    if (setup)
      void run("verify-enrollment", { enrollmentId: setup.enrollmentId, code });
  }
  async function copyCodes() {
    try {
      await navigator.clipboard.writeText(codes.join("\n"));
      setMessage(
        "Recovery codes copied. Store them privately and clear your clipboard when finished."
      );
    } catch {
      setError(
        "Unable to copy recovery codes. Download them or save them manually."
      );
    }
  }
  function downloadCodes() {
    const url = URL.createObjectURL(
      new Blob(
        [
          "Web Engineering Portfolio recovery codes\nEach code works once. Keep this file private.\n\n",
          codes.join("\n"),
          "\n",
        ],
        { type: "text/plain;charset=utf-8" }
      )
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "webdev-recovery-codes.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }
  return (
    <section
      className="owner-card owner-mfa"
      id="mfa"
      aria-labelledby="mfa-title"
    >
      <div className="owner-mfa-heading">
        <div>
          <h2 id="mfa-title">Two-factor authentication</h2>
          <p className="owner-muted">
            Protect password and GitHub sign-in with an authenticator app. Keep
            recovery codes for a lost device.
          </p>
        </div>
        <ShieldCheck aria-hidden="true" size={24} />
      </div>
      <span className="owner-security-badge">
        {!status
          ? "Loading…"
          : status.enabled
            ? "Enabled"
            : status.pendingEnrollment
              ? "Setup in progress"
              : "Disabled"}
      </span>
      <div className="owner-grid owner-mfa-state">
        <section className="owner-card">
          <h2>Current state</h2>
          <dl className="owner-details">
            <div>
              <dt>Enrolled</dt>
              <dd>{time(status?.enrolledAt ?? null)}</dd>
            </div>
            <div>
              <dt>Recovery codes remaining</dt>
              <dd>{status?.recoveryCodesRemaining ?? 0}</dd>
            </div>
            <div>
              <dt>Current session verified</dt>
              <dd>{time(status?.currentSessionVerifiedAt ?? null)}</dd>
            </div>
            <div>
              <dt>Pending enrollment</dt>
              <dd>{status?.pendingEnrollment ? "Yes" : "No"}</dd>
            </div>
          </dl>
        </section>
        <section className="owner-card">
          <h2>Actions</h2>
          {!status?.enabled ? (
            <>
              <p className="owner-muted">
                Use Google Authenticator, 1Password, Authy or another compatible
                app.
              </p>
              <button
                className="owner-button owner-button--primary"
                disabled={busy || !status?.configured || !!setup}
                onClick={() => void run("enroll")}
              >
                Start 2FA setup
              </button>
              {status && !status.configured && (
                <p className="owner-muted">
                  Authenticator setup is not configured on this environment yet.
                </p>
              )}
            </>
          ) : (
            <>
              <p className="owner-muted">
                Confirm your authenticator before sensitive account and
                administrator actions. Each code works once.
              </p>
              <label className="owner-mfa-proof">
                Authenticator or recovery code
                <input
                  aria-label="Authenticator or recovery code"
                  autoComplete="one-time-code"
                  spellCheck={false}
                  autoCapitalize="characters"
                  maxLength={23}
                  value={proof}
                  onChange={(e) =>
                    setProof(e.target.value.trim().toUpperCase())
                  }
                />
              </label>
              <button
                className="owner-button owner-button--primary"
                disabled={busy || !hasProof}
                onClick={() => void run("step-up", { code: proof.trim() })}
              >
                Verify current session
              </button>
            </>
          )}
        </section>
      </div>
      {setup && (
        <section className="owner-card owner-mfa-setup">
          <h2>Finish authenticator setup</h2>
          <p className="owner-muted">
            Scan this QR in your authenticator app, then enter its 6-digit code.
            Setup expires after 10 minutes.
          </p>
          <div className="owner-mfa-enrollment">
            {qr ? (
              <img
                src={qr}
                alt="Authenticator setup QR code"
                width={224}
                height={224}
              />
            ) : (
              <p className="owner-muted">
                Preparing QR… You can also use the secret key.
              </p>
            )}
            <div>
              <dl className="owner-details">
                <div>
                  <dt>Issuer</dt>
                  <dd>{setup.issuer}</dd>
                </div>
                <div>
                  <dt>Account</dt>
                  <dd>{setup.accountName}</dd>
                </div>
              </dl>
              <label className="owner-mfa-proof">
                Secret key
                <input
                  readOnly
                  value={setup.secret}
                  aria-label="Authenticator secret key"
                />
              </label>
              <p className="owner-muted">
                This key is shown only during setup. Keep it private.
              </p>
            </div>
          </div>
          <form className="owner-form" onSubmit={confirm}>
            <label>
              Authenticator code
              <input
                required
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
              />
            </label>
            <div className="owner-actions">
              <button
                type="submit"
                className="owner-button owner-button--primary"
                disabled={busy || code.length !== 6}
              >
                Verify setup
              </button>
              <button
                type="button"
                className="owner-button"
                disabled={busy}
                onClick={() => void run("cancel")}
              >
                Cancel setup
              </button>
            </div>
          </form>
        </section>
      )}
      {codes.length > 0 && (
        <section className="owner-card owner-mfa-recovery">
          <h2>Save your recovery codes</h2>
          <p className="owner-muted">
            These codes are shown once and each works once. Save them in your
            password manager before leaving this page.
          </p>
          <ul className="owner-recovery-codes">
            {codes.map((value) => (
              <li key={value}>
                <code>{value}</code>
              </li>
            ))}
          </ul>
          <div className="owner-actions">
            <button className="owner-button" onClick={() => void copyCodes()}>
              Copy codes
            </button>
            <button className="owner-button" onClick={downloadCodes}>
              Download codes
            </button>
          </div>
          <label className="owner-confirmation">
            <input
              type="checkbox"
              checked={saved}
              onChange={(e) => setSaved(e.target.checked)}
            />
            I saved my recovery codes
          </label>
          <button
            className="owner-button"
            disabled={!saved}
            onClick={() => setCodes([])}
          >
            Hide codes
          </button>
        </section>
      )}
      {status?.enabled && (
        <div className="owner-grid owner-mfa-state">
          <section className="owner-card">
            <h2>Recovery codes</h2>
            <p className="owner-muted">
              Enter a fresh authenticator or recovery code above to replace the
              old set. All unused old codes become invalid.
            </p>
            <button
              className="owner-button"
              disabled={busy || !hasProof || codes.length > 0}
              onClick={() => void run("recovery-codes", { code: proof.trim() })}
            >
              Regenerate codes
            </button>
          </section>
          <section className="owner-card">
            <h2>Disable two-factor authentication</h2>
            <p className="owner-muted">
              A fresh authenticator or recovery code is required. Disabling ends
              every account session.
            </p>
            <label className="owner-confirmation">
              <input
                type="checkbox"
                checked={confirmDisable}
                onChange={(e) => setConfirmDisable(e.target.checked)}
              />
              I want to disable two-factor authentication
            </label>
            <button
              className="owner-button owner-button--danger"
              disabled={
                busy || !hasProof || !confirmDisable || codes.length > 0
              }
              onClick={() => void run("disable", { code: proof.trim() })}
            >
              Disable MFA
            </button>
          </section>
        </div>
      )}
      {recentRequired && (
        <Link className="owner-text-link" to="/account/reauthenticate">
          Sign in again
        </Link>
      )}
      {message && (
        <p role="status" className="owner-message">
          {message}
        </p>
      )}
      {error && (
        <p role="alert" className="owner-message owner-message--error">
          {error}
        </p>
      )}
    </section>
  );
}
