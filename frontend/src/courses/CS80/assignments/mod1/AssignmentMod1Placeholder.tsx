import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod1Placeholder() {
  useFinalModuleRedirect(6); // module 6 → redirect to /assignments/completed
  return (
    <section className="space-y-6 rounded border border-blue-300 bg-blue-50 p-6 dark:border-blue-700 dark:bg-blue-900/10">
      <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300">
        Module 2 – Cascading Style Sheets (CSS)
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        This module introduces the fundamentals of styling web pages using CSS.
        You’ll explore how to control layout, colors, typography, spacing, and
        more.
      </p>

      <div className="rounded border border-blue-200 bg-blue-100 p-4 dark:border-blue-600 dark:bg-blue-800/30">
        <p>
          <strong>Assignment:</strong> Style a basic HTML layout using internal
          and external CSS.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>Use class and ID selectors to target elements</li>
          <li>Apply consistent color schemes and spacing</li>
          <li>Make the layout responsive with media queries</li>
        </ul>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        💡 Don’t forget to validate your CSS and test your design in both light
        and dark themes.
      </div>
    </section>
  );
}
