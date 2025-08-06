// src/assignments/mod6/Assignment6B.tsx
import { useState } from "react";

import {
  DownloadJsButton,
  DownloadMdButton,
  ExternalLinkButton,
  RunInPlaygroundButton,
  ToggleScreenshotButton,
} from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";

const Assignment6B = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);
  const screenshots = [
    {
      label: "Console Output Example",
      src: "/code-playground/CS81/mod-6/B/assistant-console-output.png",
    },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment 6B: Personal Assistant – assistant.js
      </h2>

      <p className="text-gray-700 dark:text-gray-300">
        In this project, you’ll build a personal JavaScript assistant object
        using a constructor function and prototype methods. You’ll simulate
        daily activity and use <code>this</code> to tie state and behavior
        together.
      </p>

      <ul className="ml-6 list-decimal space-y-1 text-gray-700 dark:text-gray-300">
        <li>
          Create a GitHub repository named: <code>cs81-module6b-assistant</code>
        </li>
        <li>
          Define a <code>PersonalAssistant</code> constructor with{" "}
          <code>name</code>, <code>tasks</code>, and <code>mood</code>.
        </li>
        <li>
          Add methods like <code>addTask</code>, <code>completeTask</code>, and{" "}
          <code>reportMood</code>.
        </li>
        <li>
          Simulate a day using <code>console.log</code>: greet, add tasks,
          complete tasks, report mood.
        </li>
        <li>
          Write a <code>REFLECTION.md</code> file answering the project
          questions.
        </li>
        <li>
          Make at least 4 meaningful Git commits (e.g., “added constructor”,
          “simulated day”).
        </li>
      </ul>

      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ExternalLinkButton
          href="https://github.com/sergehall/cs81-module6b-assistant"
          label="View GitHub Repository"
        />

        <DownloadJsButton
          fileUrl="/sandbox/CS81/mod-6/B/assistant.js"
          filename="assistant.js"
          label="assistant.js"
        />

        <RunInPlaygroundButton
          file="CS81/mod-6/B/assistant.js"
          label="Run in Playground"
        />

        <DownloadMdButton
          fileUrl="/sandbox/CS81/mod-6/B/REFLECTION.md"
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

export default Assignment6B;
