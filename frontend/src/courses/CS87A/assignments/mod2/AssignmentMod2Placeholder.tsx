// src/assignments/mod2/AssignmentMod2Placeholder.tsx
export default function AssignmentMod2Placeholder() {
  return (
    <section className="space-y-6 rounded border border-orange-300 bg-orange-50 p-6 shadow-sm dark:border-orange-700 dark:bg-orange-900/10">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-orange-700 dark:text-orange-300">
        Module 2 – Variables, Input, and Simple Logic (Python)
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        In this module, you’ll prepare for{" "}
        <strong>Assignment 2 – Math Trivia Quiz</strong>. You’ll practice
        declaring variables, reading user input with <code>input()</code>,
        generating random values (e.g., with <code>random</code>), using
        conditionals for checking answers, and keeping score with counters.
      </p>

      <div className="rounded border border-orange-200 bg-orange-100 p-4 dark:border-orange-600 dark:bg-orange-800/30">
        <p className="text-sm leading-relaxed text-orange-900 dark:text-orange-100">
          <strong>What you’ll build:</strong> a short console quiz that asks
          several math questions, validates the user’s responses, and reports
          the final score. Focus on clear prompts, correct parsing of input, and
          readable output via <code>print()</code>.
        </p>
        <p className="mt-2 text-sm italic text-orange-700 dark:text-orange-300">
          Small steps: variables → input → checks → score → nice summary.
        </p>
      </div>

      <div className="rounded border border-dashed border-orange-300 bg-orange-200/30 p-5 text-center text-sm text-orange-800 dark:border-orange-600 dark:bg-orange-900/20 dark:text-orange-200">
        🚧 The Assignment 2 details will appear here soon. In the meantime,
        review variables, <code>input()</code>, <code>int()</code>/
        <code>float()</code>, basic arithmetic, <code>if</code>/
        <code>else</code>, and importing <code>random</code>.
      </div>
    </section>
  );
}
