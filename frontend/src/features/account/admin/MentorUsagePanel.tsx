import { useEffect, useState } from "react";

import { formatAccountTime } from "../account-time";
import type { OwnerProfile } from "../owner-api";
import { useOwner } from "../owner-context";

import {
  parseMentorUsage,
  type MentorUsageEntry,
  type MentorUsageReport,
} from "./mentor-usage";

import { mentorRequest, MentorApiError } from "@/features/mentor/mentor-api";
import "./mentor-usage.css";

const emptyFilters = {
  search: "",
  role: "all",
  access: "all",
  activity: "all",
};

export default function MentorUsagePanel({
  profile,
}: {
  profile: OwnerProfile;
}) {
  const owner = useOwner();
  const clear = owner?.clear;
  const [days, setDays] = useState<7 | 30>(30);
  const [page, setPage] = useState(1);
  const [draftFilters, setDraftFilters] = useState(emptyFilters);
  const [filters, setFilters] = useState(emptyFilters);
  const [revision, setRevision] = useState(0);
  const [report, setReport] = useState<MentorUsageReport | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState<MentorUsageEntry | null>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let active = true;
    setReport(null);
    setError("");
    const query = new URLSearchParams({
      days: String(days),
      page: String(page),
      ...filters,
    });
    void mentorRequest<unknown>(`admin/usage?${query}`)
      .then((value) => {
        if (active) setReport(parseMentorUsage(value));
      })
      .catch((reason: unknown) => {
        if (!active) return;
        if (reason instanceof MentorApiError && reason.status === 401)
          clear?.();
        else
          setError("Unable to load Mentor usage. Try refreshing the report.");
      });
    return () => {
      active = false;
    };
  }, [days, page, filters, revision, clear]);

  function updateFilter(key: keyof typeof emptyFilters, value: string) {
    setDraftFilters((current) => ({ ...current, [key]: value }));
  }

  function applyFilters() {
    setPage(1);
    setFilters({ ...draftFilters, search: draftFilters.search.trim() });
  }

  async function changeAccess() {
    if (!selected || busy || (!selected.disabledAt && !comment.trim())) return;
    setBusy(true);
    setError("");
    try {
      await mentorRequest(`admin/accounts/${selected.id}/generation`, "PUT", {
        enabled: Boolean(selected.disabledAt),
        ...(!selected.disabledAt ? { comment: comment.trim() } : {}),
      });
      setSelected(null);
      setComment("");
      setRevision((value) => value + 1);
    } catch (reason) {
      if (reason instanceof MentorApiError && reason.status === 401) clear?.();
      else setError("Unable to change AI access. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      className="owner-card owner-mentor-usage"
      aria-labelledby="mentor-usage-title"
    >
      <div className="owner-mentor-usage-header">
        <div>
          <h2 id="mentor-usage-title">AI Pathway Mentor usage</h2>
          <p className="owner-muted">
            Account activity and AI generation controls. Chat content is not
            shown.
          </p>
        </div>
        <div className="owner-actions">
          <label>
            Period{" "}
            <select
              value={days}
              onChange={(event) => {
                setDays(Number(event.target.value) as 7 | 30);
                setPage(1);
              }}
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
            </select>
          </label>
          <button
            className="owner-button"
            onClick={() => setRevision((value) => value + 1)}
          >
            Refresh
          </button>
        </div>
      </div>
      {error && (
        <p className="owner-message owner-message--error" role="alert">
          {error}
        </p>
      )}
      {!report ? (
        !error && <p role="status">Loading Mentor usage…</p>
      ) : (
        <>
          <div className="owner-mentor-usage-metrics">
            <div>
              <span>AI requests</span>
              <strong>{report.totals.requestCount.toLocaleString()}</strong>
            </div>
            <div>
              <span>Active accounts</span>
              <strong>{report.totals.activeAccounts.toLocaleString()}</strong>
            </div>
            <div>
              <span>Reported tokens, in / out</span>
              <strong>
                {report.totals.inputTokens.toLocaleString()} /{" "}
                {report.totals.outputTokens.toLocaleString()}
              </strong>
            </div>
            <div>
              <span>Accounted Neurons</span>
              <strong>{report.totals.accountedNeurons.toLocaleString()}</strong>
            </div>
          </div>
          <p className="owner-muted owner-mentor-usage-note">
            {report.totals.tokenReportedCount} of {report.totals.requestCount}{" "}
            requests included token counts. Neurons are this app’s conservative
            budget accounting, not a Cloudflare bill. Generation records are
            retained for 30 days; all times use {profile.timeZone}. Totals
            include all accounts; filters apply to the table below.
          </p>
          <form
            className="owner-mentor-usage-filters"
            onSubmit={(event) => {
              event.preventDefault();
              applyFilters();
            }}
          >
            <label>
              Find account
              <input
                type="search"
                value={draftFilters.search}
                maxLength={80}
                placeholder="Name, username, or email"
                onChange={(event) => updateFilter("search", event.target.value)}
              />
            </label>
            <label>
              Role
              <select
                value={draftFilters.role}
                onChange={(event) => updateFilter("role", event.target.value)}
              >
                <option value="all">All roles</option>
                <option value="client">Clients</option>
                <option value="admin">Administrators</option>
              </select>
            </label>
            <label>
              AI access
              <select
                value={draftFilters.access}
                onChange={(event) => updateFilter("access", event.target.value)}
              >
                <option value="all">All access</option>
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
            </label>
            <label>
              Activity
              <select
                value={draftFilters.activity}
                onChange={(event) =>
                  updateFilter("activity", event.target.value)
                }
              >
                <option value="all">All accounts</option>
                <option value="used">Used in period</option>
                <option value="never">No requests in period</option>
              </select>
            </label>
            <div className="owner-actions">
              <button className="owner-button" type="submit">
                Apply filters
              </button>
              <button
                className="owner-button"
                type="button"
                onClick={() => {
                  setDraftFilters(emptyFilters);
                  setFilters(emptyFilters);
                  setPage(1);
                }}
              >
                Reset
              </button>
            </div>
          </form>
          <div className="owner-table-scroll owner-mentor-usage-scroll">
            <table className="owner-table owner-mentor-usage-table">
              <thead>
                <tr>
                  <th scope="col">Account</th>
                  <th scope="col">Last request</th>
                  <th scope="col">Requests</th>
                  <th scope="col">Tokens in / out</th>
                  <th scope="col">Neurons</th>
                  <th scope="col">AI access</th>
                </tr>
              </thead>
              <tbody>
                {report.entries.map((entry) => (
                  <tr key={entry.id}>
                    <td>
                      <strong>{entry.displayName}</strong>
                      <br />
                      <small>{entry.username}</small>
                      <br />
                      <small>
                        {entry.role === "admin" ? "Administrator" : "Client"}
                      </small>
                      {entry.email && (
                        <>
                          <br />
                          <small>{entry.email}</small>
                        </>
                      )}
                    </td>
                    <td>
                      {entry.lastUsedAt ? (
                        <time dateTime={entry.lastUsedAt}>
                          {formatAccountTime(entry.lastUsedAt, profile)}
                        </time>
                      ) : (
                        "Never"
                      )}
                    </td>
                    <td>
                      <strong>{entry.requestCount}</strong>
                      {entry.requestCount > 0 && (
                        <>
                          <small className="owner-mentor-usage-detail">
                            {entry.completedCount} completed ·{" "}
                            {entry.failedCount} failed · {entry.cancelledCount}{" "}
                            cancelled
                            {entry.activeCount > 0 &&
                              ` · ${entry.activeCount} active`}
                          </small>
                          <small className="owner-mentor-usage-detail">
                            {entry.chatCount} chat · {entry.planCount} plans
                          </small>
                        </>
                      )}
                    </td>
                    <td>
                      {entry.tokenReportedCount
                        ? `${entry.inputTokens.toLocaleString()} / ${entry.outputTokens.toLocaleString()}`
                        : "Not reported"}
                    </td>
                    <td>{entry.accountedNeurons.toLocaleString()}</td>
                    <td>
                      {entry.id !== "00000000-0000-4000-8000-000000000001" ? (
                        <button
                          className={`owner-button ${entry.disabledAt ? "" : "owner-button--danger owner-mentor-usage-disable"}`}
                          disabled={busy}
                          aria-label={`${entry.disabledAt ? "Enable AI" : "Disable AI"} for ${entry.username}`}
                          onClick={() => {
                            setSelected(entry);
                            setComment("");
                          }}
                        >
                          {entry.disabledAt ? "Enable AI" : "Disable AI"}
                        </button>
                      ) : (
                        "Primary admin"
                      )}
                      {entry.disabledAt && (
                        <small className="owner-mentor-usage-off">
                          Off since{" "}
                          {formatAccountTime(entry.disabledAt, profile)}
                        </small>
                      )}
                      {entry.disabledComment && (
                        <details className="owner-mentor-usage-comment">
                          <summary>Admin comment</summary>
                          <p>{entry.disabledComment}</p>
                        </details>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!report.entries.length && (
            <p className="owner-muted">No accounts match these filters.</p>
          )}
          <div className="owner-actions owner-mentor-usage-pages">
            <button
              className="owner-button"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span>Page {page} · up to 10 accounts per page</span>
            <button
              className="owner-button"
              disabled={!report.hasMore}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
      {selected && (
        <div
          className="owner-message"
          role="group"
          aria-label="Confirm AI access change"
        >
          <p>
            {selected.disabledAt ? "Enable" : "Disable"} AI generation for{" "}
            {selected.username}?
            {selected.disabledAt
              ? " Their saved work will remain available."
              : " New requests will stop and an active response will be cancelled. Saved work remains available."}
          </p>
          {!selected.disabledAt && (
            <div className="owner-mentor-usage-comment-field">
              <label htmlFor="mentor-disable-comment">
                Admin comment for disabling AI
              </label>
              <textarea
                id="mentor-disable-comment"
                value={comment}
                maxLength={500}
                required
                rows={3}
                placeholder="Explain why access is being disabled"
                onChange={(event) => setComment(event.target.value)}
              />
              <small>Visible only to the primary administrator.</small>
            </div>
          )}
          <div className="owner-actions">
            <button
              className="owner-button"
              disabled={busy}
              onClick={() => {
                setSelected(null);
                setComment("");
              }}
            >
              Cancel
            </button>
            <button
              className={`owner-button ${selected.disabledAt ? "owner-button--primary" : "owner-button--danger owner-mentor-usage-disable"}`}
              disabled={busy || (!selected.disabledAt && !comment.trim())}
              onClick={() => void changeAccess()}
            >
              {busy ? "Saving…" : "Confirm AI access change"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
