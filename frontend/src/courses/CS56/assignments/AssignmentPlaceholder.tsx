import { cs56ModuleBlueprints } from "@/courses/CS56/data/moduleBlueprints";

export default function AssignmentPlaceholder() {
  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
        CS 56 - Advanced Java Programming
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Welcome to <strong>CS 56 - Advanced Java Programming</strong>. This
        course continues Java programming beyond CS 55 with advanced APIs for
        robust programs, I/O, multithreading, JDBC, Servlets, RMI, networking,
        and multimedia work.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">
          <strong>What this portal scaffold includes:</strong>
        </p>

        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>A 15-module CS 56 structure ready for syllabus import</li>
          <li>
            Java-focused overview, objectives, artifacts, and starter tasks
          </li>
          <li>Progress tracking for all modules</li>
          <li>
            Clear slots for exact due dates, points, readings, and assignments
          </li>
        </ul>
      </div>

      <div className="rounded border border-orange-200 bg-orange-50 p-4 dark:border-orange-800/50 dark:bg-orange-950/20">
        <p className="text-sm font-semibold text-orange-900 dark:text-orange-100">
          Current course map - syllabus details pending:
        </p>

        <ul className="mt-3 space-y-2 text-sm text-orange-900/90 dark:text-orange-100/90">
          {cs56ModuleBlueprints.map((module) => (
            <li key={module.id}>
              <strong>Module {module.id}</strong>
              {": "}
              {module.title}
              {" - "}
              {module.dateLabel}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-sm text-gray-700 italic dark:text-gray-400">
        Select a module from the navigation to begin building out the CS 56
        assignment content.
      </div>
    </section>
  );
}
