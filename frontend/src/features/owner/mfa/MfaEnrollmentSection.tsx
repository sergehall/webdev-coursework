import type { FormEvent } from "react";

import type { MfaSetup } from "../mfa-api";

type Props = {
  setup: MfaSetup;
  qr: string;
  code: string;
  onCodeChange: (value: string) => void;
  busy: boolean;
  onConfirm: (event: FormEvent) => void;
  onCancel: () => void;
};

export default function MfaEnrollmentSection({
  setup,
  qr,
  code,
  onCodeChange,
  busy,
  onConfirm,
  onCancel,
}: Props) {
  return (
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
      <form className="owner-form" onSubmit={onConfirm}>
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
              onCodeChange(e.target.value.replace(/\D/g, "").slice(0, 6))
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
            onClick={onCancel}
          >
            Cancel setup
          </button>
        </div>
      </form>
    </section>
  );
}
