import { useState } from "react";

import {
  DownloadAssignmentBundleButton,
  DownloadJsButton,
  DownloadMdButton,
  ExternalLinkButton,
  RunInPlaygroundButton,
  ToggleScreenshotButton,
} from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";

const Assignment5B = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const screenshots = [
    {
      label: "Sample Console Output",
      src: "/code-playground/CS81/mod-5/B/runTracker-output.png",
    },
  ];

  const files = [
    {
      fileUrl: "/code-playground/CS81/mod-5/B/activityTracker.js",
      filename: "activityTracker.js",
    },
    {
      fileUrl: "/code-playground/CS81/mod-5/B/README.md",
      filename: "README.md",
    },
    {
      fileUrl: "/code-playground/CS81/mod-5/B/REFLECTION.md",
      filename: "REFLECTION.md",
    },
    {
      fileUrl: "frontend/public/code-playground/CS81/mod-5/B/runTracker.js",
      filename: "runTracker.js",
    },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment 5B: My Week in Data
      </h2>

      <p className="text-gray-700 dark:text-gray-300">
        In this assignment, you’ll analyze your own real-life behavior over the
        course of a week using JavaScript. You'll define your weekly activities
        in an array and use higher-order functions like <code>map()</code>,{" "}
        <code>filter()</code>, and <code>reduce()</code> to uncover patterns and
        draw insights from the data.
      </p>

      <p className="text-gray-700 dark:text-gray-300">
        You'll begin by making predictions about your activity trends—like which
        activity you think you'll enjoy the most, or which time of day is your
        most productive. Then, through custom analysis functions and a
        higher-order helper, you'll test those predictions and reflect on what
        you’ve learned.
      </p>

      <p className="text-gray-700 dark:text-gray-300">
        This assignment emphasizes not just syntax, but real-world reasoning,
        problem-solving, and meaningful reflection. It helps solidify your
        understanding of how data-driven programming can reveal unexpected
        insights about your own habits.
      </p>

      <ul className="ml-6 list-decimal space-y-1 text-gray-700 dark:text-gray-300">
        <li>
          Create a GitHub repository named:{" "}
          <code>cs81-module5b-weektracker</code>
        </li>
        <li>
          In <code>activityTracker.js</code>, define an array called{" "}
          <code>myWeek</code> with 7 objects (one per day). Each object must
          include:
          <ul className="ml-6 list-disc">
            <li>
              <code>day</code> (string)
            </li>
            <li>
              <code>activity</code> (string)
            </li>
            <li>
              <code>category</code> (e.g. physical, creative, social)
            </li>
            <li>
              <code>hoursSpent</code> (number)
            </li>
            <li>
              <code>enjoyment</code> (1–10)
            </li>
            <li>
              <code>timeOfDay</code> (morning, afternoon, evening)
            </li>
          </ul>
        </li>
        <li>
          Add predictions in comments at the top of your JS file:
          <ul className="ml-6 list-disc">
            <li>Which activity will have the highest enjoyment?</li>
            <li>Which category will dominate?</li>
            <li>What patterns might exist around time of day?</li>
          </ul>
        </li>
        <li>
          Write at least two analysis functions using <code>map()</code>,{" "}
          <code>filter()</code>, <code>reduce()</code>, or any combination of
          them. For example:
          <ul className="ml-6 list-disc">
            <li>Total hours spent outdoors</li>
            <li>Average enjoyment after 8 PM</li>
            <li>Most common category</li>
            <li>Low-effort, high-enjoyment activities</li>
          </ul>
        </li>
        <li>
          Write your own custom higher-order function that accepts a callback
          function (e.g., <code>filterByCondition</code>).
        </li>
        <li>
          Add a <code>REFLECTION.md</code> file that answers:
          <ul className="ml-6 list-disc">
            <li>Were your predictions accurate?</li>
            <li>What surprised you about your data?</li>
            <li>Which higher-order function was most useful and why?</li>
          </ul>
        </li>
        <li>
          Make at least 3 meaningful Git commits that show your progress
          clearly.
        </li>
        <li>
          Submit the GitHub repository link via Canvas and upload a copy of{" "}
          <code>activityTracker.js</code> directly.
        </li>
      </ul>

      <p className="text-gray-700 dark:text-gray-300">
        <strong>Learning Objectives:</strong>
        <ul className="ml-6 list-disc">
          <li>
            Understand how <code>.map()</code>, <code>.filter()</code>, and{" "}
            <code>.reduce()</code> operate and when to use them
          </li>
          <li>
            Practice passing functions as values and writing your own
            higher-order functions
          </li>
          <li>Use JavaScript to explore patterns in real-world behavior</li>
          <li>Develop deeper debugging, prediction, and reflection skills</li>
        </ul>
      </p>

      {/* Action buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ExternalLinkButton
          href="https://github.com/sergehall/cs81-module5b-weektracker"
          label="View GitHub Repository"
        />

        <DownloadJsButton
          fileUrl="/sandbox/CS81/mod-5/B/runTracker.js"
          filename="runTracker.js"
          label="runTracker.js"
        />

        <DownloadMdButton
          fileUrl="/sandbox/CS81/mod-5/B/REFLECTION.md"
          filename="REFLECTION.md"
          label="REFLECTION.md"
        />

        <RunInPlaygroundButton
          file="CS81/mod-5/B/runTracker.js"
          label="Run in Sandbox"
        />

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

export default Assignment5B;
