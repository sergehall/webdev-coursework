// frontend/src/courses/CS87A/assignments/mod4/tasks/Assignment4.tsx
import { useState } from "react";

import ScreenshotGallery from "@/components/ScreenshotGallery";
import {
  DownloadAssignmentBundleButton,
  RunInPlaygroundButton,
  ToggleScreenshotButton,
  DownloadPDFButton,
} from "@/components/buttons";

const Assignment4 = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const screenshots = [
    {
      label: "Screenshot-assignment4 – More Fun With Functions & Lists",
      src: "/code-playground/CS87A/mod-4/screenshot-assignment4.png",
    },
  ];

  const files = [
    {
      fileUrl: "/code-playground/CS87A/mod-4/CS87A_FA2020_A04.pdf",
      filename: "CS87A_FA2020_A04.pdf",
    },
    {
      fileUrl: "/code-playground/CS87A/mod-4/A04.py",
      filename: "A04.py",
    },
    {
      fileUrl: "/code-playground/CS87A/mod-4/screenshot-assignment4.png",
      filename: "screenshot-assignment4.png",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Assignment 4 – More Fun With Functions & Python Lists
      </h2>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Reinforce function design and list manipulation in Python by building
          three small programs: (1) dot product of two vectors, (2) transpose of
          a matrix (2D list), and (3) scalar multiplication of a matrix.
          Practice menu-driven interaction, input validation, and random data
          generation.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Project Description
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Implement a console application that presents a menu to run one of
          three programs or to demo all of them with randomly generated data.
          For programs 1–3, allow the user to choose between manual data entry (
          <code>'m'</code>) or automatic/random generation. Use clear printing
          of lists/matrices after each operation, and offer a way to exit the
          application. The demo option should run all three programs with random
          values in sequence.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Key Requirements
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Add header comments (name, date, assignment title) in{" "}
            <code>A04.py</code>
          </li>
          <li>
            Menu: enter <code>1</code> for Dot Product, <code>2</code> for
            Transpose, <code>3</code> for Scalar Multiplication, <code>4</code>{" "}
            to run all with random values, and <code>exit</code> to quit
          </li>
          <li>
            For options 1–3, prompt for <strong>manual</strong> (
            <code>'m'</code>) or <strong>automatic</strong> (any other key) data
            input
          </li>
          <li>
            <strong>Program 1:</strong> compute dot product of two same-length
            numeric vectors (1D lists)
          </li>
          <li>
            <strong>Program 2:</strong> compute transpose of a matrix (2D list)
          </li>
          <li>
            <strong>Program 3:</strong> perform scalar multiplication{" "}
            <code>v * matrix</code> (2D list)
          </li>
          <li>
            Validate user input (sizes, numeric values, menu options) and handle
            errors gracefully
          </li>
          <li>
            For automatic mode, generate sizes/values using reasonable ranges
            (e.g., random rows/cols and integer values)
          </li>
          <li>
            Print inputs and results in a readable format; separate runs with
            clear headings
          </li>
          <li>No external libraries beyond the Python standard library</li>
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
        <DownloadAssignmentBundleButton files={files} />
      </div>

      {/* Screenshot Preview */}
      {showScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </div>
  );
};

export default Assignment4;
