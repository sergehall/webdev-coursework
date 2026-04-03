import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod4Placeholder() {
  useFinalModuleRedirect(5); // Module 5 redirects to the next assignment

  return (
    <section className="space-y-6 rounded border border-indigo-300 bg-indigo-50 p-6 dark:border-indigo-700 dark:bg-indigo-900/10">
      <h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">
        Module 4 – The DOM (Document Object Model)
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        This module introduces the DOM (Document Object Model), which provides
        programmatic access to all elements of a web page. You'll learn to
        traverse and manipulate the DOM tree using JavaScript, and respond to
        user events.
      </p>

      <div className="rounded border border-indigo-200 bg-indigo-100 p-4 dark:border-indigo-600 dark:bg-indigo-800/30">
        <p>
          <strong>Assignment:</strong> Build an interactive webpage that
          modifies content in real-time using DOM methods and event listeners.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Use <code>getElementById()</code> to access DOM elements
          </li>
          <li>
            Modify elements with <code>innerHTML</code> and{" "}
            <code>setAttribute()</code>
          </li>
          <li>
            Create new elements with <code>createElement()</code> and add them
            dynamically
          </li>
          <li>
            Use <code>addEventListener()</code> to react to clicks, form
            submits, and more
          </li>
          <li>
            Explore DOM collections like <code>document.images</code>,{" "}
            <code>document.forms</code>, etc.
          </li>
        </ul>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        ⚙️ Understand how the browser renders your page and how to
        programmatically interact with it.
      </div>
    </section>
  );
}
