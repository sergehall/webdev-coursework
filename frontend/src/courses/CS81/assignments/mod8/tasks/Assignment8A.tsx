// frontend/src/assignments/mod8/tasks/Assignment8A.tsx
import { useState } from "react";

import {
  ToggleModalButton,
  DownloadAssignmentBundleButton,
  ShowModalButton,
} from "@/components/buttons";

const Assignment8A = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const files = [
    {
      fileUrl: "/sandbox/CS81/mod-8/A/cookieClicker.html",
      filename: "cookieClicker.html",
    },
    {
      fileUrl: "/sandbox/CS81/mod-8/A/REFLECTION.md",
      filename: "REFLECTION.md",
    },
    {
      fileUrl: "/sandbox/CS81/mod-8/A/README.md",
      filename: "README.md",
    },
  ];

  const file = [
    {
      fileUrl: "/sandbox/CS81/mod-8/A/cookieClicker.html",
      filename: "cookieClicker.html",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Task description */}
      <div className="space-y-2 rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-3 text-[0.95rem] font-medium text-yellow-800 dark:border-gray-600 dark:bg-gray-500/40 dark:text-gray-100">
        <p>
          <strong>Module 8A – Cookie Clicker Tracker</strong>
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Create <code>cookieClicker.html</code> with a clickable cookie
            button
          </li>
          <li>
            Track click count and show messages at 10, 25, 50, and 100 clicks
          </li>
          <li>Add a creative twist: emoji, theme, or background change</li>
          <li>
            Bonus: includes Weird HEX Clicker with colored counter and jokes
          </li>
          <li>
            Answer all prompts in <code>REFLECTION.md</code>
          </li>
          <li>Minimum 4 commits: HTML, JS, creativity, reflection</li>
        </ul>
        <p>
          <strong>Folder:</strong> <code>frontend/public/sandbox/mod-8/A</code>
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
      </div>

      {/* Modal preview */}
      <ShowModalButton
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        files={file}
      />
    </div>
  );
};

export default Assignment8A;
