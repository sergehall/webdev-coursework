import { useState } from "react";

import ScreenshotGallery from "@/components/ScreenshotGallery";
import {
  RunInPlaygroundButton,
  ToggleScreenshotButton,
  DownloadPDFButton,
  ExternalLinkButton,
} from "@/components/buttons";

const Assignment5 = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const screenshots = [
    {
      label: "Screenshot-assignment5 – President vs House Winners",
      src: "/code-playground/CS87A/mod-5/screenshot-assignment5.png",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        US Election Data Analysis: President Candidate vs House Member Winners
      </h2>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Practice Python file I/O, dictionaries with tuple keys, nested
          dictionaries, and data aggregation. You will process US election data
          from <code>house.tab</code> and <code>president.tab</code>
          to determine majority parties per state, compute electoral votes, and
          identify presidential winners by electoral count.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Project Description
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Implement the following functions:
        </p>
        <ul className="list-inside list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <code>process_president_data(ifs)</code> — returns a dictionary
            keyed by
            <code>(year, state)</code> with values:{" "}
            <code>[winner_name, party, votes, total_votes]</code>.
          </li>
          <li>
            <code>process_house_data(ifs)</code> — returns a dictionary keyed by
            <code>(year, state)</code> with values:{" "}
            <code>{"{district: [winner_name, party, votes]}"}</code>.
          </li>
          <li>
            <code>state_breakdown(house_dict)</code> — counts House winners by
            party per state/year.
          </li>
          <li>
            <code>compute_electoral_votes(house_dict)</code> — calculates state
            electoral votes (district count + 2 senators; DC = 3).
          </li>
          <li>
            <code>presidential_winner(president_dict, electoral_votes)</code> —
            totals electoral votes per winning party each year.
          </li>
        </ul>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Create an interactive loop that prompts for an election year (and
          optionally a state), validates inputs, and displays a formatted table
          showing states where the presidential winner’s party differed from the
          majority of House winners. End the loop when the user enters{" "}
          <code>quit</code>.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Key Requirements
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Submit <code>A05.py</code> with proper header comments (name, ID,
            date, description).
          </li>
          <li>
            Ignore proportional elector allocation — award all state electors to
            the candidate with most votes.
          </li>
          <li>Handle District of Columbia as awarding 3 votes to Democrats.</li>
          <li>
            Ensure input validation and clear, neatly formatted output tables.
          </li>
          <li>Code must run in IDLE on Windows, no external libraries.</li>
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

export default Assignment5;
