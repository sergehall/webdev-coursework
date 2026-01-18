// frontend/src/courses/CS79A/assignments/mod2/tasks/Week2Deliverables.tsx

import { useState } from "react";

import {
  DownloadAssignmentBundleButton,
  ToggleScreenshotButton,
} from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";

type DeliverableItem = {
  title: string;
  meta?: string;
  downloadable?: boolean;
};

export default function Week2Deliverables() {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const files = [
    {
      fileUrl: "/code-playground/CS79A/mod-2/EC2_Windows_Instance.png",
      filename: "EC2_Windows_Instance.png",
    },
    {
      fileUrl: "/code-playground/CS79A/mod-2/Task0_Launch_Success.png",
      filename: "Task0_Launch_Success.png",
    },
  ];

  const screenshots = [
    {
      src: "/code-playground/CS79A/mod-2/EC2_Windows_Instance.png",
      label: "EC2 Windows Instance screenshot (example output)",
    },
    {
      src: "/code-playground/CS79A/mod-2/Task0_Launch_Success.png",
      label: "Learner Lab Task 0 – Launch success screenshot (example output)",
    },
  ];

  const items: DeliverableItem[] = [
    {
      title: "Discussion Board: Week 2",
      meta: "Due Nov 9, 2025 • 6 pts",
    },
    {
      title: "Assignment 2: Short Case Studies",
      meta: "Due Nov 9, 2025 • (see Canvas)",
    },
    {
      title: "Assignment 2b: Windows Server Navigation",
      meta: "Due Nov 9, 2025 • (see Canvas)",
    },
    {
      title: "Discussion Board: Week 2b",
      meta: "Due Nov 9, 2025 • (see Canvas)",
    },
    {
      title: "Lab 2: Launching EC2 Windows Instance",
      meta: "Due Nov 9, 2025 • 15 pts",
      downloadable: true,
    },
    {
      title: "Lab 2b: Connecting to an EC2 Windows Instance",
      meta: "Due Nov 9, 2025 • 15 pts",
      downloadable: true,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Week 2 – Discussion & Labs</h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        Complete the Week 2 discussion(s), assignments, and EC2 Windows labs.
        Deliverables follow strict due dates and are required to stay on track
        for the course.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Week 2 Deliverables
        </h3>

        {/* Dedicated due-date block */}
        <div className="mb-4 rounded-md border border-emerald-500 bg-emerald-900/30 p-4">
          <p className="text-lg font-semibold text-emerald-100">
            Due Date — Week 2
          </p>
          <p className="mt-1 text-sm text-emerald-200">
            All Week 2 items are due by <strong>Nov 9, 2025 (11:59 PM)</strong>.
            Labs and discussions are required.
          </p>
        </div>

        {/* Deliverables list */}
        <ul className="m-0 list-none space-y-1 p-0 text-sm text-gray-700 dark:text-gray-300">
          {items.map((item) => (
            <li key={item.title} className="flex items-start gap-2">
              <span className="mt-[2px] inline-flex w-5 shrink-0 items-center justify-center">
                {item.downloadable ? "📘" : "•"}
              </span>
              <div>
                <div>{item.title}</div>
                {item.meta ? (
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {item.meta}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="mt-5">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Files & Screenshots
          </p>

          <div className="mt-2 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
            <DownloadAssignmentBundleButton files={files} />
            <ToggleScreenshotButton
              show={showScreenshots}
              toggle={() => setShowScreenshots((prev) => !prev)}
            />
          </div>

          {showScreenshots ? (
            <div className="mt-4">
              <ScreenshotGallery screenshots={screenshots} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
