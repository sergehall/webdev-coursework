import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";

import type { GeneralEducationCourse } from "./generalEducationCourses";

import { TagBadge } from "@/components/tags";

export default function GeneralEducationOptions({
  courses,
}: {
  courses: GeneralEducationCourse[];
}) {
  const id = useId();
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  return (
    <div className="space-y-2" aria-label="Approved course options">
      <p className="font-semibold text-slate-700 dark:text-slate-300">
        Choose one course · 3 units
      </p>
      {courses.map((course) => {
        const expanded = expandedCode === course.code;
        const panelId = `${id}-${course.code.replace(/\W/g, "-")}`;
        const buttonId = `${panelId}-trigger`;

        return (
          <div
            key={course.code}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/80"
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              aria-label={`${course.code} ${course.title}, ${course.units} units`}
              onClick={() => setExpandedCode(expanded ? null : course.code)}
              className="grid min-h-14 w-full grid-cols-[auto_1fr] items-center gap-3 p-3 text-left hover:bg-cyan-50/70 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cyan-500 sm:grid-cols-[auto_7rem_1fr] dark:hover:bg-cyan-950/30"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-700 text-white dark:bg-cyan-900">
                {expanded ? (
                  <Minus className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Plus className="h-4 w-4" aria-hidden="true" />
                )}
              </span>
              <span className="font-black text-cyan-700 dark:text-cyan-300">
                {course.code}
              </span>
              <span className="col-start-2 font-bold text-slate-800 sm:col-start-3 dark:text-slate-200">
                {course.title}
                <span className="mt-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  {course.units} units
                </span>
              </span>
            </button>
            {expanded && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="space-y-3 border-t border-slate-200 p-4 leading-6 text-slate-700 dark:border-slate-700 dark:text-slate-300"
              >
                <p>{course.description}</p>
                {course.prerequisite && (
                  <p>
                    <strong>Prerequisite:</strong> {course.prerequisite}
                  </p>
                )}
                <p>
                  <strong>SMC GE:</strong> Area 1A: English Composition
                </p>
                {course.calGetcArea && (
                  <p>
                    <strong>Cal-GETC:</strong> {course.calGetcArea}
                  </p>
                )}
                <p>
                  <strong>Transfers to:</strong> UC
                </p>
                <div className="flex flex-wrap gap-2">
                  <TagBadge label="General Education" />
                  <TagBadge label="Available Online" />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
