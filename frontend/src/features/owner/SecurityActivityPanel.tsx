import { useEffect, useState } from "react";

import { ownerRequest, OwnerApiError, type AuditEntry } from "./owner-api";
import { useOwner } from "./owner-context";
type Page = {
  entries: (AuditEntry & { eventId: string })[];
  nextCursor: string | null;
};
export default function SecurityActivityPanel() {
  const owner = useOwner();
  const clear = owner?.clear;
  const [filters, setFilters] = useState({
    limit: 10,
    days: 7,
    result: "all",
    group: "all",
  });
  const [cursors, setCursors] = useState([""]),
    [revision, setRevision] = useState(0);
  const [data, setData] = useState<Page | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(true);
  const query = new URLSearchParams({
    ...Object.fromEntries(
      Object.entries(filters).map(([k, v]) => [k, String(v)])
    ),
    ...(cursors.at(-1) ? { cursor: cursors.at(-1)! } : {}),
  }).toString();
  useEffect(() => {
    let active = true;
    setBusy(true);
    setError("");
    setData(null);
    void ownerRequest<Page>(`audit?${query}`)
      .then((value) => {
        if (active) setData(value);
      })
      .catch((err) => {
        if (!active) return;
        if (err instanceof OwnerApiError && err.status === 401) clear?.();
        else
          setError(
            err instanceof Error ? err.message : "Unable to load activity."
          );
      })
      .finally(() => {
        if (active) setBusy(false);
      });
    return () => {
      active = false;
    };
  }, [query, revision, clear]);
  function change(key: keyof typeof filters, value: string) {
    setCursors([""]);
    setFilters((old) => ({
      ...old,
      [key]: key === "days" || key === "limit" ? Number(value) : value,
    }));
  }
  const time = (value: string) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: owner?.session?.profile.timeZone ?? "UTC",
    }).format(new Date(value));
  return (
    <section className="owner-card" aria-labelledby="activity-title">
      <h2 id="activity-title">Security activity</h2>
      <p className="owner-muted">
        Recent account actions and analytics access. Only the selected page is
        loaded. New activity can take a few seconds to appear.
      </p>
      <div className="owner-activity-filters">
        <label>
          Activity period
          <select
            value={filters.days}
            onChange={(e) => change("days", e.target.value)}
          >
            {[
              [1, "Last 24 hours"],
              [7, "Last 7 days"],
              [30, "Last 30 days"],
              [365, "Last year"],
            ].map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Activity result
          <select
            value={filters.result}
            onChange={(e) => change("result", e.target.value)}
          >
            <option value="all">All results</option>
            <option value="allowed">Allowed</option>
            <option value="denied">Denied</option>
          </select>
        </label>
        <label>
          Activity type
          <select
            value={filters.group}
            onChange={(e) => change("group", e.target.value)}
          >
            {[
              ["all", "All actions"],
              ["sign-in", "Sign-in"],
              ["sessions", "Sessions"],
              ["profile", "Profile & preferences"],
              ["security", "Password & session security"],
              ["administration", "Account administration"],
              ["analytics", "Analytics access"],
              ["limits", "Rate limits"],
            ].map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Records per page
          <select
            value={filters.limit}
            onChange={(e) => change("limit", e.target.value)}
          >
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>
      {error && (
        <p role="alert" className="owner-message owner-message--error">
          {error}
        </p>
      )}
      {busy ? (
        <p role="status">Loading activity…</p>
      ) : (
        data && (
          <ul className="owner-audit">
            {data.entries.map((entry) => (
              <li key={entry.eventId}>
                <span>{entry.action}</span>
                <span
                  className={entry.allowed ? "owner-muted" : "owner-denied"}
                >
                  {entry.allowed ? "Allowed" : "Denied"}
                </span>
                <time dateTime={entry.occurredAt}>
                  {time(entry.occurredAt)}
                </time>
              </li>
            ))}
            {!data.entries.length && (
              <li>No activity matches these filters.</li>
            )}
          </ul>
        )
      )}
      <div className="owner-actions owner-activity-pages">
        <button
          className="owner-button"
          disabled={busy || cursors.length === 1}
          onClick={() => setCursors((old) => old.slice(0, -1))}
        >
          Previous page
        </button>
        <span aria-live="polite">Page {cursors.length}</span>
        <button
          className="owner-button"
          disabled={busy || !data?.nextCursor}
          onClick={() => {
            if (data?.nextCursor)
              setCursors((old) => [...old, data.nextCursor!]);
          }}
        >
          Next page
        </button>
        <button
          className="owner-button"
          disabled={busy}
          onClick={() => {
            setCursors([""]);
            setRevision((old) => old + 1);
          }}
        >
          Refresh activity
        </button>
      </div>
    </section>
  );
}
