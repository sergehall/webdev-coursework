import { useEffect, useRef, useState } from "react";

import { ownerRequest } from "./owner-api";
import { useOwnerResource } from "./application/useOwnerResource";
import AdminPagination from "./admin/AdminPagination";
import { parseAccountPage } from "./owner-contracts";
type Entry = {
  id: string;
  username: string;
  displayName: string;
  role: "admin" | "client";
  email: string | null;
  createdAt: string;
};
export default function AccountRolesPanel() {
  const [page, setPage] = useState(1);
  const [draftSearch, setDraftSearch] = useState("");
  const [search, setSearch] = useState("");
  const [actionError, setActionError] = useState("");
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState<Entry | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (selected && dialog.current && !dialog.current.open)
      dialog.current.showModal();
  }, [selected]);
  const params = new URLSearchParams({ page: String(page) });
  if (search) params.set("search", search);
  const path = `accounts/page?${params}`;
  const { data, error, retry } = useOwnerResource<{
    entries: Entry[];
    page: number;
    hasMore: boolean;
  }>(path, parseAccountPage);
  const entries = data?.entries ?? [];
  const loading = !data && !error;

  function applySearch(value: string) {
    const next = value.trim();
    setSelected(null);
    setActionError("");
    setPage(1);
    if (next === search && page === 1) retry();
    else setSearch(next);
  }

  async function change() {
    if (!selected) return;
    setBusy(true);
    setActionError("");
    try {
      await ownerRequest(`accounts/${selected.id}/role`, {
        method: "PUT",
        body: { role: selected.role === "client" ? "admin" : "client" },
      });
      setSelected(null);
      retry();
    } catch {
      setActionError("Unable to change this role. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="owner-card" aria-labelledby="account-roles-title">
      <h2 id="account-roles-title">Clients and administrators</h2>
      <form
        className="owner-admin-account-search"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          applySearch(draftSearch);
        }}
      >
        <label>
          Search users
          <input
            type="search"
            value={draftSearch}
            maxLength={80}
            placeholder="Name, username, or email"
            onChange={(event) => setDraftSearch(event.target.value)}
          />
        </label>
        <button className="owner-button" type="submit" disabled={busy}>
          Search
        </button>
        {(draftSearch || search) && (
          <button
            className="owner-button"
            type="button"
            disabled={busy}
            onClick={() => {
              setDraftSearch("");
              applySearch("");
            }}
          >
            Clear
          </button>
        )}
      </form>
      {error && (
        <p role="alert" className="owner-message owner-message--error">
          Unable to load accounts.
        </p>
      )}
      {actionError && (
        <p role="alert" className="owner-message owner-message--error">
          {actionError}
        </p>
      )}
      {loading && <p role="status">Loading accounts…</p>}
      {!loading && error && !entries.length && (
        <button className="owner-button" onClick={retry}>
          Retry
        </button>
      )}
      {!loading && !error && !entries.length && (
        <p className="owner-muted">
          {search ? `No accounts match “${search}”.` : "No accounts found."}
        </p>
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
                    {entry.email && (
                      <>
                        <br />
                        <small>{entry.email}</small>
                      </>
                    )}
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
      {data && !error && (
        <div className="owner-admin-table-footer">
          <AdminPagination
            page={page}
            hasMore={data.hasMore}
            busy={loading || busy}
            label="Account pages"
            onPrevious={() => setPage((current) => current - 1)}
            onNext={() => setPage((current) => current + 1)}
          />
        </div>
      )}
      {selected && (
        <dialog
          ref={dialog}
          className="owner-dialog owner-role-dialog"
          aria-labelledby="owner-role-dialog-title"
          onCancel={(event) => {
            event.preventDefault();
            if (!busy) setSelected(null);
          }}
          onClose={() => setSelected(null)}
        >
          <h2 id="owner-role-dialog-title">
            Change {selected.username} to{" "}
            {selected.role === "client" ? "admin" : "client"}?
          </h2>
          <div className="owner-actions">
            <button
              className="owner-button"
              disabled={busy}
              autoFocus
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
        </dialog>
      )}
    </section>
  );
}
