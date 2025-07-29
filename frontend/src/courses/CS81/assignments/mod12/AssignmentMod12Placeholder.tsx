// src/assignments/mod12/AssignmentMod12Placeholder.tsx

export default function AssignmentMod12Placeholder() {
  return (
    <section className="space-y-6 rounded border border-fuchsia-300 bg-fuchsia-50 p-6 shadow-sm dark:border-fuchsia-700 dark:bg-fuchsia-900/10">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-fuchsia-700 dark:text-fuchsia-300">
        Module 12 – Final Project
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Congratulations! In this final module, you will apply everything you've
        learned in CS81 — from JavaScript fundamentals to React components and
        working with public APIs — to build a complete, interactive web
        application.
      </p>

      <div className="rounded border border-fuchsia-200 bg-fuchsia-100 p-4 dark:border-fuchsia-600 dark:bg-fuchsia-800/30">
        <p className="text-sm leading-relaxed text-fuchsia-900 dark:text-fuchsia-100">
          <strong>Final Project Requirements:</strong> Your project must
          include:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Modular code using <strong>functions</strong> and reusable{" "}
            <strong>components</strong>
          </li>
          <li>
            Use of <strong>arrays and objects</strong> to manage structured data
          </li>
          <li>
            Dynamic content driven by <strong>state and props</strong>
          </li>
          <li>
            <strong>Event handling</strong> and <strong>form processing</strong>
          </li>
          <li>
            Fetching data from a <strong>public API</strong> using{" "}
            <code>fetch</code> and <code>useEffect</code>
          </li>
          <li>Clean and responsive layout using modern CSS (e.g. Tailwind)</li>
        </ul>
      </div>

      <div className="text-sm italic text-fuchsia-800 dark:text-fuchsia-300">
        🎓 This is your chance to demonstrate your full-stack front-end skills —
        be creative, clean, and proud of your code!
      </div>
    </section>
  );
}
