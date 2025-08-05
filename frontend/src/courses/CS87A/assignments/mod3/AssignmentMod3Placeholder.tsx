// src/assignments/mod3/AssignmentMod3Placeholder.tsx

export default function AssignmentMod3Placeholder() {
  return (
    <section className="space-y-6 rounded border border-yellow-300 bg-yellow-50 p-6 dark:border-yellow-700 dark:bg-yellow-900/10">
      <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300">
        Module 3 – Functions
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        This module introduces one of the most fundamental building blocks of
        programming: functions. You'll learn how to write reusable code, pass
        data through parameters, and return values to control logic and output.
      </p>

      <div className="rounded border border-yellow-200 bg-yellow-100 p-4 dark:border-yellow-600 dark:bg-yellow-800/30">
        <p>
          <strong>Assignment:</strong> Write JavaScript functions that take
          input, perform calculations or logic, and return results.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>Define and invoke functions with parameters and return values</li>
          <li>Use arrow functions for concise syntax</li>
          <li>Apply functions to organize code into logical units</li>
        </ul>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        ⚙️ Keep your functions small, focused, and easy to test.
      </div>
    </section>
  );
}
