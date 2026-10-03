import { Link } from "react-router-dom";

import AccountProvidersPanel from "./AccountProvidersPanel";
import { formatAccountTime } from "./account-time";
import type { OwnerSession } from "./owner-api";
import type { MfaStatus } from "./mfa-api";

export default function SecurityOverview({
  session,
  mfa,
  statusUnavailable,
}: {
  session: OwnerSession;
  mfa: MfaStatus | null;
  statusUnavailable: boolean;
}) {
  const { profile } = session;
  const signals: { text: string; action?: string; to?: string }[] = [];
  if (mfa?.pendingEnrollment) {
    signals.push({
      text: "Two-factor setup is unfinished.",
      action: "Finish setup",
      to: "#mfa",
    });
  } else if (mfa && !mfa.configured && !mfa.enabled) {
    signals.push({
      text: "Two-factor setup is unavailable in this environment.",
      action: "View two-factor settings",
      to: "#mfa",
    });
  } else if (mfa && !mfa.enabled) {
    signals.push({
      text: "Two-factor protection is off.",
      action: "Set up two-factor",
      to: "#mfa",
    });
  } else if (mfa?.enabled && mfa.recoveryCodesRemaining === 0) {
    signals.push({
      text: "No unused recovery codes remain.",
      action: "Manage recovery codes",
      to: "#mfa",
    });
  }
  if (profile.email === null) {
    signals.push({
      text: "No recovery email is linked.",
      action: "Review recovery email",
      to: "#recovery-email",
    });
  } else if (profile.email && profile.emailVerified === false) {
    signals.push({
      text: "Your recovery email is not confirmed.",
      action: "Resend email confirmation",
      to: "/account/resend-verification",
    });
  }

  return (
    <>
      <section
        className="owner-card owner-security-summary"
        aria-label="Security summary"
      >
        <h2>Security overview</h2>
        <dl className="owner-security-facts">
          <div>
            <dt>Password sign-in</dt>
            <dd>
              {profile.passwordEnabled !== false ? "Enabled" : "Not configured"}
            </dd>
          </div>
          <div>
            <dt>Two-factor protection</dt>
            <dd>
              {mfa
                ? mfa.enabled
                  ? "Enabled"
                  : mfa.pendingEnrollment
                    ? "Setup in progress"
                    : "Disabled"
                : statusUnavailable
                  ? "Unavailable"
                  : "Loading…"}
            </dd>
          </div>
          <div>
            <dt>Current session</dt>
            <dd>
              {session.authMethod === "github"
                ? "GitHub sign-in"
                : session.authMethod === "password"
                  ? "Password sign-in"
                  : "Sign-in method not recorded"}
            </dd>
            <dd className="owner-muted">
              Expires {formatAccountTime(session.expiresAt, profile)}
            </dd>
          </div>
        </dl>
        <div
          className="owner-security-review"
          aria-labelledby="security-signals-title"
        >
          <h3 id="security-signals-title">Recommended actions</h3>
          {!mfa && (
            <p
              className="owner-muted"
              role={statusUnavailable ? undefined : "status"}
            >
              {statusUnavailable
                ? "Two-factor status is unavailable."
                : "Checking two-factor status…"}
            </p>
          )}
          {signals.length > 0 ? (
            <ul className="owner-security-signals">
              {signals.map((signal) => (
                <li key={signal.text}>
                  <p>{signal.text}</p>
                  {signal.to &&
                    (signal.to === "#recovery-email" ? (
                      <a className="owner-button" href={signal.to}>
                        {signal.action}
                      </a>
                    ) : (
                      <Link className="owner-button" to={signal.to}>
                        {signal.action}
                      </Link>
                    ))}
                </li>
              ))}
            </ul>
          ) : mfa ? (
            <p>No setup reminders from the currently loaded account data.</p>
          ) : null}
        </div>
      </section>
      <AccountProvidersPanel session={session} />
    </>
  );
}
