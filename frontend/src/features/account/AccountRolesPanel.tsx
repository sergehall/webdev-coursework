import { useEffect, useState } from "react";

import { ownerRequest } from "./owner-api";
import { parseAccounts } from "./owner-contracts";
type Entry = {
  id: string;
  username: string;
  displayName: string;
  role: "admin" | "client";
  email: string | null;
  createdAt: string;
};
export default function AccountRolesPanel() {
  const [entries, setEntries] = useState<Entry[]>([]),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [busy, setBusy] = useState(false),
    [selected, setSelected] = useState<Entry | null>(null);
  async function load() {
    setLoading(true);
    setError("");
    try {
      setEntries(
        await ownerRequest<Entry[]>("accounts", {
          parseResponse: parseAccounts,
        })
      );
    } catch {
      setError("Unable to load accounts.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load();
  }, []);
  async function change() {
    if (!selected) return;
    setBusy(true);
    setError("");
    try {
      await ownerRequest(`accounts/${selected.id}/role`, {
        method: "PUT",
        body: { role: selected.role === "client" ? "admin" : "client" },
      });
      setSelected(null);
      await load();
    } catch {
      setError("Unable to change this role. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="owner-card" aria-labelledby="account-roles-title">
      <h2 id="account-roles-title">Clients and administrators</h2>
      <p className="owner-muted">
        New accounts are clients. Only your primary administrator account can
        change roles. A role change ends that account’s existing sessions.
        Showing the latest 100 accounts.
      </p>
      {error && (
        <p role="alert" className="owner-message owner-message--error">
          {error}
        </p>
      )}
      {loading && <p role="status">Loading accounts…</p>}
      {!loading && error && !entries.length && (
        <button className="owner-button" onClick={() => void load()}>
          Retry
        </button>
      )}
      {!loading && !error && !entries.length && (
        <p className="owner-muted">No accounts found.</p>
      )}
      {!!entries.length && (
        <div className="owner-table-scroll">
          <table className="owner-table">
            <thead>
              <tr>
                <th scope="col">Account</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <strong>{entry.displayName}</strong>
                    <br />
                    <small>{entry.username}</small>
                  </td>
                  <td>
                    <span className="owner-admin-badge">
                      {entry.role === "admin" ? "Admin" : "Client"}
                    </span>
                  </td>
                  <td>
                    {entry.id === "00000000-0000-4000-8000-000000000001" ? (
                      "Primary admin"
                    ) : (
                      <button
                        className="owner-button"
                        disabled={busy || loading}
                        onClick={() => setSelected(entry)}
                      >
                        {entry.role === "client" ? "Make admin" : "Make client"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selected && (
        <div
          className="owner-message"
          role="group"
          aria-label="Confirm role change"
        >
          <p>
            Change {selected.username} to{" "}
            {selected.role === "client" ? "admin" : "client"}?
          </p>
          <div className="owner-actions">
            <button
              className="owner-button"
              disabled={busy}
              onClick={() => setSelected(null)}
            >
              Cancel
            </button>
            <button
              className="owner-button owner-button--primary"
              disabled={busy}
              onClick={() => void change()}
            >
              {busy ? "Saving…" : "Confirm role change"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
