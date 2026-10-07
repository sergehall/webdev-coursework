import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import AccountMentorCard from "./AccountMentorCard";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function show(summary: unknown, status = 200) {
  const fetcher = vi.fn(async () => Response.json(summary, { status }));
  vi.stubGlobal("fetch", fetcher);
  render(
    <MemoryRouter>
      <AccountMentorCard />
    </MemoryRouter>
  );
  return fetcher;
}

describe("client AI pathway navigation", () => {
  it("invites a learner without a plan to start one", async () => {
    const fetcher = show({
      version: 0,
      total: 0,
      completed: 0,
      draftReady: false,
    });
    expect(
      await screen.findByRole("link", { name: "Create my learning plan" })
    ).toHaveAttribute("href", "/web-developer-path/mentor");
    expect(screen.getByText("Start your learning path")).toBeInTheDocument();
    expect(fetcher).toHaveBeenCalledWith(
      expect.stringContaining("/api/mentor/pathway/summary"),
      expect.objectContaining({ credentials: "include", cache: "no-store" })
    );
  });

  it("shows saved progress and prioritizes a draft for review", async () => {
    show({ version: 2, total: 8, completed: 3, draftReady: true });
    expect(
      await screen.findByRole("link", { name: "Review my draft" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/3 of 8 steps marked done by you/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/current path stays active until you accept/)
    ).toBeInTheDocument();
  });

  it("links straight to an accepted path when no draft is pending", async () => {
    show({ version: 1, total: 8, completed: 2, draftReady: false });
    expect(
      await screen.findByRole("link", { name: "Continue my path" })
    ).toHaveAttribute("href", "/web-developer-path/mentor");
    expect(screen.getByText(/2 of 8 steps marked done/)).toBeInTheDocument();
  });

  it("does not claim a plan exists when its private status is unavailable", async () => {
    show({ code: "MENTOR_DISABLED" }, 503);
    await waitFor(() =>
      expect(screen.getByText(/temporarily unavailable/)).toBeInTheDocument()
    );
    expect(
      screen.queryByRole("link", { name: /my path|learning plan|draft/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Open AI Pathway" })
    ).toHaveAttribute("href", "/web-developer-path/mentor");
  });
});
