import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import PathRevisionHistory from "./PathRevisionHistory";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("earlier learning paths", () => {
  it("shows archived completion without applying it to the current path", async () => {
    const fetcher = vi.fn(async () =>
      Response.json({
        entries: [
          {
            id: "current",
            revision: 2,
            content: [],
            progress_snapshot: null,
          },
          {
            id: "previous",
            revision: 1,
            content: [
              { id: "old-1", title: "Build a page" },
              { id: "old-2", title: "Style a page" },
            ],
            progress_snapshot: [{ milestoneId: "old-1", status: "done" }],
          },
        ],
        nextCursor: null,
      })
    );
    vi.stubGlobal("fetch", fetcher);
    render(<PathRevisionHistory currentVersion={2} />);
    await waitFor(() =>
      expect(screen.getByText(/Plan 1 · 2 steps/)).toBeInTheDocument()
    );
    expect(screen.queryByText(/Plan 2/)).not.toBeInTheDocument();
    expect(screen.getByText(/Build a page — Done/)).toBeInTheDocument();
    expect(
      screen.getByText(/Style a page — Not marked done/)
    ).toBeInTheDocument();
    expect(fetcher).toHaveBeenCalledWith(
      expect.stringContaining("/api/mentor/pathway/revisions?limit=10"),
      expect.objectContaining({ credentials: "include" })
    );
  });
});
