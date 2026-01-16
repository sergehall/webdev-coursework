// frontend/src/courses/CS87A/assignments/mod1/tasks/Chapter4Overview.tsx
import { useState } from "react";

import ScreenshotGallery from "@/components/ScreenshotGallery";
import {
  RunInPlaygroundButton,
  ToggleScreenshotButton,
  DownloadPDFButton,
  ExternalLinkButton,
} from "@/components/buttons";

const Assignment2 = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const screenshots = [
    {
      label: "Screenshot-assignment2 – Python Trivia Game",
      src: "/code-playground/CS87A/mod-2/screenshot-assignment2.png",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Python Trivia Game</h2>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Create a simple question-and-answer trivia game using{" "}
          <strong>if</strong> statements, Boolean expressions, Python I/O (
          <code>input()</code>/<code>print()</code>), looping control flow, and
          the built-in <code>random</code> module.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Project Description
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Choose a topic and write{" "}
          <strong>three multiple-choice questions</strong> with answers. For
          each question, the game must determine whether the player chose the
          correct answer. The player should be able to{" "}
          <strong>keep playing</strong> if they haven’t answered all three
          questions correctly. If all answers are correct, the game ends. Use{" "}
          <code>randint</code> from <code>random</code> to present the three
          questions/answers in a <strong>different order each time</strong> the
          game is played. Provide an option to <strong>quit</strong> or to retry
          only the questions that were previously marked incorrect.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Key Requirements
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Submit a single file named <code>A02.py</code> with header comments
            (name, student ID, assignment number, submission date, brief
            description).
          </li>
          <li>
            Include at least <strong>three multiple-choice</strong> questions
            (your own, do not reuse those from the handout).
          </li>
          <li>
            Use <code>input()</code> and <code>print()</code> for interaction
            and variables to store player responses.
          </li>
          <li>
            Implement a <strong>game loop</strong> to continue until all three
            are correct or the player quits (<code>y/n</code> logic).
          </li>
          <li>
            Use <code>randint</code> from <code>random</code> to shuffle
            question/answer order on each run.
          </li>
          <li>
            Check answers and display feedback (e.g., “correct” or “try again,
            that is the incorrect answer”).
          </li>
          <li>
            Ensure the script runs in <strong>IDLE on Windows</strong>. No
            screenshots, transcripts, or pasted output—submit only{" "}
            <code>A02.py</code>.
          </li>
          <li>No external libraries beyond Python’s standard library.</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ToggleScreenshotButton
          show={showScreenshots}
          toggle={() => setShowScreenshots(!showScreenshots)}
        />
        <DownloadPDFButton
          fileUrl="/code-playground/CS87A/mod-2/CS87A_FA2020_A02.pdf"
          filename="CS87A_FA2020_A02.pdf"
          label="Download Assignment"
        />
        <RunInPlaygroundButton
          file="CS87A/mod-2/A02.py"
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

export default Assignment2;
