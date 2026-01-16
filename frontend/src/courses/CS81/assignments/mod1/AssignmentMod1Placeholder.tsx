// src/assignments/mod1/AssignmentPlaceholder.tsx

export default function AssignmentMod1Placeholder() {
  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-300">
        Module 1 – Introduction to JavaScript: Values, Types, and Operators
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Welcome to JavaScript! In this first module, you’ll learn the
        fundamental building blocks of programming: values, data types, and the
        operators used to manipulate them.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">
          <strong>Assignment:</strong> Write simple JavaScript expressions and
          statements to explore:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Primitive types: <code>string</code>, <code>number</code>,{" "}
            <code>boolean</code>, <code>null</code>, <code>undefined</code>
          </li>
          <li>Operators: arithmetic, comparison, logical</li>
          <li>
            Type coercion and the <code>typeof</code> operator
          </li>
          <li>
            Basic variable declaration using <code>let</code> and{" "}
            <code>const</code>
          </li>
        </ul>
      </div>

      <div className="text-sm italic text-gray-700 dark:text-gray-400">
        🧠 These basics are the foundation of everything else you'll do in
        JavaScript — take your time to explore and experiment.
      </div>
    </section>
  );
}
