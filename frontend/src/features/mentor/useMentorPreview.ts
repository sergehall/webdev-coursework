import { useEffect, useRef, useState } from "react";

import {
  createExamplePath,
  exampleReply,
  type DemoScenario,
  type LearnerProfile,
  type Message,
  type Milestone,
} from "./mentor-demo";

export function useMentorPreview() {
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [proposal, setProposal] = useState<Milestone[] | null>(null);
  const [path, setPath] = useState<Milestone[] | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [busy, setBusy] = useState<"chat" | "plan" | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [scenario, setScenario] = useState<DemoScenario>("normal");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const generation = useRef(0);
  const nextId = useRef(1);
  const activeMessage = useRef<number | null>(null);
  const lastRequest = useRef<{ text: string; kind: "chat" | "plan" } | null>(
    null
  );

  function cancel() {
    generation.current++;
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }
  useEffect(
    () => () => {
      generation.current++;
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  function stop() {
    cancel();
    const id = activeMessage.current;
    setMessages((previous) =>
      previous.map((m) =>
        m.id === id
          ? {
              ...m,
              partial: true,
              text: m.text || "Response stopped before it was ready.",
            }
          : m
      )
    );
    setBusy(null);
    setNotice("Response stopped. Your accepted path has not changed.");
  }

  function send(text: string, kind: "chat" | "plan" = "chat") {
    const input = text.trim();
    if (!profile || !input || input.length > 4000 || busy) return;
    cancel();
    const request = generation.current;
    const id = nextId.current++;
    const replyId = nextId.current++;
    activeMessage.current = replyId;
    lastRequest.current = { text: input, kind };
    setMessages((previous) => [
      ...previous,
      { id, role: "user", text: input },
      { id: replyId, role: "assistant", text: "" },
    ]);
    setBusy(kind);
    setError("");
    setNotice(
      kind === "plan"
        ? "Putting your example plan together…"
        : "Your mentor is responding…"
    );
    const response =
      kind === "plan"
        ? "Your four-week example path is ready to review. Each week has two proposed practice steps with a result you can check. Review the draft, then accept it when it feels right. This is a starting point, not a promise of mastery in four weeks."
        : exampleReply(input, profile);
    timer.current = setTimeout(() => {
      if (generation.current !== request) return;
      if (scenario !== "normal") {
        const errors = {
          unavailable:
            "Your mentor is unavailable. Your request is still here; try again when you are ready.",
          quota:
            "You have reached today's example limit. New messages are available after 00:00 UTC. Your path remains available.",
          timeout:
            "This response took too long. You can retry your request; your accepted path is unchanged.",
          "invalid-plan":
            "This draft could not be validated. It has not replaced your path. Try creating it again.",
          conflict:
            "Your path changed in another tab. This draft was not applied. Review the current path before requesting another version.",
        };
        setError(errors[scenario]);
        setMessages((previous) => previous.filter((m) => m.id !== replyId));
        setBusy(null);
        setNotice("");
        return;
      }
      let length = 0;
      const reducedMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const tick = () => {
        if (generation.current !== request) return;
        length = reducedMotion
          ? response.length
          : Math.min(response.length, length + 16);
        setMessages((previous) =>
          previous.map((m) =>
            m.id === replyId ? { ...m, text: response.slice(0, length) } : m
          )
        );
        if (length < response.length) timer.current = setTimeout(tick, 32);
        else {
          if (kind === "plan") setProposal(createExamplePath(profile));
          setBusy(null);
          setNotice(
            kind === "plan"
              ? "Draft ready. Open My path to review and accept it."
              : "Response complete."
          );
        }
      };
      tick();
    }, 450);
  }

  function accept() {
    if (!proposal) return;
    setPath(proposal);
    setDone((previous) =>
      previous.filter((id) => proposal.some((step) => step.id === id))
    );
    setProposal(null);
    setNotice("Path accepted for this preview. Choose your next step.");
  }
  function retry() {
    if (lastRequest.current)
      send(lastRequest.current.text, lastRequest.current.kind);
  }
  function clearConversation() {
    cancel();
    setBusy(null);
    setMessages([]);
    setNotice("");
    setError("");
    lastRequest.current = null;
  }
  return {
    profile,
    setProfile: (value: LearnerProfile) => {
      cancel();
      setBusy(null);
      setProfile(value);
      setProposal(null);
      setError("");
      setNotice(
        path
          ? "Profile updated. Your accepted path stays unchanged until you accept a new draft."
          : "Your starting point is ready. Build your first plan or ask a question."
      );
    },
    messages,
    proposal,
    path,
    done,
    busy,
    notice,
    error,
    scenario,
    setScenario,
    stop,
    send,
    accept,
    retry,
    clearConversation,
    toggleDone: (id: string) =>
      setDone((previous) =>
        previous.includes(id)
          ? previous.filter((v) => v !== id)
          : [...previous, id]
      ),
    discard: () => {
      setProposal(null);
      setNotice("Draft dismissed. Your accepted path is unchanged.");
    },
  };
}
