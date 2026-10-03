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

it("loads one page near the scroll end and waits for explicit retry after failure", async () => {
  let finish!: (response: Response) => void;
  const fetcher = vi
    .fn()
    .mockResolvedValueOnce(response([1, 2, 3, 4, 5].map(entry), "older"))
    .mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          finish = resolve;
        })
    )
    .mockResolvedValueOnce(response([entry(6)], null));
  vi.stubGlobal("fetch", fetcher);
  render(<ActiveSessionsPanel profile={profile} />);
  await screen.findByText("5 active sessions loaded");
  const list = screen.getByRole("region", { name: "Session list" });
  expect(list).toHaveAttribute("tabindex", "0");
  Object.defineProperties(list, {
    scrollHeight: { value: 800 },
    clientHeight: { value: 400 },
    scrollTop: { value: 350, writable: true },
  });
  fireEvent.scroll(list);
  fireEvent.scroll(list);
  expect(fetcher).toHaveBeenCalledTimes(2);
  finish(new Response("{}", { status: 503 }));
  await screen.findByRole("alert");
  fireEvent.scroll(list);
  expect(fetcher).toHaveBeenCalledTimes(2);
  fireEvent.click(screen.getByRole("button", { name: "Retry loading more" }));
  await screen.findByText("6 active sessions loaded");
  expect(fetcher.mock.calls[1][0]).toBe(fetcher.mock.calls[2][0]);
});

it("filters the full server result and ignores an old page after changing filters", async () => {
  let finish!: (response: Response) => void;
  const fetcher = vi
    .fn()
    .mockResolvedValueOnce(response([1, 2, 3, 4, 5].map(entry), "old-cursor"))
    .mockImplementationOnce(
      () =>
        new Promise<Response>((resolve) => {
          finish = resolve;
        })
    )
    .mockResolvedValueOnce(
      response([{ ...entry(20), device: "phone" }], "phone-cursor")
    )
    .mockResolvedValueOnce(response([{ ...entry(21), device: "phone" }], null))
    .mockResolvedValueOnce(response([entry(1)], null));
  vi.stubGlobal("fetch", fetcher);
  render(<ActiveSessionsPanel profile={profile} />);
  fireEvent.click(await screen.findByRole("button", { name: "Load 5 more" }));
  fireEvent.change(screen.getByLabelText("Device"), {
    target: { value: "phone" },
  });
  await screen.findByText("1 matching active session loaded");
  finish(response([entry(6)], null));
  await waitFor(() => expect(screen.getAllByRole("listitem")).toHaveLength(1));
  expect(new URL(fetcher.mock.calls[2][0]).searchParams.toString()).toBe(
    "device=phone"
  );
  fireEvent.click(screen.getByRole("button", { name: "Load 5 more" }));
  await screen.findByText("2 matching active sessions loaded");
  expect(new URL(fetcher.mock.calls[3][0]).searchParams.toString()).toBe(
    "device=phone&cursor=phone-cursor"
  );
  fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
  await screen.findByText("1 active session loaded");
  expect(new URL(fetcher.mock.calls[4][0]).search).toBe("");
});

it("combines device and sign-in filters and reports no matching sessions", async () => {
  const fetcher = vi
    .fn()
    .mockImplementation(() => Promise.resolve(response([], null)));
  vi.stubGlobal("fetch", fetcher);
  render(<ActiveSessionsPanel profile={profile} />);
  await screen.findByText("No active sessions on this page.");
  fireEvent.change(screen.getByLabelText("Device"), {
    target: { value: "tablet" },
  });
  await screen.findByText("No active sessions match these filters.");
  fireEvent.change(screen.getByLabelText("Sign-in method"), {
    target: { value: "password" },
  });
  await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(3));
  expect(new URL(fetcher.mock.calls[2][0]).searchParams.toString()).toBe(
    "device=tablet&authMethod=password"
  );
  expect(
    screen.queryByText("All active sessions loaded")
  ).not.toBeInTheDocument();
});
