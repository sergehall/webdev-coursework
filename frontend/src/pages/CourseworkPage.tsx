import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

import { LoadMoreButton } from "@/components/buttons";
import { courses } from "@/data/web-developer-courses";

export default function CourseworkPage() {
  const [visibleCount, setVisibleCount] = useState(10);
  const allCourses = courses.flatMap((course) =>
    course.options ? course.options : [course]
  );
  const activeCourseCodes = ["CS 80", "CS 81", "CS 87A"];
  const loadMore = () => setVisibleCount((prev) => prev + 6);

  return (
    <main className="flex flex-col gap-10 px-4 py-10">
      {/* Course list view */}
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
          {allCourses.slice(0, visibleCount).map((course) => {
            const isCompleted = activeCourseCodes.includes(course.code);
            const courseUrl = `/coursework/${course.code
              .toLowerCase()
              .replace(/\s/g, "")}/assignment`;

            const cardContent = (
              <div
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border p-4 text-left shadow-sm transition-all duration-300 hover:shadow-md ${
                  isCompleted
                    ? "border-green-400 bg-white dark:border-green-800 dark:bg-gray-800"
                    : "bg-gray-100 dark:border-gray-700 dark:bg-gray-900"
                }`}
              >
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

                {!isCompleted && (
                  <div className="mt-auto flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                    <XCircle className="h-4 w-4" />
                    Not Yet Completed
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

        {visibleCount < allCourses.length && (
          <div className="mt-8">
            <LoadMoreButton onClick={loadMore} />
          </div>
        )}
      </motion.div>

      {/* Nested routes will be inserted here  */}
      <Outlet />
    </main>
  );
}
