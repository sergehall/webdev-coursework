import { Link } from "react-router-dom";
import { Monitor, Settings2, ShieldCheck, UserRound } from "lucide-react";

import { formatAccountTime } from "./account-time";
import type { OwnerSession } from "./owner-api";
import "./account-overview.css";

function enabledLabel(value: boolean | undefined) {
  return value === undefined
    ? "Not available"
    : value
      ? "Enabled"
      : "Not enabled";
}

export default function AccountOverviewPanel({
  session,
}: {
  session: OwnerSession;
}) {
  const { profile } = session;
  const emailStatus = profile.email
    ? profile.emailVerified === undefined
      ? "Confirmation status unavailable"
      : profile.emailVerified
        ? "Confirmed"
        : "Confirmation needed"
    : profile.email === null
      ? "No email linked"
      : "Not available";
  const dateExample = formatAccountTime(session.issuedAt, profile);

  return (
    <div className="owner-grid owner-overview-grid">
      <section className="owner-card" aria-labelledby="overview-profile-title">
        <div className="owner-overview-heading">
          <UserRound size={18} aria-hidden="true" />
          <h2 id="overview-profile-title">Your profile</h2>
        </div>
        <p className="owner-muted">
          Your identity and recovery contact on this site.
        </p>
        <dl className="owner-details owner-overview-details">
          <div>
            <dt>Display name</dt>
            <dd>{profile.displayName}</dd>
          </div>
          <div>
            <dt>Site username</dt>
            <dd>{profile.username || "Not set"}</dd>
          </div>
          <div className="owner-overview-detail-wide">
            <dt>Recovery email</dt>
            <dd>{profile.email || emailStatus}</dd>
            {profile.email && <dd className="owner-muted">{emailStatus}</dd>}
          </div>
        </dl>
        <div className="owner-overview-footer">
          <Link className="owner-text-link" to="/account/profile">
            Edit profile
          </Link>
          {profile.email === null && (
            <Link className="owner-text-link" to="/account/security#overview">
              Add recovery email
            </Link>
          )}
          {profile.email && profile.emailVerified === false && (
            <Link className="owner-text-link" to="/account/resend-verification">
              Confirm email
            </Link>
          )}
        </div>
      </section>

      <section className="owner-card" aria-labelledby="overview-security-title">
        <div className="owner-overview-heading">
          <ShieldCheck size={18} aria-hidden="true" />
          <h2 id="overview-security-title">Sign-in & protection</h2>
        </div>
        <p className="owner-muted">
          Available sign-in methods and account protection.
        </p>
        <dl className="owner-details owner-overview-details">
          <div>
            <dt>Password sign-in</dt>
            <dd>{enabledLabel(profile.passwordEnabled)}</dd>
          </div>
          <div>
            <dt>GitHub sign-in</dt>
            <dd>
              {profile.githubLinked === undefined
                ? "Not available"
                : profile.githubLinked
                  ? "Connected"
                  : "Not connected"}
            </dd>
            {profile.githubLinked && profile.githubUsername && (
              <dd className="owner-muted">@{profile.githubUsername}</dd>
            )}
          </div>
          <div className="owner-overview-detail-wide">
            <dt>Two-factor protection</dt>
            <dd>{enabledLabel(session.mfaEnabled)}</dd>
            {session.mfaEnabled === false && (
              <dd className="owner-muted">
                Review authenticator setup for an extra layer of protection.
              </dd>
            )}
          </div>
        </dl>
        <div className="owner-overview-footer">
          <Link className="owner-text-link" to="/account/security#overview">
            Review security
          </Link>
          {session.mfaEnabled === false && (
            <Link className="owner-text-link" to="/account/security#mfa">
              Two-factor settings
            </Link>
          )}
        </div>
      </section>

      <section className="owner-card" aria-labelledby="overview-session-title">
        <div className="owner-overview-heading">
          <Monitor size={18} aria-hidden="true" />
          <h2 id="overview-session-title">Current session</h2>
        </div>
        <p className="owner-muted">
          Details of the sign-in you are using right now.
        </p>
        <dl className="owner-details owner-overview-details">
          <div className="owner-overview-detail-wide">
            <dt>Signed in with</dt>
            <dd>
              {session.authMethod === "github"
                ? "GitHub"
                : session.authMethod === "password"
                  ? "Site password"
                  : "Method not recorded"}
            </dd>
          </div>
          <div>
            <dt>Signed in at</dt>
            <dd>
              <time dateTime={session.issuedAt}>{dateExample}</time>
            </dd>
          </div>
          <div>
            <dt>Expires at</dt>
            <dd>
              <time dateTime={session.expiresAt}>
                {formatAccountTime(session.expiresAt, profile)}
              </time>
            </dd>
          </div>
        </dl>
        <div className="owner-overview-footer">
          <span className="owner-muted">Times in {profile.timeZone}.</span>
          <Link className="owner-text-link" to="/account/security#sessions">
            Manage active sessions
          </Link>
        </div>
      </section>

      <section
        className="owner-card"
        aria-labelledby="overview-preferences-title"
      >
        <div className="owner-overview-heading">
          <Settings2 size={18} aria-hidden="true" />
          <h2 id="overview-preferences-title">Your preferences</h2>
        </div>
        <p className="owner-muted">
          Saved display settings for your account workspace.
        </p>
        <dl className="owner-details owner-overview-details">
          <div>
            <dt>Account theme</dt>
            <dd>
              {profile.theme === "system"
                ? "Follow portfolio theme"
                : profile.theme === "dark"
                  ? "Dark"
                  : "Light"}
            </dd>
          </div>
          <div>
            <dt>Time zone</dt>
            <dd>{profile.timeZone}</dd>
          </div>
          <div>
            <dt>Date format</dt>
            <dd>
              {profile.dateFormat === "iso"
                ? "Year-month-day"
                : profile.dateFormat === "day-first"
                  ? "Day/month/year"
                  : "Month name"}
            </dd>
          </div>
          <div>
            <dt>Clock format</dt>
            <dd>{profile.clockFormat === "24h" ? "24-hour" : "12-hour"}</dd>
          </div>
        </dl>
        <div className="owner-overview-footer">
          <Link
            className="owner-text-link owner-overview-preferences-link"
            to="/account/preferences"
          >
            Adjust preferences
          </Link>
        </div>
      </section>
    </div>
  );
}
