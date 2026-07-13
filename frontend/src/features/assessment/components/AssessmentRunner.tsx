import clsx from "clsx";
import {
  CheckCircle2,
  CircleAlert,
  Clock3,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, Ref } from "react";

import { useAssessmentAttempt } from "@/features/assessment/application/useAssessmentAttempt";
import AssessmentAccessGate from "@/features/assessment/components/AssessmentAccessGate";
import AssessmentNavigator from "@/features/assessment/components/AssessmentNavigator";
import AssessmentQuestionCard from "@/features/assessment/components/AssessmentQuestionCard";
import AssessmentResultSummary from "@/features/assessment/components/AssessmentResultSummary";
import {
  assertAssessmentDefinition,
  formatAssessmentTimer,
  getQuestionResponse,
} from "@/features/assessment/domain/assessmentEngine";
import type {
  AssessmentDefinition,
  AssessmentMetrics,
} from "@/features/assessment/domain/types";

type AssessmentRunnerProps = {
  readonly definition: AssessmentDefinition;
  readonly overview?: ReactNode;
};

export default function AssessmentRunner({
  definition,
  overview,
}: AssessmentRunnerProps) {
  useMemo(() => assertAssessmentDefinition(definition), [definition]);
  const {
    attempt,
    metrics,
    secondsRemaining,
    persistenceStatus,
    hasRestoredAttempt,
    startAttempt,
    updateResponse,
    submitAttempt,
    restartAttempt,
  } = useAssessmentAttempt(definition);
  const [isSubmitReviewOpen, setIsSubmitReviewOpen] = useState(false);
  const submitReviewRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isSubmitReviewOpen) return;
    submitReviewRef.current?.focus();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    submitReviewRef.current?.scrollIntoView?.({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
  }, [isSubmitReviewOpen]);

  if (attempt.status === "locked") {
    return (
      <AssessmentAccessGate
        definition={definition}
        overview={overview}
        onUnlock={startAttempt}
      />
    );
  }

  const submitted = attempt.status === "submitted";
  const unansweredCount = definition.questions.length - metrics.answeredCount;

  const confirmSubmit = () => {
    setIsSubmitReviewOpen(false);
    submitAttempt("manual");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="space-y-6" aria-labelledby={definition.id + "-title"}>
      <header className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-7 dark:border-slate-700 dark:bg-slate-950/60">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-bold tracking-[0.2em] text-sky-700 uppercase dark:text-sky-300">
                  {definition.eyebrow}
                </p>
                <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[0.7rem] font-bold text-sky-800 dark:bg-sky-950 dark:text-sky-200">
                  Practice mode
                </span>
              </div>
              <h2
                id={definition.id + "-title"}
                className="mt-1 text-2xl font-bold text-slate-950 dark:text-white"
              >
                {definition.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {definition.questions.length} questions · {metrics.totalPoints}{" "}
                points
              </p>
            </div>
            <div
              role="timer"
              className={clsx(
                "flex items-center gap-2 rounded-lg border px-3 py-2 font-mono text-sm font-bold",
                !submitted && secondsRemaining <= 300
                  ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
                  : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              )}
              aria-label={
                formatAssessmentTimer(secondsRemaining) + " remaining"
              }
            >
              <Clock3 aria-hidden="true" className="h-4 w-4" />
              {formatAssessmentTimer(secondsRemaining)}
            </div>
          </div>
        </div>

        {submitted ? (
          <AssessmentResultSummary
            attempt={attempt}
            metrics={metrics}
            questionCount={definition.questions.length}
            onRestart={restartAttempt}
          />
        ) : (
          <div className="px-5 py-4 sm:px-7">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {metrics.answeredCount} of {definition.questions.length}{" "}
                answered
              </span>
              <span className="flex items-center gap-2 font-semibold text-slate-500 dark:text-slate-400">
                <ShieldCheck aria-hidden="true" className="h-4 w-4" />
                {metrics.progressPercentage}% ·{" "}
                {persistenceStatus === "saved"
                  ? "saved locally"
                  : "save unavailable"}
              </span>
            </div>
            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={0}
              aria-valuemax={definition.questions.length}
              aria-valuenow={metrics.answeredCount}
            >
              <div
                className="h-full rounded-full bg-sky-600 transition-[width] motion-reduce:transition-none"
                style={{ width: String(metrics.progressPercentage) + "%" }}
              />
            </div>
          </div>
        )}
      </header>

      {hasRestoredAttempt && !submitted ? (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-100"
        >
          <CheckCircle2
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0"
          />
          Your saved attempt was restored. The timer continued from the original
          deadline.
        </div>
      ) : null}

      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[minmax(0,1fr)_230px]">
        <div className="min-w-0 space-y-5">
          {definition.questions.map((question, index) => (
            <AssessmentQuestionCard
              key={question.id}
              assessmentId={definition.id}
              question={question}
              position={index + 1}
              questionCount={definition.questions.length}
              response={getQuestionResponse(attempt.answers, question.id)}
              submitted={submitted}
              onChange={(response) => updateResponse(question.id, response)}
            />
          ))}

          {!submitted ? (
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                Review your progress before submitting. Submission is final for
                this attempt, but you can start a fresh attempt afterward.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitReviewOpen(true)}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-sky-700 px-5 py-3 font-bold text-white transition-colors hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto dark:bg-sky-600 dark:hover:bg-sky-500"
              >
                <Send aria-hidden="true" className="h-4 w-4" />
                Review & submit
              </button>
            </div>
          ) : null}

          {isSubmitReviewOpen && !submitted ? (
            <SubmitReviewPanel
              ref={submitReviewRef}
              assessmentId={definition.id}
              metrics={metrics}
              questionCount={definition.questions.length}
              unansweredCount={unansweredCount}
              onCancel={() => setIsSubmitReviewOpen(false)}
              onConfirm={confirmSubmit}
            />
          ) : null}
        </div>

        <AssessmentNavigator
          definition={definition}
          answers={attempt.answers}
          submitted={submitted}
          secondsRemaining={secondsRemaining}
          restored={hasRestoredAttempt}
          persistenceStatus={persistenceStatus}
          onReviewSubmit={() => setIsSubmitReviewOpen(true)}
        />
      </div>
    </section>
  );
}

