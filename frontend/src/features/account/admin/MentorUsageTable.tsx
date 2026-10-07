import { formatAccountTime } from "../account-time";
import type { OwnerProfile } from "../owner-api";

import type { MentorUsageEntry } from "./mentor-usage";

export default function MentorUsageTable({
  entries,
  days,
  profile,
  busy,
  onSelectAccount,
}: {
  entries: readonly MentorUsageEntry[];
  days: 7 | 30;
  profile: OwnerProfile;
  busy: boolean;
  onSelectAccount: (entry: MentorUsageEntry) => void;
}) {
  return (
    <div
      className="owner-table-scroll owner-mentor-usage-scroll"
      role="region"
      aria-label="AI usage by account"
      tabIndex={0}
    >
      <table className="owner-table owner-mentor-usage-table">
        <caption className="sr-only">
          AI usage by account for the last {days} days
        </caption>
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
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>
                <div className="owner-mentor-usage-identity">
                  <strong>{entry.displayName}</strong>
                  <span className="owner-admin-badge">
                    {entry.role === "admin" ? "Admin" : "Client"}
                  </span>
                </div>
                {entry.username !== entry.displayName && (
                  <small className="owner-mentor-usage-detail">
                    {entry.username}
                  </small>
                )}
                {entry.email && (
                  <small className="owner-mentor-usage-detail">
                    {entry.email}
                  </small>
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
                <div className="owner-mentor-usage-request-count">
                  <strong>{entry.requestCount}</strong>
                  {entry.failedCount > 0 && (
                    <span className="owner-admin-badge owner-admin-badge--danger">
                      {entry.failedCount} failed
                    </span>
                  )}
                  {entry.activeCount > 0 && (
                    <span className="owner-admin-badge">
                      {entry.activeCount} active
                    </span>
                  )}
                </div>
                {entry.requestCount > 0 && (
                  <details className="owner-mentor-usage-breakdown">
                    <summary>
                      {entry.chatCount}{" "}
                      {entry.chatCount === 1 ? "chat" : "chats"} ·{" "}
                      {entry.planCount}{" "}
                      {entry.planCount === 1 ? "plan" : "plans"}
                    </summary>
                    <small className="owner-mentor-usage-detail">
                      {entry.completedCount} completed · {entry.failedCount}{" "}
                      failed · {entry.cancelledCount} cancelled
                      {entry.activeCount > 0 &&
                        ` · ${entry.activeCount} active`}
                    </small>
                  </details>
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
                    onClick={() => onSelectAccount(entry)}
                  >
                    {entry.disabledAt ? "Enable AI" : "Disable AI"}
                  </button>
                ) : (
                  <span className="owner-admin-badge">Primary admin</span>
                )}
                {entry.disabledAt && (
                  <small className="owner-mentor-usage-off">
                    Off since {formatAccountTime(entry.disabledAt, profile)}
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
  );
}
