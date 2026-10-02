import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, RefreshCw } from "lucide-react";

import { formatAccountTime } from "./account-time";
import {
  ownerRequest,
  OwnerApiError,
  type ActiveSessionsPage,
  type ActiveSession,
  type OwnerProfile,
} from "./owner-api";
import { useOwner } from "./owner-context";

function sessionsPath(device: string, authMethod: string, cursor?: string) {
  const query = new URLSearchParams();
  if (device) query.set("device", device);
  if (authMethod) query.set("authMethod", authMethod);
  if (cursor) query.set("cursor", cursor);
  return query.size ? `sessions?${query}` : "sessions";
}

export default function ActiveSessionsPanel({
  profile,
  access,
  onEndSessions,
  ending = false,
}: {
  profile: OwnerProfile;
  access?: "admin" | "client";
  onEndSessions?: () => void;
  ending?: boolean;
}) {
  const owner = useOwner();
  const clear = owner?.clear;
  const [entries, setEntries] = useState<ActiveSession[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  const [device, setDevice] = useState("");
  const [authMethod, setAuthMethod] = useState("");
  const filtered = Boolean(device || authMethod);
  const requestId = useRef({ value: 0 });
  const pending = useRef(true);
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // A new filter/refresh replaces the result set; stale pages cannot append to it.
    const requests = requestId.current;
    const id = ++requests.value;
    pending.current = true;
    if (list.current) list.current.scrollTop = 0;
    setBusy(true);
    setError("");
    setEntries([]);
    setCursor(null);
    void ownerRequest<ActiveSessionsPage>(sessionsPath(device, authMethod))
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
        if (requests.value === id) {
          pending.current = false;
          setBusy(false);
        }
      });
    return () => {
      requests.value++;
    };
  }, [revision, clear, device, authMethod]);
  async function more() {
    if (pending.current || !cursor) return;
    pending.current = true;
    const id = ++requestId.current.value;
    setBusy(true);
    setError("");
    try {
      const page = await ownerRequest<ActiveSessionsPage>(
        sessionsPath(device, authMethod, cursor)
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
      if (requestId.current.value === id) {
        pending.current = false;
        setBusy(false);
      }
    }
  }
  return (
    <div className="owner-active-sessions">
      <div className="owner-sessions-heading">
        <div>
          <h3>Active sign-ins</h3>
          <p className="owner-muted">
            Newest first. Five active sessions are loaded at a time. Device
            details are approximate; activity updates about once a minute.
          </p>
        </div>
      </div>
      <section
        className="owner-sessions-summary"
        aria-label="Session information"
      >
        <section
          className="owner-sessions-summary-card"
          aria-labelledby="session-status-title"
        >
          <h4 id="session-status-title">Loaded sessions</h4>
          <p className="owner-muted" aria-live="polite">
            {entries.length} {filtered ? "matching active" : "active"}{" "}
            {entries.length === 1 ? "session" : "sessions"} loaded
          </p>
          {!busy && !error && !cursor && entries.length > 0 && (
            <p className="owner-muted">
              {filtered
                ? "All matching active sessions loaded"
                : "All active sessions loaded"}
            </p>
          )}
          <p className="owner-muted">
            Earlier sign-ins appear when that device next accesses the account.
          </p>
        </section>
        <section
          className="owner-sessions-summary-card"
          aria-labelledby="session-context-title"
        >
          <h4 id="session-context-title">Account context</h4>
          <dl className="owner-sessions-facts">
            <div>
              <dt>Time zone</dt>
              <dd>{profile.timeZone}</dd>
            </div>
            {access && (
              <div>
                <dt>Access</dt>
                <dd>{access === "admin" ? "Administrator" : "Client"}</dd>
              </div>
            )}
          </dl>
        </section>
        <section
          className="owner-sessions-summary-card owner-sessions-action-card"
          aria-labelledby="session-actions-title"
        >
          <h4 id="session-actions-title">Session actions</h4>
          <div className="owner-sessions-actions">
            <button
              type="button"
              className="owner-button owner-session-refresh"
              disabled={busy}
              onClick={() => setRevision((n) => n + 1)}
            >
              <RefreshCw size={16} aria-hidden="true" />
              Refresh sessions
            </button>
            {onEndSessions && (
              <button
                type="button"
                className="owner-button owner-button--danger owner-session-end"
                disabled={ending}
                onClick={onEndSessions}
              >
                <LogOut size={16} aria-hidden="true" />
                End all sessions
              </button>
            )}
          </div>
          {onEndSessions && (
            <p className="owner-muted">
              End every session, including this one, if you no longer trust a
              device.
            </p>
          )}
        </section>
      </section>
      <div className="owner-sessions-filters">
        <label>
          Device
          <span className="owner-session-filter-select">
            <select value={device} onChange={(e) => setDevice(e.target.value)}>
              <option value="">All devices</option>
              <option value="desktop">Desktop</option>
              <option value="phone">Phone</option>
              <option value="tablet">Tablet</option>
              <option value="unknown">Not recorded</option>
            </select>
            <ChevronDown size={16} aria-hidden="true" />
          </span>
        </label>
        <label>
          Sign-in method
          <span className="owner-session-filter-select">
            <select
              value={authMethod}
              onChange={(e) => setAuthMethod(e.target.value)}
            >
              <option value="">All methods</option>
              <option value="github">GitHub</option>
              <option value="password">Username / password</option>
              <option value="unknown">Not recorded</option>
            </select>
            <ChevronDown size={16} aria-hidden="true" />
          </span>
        </label>
        <button
          type="button"
          className="owner-button"
          disabled={!filtered}
          onClick={() => {
            setDevice("");
            setAuthMethod("");
          }}
        >
          Clear filters
        </button>
      </div>
      <p id="sessions-scroll-help" className="owner-muted">
        Scroll the list to load earlier active sign-ins, or use Load 5 more.
      </p>
      <div
        ref={list}
        className="owner-sessions-list"
        role="region"
        aria-label="Session list"
        aria-describedby="sessions-scroll-help"
        tabIndex={0}
        aria-busy={busy}
        onScroll={(e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          if (
            !error &&
            scrollTop > 0 &&
            scrollHeight - scrollTop - clientHeight <= 80
          )
            void more();
        }}
      >
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
        <p className="owner-muted">
          {filtered
            ? "No active sessions match these filters."
            : "No active sessions on this page."}
        </p>
      )}
      <div className="owner-preferences-actions">
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
      </div>
    </div>
  );
}
