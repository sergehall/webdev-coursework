// src/assignments/mod3/tasks/Assignment3B.tsx
import {
  DownloadJsButton,
  DownloadMdButton,
  ExternalLinkButton,
} from "@/components/buttons";

const Assignment3B = () => {
  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment 3B: Math Toolkit Builder
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        This assignment focuses on building a custom JavaScript math toolkit and
        using GitHub to document and track progress. You will create multiple
        functions, write predictions and results, and reflect on the process.
      </p>

      <ul className="ml-6 list-decimal space-y-1 text-gray-700 dark:text-gray-300">
        <li>
          Create a new GitHub repository: <code>cs81-module3b-toolkit</code>.
        </li>
        <li>
          Add a file <code>math.js</code> and write math utility functions.
        </li>
        <li>
          Write predictions in <code>PREDICTIONS.md</code>.
        </li>
        <li>
          Test each function and log results in <code>RESULTS.md</code>.
        </li>
        <li>
          Write final thoughts in <code>REFLECTION.md</code>.
        </li>
        <li>Make at least 5 meaningful commits using Git.</li>
      </ul>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <ExternalLinkButton
          href="https://github.com/sergehall/cs81-module3b-toolkit"
          label="View GitHub Repository"
        />

        <DownloadJsButton
          fileUrl="/sandbox/mod-3/B/math.js"
          filename="math.js"
          label="Download math.js"
        />

        <DownloadMdButton
          fileUrl="/sandbox/mod-3/B/PREDICTIONS.md"
          filename="PREDICTIONS.md"
          label="PREDICTIONS.md"
        />

        <DownloadMdButton
          fileUrl="/sandbox/mod-3/B/RESULTS.md"
          filename="RESULTS.md"
          label="RESULTS.md"
        />

        <DownloadMdButton
          fileUrl="/sandbox/mod-3/B/REFLECTION.md"
          filename="REFLECTION.md"
          label="REFLECTION.md"
        />
      </div>
    </div>
  );
};

export default Assignment3B;
