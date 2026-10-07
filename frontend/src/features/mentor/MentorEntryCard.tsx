import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { MENTOR_PATH, mentorPublicEntryEnabled } from "./mentor-preview";

export default function MentorEntryCard() {
  if (!mentorPublicEntryEnabled()) return null;
  return (
    <section
      aria-labelledby="mentor-entry-title"
      className="flex flex-col gap-5 rounded-3xl border border-cyan-200 bg-gradient-to-r from-cyan-50 via-white to-violet-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:border-cyan-900 dark:from-cyan-950/40 dark:via-slate-900 dark:to-violet-950/30"
    >
      <div className="flex items-start gap-4">
        <Sparkles
          className="mt-1 h-7 w-7 shrink-0 text-cyan-600 dark:text-cyan-300"
          aria-hidden="true"
        />
        <div>
          <p className="mb-2 text-xs font-bold tracking-widest text-cyan-700 uppercase dark:text-cyan-300">
            AI pathway mentor{import.meta.env.DEV ? " · Preview" : ""}
          </p>
          <h2
            id="mentor-entry-title"
            className="text-xl font-bold text-slate-950 dark:text-white"
          >
            Turn your curiosity into a learning plan.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Choose your direction, find your next step, and build something you
            can be proud of.
          </p>
        </div>
      </div>
      <Link
        to={MENTOR_PATH}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white outline-offset-4 hover:bg-cyan-900 focus-visible:outline-2 focus-visible:outline-cyan-500 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-cyan-200"
      >
        Build my learning path with AI{" "}
        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}
