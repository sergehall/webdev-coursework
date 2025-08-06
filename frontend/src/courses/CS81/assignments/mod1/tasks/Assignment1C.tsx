// src/assignments/mod1/tasks/Assignment1C.tsx
import { useState } from "react";

import {
  DownloadHtmlButton,
  ToggleScreenshotButton,
  RunInPlaygroundButton,
  RunFunctionButton,
} from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";

const Assignment1C = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);
  const screenshots = [
    {
      label: "Console output screenshot",
      src: "/code-playground/CS81/mod-1/C/introToJS.png",
    },
  ];

  const helloWordName = () => {
    console.log("Hello World, my name is Serge Hall!");
  };

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment 1C: Intro to JavaScript
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Learn core JavaScript concepts, logical operations, ECMAScript
        standards, and how to interact with the browser console.
      </p>

      <ul className="ml-6 list-disc space-y-1 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Q1:</strong> Explain what JavaScript is (75+ words).
        </li>
        <li>
          <strong>Q2:</strong> Explain JavaScript vs. ECMAScript (75+ words).
        </li>
        <li>
          <strong>Q3:</strong> Evaluate logical expressions (manual + console).
        </li>
        <li>
          <strong>Q4:</strong> Print a sentence with <code>console.log()</code>{" "}
          in DevTools. Take a screenshot.
        </li>
        <li>
          <strong>Q5:</strong> List 4 JS data types with explanations for 3.
        </li>
      </ul>

      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <DownloadHtmlButton
          fileUrl="/code-playground/CS81/mod-1/C/intro-to-javascript.html"
          filename="intro-to-javascript.html"
        />
        <RunInPlaygroundButton file="CS81/mod-1/C/helloWorldName.js" />
        <RunFunctionButton onClick={helloWordName} label="Run in Console" />
        <ToggleScreenshotButton
          show={showScreenshots}
          toggle={() => setShowScreenshots(!showScreenshots)}
        />
      </div>
      {showScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </div>
  );
};

export default Assignment1C;
