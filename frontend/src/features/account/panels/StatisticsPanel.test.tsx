import { render, screen, within } from "@testing-library/react";
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
    const fetcher = vi.fn();
    vi.stubGlobal("fetch", fetcher);
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
    expect(fetcher).not.toHaveBeenCalled();

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
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("keeps primary-only sections out of secondary administrator navigation", () => {
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
  });
});
