import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useMentorSaved } from "./useMentorSaved";

const conversationId = "b22995a5-9e7e-4a22-818b-6cf043e534ac";
const milestone = {
  id: "step-1",
  week: 1,
  title: "Build a page",
  doneWhen: "Show the result",
  hours: 2,
};
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("saved mentor workspace", () => {
  it("restores the private path and history, then sends a versioned progress update", async () => {
    const calls: {
      url: string;
      method: string;
      credentials: RequestCredentials | undefined;
      body: unknown;
    }[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, options: RequestInit) => {
        const path = new URL(url, "http://localhost").pathname;
        calls.push({
          url: path,
          method: options.method ?? "GET",
          credentials: options.credentials,
          body: options.body ? JSON.parse(String(options.body)) : null,
        });
        if (path.endsWith("/bootstrap"))
          return Response.json({
            profile: {
              goal: "frontend",
              level: "beginner",
              hours: 4,
              outcome: "Portfolio",
              version: 2,
            },
            pathway: {
              id: "path",
              version: 3,
              revisionId: "revision",
              milestones: [milestone],
              progress: [
                { milestone_id: "step-1", status: "pending", version: 7 },
              ],
            },
            proposal: null,
            conversations: [
              {
                id: conversationId,
                title: "First question",
                updated_at: "2026-10-05T00:00:00Z",
              },
            ],
            previewEnabled: true,
            generationEnabled: false,
          });
        if (path.endsWith("/messages"))
          return Response.json({
            entries: [
              {
                id: "message",
                sequence: 1,
                role: "user",
                content: "Where do I start?",
              },
            ],
            nextCursor: null,
          });
        if (path.endsWith("/milestones/step-1"))
          return Response.json({
            milestoneId: "step-1",
            status: "done",
            version: 8,
          });
        throw new Error(`Unexpected path ${path}`);
      })
    );
    const hook = renderHook(() => useMentorSaved(true));
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    expect(hook.result.current.profile?.version).toBe(2);
    expect(hook.result.current.messages[0].text).toBe("Where do I start?");
    expect(hook.result.current.path?.[0].title).toBe("Build a page");
    await act(async () => {
      await hook.result.current.toggleDone("step-1");
    });
    expect(hook.result.current.done).toEqual(["step-1"]);
    expect(calls.at(-1)).toMatchObject({
      method: "PATCH",
      credentials: "include",
      body: { status: "done", expectedVersion: 7, expectedPathVersion: 3 },
    });
  });
});
