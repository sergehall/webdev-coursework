import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod3Placeholder() {
  useFinalModuleRedirect(6); // module 6 → redirect to /assignments/completed
  return (
    <section className="space-y-6 rounded border border-yellow-300 bg-yellow-50 p-6 dark:border-yellow-700 dark:bg-yellow-900/10">
      <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300">
        Module 3 – Introduction to Scripting: JavaScript Control Statements
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        This module introduces core JavaScript concepts such as variables,
        conditionals, and loops. You’ll write small scripts that control the
        logic and behavior of your web pages.
      </p>

      <div className="rounded border border-yellow-200 bg-yellow-100 p-4 dark:border-yellow-600 dark:bg-yellow-800/30">
        <p>
          <strong>Assignment:</strong> Build an interactive script that responds
          to user input using control statements.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>Use if/else and switch for decision making</li>
          <li>Implement for and while loops for repetition</li>
          <li>Handle input validation with proper logic</li>
        </ul>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        ⚙️ Make sure your code is clean, readable, and well-commented.
      </div>
    </section>
  );
}
