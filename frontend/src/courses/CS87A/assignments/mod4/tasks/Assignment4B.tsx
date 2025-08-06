// src/assignments/mod4/tasks/Assignment4B.tsx
import { useState } from "react";

import {
  DownloadJsButton,
  DownloadMdButton,
  ExternalLinkButton,
  ToggleScreenshotButton,
} from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";

const Assignment4B = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);
  const screenshots = [
    {
      label: "Console Output Sample",
      src: "/code-playground/CS81/mod-4/B/data-analysis-results.png",
    },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment 4B: My Personal Data Objects
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        This assignment involves collecting personal weekly data and using
        JavaScript objects and arrays to analyze patterns. Students write
        predictions, build functions, and reflect on their findings through
        meaningful coding practice.
      </p>

      <ul className="ml-6 list-decimal space-y-1 text-gray-700 dark:text-gray-300">
        <li>
          Create a GitHub repository named:{" "}
          <code>cs81-module4b-mydataexplorer</code>
        </li>
        <li>
          Build <code>myDataJournal.js</code> using real or realistic weekly
          data across 7 days.
        </li>
        <li>
          Write prediction comments and implement at least 4 analysis functions:
          <ul className="ml-6 list-disc">
            <li>findHighestScreenTime()</li>
            <li>averageSleep()</li>
            <li>mostFrequentMood()</li>
            <li>correlateCaffeineToFocus()</li>
          </ul>
        </li>
        <li>
          Add a <code>REFLECTION.md</code> file discussing insights and coding
          experience.
        </li>
        <li>Make at least 4 meaningful Git commits with clear messages.</li>
      </ul>

      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ExternalLinkButton
          href="https://github.com/sergehall/cs81-module4b-mydataexplorer"
          label="View GitHub Repository"
        />

        <DownloadJsButton
          fileUrl="/sandbox/CS81/mod-4/B/myDataJournal.js"
          filename="myDataJournal.js"
          label="myDataJournal.js"
        />
        <DownloadJsButton
          fileUrl="/sandbox/CS81/mod-4/B/testDataJournal.js"
          filename="testDataJournal.js"
          label="testDataJournal.js"
        />

        <DownloadMdButton
          fileUrl="/sandbox/CS81/mod-4/B/REFLECTION.md"
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

export default Assignment4B;
