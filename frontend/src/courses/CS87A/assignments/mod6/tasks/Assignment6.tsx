// frontend/src/courses/CS87A/assignments/mod6/tasks/Assignment6.tsx
import { useState } from "react";

import ScreenshotGallery from "@/components/ScreenshotGallery";
import {
  RunInPlaygroundButton,
  ToggleScreenshotButton,
  DownloadPDFButton,
  ExternalLinkButton,
} from "@/components/buttons";

const Assignment6 = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const screenshots = [
    {
      label: "Screenshot-assignment6 – Tkinter Pie Chart (PLUI)",
      src: "/code-playground/CS87A/mod-6/screenshot-assignment6.png",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Visualization & UI for Data Analysis (Tkinter Pie Chart)
      </h2>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Create a <strong>Plot UI (PLUI)</strong> class in Tkinter that draws a
          <strong> pie chart</strong> of presidential popular vote percentages
          for a selected <em>state</em> and <em>year</em>. Practice class
          design, Canvas drawing with <code>create_arc()</code>, computing
          angles from percentages, and simple event/loop interaction in Python.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Project Description
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Implement (or reuse the provided) <code>ElectionData</code> class that
          loads binary data with <code>pickle</code> from{" "}
          <code>president_dictionary.dat</code>,{" "}
          <code>house_dictionary.dat</code>, and{" "}
          <code>electoral_results.dat</code>. Build a <code>PLUI</code> class
          with methods such as <code>__init__</code>, <code>set_state()</code>,{" "}
          <code>set_election_year()</code>, and <code>draw_piechart()</code>.
          The pie chart has exactly two slices: (1) the{" "}
          <strong>winner’s</strong> percentage of the popular vote in the chosen
          state/year and (2) the <strong>other candidates’</strong> combined
          percentage. Color the winner’s slice <strong>red</strong> for
          Republican, <strong>blue</strong> for Democrat, and color the “other”
          slice <strong>green</strong>. Compute slice start/end angles from
          percentages (sum to 360°) and render on a Tkinter <code>Canvas</code>.
        </p>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Provide a simple input loop that asks for a capitalized{" "}
          <strong>state</strong> and an election{" "}
          <strong>year (1976–2016)</strong>, opens a window with the pie chart,
          then—after the figure window is closed—prompts whether to draw another
          chart (<code>yes/no</code>).
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Key Requirements
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Submit a single file <code>A06.py</code> with header comments (name,
            student ID, assignment number, submission date, short description).
          </li>
          <li>
            <code>ElectionData</code> loads the three <code>.dat</code> files
            via <code>pickle</code>; <code>PLUI</code> uses these data.
          </li>
          <li>
            Draw the pie using <code>Canvas.create_arc()</code>; compute angles
            from percentages (e.g., <code>pct * 360</code>).
          </li>
          <li>
            Slice colors: winner = <strong>red</strong> (Republican) or{" "}
            <strong>blue</strong> (Democrat); other candidates ={" "}
            <strong>green</strong>.
          </li>
          <li>
            Console loop: prompt for state and year (1976–2016), render the
            chart; after window closes, ask to continue (<code>yes/no</code>).
          </li>
          <li>
            Optional: add a title and labels with <code>create_text()</code> and
            leader lines with <code>create_line()</code>.
          </li>
          <li>Runs in IDLE on Windows; no external GUI/plotting libraries.</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ToggleScreenshotButton
          show={showScreenshots}
          toggle={() => setShowScreenshots(!showScreenshots)}
        />
        <DownloadPDFButton
          fileUrl="/code-playground/CS87A/mod-6/CS87A_FA2020_A06.pdf"
          filename="CS87A_FA2020_A06.pdf"
          label="Download Assignment"
        />
        <RunInPlaygroundButton
          file="CS87A/mod-6/A06.py"
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

export default Assignment6;
