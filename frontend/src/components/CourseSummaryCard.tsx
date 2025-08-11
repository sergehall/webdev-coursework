// src/components/CourseSummaryCard.tsx
import ExpandedCourseCard from "@/components/ExpandedCourseCard";
import type { Course } from "@/data/webDeveloperCourses";

interface CourseSummaryCardProps {
  course: Course;
}

export default function CourseSummaryCard({ course }: CourseSummaryCardProps) {
  return (
    <div>
      {"code" in course && (
        <h2 className="mb-3 rounded-xl bg-gradient-to-r from-blue-200 to-purple-300 px-6 py-4 text-3xl font-bold text-slate-700 shadow dark:from-blue-600 dark:to-purple-600 dark:text-white">
          Welcome to the {course.code} {course.title} Assignment Portal
        </h2>
      )}
      <ExpandedCourseCard course={course} readOnly />
    </div>
  );
}
