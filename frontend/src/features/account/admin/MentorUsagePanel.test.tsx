import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import { OwnerContext, type OwnerState } from "../owner-context";
import type { OwnerProfile } from "../owner-api";

import MentorUsagePanel from "./MentorUsagePanel";

const profile: OwnerProfile = {
  displayName: "Serge",
  timeZone: "UTC",
  theme: "system",
  reportDays: 30,
};
const clientId = "123e4567-e89b-42d3-a456-426614174000";
const rootId = "00000000-0000-4000-8000-000000000001";
const report = (disabled: boolean) => ({
  days: 30,
  page: 1,
  generatedAt: "2026-10-06T22:00:00.000Z",
  since: "2026-09-06T22:00:00.000Z",
  totals: {
    requestCount: 2,
    completedCount: 1,
    activeAccounts: 1,
    inputTokens: 24,
    outputTokens: 8,
    tokenReportedCount: 1,
    accountedNeurons: 800,
  },
  entries: [
    {
      id: clientId,
      username: "alex",
      displayName: "Alex",
      email: "alex@example.test",
      role: "client",
      requestCount: 2,
      completedCount: 1,
      inputTokens: 24,
      outputTokens: 8,
      tokenReportedCount: 1,
      accountedNeurons: 800,
      lastUsedAt: "2026-10-06T21:00:00.000Z",
      disabledAt: disabled ? "2026-10-06T22:00:00.000Z" : null,
    },
    {
      id: rootId,
      username: "sergehall",
      displayName: "Serge",
      email: null,
      role: "admin",
      requestCount: 0,
      completedCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      tokenReportedCount: 0,
      accountedNeurons: 0,
      lastUsedAt: null,
      disabledAt: null,
    },
  ],
  hasMore: false,
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("shows known token coverage and protects primary admin AI access", async () => {
  let disabled = false;
  const fetcher = vi.fn(async (_url: string, options: RequestInit) => {
    if (options.method === "PUT") {
      disabled = true;
      return new Response(JSON.stringify({ enabled: false }));
    }
    return new Response(JSON.stringify(report(disabled)));
  });
  vi.stubGlobal("fetch", fetcher);
  const owner: OwnerState = {
    session: {
      role: "admin",
      canManageRoles: true,
      issuedAt: "2026-10-06T21:00:00.000Z",
      expiresAt: "2026-10-06T23:00:00.000Z",
      profile,
    },
    status: "authenticated",
    error: "",
    refresh: vi.fn(),
    logout: vi.fn(),
    clear: vi.fn(),
  };
  render(
    <OwnerContext.Provider value={owner}>
      <MentorUsagePanel profile={profile} />
    </OwnerContext.Provider>
  );
  expect(
    await screen.findByText("1 of 2 requests included token counts.", {
      exact: false,
    })
  ).toBeInTheDocument();
  expect(screen.getAllByText("24 / 8")).toHaveLength(2);
  expect(
    screen.queryByRole("button", { name: "Disable AI for sergehall" })
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Disable AI for alex" }));
  expect(
    screen.getByText(
      /New requests will stop and an active response will be cancelled/
    )
  ).toBeInTheDocument();
  fireEvent.click(
    screen.getByRole("button", { name: "Confirm AI access change" })
  );
  await waitFor(() =>
    expect(
      screen.getByRole("button", { name: "Enable AI for alex" })
    ).toBeInTheDocument()
  );
  const put = fetcher.mock.calls.find(
    ([, options]) => options.method === "PUT"
  );
  expect(put?.[0]).toContain(
    `/api/mentor/admin/accounts/${clientId}/generation`
  );
  expect(JSON.parse(String(put?.[1].body))).toEqual({ enabled: false });
});
