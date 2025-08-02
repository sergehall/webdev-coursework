// src/pages/CourseDetail.tsx
import { useParams } from "react-router-dom";

import ExpandedCourseCard from "@/components/ExpandedCourseCard";
import completedCourseComponents from "@/data/completedCourseComponents";
import { courses } from "@/data/web-developer-courses";

export default function CourseDetail() {
  const { code } = useParams<{ code: string }>();

  const allCourses = courses.flatMap((course) =>
    course.options ? course.options : [course]
  );

  const normalizedCode = code?.toLowerCase().replace(/\s/g, "");
  const course = allCourses.find(
    (c) => c.code.toLowerCase().replace(/\s/g, "") === normalizedCode
  );

  if (!course) {
    return (
      <div className="p-6 text-center text-xl font-semibold text-red-500 dark:text-red-400">
        ⚠️ Course not found.
      </div>
    );
  }

  const courseEntry = completedCourseComponents[course.code];
  const AssignmentComponent = courseEntry?.component;

  return (
    <div className="space-y-4 p-3">
      <h2 className="mb-6 rounded-xl bg-gradient-to-r from-blue-200 to-purple-300 px-6 py-4 text-3xl font-bold text-slate-700 shadow dark:from-blue-600 dark:to-purple-600 dark:text-white">
        Welcome to the {AssignmentComponent ? "Assignment" : "Course"}{" "}
        {course.code} Portal
      </h2>

      {/* Course Info Block */}
      <ExpandedCourseCard course={course} readOnly />

      {/* Assignment Component (if available) */}
      {AssignmentComponent && (
        <div className="mt-10">
          <AssignmentComponent />
        </div>
      )}
    </div>
  );
}
