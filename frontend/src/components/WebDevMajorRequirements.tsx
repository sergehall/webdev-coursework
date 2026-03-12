import React, { useState } from "react";

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
          const row = toCourseRowModel(course, idx, selectedOption);

          return (
            <div
              key={row.key}
              className="rounded-xl border bg-blue-50 p-4 shadow transition-all duration-200 dark:bg-gray-800"
            >
              <button
                type="button"
                className="w-full text-left"
                onClick={() => toggleExpand(row.key)}
                aria-expanded={expanded === row.key}
              >
                <div className="flex items-center gap-4">
                  <div className="text-xl text-yellow-500">
                    {expanded === row.key ? "-" : "+"}
                  </div>
                  <div>
                    <div className="text-lg font-bold">{row.displayCode}</div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {row.displayTitle}
                    </div>
                  </div>
                </div>
              </button>

              {expanded === row.key && (
                <div
                  className="mt-4"
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
