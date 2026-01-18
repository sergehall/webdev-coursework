// frontend/src/courses/CS79A/assignments/mod5/tasks/Week5Deliverables.tsx

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

export default function Week5Deliverables() {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const files = [
    {
      fileUrl: "/code-playground/CS79A/mod-5/AWS-Console-Setup.png",
      filename: "AWS-Console-Setup.png",
    },
    {
      fileUrl: "/code-playground/CS79A/mod-5/IAM-User-Setup.png",
      filename: "IAM-User-Setup.png",
    },
  ];

  const screenshots = [
    {
      src: "/code-playground/CS79A/mod-5/AWS-Console-Setup.png",
      label: "AWS Management Console dashboard after initial setup",
    },
    {
      src: "/code-playground/CS79A/mod-5/IAM-User-Setup.png",
      label: "IAM user successfully created and configured",
    },
  ];

  const items: DeliverableItem[] = [
    {
      title: "Discussion Board: Week 5",
      meta: "Due Nov 30, 2025 • 6 pts",
    },
    {
      title: "Assignment 5: Setup your live AWS Management Console",
      meta: "Due Nov 30, 2025 • 15 pts",
      downloadable: true,
    },
    {
      title: "Assignment 5b: IAM",
      meta: "Due Nov 30, 2025 • 20 pts",
      downloadable: true,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Week 5 – Discussion & Assignments</h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        Week 5 focuses on securing your AWS environment using{" "}
        <strong>IAM</strong> and configuring your live AWS Management Console.
        Proper user setup and permission management are critical skills for any
        cloud professional.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Week 5 Deliverables
        </h3>

        {/* Due date block */}
        <div className="mb-4 rounded-md border border-red-500 bg-red-900/30 p-4">
          <p className="text-lg font-semibold text-red-100">
            📅 Due Date — Week 5
          </p>
          <p className="mt-1 text-sm text-red-200">
            All Week 5 items are due by <strong>Nov 30, 2025 (11:59 PM)</strong>
            .
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

          {showScreenshots && (
            <div className="mt-4">
              <ScreenshotGallery screenshots={screenshots} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
