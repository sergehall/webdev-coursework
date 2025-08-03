import { Suspense } from "react";
import { useParams } from "react-router-dom";

import CourseDetail from "./CourseDetail";

import { courses } from "@/data/web-developer-courses";
import completedCourseComponents from "@/data/completedCourseComponents";
import ProgressProvider from "@/context/ProgressProvider";

export default function AssignmentWrapper() {
  const { courseId } = useParams<{ courseId: string }>();

  const allCourses = courses.flatMap((course) => course.options ?? [course]);
  const normalizedId = courseId?.toUpperCase().replace(/\s/g, "");

  const matchedCourse = allCourses.find(
    (c) => c.code.toUpperCase().replace(/\s/g, "") === normalizedId
  );

  const courseEntry = matchedCourse
    ? completedCourseComponents[matchedCourse.code]
    : null;

  const AssignmentComponent = courseEntry?.component;

  if (!matchedCourse || !AssignmentComponent) {
    return <CourseDetail />;
  }

  return (
    <ProgressProvider>
      <div className="space-y-4 p-3">
        <h2 className="mb-6 rounded-xl bg-gradient-to-r from-blue-200 to-purple-300 px-6 py-4 text-3xl font-bold text-slate-700 shadow dark:from-blue-600 dark:to-purple-600 dark:text-white">
          Welcome to the {matchedCourse.code} {courseEntry.title} Assignment
          Portal
        </h2>

        {/* Render the course layout, which includes its own <Outlet /> */}
        <Suspense fallback={<div>Loading assignment...</div>}>
          <AssignmentComponent />
        </Suspense>
      </div>
    </ProgressProvider>
  );
}
