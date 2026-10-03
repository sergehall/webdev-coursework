import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

import { LoadMoreButton } from "@/components/buttons";
import { activeCourseCodes } from "@/courses/catalog/activeCourses";
import { courses } from "@/data/webDeveloperCourses";
import type { BaseCourse } from "@/data/webDeveloperCourses";
import type { CourseCode } from "@/data/types/CourseCode";

export default function CourseworkPage() {
  const [visibleCount, setVisibleCount] = useState(10);

  //  We collect all possible courses (including options)
  const allCourses: BaseCourse[] = courses.flatMap((course) =>
    "options" in course ? course.options : [course]
  );

  // We filter only those courses that the user has selected.
  const activeCodesSet = new Set<CourseCode>(activeCourseCodes);
  const selectedCourses: BaseCourse[] = allCourses.filter((course) =>
    activeCodesSet.has(course.code)
  );

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
        <h1 className="mb-10 bg-gradient-to-r from-indigo-500 via-sky-400 to-cyan-400 bg-clip-text text-4xl leading-tight font-extrabold text-transparent drop-shadow-lg sm:text-5xl">
          Coursework & Assignments
        </h1>

        <h3 className="mb-6 text-xl font-semibold text-gray-800 sm:text-2xl dark:text-white">
          Explore my coursework and class projects
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {selectedCourses.slice(0, visibleCount).map((course) => {
            const isCompleted = activeCodesSet.has(course.code);
            const courseUrl = `/coursework/${course.code
              .toUpperCase()
              .replace(/\s/g, "")}/assignment`;

            const cardContent = (
              <div
                className={`group relative flex h-full min-h-28 flex-col justify-between overflow-hidden rounded-xl border p-4 text-left shadow-sm transition-all duration-300 hover:shadow-md ${
                  isCompleted
                    ? "border-green-400 bg-gradient-to-l from-emerald-100 to-emerald-200 dark:border-green-800 dark:from-emerald-800 dark:via-emerald-900 dark:to-emerald-950"
                    : "border-gray-300 bg-gradient-to-l from-gray-50 via-gray-100 to-gray-200 hover:border-yellow-300 dark:border-gray-700 dark:from-slate-800 dark:via-slate-900 dark:to-gray-950 dark:hover:border-yellow-400/45"
                }`}
              >
                {/* When hovering over, a description is displayed. */}
                <div className="absolute inset-0 z-10 hidden items-center justify-center rounded-xl bg-white/95 px-4 text-center text-sm text-gray-800 backdrop-blur-sm transition-all duration-300 group-hover:flex dark:bg-gray-900/90 dark:text-gray-200">
                  <p>{course.descriptionSummary || course.description}</p>
                </div>

                <div className="mb-4 block">
                  <p
                    className={`text-sm font-medium ${
                      isCompleted
                        ? "text-gray-800 dark:text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {course.code}
                  </p>
                  <h4
                    className={`text-lg font-bold ${
                      isCompleted
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-800 dark:text-gray-100"
                    }`}
                  >
                    {course.title}
                  </h4>
                </div>

                {/* If the course is not completed, we display a label. */}
                {!isCompleted && (
                  <div className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-yellow-300/50 bg-yellow-50/70 px-2.5 py-1 text-xs font-semibold text-yellow-700/75 dark:border-yellow-400/25 dark:bg-yellow-400/5 dark:text-yellow-200/70">
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

        {visibleCount < selectedCourses.length && (
          <div className="mt-8">
            <LoadMoreButton onClick={loadMore} />
          </div>
        )}

        <section
          className="mt-10 text-left"
          aria-labelledby="esl-course-heading"
        >
          <p className="mb-3 text-sm font-bold tracking-[0.16em] text-sky-700 uppercase dark:text-sky-300">
            Fall 2026 · In progress
          </p>
          <details className="group rounded-xl border border-sky-300 bg-gradient-to-r from-sky-50 to-indigo-50 p-5 shadow-sm dark:border-sky-800 dark:from-slate-900 dark:to-indigo-950">
            <summary
              className="cursor-pointer text-lg font-bold text-slate-900 dark:text-white"
              id="esl-course-heading"
            >
              ESL 10G · Listening, Speaking & Grammar{" "}
              <span className="ml-2 text-sm font-medium text-sky-700 dark:text-sky-300">
                View course details
              </span>
            </summary>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
              A 16-week Santa Monica College course for building English
              listening, speaking, and grammar skills. We practice short
              listening passages, everyday conversations, core grammar, and oral
              presentations.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
              <li>
                Understand main ideas and supporting details in short talks.
              </li>
              <li>
                Speak about familiar topics and deliver a 3–4 minute
                presentation.
              </li>
              <li>
                Use present, past, and future forms to make sentences and
                questions.
              </li>
            </ul>
            <Link
              to="/coursework/ESL10G"
              onClick={() => {
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              }}
              className="mt-5 inline-flex min-h-10 items-center rounded-lg bg-sky-700 px-4 py-2 text-sm font-bold text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              Explore ESL 10G weeks and presentation
            </Link>
          </details>
        </section>
      </motion.div>

      <Outlet />
    </main>
  );
}
