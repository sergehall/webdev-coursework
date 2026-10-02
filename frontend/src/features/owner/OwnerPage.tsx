import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import {
  ArrowUpRight,
  BarChart3,
  LockKeyhole,
  Settings2,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import {
  OwnerApiError,
  ownerRequest,
  type OwnerProfile,
  type OwnerSession,
  type QrStatistics,
} from "./owner-api";
import { useOwner } from "./owner-context";
import ActiveSessionsPanel from "./ActiveSessionsPanel";
import AccountPreferencesPanel from "./AccountPreferencesPanel";
import { formatAccountTime } from "./account-time";
import SecurityActivityPanel from "./SecurityActivityPanel";
import AccountRolesPanel from "./AccountRolesPanel";
import AccountAuthPage, { authPages } from "./AccountAuthPage";
import MfaSettingsPanel from "./MfaSettingsPanel";
import SecurityOverview from "./SecurityOverview";
import MfaChallengePage from "./MfaChallengePage";
import type { MfaStatus } from "./mfa-api";
import "./owner.css";

const sections = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "preferences", label: "Preferences", icon: Settings2 },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "administration", label: "Administration", icon: LockKeyhole },
];

function AccountShortcuts({ items }: { items: typeof sections }) {
  return (
    <nav className="owner-shortcuts" aria-label="Quick account links">
      {items.map((item) => (
        <Link
          className="owner-shortcut"
          to={`/account/${item.id}`}
          key={item.id}
        >
          <item.icon size={16} aria-hidden="true" />
          {item.label}
          <ArrowUpRight size={12} aria-hidden="true" />
        </Link>
      ))}
    </nav>
  );
}

function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="owner-page-header">
      <p className="owner-eyebrow">My account</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

function Message({
  children,
  error = false,
}: {
  children: ReactNode;
  error?: boolean;
}) {
  return (
    <p
      className={`owner-message ${error ? "owner-message--error" : ""}`}
      role={error ? "alert" : "status"}
    >
      {children}
    </p>
  );
}

function useResource<T>(path: string) {
  const owner = useOwner();
  const clear = owner?.clear;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    setData(null);
    setError("");
    void ownerRequest<T>(path)
      .then((value) => {
        if (active) setData(value);
      })
      .catch((err) => {
        if (!active) return;
        if (err instanceof OwnerApiError && err.status === 401) clear?.();
        else
          setError(
            err instanceof Error ? err.message : "Unable to load this page."
          );
      });
    return () => {
      active = false;
    };
  }, [path, revision, clear]);
  return { data, error, retry: () => setRevision((value) => value + 1) };
}

function ProfilePanel({ profile }: { profile: OwnerProfile }) {
  const owner = useOwner()!;
  const [name, setName] = useState(profile.displayName);
  const [username, setUsername] = useState(profile.username ?? "");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      await ownerRequest("profile", {
        method: "PUT",
        body: { displayName: name.trim(), username: username.trim() },
      });
      await owner.refresh();
      setMessage("Profile saved.");
    } catch (err) {
      setError(
        err instanceof OwnerApiError && err.status === 409
          ? "This username is already in use. Choose another username."
          : err instanceof Error
            ? err.message
            : "Unable to save profile."
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <PageHeader
        title="Profile"
        description="Manage your display name and site username."
      />
      <section className="owner-card">
        <form className="owner-form" onSubmit={(e) => void save(e)}>
          <div className="owner-profile-fields">
            <label>
              Display name
              <input
                required
                minLength={1}
                maxLength={80}
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-describedby="profile-name-help"
              />
            </label>
            <label>
              Username
              <input
                required
                minLength={3}
                maxLength={40}
                pattern="[a-zA-Z0-9_-]{3,40}"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-describedby="profile-username-help"
              />
            </label>
          </div>
          <p id="profile-name-help" className="owner-muted">
            Display name appears in your account menu.
          </p>
          <p id="profile-username-help" className="owner-muted">
            Username is your login on this site: 3–40 letters, numbers,
            underscores or hyphens. Changing it does not change your GitHub
            username.
          </p>
          {!profile.email && profile.githubLinked ? (
            <div className="owner-profile-signin">
              <span className="owner-profile-signin-label">Sign-in method</span>
              <div className="owner-profile-provider">
                <FaGithub aria-hidden="true" />
                <strong>GitHub</strong>
                <span className="owner-profile-provider-status">Connected</span>
              </div>
              <p className="owner-muted">
                Use your GitHub account to sign in. No email address is linked
                to this site account.
              </p>
            </div>
          ) : (
            <>
              <label>
                Email (cannot be changed)
                <input
                  readOnly
                  value={profile.email ?? "No email stored on this account"}
                  aria-describedby="profile-email-help"
                />
              </label>
              <p id="profile-email-help" className="owner-muted">
                {profile.email
                  ? `Your registration email is permanent. ${profile.emailVerified ? "Email confirmed." : "Email not confirmed."}`
                  : "No email address is linked to this account."}
              </p>
            </>
          )}
          <button
            className="owner-button owner-button--primary"
            disabled={busy}
            type="submit"
          >
            {busy ? "Saving…" : "Save profile"}
          </button>
          {message && <Message>{message}</Message>}
          {error && <Message error>{error}</Message>}
        </form>
      </section>
      <section className="owner-card owner-profile-identity">
        <h2>Account identity</h2>
        <dl className="owner-details">
          <div>
            <dt>Registration</dt>
            <dd>
              {profile.registrationMethod === "administrator"
                ? "Site administrator account"
                : profile.registrationMethod === "github" ||
                    (profile.githubLinked &&
                      !profile.email &&
                      !profile.passwordEnabled)
                  ? "GitHub · Social sign-up"
                  : "Email and password"}
            </dd>
          </div>
          <div>
            <dt>GitHub sign-in</dt>
            <dd>{profile.githubLinked ? "Connected" : "Not connected"}</dd>
          </div>
          <div>
            <dt>Username and password sign-in</dt>
            <dd>{profile.passwordEnabled ? "Enabled" : "Not enabled"}</dd>
          </div>
        </dl>
      </section>
    </>
  );
}

