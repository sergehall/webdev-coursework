// src/pages/CourseDetail.tsx
import { useParams } from "react-router-dom";
import { BookOpen, Info, School, Sparkles } from "lucide-react";

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
      <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-800 dark:text-white">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
          <h1 className="text-2xl font-bold">
            {course.title} ({course.code})
          </h1>
        </div>

        <p className="text-gray-700 dark:text-gray-300">{course.description}</p>

        <ul className="flex flex-col flex-wrap gap-4 text-sm sm:flex-row">
          <li className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <strong>Units:</strong> {course.units}
          </li>
          {course.skillsAdvisory && (
            <li className="flex items-center gap-2">
              <Info className="h-4 w-4 text-yellow-500" />
              <strong>Skills Advisory:</strong> {course.skillsAdvisory}
            </li>
          )}
          {course.transfersTo && (
            <li className="flex items-center gap-2">
              <School className="h-4 w-4 text-blue-500" />
              <strong>Transfers To:</strong> {course.transfersTo}
            </li>
          )}
        </ul>

        {course.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4">
            {course.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-700 dark:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Assignment Component (if available) */}
      {AssignmentComponent && (
        <div className="mt-10">
          <AssignmentComponent />
        </div>
      )}
    </div>
  );
}
