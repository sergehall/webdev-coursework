// frontend/src/assignments/mod7/tasks/Assignment7A.tsx

import { useState } from "react";

import ShowModalButton from "../../../../../components/buttons/ShowModalButton";

import {
  ToggleModalButton,
  DownloadAssignmentBundleButton,
  DownloadHtmlButton,
} from "@/components/buttons";

const Assignment7A = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const files = [
    {
      fileUrl: "/code-playground/CS81/mod-7/A/loadingAnimation.html",
      filename: "loadingAnimation.html",
    },
    {
      fileUrl: "/code-playground/CS81/mod-7/A/REFLECTION.md",
      filename: "REFLECTION.md",
    },
    {
      fileUrl: "/code-playground/CS81/mod-7/A/background.mp3",
      filename: "background.mp3",
    },
  ];

  const file = [
    {
      fileUrl: "/code-playground/CS81/mod-7/A/loadingAnimation.html",
      filename: "loadingAnimation.html",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Task description */}
      <div className="space-y-2 rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-3 text-[0.95rem] font-medium text-yellow-800 dark:border-gray-600 dark:bg-gray-500/40 dark:text-gray-100">
        <p>
          <strong>Module 7A – Loading Animation:</strong> Use{" "}
          <code>setInterval</code> and <code>clearInterval</code> to animate
          emoji loading, and update the DOM with status and visual effects.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Add at least 10 code comments explaining the logic</li>
          <li>
            Use DOM manipulation via <code>getElementById()</code>
          </li>
          <li>
            Include one creative element (background music, style, or emojis)
          </li>
          <li>
            Stop the loop cleanly using <code>clearInterval()</code>
          </li>
        </ul>
        <p>
          <strong>Music Credit:</strong>{" "}
          <a
            href="https://pixabay.com/music/ambient-vapor-334863/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Maksym Malko – “Vapor” on Pixabay
          </a>
        </p>
      </div>
      {/* Action buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ToggleModalButton
          isOpen={isModalOpen}
          label={"Preview Homework"}
          toggle={() => setIsModalOpen(!isModalOpen)}
        />
        <DownloadAssignmentBundleButton files={files} />
        <DownloadHtmlButton
          fileUrl="/code-playground/CS81/mod-7/A/loadingAnimation.html"
          filename="loadingAnimation.html"
          label="Download HTML"
        />
      </div>
      {/* Modal preview window */}
      <ShowModalButton
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        files={file}
      />
    </div>
  );
};

export default Assignment7A;
