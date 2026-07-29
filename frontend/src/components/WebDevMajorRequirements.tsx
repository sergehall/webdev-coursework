import React, { useState } from "react";
import { BookOpenCheck, ExternalLink, Minus, Plus } from "lucide-react";

import ExpandedCourseCard from "@/components/ExpandedCourseCard";
import {
  courses,
  isBaseCourse,
  isCourseGroup,
  type BaseCourse,
  type Course,
} from "@/data/webDeveloperCourses";

type SelectedOptionMap = Record<string, string>;
type CourseRowModel = {
  key: string;
  course: Course;
  selected?: BaseCourse;
  selectedCode?: string;
  displayCode: string;
  displayTitle: string;
};

const getCourseKey = (course: Course, idx: number): string =>
  isBaseCourse(course) ? course.code : `group-${idx}`;

const getSelectedGroupOption = (
  course: Course,
  selectedOption: SelectedOptionMap,
  courseKey: string
): BaseCourse | undefined => {
  if (!isCourseGroup(course)) return undefined;
  const selectedCode = selectedOption[courseKey];
  return course.options.find((opt) => opt.code === selectedCode);
};

const toCourseRowModel = (
  course: Course,
  idx: number,
  selectedOption: SelectedOptionMap
): CourseRowModel => {
  const key = getCourseKey(course, idx);
  const selected = getSelectedGroupOption(course, selectedOption, key);

  if (isBaseCourse(course)) {
    return {
      key,
      course,
      selectedCode: selectedOption[key],
      selected,
      displayCode: course.code,
      displayTitle: course.title,
    };
  }

  return {
    key,
    course,
    selectedCode: selectedOption[key],
    selected,
    displayCode: selected?.code ?? "",
    displayTitle: selected
      ? `${course.title}: ${selected.title}`
      : course.title,
  };
};

const WebDevMajorRequirements: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<SelectedOptionMap>({});

  const toggleExpand = (code: string) => {
    setExpanded((prev) => (prev === code ? null : code));
  };

  return (
    <section
      aria-labelledby="major-requirements-title"
      className="w-full rounded-3xl border border-slate-200/80 bg-white/60 p-4 shadow-sm sm:p-5 dark:border-slate-700/80 dark:bg-slate-900/45"
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-950/70 dark:text-cyan-300">
            <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-black tracking-[0.15em] text-cyan-700 uppercase dark:text-cyan-300">
              Coursework sequence
            </p>
            <h2
              id="major-requirements-title"
              className="text-xl font-black text-slate-950 dark:text-white"
            >
              Major requirements
            </h2>
          </div>
        </div>

        <a
          href="https://www.smc.edu/academics/classes/program.php?id=52"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center gap-2 self-start rounded-lg border border-slate-200 bg-white/75 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:self-auto dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:hover:border-cyan-700 dark:hover:text-cyan-300"
        >
          Official SMC program
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      <p className="mb-4 max-w-4xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Explore the courses required specifically for the major. Expand any row
        for its description, units, transfer details, and course notation.
      </p>

      <div className="space-y-2">
        {courses.map((course, idx) => {
          const row = toCourseRowModel(course, idx, selectedOption);
          const isExpanded = expanded === row.key;
          const panelId = `course-panel-${idx}`;
          const buttonId = `course-trigger-${idx}`;

          return (
            <div
              key={row.key}
              className={`overflow-hidden rounded-2xl border bg-white/80 shadow-sm transition duration-200 dark:bg-slate-950/40 ${
                isExpanded
                  ? "border-cyan-300 ring-1 ring-cyan-200 dark:border-cyan-800 dark:ring-cyan-950"
                  : "border-slate-200 hover:border-cyan-300 dark:border-slate-700 dark:hover:border-cyan-800"
              }`}
            >
              <button
                id={buttonId}
                type="button"
                className="group grid min-h-16 w-full grid-cols-[auto_1fr] items-center gap-3 px-4 py-3 text-left transition hover:bg-cyan-50/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-inset sm:grid-cols-[auto_7rem_1fr] sm:gap-4 dark:hover:bg-cyan-950/20"
                onClick={() => toggleExpand(row.key)}
                aria-controls={panelId}
                aria-expanded={isExpanded}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-white transition ${
                    isExpanded
                      ? "bg-gradient-to-br from-violet-500 to-cyan-500"
                      : "bg-slate-800 group-hover:bg-cyan-700 dark:bg-slate-700"
                  }`}
                >
                  {isExpanded ? (
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
                <span className="text-sm font-black tracking-wide text-cyan-700 sm:text-base dark:text-cyan-300">
                  {row.displayCode || "Choose one"}
                </span>
                <span className="col-start-2 font-bold text-slate-800 sm:col-start-3 dark:text-slate-200">
                  {row.displayTitle}
                </span>
              </button>

              {isExpanded && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="border-t border-slate-200 p-3 sm:p-4 dark:border-slate-800"
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  <ExpandedCourseCard
                    course={row.course}
                    selected={row.selected}
                    selectedCode={row.selectedCode}
                    onSelectChange={(value) =>
                      setSelectedOption((prev) => ({
                        ...prev,
                        [row.key]: value,
                      }))
                    }
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WebDevMajorRequirements;
