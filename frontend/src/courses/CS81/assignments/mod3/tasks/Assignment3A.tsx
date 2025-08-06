// src/assignments/mod3/tasks/Assignment3A.tsx

import {
  DownloadJsButton,
  DownloadMdButton,
  ExternalLinkButton,
} from "@/components/buttons";

const Assignment3A = () => {
  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment 3A: Git & GitHub – Function Journal
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        In this assignment, we created a GitHub repository and practiced using
        Git to manage code changes. The project includes multiple JavaScript
        functions, commit history, and reflections.
      </p>

      <ul className="ml-6 list-decimal space-y-1 text-gray-700 dark:text-gray-300">
        <li>Install Git and configure your username/email.</li>
        <li>
          Create a GitHub repository: <code>cs81-module3a-github</code>.
        </li>
        <li>
          Clone the repo and add a file <code>journal.js</code>.
        </li>
        <li>Implement 5 unique functions (e.g., greet, isEven, factorial).</li>
        <li>
          Use <code>git add</code>, <code>git commit</code>,{" "}
          <code>git push</code>.
        </li>
        <li>
          Add <code>README.md</code> with descriptions and{" "}
          <code>REFLECTION.md</code> with answers.
        </li>
      </ul>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <ExternalLinkButton
          href="https://github.com/sergehall/cs81-module3a-github"
          label="View GitHub Repository"
        />

        <DownloadJsButton
          fileUrl="/code-playground/CS81/mod-3/A/journal.js"
          filename="journal.js"
          label="Download journal.js"
        />
        <DownloadMdButton
          fileUrl="/code-playground/CS81/mod-3/A/README.md"
          filename="README.md"
          label="Download README.md"
        />

        <DownloadMdButton
          fileUrl="/code-playground/CS81/mod-3/A/REFLECTION.md"
          filename="REFLECTION.md"
          label="Download REFLECTION.md"
        />
      </div>
    </div>
  );
};

export default Assignment3A;
