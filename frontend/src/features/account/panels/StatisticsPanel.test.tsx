import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { OwnerContext, type OwnerState } from "../owner-context";
import type { OwnerProfile } from "../owner-api";

import { StatisticsPanel } from "./StatisticsPanel";

vi.mock("../admin/MentorUsagePanel", () => ({
  default: () => <p>AI report loaded</p>,
}));
vi.mock("./QrReportPanel", () => ({
  default: () => <p>QR report loaded</p>,
}));
vi.mock("../SecurityActivityPanel", () => ({
  default: () => <p>Security activity loaded</p>,
}));
vi.mock("../AccountRolesPanel", () => ({
  default: () => <p>Account roles loaded</p>,
}));

const profile: OwnerProfile = {
  displayName: "Serge",
  timeZone: "UTC",
  theme: "system",
  reportDays: 30,
};

afterEach(() => vi.unstubAllGlobals());

function mockSummaries() {
  const fetcher = vi.fn(async (url: string) => {
    if (url.includes("/api/mentor/admin/usage"))
      return new Response(
        JSON.stringify({
          days: 30,
          page: 1,
          generatedAt: "2026-10-06T22:00:00.000Z",
          since: "2026-09-06T22:00:00.000Z",
          totals: {
            requestCount: 8,
            completedCount: 6,
            activeAccounts: 2,
            inputTokens: 100,
            outputTokens: 80,
            tokenReportedCount: 6,
            accountedNeurons: 2400,
          },
          entries: [],
          hasMore: false,
        })
      );
    if (url.includes("/api/account/analytics?"))
      return new Response(
        JSON.stringify({
          campaign: "esl10g-presentation-1",
          days: 30,
          total: 23,
          daily: {},
          devices: {},
          systems: {},
          browsers: {},
          generatedAt: "2026-10-06T22:00:00.000Z",
        })
      );
    if (url.includes("/api/account/audit?"))
      return new Response(JSON.stringify({ entries: [], nextCursor: null }));
    if (url.includes("/api/account/accounts"))
      return new Response(
        JSON.stringify([
          {
            id: "client-id",
            username: "alex",
            displayName: "Alex",
            role: "client",
            email: null,
            createdAt: "2026-10-06T22:00:00.000Z",
          },
          {
            id: "admin-id",
            username: "serge",
            displayName: "Serge",
            role: "admin",
            email: null,
            createdAt: "2026-10-06T22:00:00.000Z",
          },
        ])
      );
    throw new Error(`Unexpected summary URL: ${url}`);
  });
  vi.stubGlobal("fetch", fetcher);
  return fetcher;
}

function show(path: string, canManageRoles = true) {
  const owner: OwnerState = {
    session: {
      role: "admin",
      canManageRoles,
      profile,
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    },
    status: "authenticated",
    error: "",
    refresh: vi.fn(),
    logout: vi.fn(),
    clear: vi.fn(),
  };
  render(
    <MemoryRouter initialEntries={[path]}>
      <OwnerContext.Provider value={owner}>
        <Routes>
          <Route
            path="/account/*"
            element={<StatisticsPanel profile={profile} />}
          />
        </Routes>
      </OwnerContext.Provider>
    </MemoryRouter>
  );
}

describe("Administration navigation", () => {
  it("opens an overview with direct links and loads one section at a time", async () => {
    const user = userEvent.setup();
    const fetcher = mockSummaries();
    show("/account/administration");

    const nav = screen.getByRole("navigation", {
      name: "Administration sections",
    });
    expect(within(nav).getByRole("link", { name: "Overview" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(
      screen.getByRole("link", { name: /About this QR report/i })
    ).toHaveAttribute("href", "/account/administration/qr-report");
    expect(await screen.findByText("8 AI requests")).toBeInTheDocument();
    expect(await screen.findByText("23 QR-link visits")).toBeInTheDocument();
    expect(await screen.findByText("No denied activity")).toBeInTheDocument();
    expect(await screen.findByText("1 client · 1 admin")).toBeInTheDocument();
    expect(fetcher).toHaveBeenCalledTimes(4);

    await user.click(within(nav).getByRole("link", { name: "AI Mentor" }));
    expect(screen.getByText("AI report loaded")).toBeInTheDocument();
    expect(screen.queryByText("QR report loaded")).not.toBeInTheDocument();
    expect(
      within(nav).getByRole("link", { name: "AI Mentor" })
    ).toHaveAttribute("aria-current", "page");

    await user.click(within(nav).getByRole("link", { name: "QR report" }));
    expect(screen.getByText("QR report loaded")).toBeInTheDocument();
    expect(screen.queryByText("AI report loaded")).not.toBeInTheDocument();

    await user.click(
      within(nav).getByRole("link", { name: "Security activity" })
    );
    expect(screen.getByText("Security activity loaded")).toBeInTheDocument();

    await user.click(within(nav).getByRole("link", { name: "Account roles" }));
    expect(screen.getByText("Account roles loaded")).toBeInTheDocument();
    expect(fetcher).toHaveBeenCalledTimes(4);
  });

  it("keeps primary-only sections out of secondary administrator navigation", () => {
    const fetcher = mockSummaries();
    show("/account/administration/ai-mentor", false);
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(
      screen.queryByRole("link", { name: "AI Mentor" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Account roles" })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "QR report" })).toBeInTheDocument();
    return waitFor(() => {
      expect(fetcher).toHaveBeenCalledTimes(2);
      expect(
        fetcher.mock.calls.every(
          ([url]) =>
            !url.includes("/api/mentor/admin/usage") &&
            !url.includes("/api/account/accounts")
        )
      ).toBe(true);
    });
  });
});
