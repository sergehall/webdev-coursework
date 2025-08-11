import React, { useState } from "react";

import ExpandedCourseCard from "@/components/ExpandedCourseCard";
import { courses } from "@/data/webDeveloperCourses";
import type { CourseGroup } from "@/data/webDeveloperCourses";

const WebDevMajorRequirements: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const [selectedOption, setSelectedOption] = useState<Record<string, string>>(
    {}
  );

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
          const isBaseCourse = "code" in course;
          const isGroupCourse = "options" in course;

          const courseCode = isBaseCourse ? course.code : `group-${idx}`;

          const selected = isGroupCourse
            ? (course as CourseGroup).options.find(
                (opt) => opt.code === selectedOption[courseCode]
              )
            : undefined;

          const displayCode = isBaseCourse ? course.code : selected?.code || "";

          const displayTitle = isBaseCourse
            ? course.title
            : selected
              ? `${course.title}: ${selected.title}`
              : course.title;

          return (
            <div
              key={courseCode}
              className="rounded-xl border bg-blue-50 p-4 shadow transition-all duration-200 dark:bg-gray-800"
              onClick={() => toggleExpand(courseCode)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  toggleExpand(courseCode);
              }}
            >
              {expanded !== courseCode ? (
                <div className="flex items-center gap-4">
                  <div className="text-xl text-yellow-500">+</div>
                  <div>
                    <div className="text-lg font-bold">{displayCode}</div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {displayTitle}
                    </div>
                  </div>
                </div>
              ) : (
                <ExpandedCourseCard
                  course={course}
                  selected={selected}
                  selectedCode={selectedOption[courseCode]}
                  onSelectChange={(value) =>
                    setSelectedOption((prev) => ({
                      ...prev,
                      [courseCode]: value,
                    }))
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WebDevMajorRequirements;
