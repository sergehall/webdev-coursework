import { ChevronDown, ExternalLink, FolderOpen } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";

import type { CourseName, Tech } from "@/data/technologies";
import {
  homeCourses,
  type HomeCourse,
  type HomeCourseDomain,
} from "@/features/home/home-content";
import { getIconComponent } from "@/ui/icons";
import { cn } from "@/utils/cn";
import { slugify } from "@/utils/slugify";

type DomainStyle = {
  readonly badge: string;
  readonly marker: string;
};

const domainStyles = {
  Programming: {
    badge:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-200",
    marker: "bg-amber-500",
  },
  Data: {
    badge:
      "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/60 dark:text-rose-200",
    marker: "bg-rose-500",
  },
  Networking: {
    badge:
      "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",
    marker: "bg-slate-500",
  },
  Web: {
    badge:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200",
    marker: "bg-emerald-500",
  },
  Cloud: {
    badge:
      "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/60 dark:text-sky-200",
    marker: "bg-sky-500",
  },
  Security: {
    badge:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/60 dark:text-red-200",
    marker: "bg-red-500",
  },
} satisfies Record<HomeCourseDomain, DomainStyle>;

const TechnologyGrid = memo(function TechnologyGrid({
  items,
  courseKey,
}: {
  readonly items: readonly Tech[];
  readonly courseKey: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map(({ icon, color, label, url }) => {
        const Icon = getIconComponent(icon);

        return (
          <a
            key={`${courseKey}__${url}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-16 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-slate-800 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:ring-offset-slate-950 dark:hover:border-sky-700 dark:hover:bg-slate-800"
          >
            <span
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"
              aria-hidden="true"
            >
              <Icon size={20} strokeWidth={1.75} className={cn(color)} />
            </span>
            <span className="text-left text-sm leading-snug font-semibold">
              {label}
            </span>
          </a>
        );
      })}
    </div>
  );
});

const CourseRow = memo(function CourseRow({
  course,
  open,
  onToggle,
}: {
  readonly course: HomeCourse;
  readonly open: boolean;
  readonly onToggle: () => void;
}) {
  const panelId = `home-course-panel-${slugify(course.name)}`;
  const buttonId = `home-course-button-${slugify(course.name)}`;
  const style = domainStyles[course.domain];

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
      <button
        id={buttonId}
        type="button"
        aria-label={course.name}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            onToggle();
          }
        }}
        className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 text-left transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-inset sm:px-5 dark:hover:bg-slate-800/70"
      >
        <span
          className={cn("h-12 w-1.5 rounded-full", style.marker)}
          aria-hidden="true"
        />

        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs font-black tracking-wide",
                style.badge
              )}
            >
              {course.code}
            </span>
            <span className="text-base font-bold text-slate-950 sm:text-lg dark:text-white">
              {course.title}
            </span>
          </span>
          <span className="mt-1.5 block text-sm text-slate-500 dark:text-slate-400">
            {course.moduleCount} modules · {course.domain}
          </span>
        </span>

        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform motion-reduce:transition-none",
              open && "rotate-180"
            )}
            aria-hidden="true"
          />
        </span>
      </button>

      {open && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="border-t border-slate-200 bg-slate-50/65 px-4 py-5 sm:px-5 dark:border-slate-700 dark:bg-slate-950/45"
        >
          <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              {course.summary}
            </p>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Link
                to={course.assignmentPath}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-bold text-white transition hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:ring-offset-slate-950 dark:hover:bg-sky-100"
              >
                <FolderOpen className="h-4 w-4" aria-hidden="true" />
                View assignments
              </Link>
              <Link
                to="/web-developer-path"
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-sky-300 hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:ring-offset-slate-950 dark:hover:border-sky-700 dark:hover:text-sky-300"
              >
                Degree pathway
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <TechnologyGrid items={course.technologies} courseKey={panelId} />
        </div>
      )}
    </article>
  );
});

type CourseExplorerProps = {
  readonly openCourse: CourseName | null;
  readonly onToggle: (courseName: CourseName) => void;
};

export default function CourseExplorer({
  openCourse,
  onToggle,
}: CourseExplorerProps) {
  return (
    <section aria-labelledby="course-explorer-title" className="text-left">
      <div className="max-w-3xl">
        <p className="text-xs font-bold tracking-[0.16em] text-sky-600 uppercase dark:text-sky-300">
          Coursework evidence
        </p>
        <h2
          id="course-explorer-title"
          className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl dark:text-white"
        >
          Santa Monica College coursework
        </h2>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
          Open a course to review its focus, mapped technology stack, and direct
          path to assignments, labs, reports, quizzes, and final projects.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {homeCourses.map((course) => (
          <CourseRow
            key={course.name}
            course={course}
            open={openCourse === course.name}
            onToggle={() => onToggle(course.name)}
          />
        ))}
      </div>
    </section>
  );
}
