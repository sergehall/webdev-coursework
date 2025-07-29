// src/assignments/mod10/AssignmentMod10Placeholder.tsx

export default function AssignmentMod10Placeholder() {
  return (
    <section className="space-y-6 rounded border border-emerald-300 bg-emerald-50 p-6 shadow-sm dark:border-emerald-700 dark:bg-emerald-900/10">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-emerald-700 dark:text-emerald-300">
        Module 10 – Building Forms in React
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Forms are essential for user input. In this module, you’ll build
        controlled forms using React’s state and event handling system. You'll
        also explore validation and accessibility best practices.
      </p>

      <div className="rounded border border-emerald-200 bg-emerald-100 p-4 dark:border-emerald-600 dark:bg-emerald-800/30">
        <p className="text-sm leading-relaxed text-emerald-900 dark:text-emerald-100">
          <strong>Assignment:</strong> Create a user form with multiple input
          types and validation logic.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Use <code>useState</code> to manage form field values
          </li>
          <li>Handle input and change events properly</li>
          <li>Validate form fields and display helpful messages</li>
          <li>Reset or submit data with proper control</li>
        </ul>
      </div>

      <div className="text-sm italic text-emerald-800 dark:text-emerald-300">
        ✅ Controlled components give you full control over form behavior in
        React.
      </div>
    </section>
  );
}
