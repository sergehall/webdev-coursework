import type { Dispatch, SetStateAction } from "react";

import type { Message } from "./mentor-demo";
import type { GenerationEvent } from "./mentor-generation-client";
import type { MentorRequestKind } from "./mentor-message-map";

type StreamView = {
  kind: MentorRequestKind;
  input: string;
  pendingId: string;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setNotice: (value: string) => void;
  setError: (value: string) => void;
  generationAccepted: (id: string) => void;
  generationCompleted: (remaining: number) => void;
  loadProposal: (id: string) => void;
  retryable: (value: boolean) => void;
};

export function applySavedStreamEvent(
  event: GenerationEvent,
  view: StreamView
) {
  const { kind, input, pendingId, setMessages, setNotice } = view;
  switch (event.event) {
    case "accepted":
      view.generationAccepted(event.generationId);
      setMessages((old) => [
        ...old,
        { id: event.userMessageId, role: "user", text: input },
        {
          id: pendingId,
          role: "assistant",
          text: kind === "plan" ? "Building your four-week draft…" : "",
        },
      ]);
      setNotice(
        kind === "plan"
          ? "Checking your learning plan…"
          : "Generating an English response…"
      );
      return;
    case "text_delta":
      setMessages((old) =>
        old.map((message) =>
          message.id === pendingId
            ? { ...message, text: message.text + event.delta }
            : message
        )
      );
      return;
    case "progress":
      setNotice("Building and validating your four-week draft…");
      return;
    case "completed":
      view.generationCompleted(event.remaining);
      setMessages((old) =>
        old.map((message) =>
          message.id === pendingId
            ? {
                ...message,
                id: event.messageId,
                text: event.proposalId
                  ? "Your four-week draft is ready. Review the milestones and sources in My path before accepting it."
                  : message.text,
              }
            : message
        )
      );
      if (event.proposalId) view.loadProposal(event.proposalId);
      setNotice(
        `${event.proposalId ? "Draft saved" : "Response saved"}. ${event.remaining} daily requests remain.`
      );
      view.retryable(false);
      return;
    case "failed":
    case "cancelled":
      setMessages((old) =>
        (kind === "plan"
          ? old.filter((message) => message.id !== pendingId)
          : old
        ).map((message) =>
          message.id === pendingId
            ? { ...message, partial: Boolean(message.text) }
            : message
        )
      );
      if (event.event === "failed") {
        view.setError(
          event.code === "AI_TIMEOUT"
            ? "The response timed out. Your question is saved."
            : "The response could not be completed. Your question is saved."
        );
        setNotice("");
        view.retryable(true);
      } else {
        setNotice("Response stopped.");
        view.retryable(false);
      }
  }
}
