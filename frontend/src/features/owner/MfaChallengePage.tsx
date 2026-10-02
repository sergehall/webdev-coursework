import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

import { ownerRequest, OwnerApiError } from "./owner-api";
import { useOwner } from "./owner-context";
import { securityReturn } from "./auth-return";

export default function MfaChallengePage() {
  const owner = useOwner()!,
    navigate = useNavigate();
  const location = useLocation();
  const [recovery, setRecovery] = useState(false),
    [code, setCode] = useState("");
  const [expiresAt, setExpiresAt] = useState<number | null>(null),
    [now, setNow] = useState(Date.now());
  const [expired, setExpired] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const [loadFailed, setLoadFailed] = useState(false),
    [loadAttempt, setLoadAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setLoadFailed(false);
    setError("");
    void ownerRequest<{ expiresAt: string }>("mfa/challenge")
      .then((value) => {
        const deadline = Date.parse(value.expiresAt);
        if (!Number.isFinite(deadline))
          throw new Error("Invalid challenge response");
        if (active) setExpiresAt(deadline);
      })
      .catch((err: unknown) => {
        if (!active) return;
        if (err instanceof OwnerApiError && err.status === 401)
          setExpired(true);
        else {
          setLoadFailed(true);
          setError(
            "Unable to load verification. Check your connection and try again."
          );
        }
      });
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [loadAttempt]);
  const isExpired = expired || (expiresAt !== null && expiresAt <= now);
  const valid = recovery
    ? /^[A-F0-9]{5}(?:-[A-F0-9]{5}){3}$/.test(code)
    : /^\d{6}$/.test(code);
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!valid || isExpired || busy || expiresAt === null || loadFailed) return;
    setBusy(true);
    setError("");
    try {
      await ownerRequest("mfa/challenge", { method: "POST", body: { code } });
      setCode("");
      await owner.refresh();
      navigate(
        securityReturn(
          (location.state as { returnTo?: unknown } | null)?.returnTo
        ) ?? "/account/security#mfa",
        { replace: true }
      );
    } catch (err) {
      if (err instanceof OwnerApiError && err.status === 401) setExpired(true);
      else
        setError(
          err instanceof Error ? err.message : "Unable to verify this code."
        );
    } finally {
      setBusy(false);
    }
  }
  async function restart() {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await ownerRequest("mfa/cancel-challenge", { method: "POST" });
      navigate("/account/login", { replace: true });
    } catch {
      setError(
        "Unable to end verification. Check your connection and try again."
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="owner-login">
      <section className="owner-login-card" aria-labelledby="mfa-login-title">
        <div className="owner-login-icon">
          <ShieldCheck aria-hidden="true" />
        </div>
        <p className="owner-eyebrow">Web Engineering Portfolio</p>
        <h1 id="mfa-login-title">Two-factor verification</h1>
        <p className="owner-auth-description">
          {recovery
            ? "Enter a saved recovery code. Each code works only once."
            : "Enter the 6-digit code from your authenticator app to finish signing in."}
        </p>
        {expiresAt !== null && !isExpired && (
          <p className="owner-muted">
            Verification expires in {Math.ceil((expiresAt - now) / 1000)}{" "}
            seconds.
          </p>
        )}
        {!isExpired && (
          <>
            <div className="owner-auth-links">
              <button
                type="button"
                className="owner-button"
                aria-pressed={!recovery}
                disabled={busy}
                onClick={() => {
                  setRecovery(false);
                  setCode("");
                  setError("");
                }}
              >
                Authenticator app
              </button>
              <button
                type="button"
                className="owner-button"
                aria-pressed={recovery}
                disabled={busy}
                onClick={() => {
                  setRecovery(true);
                  setCode("");
                  setError("");
                }}
              >
                Recovery code
              </button>
            </div>
            <form className="owner-form" onSubmit={(e) => void submit(e)}>
              <label>
                {recovery ? "Recovery code" : "Authenticator code"}
                <input
                  autoFocus
                  autoComplete="one-time-code"
                  inputMode={recovery ? "text" : "numeric"}
                  autoCapitalize="characters"
                  spellCheck={false}
                  required
                  maxLength={recovery ? 23 : 6}
                  value={code}
                  onChange={(e) =>
                    setCode(
                      recovery
                        ? e.target.value
                            .toUpperCase()
                            .replace(/[^A-F0-9-]/g, "")
                        : e.target.value.replace(/\D/g, "")
                    )
                  }
                />
              </label>
              <button
                className="owner-button owner-button--primary owner-button--wide"
                disabled={busy || !valid || expiresAt === null || loadFailed}
              >
                {busy ? "Verifying…" : "Finish sign-in"}
              </button>
            </form>
          </>
        )}
        {isExpired && (
          <p role="alert" className="owner-message owner-message--error">
            Verification expired. Sign in again to start a new check.
          </p>
        )}
        {error && (
          <p role="alert" className="owner-message owner-message--error">
            {error}
          </p>
        )}
        {loadFailed && !isExpired && (
          <button
            className="owner-button"
            disabled={busy}
            onClick={() => setLoadAttempt((value) => value + 1)}
          >
            Retry verification
          </button>
        )}
        <button
          className="owner-button"
          disabled={busy}
          onClick={() => void restart()}
        >
          {isExpired ? "Start again" : "Back to sign in"}
        </button>
      </section>
    </div>
  );
}
