// src/assignments/mod2/tasks/Assignment2A.tsx

import { useState } from "react";

import {
  DownloadHtmlButton,
  DownloadJsButton,
  ToggleScreenshotButton,
  RunFunctionButton,
} from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";

const Assignment2A = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);
  const screenshots = [
    {
      label: "Hello World alert and console screenshot",
      src: "/sandbox/mod-2/A/HelloWorld_Assignment_Screenshot.png",
    },
  ];
  console.log("Hello, World!");

  const showMessage = () => {
    alert("Hello, World!");
    console.log("Hello, World!");
  };

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment 2A: Hello, World! with External JavaScript
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Build and test your first external JavaScript project. Trigger alerts
        and console output from a button click.
      </p>

      <ul className="ml-6 list-disc space-y-1 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Step 1:</strong> Create folder and files.
        </li>
        <li>
          <strong>Step 2:</strong> Build <code>helloWorld.html</code>.
        </li>
        <li>
          <strong>Step 3:</strong> Create logic in <code>helloWorld.js</code>.
        </li>
        <li>
          <strong>Step 4:</strong> Test with alert and console.log.
        </li>
        <li>
          <strong>Step 5:</strong> Take a screenshot and submit.
        </li>
      </ul>

      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <RunFunctionButton onClick={showMessage} label="Trigger alert" />

        <DownloadHtmlButton
          fileUrl="/sandbox/mod-2/A/hello-world.html"
          filename="hello-world.html"
        />

        <DownloadJsButton
          fileUrl="/sandbox/mod-2/A/helloWorld.js"
          filename="helloWorld.js"
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

export default Assignment2A;
