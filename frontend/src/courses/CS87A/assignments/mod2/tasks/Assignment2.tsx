// frontend/src/courses/CS87A/assignments/mod1/tasks/Assignment2.tsx
import { useState } from "react";

import ScreenshotGallery from "@/components/ScreenshotGallery";
import {
  DownloadAssignmentBundleButton,
  RunInPlaygroundButton,
  ToggleScreenshotButton,
  DownloadPDFButton,
} from "@/components/buttons";

const Assignment2 = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const screenshots = [
    {
      label: "Screenshot-assignment2 – Python Task",
      src: "/code-playground/CS87A/mod-2/screenshot-assignment2.png",
    },
  ];

  const files = [
    {
      fileUrl: "/code-playground/CS87A/mod-2/CS87A_FA2020_A02.pdf",
      filename: "CS87A_FA2020_A02.pdf",
    },
    {
      fileUrl: "/code-playground/CS87A/mod-2/A02.py",
      filename: "A02.py",
    },
    {
      fileUrl: "/code-playground/CS87A/mod-2/screenshot-assignment2.png",
      filename: "screenshot-assignment2.png",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Assignment 2 – Working with Variables & Output
      </h2>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Practice creating variables, storing values, and printing formatted
          output in Python. Reinforce understanding of Python syntax, string
          concatenation, and arithmetic expressions.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Project Description
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Write a Python script that declares several variables (strings,
          numbers), performs simple arithmetic, and displays results using{" "}
          <code>print()</code>. Include meaningful variable names and proper
          comments at the top of the file <code>A02.py</code>.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Key Requirements
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Include header comments with your name, date, and assignment title
          </li>
          <li>Declare at least three variables of different types</li>
          <li>Perform at least one arithmetic calculation</li>
          <li>
            Use <code>print()</code> to display results
          </li>
          <li>Do not import any external libraries</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ToggleScreenshotButton
          show={showScreenshots}
          toggle={() => setShowScreenshots(!showScreenshots)}
        />
        <DownloadPDFButton
          fileUrl="/code-playground/CS87A/mod-2/CS87A_FA2020_A02.pdf"
          filename="CS87A_FA2020_A02.pdf"
          label="Download Assignment"
        />
        <RunInPlaygroundButton
          file="CS87A/mod-2/A02.py"
          label="Run in Playground"
        />
        <DownloadAssignmentBundleButton files={files} />
      </div>

      {/* Screenshot Preview */}
      {showScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </div>
  );
};

export default Assignment2;
