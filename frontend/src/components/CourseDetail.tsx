import { useCompletedModules } from "@/hooks/useCompletedModules";
import ExpandedCourseCard from "@/components/ExpandedCourseCard";
import completedCourseComponents from "@/data/completedCourseComponents";
import { courses } from "@/data/web-developer-courses";

export default function CourseDetail() {
  const { courseId } = useCompletedModules();
  if (!courseId) {
    return (
      <div className="p-6 text-center text-xl font-semibold text-red-500 dark:text-red-400">
        ⚠️ Course not found (missing courseId).
      </div>
    );
  }

  const allCourses = courses.flatMap((course) =>
    course.options ? course.options : [course]
  );

  const normalizedId = courseId.toUpperCase().replace(/\s/g, "");

  const course = allCourses.find(
    (c) => c.code.toUpperCase().replace(/\s/g, "") === normalizedId
  );

  if (!course) {
    return (
      <div className="p-6 text-center text-xl font-semibold text-red-500 dark:text-red-400">
        ⚠️ Course not found!
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
