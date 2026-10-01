import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import ActiveSessionsPanel from "./ActiveSessionsPanel";
import type { ActiveSession, OwnerProfile } from "./owner-api";
import { OwnerContext, type OwnerState } from "./owner-context";

const profile: OwnerProfile = {
  displayName: "Test",
  timeZone: "UTC",
  theme: "system",
  reportDays: 30,
  dateFormat: "iso",
  clockFormat: "24h",
};
const entry = (id: number): ActiveSession => ({
  id: String(id),
  issuedAt: "2026-10-01T01:00:00Z",
  expiresAt: "2026-10-01T02:00:00Z",
  lastSeenAt: "2026-10-01T01:10:00Z",
  device: "desktop",
  os: "macOS",
  browser: "Chrome",
  authMethod: "github",
  current: id === 1,
});
const response = (entries: ActiveSession[], nextCursor: string | null) =>
  new Response(JSON.stringify({ entries, nextCursor }));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
it("loads five sessions initially and appends the next page only on request", async () => {
  const fetcher = vi
    .fn()
    .mockResolvedValueOnce(response([1, 2, 3, 4, 5].map(entry), "page-two"))
    .mockResolvedValueOnce(response([entry(5), entry(6)], null))
    .mockResolvedValueOnce(response([entry(1)], null));
  vi.stubGlobal("fetch", fetcher);
  render(<ActiveSessionsPanel profile={profile} />);
  await screen.findByText("5 active sessions loaded");
  expect(fetcher).toHaveBeenCalledOnce();
  expect(screen.getAllByRole("listitem")).toHaveLength(5);
  expect(screen.getByText("Current session")).toBeInTheDocument();
  expect(screen.getAllByText("2026-10-01, 01:00")).toHaveLength(5);
  fireEvent.click(screen.getByRole("button", { name: "Load 5 more" }));
  await screen.findByText("All active sessions loaded");
  expect(new URL(fetcher.mock.calls[1][0]).searchParams.get("cursor")).toBe(
    "page-two"
  );
  expect(screen.getAllByRole("listitem")).toHaveLength(6);
  expect(
    screen.queryByRole("button", { name: "Load 5 more" })
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Refresh sessions" }));
  await screen.findByText("1 active session loaded");
  expect(screen.getAllByRole("listitem")).toHaveLength(1);
});
it("keeps loaded sessions after a later page fails and retries the same cursor", async () => {
  const fetcher = vi
    .fn()
    .mockResolvedValueOnce(response([entry(1)], "cursor"))
    .mockResolvedValueOnce(new Response("{}", { status: 503 }))
    .mockResolvedValueOnce(response([entry(2)], null));
  vi.stubGlobal("fetch", fetcher);
  render(<ActiveSessionsPanel profile={profile} />);
  fireEvent.click(await screen.findByRole("button", { name: "Load 5 more" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("not available");
  expect(screen.getAllByRole("listitem")).toHaveLength(1);
  fireEvent.click(screen.getByRole("button", { name: "Retry loading more" }));
  await screen.findByText("2 active sessions loaded");
  expect(fetcher.mock.calls[1][0]).toBe(fetcher.mock.calls[2][0]);
});
it("clears an expired account session", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(new Response("{}", { status: 401 }))
  );
  const clear = vi.fn();
  const owner: OwnerState = {
    session: null,
    status: "authenticated",
    error: "",
    clear,
    refresh: vi.fn(),
    logout: vi.fn(),
  };
  render(
    <OwnerContext.Provider value={owner}>
      <ActiveSessionsPanel profile={profile} />
    </OwnerContext.Provider>
  );
  await waitFor(() => expect(clear).toHaveBeenCalledOnce());
});