type SubmitReviewPanelProps = {
  readonly ref: Ref<HTMLElement>;
  readonly assessmentId: string;
  readonly metrics: AssessmentMetrics;
  readonly questionCount: number;
  readonly unansweredCount: number;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
};

function SubmitReviewPanel({
  ref,
  assessmentId,
  metrics,
  questionCount,
  unansweredCount,
  onCancel,
  onConfirm,
}: SubmitReviewPanelProps) {
  return (
    <section
      ref={ref}
      tabIndex={-1}
      aria-labelledby={assessmentId + "-submit-review-title"}
      className="rounded-xl border-2 border-sky-300 bg-sky-50 p-5 shadow-sm focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:border-sky-800 dark:bg-sky-950/30"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            id={assessmentId + "-submit-review-title"}
            className="text-lg font-bold text-slate-950 dark:text-white"
          >
            Ready to submit?
          </h3>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
            You answered {metrics.answeredCount} of {questionCount} questions.
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close submission review"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-slate-600 hover:bg-white focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:text-slate-300 dark:hover:bg-slate-900"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      {unansweredCount > 0 ? (
        <p className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
          <CircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          {unansweredCount} question{unansweredCount === 1 ? "" : "s"} will be
          submitted without an answer.
        </p>
      ) : (
        <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
          Every question has an answer.
        </p>
      )}

      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 font-bold text-slate-700 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        >
          Continue reviewing
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-sky-700 px-5 py-2 font-bold text-white hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:bg-sky-600 dark:hover:bg-sky-500"
        >
          <Send aria-hidden="true" className="h-4 w-4" />
          Submit attempt
        </button>
      </div>
    </section>
  );
}
