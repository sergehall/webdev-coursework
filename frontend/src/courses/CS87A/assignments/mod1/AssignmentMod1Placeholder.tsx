// src/assignments/mod1/AssignmentPlaceholder.tsx
export default function AssignmentMod1Placeholder() {
  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-300">
        Module 1 – Installing Python, IDLE, and Getting Started
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        In this first module, you’ll set up Python and your working environment,
        update your profiles on Zoom and Canvas, and complete a simple Python
        exercise using IDLE.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">
          <strong>Assignment:</strong> Write a Python script that:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Uses only the number <code>5.9687</code> and the built-in{" "}
            <code>int()</code> function
          </li>
          <li>Enumerates five places you want to visit</li>
          <li>
            Outputs the list with <code>print()</code>
          </li>
          <li>Includes proper header comments (name, date, course, etc.)</li>
        </ul>
      </div>

      <div className="text-sm italic text-gray-700 dark:text-gray-400">
        This assignment will help you verify your Python installation and get
        comfortable running basic scripts before moving on to more complex
        tasks.
      </div>
    </section>
  );
}
