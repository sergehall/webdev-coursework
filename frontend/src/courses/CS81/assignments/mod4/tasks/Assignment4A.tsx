// src/assignments/mod4/tasks/Assignment4A.tsx
import { useState } from "react";

import ScreenshotGallery from "@/components/ScreenshotGallery";
import {
  DownloadJsButton,
  DownloadMdButton,
  ExternalLinkButton,
  ToggleScreenshotButton,
} from "@/components/buttons";

const Assignment4A = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);
  const screenshots = [
    {
      label: "Test Case Results",
      src: "/sandbox/CS81/mod-4/A/reading-test-result.png",
    },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment 4A: Review readingTracker.js
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        This assignment focuses on reading, analyzing, and improving an existing
        JavaScript program that tracks reading time. You will comment code,
        summarize function behavior, suggest improvements, and reflect on your
        understanding.
      </p>

      <ul className="ml-6 list-decimal space-y-1 text-gray-700 dark:text-gray-300">
        <li>
          Create a new GitHub repository:{" "}
          <code>cs81-module4a-reviewtracker</code>.
        </li>
        <li>
          Download and edit <code>readingTracker.js</code> with inline comments
          and summaries.
        </li>
        <li>Suggest a code improvement (naming, validation, etc).</li>
        <li>Add at least one test case with new data.</li>
        <li>
          Write a <code>REFLECTION.md</code> file with two required answers.
        </li>
        <li>Make at least 3 meaningful Git commits during the process.</li>
      </ul>

      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ExternalLinkButton
          href="https://github.com/sergehall/cs81-module4a-reviewtracker"
          label="View GitHub Repository"
        />

        <DownloadJsButton
          fileUrl="/sandbox/CS81/mod-4/A/readingTracker.js"
          filename="readingTracker.js"
          label="Download tracker.js"
        />

        <DownloadMdButton
          fileUrl="/sandbox/CS81/mod-4/A/REFLECTION.md"
          filename="REFLECTION.md"
          label="REFLECTION.md"
        />
        <ToggleScreenshotButton
          show={showScreenshots}
          toggle={() => setShowScreenshots(!showScreenshots)}
        />
      </div>
      {showScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </div>
  );
};

export default Assignment4A;
