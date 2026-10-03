import { cleanup, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";

import AccountOverviewPanel from "./AccountOverviewPanel";
import type { OwnerSession } from "./owner-api";

const session: OwnerSession = {
  role: "client",
  authMethod: "github",
  mfaEnabled: false,
  issuedAt: "2026-10-02T08:30:00Z",
  expiresAt: "2026-10-02T09:30:00Z",
  profile: {
    displayName: "Alex",
    username: "alex",
    email: null,
    passwordEnabled: false,
    githubLinked: true,
    githubUsername: "alex-dev",
    theme: "system",
    timeZone: "America/Los_Angeles",
    dateFormat: "iso",
    clockFormat: "24h",
    reportDays: 30,
  },
};

function show(value: OwnerSession) {
  render(
    <MemoryRouter>
      <AccountOverviewPanel session={value} />
    </MemoryRouter>
  );
}
afterEach(cleanup);

describe("Account overview", () => {
  it("guides a GitHub-only account to recovery and two-factor settings", () => {
    show(session);
    expect(screen.getByText("No email linked")).toBeInTheDocument();
    expect(screen.getByText("@alex-dev")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Add recovery email" })
    ).toHaveAttribute("href", "/account/security#overview");
    expect(
      screen.getByRole("link", { name: "Two-factor settings" })
    ).toHaveAttribute("href", "/account/security#mfa");
    expect(
      screen.queryByRole("link", { name: "Confirm email" })
    ).not.toBeInTheDocument();
    const current = screen.getByRole("region", { name: "Current session" });
    expect(within(current).getByText("GitHub")).toBeInTheDocument();
    expect(within(current).getByText("2026-10-02, 01:30")).toHaveAttribute(
      "datetime",
      session.issuedAt
    );
    expect(within(current).getByText("2026-10-02, 02:30")).toHaveAttribute(
      "datetime",
      session.expiresAt
    );
  });

  it("shows unknown security data explicitly without inventing setup reminders", () => {
    show({
      ...session,
      mfaEnabled: undefined,
      authMethod: "unknown",
      profile: {
        ...session.profile,
        email: undefined,
        passwordEnabled: undefined,
        githubLinked: undefined,
      },
    });
    const security = screen.getByRole("region", {
      name: "Sign-in & protection",
    });
    expect(within(security).getAllByText("Not available")).toHaveLength(3);
    expect(screen.getByText("Method not recorded")).toBeInTheDocument();
    expect(screen.queryByText("@alex-dev")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Add recovery email" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Two-factor settings" })
    ).not.toBeInTheDocument();
  });

  it("offers email confirmation only when the loaded address is unconfirmed", () => {
    show({
      ...session,
      mfaEnabled: true,
      profile: {
        ...session.profile,
        email: "alex@example.test",
        emailVerified: false,
      },
    });
    expect(screen.getByText("Confirmation needed")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Confirm email" })).toHaveAttribute(
      "href",
      "/account/resend-verification"
    );
    expect(
      screen.queryByRole("link", { name: "Add recovery email" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Two-factor settings" })
    ).not.toBeInTheDocument();
  });
});
