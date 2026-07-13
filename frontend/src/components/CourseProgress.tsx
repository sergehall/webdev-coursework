"use client";

import { useId } from "react";

export type CourseProgressProps = {
  readonly completedModules: number;
  readonly totalModules: number;
  readonly isLoading?: boolean;
};

type CourseProgressMetrics = {
  readonly completedModules: number;
  readonly totalModules: number;
  readonly remainingModules: number;
  readonly percentage: number;
};

const toNonNegativeInteger = (value: number): number =>
  Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;

const getCourseProgressMetrics = (
  completedModules: number,
  totalModules: number
): CourseProgressMetrics => {
  const safeTotalModules = toNonNegativeInteger(totalModules);
  const safeCompletedModules = Math.min(
    toNonNegativeInteger(completedModules),
    safeTotalModules
  );
  const remainingModules = safeTotalModules - safeCompletedModules;
  const percentage =
    safeTotalModules > 0
      ? Math.round((safeCompletedModules / safeTotalModules) * 100)
      : 0;

  return {
    completedModules: safeCompletedModules,
    totalModules: safeTotalModules,
    remainingModules,
    percentage,
  };
};

export default function CourseProgress({
  completedModules,
  totalModules,
  isLoading = false,
}: CourseProgressProps) {
  const titleId = useId();
  const summaryId = useId();

  if (isLoading) {
    return <CourseProgressSkeleton titleId={titleId} />;
  }

  const metrics = getCourseProgressMetrics(completedModules, totalModules);
  const hasCourseModules = metrics.totalModules > 0;

  if (!hasCourseModules) {
    return <CourseProgressUnavailable titleId={titleId} />;
  }

  const isComplete = metrics.remainingModules === 0;
  const summary = `${metrics.completedModules} of ${metrics.totalModules} modules completed`;

  return (
    <section
      className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-700 dark:bg-slate-900"
      aria-labelledby={titleId}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h2
            id={titleId}
            className="text-base font-bold text-slate-950 dark:text-white"
          >
            Course progress
          </h2>
          <p
            id={summaryId}
            className="mt-1 text-sm text-slate-600 dark:text-slate-300"
          >
            {summary}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800 tabular-nums dark:bg-emerald-950 dark:text-emerald-200">
          {metrics.percentage}%
        </span>
      </div>

      <div
        className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 shadow-inner dark:bg-slate-700"
        role="progressbar"
        aria-label="Course progress"
        aria-describedby={summaryId}
        aria-valuemin={0}
        aria-valuemax={metrics.totalModules}
        aria-valuenow={metrics.completedModules}
        aria-valuetext={summary}
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-emerald-600 to-green-400 transition-[width] duration-500 ease-out motion-reduce:transition-none dark:from-emerald-500 dark:to-green-400"
          style={{ width: `${metrics.percentage}%` }}
        />
      </div>

      <p
        className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400"
        aria-live="polite"
      >
        {isComplete
          ? "All modules completed"
          : formatRemainingModules(metrics.remainingModules)}
      </p>
    </section>
  );
}

function CourseProgressUnavailable({ titleId }: { readonly titleId: string }) {
  return (
    <section
      className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-700 dark:bg-slate-900"
      aria-labelledby={titleId}
    >
      <h2
        id={titleId}
        className="text-base font-bold text-slate-950 dark:text-white"
      >
        Course progress
      </h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Course progress is unavailable
      </p>
    </section>
  );
}

function CourseProgressSkeleton({ titleId }: { readonly titleId: string }) {
  return (
    <section
      className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-700 dark:bg-slate-900"
      aria-labelledby={titleId}
      aria-busy="true"
    >
      <h2
        id={titleId}
        className="text-base font-bold text-slate-950 dark:text-white"
      >
        Course progress
      </h2>
      <p className="sr-only" role="status">
        Loading course progress
      </p>
      <div
        className="mt-3 space-y-3 motion-safe:animate-pulse"
        aria-hidden="true"
      >
        <div className="h-4 w-44 max-w-full rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-28 rounded bg-slate-100 dark:bg-slate-800" />
      </div>
    </section>
  );
}

function formatRemainingModules(remainingModules: number): string {
  return `${remainingModules} ${remainingModules === 1 ? "module" : "modules"} remaining`;
}
