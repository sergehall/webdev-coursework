// frontend/src/courses/CS87A/assignments/mod1/tasks/Assignment3.tsx
import { useState } from "react";

import ScreenshotGallery from "@/components/ScreenshotGallery";
import {
  DownloadAssignmentBundleButton,
  RunInPlaygroundButton,
  ToggleScreenshotButton,
  DownloadPDFButton,
} from "@/components/buttons";

const Assignment3 = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const screenshots = [
    {
      label: "Screenshot-assignment3 – Tic-Tac-Toe",
      src: "/code-playground/CS87A/mod-3/screenshot-assignment3.png",
    },
  ];

  const files = [
    {
      fileUrl: "/code-playground/CS87A/mod-3/CS87A_FA2020_A03.pdf",
      filename: "CS87A_FA2020_A03.pdf",
    },
    {
      fileUrl: "/code-playground/CS87A/mod-3/A03.py",
      filename: "A03.py",
    },
    {
      fileUrl: "/code-playground/CS87A/mod-3/screenshot-assignment3.png",
      filename: "screenshot-assignment3.png",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Assignment 3 – Tic-Tac-Toe with Variable Board Size & Difficulty
      </h2>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Build a console Tic-Tac-Toe game in Python that supports a custom
          square board size and two difficulty levels. Practice working with
          two-dimensional lists, loops, input validation, and game-state
          evaluation (win/draw detection).
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Project Description
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Implement a Tic-Tac-Toe game where the user can choose the board’s
          diagonal length (e.g., <code>3</code> for the classic game) and a
          difficulty level: <strong>Level 1</strong> — the computer chooses
          moves randomly; <strong>Level 2</strong> — the computer tries to win
          or at least force a draw. Represent the board as a two-dimensional
          list whose size equals the chosen diagonal. After each game, prompt
          the user to play again.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Key Requirements
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Include header comments with your name, date, and assignment title
            in <code>A03.py</code>
          </li>
          <li>
            Prompt for the board diagonal length (minimum <code>3</code>) and
            the difficulty level (<code>1</code> or <code>2</code>)
          </li>
          <li>Use a 2D list to store the board; display it after each move</li>
          <li>
            Player vs. Computer turns; player uses <code>X</code>, computer uses{" "}
            <code>0</code> (zero)
          </li>
          <li>
            Level 1: computer selects a random empty cell; Level 2: implement a
            strategy to try to win or at least draw
          </li>
          <li>
            Check for win conditions across rows, columns, and both diagonals;
            detect and report draws
          </li>
          <li>Validate user input; handle invalid entries gracefully</li>
          <li>Offer to play again at the end of a game</li>
          <li>Do not import external libraries</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ToggleScreenshotButton
          show={showScreenshots}
          toggle={() => setShowScreenshots(!showScreenshots)}
        />
        <DownloadPDFButton
          fileUrl="/code-playground/CS87A/mod-3/CS87A_FA2020_A03.pdf"
          filename="CS87A_FA2020_A03.pdf"
          label="Download Assignment"
        />
        <RunInPlaygroundButton
          file="CS87A/mod-3/A03.py"
          label="Run in Playground"
        />
        <DownloadAssignmentBundleButton files={files} />
      </div>

      {/* Screenshot Preview */}
      {showScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </div>
  );
};

export default Assignment3;
