// src/assignments/mod9/AssignmentMod9.tsx

export default function AssignmentMod9Placeholder() {
  return (
    <section className="space-y-6 rounded border border-sky-300 bg-sky-50 p-6 shadow-sm dark:border-sky-600 dark:bg-sky-900/10">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-sky-700 dark:text-sky-300">
        Module 9 – React Events & Side Effects
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        This module explores how to make your React applications interactive by
        handling user events and responding to changes with side effects. You’ll
        also learn when and how to use <code>useEffect</code> to sync your UI
        with external systems or data.
      </p>

      <div className="rounded border border-sky-200 bg-sky-100 p-4 dark:border-sky-700 dark:bg-sky-800/30">
        <p className="text-sm leading-relaxed text-sky-900 dark:text-sky-100">
          <strong>Assignment:</strong> Create an interactive component that
          responds to user actions and fetches data from an API.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Attach event handlers like <code>onClick</code> and{" "}
            <code>onChange</code>
          </li>
          <li>
            Use <code>useEffect</code> to handle side effects like API calls
          </li>
          <li>
            Manage cleanup logic inside <code>useEffect</code>
          </li>
        </ul>
      </div>

      <div className="text-sm italic text-sky-800 dark:text-sky-300">
        ⚡ Events make your UI responsive; effects make it dynamic. Master both
        to unlock the power of React.
      </div>
    </section>
  );
}
