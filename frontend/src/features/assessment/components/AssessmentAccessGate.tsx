import { CircleAlert, LockKeyhole, ShieldCheck } from "lucide-react";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { getAssessmentTotalPoints } from "@/features/assessment/domain/assessmentEngine";
import type { AssessmentDefinition } from "@/features/assessment/domain/types";

type AssessmentAccessGateProps = {
  readonly definition: AssessmentDefinition;
  readonly overview?: ReactNode;
  readonly onUnlock: () => void;
};

export default function AssessmentAccessGate({
  definition,
  overview,
  onUnlock,
}: AssessmentAccessGateProps) {
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const totalPoints = getAssessmentTotalPoints(definition.questions);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      accessCode.trim().toUpperCase() !== definition.accessCode.toUpperCase()
    ) {
      setAccessError("That access code is not valid. Try again.");
      return;
    }
    setAccessError("");
    onUnlock();
  };

  return (
    <section
      aria-labelledby={definition.id + "-access-title"}
      className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="bg-slate-950 px-6 py-8 text-white sm:px-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15 ring-1 ring-sky-400/30">
          <LockKeyhole aria-hidden="true" className="h-6 w-6 text-sky-300" />
        </div>
        <p className="mt-6 text-xs font-bold tracking-[0.22em] text-sky-300 uppercase">
          {definition.eyebrow}
        </p>
        <h2
          id={definition.id + "-access-title"}
          className="mt-2 text-3xl font-bold"
        >
          {definition.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          {definition.summary}
        </p>
      </div>

      <div className="grid gap-6 px-6 py-7 sm:px-10">
        <dl className="grid gap-3 sm:grid-cols-3">
          <ExamFact
            label="Questions"
            value={String(definition.questions.length)}
          />
          <ExamFact label="Points" value={String(totalPoints)} />
          <ExamFact
            label="Time limit"
            value={formatTimeLimit(definition.durationSeconds)}
          />
        </dl>

        {overview}

        <div className="grid gap-3 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm leading-6 text-sky-950 sm:grid-cols-[auto_1fr] dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-100">
          <ShieldCheck
            aria-hidden="true"
            className="h-5 w-5 text-sky-700 dark:text-sky-300"
          />
          <div>
            <strong className="block">Practice attempt</strong>
            Your answers and remaining time are saved only in this browser so an
            accidental reload does not erase your work.
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
          <strong className="block">Before you begin</strong>
          The timer starts as soon as the access code is accepted. Use the
          question navigator to return to unanswered questions.
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <label
            className="block text-sm font-bold text-slate-800 dark:text-slate-100"
            htmlFor={definition.id + "-access-code"}
          >
            Enter the access code when you are ready
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id={definition.id + "-access-code"}
              value={accessCode}
              onChange={(event) => setAccessCode(event.target.value)}
              className="min-h-11 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 font-mono tracking-[0.15em] text-slate-950 uppercase shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none dark:border-slate-600 dark:bg-slate-950 dark:text-white dark:focus:ring-sky-900"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              aria-describedby={
                accessError ? definition.id + "-access-error" : undefined
              }
              aria-invalid={Boolean(accessError)}
              placeholder="Access code"
            />
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-sky-700 px-6 py-3 font-bold text-white transition-colors hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:bg-sky-600 dark:hover:bg-sky-500"
            >
              Begin quiz
            </button>
          </div>
          <div className="min-h-6" aria-live="polite">
            {accessError ? (
              <p
                id={definition.id + "-access-error"}
                className="flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-300"
                role="alert"
              >
                <CircleAlert aria-hidden="true" className="h-4 w-4" />
                {accessError}
              </p>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {definition.accessHint}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function formatTimeLimit(durationSeconds: number): string {
  const totalMinutes = Math.ceil(durationSeconds / 60);

  if (totalMinutes >= 120 && totalMinutes % 60 === 0) {
    const hours = totalMinutes / 60;
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }

  return `${totalMinutes} minutes`;
}

function ExamFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950/40">
      <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 font-bold text-slate-900 dark:text-white">{value}</dd>
    </div>
  );
}
