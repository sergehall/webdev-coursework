// frontend/src/courses/CS87A/assignments/mod1/tasks/Assignment3.tsx
import { useState } from "react";

import ScreenshotGallery from "@/components/ScreenshotGallery";
import {
  RunInPlaygroundButton,
  ToggleScreenshotButton,
  DownloadPDFButton,
  ExternalLinkButton,
} from "@/components/buttons";

const Assignment3 = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const screenshots = [
    {
      label: "Screenshot-assignment3 – Tic-Tac-Toe",
      src: "/code-playground/CS87A/mod-3/screenshot-assignment3.png",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Tic-Tac-Toe (Single Player vs Computer)
      </h2>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Create a Python Tic-Tac-Toe game where a single player competes
          against the computer. Use a list of lists to store the board state and
          the <code>random</code> module to control the computer’s behavior. The
          computer moves first and plays as <strong>O</strong>.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Project Description
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Implement the game logic using Python’s <code>randint</code> for
          computer moves. Write the functions <code>move()</code>,{" "}
          <code>check_cols()</code>, <code>check_diag1()</code>,{" "}
          <code>check_diag2()</code>, <code>check_rows()</code>, and{" "}
          <code>print_board()</code>. Four of these functions check for a
          winning state (three in a row in any row, column, or diagonal). Use
          the provided <code>check_ifwin()</code> to determine if the board is
          in a winning state and announce the winner. Refer to the example
          gameplay in the handout for look-and-feel.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Key Requirements
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Submit a single file named <code>A03.py</code> with header comments
            (name, student ID, assignment number, submission date, short program
            description).
          </li>
          <li>
            Implement <code>move()</code> to make the computer move using{" "}
            <code>random</code>.
          </li>
          <li>
            Implement <code>check_cols()</code>, <code>check_diag1()</code>,{" "}
            <code>check_diag2()</code>, <code>check_rows()</code> to traverse
            the board and detect wins.
          </li>
          <li>
            Implement <code>print_board()</code> to display the current board
            state.
          </li>
          <li>
            The game continues until the player or the computer wins, or the
            game is a draw; then prompt to play another round or exit.
          </li>
          <li>
            Ensure the program runs in <strong>IDLE on Windows</strong>.
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
          fileUrl="/code-playground/CS87A/mod-3/CS87A_FA2020_A03.pdf"
          filename="CS87A_FA2020_A03.pdf"
          label="Download Assignment"
        />
        <RunInPlaygroundButton
          file="CS87A/mod-3/A03.py"
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

export default Assignment3;
