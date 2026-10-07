import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import MentorWorkspace from "./MentorWorkspace";

const conversationId = "b22995a5-9e7e-4a22-818b-6cf043e534ac";
const milestone = {
  id: "step-1",
  week: 1,
  title: "Build a page",
  doneWhen: "Show the result",
  hours: 2,
  sourceIds: ["course:CS56"],
};

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("saved mentor journey", () => {
  it("saves onboarding, streams a draft, and accepts a path through private APIs", async () => {
    const calls: string[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, options: RequestInit) => {
        const path = new URL(url, "http://localhost").pathname;
        const method = options.method ?? "GET";
        calls.push(`${method} ${path}`);
        if (path.endsWith("/bootstrap"))
          return Response.json({
            profile: null,
            pathway: null,
            proposal: null,
            conversations: [],
            previewEnabled: false,
            generationEnabled: true,
            limits: {
              dailyRemaining: 15,
              minuteRemaining: 5,
              resetAt: "2026-10-07T00:00:00Z",
            },
          });
        if (path.endsWith("/profile") && method === "PUT")
          return Response.json({
            ...JSON.parse(String(options.body)),
            version: 1,
          });
        if (path.endsWith("/conversations") && method === "POST")
          return Response.json({
            id: conversationId,
            title: "Build my plan",
            updated_at: "2026-10-06T00:00:00Z",
          });
        if (path.endsWith(`/conversations/${conversationId}/messages`))
          return new Response(
            [
              'event: accepted\ndata: {"event":"accepted","generationId":"g","userMessageId":"u"}\n\n',
              'event: progress\ndata: {"event":"progress","stage":"planning"}\n\n',
              'event: completed\ndata: {"event":"completed","messageId":"a","proposalId":"p","remaining":14}\n\n',
            ].join(""),
            { headers: { "Content-Type": "text/event-stream" } }
          );
        if (path.endsWith("/proposals/p") && method === "GET")
          return Response.json({
            id: "p",
            base_revision: 0,
            profile_version: 1,
            content: [milestone],
            metadata: {
              goal: "frontend",
              rationale: "Start small.",
              assumptions: [],
              sources: [
                {
                  sourceId: "course:CS56",
                  title: "Coursework",
                  href: "/coursework",
                },
              ],
            },
          });
        if (path.endsWith("/proposals/p/accept") && method === "POST")
          return Response.json({
            id: "path",
            version: 1,
            revisionId: "revision",
            milestones: [milestone],
            progress: [
              { milestone_id: "step-1", status: "pending", version: 1 },
            ],
          });
        throw new Error(`Unexpected request ${method} ${path}`);
      })
    );
    render(
      <MemoryRouter>
        <MentorWorkspace sample={false} onExpire={vi.fn()} />
      </MemoryRouter>
    );
    fireEvent.click(
      await screen.findByRole("button", { name: "Find my starting point" })
    );
    fireEvent.click(
      await screen.findByRole("button", { name: "Build my four-week plan" })
    );
    expect(
      await screen.findByRole("button", { name: /Accept this path/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Download draft (.md)" })
    ).toBeInTheDocument();
    expect(screen.getByText(/14 AI requests left today/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Accept this path/ }));
    await waitFor(() =>
      expect(
        screen.getByText("Path saved to your account.")
      ).toBeInTheDocument()
    );
    expect(screen.getByText("Build a page")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Download plan (.md)" })
    ).toBeInTheDocument();
    expect(calls).toEqual(
      expect.arrayContaining([
        "PUT /api/mentor/profile",
        "POST /api/mentor/conversations",
        `POST /api/mentor/conversations/${conversationId}/messages`,
        "GET /api/mentor/proposals/p",
        "POST /api/mentor/proposals/p/accept",
      ])
    );
  });
});
