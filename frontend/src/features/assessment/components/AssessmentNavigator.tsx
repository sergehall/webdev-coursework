import clsx from "clsx";
import { CheckCircle2, CloudCheck, CloudOff, RotateCcw } from "lucide-react";

import {
  formatAssessmentTimer,
  getQuestionDomId,
  getQuestionResponse,
  isQuestionAnswered,
  isQuestionCorrect,
} from "@/features/assessment/domain/assessmentEngine";
import type {
  AssessmentAnswerState,
  AssessmentDefinition,
} from "@/features/assessment/domain/types";

type AssessmentNavigatorProps = {
  readonly definition: AssessmentDefinition;
  readonly answers: AssessmentAnswerState;
  readonly submitted: boolean;
  readonly secondsRemaining: number;
  readonly restored: boolean;
  readonly persistenceStatus: "saved" | "unavailable";
  readonly onReviewSubmit: () => void;
};

export default function AssessmentNavigator({
  definition,
  answers,
  submitted,
  secondsRemaining,
  restored,
  persistenceStatus,
  onReviewSubmit,
}: AssessmentNavigatorProps) {
  const navigateToQuestion = (questionId: number) => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    document
      .getElementById(getQuestionDomId(definition.id, questionId))
      ?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
  };

  return (
    <aside
      aria-label="Question navigator"
      className="sticky top-4 order-first rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:order-last dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex items-center justify-between gap-3 lg:block">
        <h3 className="font-bold text-slate-900 dark:text-white">
          Question navigator
        </h3>
        <p className="font-mono text-xs font-bold text-slate-500 lg:mt-1 dark:text-slate-400">
          {formatAssessmentTimer(secondsRemaining)} left
        </p>
      </div>

      <p
        className={clsx(
          "mt-3 flex items-center gap-2 text-xs font-semibold",
          persistenceStatus === "saved"
            ? "text-emerald-700 dark:text-emerald-300"
            : "text-amber-700 dark:text-amber-300"
        )}
      >
        {persistenceStatus === "saved" ? (
          <CloudCheck aria-hidden="true" className="h-4 w-4" />
        ) : (
          <CloudOff aria-hidden="true" className="h-4 w-4" />
        )}
        {persistenceStatus === "saved"
          ? restored
            ? "Attempt restored and saved"
            : "Progress saved locally"
          : "Local save is unavailable"}
      </p>

      <div className="mt-4 grid grid-cols-8 gap-2 sm:grid-cols-11 lg:grid-cols-5">
        {definition.questions.map((question, index) => {
          const response = getQuestionResponse(answers, question.id);
          const answered = isQuestionAnswered(question, response);
          const correct = submitted && isQuestionCorrect(question, response);
          return (
            <button
              key={question.id}
              type="button"
              onClick={() => navigateToQuestion(question.id)}
              className={clsx(
                "flex min-h-11 items-center justify-center rounded-md border text-xs font-bold transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none",
                submitted
                  ? correct
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200"
                    : "border-red-300 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
                  : answered
                    ? "border-sky-500 bg-sky-600 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-sky-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              )}
              aria-label={
                "Go to question " +
                String(index + 1) +
                (answered ? ", answered" : ", unanswered")
              }
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-2 border-t border-slate-200 pt-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
        {submitted ? (
          <>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
              Correct
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-red-500" />
              Needs review
            </span>
          </>
        ) : (
          <>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-sky-600" />
              Answered
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm border border-slate-400 bg-white dark:bg-slate-800" />
              Not answered
            </span>
          </>
        )}
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={onReviewSubmit}
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-sky-700 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:bg-sky-600 dark:hover:bg-sky-500"
        >
          <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
          Review answers
        </button>
      ) : (
        <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <RotateCcw aria-hidden="true" className="h-4 w-4" />
          Retry is available in the result summary.
        </p>
      )}
    </aside>
  );
}
