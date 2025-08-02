import { useState } from "react";

import {
  ToggleModalButton,
  DownloadAssignmentBundleButton,
  DownloadHtmlButton,
  CloseModalButton,
} from "@/components/buttons";

const Assignment6 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const files = [
    {
      fileUrl: "/sandbox/CS80/mod-6/ajaxLoad.js",
      filename: "ajaxLoad.js",
    },
    {
      fileUrl: "/sandbox/CS80/mod-6/bonus-assignment.html",
      filename: "bonus-assignment.html",
    },
    {
      fileUrl: "/sandbox/CS80/mod-6/data.json",
      filename: "data.json",
    },
    {
      fileUrl: "/sandbox/CS80/mod-6/description-bonus-assignment.txt",
      filename: "description-bonus-assignment.txt",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Assignment description */}
      <div className="space-y-2 rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-3 text-[0.95rem] font-medium text-yellow-800 dark:border-gray-600 dark:bg-gray-500/40 dark:text-gray-100">
        <p>
          <strong>Assignment – Mod 6:</strong> AJAX and Client/Server
          Interaction
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Problem 1 – 16.3:</strong> Describe the differences between
            client/server interactions in traditional web applications and
            client/server interactions in Ajax web applications.
          </li>
          <li>
            <strong>Problem 2 – AJAX with jQuery:</strong> Modify the existing
            example to use <code>$.ajax()</code> on page load instead of on
            button click.
            <ul className="list-disc pl-5">
              <li>Match the structure from the lecture example.</li>
              <li>
                Use <code>$.ajax()</code> for each previously button-triggered
                call.
              </li>
              <li>Ensure the data loads automatically when the page loads.</li>
            </ul>
          </li>
        </ul>
        <p>
          <strong>Submission:</strong> Submit a text file for Problem 1. For
          Problem 2, submit a <code>.js</code> file or provide a CodeSandbox
          link as described.
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
          fileUrl="/sandbox/CS80/mod-6/bonus-assignment.html"
          filename="bonus-assignment.html"
          label="Download HTML Only"
        />
      </div>

      {/* Modal preview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative h-[90vh] w-[95%] max-w-6xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-900">
            <CloseModalButton onClick={() => setIsModalOpen(false)} />
            <iframe
              src="/sandbox/CS80/mod-6/bonus-assignment.html"
              className="h-full w-full border-none"
              title="Assignment 6 Preview"
              sandbox="allow-scripts allow-same-origin allow-modals"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignment6;