function PreferencesPanel({ profile }: { profile: OwnerProfile }) {
  return (
    <>
      <PageHeader
        title="Preferences"
        description="Set your account appearance, timestamp format, and report defaults."
      />
      <AccountPreferencesPanel profile={profile} />
    </>
  );
}

function SecurityPanel({ session }: { session: OwnerSession }) {
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
              <ActiveSessionsPanel profile={session.profile} />
              <p className="owner-muted">
                Time zone: {session.profile.timeZone} · Access:{" "}
                {session.role === "admin" ? "Administrator" : "Client"}
              </p>
              <p className="owner-muted">
                End every session, including this one, if you no longer trust a
                device.
              </p>
              <button
                className="owner-button"
                disabled={busy}
                onClick={() => setConfirmRevoke(true)}
              >
                End all sessions
              </button>
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

function Breakdown({
  title,
  values,
}: {
  title: string;
  values: Record<string, number>;
}) {
  const max = Math.max(1, ...Object.values(values));
  return (
    <section className="owner-card">
      <h2>{title}</h2>
      {Object.keys(values).length ? (
        <dl className="owner-breakdown">
          {Object.entries(values)
            .sort((a, b) => b[1] - a[1])
            .map(([label, count]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{count.toLocaleString()}</dd>
                <span
                  aria-hidden="true"
                  className="owner-bar"
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </div>
            ))}
        </dl>
      ) : (
        <p className="owner-muted">No visits recorded in this period.</p>
      )}
    </section>
  );
}

function StatisticsPanel({
  administration,
  profile,
}: {
  administration: boolean;
  profile: OwnerProfile;
}) {
  const canManageRoles = useOwner()?.session?.canManageRoles;
  const [days, setDays] = useState(profile.reportDays);
  const { data, error, retry } = useResource<QrStatistics>(
    `analytics?days=${days}`
  );
  return (
    <>
      <PageHeader
        title={
          administration ? "Administration" : `Hello, ${profile.displayName}`
        }
        description={
          administration
            ? "Presentation QR statistics and account activity."
            : "Your portfolio workspace, account settings, and presentation activity."
        }
      />
      <div className="owner-actions owner-report-controls">
        <label>
          Report period{" "}
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            {[7, 30, 90].map((n) => (
              <option key={n} value={n}>
                Last {n} days
              </option>
            ))}
          </select>
        </label>
        <button className="owner-button" onClick={retry}>
          Refresh
        </button>
      </div>
      {error ? (
        <Message error>{error}</Message>
      ) : !data ? (
        <section className="owner-card" aria-busy="true">
          <p role="status">Loading presentation statistics…</p>
        </section>
      ) : (
        <>
          <div className="owner-metrics">
            {[
              ["QR-link visits", data.total],
              ["Phone visits", data.devices.phone ?? 0],
              ["Tablet visits", data.devices.tablet ?? 0],
              ["Desktop visits", data.devices.desktop ?? 0],
            ].map(([label, count]) => (
              <section className="owner-card" key={label}>
                <p className="owner-muted">{label}</p>
                <p className="owner-metric">{count.toLocaleString()}</p>
              </section>
            ))}
          </div>
          {!data.total && (
            <section className="owner-card">
              <h2>Your first QR visit will appear here</h2>
              <p className="owner-muted">
                Once collection is enabled, open the presentation through its QR
                code. Refresh this report after about ten seconds.
              </p>
              <Link
                className="owner-text-link"
                to="/coursework/ESL10G/presentation-1"
              >
                Open presentation <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </section>
          )}
          <div className="owner-grid owner-grid--statistics">
            <Breakdown title="Devices" values={data.devices} />
            <Breakdown title="Operating systems" values={data.systems} />
            <Breakdown title="Browsers" values={data.browsers} />
            <section className="owner-card">
              <h2>Visits by day</h2>
              <p className="owner-muted">Dates grouped in UTC.</p>
              {Object.keys(data.daily).length ? (
                <div className="owner-table-scroll">
                  <table className="owner-table">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Visits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(data.daily)
                        .sort((a, b) => b[0].localeCompare(a[0]))
                        .map(([day, count]) => (
                          <tr key={day}>
                            <td>
                              <time dateTime={day}>{day}</time>
                            </td>
                            <td>{count.toLocaleString()}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="owner-muted">
                  No visits recorded in this period.
                </p>
              )}
            </section>
          </div>
          <p className="owner-muted owner-report-note">
            These are anonymous visits through the QR link, not identified
            people or unique visitors. A shared link also counts; device
            categories are approximate. Updated{" "}
            {formatAccountTime(data.generatedAt, profile)}.
          </p>
        </>
      )}
      {administration ? (
        <>
          <SecurityActivityPanel />
          {canManageRoles && <AccountRolesPanel />}
        </>
      ) : (
        <AccountShortcuts items={sections.slice(1)} />
      )}
    </>
  );
}

export default function OwnerPage() {
  const owner = useOwner();
  const path = useLocation().pathname.split("/")[2] ?? "overview";
  if (
    !owner ||
    owner.status === "idle" ||
    (owner.status === "loading" && !owner.session)
  )
    return (
      <div className="owner-workspace">
        <p role="status">Checking account access…</p>
      </div>
    );
  if (path === "mfa")
    return (
      <div className="owner-workspace">
        <MfaChallengePage />
      </div>
    );
  if (
    authPages.includes(path) &&
    (!owner.session ||
      ["verify-email", "reset-password", "reauthenticate"].includes(path))
  )
    return (
      <div className="owner-workspace">
        <AccountAuthPage
          key={path}
          mode={path as Parameters<typeof AccountAuthPage>[0]["mode"]}
        />
      </div>
    );
  if (!owner.session) return <Navigate to="/account/login" replace />;
  const availableSections = sections.filter(
    (s) => s.id !== "administration" || owner.session?.role === "admin"
  );
  if (!availableSections.some((s) => s.id === path))
    return <Navigate to="/account/overview" replace />;
  const { profile } = owner.session;
  return (
    <div className="owner-workspace">
      <nav aria-label="Account sections" className="owner-tabs">
        {availableSections.map((item) => (
          <Link
            className="owner-tab"
            aria-current={path === item.id ? "page" : undefined}
            to={`/account/${item.id}`}
            key={item.id}
          >
            <item.icon size={16} aria-hidden="true" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="owner-content">
        {path === "profile" ? (
          <ProfilePanel profile={profile} />
        ) : path === "preferences" ? (
          <PreferencesPanel profile={profile} />
        ) : path === "security" ? (
          <SecurityPanel session={owner.session} />
        ) : owner.session.role === "client" ? (
          <>
            <PageHeader
              title={`Hello, ${profile.displayName}`}
              description="Your profile, preferences and account security."
            />
            <AccountShortcuts items={availableSections.slice(1)} />
          </>
        ) : (
          <StatisticsPanel
            key={path}
            administration={path === "administration"}
            profile={profile}
          />
        )}
      </div>
    </div>
  );
}
