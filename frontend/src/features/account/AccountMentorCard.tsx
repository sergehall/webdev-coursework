import { useEffect, useState } from "react";
import { ArrowRight, Route } from "lucide-react";
import { Link } from "react-router-dom";

import { mentorRequest } from "@/features/mentor/mentor-api";
import { MENTOR_PATH } from "@/features/mentor/mentor-preview";

type PathSummary = {
  version: number;
  total: number;
  completed: number;
  draftReady: boolean;
};

export default function AccountMentorCard() {
  const [summary, setSummary] = useState<PathSummary | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">(
    "loading"
  );

  useEffect(() => {
    let active = true;
    void mentorRequest<PathSummary>("pathway/summary")
      .then((value) => {
        if (!active) return;
        setSummary(value);
        setStatus("ready");
      })
      .catch(() => {
        if (active) setStatus("unavailable");
      });
    return () => {
      active = false;
    };
  }, []);

  const draft = summary?.draftReady === true;
  const hasPath = Boolean(summary?.version);
  const title = draft
    ? "Your draft is ready"
    : hasPath
      ? "Your learning path is active"
      : "Start your learning path";
  const action = draft
    ? "Review my draft"
    : hasPath
      ? "Continue my path"
      : "Create my learning plan";
  const description = hasPath
    ? `${summary?.completed ?? 0} of ${summary?.total ?? 0} steps done.${draft ? " Your current path stays active until you accept the new draft." : ""}`
    : draft
      ? "Review the proposed steps before accepting your plan."
      : "Choose a goal and get a four-week plan based on the coursework and roadmap.";
  const cardTitle =
    status === "loading"
      ? "Loading your learning status…"
      : status === "unavailable"
        ? "Learning status unavailable"
        : title;
  const cardDescription =
    status === "unavailable" ? "Try again later." : description;
  const cardAction = status === "ready" ? action : "Open AI Pathway";

  return (
    <Link
      className="owner-card owner-mentor-card"
      to={MENTOR_PATH}
      aria-label={cardAction}
    >
      <div className="owner-overview-heading">
        <Route size={18} aria-hidden="true" />
        <h2 id="owner-mentor-title">AI Pathway Mentor</h2>
      </div>
      <p
        className="owner-mentor-summary"
        role={status === "loading" ? "status" : undefined}
      >
        <strong>{cardTitle}</strong>
        <span>{cardDescription}</span>
      </p>
      <span className="owner-mentor-action">
        {cardAction} <ArrowRight size={15} aria-hidden="true" />
      </span>
    </Link>
  );
}
