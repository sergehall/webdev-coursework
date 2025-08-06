// frontend/src/courses/CS87A/assignments/mod1/tasks/Assignment1.tsx
import { useState } from "react";

import ScreenshotGallery from "@/components/ScreenshotGallery";
import {
  DownloadAssignmentBundleButton,
  RunInPlaygroundButton,
  ToggleScreenshotButton,
} from "@/components/buttons";

const Assignment1 = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const screenshots = [
    {
      label: "Screenshot-assignment1 – Python Intro",
      src: "/code-playground/CS87A/mod-1/screenshot-assignment1.png",
    },
  ];

  const files = [
    {
      fileUrl: "/code-playground/CS87A/mod-1/CS87A_FA2020_A01.pdf",
      filename: "CS87A_FA2020_A01.pdf",
    },
    {
      fileUrl: "/code-playground/CS87A/mod-1/A01.py",
      filename: "A01.py",
    },
    {
      fileUrl: "/code-playground/CS87A/mod-1/screenshot-assignment1.png",
      filename: "screenshot-assignment1.png",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Assignment 1 – Python Setup & Intro</h2>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Get started with Python and prepare your working environment for the
          course. Update your profiles on Zoom and Canvas, and complete a simple
          Python exercise using IDLE.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Project Description
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Write a Python script using only the number <code>5.9687</code> and
          the built-in <code>int()</code> function to enumerate five places you
          want to visit. Use <code>print()</code> to output the list, and
          include required comments at the top of your <code>A01.py</code> file.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Key Requirements
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>Set profile photo and bio on Zoom and Canvas</li>
          <li>Use Python IDLE or a preferred IDE (must work on Windows)</li>
          <li>
            Submit <code>A01.py</code> only – no screenshots or text outputs
          </li>
          <li>Include proper header comments in your script</li>
          <li>
            Use only <code>print()</code> and numeric conversion as described
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ToggleScreenshotButton
          show={showScreenshots}
          toggle={() => setShowScreenshots(!showScreenshots)}
        />
        <RunInPlaygroundButton
          file="CS87A/mod-1/A01.py"
          label="Run in Playground"
        />
        <DownloadAssignmentBundleButton files={files} />
      </div>

      {/* Screenshot Preview */}
      {showScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </div>
  );
};

export default Assignment1;
