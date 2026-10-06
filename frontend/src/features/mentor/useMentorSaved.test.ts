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
        if (
          path.endsWith(`/conversations/${conversationId}`) &&
          options.method === "DELETE"
        )
          return Response.json({ deleted: true });
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
    await act(async () => {
      await hook.result.current.deleteConversation(conversationId);
    });
    expect(hook.result.current.conversations).toEqual([]);
    expect(hook.result.current.path?.[0].id).toBe("step-1");
  });

  it("uses the private SSE endpoint for an enabled live chat", async () => {
    const calls: string[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, options: RequestInit) => {
        const path = new URL(url, "http://localhost").pathname;
        calls.push(`${options.method ?? "GET"} ${path}`);
        if (path.endsWith("/bootstrap"))
          return Response.json({
            profile: {
              goal: "frontend",
              level: "beginner",
              hours: 4,
              outcome: "A site",
              version: 1,
            },
            pathway: null,
            proposal: null,
            conversations: [],
            previewEnabled: true,
            generationEnabled: true,
          });
        if (path.endsWith("/conversations") && options.method === "POST")
          return Response.json({
            id: conversationId,
            title: "CSS",
            updated_at: "2026-10-05T00:00:00Z",
          });
        if (
          path.endsWith(`/conversations/${conversationId}/messages`) &&
          options.method === "POST"
        ) {
          expect(options.credentials).toBe("include");
          expect(JSON.parse(String(options.body))).toMatchObject({
            content: "How do I learn CSS?",
            intent: "chat",
          });
          const raw = [
            'event: accepted\ndata: {"event":"accepted","generationId":"g","userMessageId":"u"}\n\n',
            'event: text_delta\ndata: {"event":"text_delta","delta":"Start with CSS.","sequence":1}\n\n',
            'event: completed\ndata: {"event":"completed","messageId":"a","remaining":14}\n\n',
          ].join("");
          return new Response(raw, {
            headers: { "Content-Type": "text/event-stream" },
          });
        }
        throw new Error(`Unexpected path ${path}`);
      })
    );
    const hook = renderHook(() => useMentorSaved(true));
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    await act(async () => {
      await hook.result.current.send("How do I learn CSS?");
    });
    expect(hook.result.current.messages).toEqual([
      { id: "u", role: "user", text: "How do I learn CSS?" },
      { id: "a", role: "assistant", text: "Start with CSS." },
    ]);
    expect(calls.some((call) => call.includes("preview"))).toBe(false);
  });

  it("loads a validated plan draft after the structured generation completes", async () => {
    const calls: string[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, options: RequestInit) => {
        const path = new URL(url, "http://localhost").pathname;
        calls.push(`${options.method ?? "GET"} ${path}`);
        if (path.endsWith("/bootstrap"))
          return Response.json({
            profile: {
              goal: "frontend",
              level: "beginner",
              hours: 4,
              outcome: "A site",
              version: 1,
            },
            pathway: null,
            proposal: null,
            conversations: [
              {
                id: conversationId,
                title: "Plan",
                updated_at: "2026-10-05T00:00:00Z",
              },
            ],
            generationEnabled: true,
          });
        if (
          path.endsWith(`/conversations/${conversationId}/messages`) &&
          options.method !== "POST"
        )
          return Response.json({ entries: [], nextCursor: null });
        if (path.endsWith(`/conversations/${conversationId}/messages`)) {
          expect(JSON.parse(String(options.body)).intent).toBe("propose_plan");
          return new Response(
            [
              'event: accepted\ndata: {"event":"accepted","generationId":"g","userMessageId":"u"}\n\n',
              'event: progress\ndata: {"event":"progress","stage":"planning"}\n\n',
              'event: completed\ndata: {"event":"completed","messageId":"a","proposalId":"p","remaining":14}\n\n',
            ].join(""),
            { headers: { "Content-Type": "text/event-stream" } }
          );
        }
        if (path.endsWith("/proposals/p"))
          return Response.json({
            id: "p",
            base_revision: 0,
            profile_version: 1,
            content: [{ ...milestone, sourceIds: ["course:CS56"] }],
            metadata: {
              goal: "frontend",
              assumptions: [],
              rationale: "Start small.",
              sources: [
                {
                  sourceId: "course:CS56",
                  title: "Course",
                  href: "/courses/cs56",
                },
              ],
            },
          });
        throw new Error(`Unexpected path ${path}`);
      })
    );
    const hook = renderHook(() => useMentorSaved(true));
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    await act(async () => {
      await hook.result.current.send("Build my plan", "plan");
    });
    await waitFor(() =>
      expect(hook.result.current.proposal?.[0].id).toBe("step-1")
    );
    expect(hook.result.current.pathMetadata?.sources[0].sourceId).toBe(
      "course:CS56"
    );
    expect(hook.result.current.messages.at(-1)?.text).toContain(
      "draft is ready"
    );
    expect(calls.some((call) => call.includes("preview"))).toBe(false);
  });

  it("reuses the request ID after a lost response and restores the receipt", async () => {
    const requestIds: string[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, options: RequestInit) => {
        const path = new URL(url, "http://localhost").pathname;
        if (path.endsWith("/bootstrap"))
          return Response.json({
            profile: {
              goal: "frontend",
              level: "beginner",
              hours: 4,
              outcome: "A site",
              version: 1,
            },
            pathway: null,
            proposal: null,
            conversations: [],
            previewEnabled: false,
            generationEnabled: true,
          });
        if (path.endsWith("/conversations") && options.method === "POST")
          return Response.json({
            id: conversationId,
            title: "CSS",
            updated_at: "2026-10-05T00:00:00Z",
          });
        if (
          path.endsWith(`/conversations/${conversationId}/messages`) &&
          options.method === "POST"
        ) {
          requestIds.push(JSON.parse(String(options.body)).clientRequestId);
          if (requestIds.length === 1) throw new Error("lost response");
          return Response.json({
            generationId: "g",
            state: "completed",
            userMessageId: "u",
            messageId: "a",
            content: "Recovered answer",
            partial: false,
            failureCode: null,
          });
        }
        throw new Error(`Unexpected path ${path}`);
      })
    );
    const hook = renderHook(() => useMentorSaved(true));
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    await act(async () => {
      await hook.result.current.send("How do I learn CSS?");
    });
    expect(hook.result.current.error).toContain("Connection interrupted");
    act(() => hook.result.current.retry());
    await waitFor(() =>
      expect(hook.result.current.messages.at(-1)?.text).toBe("Recovered answer")
    );
    expect(requestIds).toHaveLength(2);
    expect(requestIds[0]).toBe(requestIds[1]);
  });

  it("keeps history readable and prevents sending when generation is off", async () => {
    const fetcher = vi.fn(async (url: string) => {
      if (url.endsWith("/bootstrap"))
        return Response.json({
          profile: {
            goal: "frontend",
            level: "beginner",
            hours: 4,
            outcome: "A site",
            version: 1,
          },
          pathway: null,
          proposal: null,
          conversations: [],
          previewEnabled: false,
          generationEnabled: false,
          limits: {
            dailyRemaining: 15,
            minuteRemaining: 5,
            resetAt: "2026-10-06T00:00:00Z",
          },
        });
      throw new Error(`Unexpected request ${url}`);
    });
    vi.stubGlobal("fetch", fetcher);
    const hook = renderHook(() => useMentorSaved(true));
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    await act(async () => {
      await hook.result.current.send("Build my plan", "plan");
    });
    expect(hook.result.current.error).toContain("generation is unavailable");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("shows the provider retry time after a quota response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, options: RequestInit) => {
        const path = new URL(url, "http://localhost").pathname;
        if (path.endsWith("/bootstrap"))
          return Response.json({
            profile: {
              goal: "frontend",
              level: "beginner",
              hours: 4,
              outcome: "A site",
              version: 1,
            },
            pathway: null,
            proposal: null,
            conversations: [
              {
                id: conversationId,
                title: "CSS",
                updated_at: "2026-10-05T00:00:00Z",
              },
            ],
            generationEnabled: true,
            previewEnabled: false,
            limits: {
              dailyRemaining: 1,
              minuteRemaining: 1,
              resetAt: "2026-10-06T00:00:00Z",
            },
          });
        if (path.endsWith("/messages") && options.method !== "POST")
          return Response.json({ entries: [], nextCursor: null });
        if (path.endsWith("/messages"))
          return Response.json(
            { code: "USER_LIMIT_REACHED", retryAfterSeconds: 120 },
            { status: 429 }
          );
        throw new Error(`Unexpected request ${path}`);
      })
    );
    const hook = renderHook(() => useMentorSaved(true));
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    await act(async () => {
      await hook.result.current.send("How do I learn CSS?");
    });
    expect(hook.result.current.quota.blocked).toBe(true);
    expect(hook.result.current.quota.resetLabel).toBeTruthy();
    expect(hook.result.current.error).toContain("limit");
  });

  it("removes an empty conversation created after Stop before model dispatch", async () => {
    let completeCreate!: (response: Response) => void;
    const create = new Promise<Response>((resolve) => {
      completeCreate = resolve;
    });
    const calls: string[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, options: RequestInit) => {
        const path = new URL(url, "http://localhost").pathname;
        const action = `${options.method ?? "GET"} ${path}`;
        calls.push(action);
        if (path.endsWith("/bootstrap"))
          return Response.json({
            profile: {
              goal: "frontend",
              level: "beginner",
              hours: 4,
              outcome: "A site",
              version: 1,
            },
            pathway: null,
            proposal: null,
            conversations: [],
            generationEnabled: true,
            limits: {
              dailyRemaining: 15,
              minuteRemaining: 5,
              resetAt: "2026-10-07T00:00:00Z",
            },
          });
        if (path.endsWith("/conversations") && options.method === "POST")
          return create;
        if (
          path.endsWith(`/conversations/${conversationId}`) &&
          options.method === "DELETE"
        )
          return Response.json({ deleted: true });
        throw new Error(`Unexpected request ${action}`);
      })
    );
    const hook = renderHook(() => useMentorSaved(true));
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    let sending!: Promise<void>;
    act(() => {
      sending = hook.result.current.send("CSS?");
    });
    act(() => hook.result.current.stop());
    await act(async () => {
      completeCreate(Response.json({ id: conversationId, title: "CSS?" }));
      await sending;
    });
    await waitFor(() =>
      expect(calls).toContain(
        `DELETE /api/mentor/conversations/${conversationId}`
      )
    );
    expect(calls.some((call) => call.endsWith("/messages"))).toBe(false);
  });
});
