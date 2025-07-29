import { Suspense } from "react";
import { useParams } from "react-router-dom";

import CourseDetail from "./CourseDetail";

import { courses } from "@/data/web-developer-courses";
import completedCourseComponents from "@/data/completedCourseComponents";

export default function AssignmentWrapper() {
  const { code } = useParams<{ code: string }>();

  // Flatten nested course options
  const allCourses = courses.flatMap((course) => course.options ?? [course]);

  // Normalize code (e.g. "CS 81" → "cs81")
  const normalizedCode = code?.toLowerCase().replace(/\s/g, "");

  const matchedCourse = allCourses.find(
    (c) => c.code.toLowerCase().replace(/\s/g, "") === normalizedCode
  );

  const courseEntry = matchedCourse
    ? completedCourseComponents[matchedCourse.code]
    : null;

  const AssignmentComponent = courseEntry?.component;

  // If not matched or no assignment component, show course detail
  if (!matchedCourse || !AssignmentComponent) {
    return <CourseDetail />;
  }

  // Else render the actual course component (like CS81), which includes <Outlet />
  return (
    <div className="space-y-4 p-3">
      <h2 className="mb-6 rounded-xl bg-gradient-to-r from-blue-200 to-purple-300 px-6 py-4 text-3xl font-bold text-slate-700 shadow dark:from-blue-600 dark:to-purple-600 dark:text-white">
        Welcome to the {matchedCourse.code} {courseEntry.title} Assignment
        Portal
      </h2>

      <Suspense fallback={<div>Loading assignment...</div>}>
        <AssignmentComponent />
      </Suspense>
    </div>
  );
}
