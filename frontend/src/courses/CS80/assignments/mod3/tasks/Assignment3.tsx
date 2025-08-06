import { useState } from "react";

import {
  ToggleModalButton,
  DownloadAssignmentBundleButton,
  DownloadHtmlButton,
  CloseModalButton,
} from "@/components/buttons";

const Assignment3 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const files = [
    {
      fileUrl: "/code-playground/CS80/mod-3/assignment3.html",
      filename: "assignment3.html",
    },
    {
      fileUrl: "/code-playground/CS80/mod-3/assignment3.js",
      filename: "assignment3.js",
    },
    {
      fileUrl: "/code-playground/CS80/mod-3/testAssignment3.js",
      filename: "testAssignment3.js",
    },
    {
      fileUrl: "/code-playground/CS80/mod-3/Assignment_Submission_Info.txt",
      filename: "Assignment_Submission_Info.txt",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Task description */}
      <div className="space-y-2 rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-3 text-[0.95rem] font-medium text-yellow-800 dark:border-gray-600 dark:bg-gray-500/40 dark:text-gray-100">
        <p>
          <strong>Tasks 6.17 – 8.7:</strong> JavaScript Practice — prompt,
          alert, conditionals, loops, output.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>6.17:</strong> Compare two integers and display the larger
            in an <code>alert()</code>. If equal, output HTML5 text saying
            “These numbers are equal.”
          </li>
          <li>
            <strong>6.18:</strong> Accept 3 integers and calculate sum, average,
            product, smallest, and largest values.
          </li>
          <li>
            <strong>7.12:</strong> Prompt for account info and calculate if the
            credit limit was exceeded. Display appropriate message in HTML5.
          </li>
          <li>
            <strong>8.7:</strong> Calculate and display the product of odd
            numbers from 1 to 15.
          </li>
        </ul>
        <p>
          <strong>Testing:</strong>{" "}
          <span className="text-[0.85rem] italic">
            Each script includes corresponding test cases. Use the provided test
            buttons in the UI to validate your implementation. To view browser
            errors, use <kbd>F12</kbd> or <code>console.log()</code>.
          </span>
        </p>
      </div>

      {/* Action buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ToggleModalButton
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen(!isModalOpen)}
          label={"Preview Homework"}
        />
        <DownloadAssignmentBundleButton files={files} />
        <DownloadHtmlButton
          fileUrl="/code-playground/CS80/mod-3/assignment3_strict.html"
          filename="assignment3_strict.html"
          label="Strict HTML"
        />
      </div>

      {/* Modal preview window */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative h-[90vh] w-[95%] max-w-6xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-900">
            <CloseModalButton onClick={() => setIsModalOpen(false)} />
            <iframe
              src="/code-playground/CS80/mod-3/assignment3.html"
              className="h-full w-full border-none"
              title="Assignment 3 Preview"
              sandbox="allow-scripts allow-same-origin allow-modals"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignment3;
