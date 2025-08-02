// frontend/src/assignments/mod7/tasks/Assignment7B.tsx

import { useState } from "react";

import {
  ToggleModalButton,
  DownloadAssignmentBundleButton,
  ShowModalButton,
} from "@/components/buttons";

const Assignment7B = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const files = [
    {
      fileUrl: "/sandbox/CS81/mod-7/B/dailySimulation.html",
      filename: "dailySimulation.html",
    },
    {
      fileUrl: "/sandbox/CS81/mod-7/B/REFLECTION.md",
      filename: "REFLECTION.md",
    },
  ];

  const file = [
    {
      fileUrl: "/sandbox/CS81/mod-7/B/dailySimulation.html",
      filename: "dailySimulation.html",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Task description */}
      <div className="space-y-2 rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-3 text-[0.95rem] font-medium text-yellow-800 dark:border-gray-600 dark:bg-gray-500/40 dark:text-gray-100">
        <p>
          <strong>Module 7B – Daily Schedule Async Simulator</strong>
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Customize <code>dailySimulation.html</code> using{" "}
            <code>setTimeout</code>
          </li>
          <li>Add 6+ activities with time-based simulation</li>
          <li>Include randomized twist (emoji, mood, delay)</li>
          <li>Style output and background transition from morning to night</li>
          <li>
            Reflect on async code and challenges in <code>REFLECTION.md</code>
          </li>
          <li>
            Minimum 4 commits: structure, simulation, enhancement, reflection
          </li>
        </ul>
        <p>
          <strong>Folder:</strong> <code>frontend/public/sandbox/mod-7/B</code>
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

export default Assignment7B;
