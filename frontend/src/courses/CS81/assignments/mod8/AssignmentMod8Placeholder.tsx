// src/assignments/mod8/AssignmentMod8Placeholder.tsx

export default function AssignmentMod8Placeholder() {
  return (
    <section className="space-y-6 rounded border border-sky-300 bg-sky-50 p-6 shadow-sm dark:border-sky-600 dark:bg-sky-900/10">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-sky-700 dark:text-sky-300">
        Module 8 – React State & Props
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        In this module, you’ll learn how to pass data between components using
        <strong> props</strong>, and how to manage internal data using
        <strong> state</strong>. This is the foundation of dynamic, interactive
        UIs in React.
      </p>

      <div className="rounded border border-sky-200 bg-sky-100 p-4 dark:border-sky-700 dark:bg-sky-800/30">
        <p className="text-sm leading-relaxed text-sky-900 dark:text-sky-100">
          <strong>Assignment:</strong> Build a multi-component app where a
          parent component manages state and passes props down to children.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Use <code>useState</code> to store and update values
          </li>
          <li>Pass data to child components using props</li>
          <li>Trigger state updates based on user input</li>
          <li>Practice one-way data flow in your app structure</li>
        </ul>
      </div>

      <div className="text-sm italic text-sky-800 dark:text-sky-300">
        🔁 React state drives your UI — when state changes, components
        re-render. Props are read-only data you send *down* the component tree.
      </div>
    </section>
  );
}
