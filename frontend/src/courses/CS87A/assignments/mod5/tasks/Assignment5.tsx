// frontend/src/courses/CS87A/assignments/mod5/tasks/Assignment5.tsx
import { useState } from "react";

import ScreenshotGallery from "@/components/ScreenshotGallery";
import {
  DownloadAssignmentBundleButton,
  RunInPlaygroundButton,
  ToggleScreenshotButton,
  DownloadPDFButton,
} from "@/components/buttons";

const Assignment5 = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const screenshots = [
    {
      label: "Screenshot-assignment5 – President vs House Winners",
      src: "/code-playground/CS87A/mod-5/screenshot-assignment5.png",
    },
  ];

  const files = [
    {
      fileUrl: "/code-playground/CS87A/mod-5/CS87A_FA2020_A05.pdf",
      filename: "CS87A_FA2020_A05.pdf",
    },
    {
      fileUrl: "/code-playground/CS87A/mod-5/A05.py",
      filename: "A05.py",
    },
    {
      fileUrl: "/code-playground/CS87A/mod-5/A05ClassPrH.py",
      filename: "A05ClassPrH.py",
    },
    {
      fileUrl: "/code-playground/CS87A/mod-5/screenshot-assignment5.png",
      filename: "screenshot-assignment5.png",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Assignment 5 – President Candidate vs House Member Winners
      </h2>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Practice file I/O, custom classes, dictionaries with tuple keys, and
          aggregation logic. You will parse House and Presidential election
          results to compute state-level party majorities, electoral votes, and
          determine the presidential winner by electoral vote count.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Project Description
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Read <code>house.tab</code> and <code>president.tab</code>, then
          build:
          <code>house_dict</code> and <code>president_dict</code> keyed by{" "}
          <code>(year, state)</code>. Using objects from{" "}
          <code>A05ClassPrH</code> (e.g., getters like <code>get_year()</code>,{" "}
          <code>get_state()</code>, <code>get_candidate()</code>,{" "}
          <code>get_party()</code>, <code>get_candidatevotes()</code>,{" "}
          <code>get_district()</code>), compute: (1) each state’s majority party
          (by House winners), (2) each state’s electoral votes (districts + 2,
          DC = 3), and (3) the presidential winner per year by summing electoral
          votes of states won. Provide an interactive loop that prompts for an
          election year (and state where applicable), validates input, prints
          formatted tables, and allows the user to <code>quit</code>.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Key Requirements
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Add header comments (name, date, assignment title) in{" "}
            <code>A05.py</code>
          </li>
          <li>
            Implement/Use helpers:
            <code>create_house_dict()</code>,{" "}
            <code>create_president_dict()</code>,{" "}
            <code>state_breakdown(house_dict)</code>,{" "}
            <code>compute_electoral_votes(house_dict)</code>,{" "}
            <code>presidential_winner(president_dict, electoral_votes)</code>
          </li>
          <li>
            Dictionaries are keyed by <code>(year, state)</code>; ignore the
            sentinel/header key <code>("year", "state")</code> when present
          </li>
          <li>
            Validate inputs: if year/state not found, display available options
            (derived from your dictionaries) and re-prompt
          </li>
          <li>
            Compute state majority party from House district winners; handle
            ties consistently and document your choice
          </li>
          <li>
            Electoral votes: districts count + 2 senators;{" "}
            <code>District of Columbia</code> has 3
          </li>
          <li>
            Determine the presidential winner (≥ 270 electoral votes) and print
            a clear summary
          </li>
          <li>
            Print neat tables, e.g.:
            <br />
            <code>
              Year | Candidate | Candidate Party | State | Majority of
              Representatives Elected
            </code>
          </li>
          <li>No external libraries beyond Python’s standard library</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ToggleScreenshotButton
          show={showScreenshots}
          toggle={() => setShowScreenshots(!showScreenshots)}
        />
        <DownloadPDFButton
          fileUrl="/code-playground/CS87A/mod-5/CS87A_FA2020_A05.pdf"
          filename="CS87A_FA2020_A05.pdf"
          label="Download Assignment"
        />
        <RunInPlaygroundButton
          file="CS87A/mod-5/A05.py"
          label="Run in Playground"
        />
        <DownloadAssignmentBundleButton files={files} />
      </div>

      {/* Screenshot Preview */}
      {showScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </div>
  );
};

export default Assignment5;
