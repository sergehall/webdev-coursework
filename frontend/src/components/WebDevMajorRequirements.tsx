import React, { useState } from "react";

import ExpandedCourseCard from "@/components/ExpandedCourseCard";
import { courses } from "@/data/web-developer-courses";

// This component displays the list of required courses for the Web Developer major
const WebDevMajorRequirements: React.FC = () => {
  // Track the currently expanded course by its code
  const [expanded, setExpanded] = useState<string | null>(null);

  // Track which option has been selected for each multi-option course
  const [selectedOption, setSelectedOption] = useState<{
    [code: string]: string;
  }>({});

  // Toggles course expansion on click (open/close)
  const toggleExpand = (code: string) => {
    setExpanded((prev) => (prev === code ? null : code));
  };

  return (
    <section className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-900">
      {/* Info notice with external link to full academic program */}
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

      {/* Render all required courses */}
      <div className="space-y-2">
        {courses.map((course, idx) => {
          // Generate unique key for top-level or grouped course
          const courseCode = course.code || `multi-${idx}`;

          // Get the selected option (if applicable)
          const selected = course.options?.find(
            (opt) => opt.code === selectedOption[courseCode]
          );

          return (
            <div
              key={courseCode}
              className="rounded-xl border bg-blue-50 p-4 shadow transition-all duration-200 dark:bg-gray-800"
              onClick={() => toggleExpand(courseCode)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                // Enable keyboard toggling with Enter or Space
                if (e.key === "Enter" || e.key === " ") {
                  toggleExpand(courseCode);
                }
              }}
            >
              {/* If collapsed, show a compact header */}
              {expanded !== courseCode ? (
                <div className="flex items-center gap-4">
                  <div className="text-xl text-yellow-500">+</div>
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
              ) : (
                // If expanded, render the full course card
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
