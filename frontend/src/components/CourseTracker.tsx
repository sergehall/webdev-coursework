import React, { useState } from "react";

import { TagBadge, tagIconMap } from "@/components/tags";
import type { TagIconLabel } from "@/components/tags";
import { courses } from "@/data/web-developer-courses";

const CourseTracker: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<{
    [code: string]: string;
  }>({});
  const [completedCourses, setCompletedCourses] = useState<{
    [code: string]: boolean;
  }>({});
  const [grades, setGrades] = useState<{ [code: string]: string }>({});

  const toggleExpand = (code: string) => {
    setExpanded(expanded === code ? null : code);
  };

  const toggleComplete = (code: string) => {
    setCompletedCourses((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  const handleGradeChange = (code: string, grade: string) => {
    setGrades((prev) => ({ ...prev, [code]: grade }));
  };

  return (
    <section className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-900">
      <p className="mb-2 text-sm italic text-gray-600 dark:text-gray-400">
        These are the courses required specifically for the major. General
        Education and elective requirements can be found at{" "}
        <a
          href="https://www.smc.edu/academics/classes/program.php?id=52"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          smc.edu
        </a>
        .
      </p>
      <div className="space-y-2">
        {courses.map((course, idx) => {
          const courseCode = course.code || `multi-${idx}`;
          const selected = course.options?.find(
            (opt) => opt.code === selectedOption[courseCode]
          );

          return (
            <div
              key={courseCode}
              className="rounded-xl border bg-blue-50 p-4 shadow dark:bg-gray-800"
            >
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => toggleExpand(courseCode)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-xl text-yellow-500">
                    {expanded === courseCode ? "−" : "+"}
                  </div>
                  <div>
                    <div className="text-lg font-bold">
                      {course.code || selected?.code || ""}
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {course.title}
                      {selected && `: ${selected.title}`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold">{course.units} units</span>
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={completedCourses[courseCode]}
                      onChange={() => toggleComplete(courseCode)}
                    />
                    <span className="hidden sm:inline">Completed</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Grade"
                    value={grades[courseCode] || ""}
                    onChange={(e) =>
                      handleGradeChange(courseCode, e.target.value)
                    }
                    className="w-20 rounded border p-1"
                  />
                </div>
              </div>

              {expanded === courseCode && (
                <div className="mt-4 space-y-2 text-sm text-gray-800 dark:text-gray-200">
                  {course.options ? (
                    <>
                      <label className="mb-1 block text-base font-semibold">
                        Choose one option:
                      </label>
                      <select
                        value={selectedOption[courseCode] || ""}
                        onChange={(e) =>
                          setSelectedOption((prev) => ({
                            ...prev,
                            [courseCode]: e.target.value,
                          }))
                        }
                        className="w-full rounded-md border-2 border-blue-500 bg-white p-2 text-gray-900 focus:border-blue-700 focus:outline-none dark:border-blue-400 dark:bg-gray-900 dark:text-white"
                      >
                        <option value="" disabled hidden>
                          — Select a course —
                        </option>
                        {course.options.map((opt) => (
                          <option key={opt.code} value={opt.code}>
                            {opt.code} – {opt.title}
                          </option>
                        ))}
                      </select>

                      {selected && (
                        <div className="mt-3 space-y-2">
                          <p>{selected.description}</p>
                          {selected.skillsAdvisory && (
                            <p>
                              <strong>Skills Advisory:</strong>{" "}
                              {selected.skillsAdvisory}
                            </p>
                          )}
                          {selected.transfersTo && (
                            <p>
                              <strong>Transfers to:</strong>{" "}
                              {selected.transfersTo}
                            </p>
                          )}
                          {selected.smcGeCategory && (
                            <p>
                              <strong>Transfers to:</strong>{" "}
                              {selected.smcGeCategory}
                            </p>
                          )}
                          {selected.prerequisite && (
                            <p>
                              <strong>Transfers to:</strong>{" "}
                              {selected.prerequisite}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2 text-xs">
                            {selected.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="rounded bg-blue-100 px-2 py-1 text-blue-800"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <p>{course.description}</p>
                      {course.skillsAdvisory && (
                        <p>
                          <strong>Skills Advisory:</strong>{" "}
                          {course.skillsAdvisory}
                        </p>
                      )}
                      {course.transfersTo && (
                        <p>
                          <strong>Transfers to:</strong> {course.transfersTo}
                        </p>
                      )}
                      {course.smcGeCategory && (
                        <p>
                          <strong> SMC GE:</strong> {course.smcGeCategory}
                        </p>
                      )}
                      {course.prerequisite && (
                        <p>
                          <strong> Prerequisite:</strong> {course.prerequisite}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {course.tags.map((tag, index) => {
                          if (tag in tagIconMap) {
                            return (
                              <TagBadge
                                key={index}
                                label={tag as TagIconLabel}
                              />
                            );
                          }
                          return (
                            <span
                              key={index}
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-xs text-gray-800"
                              title={tag}
                            >
                              {tag[0]}
                            </span>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CourseTracker;
