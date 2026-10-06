import { useEffect, useRef, useState } from "react";

import {
  createExamplePath,
  exampleReply,
  type DemoScenario,
  type LearnerProfile,
  type Message,
  type Milestone,
} from "./mentor-demo";
import {
  mentorRequest,
  MentorApiError,
  type MentorBootstrap,
  type SavedConversation,
  type SavedMessage,
  type SavedPath,
  type SavedProfile,
  type SavedProposal,
} from "./mentor-api";
import {
  cancelGeneration,
  generationStatus,
  sendGeneration,
  type GenerationReceipt,
} from "./mentor-generation-client";
import {
  mapMessage,
  type LastMentorRequest,
  type MentorRequestKind as Kind,
} from "./mentor-message-map";
import { previewFailure } from "./mentor-preview-failures";
import { mergeGenerationReceipt } from "./mentor-generation-receipt";
export function useMentorSaved(
  enabled: boolean,
  onSessionExpired?: () => void
) {
  const [profile, setProfileState] = useState<SavedProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [proposalRecord, setProposal] = useState<SavedProposal | null>(null);
  const [pathRecord, setPath] = useState<SavedPath | null>(null);
  const [conversations, setConversations] = useState<SavedConversation[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationCursor, setConversationCursor] = useState<string | null>(
    null
  );
  const [messageCursor, setMessageCursor] = useState<number | null>(null);
  const [busy, setBusy] = useState<Kind | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [scenario, setScenario] = useState<DemoScenario>("normal");
  const [loading, setLoading] = useState(enabled);
  const [bootError, setBootError] = useState(false);
  const [generationEnabled, setGenerationEnabled] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const expired = useRef(onSessionExpired);
  expired.current = onSessionExpired;
  const sequence = useRef(0);
  const lastRequest = useRef<LastMentorRequest | null>(null);
  const liveController = useRef<AbortController | null>(null);
  const liveGenerationId = useRef<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    const generation = sequence;
    void (async () => {
      try {
        const data = await mentorRequest<MentorBootstrap>("bootstrap");
        if (!alive) return;
        setBootError(false);
        setGenerationEnabled(data.generationEnabled);
        setProfileState(data.profile);
        setPath(data.pathway);
        setProposal(data.proposal);
        setConversations(data.conversations);
        setConversationCursor(
          data.conversations.length === 10
            ? (data.conversations.at(-1)?.id ?? null)
            : null
        );
        const current = data.conversations[0]?.id ?? null;
        setConversationId(current);
        if (current) {
          const page = await mentorRequest<{
            entries: SavedMessage[];
            nextCursor: number | null;
          }>(`conversations/${current}/messages?limit=50`);
          if (!alive) return;
          setMessages(page.entries.map(mapMessage));
          setMessageCursor(page.nextCursor);
        } else {
          setMessages([]);
          setMessageCursor(null);
        }
      } catch (reason) {
        if (alive) {
          setBootError(true);
          if (reason instanceof MentorApiError && reason.status === 401)
            expired.current?.();
          setError(
            reason instanceof Error
              ? reason.message
              : "Could not load your workspace."
          );
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
      generation.current++;
      liveController.current?.abort();
      if (liveGenerationId.current)
        void cancelGeneration(liveGenerationId.current).catch(() => undefined);
    };
  }, [enabled, reloadKey]);
  const fail = (reason: unknown) => {
    if (reason instanceof MentorApiError && reason.status === 401)
      expired.current?.();
    setError(reason instanceof Error ? reason.message : "The request failed.");
    setNotice("");
  };
  const setProfile = async (value: LearnerProfile) => {
    setError("");
    try {
      const saved = await mentorRequest<SavedProfile>("profile", "PUT", {
        ...value,
        expectedVersion: profile?.version ?? null,
      });
      setProfileState(saved);
      setProposal(null);
      setNotice(
        pathRecord
          ? "Profile saved. Your accepted path stays until you accept a new draft."
          : "Profile saved. Build a plan or ask a question."
      );
    } catch (reason) {
      fail(reason);
      throw reason;
    }
  };
  const loadConversation = async (id: string) => {
    setError("");
    try {
      const page = await mentorRequest<{
        entries: SavedMessage[];
        nextCursor: number | null;
      }>(`conversations/${id}/messages?limit=50`);
      setConversationId(id);
      setMessages(page.entries.map(mapMessage));
      setMessageCursor(page.nextCursor);
      setNotice("");
    } catch (reason) {
      fail(reason);
    }
  };
  const loadOlderMessages = async () => {
    if (!conversationId || messageCursor === null) return;
    try {
      const page = await mentorRequest<{
        entries: SavedMessage[];
        nextCursor: number | null;
      }>(
        `conversations/${conversationId}/messages?limit=50&cursor=${messageCursor}`
      );
      setMessages((old) => [...page.entries.map(mapMessage), ...old]);
      setMessageCursor(page.nextCursor);
    } catch (reason) {
      fail(reason);
    }
  };
  const loadMoreConversations = async () => {
    if (!conversationCursor) return;
    try {
      const page = await mentorRequest<{
        entries: SavedConversation[];
        nextCursor: string | null;
      }>(`conversations?limit=10&cursor=${conversationCursor}`);
      setConversations((old) => [...old, ...page.entries]);
      setConversationCursor(page.nextCursor);
    } catch (reason) {
      fail(reason);
    }
  };
  const clearConversation = async () => {
    setConversationId(null);
    setMessages([]);
    setMessageCursor(null);
    setNotice("New conversation ready. Your earlier conversations are saved.");
    setError("");
  };
  const stop = () => {
    sequence.current++;
    liveController.current?.abort();
    if (liveGenerationId.current)
      void cancelGeneration(liveGenerationId.current).catch(() => undefined);
    setBusy(null);
    setNotice("Response stopped. Saved messages remain in your history.");
  };
  const send = async (text: string, kind: Kind = "chat", retryId?: string) => {
    const input = text.trim();
    if (!profile || !input || input.length > 4000 || busy) return;
    if (generationEnabled && kind === "plan") {
      setNotice(
        "Personal plan generation is coming in the next stage. You can ask the mentor for guidance now."
      );
      return;
    }
    const request = ++sequence.current;
    const clientRequestId = retryId ?? crypto.randomUUID();
    lastRequest.current = { text: input, kind, requestId: clientRequestId };
    setBusy(kind);
    setError("");
    setNotice("Saving your question…");
    try {
      let id = conversationId;
      if (!id) {
        const created = await mentorRequest<SavedConversation>(
          "conversations",
          "POST",
          { title: input.slice(0, 80) }
        );
        id = created.id;
        setConversationId(id);
        setConversations((old) => [created, ...old]);
      }
      if (generationEnabled) {
        const controller = new AbortController();
        liveController.current = controller;
        const pendingId = `pending-${clientRequestId}`;
        const showReceipt = (receipt: GenerationReceipt) => {
          setMessages((old) =>
            mergeGenerationReceipt(old, receipt, input, pendingId)
          );
          if (receipt.state === "completed" || receipt.state === "cancelled") {
            lastRequest.current = null;
            setError("");
            setNotice(
              receipt.state === "completed"
                ? "Response saved."
                : "Response stopped."
            );
          } else if (["failed", "abandoned"].includes(receipt.state)) {
            lastRequest.current = { text: input, kind, requestId: null };
            setError(
              "The response could not be completed. Your question is saved."
            );
            setNotice("");
          } else {
            setError(
              "Connection interrupted. Retry checks this request without starting another."
            );
            setNotice(`Request status: ${receipt.state}.`);
          }
        };
        try {
          const receipt = await sendGeneration(
            id,
            input,
            clientRequestId,
            controller.signal,
            (event) => {
              if (sequence.current !== request) return;
              if (event.event === "accepted") {
                liveGenerationId.current = event.generationId;
                setMessages((old) => [
                  ...old,
                  { id: event.userMessageId, role: "user", text: input },
                  { id: pendingId, role: "assistant", text: "" },
                ]);
                setNotice("Generating an English response…");
              } else if (event.event === "text_delta") {
                setMessages((old) =>
                  old.map((m) =>
                    m.id === pendingId
                      ? { ...m, text: m.text + event.delta }
                      : m
                  )
                );
              } else if (event.event === "completed") {
                setMessages((old) =>
                  old.map((m) =>
                    m.id === pendingId ? { ...m, id: event.messageId } : m
                  )
                );
                setNotice(
                  `Response saved. ${event.remaining} daily requests remain.`
                );
                lastRequest.current = null;
              } else if (event.event === "failed") {
                setMessages((old) =>
                  old.map((m) =>
                    m.id === pendingId ? { ...m, partial: Boolean(m.text) } : m
                  )
                );
                setError(
                  event.code === "AI_TIMEOUT"
                    ? "The response timed out. Your question is saved."
                    : "The response could not be completed. Your question is saved."
                );
                setNotice("");
                lastRequest.current = { text: input, kind, requestId: null };
              } else if (event.event === "cancelled") {
                setMessages((old) =>
                  old.map((m) =>
                    m.id === pendingId ? { ...m, partial: Boolean(m.text) } : m
                  )
                );
                setNotice("Response stopped.");
                lastRequest.current = null;
              }
            }
          );
          if (receipt && sequence.current === request) showReceipt(receipt);
        } catch (reason) {
          if (sequence.current === request && liveGenerationId.current) {
            try {
              showReceipt(await generationStatus(liveGenerationId.current));
            } catch {
              fail(reason);
            }
          } else if (sequence.current === request) fail(reason);
        } finally {
          liveController.current = null;
          liveGenerationId.current = null;
        }
        return;
      }
      const user = await mentorRequest<SavedMessage>(
        `conversations/${id}/preview-messages`,
        "POST",
        { content: input }
      );
      setMessages((old) => [...old, mapMessage(user)]);
      if (sequence.current !== request) return;
      if (scenario !== "normal") {
        setError(previewFailure(scenario));
        setNotice("");
        return;
      }
      const reply =
        kind === "plan"
          ? "Your four-week example path is ready to review. Check each practice step before accepting it."
          : exampleReply(input, profile);
      const assistant = await mentorRequest<SavedMessage>(
        `conversations/${id}/preview-replies`,
        "POST",
        { content: reply }
      );
      setMessages((old) => [...old, mapMessage(assistant)]);
      if (sequence.current !== request) return;
      if (kind === "plan") {
        const saved = await mentorRequest<{
          id: string;
          baseRevision: number;
          profileVersion: number;
          milestones: Milestone[];
        }>("proposals", "POST", {
          milestones: createExamplePath(profile),
          expectedProfileVersion: profile.version,
        });
        setProposal({
          id: saved.id,
          base_revision: saved.baseRevision,
          profile_version: saved.profileVersion,
          content: saved.milestones,
        });
      }
      setNotice(
        kind === "plan"
          ? "Draft saved. Review it in My path."
          : "Example response saved."
      );
    } catch (reason) {
      fail(reason);
    } finally {
      if (sequence.current === request) setBusy(null);
    }
  };
  const accept = async () => {
    if (!proposalRecord) return;
    setError("");
    try {
      const path = await mentorRequest<SavedPath>(
        `proposals/${proposalRecord.id}/accept`,
        "POST",
        {
          expectedVersion: proposalRecord.base_revision,
          expectedProfileVersion: proposalRecord.profile_version,
        }
      );
      setPath(path);
      setProposal(null);
      setNotice("Path saved to your account.");
    } catch (reason) {
      fail(reason);
    }
  };
  const toggleDone = async (id: string) => {
    if (!pathRecord) return;
    const current = pathRecord.progress.find(
      (entry) => entry.milestone_id === id
    );
    try {
      const updated = await mentorRequest<{
        milestoneId: string;
        status: "done" | "pending";
        version: number;
      }>(`pathway/milestones/${encodeURIComponent(id)}`, "PATCH", {
        status: current?.status === "done" ? "pending" : "done",
        expectedVersion: current?.version ?? null,
        expectedPathVersion: pathRecord.version,
      });
      setPath((old) =>
        old
          ? {
              ...old,
              progress: [
                ...old.progress.filter((entry) => entry.milestone_id !== id),
                {
                  milestone_id: id,
                  status: updated.status,
                  version: updated.version,
                },
              ],
            }
          : old
      );
    } catch (reason) {
      fail(reason);
    }
  };
  const discard = async () => {
    if (!proposalRecord) return;
    try {
      await mentorRequest(`proposals/${proposalRecord.id}`, "DELETE");
      setProposal(null);
      setNotice("Draft discarded. Your accepted path remains.");
    } catch (reason) {
      fail(reason);
    }
  };
  return {
    profile,
    setProfile,
    messages,
    proposal: proposalRecord?.content ?? null,
    path: pathRecord?.milestones ?? null,
    done:
      pathRecord?.progress
        .filter((entry) => entry.status === "done")
        .map((entry) => entry.milestone_id) ?? [],
    busy,
    notice,
    error,
    scenario,
    setScenario,
    stop,
    send,
    accept,
    retry: () => {
      if (lastRequest.current)
        void send(
          lastRequest.current.text,
          lastRequest.current.kind,
          lastRequest.current.requestId ?? undefined
        );
    },
    clearConversation,
    toggleDone,
    discard,
    loading,
    conversations,
    conversationId,
    openConversation: loadConversation,
    loadMoreConversations,
    conversationCursor,
    loadOlderMessages,
    messageCursor,
    bootError,
    generationEnabled,
    reload: () => {
      setLoading(true);
      setError("");
      setBootError(false);
      setReloadKey((value) => value + 1);
    },
  };
}
