import { useEffect, useRef, useState } from "react";

import { formatAccountTime } from "./account-time";
import {
  ownerRequest,
  OwnerApiError,
  type ActiveSessionsPage,
  type ActiveSession,
  type OwnerProfile,
} from "./owner-api";
import { useOwner } from "./owner-context";

export default function ActiveSessionsPanel({
  profile,
}: {
  profile: OwnerProfile;
}) {
  const owner = useOwner();
  const clear = owner?.clear;
  const [entries, setEntries] = useState<ActiveSession[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  const requestId = useRef({ value: 0 });
  useEffect(() => {
    const requests = requestId.current;
    const id = ++requests.value;
    setBusy(true);
    setError("");
    setEntries([]);
    setCursor(null);
    void ownerRequest<ActiveSessionsPage>("sessions")
      .then((page) => {
        if (requests.value !== id) return;
        setEntries(page.entries);
        setCursor(page.nextCursor);
      })
      .catch((err) => {
        if (requests.value !== id) return;
        if (err instanceof OwnerApiError && err.status === 401) clear?.();
        else
          setError(
            err instanceof Error ? err.message : "Unable to load sessions."
          );
      })
      .finally(() => {
        if (requests.value === id) setBusy(false);
      });
    return () => {
      requests.value++;
    };
  }, [revision, clear]);
  async function more() {
    if (busy || !cursor) return;
    const id = ++requestId.current.value;
    setBusy(true);
    setError("");
    try {
      const page = await ownerRequest<ActiveSessionsPage>(
        `sessions?${new URLSearchParams({ cursor })}`
      );
      if (requestId.current.value !== id) return;
      setEntries((old) => [
        ...old,
        ...page.entries.filter(
          (item) => !old.some((existing) => existing.id === item.id)
        ),
      ]);
      setCursor(page.nextCursor);
    } catch (err) {
      if (requestId.current.value !== id) return;
      if (err instanceof OwnerApiError && err.status === 401) clear?.();
      else
        setError(
          err instanceof Error ? err.message : "Unable to load more sessions."
        );
    } finally {
      if (requestId.current.value === id) setBusy(false);
    }
  }
  return (
    <div className="owner-active-sessions">
      <div className="owner-sessions-heading">
        <div>
          <h3>Active sign-ins</h3>
          <p className="owner-muted">
            Newest first. Five sessions are loaded at a time. Device details are
            approximate; activity updates about once a minute.
          </p>
        </div>
        <button
          type="button"
          className="owner-button"
          disabled={busy}
          onClick={() => setRevision((n) => n + 1)}
        >
          Refresh sessions
        </button>
      </div>
      <div className="owner-sessions-list" aria-busy={busy}>
        <ul aria-label="Active sessions">
          {entries.map((entry) => (
            <li key={entry.id} className="owner-session-row">
              <div className="owner-session-device">
                <strong>
                  {entry.browser === "Other"
                    ? "Browser not recorded"
                    : entry.browser}{" "}
                  · {entry.os === "Other" ? "OS not recorded" : entry.os}
                </strong>
                {entry.current && (
                  <span className="owner-profile-provider-status">
                    Current session
                  </span>
                )}
                <span className="owner-muted">
                  {entry.device === "unknown"
                    ? "Device not recorded"
                    : entry.device}{" "}
                  ·{" "}
                  {entry.authMethod === "github"
                    ? "GitHub"
                    : entry.authMethod === "password"
                      ? "Username / password"
                      : "Sign-in method not recorded"}
                </span>
              </div>
              <dl className="owner-session-times">
                <div>
                  <dt>Signed in</dt>
                  <dd>
                    <time dateTime={entry.issuedAt}>
                      {formatAccountTime(entry.issuedAt, profile)}
                    </time>
                  </dd>
                </div>
                <div>
                  <dt>Last active</dt>
                  <dd>
                    <time dateTime={entry.lastSeenAt}>
                      {formatAccountTime(entry.lastSeenAt, profile)}
                    </time>
                  </dd>
                </div>
                <div>
                  <dt>Expires</dt>
                  <dd>
                    <time dateTime={entry.expiresAt}>
                      {formatAccountTime(entry.expiresAt, profile)}
                    </time>
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
      {busy && (
        <p role="status" className="owner-muted">
          Loading sessions…
        </p>
      )}
      {error && (
        <p role="alert" className="owner-message owner-message--error">
          {error}
        </p>
      )}
      {!busy && !error && entries.length === 0 && (
        <p className="owner-muted">No active sessions on this page.</p>
      )}
      <p className="owner-muted">
        Earlier sign-ins appear when that device next accesses the account.
      </p>
      <div className="owner-preferences-actions">
        <span className="owner-muted">
          {entries.length} active{" "}
          {entries.length === 1 ? "session" : "sessions"} loaded
        </span>
        {cursor && (
          <button
            type="button"
            className="owner-button"
            disabled={busy}
            onClick={() => void more()}
          >
            {busy ? "Loading…" : error ? "Retry loading more" : "Load 5 more"}
          </button>
        )}
        {!busy && !error && !cursor && entries.length > 0 && (
          <span className="owner-muted">All active sessions loaded</span>
        )}
      </div>
    </div>
  );
}
