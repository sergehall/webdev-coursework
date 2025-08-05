// frontend/src/courses/CS87A/assignments/mod1/tasks/Assignment1.tsx
import { useState } from "react";

import {
  DownloadAssignmentBundleButton,
  ToggleScreenshotButton,
} from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";

const Assignment1 = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);
  const screenshots = [
    {
      src: "/sandbox/CS87A/mod-1/CS87A_FA2020_A01.pdf",
      label: "Programming Assignment 1",
    },
  ];

  const files = [
    {
      fileUrl: "/sandbox/CS87A/mod-1/CS87A_FA2020_A01.pdf",
      filename: "Programming Assignment 1",
    },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment 1A: Setup Home Dev Environment
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Set up WebStorm, Google Chrome, Node.js, and create a basic project
        structure with index.html and script.js. Verify that Live Server works
        by checking the console output in Chrome. Submit screenshots and
        optionally include version checks.
      </p>

      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <DownloadAssignmentBundleButton files={files} />
        <ToggleScreenshotButton
          show={showScreenshots}
          toggle={() => setShowScreenshots(!showScreenshots)}
        />
      </div>
      {showScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </div>
  );
};

export default Assignment1;
