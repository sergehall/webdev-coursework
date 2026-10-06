import { ArrowUpRight, Check, Flag, Route } from "lucide-react";
import { Link } from "react-router-dom";

import type { Milestone } from "./mentor-demo";
import type { SavedProposal } from "./mentor-api";

type Props = {
  path: Milestone[] | null;
  proposal: Milestone[] | null;
  metadata: SavedProposal["metadata"];
  done: string[];
  busy: boolean;
  canGenerate?: boolean;
  onCreate: () => void;
  onAccept: () => void;
  onDiscard: () => void;
  onToggle: (id: string) => void;
  onExplain: (title: string) => void;
};
export default function LearningPathPanel({
  path,
  proposal,
  metadata,
  done,
  busy,
  canGenerate = true,
  onCreate,
  onAccept,
  onDiscard,
  onToggle,
  onExplain,
}: Props) {
  const steps = proposal ?? path;
  const next = path?.find((step) => !done.includes(step.id));
  return (
    <section
      className="mentor-path mentor-panel"
      aria-labelledby="my-path-title"
    >
      <div className="mentor-panel-heading">
        <div>
          <p className="mentor-eyebrow">Small steps. Real practice.</p>
          <h2 id="my-path-title">My path</h2>
        </div>
        <Route size={23} aria-hidden="true" />
      </div>
      {steps ? (
        <>
          <div className="mentor-path-summary">
            <strong>
              {proposal
                ? "Review your draft"
                : `${done.length} of ${path?.length ?? 0} steps complete`}
            </strong>
            <span>
              {proposal
                ? "4 weeks · Proposed practice"
                : "Progress you report yourself"}
            </span>
          </div>
          {proposal && (
            <div className="mentor-draft-notice">
              <p>
                {path
                  ? "Review this replacement. Your current path stays active until you accept it."
                  : "Make this path yours when you're ready. Accepting it does not mark any skills complete."}
              </p>
              {metadata?.rationale && <p>{metadata.rationale}</p>}
              {metadata?.assumptions?.length ? (
                <p>Assumptions: {metadata.assumptions.join(" ")}</p>
              ) : null}
              <div className="mentor-actions">
                <button
                  className="mentor-button mentor-primary"
                  onClick={onAccept}
                  disabled={busy}
                >
                  Accept this path
                  <Check size={16} aria-hidden="true" />
                </button>
                <button
                  className="mentor-button"
                  onClick={onDiscard}
                  disabled={busy}
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
          {!proposal && (
            <>
              <progress
                aria-label="Learning path progress"
                value={done.length}
                max={path?.length ?? 8}
              />
              <button
                className="mentor-button mentor-adjust"
                onClick={onCreate}
                disabled={busy || !canGenerate}
              >
                Adjust my plan
              </button>
            </>
          )}
          {[1, 2, 3, 4].map((week) => (
            <div className="mentor-week" key={week}>
              <p className="mentor-eyebrow">Week {week}</p>
              {steps
                .filter((s) => s.week === week)
                .map((step) => (
                  <article
                    className={`mentor-step ${!proposal && next?.id === step.id ? "mentor-step-next" : ""}`}
                    key={step.id}
                  >
                    <div className="mentor-step-heading">
                      <h3>{step.title}</h3>
                      {!proposal && done.includes(step.id) && (
                        <Check size={18} aria-label="Completed" />
                      )}
                    </div>
                    <span className="mentor-muted mentor-small">
                      About {step.hours} h ·{" "}
                      {proposal
                        ? "Suggested practice"
                        : next?.id === step.id
                          ? "Your next step"
                          : "Practice"}
                    </span>
                    <p>
                      <strong>Done when:</strong> {step.doneWhen}
                    </p>
                    {step.sourceIds?.length ? (
                      <ul
                        className="mentor-step-sources"
                        aria-label="Coursework sources"
                      >
                        {step.sourceIds.map((id) => {
                          const source = metadata?.sources.find(
                            (item) => item.sourceId === id
                          );
                          return source ? (
                            <li key={id}>
                              <Link to={source.href}>{source.title}</Link>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    ) : null}
                    {!proposal && (
                      <div className="mentor-step-actions">
                        <label>
                          <input
                            type="checkbox"
                            aria-label={`Mark “${step.title}” as done`}
                            checked={done.includes(step.id)}
                            onChange={() => onToggle(step.id)}
                          />
                          Mark as done
                        </label>
                        <button
                          type="button"
                          disabled={busy || !canGenerate}
                          onClick={() => onExplain(step.title)}
                        >
                          Explain this step
                        </button>
                      </div>
                    )}
                  </article>
                ))}
            </div>
          ))}
          {!proposal && !next && (
            <p className="mentor-complete">
              <Flag size={18} aria-hidden="true" />
              You finished this path. Take a moment to review what you learned.
            </p>
          )}
          <Link className="mentor-material-link" to="/coursework">
            Browse coursework <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <p className="mentor-small mentor-muted">
            Example exercises are proposals, not completed coursework or
            official program requirements.
          </p>
        </>
      ) : (
        <div className="mentor-path-empty">
          <div className="mentor-path-map" aria-hidden="true">
            <span>01</span>
            <i />
            <span>02</span>
            <i />
            <span>03</span>
            <i />
            <span>04</span>
          </div>
          <h3>Your next chapter starts here.</h3>
          <p>
            A four-week starting point, with small projects and clear ways to
            check your progress.
          </p>
          <button
            className="mentor-button mentor-primary"
            onClick={onCreate}
            disabled={busy || !canGenerate}
          >
            Create my first plan
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          <p className="mentor-small mentor-muted">
            You'll review it before accepting.
          </p>
        </div>
      )}
    </section>
  );
}
