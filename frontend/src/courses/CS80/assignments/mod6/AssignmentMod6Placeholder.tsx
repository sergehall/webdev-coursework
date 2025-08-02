import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod6Placeholder() {
  useFinalModuleRedirect(6); // module 6 → redirect to /assignments/completed

  return (
    <section className="space-y-6 rounded border border-rose-300 bg-rose-50 p-6 shadow-sm dark:border-rose-700 dark:bg-rose-900/10">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-rose-700 dark:text-rose-300">
        Module 6 – AJAX and jQuery
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        This module introduces asynchronous communication with the server using
        AJAX, and how jQuery helps simplify the process of dynamic content
        loading.
      </p>

      <div className="rounded border border-rose-200 bg-rose-100 p-4 dark:border-rose-600 dark:bg-rose-800/30">
        <p className="text-sm leading-relaxed text-rose-900 dark:text-rose-100">
          <strong>Heads up:</strong> In this project, we use{" "}
          <code className="rounded bg-white/60 px-1 dark:bg-rose-700">
            fetch
          </code>{" "}
          and{" "}
          <code className="rounded bg-white/60 px-1 dark:bg-rose-700">
            useEffect
          </code>{" "}
          instead of jQuery. These modern tools offer better performance and
          readability in React apps.
        </p>
        <p className="mt-2 text-sm italic text-rose-700 dark:text-rose-300">
          jQuery is no longer required for asynchronous requests in modern web
          development.
        </p>
      </div>

      <div className="rounded border border-dashed border-rose-300 bg-rose-200/30 p-5 text-center text-sm text-rose-800 dark:border-rose-600 dark:bg-rose-900/20 dark:text-rose-200">
        🚧 This assignment is currently locked. Please check back later for
        updates and tasks.
      </div>
    </section>
  );
}
