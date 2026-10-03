import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import AccountPreferencesPanel from "./AccountPreferencesPanel";
import SecurityActivityPanel from "./SecurityActivityPanel";
import { OwnerContext, type OwnerState } from "./owner-context";
import type { OwnerProfile } from "./owner-api";
import { formatAccountTime } from "./account-time";

const profile: OwnerProfile = {
  displayName: "Test",
  timeZone: "UTC",
  theme: "system",
  reportDays: 30,
  dateFormat: "medium",
  clockFormat: "12h",
  activityDays: 30,
  activityPageSize: 25,
};
function state(role: "admin" | "client" = "admin"): OwnerState {
  return {
    session: {
      role,
      issuedAt: "2026-10-01T00:00:00Z",
      expiresAt: "2026-10-02T00:00:00Z",
      profile,
    },
    status: "authenticated",
    error: "",
    refresh: vi.fn().mockResolvedValue(undefined),
    clear: vi.fn(),
    logout: vi.fn(),
  };
}
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("previews and saves real account preferences, and can discard unsaved edits", async () => {
  const fetcher = vi.fn().mockResolvedValue(new Response("{}"));
  vi.stubGlobal("fetch", fetcher);
  const owner = state();
  render(
    <OwnerContext.Provider value={owner}>
      <AccountPreferencesPanel profile={profile} />
    </OwnerContext.Provider>
  );
  expect(
    screen.getByRole("button", { name: "Save preferences" })
  ).toBeDisabled();
  fireEvent.change(screen.getByLabelText("Date format"), {
    target: { value: "iso" },
  });
  fireEvent.change(screen.getByLabelText("Clock format"), {
    target: { value: "24h" },
  });
  expect(screen.getByLabelText("Date and time preview")).toHaveTextContent(
    /^\d{4}-\d{2}-\d{2}, \d{2}:\d{2}$/
  );
  fireEvent.click(screen.getByRole("button", { name: "Discard changes" }));
  expect(screen.getByLabelText("Date format")).toHaveValue("medium");
  expect(
    screen.getByRole("button", { name: "Save preferences" })
  ).toBeDisabled();
  fireEvent.change(screen.getByLabelText("Time zone"), {
    target: { value: "Asia/Tokyo" },
  });
  fireEvent.change(screen.getByLabelText("Default report period"), {
    target: { value: "90" },
  });
  fireEvent.change(screen.getByLabelText("Default records per page"), {
    target: { value: "50" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Save preferences" }));
  expect(await screen.findByText("Preferences saved.")).toBeInTheDocument();
  expect(JSON.parse(fetcher.mock.calls[0][1].body)).toMatchObject({
    timeZone: "Asia/Tokyo",
    reportDays: 90,
    activityDays: 30,
    activityPageSize: 50,
  });
  expect(owner.refresh).toHaveBeenCalledOnce();
});

it("hides administrative defaults for clients and preserves drafts on a failed save", async () => {
  const fetcher = vi
    .fn()
    .mockResolvedValue(new Response("{}", { status: 503 }));
  vi.stubGlobal("fetch", fetcher);
  render(
    <OwnerContext.Provider value={state("client")}>
      <AccountPreferencesPanel profile={profile} />
    </OwnerContext.Provider>
  );
  expect(
    screen.queryByLabelText("Default report period")
  ).not.toBeInTheDocument();
  expect(
    screen.queryByLabelText("Default records per page")
  ).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Clock format"), {
    target: { value: "24h" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Save preferences" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("not available");
  expect(screen.getByLabelText("Clock format")).toHaveValue("24h");
  expect(JSON.parse(fetcher.mock.calls[0][1].body)).not.toHaveProperty(
    "activityPageSize"
  );
});

it("uses saved activity defaults for one server page and lets filters override them", async () => {
  const fetcher = vi
    .fn()
    .mockImplementation(() =>
      Promise.resolve(
        new Response(JSON.stringify({ entries: [], nextCursor: null }))
      )
    );
  vi.stubGlobal("fetch", fetcher);
  render(
    <OwnerContext.Provider value={state()}>
      <SecurityActivityPanel />
    </OwnerContext.Provider>
  );
  await waitFor(() => expect(fetcher).toHaveBeenCalledOnce());
  let query = new URL(fetcher.mock.calls[0][0]).searchParams;
  expect(query.get("days")).toBe("30");
  expect(query.get("limit")).toBe("25");
  fireEvent.change(screen.getByLabelText("Records per page"), {
    target: { value: "10" },
  });
  await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
  query = new URL(fetcher.mock.calls[1][0]).searchParams;
  expect(query.get("limit")).toBe("10");
});

it("formats timestamps in the saved zone without shifting UTC report buckets", () => {
  const timestamp = "2026-10-01T00:30:00Z";
  expect(
    formatAccountTime(timestamp, {
      ...profile,
      timeZone: "America/Los_Angeles",
      dateFormat: "iso",
      clockFormat: "24h",
    })
  ).toBe("2026-09-30, 17:30");
  expect(
    formatAccountTime(timestamp, {
      ...profile,
      timeZone: "Asia/Tokyo",
      dateFormat: "day-first",
      clockFormat: "12h",
    })
  ).toBe("01/10/2026, 09:30 AM");
  expect(
    formatAccountTime(timestamp, {
      ...profile,
      dateFormat: "iso",
      clockFormat: "24h",
    })
  ).toBe("2026-10-01, 00:30");
});
