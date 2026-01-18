// frontend/src/courses/CS79A/assignments/mod3/tasks/Week3Deliverables.tsx

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

export default function Week3Deliverables() {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const files = [
    {
      fileUrl: "code-playground/CS79A/mod-3/Screenshot11.png",
      filename: "Screenshot11.png",
    },
    {
      fileUrl: "code-playground/CS79A/mod-3/FTP-Server-Lab.png",
      filename: "FTP-Server-Lab.png",
    },
    {
      fileUrl: "code-playground/CS79A/mod-3/Screenshot2.png",
      filename: "Screenshot2.png",
    },
    {
      fileUrl: "code-playground/CS79A/mod-3/Screenshot3.png",
      filename: "Screenshot3.png",
    },
  ];

  const screenshots = [
    {
      src: "/code-playground/CS79A/mod-3/Screenshot11.png",
      label: "Ubuntu EC2 instance running in AWS Console",
    },
    {
      src: "/code-playground/CS79A/mod-3/FTP-Server-Lab.png",
      label: "Ubuntu EC2 instance running in AWS Console",
    },
    {
      src: "/code-playground/CS79A/mod-3/Screenshot2.png",
      label: "Successful SSH connection to Ubuntu server via terminal",
    },
    {
      src: "/code-playground/CS79A/mod-3/Screenshot3.png",
      label: "Successful SSH connection to Ubuntu server via terminal",
    },
  ];

  const items: DeliverableItem[] = [
    {
      title: "Discussion Board: Week 3",
      meta: "Due Nov 16, 2025 • 6 pts",
    },
    {
      title: "Assignment 3: Launching and connecting to Ubuntu Linux",
      meta: "Due Nov 16, 2025 • 20 pts",
    },
    {
      title: "Lab 3: Navigating Ubuntu Linux",
      meta: "Due Nov 16, 2025 • 25 pts",
      downloadable: true,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Week 3 – Discussion, Assignment & Lab
      </h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        This week focuses on working with <strong>Ubuntu Linux</strong> in AWS.
        You will launch an EC2 Ubuntu instance, connect using SSH, and practice
        navigating the Linux file system and command line.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Week 3 Deliverables
        </h3>

        {/* ✅ Due date block */}
        <div className="mb-4 rounded-md border border-purple-500 bg-purple-900/30 p-4">
          <p className="text-lg font-semibold text-purple-100">
            📅 Due Date — Week 3
          </p>
          <p className="mt-1 text-sm text-purple-200">
            All Week 3 items are due by <strong>Nov 16, 2025 (11:59 PM)</strong>
            .
          </p>
        </div>

        {/* 📄 Deliverables list */}
        <ul className="m-0 list-none space-y-1 p-0 text-sm text-gray-700 dark:text-gray-300">
          {items.map((item) => (
            <li key={item.title} className="flex items-start gap-2">
              <span className="mt-[2px] inline-flex w-5 shrink-0 items-center justify-center">
                {item.downloadable ? "📘" : "•"}
              </span>
              <div>
                <div>{item.title}</div>
                {item.meta && (
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {item.meta}
                  </div>
                )}
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
