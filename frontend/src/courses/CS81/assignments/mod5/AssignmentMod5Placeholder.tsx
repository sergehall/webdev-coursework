// src/assignments/mod5/AssignmentMod5Placeholder.tsx

export default function AssignmentMod5Placeholder() {
  return (
    <section className="space-y-6 rounded border border-teal-300 bg-teal-50 p-6 dark:border-teal-700 dark:bg-teal-900/10">
      <h2 className="text-xl font-bold text-teal-800 dark:text-teal-300">
        Module 5 – Higher Order Functions
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        This module introduces the concept of higher-order functions — functions
        that take other functions as arguments or return them. You'll explore
        how they enable abstract and powerful programming patterns in
        JavaScript.
      </p>

      <div className="rounded border border-teal-200 bg-teal-100 p-4 dark:border-teal-600 dark:bg-teal-800/30">
        <p>
          <strong>Assignment:</strong> Create a set of utility functions using
          higher-order logic to process arrays of data.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Use built-in methods like <code>map</code>, <code>filter</code>, and{" "}
            <code>reduce</code>
          </li>
          <li>Write custom higher-order functions that accept callbacks</li>
          <li>Refactor repetitive logic using function composition</li>
        </ul>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        🧠 Understanding higher-order functions is key to mastering functional
        programming in JavaScript.
      </div>
    </section>
  );
}
