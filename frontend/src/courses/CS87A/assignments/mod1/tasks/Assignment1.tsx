import { useState } from "react";

import ScreenshotGallery from "@/components/ScreenshotGallery";
import {
  DownloadPDFButton,
  ExternalLinkButton,
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Installing and Using Python, IDLE, and Canvas
      </h2>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Get started with Python by installing and using IDLE (or your
          preferred IDE) and preparing your Zoom & Canvas profiles. You will
          write a simple Python program using only the number{" "}
          <code>5.9687</code> and the <code>int()</code> function to enumerate
          and display five places you recommend or want to visit in the world.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Project Description
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Use the built-in <code>print()</code> function to display a list of
          five unique travel destinations. Enumerate each item starting from 0
          without hardcoding the numbers—only use <code>int(5.9687)</code> in
          your logic to produce the sequence. Do not copy the example
          destinations from the handout; create your own list. Include proper
          header comments in your <code>A01.py</code> file as shown in the
          skeleton code.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Key Requirements
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Add a profile picture and bio on both Zoom and Canvas (include
            professional links if available)
          </li>
          <li>
            Write your Python code in IDLE or another IDE (must run in IDLE on
            Windows)
          </li>
          <li>
            Submit exactly one file named <code>A01.py</code> — no screenshots
            or copied interpreter sessions
          </li>
          <li>
            Include your name, student ID, assignment number, date, and
            description in comments at the top
          </li>
          <li>
            Use only <code>print()</code> and <code>int()</code> with{" "}
            <code>5.9687</code> to create the numbered list
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ToggleScreenshotButton
          show={showScreenshots}
          toggle={() => setShowScreenshots(!showScreenshots)}
        />
        <DownloadPDFButton
          fileUrl="/code-playground/CS87A/mod-1/CS87A_FA2020_A01.pdf"
          filename="CS87A_FA2020_A01.pdf"
          label="Download Assignment"
        />
        <RunInPlaygroundButton
          file="CS87A/mod-1/A01.py"
          label="Run in Playground"
        />

        <ExternalLinkButton
          href="https://github.com/sergehall/Python_SMC_CS_87A"
          label="View Solution on GitHub"
        />
      </div>

      {/* Screenshot Preview */}
      {showScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </div>
  );
};

export default Assignment1;
