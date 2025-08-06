// src/assignments/mod2/tasks/Assignment2B.tsx
import { useState } from "react";

import {
  ToggleScreenshotButton,
  RunInPlaygroundButton,
  RunFunctionButton,
} from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import { DownloadJsButton } from "@/components/buttons";

const Assignment2B = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);
  const [maxValue, setMaxValue] = useState<string>("120");

  const screenshots = [
    {
      src: "/code-playground/CS81/mod-2/B/FizzBuzz_Assignment_Screenshot.png",
      alt: "FizzBuzz console screenshot",
    },
  ];

  const runFizzBuzz = () => {
    const max = parseInt(maxValue);
    if (isNaN(max) || max < 1) {
      alert("Please enter a valid number greater than 0.");
      return;
    }
    for (let i = 1; i <= max; i++) {
      if (i % 4 === 0 && i % 10 === 0) {
        console.log("FizzBuzz");
      } else if (i % 4 === 0) {
        console.log("Fizz");
      } else if (i % 10 === 0) {
        console.log("Buzz");
      } else {
        console.log(i);
      }
    }
  };

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment 2B: FizzBuzz
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Practice loops and conditionals by printing numbers with FizzBuzz logic
        in the browser console.
      </p>

      <ul className="ml-6 list-disc space-y-1 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Fizz:</strong> Numbers divisible by 4
        </li>
        <li>
          <strong>Buzz:</strong> Numbers divisible by 10 (but not 4)
        </li>
        <li>
          <strong>FizzBuzz:</strong> Numbers divisible by both 4 and 10
        </li>
      </ul>

      <input
        type="number"
        min="1"
        value={maxValue}
        onChange={(e) => setMaxValue(e.target.value)}
        className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-1.5 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:w-auto"
        placeholder="Enter max number (e.g. 120)"
      />

      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <RunFunctionButton onClick={runFizzBuzz} label="Run FizzBuzz" />

        <RunInPlaygroundButton file="mod-2/B/assn2b.js" />

        <DownloadJsButton
          fileUrl="/sandbox/CS81/mod-2/B/assn2b.js"
          filename="assn2b.js"
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

export default Assignment2B;
