import { Link } from "react-router-dom";

import { courseWeeks } from "../courseContent";
import { resetPageScroll } from "../resetPageScroll";

interface CourseOutlineProps {
  readonly onOpenPresentationText: () => void;
}

export function CourseOutline({ onOpenPresentationText }: CourseOutlineProps) {
  return (
    <section aria-labelledby="weeks-heading">
      <div className="mb-5">
        <h2
          id="weeks-heading"
          className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white"
        >
          16-week course outline
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Based on the Fall 2026 syllabus. Check Canvas for current classwork
          and due dates.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {courseWeeks.map((week) => (
          <details
            key={week.number}
            className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm open:border-sky-300 dark:border-slate-700 dark:bg-slate-900 dark:open:border-sky-600"
          >
            <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:hidden dark:text-white">
              <span className="flex items-center justify-between gap-3">
                <span>
                  Week {week.number}: {week.title}
                </span>
                <span className="shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {week.dates}
                </span>
              </span>
            </summary>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
              {week.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            {week.milestone && (
              <p className="mt-3 rounded-lg bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-800 dark:bg-sky-950 dark:text-sky-200">
                {week.milestone}
              </p>
            )}
            {week.number === 3 && (
              <button
                type="button"
                onClick={onOpenPresentationText}
                className="mt-3 inline-block text-sm font-semibold text-sky-700 hover:underline dark:text-sky-300"
              >
                Open Presentation 1 text →
              </button>
            )}
            {week.number === 5 && (
              <Link
                to="/coursework/ESL10G/presentation-1"
                onClick={resetPageScroll}
                className="mt-3 inline-block text-sm font-semibold text-sky-700 hover:underline dark:text-sky-300"
              >
                Open Presentation 1 →
              </Link>
            )}
          </details>
        ))}
      </div>
    </section>
  );
}
