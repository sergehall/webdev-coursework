import { cs85ModuleBlueprints } from "@/courses/CS85/data/moduleBlueprints";

export default function AssignmentPlaceholder() {
  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
        CS 85 – PHP Programming
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Welcome to <strong>CS 85 – PHP Programming</strong>. This Summer 2026
        course moves from PHP fundamentals into MySQL, Composer, Laravel, and a
        portfolio-ready final web application with an AI feature.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">
          <strong>What this portal includes now:</strong>
        </p>

        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>A 12-module Summer 2026 course map from the syllabus</li>
          <li>
            Instructor, Canvas, Slack, grading, and policy reference blocks
          </li>
          <li>Assignment shells ready for official Canvas details</li>
          <li>Progress tracking so each module can be marked complete</li>
        </ul>
      </div>

      <div className="rounded border border-sky-200 bg-sky-50 p-4 dark:border-sky-800/50 dark:bg-sky-950/20">
        <p className="text-sm font-semibold text-sky-900 dark:text-sky-100">
          Current course map — Summer 2026 syllabus:
        </p>

        <ul className="mt-3 space-y-2 text-sm text-sky-900/90 dark:text-sky-100/90">
          {cs85ModuleBlueprints.map((module) => (
            <li key={module.id}>
              <strong>Module {module.id}</strong>
              {": "}
              {module.title}
              {" — "}
              {module.dateLabel}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-sm text-gray-700 italic dark:text-gray-400">
        Select a module from the navigation to start filling in CS 85 notes,
        assignments, quizzes, and project artifacts as Canvas opens them.
      </div>
    </section>
  );
}
