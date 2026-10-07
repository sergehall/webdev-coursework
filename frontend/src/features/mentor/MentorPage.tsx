import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import {
  clearMentorReturn,
  mentorPreviewEnabled,
  rememberMentorReturn,
} from "./mentor-preview";
import MentorWorkspace from "./MentorWorkspace";

import { useOwner } from "@/features/account/owner-context";
import "./mentor.css";

export default function MentorPage() {
  return mentorPreviewEnabled ? (
    <MentorPreviewPage />
  ) : (
    <Navigate to="/web-developer-path" replace />
  );
}

function MentorPreviewPage() {
  const owner = useOwner();
  const publicAccess = import.meta.env.VITE_AI_MENTOR_PUBLIC_ENABLED === "true";
  const [sample, setSample] = useState(false);
  const [expired, setExpired] = useState(false);
  const [expiredAccount, setExpiredAccount] = useState(false);
  const status = owner?.status;
  const refresh = owner?.refresh;
  useEffect(() => {
    if (status === "idle") void refresh?.().catch(() => {});
  }, [status, refresh]);
  useEffect(() => {
    if (status === "authenticated") clearMentorReturn();
  }, [status]);
  const authenticated = status === "authenticated" && owner?.session;
  const waiting =
    !sample && !expired && (status === "idle" || status === "loading");
  const open = !expired && (sample || authenticated);
  return (
    <div className="mentor">
      <nav className="mentor-nav" aria-label="Pathway sections">
        <Link to="/web-developer-path">
          <ArrowLeft size={16} aria-hidden="true" />
          Program overview
        </Link>
        <span aria-current="page">My AI pathway</span>
      </nav>
      <div className="mentor-preview-banner">
        <span className="mentor-preview-tag">
          {sample
            ? "Interactive preview"
            : publicAccess
              ? "AI learning workspace"
              : "Private beta"}
        </span>
        <span>
          {sample
            ? "Example responses. Changes reset when you leave or reload."
            : "Your signed-in profile, conversations, path and progress are saved. Chat mode is shown below."}
        </span>
      </div>
      {open ? (
        <MentorWorkspace
          sample={sample}
          key={
            sample
              ? "sample"
              : `${owner?.session?.profile.username ?? "account"}-${owner?.session?.issuedAt}`
          }
          onExpire={() => {
            if (!sample) {
              setExpiredAccount(true);
              owner?.clear();
            }
            setExpired(true);
            setSample(false);
          }}
        />
      ) : waiting ? (
        <div className="mentor-panel mentor-loading" role="status">
          Checking your account…
        </div>
      ) : (
        <section
          className="mentor-gate mentor-panel"
          aria-labelledby="mentor-welcome"
        >
          <div className="mentor-gate-copy">
            <p className="mentor-eyebrow">
              <Sparkles size={17} aria-hidden="true" />
              AI Pathway Mentor
            </p>
            <h1 id="mentor-welcome">
              A clear next step.
              <br />
              <span>A path that's yours.</span>
            </h1>
            <p className="mentor-gate-description">
              Turn “where do I start?” into a learning plan that fits your
              goals, your experience, and your week.
            </p>
            <ul>
              {[
                "Choose a direction that interests you",
                "Learn through small, practical projects",
                "Review your path and track your own progress",
              ].map((text) => (
                <li key={text}>
                  <Check size={18} aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
            {expired ? (
              <p role="alert" className="mentor-error">
                {expiredAccount || authenticated
                  ? "Your account session ended. Sign in again to restore your saved workspace."
                  : "Your preview session expired. The conversation and personal path have been cleared."}
              </p>
            ) : (
              status === "error" && (
                <div role="alert" className="mentor-error">
                  <p>We couldn't check your account. Please try again.</p>
                  <button
                    className="mentor-button"
                    onClick={() => void refresh?.().catch(() => {})}
                  >
                    Check account again
                  </button>
                </div>
              )
            )}
            <div className="mentor-actions">
              <Link
                className="mentor-button mentor-primary"
                to="/account/sign-in"
                onClick={rememberMentorReturn}
              >
                <LockKeyhole size={16} aria-hidden="true" />
                Sign in to build my path
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              {(import.meta.env.DEV || publicAccess) && (
                <Link
                  className="mentor-button"
                  to="/account/sign-up"
                  onClick={rememberMentorReturn}
                >
                  Create an account
                </Link>
              )}
            </div>
            {!import.meta.env.DEV && !publicAccess && (
              <p className="mentor-muted mentor-small">
                Private beta access requires an invited account.
              </p>
            )}
            {import.meta.env.DEV && (
              <>
                <button
                  className="mentor-sample-link"
                  onClick={() => {
                    setExpired(false);
                    setSample(true);
                  }}
                >
                  Explore with an example profile
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
                <p className="mentor-muted mentor-small">
                  Example access is available only in this development preview.
                </p>
              </>
            )}
          </div>
          <div
            className="mentor-welcome-path"
            aria-label="Example learning journey"
          >
            <p className="mentor-eyebrow">From a question to a next step</p>
            {[
              {
                n: "01",
                title: "Find your starting point",
                text: "Your goal, your experience, your time.",
              },
              {
                n: "02",
                title: "Make a plan together",
                text: "Four weeks of achievable practice.",
              },
              {
                n: "03",
                title: "Build. Reflect. Keep going.",
                text: "Small projects. Clear completion criteria.",
              },
            ].map((item) => (
              <div key={item.n}>
                <span>{item.n}</span>
                <section>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </section>
              </div>
            ))}
            <p className="mentor-welcome-note">
              Your progress starts with you.
              <br />
              No pressure to know everything yet.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
