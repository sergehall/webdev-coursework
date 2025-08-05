import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

import { LoadMoreButton } from "@/components/buttons";
import { selectedCourseCodes } from "@/data/selectedCourseCodes";
import { activeCourseCodes } from "@/data/types/activeCourseCodes";
import { courses } from "@/data/web-developer-courses";
import type { BaseCourse } from "@/data/web-developer-courses";

export default function CourseworkPage() {
  const [visibleCount, setVisibleCount] = useState(8);

  // Собираем все возможные курсы (включая options)
  const allCourses: BaseCourse[] = courses.flatMap((course) =>
    "options" in course ? course.options : [course]
  );

  // We filter only those courses that the user has selected.
  const selectedCourses: BaseCourse[] = allCourses.filter((course) =>
    selectedCourseCodes.includes(course.code)
  );

  //  Create a Set for quick search of completed courses
  const activeCodesSet = new Set(activeCourseCodes);

  const loadMore = () => setVisibleCount((prev) => prev + 6);

  return (
    <main className="flex flex-col gap-10 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto w-full max-w-6xl text-center"
      >
        <h1 className="mb-10 bg-gradient-to-r from-indigo-500 via-sky-400 to-cyan-400 bg-clip-text text-5xl font-extrabold text-transparent drop-shadow-lg">
          Web Developer Coursework & Assignments
        </h1>

        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white sm:text-2xl">
          Select a completed course to access its assignments
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {selectedCourses.slice(0, visibleCount).map((course) => {
            const isCompleted = activeCodesSet.has(
              course.code as (typeof activeCourseCodes)[number]
            );
            const courseUrl = `/coursework/${course.code
              .toUpperCase()
              .replace(/\s/g, "")}/assignment`;

            const cardContent = (
              <div
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border p-4 text-left shadow-sm transition-all duration-300 hover:shadow-md ${
                  isCompleted
                    ? "border-green-400 bg-gradient-to-l from-emerald-100 to-emerald-200 dark:border-green-800 dark:from-emerald-800 dark:via-emerald-900 dark:to-emerald-950"
                    : "border-gray-300 bg-gradient-to-l from-gray-100 via-gray-200 to-gray-300 dark:border-gray-700 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950"
                }`}
              >
                {/* При наведении показывается описание */}
                <div className="absolute inset-0 z-10 hidden items-center justify-center rounded-xl bg-white/95 px-4 text-center text-sm text-gray-800 backdrop-blur-sm transition-all duration-300 group-hover:flex dark:bg-gray-900/90 dark:text-gray-200">
                  <p>{course.descriptionSummary || course.description}</p>
                </div>

                <div className="mb-4 block">
                  <p
                    className={`text-sm font-medium ${
                      isCompleted
                        ? "text-gray-800 dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {course.code}
                  </p>
                  <h4
                    className={`text-lg font-bold ${
                      isCompleted
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {course.title}
                  </h4>
                </div>

                {/* Если курс не завершён — показываем метку */}
                {!isCompleted && (
                  <div className="mt-auto flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                    <XCircle className="h-4 w-4" />
                    Курс ещё не завершён
                  </div>
                )}
              </div>
            );

            return isCompleted ? (
              <Link key={course.code} to={courseUrl}>
                {cardContent}
              </Link>
            ) : (
              <div key={course.code}>{cardContent}</div>
            );
          })}
        </div>

        {visibleCount < selectedCourses.length && (
          <div className="mt-8">
            <LoadMoreButton onClick={loadMore} />
          </div>
        )}
      </motion.div>

      <Outlet />
    </main>
  );
}
