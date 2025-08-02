import { useFinalModuleRedirect } from "@/hooks/useFinalModuleRedirect";

export default function AssignmentMod5() {
  useFinalModuleRedirect(6); // module 6 → redirect to /assignments/completed
  return (
    <section className="space-y-6 rounded border border-teal-300 bg-teal-50 p-6 dark:border-teal-700 dark:bg-teal-900/10">
      <h2 className="text-xl font-bold text-teal-800 dark:text-teal-300">
        Module 5 – jQuery // XML and JSON
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        This module introduces jQuery, a powerful JavaScript library, along with
        working with data formats like XML and JSON. You’ll use jQuery to
        simplify DOM manipulation and handle asynchronous data fetching.
      </p>

      <div className="rounded border border-teal-200 bg-teal-100 p-4 dark:border-teal-600 dark:bg-teal-800/30">
        <p>
          <strong>Assignment:</strong> Build a dynamic interface that loads and
          displays data from XML or JSON using jQuery.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>Use jQuery to select and modify DOM elements</li>
          <li>Fetch and parse XML/JSON data</li>
          <li>Dynamically update the page content</li>
        </ul>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        ⚙️ Learn to interact with APIs and structured data using jQuery.
      </div>
    </section>
  );
}
