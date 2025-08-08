// frontend/src/courses/CS87A/assignments/mod4/tasks/Assignment4.tsx
import { useState } from "react";

import ScreenshotGallery from "@/components/ScreenshotGallery";
import {
  RunInPlaygroundButton,
  ToggleScreenshotButton,
  DownloadPDFButton,
  ExternalLinkButton,
} from "@/components/buttons";

const Assignment4 = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const screenshots = [
    {
      label: "Screenshot-assignment4 – More Fun With Functions & Lists",
      src: "/code-playground/CS87A/mod-4/screenshot-assignment4.png",
    },
    {
      label: "Screenshot-assignment4 – More Fun With Functions & Lists",
      src: "/code-playground/CS87A/mod-4/screenshot-assignment4-1.png",
    },
    {
      label: "Screenshot-assignment4 – More Fun With Functions & Lists",
      src: "/code-playground/CS87A/mod-4/screenshot-assignment4-2.png",
    },
    {
      label: "Screenshot-assignment4 – More Fun With Functions & Lists",
      src: "/code-playground/CS87A/mod-4/screenshot-assignment4-3.png",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        More Fun With Functions & Python Lists
      </h2>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Use the <code>def</code> keyword to write functions that operate on
          <strong> 1D and 2D lists</strong> (vectors and matrices). Implement
          and test functions that return values without mutating their inputs.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Project Description
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Create three functions:
        </p>
        <ul className="list-inside list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>Dot product</strong> of two same-length 1D lists (vectors) —
            return a single scalar value; do not modify the original vectors.
          </li>
          <li>
            <strong>Transpose</strong> of a 2D list (matrix) — return a new 2D
            list whose rows/columns are swapped; the input matrix need not be
            square and must not be mutated.
          </li>
          <li>
            <strong>Scalar multiplication</strong> of a 2D list (matrix) — given
            a scalar <code>v</code> and matrix <code>A</code>, return a new
            matrix where each element is multiplied by <code>v</code>; do not
            modify inputs.
          </li>
        </ul>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Follow the example usages provided in the handout to verify
          correctness (e.g., <code>dot([1,2,3],[4,5,6]) → 32</code>, transposing
          non-square matrices, and scaling matrices by a constant).
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Key Requirements
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Submit <strong>one</strong> Python file named <code>A04.py</code>.
            Include header comments (name, student ID, assignment number,
            submission date, brief program description).
          </li>
          <li>
            The functions must <strong>return</strong> results and{" "}
            <strong>must not</strong> mutate their input lists/matrices.
          </li>
          <li>
            Ensure the program runs in <strong>IDLE on Windows</strong>.
          </li>
          <li>
            Submit via Canvas by uploading your <code>.py</code> file to the
            Assignment 4 entry. <em>No</em> screenshots, transcripts, pasted
            output, or saved interpreter sessions.
          </li>
          <li>No external libraries beyond the Python standard library.</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ToggleScreenshotButton
          show={showScreenshots}
          toggle={() => setShowScreenshots(!showScreenshots)}
        />
        <DownloadPDFButton
          fileUrl="/code-playground/CS87A/mod-4/CS87A_FA2020_A04.pdf"
          filename="CS87A_FA2020_A04.pdf"
          label="Download Assignment"
        />
        <RunInPlaygroundButton
          file="CS87A/mod-4/A04.py"
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

export default Assignment4;
