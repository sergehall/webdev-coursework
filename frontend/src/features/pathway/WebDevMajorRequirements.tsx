import React, { useState } from "react";
import {
  BookOpenCheck,
  Download,
  ExternalLink,
  Minus,
  Plus,
} from "lucide-react";

import GeneralEducationOptions from "./GeneralEducationOptions";
import {
  certificateEntries,
  degreeSource,
  pathwayReviewedAt,
  pathwaySemesters,
  programSource,
} from "./webDeveloperPathway";

import ExpandedCourseCard from "@/components/ExpandedCourseCard";
import {
  isBaseCourse,
  isCourseGroup,
  type BaseCourse,
  type Course,
} from "@/courses/catalog/webDeveloperCourses";
import { TagBadge } from "@/components/tags";

type SelectedOptionMap = Record<string, string>;
type CourseRowModel = {
  key: string;
  course: Course;
  selected?: BaseCourse;
  selectedCode?: string;
  displayCode: string;
  displayTitle: string;
};

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
  key: string,
  selectedOption: SelectedOptionMap
): CourseRowModel => {
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
  const [credential, setCredential] = useState<"degree" | "certificate">(
    "degree"
  );
  const [majorOnly, setMajorOnly] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<SelectedOptionMap>({});

  const toggleExpand = (code: string) => {
    setExpanded((prev) => (prev === code ? null : code));
  };

  const sections =
    credential === "degree"
      ? pathwaySemesters.map((semester) => {
          const entries = majorOnly
            ? semester.entries.filter((entry) =>
                entry.tags.includes("Program Requirement")
              )
            : semester.entries;
          return {
            id: `semester-${semester.number}`,
            title: `Semester ${semester.number}`,
            units: majorOnly
              ? `${entries.reduce((sum, entry) => sum + Number(entry.units), 0)} major units`
              : `${semester.units} units`,
            entries,
          };
        })
      : [
          {
            id: "certificate",
            title: "Major requirements",
            units: "27 units",
            entries: certificateEntries,
          },
        ];

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
              Coursework plan
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <a
            href="/program-documents/smc-web-developer-program-pathway.pdf"
            download="SMC-Web-Developer-Program-Pathway.pdf"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50/75 px-3 py-2 text-xs font-bold text-cyan-800 transition hover:border-cyan-400 hover:bg-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-200 dark:hover:border-cyan-600 dark:hover:bg-cyan-950/70"
          >
            <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Download original SMC pathway (PDF)
          </a>
          <a
            href={programSource}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white/75 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-slate-700 dark:bg-slate-950/55 dark:text-slate-200 dark:hover:border-cyan-700 dark:hover:text-cyan-300"
          >
            Official SMC program
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      <p className="mb-4 max-w-4xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Follow the full Associate in Science pathway or view only the
        Certificate of Achievement major requirements. Expand a row for course
        details or approved General Education choices.
      </p>

      <div
        role="group"
        aria-label="Credential"
        className="mb-4 flex flex-wrap gap-2"
      >
        {(
          [
            ["degree", "Associate Degree (AS)"],
            ["certificate", "Certificate of Achievement"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={credential === value}
            onClick={() => setCredential(value)}
            className={`min-h-11 rounded-xl border px-4 py-2 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 ${credential === value ? "border-cyan-700 bg-cyan-700 text-white dark:border-cyan-400 dark:bg-cyan-400 dark:text-slate-950" : "border-slate-300 text-slate-700 hover:bg-cyan-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-cyan-950"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {credential === "degree" && (
        <div className="mb-5 space-y-2 rounded-2xl border border-cyan-200 bg-cyan-50/70 p-4 text-sm leading-6 text-slate-700 dark:border-cyan-900 dark:bg-cyan-950/30 dark:text-slate-300">
          <p className="font-bold">Four semesters · 60–62 planned units</p>
          <p>
            The AS degree requires at least 60 degree-applicable semester units,
            a GPA of 2.0 or higher, major requirements, General Education, and
            Global Citizenship. Select an approved GE course with the Global
            Citizenship designation to meet that requirement.
          </p>
          <p>
            This sequence follows the SMC pathway. GE choices depend on your
            catalog rights and transfer goals; confirm your plan with an
            academic counselor. CS 3 and COUNS 20 appear in the recommended
            sequence and are outside the certificate major requirements.
          </p>
          <a
            href={degreeSource}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-cyan-800 underline underline-offset-4 dark:text-cyan-200"
          >
            Official AS degree and GE requirements
          </a>
        </div>
      )}

      {credential === "degree" && (
        <div className="mb-5 space-y-2">
          <div
            role="group"
            aria-label="Course visibility"
            className="flex flex-wrap gap-2"
          >
            {(
              [
                [true, "Show Major Requirements Only"],
                [false, "Show All"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={label}
                type="button"
                aria-pressed={majorOnly === value}
                onClick={() => setMajorOnly(value)}
                className={`min-h-11 rounded-xl border px-4 py-2 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 ${majorOnly === value ? "border-cyan-700 bg-cyan-700 text-white dark:border-cyan-400 dark:bg-cyan-400 dark:text-slate-950" : "border-slate-300 text-slate-700 hover:bg-cyan-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-cyan-950"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <p
            role="status"
            className="text-sm text-slate-600 dark:text-slate-400"
          >
            {majorOnly
              ? "Showing 27 units of major requirements. General Education, electives, and preparation courses are hidden."
              : "Showing the full four-semester pathway, including General Education, electives, and preparation courses."}
          </p>
        </div>
      )}

      <div className="space-y-6">
        {sections.map((section) => (
          <section key={section.id} aria-labelledby={`${section.id}-title`}>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h3
                id={`${section.id}-title`}
                className="text-lg font-black text-slate-900 dark:text-white"
              >
                {section.title}
              </h3>
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                {section.units}
              </span>
            </div>
            <div className="space-y-2">
              {section.entries.map((entry) => {
                const row: CourseRowModel | undefined = entry.course
                  ? toCourseRowModel(entry.course, entry.id, selectedOption)
                  : undefined;
                const isExpanded = expanded === entry.id;
                const panelId = `${section.id}-course-panel-${entry.id.replace(/\W/g, "-")}`;
                const buttonId = `${panelId}-trigger`;

                return (
                  <div
                    key={entry.id}
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
                      onClick={() => toggleExpand(entry.id)}
                      aria-controls={panelId}
                      aria-expanded={isExpanded}
                      aria-label={`${row?.displayCode ?? ""} ${row?.displayTitle ?? entry.title}, ${entry.units} units`.trim()}
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
                        {row?.displayCode ||
                          (entry.course
                            ? "Choose one"
                            : entry.tags.includes("General Education")
                              ? "GE"
                              : "Elective")}
                      </span>
                      <span className="col-start-2 font-bold text-slate-800 sm:col-start-3 dark:text-slate-200">
                        {row?.displayTitle ?? entry.title}
                        <span className="mt-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                          {entry.units} units
                        </span>
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
                        {entry.note && (
                          <p className="mb-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                            {entry.note}
                          </p>
                        )}
                        {row ? (
                          <ExpandedCourseCard
                            course={row.course}
                            selected={row.selected}
                            selectedCode={row.selectedCode}
                            onSelectChange={(value) =>
                              setSelectedOption((prev) => ({
                                ...prev,
                                [entry.id]: value,
                              }))
                            }
                          />
                        ) : (
                          <div className="space-y-3 text-sm">
                            {entry.options && (
                              <GeneralEducationOptions
                                courses={entry.options}
                              />
                            )}
                            <div className="flex flex-wrap gap-2">
                              {entry.tags.map((tag) => (
                                <TagBadge key={tag} label={tag} />
                              ))}
                            </div>
                            <a
                              href={entry.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-11 items-center gap-2 font-bold text-cyan-800 underline underline-offset-4 dark:text-cyan-200"
                            >
                              {entry.tags.includes("General Education")
                                ? "View approved SMC courses"
                                : "View SMC degree requirements"}
                              <ExternalLink
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <p className="mt-5 text-xs leading-5 text-slate-500 dark:text-slate-400">
        Source checked {pathwayReviewedAt}. CS 56 Advanced Java Programming
        remains available in{" "}
        <a
          href="/coursework/CS56/assignment"
          className="underline underline-offset-2"
        >
          coursework
        </a>{" "}
        as an additional course; it is not listed among the major requirements
        on this SMC pathway.
      </p>
    </section>
  );
};

export default WebDevMajorRequirements;
