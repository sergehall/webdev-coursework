import { useState } from "react";

import {
  DownloadJsButton,
  DownloadMdButton,
  ExternalLinkButton,
  RunInSandboxButton,
  ToggleScreenshotButton,
} from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";

const Assignment5A = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);
  const screenshots = [
    {
      label: "Sample Console Output",
      src: "/sandbox/CS81/mod-5/A/hobbyTracker-output.png",
    },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment 5A: Code Review – hobbyTracker.js
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        This assignment focuses on analyzing, improving, and reflecting on a
        JavaScript program that uses higher-order functions like{" "}
        <code>map()</code>, <code>filter()</code>, and <code>reduce()</code> to
        process a weekly hobby log.
      </p>

      <ul className="ml-6 list-decimal space-y-1 text-gray-700 dark:text-gray-300">
        <li>
          Create a GitHub repository named: <code>cs81-module5a-review</code>
        </li>
        <li>
          Add the provided <code>hobbyTracker.js</code> file with at least 10
          meaningful comments.
        </li>
        <li>
          Improve at least one function (e.g., make it reusable or rename it for
          clarity).
        </li>
        <li>
          Add a new <code>console.log()</code> call to test one of the functions
          with new input.
        </li>
        <li>
          Write a <code>REFLECTION.md</code> file explaining what you learned
          and what was confusing.
        </li>
        <li>Make at least 3 meaningful Git commits with clear messages.</li>
      </ul>

      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ExternalLinkButton
          href="https://github.com/sergehall/cs81-module5a-review"
          label="View GitHub Repository"
        />

        <DownloadJsButton
          fileUrl="/sandbox/CS81/mod-5/A/hobbyTracker.js"
          filename="hobbyTracker.js"
          label="hobbyTracker.js"
        />

        <RunInSandboxButton
          file="CS81/mod-5/A/hobbyTracker.js"
          label="Run in Sandbox"
        />

        <DownloadMdButton
          fileUrl="/sandbox/CS81/mod-5/A/REFLECTION.md"
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

export default Assignment5A;
