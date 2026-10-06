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

type Kind = "chat" | "plan";
const mapMessage = (row: SavedMessage): Message => ({
  id: row.id,
  role: row.role,
  text: row.content,
});
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
  const [reloadKey, setReloadKey] = useState(0);
  const expired = useRef(onSessionExpired);
  expired.current = onSessionExpired;
  const sequence = useRef(0);
  const lastRequest = useRef<{ text: string; kind: Kind } | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    const generation = sequence;
    void (async () => {
      try {
        const data = await mentorRequest<MentorBootstrap>("bootstrap");
        if (!alive) return;
        setBootError(false);
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
    setBusy(null);
    setNotice("Response stopped. Saved messages remain in your history.");
  };
  const send = async (text: string, kind: Kind = "chat") => {
    const input = text.trim();
    if (!profile || !input || input.length > 4000 || busy) return;
    const request = ++sequence.current;
    lastRequest.current = { text: input, kind };
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
      const user = await mentorRequest<SavedMessage>(
        `conversations/${id}/messages`,
        "POST",
        { content: input }
      );
      setMessages((old) => [...old, mapMessage(user)]);
      if (sequence.current !== request) return;
      if (scenario !== "normal") {
        const failures: Record<Exclude<DemoScenario, "normal">, string> = {
          unavailable: "Example response unavailable. Your question was saved.",
          quota: "Example limit reached. Your question was saved.",
          timeout: "Example response timed out. Your question was saved.",
          "invalid-plan":
            "The example draft was invalid. Your question was saved.",
          conflict: "The plan changed in another tab. Reload to review it.",
        };
        setError(failures[scenario]);
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
        void send(lastRequest.current.text, lastRequest.current.kind);
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
    reload: () => {
      setLoading(true);
      setError("");
      setBootError(false);
      setReloadKey((value) => value + 1);
    },
  };
}
