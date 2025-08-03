import { Suspense } from "react";
import { useParams } from "react-router-dom";

import CourseDetail from "./CourseDetail";

import { courses } from "@/data/web-developer-courses";
import completedCourseComponents from "@/data/completedCourseComponents";

export default function AssignmentWrapper() {
  const { courseId } = useParams<{ courseId: string }>();

  console.log("AssignmentWrapper courseId", courseId);
  // Flatten nested course options
  const allCourses = courses.flatMap((course) => course.options ?? [course]);

  const normalizedId = courseId?.toUpperCase().replace(/\s/g, "");

  const matchedCourse = allCourses.find(
    (c) => c.code.toUpperCase().replace(/\s/g, "") === normalizedId
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
