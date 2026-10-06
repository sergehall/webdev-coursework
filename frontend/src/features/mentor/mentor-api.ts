import type { LearnerProfile, Milestone } from "./mentor-demo";

import { buildApiUrl } from "@/api/request-url";

export type SavedProfile = LearnerProfile & { version: number };
export type SavedConversation = {
  id: string;
  title: string;
  updated_at: string;
};
export type SavedMessage = {
  id: string;
  sequence: number;
  role: "user" | "assistant";
  content: string;
};
export type SavedProposal = {
  id: string;
  base_revision: number;
  profile_version: number;
  content: Milestone[];
  metadata?: {
    goal: string;
    assumptions: string[];
    rationale: string;
    sources: { sourceId: string; title: string; href: string }[];
  } | null;
};
export type SavedPath = {
  id: string;
  version: number;
  revisionId: string;
  milestones: Milestone[];
  metadata?: SavedProposal["metadata"];
  progress: {
    milestone_id: string;
    status: "pending" | "done";
    version: number;
  }[];
};
export type MentorBootstrap = {
  profile: SavedProfile | null;
  pathway: SavedPath | null;
  proposal: SavedProposal | null;
  conversations: SavedConversation[];
  previewEnabled: boolean;
  generationEnabled: boolean;
  limits: { dailyRemaining: number; minuteRemaining: number; resetAt: string };
};
export class MentorApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
  }
}
export async function mentorRequest<T>(
  path: string,
  method = "GET",
  body?: unknown
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(
      buildApiUrl(
        `/api/mentor/${path}`,
        import.meta.env.VITE_OWNER_API_URL ?? import.meta.env.VITE_API_URL ?? ""
      ),
      {
        method,
        credentials: "include",
        cache: "no-store",
        redirect: "error",
        referrerPolicy: "no-referrer",
        headers: { "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(10_000),
      }
    );
  } catch {
    throw new MentorApiError(
      0,
      "The mentor workspace is unavailable. Try again."
    );
  }
  if (!response.ok) {
    const messages: Record<number, string> = {
      400: "Check your input and try again.",
      401: "Your session ended. Sign in again.",
      403: "This action is not available for this account.",
      404: "That item is no longer available.",
      409: "This changed in another tab. Reload the workspace and try again.",
      429: "Too many requests. Wait a moment and try again.",
      503: "The mentor workspace is temporarily unavailable.",
    };
    throw new MentorApiError(
      response.status,
      messages[response.status] ?? "The request could not be completed."
    );
  }
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}
