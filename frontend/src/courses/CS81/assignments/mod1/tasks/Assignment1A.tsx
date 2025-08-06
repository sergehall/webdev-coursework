// src/assignments/mod1/tasks/Assignment1.tsx
import { useState } from "react";

import {
  DownloadHtmlButton,
  ToggleScreenshotButton,
} from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";

const Assignment1A = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);
  const screenshots = [
    {
      src: "/code-playground/CS81/mod-1/A/webstorm.png",
      label: "WebStorm with project files",
    },
    {
      src: "/code-playground/CS81/mod-1/A/chrome.png",
      label: "Chrome with site and console",
    },
    {
      src: "/code-playground/CS81/mod-1/A/terminal.png",
      label: "Terminal showing Node.js and npm versions",
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
        <DownloadHtmlButton
          fileUrl="/code-playground/CS81/mod-1/A/checklist.html"
          filename="checklist.html"
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

export default Assignment1A;
