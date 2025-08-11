import React, { Suspense } from "react";
import { useParams } from "react-router-dom";

import CourseSummaryCard from "@/components/CourseSummaryCard";
import { type BaseCourse, courses } from "@/data/webDeveloperCourses";
import completedCourseComponents from "@/courses/assignment-registry/completedCourseComponents";
import ProgressProvider from "@/context/ProgressProvider";

export default function AssignmentWrapper() {
  // Get courseId from the route parameters
  const { courseId } = useParams<{ courseId: string }>();

  // Flatten nested course options, if any
  const allCourses: BaseCourse[] = courses.flatMap((course) =>
    "options" in course ? course.options : [course]
  );

  // Normalize course ID (uppercase and no whitespace)
  const normalizedId = courseId?.toUpperCase().replace(/\s/g, "");

  // Try to find the matching course
  const matchedCourse = allCourses.find(
    (c) => c.code.toUpperCase().replace(/\s/g, "") === normalizedId
  );

  // Look up the course entry with its assignment component
  const courseEntry = matchedCourse
    ? completedCourseComponents[matchedCourse.code]
    : null;

  const AssignmentComponent = courseEntry?.component;

  // If the course is found but no assignment is available yet
  if (matchedCourse && !AssignmentComponent) {
    return (
      <div className="p-3">
        <CourseSummaryCard course={matchedCourse} />
      </div>
    );
  }

  // If the course doesn't exist at all
  if (!matchedCourse) {
    return (
      <div className="p-6 text-center text-xl font-semibold text-red-500 dark:text-red-400">
        ⚠️ Course not found.
      </div>
    );
  }

  // At this point, both course and assignment component are confirmed
  const SafeAssignmentComponent = AssignmentComponent as React.FC;

  return (
    <ProgressProvider>
      <div className="space-y-4 p-3">
        <h2 className="mb-6 rounded-xl bg-gradient-to-r from-blue-200 to-purple-300 px-6 py-4 text-3xl font-bold text-slate-700 shadow dark:from-blue-600 dark:to-purple-600 dark:text-white">
          Welcome to the {matchedCourse.code} {courseEntry!.title} Assignment
          Portal
        </h2>

        {/* Render the course's main assignment component */}
        <Suspense fallback={<div>Loading assignment...</div>}>
          <SafeAssignmentComponent />
        </Suspense>
      </div>
    </ProgressProvider>
  );
}
