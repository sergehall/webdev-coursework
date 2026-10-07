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
      failedCount: 0,
      cancelledCount: 1,
      activeCount: 0,
      chatCount: 2,
      planCount: 0,
      inputTokens: 24,
      outputTokens: 8,
      tokenReportedCount: 1,
      accountedNeurons: 800,
      lastUsedAt: "2026-10-06T21:00:00.000Z",
      disabledAt: disabled ? "2026-10-06T22:00:00.000Z" : null,
      disabledComment: disabled ? "Repeated automated requests" : null,
    },
    {
      id: rootId,
      username: "sergehall",
      displayName: "Serge",
      email: null,
      role: "admin",
      requestCount: 0,
      completedCount: 0,
      failedCount: 0,
      cancelledCount: 0,
      activeCount: 0,
      chatCount: 0,
      planCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      tokenReportedCount: 0,
      accountedNeurons: 0,
      lastUsedAt: null,
      disabledAt: null,
      disabledComment: null,
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
  const disable = screen.getByRole("button", { name: "Disable AI for alex" });
  expect(disable).toHaveTextContent(/^Disable AI$/);
  expect(disable).toHaveClass("owner-button--danger");
  fireEvent.click(disable);
  expect(
    screen.getByText(
      /New requests will stop and an active response will be cancelled/
    )
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Confirm AI access change" })
  ).toBeDisabled();
  fireEvent.change(
    screen.getByRole("textbox", { name: "Admin comment for disabling AI" }),
    { target: { value: "Repeated automated requests" } }
  );
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
  expect(JSON.parse(String(put?.[1].body))).toEqual({
    enabled: false,
    comment: "Repeated automated requests",
  });
  expect(await screen.findByText("Admin comment")).toBeInTheDocument();

  fireEvent.change(screen.getByRole("searchbox", { name: "Find account" }), {
    target: { value: "alex@example.test" },
  });
  fireEvent.change(screen.getByRole("combobox", { name: "Role" }), {
    target: { value: "client" },
  });
  fireEvent.change(screen.getByRole("combobox", { name: "AI access" }), {
    target: { value: "disabled" },
  });
  fireEvent.change(screen.getByRole("combobox", { name: "Activity" }), {
    target: { value: "used" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Apply filters" }));
  await waitFor(() => {
    const gets = fetcher.mock.calls.filter(
      ([, options]) => options.method === "GET"
    );
    const query = new URL(String(gets.at(-1)?.[0]), "http://localhost")
      .searchParams;
    expect(query.get("search")).toBe("alex@example.test");
    expect(query.get("role")).toBe("client");
    expect(query.get("access")).toBe("disabled");
    expect(query.get("activity")).toBe("used");
  });
});

it("shows ten accounts before Next requests the following page", async () => {
  const fetcher = vi.fn(async (url: string) => {
    const page = Number(
      new URL(url, "http://localhost").searchParams.get("page")
    );
    const sample = report(false).entries[0];
    return new Response(
      JSON.stringify({
        ...report(false),
        page,
        hasMore: page === 1,
        entries: Array.from({ length: page === 1 ? 10 : 1 }, (_, index) => ({
          ...sample,
          id: `123e4567-e89b-42d3-a456-${String(page * 10 + index).padStart(12, "0")}`,
          username: `client-${page}-${index}`,
        })),
      })
    );
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
  await screen.findByText("client-1-9");
  expect(screen.getAllByRole("row")).toHaveLength(11);
  expect(
    screen.getByRole("navigation", { name: "AI usage pages" })
  ).toHaveTextContent("Page 1");
  expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
  expect(
    screen.queryByText(/up to 10 accounts per page/)
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Next" }));
  await screen.findByText("client-2-0");
  expect(screen.getAllByRole("row")).toHaveLength(2);
  expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  expect(fetcher.mock.calls.at(-1)?.[0]).toContain("page=2");
  fireEvent.click(screen.getByRole("button", { name: "Previous" }));
  await screen.findByText("client-1-9");
  expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
  expect(fetcher.mock.calls.at(-1)?.[0]).toContain("page=1");
});
