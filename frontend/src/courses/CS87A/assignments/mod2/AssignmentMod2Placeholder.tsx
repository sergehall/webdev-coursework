// src/assignments/mod2/AssignmentMod2Placeholder.tsx
export default function AssignmentMod2Placeholder() {
  return (
    <section className="space-y-6 rounded border border-orange-300 bg-orange-50 p-6 shadow-sm dark:border-orange-700 dark:bg-orange-900/10">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-orange-700 dark:text-orange-300">
        Module 2 – Variables, Input, and Simple Logic (Python)
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        In this module, you’ll prepare for{" "}
        <strong>Assignment 2 – Python Trivia Game</strong>. You’ll practice
        collecting user input with <code>input()</code>, storing answers in
        variables, checking correctness with <strong>if</strong> statements and
        Boolean expressions, and using the <code>random</code> module to vary
        question order on each run.
      </p>

      <div className="rounded border border-orange-200 bg-orange-100 p-4 dark:border-orange-600 dark:bg-orange-800/30">
        <p className="text-sm leading-relaxed text-orange-900 dark:text-orange-100">
          <strong>What you’ll build:</strong> a short console trivia game with{" "}
          <strong>three multiple-choice</strong> questions of your choice. The
          game should shuffle the order of questions/answers each time using{" "}
          <code>randint</code>, tell the player whether a response is correct,
          and keep running until all three are correct or the player chooses to
          quit.
        </p>
        <p className="mt-2 text-sm italic text-orange-700 dark:text-orange-300">
          Loop until done: prompt → check → feedback → retry remaining only.
        </p>
      </div>

      <div className="rounded border border-dashed border-orange-300 bg-orange-200/30 p-5 text-sm text-orange-800 dark:border-orange-600 dark:bg-orange-900/20 dark:text-orange-200">
        <ul className="list-disc space-y-1 pl-5 text-left">
          <li>
            Submit a single file <code>A02.py</code> (with header comments).
          </li>
          <li>
            Use <code>input()</code>/<code>print()</code> for interaction; store
            responses in variables.
          </li>
          <li>
            Randomize order with <code>randint</code> from <code>random</code>.
          </li>
          <li>
            Provide an option to <strong>quit</strong> and to retry only
            incorrect questions.
          </li>
          <li>
            No external libraries; ensure it runs in{" "}
            <strong>IDLE on Windows</strong>.
          </li>
        </ul>
      </div>
    </section>
  );
}
