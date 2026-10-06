import { useCallback, useEffect, useRef, useState } from "react";

import {
  type DemoScenario,
  type LearnerProfile,
  type Message,
} from "./mentor-demo";
import {
  mentorRequest,
  MentorApiError,
  type MentorBootstrap,
  type SavedConversation,
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
import {
  mergeGenerationReceipt,
  receiptOutcome,
} from "./mentor-generation-receipt";
import {
  conversationMessages,
  conversationPage,
  initialConversation,
} from "./mentor-history-api";
import { runMentorPreview } from "./mentor-preview-flow";
import { toggleSavedProgress } from "./mentor-progress";
import { applySavedStreamEvent } from "./mentor-saved-stream";
import { useMentorQuota } from "./useMentorQuota";
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
  const [previewEnabled, setPreviewEnabled] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const expired = useRef(onSessionExpired);
  expired.current = onSessionExpired;
  const sequence = useRef(0);
  const lastRequest = useRef<LastMentorRequest | null>(null);
  const liveController = useRef<AbortController | null>(null);
  const liveGenerationId = useRef<string | null>(null);
  const historySequence = useRef(0);
  const refreshWorkspace = useCallback(() => {
    setLoading(true);
    setError("");
    setBootError(false);
    setReloadKey((value) => value + 1);
  }, []);
  const quota = useMentorQuota(refreshWorkspace);
  const loadLimits = quota.load;
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
        setPreviewEnabled(data.previewEnabled);
        loadLimits(data.limits);
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
        const page = await initialConversation(current);
        if (!alive) return;
        setMessages(page.entries.map(mapMessage));
        setMessageCursor(page.nextCursor);
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
  }, [enabled, reloadKey, loadLimits]);
  const fail = (reason: unknown) => {
    if (reason instanceof MentorApiError && reason.status === 401)
      expired.current?.();
    quota.failed(reason);
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
    if (busy) stop();
    const lookup = ++historySequence.current;
    setError("");
    try {
      const page = await conversationMessages(id);
      if (lookup !== historySequence.current) return;
      setConversationId(id);
      setMessages(page.entries.map(mapMessage));
      setMessageCursor(page.nextCursor);
      setNotice("");
    } catch (reason) {
      if (lookup === historySequence.current) fail(reason);
    }
  };
  const loadOlderMessages = async () => {
    if (!conversationId || messageCursor === null) return;
    const lookup = historySequence.current;
    try {
      const page = await conversationMessages(conversationId, messageCursor);
      if (lookup !== historySequence.current) return;
      setMessages((old) => [...page.entries.map(mapMessage), ...old]);
      setMessageCursor(page.nextCursor);
    } catch (reason) {
      fail(reason);
    }
  };
  const loadMoreConversations = async () => {
    if (!conversationCursor) return;
    try {
      const page = await conversationPage(conversationCursor);
      setConversations((old) => [...old, ...page.entries]);
      setConversationCursor(page.nextCursor);
    } catch (reason) {
      fail(reason);
    }
  };
  const clearConversation = async () => {
    if (busy) stop();
    historySequence.current++;
    setConversationId(null);
    setMessages([]);
    setMessageCursor(null);
    setNotice("New conversation ready. Your earlier conversations are saved.");
    setError("");
  };
  const deleteConversation = async (id: string) => {
    if (id === conversationId && busy) stop();
    try {
      await mentorRequest(`conversations/${id}`, "DELETE");
      setConversations((old) => old.filter((entry) => entry.id !== id));
      if (id === conversationId) {
        historySequence.current++;
        setConversationId(null);
        setMessages([]);
        setMessageCursor(null);
      }
      setNotice("Conversation deleted. Your accepted path remains.");
      setError("");
    } catch (reason) {
      fail(reason);
    }
  };
  const stop = () => {
    sequence.current++;
    liveController.current?.abort();
    if (liveGenerationId.current)
      void cancelGeneration(liveGenerationId.current).catch(() => undefined);
    setBusy(null);
    if (busy === "plan")
      setMessages((old) =>
        old.filter((message) => !String(message.id).startsWith("pending-"))
      );
    setNotice("Response stopped. Saved messages remain in your history.");
    lastRequest.current = null;
  };
  const send = async (text: string, kind: Kind = "chat", retryId?: string) => {
    const input = text.trim();
    if (!profile || !input || input.length > 4000 || busy) return;
    if (!generationEnabled && !previewEnabled) {
      setError(
        "Mentor generation is unavailable. Your saved path remains available."
      );
      return;
    }
    if (quota.blocked && generationEnabled) return;
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
        if (sequence.current !== request) {
          void mentorRequest(`conversations/${created.id}`, "DELETE").catch(
            () => undefined
          );
          return;
        }
        setConversationId(id);
        setConversations((old) => [created, ...old]);
      }
      if (generationEnabled) {
        const controller = new AbortController();
        liveController.current = controller;
        const pendingId = `pending-${clientRequestId}`;
        const loadProposal = async (proposalId: string | null) => {
          if (kind === "plan" && proposalId)
            setProposal(
              await mentorRequest<SavedProposal>(`proposals/${proposalId}`)
            );
        };
        const showReceipt = async (receipt: GenerationReceipt) => {
          setMessages((old) =>
            mergeGenerationReceipt(old, receipt, input, pendingId)
          );
          if (
            kind === "plan" &&
            ["failed", "cancelled", "abandoned"].includes(receipt.state)
          )
            setMessages((old) =>
              old.filter((message) => message.id !== pendingId)
            );
          await loadProposal(receipt.proposalId);
          const outcome = receiptOutcome(receipt);
          lastRequest.current =
            outcome.retry === "none"
              ? null
              : {
                  text: input,
                  kind,
                  requestId: outcome.retry === "same" ? clientRequestId : null,
                };
          setError(outcome.error);
          setNotice(outcome.notice);
        };
        try {
          const receipt = await sendGeneration(
            id,
            input,
            clientRequestId,
            kind === "plan" ? "propose_plan" : "chat",
            controller.signal,
            (event) => {
              if (sequence.current !== request) return;
              applySavedStreamEvent(event, {
                kind,
                input,
                pendingId,
                setMessages,
                setNotice,
                setError,
                generationAccepted: (generationId) => {
                  liveGenerationId.current = generationId;
                  quota.accepted();
                },
                generationCompleted: quota.completed,
                loadProposal: (proposalId) =>
                  void loadProposal(proposalId).catch(fail),
                retryable: (retry) => {
                  lastRequest.current = retry
                    ? { text: input, kind, requestId: null }
                    : null;
                },
              });
            }
          );
          if (receipt && sequence.current === request)
            await showReceipt(receipt);
        } catch (reason) {
          if (sequence.current === request && liveGenerationId.current) {
            try {
              await showReceipt(
                await generationStatus(liveGenerationId.current)
              );
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
      const previewProposal = await runMentorPreview(
        id,
        input,
        kind,
        profile,
        scenario,
        () => sequence.current === request,
        (message) => setMessages((old) => [...old, mapMessage(message)])
      );
      if (sequence.current !== request) return;
      if (previewProposal) setProposal(previewProposal);
      setNotice(
        kind === "plan"
          ? "Draft saved. Review it in My path."
          : "Example response saved."
      );
    } catch (reason) {
      if (
        reason instanceof MentorApiError &&
        reason.status === 429 &&
        reason.retryAfterSeconds === null &&
        reason.code === "USER_LIMIT_REACHED" &&
        !conversationId
      ) {
        setError(
          "Conversation limit reached. Delete an older conversation to start a new one."
        );
        setNotice("");
      } else fail(reason);
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
    try {
      setPath(await toggleSavedProgress(pathRecord, id));
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
    pathMetadata: proposalRecord?.metadata ?? pathRecord?.metadata ?? null,
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
    canRetry: Boolean(lastRequest.current),
    clearConversation,
    deleteConversation,
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
    previewEnabled,
    quota: {
      limits: quota.limits,
      blocked: quota.blocked,
      resetLabel: quota.resetLabel,
      blockReason: quota.blockReason,
    },
    reload: refreshWorkspace,
  };
}
