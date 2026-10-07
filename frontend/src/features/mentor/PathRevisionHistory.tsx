import { useEffect, useState } from "react";

import { mentorRequest, type SavedPathRevision } from "./mentor-api";

type Page = {
  entries: SavedPathRevision[];
  nextCursor: string | null;
};

export default function PathRevisionHistory({
  currentVersion,
}: {
  currentVersion: number;
}) {
  const [entries, setEntries] = useState<SavedPathRevision[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    void mentorRequest<Page>("pathway/revisions?limit=10")
      .then((page) => {
        if (!active) return;
        setEntries(page.entries);
        setCursor(page.nextCursor);
      })
      .catch(() => {
        if (active) setError("Could not load earlier plans. Try again later.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function loadMore() {
    if (!cursor || loading) return;
    setLoading(true);
    setError("");
    try {
      const page = await mentorRequest<Page>(
        `pathway/revisions?limit=10&cursor=${encodeURIComponent(cursor)}`
      );
      setEntries((previous) => [...previous, ...page.entries]);
      setCursor(page.nextCursor);
    } catch {
      setError("Could not load earlier plans. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const previous = entries.filter((entry) => entry.revision < currentVersion);
  return (
    <div className="mentor-revision-history" aria-label="Earlier paths">
      {previous.length === 0 && !loading && !cursor && !error && (
        <p className="mentor-small mentor-muted">
          No earlier accepted plans yet.
        </p>
      )}
      {previous.map((entry) => {
        const completed = new Set(
          entry.progress_snapshot
            ?.filter((item) => item.status === "done")
            .map((item) => item.milestoneId) ?? []
        );
        return (
          <details key={entry.id}>
            <summary>
              Plan {entry.revision} · {entry.content.length} steps
              {entry.progress_snapshot &&
                ` · ${completed.size} marked done before replacement`}
            </summary>
            {entry.progress_snapshot === null ? (
              <p className="mentor-small mentor-muted">
                Progress before history tracking was unavailable.
              </p>
            ) : (
              <p className="mentor-small mentor-muted">
                Progress saved when this plan was replaced. It does not mark
                steps in your current path complete.
              </p>
            )}
            <ol>
              {entry.content.map((step) => (
                <li key={step.id}>
                  {step.title}
                  {entry.progress_snapshot &&
                    ` — ${completed.has(step.id) ? "Done" : "Not marked done"}`}
                </li>
              ))}
            </ol>
          </details>
        );
      })}
      {error && <p role="alert">{error}</p>}
      {loading && <p role="status">Loading path history…</p>}
      {cursor && !loading && (
        <button className="mentor-button" type="button" onClick={loadMore}>
          Load earlier plans
        </button>
      )}
    </div>
  );
}
