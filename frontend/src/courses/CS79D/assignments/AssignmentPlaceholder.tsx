import { cs79dModuleBlueprints } from "@/courses/CS79D/data/moduleBlueprints";

export default function AssignmentPlaceholder() {
  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
        CS 79D – Security in Amazon Web Services
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Welcome to{" "}
        <strong>CS 79D – Security in Amazon Web Services</strong>. This course
        covers the tools, practices, and technologies that protect cloud-based
        infrastructure, data, and applications from threats and unauthorized
        access on <strong>Amazon Web Services (AWS)</strong>.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">
          <strong>What this portal already includes:</strong>
        </p>

        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>A live course portal for all 8 syllabus-based modules</li>
          <li>Detailed scaffolding for notes, labs, screenshots, and deliverables</li>
          <li>Progress tracking so each module can be marked complete</li>
          <li>Quiz blocks per module for review and practice</li>
        </ul>
      </div>

      <div className="rounded border border-rose-200 bg-rose-50 p-4 dark:border-rose-800/50 dark:bg-rose-950/20">
        <p className="text-sm font-semibold text-rose-900 dark:text-rose-100">
          Current course map — Spring 2026 syllabus:
        </p>

        <ul className="mt-3 space-y-2 text-sm text-rose-900/90 dark:text-rose-100/90">
          {cs79dModuleBlueprints.map((module) => (
            <li key={module.id}>
              <strong>
                {module.isFinalProject ? "Module 8" : `Module ${module.id}`}
              </strong>
              {": "}
              {module.title}
              {" — "}
              {module.dateLabel}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-sm italic text-gray-700 dark:text-gray-400">
        🔐 Select a module from the navigation to begin exploring AWS security
        concepts, labs, and assignments for this course.
      </div>
    </section>
  );
}
