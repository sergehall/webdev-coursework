import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Clock3,
  MessageSquare,
  Send,
  SlidersHorizontal,
  Sparkles,
  Square,
} from "lucide-react";

import LearnerOnboarding from "./LearnerOnboarding";
import LearningPathPanel from "./LearningPathPanel";
import MentorHistoryPanel from "./MentorHistoryPanel";
import MentorMarkdown from "./MentorMarkdown";
import MentorQuota from "./MentorQuota";
import { goalLabels, type DemoScenario } from "./mentor-demo";
import { useMentorPreview } from "./useMentorPreview";
import { useMentorSaved } from "./useMentorSaved";

const scenarios: { value: DemoScenario; label: string }[] = [
  { value: "normal", label: "Normal response" },
  { value: "unavailable", label: "Provider unavailable" },
  { value: "quota", label: "Daily limit reached" },
  { value: "timeout", label: "Response timeout" },
  { value: "invalid-plan", label: "Invalid plan" },
  { value: "conflict", label: "Plan version conflict" },
];

export default function MentorWorkspace({
  onExpire,
  sample,
}: {
  onExpire: () => void;
  sample: boolean;
}) {
  const preview = useMentorPreview();
  const saved = useMentorSaved(!sample, onExpire);
  const mentor = sample ? preview : saved;
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState<"chat" | "path">("chat");
  const [draft, setDraft] = useState("");
  const [history, setHistory] = useState(false);
  const historyToggle = useRef<HTMLButtonElement>(null);
  const generationAvailable =
    sample || saved.generationEnabled || saved.previewEnabled;
  const requestBlocked =
    !sample && (!generationAvailable || saved.quota.blocked);
  const scroll = useRef<HTMLDivElement>(null);
  const follow = useRef(true);
  const composer = useRef<HTMLTextAreaElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
  }, [mentor.profile, editing]);
  useEffect(() => {
    if (scroll.current && follow.current)
      scroll.current.scrollTop = scroll.current.scrollHeight;
  }, [mentor.messages]);
  useEffect(() => {
    if (!sample && saved.proposal) setTab("path");
  }, [sample, saved.proposal]);
  const { profile } = mentor;
  if (!sample && saved.loading)
    return (
      <div className="mentor-panel mentor-loading" role="status">
        Restoring your workspace…
      </div>
    );
  if (!sample && saved.bootError)
    return (
      <div className="mentor-panel mentor-loading" role="alert">
        <p>{saved.error}</p>
        <button className="mentor-button" onClick={saved.reload}>
          Retry loading workspace
        </button>
      </div>
    );
  if (!profile || editing)
    return (
      <LearnerOnboarding
        initial={profile}
        persistent={!sample}
        onCancel={profile ? () => setEditing(false) : undefined}
        onComplete={async (value) => {
          await mentor.setProfile(value);
          setEditing(false);
          setTab("chat");
        }}
      />
    );

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!draft.trim() || mentor.busy || requestBlocked) return;
    mentor.send(draft);
    setDraft("");
    follow.current = true;
  }
  function createPlan() {
    if (requestBlocked) return;
    mentor.send(
      mentor.path
        ? "Adjust my plan to my current profile."
        : "Create my first four-week learning plan.",
      "plan"
    );
    setTab("chat");
  }
  return (
    <>
      <header className="mentor-workspace-heading">
        <div>
          <p className="mentor-eyebrow">A little progress, every week</p>
          <h1 ref={heading} tabIndex={-1}>
            My AI pathway<span className="mentor-heading-dot">.</span>
          </h1>
          <div className="mentor-profile-summary">
            <span>{goalLabels[profile.goal]}</span>
            <span>
              <Clock3 size={14} aria-hidden="true" />
              {profile.hours} h / week
            </span>
            <span>English</span>
          </div>
        </div>
        <button
          className="mentor-button"
          disabled={Boolean(mentor.busy)}
          onClick={() => setEditing(true)}
        >
          <SlidersHorizontal size={16} aria-hidden="true" />
          Edit profile
        </button>
      </header>
      {profile.outcome && (
        <p className="mentor-outcome">Your goal: {profile.outcome}</p>
      )}
      {tab === "path" && mentor.error && (
        <div className="mentor-error" role="alert">
          {mentor.error}
        </div>
      )}
      <div
        className="mentor-mobile-tabs"
        role="group"
        aria-label="Workspace view"
      >
        <button aria-pressed={tab === "chat"} onClick={() => setTab("chat")}>
          Chat
        </button>
        <button aria-pressed={tab === "path"} onClick={() => setTab("path")}>
          My path{mentor.proposal && <span>Draft ready</span>}
        </button>
      </div>
      <div className="mentor-columns">
        <div
          className={`mentor-chat mentor-panel ${tab !== "chat" ? "mentor-mobile-hidden" : ""}`}
        >
          <div className="mentor-panel-heading">
            <div className="mentor-chat-title">
              <div className="mentor-icon">
                <Sparkles size={20} aria-hidden="true" />
              </div>
              <div>
                <h2>Pathway mentor</h2>
                <p className="mentor-small mentor-muted">
                  Make your next step a little clearer.
                </p>
              </div>
            </div>
            <button
              ref={historyToggle}
              className="mentor-icon-button"
              aria-label="Conversation history"
              onClick={() => setHistory(!history)}
              aria-expanded={history}
              aria-controls="mentor-history"
            >
              <MessageSquare size={19} aria-hidden="true" />
            </button>
          </div>
          {history && (
            <MentorHistoryPanel
              sample={sample}
              count={mentor.messages.filter((m) => m.role === "user").length}
              conversations={sample ? [] : saved.conversations}
              activeId={sample ? null : saved.conversationId}
              hasMore={!sample && Boolean(saved.conversationCursor)}
              onOpen={(id) => {
                void saved.openConversation(id);
                setHistory(false);
              }}
              onDelete={saved.deleteConversation}
              onMore={() => void saved.loadMoreConversations()}
              onNew={() => {
                mentor.clearConversation();
                setHistory(false);
              }}
              onClose={() => {
                setHistory(false);
                historyToggle.current?.focus();
              }}
            />
          )}
          <div
            className="mentor-messages"
            ref={scroll}
            aria-label="Conversation"
            onScroll={(event) => {
              const el = event.currentTarget;
              follow.current =
                el.scrollHeight - el.scrollTop - el.clientHeight < 72;
            }}
          >
            {!sample && saved.messageCursor !== null && (
              <button
                className="mentor-button"
                onClick={() => void saved.loadOlderMessages()}
              >
                Load earlier messages
              </button>
            )}
            {mentor.messages.length === 0 ? (
              <div className="mentor-chat-empty">
                <div className="mentor-icon mentor-icon-large">
                  <Sparkles size={30} aria-hidden="true" />
                </div>
                <h3>
                  You bring the curiosity.
                  <br />
                  Let's find the next step.
                </h3>
                <p>
                  Start with a plan, ask for an explanation, or make a step feel
                  more manageable.
                </p>
                <div className="mentor-suggestions">
                  <button onClick={createPlan} disabled={requestBlocked}>
                    Build my four-week plan
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                  {[
                    "Explain my next step",
                    "Make this easier",
                    "I already know the basics",
                  ].map((text) => (
                    <button
                      key={text}
                      disabled={requestBlocked}
                      onClick={() => mentor.send(text)}
                    >
                      {text}
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              mentor.messages.map((message) => (
                <article
                  key={message.id}
                  className={`mentor-message mentor-message-${message.role}`}
                >
                  <p className="mentor-message-author">
                    {message.role === "user" ? "You" : "Pathway mentor"}
                  </p>
                  {message.text ? (
                    <MentorMarkdown
                      text={message.text}
                      allowedSources={sample ? [] : saved.pathMetadata?.sources}
                    />
                  ) : (
                    <p>
                      {mentor.busy === "plan"
                        ? "Preparing your draft…"
                        : "Thinking about your next step…"}
                    </p>
                  )}
                  {message.partial && (
                    <span className="mentor-small">
                      Stopped · partial response
                    </span>
                  )}
                </article>
              ))
            )}
          </div>
          <div className="mentor-chat-bottom">
            {!sample && (
              <MentorQuota
                enabled={saved.generationEnabled}
                preview={saved.previewEnabled}
                {...saved.quota}
                busy={Boolean(mentor.busy)}
                onRefresh={saved.reload}
              />
            )}
            <p className="mentor-status" role="status">
              {mentor.notice}
            </p>
            {mentor.proposal && (
              <button
                className="mentor-review-link"
                onClick={() => {
                  setTab("path");
                  document
                    .getElementById("my-path-title")
                    ?.scrollIntoView?.({ block: "nearest" });
                }}
              >
                Review your draft in My path
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            )}
            {mentor.error && (
              <div className="mentor-error" role="alert">
                <p>{mentor.error}</p>
                {mentor.canRetry &&
                  !requestBlocked &&
                  mentor.scenario !== "quota" && (
                    <button className="mentor-button" onClick={mentor.retry}>
                      Retry request
                    </button>
                  )}
              </div>
            )}
            <form onSubmit={submit} className="mentor-composer">
              <label className="sr-only" htmlFor="mentor-message">
                Message your mentor
              </label>
              <textarea
                id="mentor-message"
                ref={composer}
                rows={2}
                value={draft}
                maxLength={4000}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="What would you like to work on?"
                disabled={requestBlocked || mentor.scenario === "quota"}
              />
              <div>
                <span className="mentor-small mentor-muted">
                  {draft.length} / 4000
                </span>
                {mentor.busy ? (
                  <button
                    className="mentor-button"
                    type="button"
                    onClick={mentor.stop}
                  >
                    <Square size={14} aria-hidden="true" />
                    Stop
                  </button>
                ) : (
                  <button
                    className="mentor-button mentor-primary"
                    disabled={
                      !draft.trim() ||
                      requestBlocked ||
                      mentor.scenario === "quota"
                    }
                    type="submit"
                  >
                    <Send size={16} aria-hidden="true" />
                    Send
                  </button>
                )}
              </div>
            </form>
            <p className="mentor-small mentor-muted mentor-disclaimer">
              {!sample && saved.generationEnabled ? (
                "Your messages are processed by Cloudflare for an English response and saved in your private history."
              ) : !sample && !saved.previewEnabled ? (
                "Your private history and accepted path remain available. AI responses are currently off."
              ) : (
                <>
                  Example responses · No live AI calls ·{" "}
                  {sample
                    ? "Changes reset when you leave."
                    : "Your profile, conversation and path are saved to your account."}
                </>
              )}
            </p>
          </div>
        </div>
        <div className={tab !== "path" ? "mentor-mobile-hidden" : ""}>
          <LearningPathPanel
            profile={profile}
            path={mentor.path}
            proposal={mentor.proposal}
            metadata={sample ? null : saved.pathMetadata}
            acceptedMetadata={sample ? null : saved.acceptedPathMetadata}
            done={mentor.done}
            busy={Boolean(mentor.busy)}
            canGenerate={!requestBlocked}
            onCreate={createPlan}
            onAccept={mentor.accept}
            onDiscard={mentor.discard}
            onToggle={mentor.toggleDone}
            onExplain={(title) => {
              setTab("chat");
              mentor.send(`Explain this step: ${title}`);
              composer.current?.focus();
            }}
          />
        </div>
      </div>
      {sample && (
        <details className="mentor-preview-controls">
          <summary>Preview controls</summary>
          <p>
            Explore the recovery states. No real AI usage or saved progress is
            affected.
          </p>
          <label>
            Next response
            <select
              disabled={Boolean(mentor.busy)}
              value={mentor.scenario}
              onChange={(e) => {
                const value = scenarios.find(
                  (s) => s.value === e.target.value
                )?.value;
                if (value) mentor.setScenario(value);
              }}
            >
              {scenarios.map((s) => (
                <option value={s.value} key={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <button className="mentor-button" onClick={onExpire}>
            Preview expired session
          </button>
        </details>
      )}
    </>
  );
}
