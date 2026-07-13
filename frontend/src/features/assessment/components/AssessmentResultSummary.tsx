import { BookOpenCheck, Clock3, RotateCcw, Target } from "lucide-react";
import type { ReactNode } from "react";

import { formatAssessmentDuration } from "@/features/assessment/domain/assessmentEngine";
import type {
  AssessmentMetrics,
  SubmittedAttempt,
} from "@/features/assessment/domain/types";

type AssessmentResultSummaryProps = {
  readonly attempt: SubmittedAttempt;
  readonly metrics: AssessmentMetrics;
  readonly questionCount: number;
  readonly onRestart: () => void;
};

export default function AssessmentResultSummary({
  attempt,
  metrics,
  questionCount,
  onRestart,
}: AssessmentResultSummaryProps) {
  return (
    <div className="space-y-5 px-5 py-6 sm:px-7">
      <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
            <BookOpenCheck aria-hidden="true" className="h-5 w-5" />
            <p className="font-bold">
              {attempt.reason === "time-expired"
                ? "Time expired — attempt submitted"
                : "Attempt submitted"}
            </p>
          </div>
          <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
            {metrics.earnedPoints} / {metrics.totalPoints}
            <span className="ml-2 text-base font-semibold text-slate-500 dark:text-slate-400">
              ({metrics.scorePercentage}%)
            </span>
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Correct answers remain hidden so this assessment stays useful for
            another practice attempt.
          </p>
        </div>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 font-bold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        >
          <RotateCcw aria-hidden="true" className="h-4 w-4" />
          Start a new attempt
        </button>
      </div>

      <dl className="grid gap-3 sm:grid-cols-3">
        <ResultFact
          icon={<Target aria-hidden="true" className="h-4 w-4" />}
          label="Correct"
          value={String(metrics.correctCount) + " of " + String(questionCount)}
        />
        <ResultFact
          icon={<BookOpenCheck aria-hidden="true" className="h-4 w-4" />}
          label="Answered"
          value={String(metrics.answeredCount) + " of " + String(questionCount)}
        />
        <ResultFact
          icon={<Clock3 aria-hidden="true" className="h-4 w-4" />}
          label="Time used"
          value={formatAssessmentDuration(
            attempt.submittedAt - attempt.startedAt
          )}
        />
      </dl>
    </div>
  );
}

function ResultFact({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950/40">
      <dt className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 font-bold text-slate-900 dark:text-white">{value}</dd>
    </div>
  );
}
