import {
  MentorApiError,
  mentorRequest,
  mentorResponseError,
} from "./mentor-api";

import { buildApiUrl } from "@/api/request-url";

export type GenerationEvent =
  | { event: "accepted"; generationId: string; userMessageId: string }
  | { event: "text_delta"; delta: string; sequence: number }
  | { event: "progress"; stage: "planning" }
  | {
      event: "completed";
      messageId: string;
      remaining: number;
      proposalId?: string;
    }
  | { event: "failed"; code: string; partial: boolean; canRetry: boolean }
  | { event: "cancelled"; partial: boolean };
export type GenerationReceipt = {
  generationId: string;
  state: string;
  userMessageId: string | null;
  messageId: string | null;
  proposalId: string | null;
  content: string | null;
  partial: boolean;
  failureCode: string | null;
};

function apiUrl(path: string): string {
  return buildApiUrl(
    `/api/mentor/${path}`,
    import.meta.env.VITE_OWNER_API_URL ?? import.meta.env.VITE_API_URL ?? ""
  );
}

export async function* parseGenerationStream(
  body: ReadableStream<Uint8Array>
): AsyncGenerator<GenerationEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      const frames = buffer.split(/\r?\n\r?\n/);
      buffer = frames.pop() ?? "";
      for (const frame of frames) {
        const eventName = frame
          .split(/\r?\n/)
          .find((line) => line.startsWith("event:"))
          ?.slice(6)
          .trim();
        const data = frame
          .split(/\r?\n/)
          .filter((line) => line.startsWith("data:"))
          .map((line) => line.slice(5).trimStart())
          .join("\n");
        if (!data) continue;
        const value = JSON.parse(data) as GenerationEvent;
        if (
          value.event !== eventName ||
          ![
            "accepted",
            "text_delta",
            "progress",
            "completed",
            "failed",
            "cancelled",
          ].includes(value.event)
        )
          throw new Error("Invalid mentor stream");
        yield value;
      }
      if (done) break;
    }
    if (buffer.trim()) throw new Error("Incomplete mentor stream");
  } finally {
    reader.releaseLock();
  }
}

export async function sendGeneration(
  conversationId: string,
  content: string,
  clientRequestId: string,
  intent: "chat" | "propose_plan",
  signal: AbortSignal,
  onEvent: (event: GenerationEvent) => void
): Promise<GenerationReceipt | null> {
  let response: Response;
  try {
    response = await fetch(apiUrl(`conversations/${conversationId}/messages`), {
      method: "POST",
      credentials: "include",
      cache: "no-store",
      redirect: "error",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream, application/json",
      },
      body: JSON.stringify({ content, clientRequestId, intent }),
      signal: AbortSignal.any([signal, AbortSignal.timeout(60_000)]),
    });
  } catch {
    throw new MentorApiError(
      0,
      "Connection interrupted. Check this request before trying again."
    );
  }
  if (!response.ok) {
    const messages: Record<number, string> = {
      401: "Your session ended. Sign in again.",
      403: "This account cannot use mentor generation.",
      409: "A generation is already active, or this request ID was used for different content.",
      429: "The mentor limit is reached. Try again after it resets.",
      503: "The mentor model is unavailable. Try again later.",
    };
    throw await mentorResponseError(response, messages);
  }
  if (response.headers.get("content-type")?.includes("application/json"))
    return (await response.json()) as GenerationReceipt;
  if (!response.body) throw new Error("Mentor stream is unavailable");
  for await (const event of parseGenerationStream(response.body))
    onEvent(event);
  return null;
}

export function generationStatus(id: string) {
  return mentorRequest<GenerationReceipt>(`generations/${id}`);
}
export function cancelGeneration(id: string) {
  return mentorRequest(`generations/${id}/cancel`, "POST");
}
