import { useState } from "react";

import {
  ToggleModalButton,
  DownloadAssignmentBundleButton,
  DownloadHtmlButton,
  CloseModalButton,
} from "@/components/buttons";

const Assignment2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const files = [
    {
      fileUrl: "/sandbox/CS80/mod-2/assignment2.html",
      filename: "assignment2.html",
    },
    {
      fileUrl: "/sandbox/CS80/mod-2/mod-2-scripts.js",
      filename: "mod-2-scripts.js",
    },
    {
      fileUrl: "/sandbox/CS80/mod-2/mod-2-preview.html",
      filename: "mod-2-preview.html",
    },
    {
      fileUrl: "/sandbox/CS80/mod-2/mod-2-modal-tasks.css",
      filename: "mod-2-modal-tasks.css",
    },
    {
      fileUrl: "/sandbox/CS80/mod-2/mod-2-preview-btn.css",
      filename: "mod-2-preview-btn.css",
    },
    {
      fileUrl: "/sandbox/CS80/mod-2/assignment-header-readme-block.css",
      filename: "assignment-header-readme-block.css",
    },
    {
      fileUrl: "/sandbox/CS80/mod-2/mod2-readme.html",
      filename: "mod2-readme.html",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Task prompt */}
      <div className="space-y-2 rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-3 text-[0.95rem] font-medium text-yellow-800 dark:border-gray-600 dark:bg-gray-500/40 dark:text-gray-100">
        <p>
          <strong>Task:</strong> Build an HTML + CSS page that demonstrates core
          styling and layout techniques covered in CS 80. Your assignment
          includes the following tasks:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>4.3</strong> Make all text 1.5× larger than the base font
            and color it red.
          </li>
          <li>
            <strong>4.4</strong> Place a background image halfway down the page,
            tile it horizontally, and keep it fixed while scrolling.
          </li>
          <li>
            <strong>4.5</strong> Style all <code>h1</code> and <code>h2</code>{" "}
            with 0.5em padding, dashed border, and 0.5em margin.
          </li>
          <li>
            <strong>4.6</strong> For elements with class{" "}
            <code>"greenMove"</code>, color them green and shift 25px down and
            15px right.
          </li>
          <li>
            <strong>5.3</strong> Add text shadow to “New features in CSS3”:
            offset (2px, 5px), blur 6px, color deepskyblue.
          </li>
          <li>
            <strong>5.5</strong> Create 3 <code>div</code>s (100×100px) with{" "}
            <code>border-radius</code> values 10px, 50px, 100px, black border,
            custom background colors, and display radius value in bold inside
            each.
          </li>
        </ul>
        <p>
          <strong>Note:</strong>{" "}
          <span className="text-[0.85rem] italic">
            If you use the <em>Download All Files</em> button, you’ll get the
            full version of the project, which includes enhanced features such
            as JavaScript <code>fetch()</code> calls to dynamically load content
            (e.g., <code>mod2-readme.html</code> and{" "}
            <code>mod-2-preview.html</code>). To ensure everything works
            correctly, run the page on a local server using{" "}
            <code>npx serve .</code> or the <em>Live Server</em> extension in VS
            Code. Opening the files directly as <code>file://</code> may prevent
            some content from loading.
            <br />
            If you're downloading the <em>Strict HTML</em> version, it contains
            only the solution as required by the assignment instructions — no
            additional functionality or supporting files are needed.
          </span>
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ToggleModalButton
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen(!isModalOpen)}
          label={"Preview Homework"}
        />
        <DownloadAssignmentBundleButton files={files} />
        <DownloadHtmlButton
          fileUrl="/sandbox/CS80/mod-2/assignment2_strict.html"
          filename="assignment2_strict.html"
          label="Strict HTML"
        />
      </div>

      {/* Modal with iframe preview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative h-[90vh] w-[95%] max-w-6xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-900">
            <CloseModalButton onClick={() => setIsModalOpen(false)} />

            <iframe
              src="/sandbox/CS80/mod-2/assignment2.html"
              className="h-full w-full border-none"
              title="Assignment 2 Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignment2;
