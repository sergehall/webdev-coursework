import { useState } from "react";

import {
  ToggleModalButton,
  DownloadAssignmentBundleButton,
  CloseModalButton,
} from "@/components/buttons";

const Assignment4 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const files = [
    {
      fileUrl: "/code-playground/CS80/mod-4/assignment-mod-4-dom.html",
      filename: "assignment-mod-4-dom.html",
    },
    {
      fileUrl: "/code-playground/CS80/mod-4/fig-12-4.html",
      filename: "fig-12-4.html",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Task description */}
      <div className="space-y-2 rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-3 text-[0.95rem] font-medium text-yellow-800 dark:border-gray-600 dark:bg-gray-500/40 dark:text-gray-100">
        <p>
          <strong>Task 12.4:</strong> Use Chrome Developer Tools to inspect the
          DOM tree of <code>fig-12-4.html</code> and any other website. Explore
          elements, styles, and live DOM updates.
        </p>
        <p>
          <strong>Task 12.5:</strong> Write a script that displays a counter in
          a <code>&lt;div&gt;</code> and increments it when a button is clicked.
        </p>
        <p>
          <strong>Extra:</strong> Implement a stopwatch with Start, Stop, Reset
          and status updates.
        </p>
        <p className="text-[0.85rem] italic">
          * For the modal preview to work, make sure <code>fig-12-4.html</code>{" "}
          is in the same folder as <code>assignment-mod-4-dom.html</code>.
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
      </div>

      {/* Modal preview window */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative h-[90vh] w-[95%] max-w-6xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-900">
            <CloseModalButton onClick={() => setIsModalOpen(false)} />
            <iframe
              src="/code-playground/CS80/mod-4/assignment-mod-4-dom.html"
              className="h-full w-full border-none"
              title="Assignment 4 Preview"
              sandbox="allow-scripts allow-same-origin allow-modals"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignment4;
