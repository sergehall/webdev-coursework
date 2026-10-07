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

  return (
    <section
      className="owner-card owner-mentor-card"
      aria-labelledby="owner-mentor-title"
    >
      <div className="owner-overview-heading">
        <Route size={18} aria-hidden="true" />
        <h2 id="owner-mentor-title">AI Pathway Mentor</h2>
      </div>
      {status === "loading" ? (
        <p role="status" className="owner-muted">
          Loading your learning status…
        </p>
      ) : status === "unavailable" ? (
        <>
          <p className="owner-muted">
            Your learning status is temporarily unavailable. Try again later.
          </p>
          <div className="owner-overview-footer">
            <Link className="owner-text-link" to={MENTOR_PATH}>
              Open AI Pathway <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <p className="owner-mentor-status">{title}</p>
          <p className="owner-muted">
            {hasPath
              ? `${summary?.completed ?? 0} of ${summary?.total ?? 0} steps marked done by you.${draft ? " Your current path stays active until you accept the new draft." : ""}`
              : draft
                ? "Review the proposed steps before accepting your plan."
                : "Choose a goal and get a four-week plan based on the coursework and roadmap."}
          </p>
          <div className="owner-overview-footer">
            <Link className="owner-text-link" to={MENTOR_PATH}>
              {action} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
