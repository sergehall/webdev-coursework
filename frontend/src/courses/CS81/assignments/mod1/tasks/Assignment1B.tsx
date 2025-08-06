// src/assignments/mod1/tasks/Assignment1B.tsx
import { useState } from "react";

import {
  DownloadHtmlButton,
  ToggleScreenshotButton,
} from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";

const Assignment1B = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);
  const screenshots = [
    {
      src: "/code-playground/CS81/mod-1/B/slack-workspace.png",
      label: "Slack interface showing 'smccs81sum2025' workspace",
    },
    {
      src: "/code-playground/CS81/mod-1/B/slack-profile.png",
      label: "Slack showing your full name in the member list or chat",
    },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment 1B: Join Slack Workspace
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Join the course Slack workspace "smccs81sum2025" using your email. Make
        sure your name matches your Canvas name and take a screenshot showing
        the workspace name and your full name in the UI.
      </p>

      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <DownloadHtmlButton
          fileUrl="/code-playground/CS81/mod-1/B/slack-checklist.html"
          filename="slack-checklist.html"
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

export default Assignment1B;
