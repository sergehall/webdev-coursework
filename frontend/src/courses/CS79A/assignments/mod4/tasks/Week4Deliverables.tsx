// frontend/src/courses/CS79A/assignments/mod4/tasks/Week4Deliverables.tsx

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

export default function Week4Deliverables() {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const files = [
    {
      fileUrl: "/code-playground/CS79A/mod-4/S3-Buckets-Bootstrap.png",
      filename: "S3-Buckets-Bootstrap.png",
    },
    {
      fileUrl: "/code-playground/CS79A/mod-4/FTP-Server-Lab.png",
      filename: "FTP-Server-Lab.png",
    },
    {
      fileUrl: "/code-playground/CS79A/mod-4/Screenshot2.png",
      filename: "Screenshot2.png",
    },
    {
      fileUrl: "/code-playground/CS79A/mod-4/Screenshot3.png",
      filename: "Screenshot3.png",
    },
    {
      fileUrl: "/code-playground/CS79A/mod-4/Screenshot4.png",
      filename: "Screenshot4.png",
    },
  ];

  const screenshots = [
    {
      src: "/code-playground/CS79A/mod-4/S3-Buckets-Bootstrap.png",
      label: "S3 bucket hosting a Bootstrap website (example screenshot)",
    },
    {
      src: "/code-playground/CS79A/mod-4/FTP-Server-Lab.png",
      label: "FTP Server configured and accessible (example screenshot)",
    },
    {
      src: "/code-playground/CS79A/mod-4/Screenshot2.png",
      label: "FTP Server configured and accessible (example screenshot)",
    },
    {
      src: "/code-playground/CS79A/mod-4/Screenshot3.png",
      label: "FTP Server configured and accessible (example screenshot)",
    },
    {
      src: "/code-playground/CS79A/mod-4/Screenshot4.png",
      label: "FTP Server configured and accessible (example screenshot)",
    },
  ];

  const items: DeliverableItem[] = [
    {
      title: "Discussion Board: Week 4",
      meta: "Due Nov 23, 2025 • 6 pts",
    },
    {
      title: "Assignment 4: S3 Buckets w/ Bootstrap",
      meta: "Due Nov 23, 2025 • 20 pts",
    },
    {
      title: "Lab 4: FTP Server",
      meta: "Due Nov 23, 2025 • 20 pts",
      downloadable: true,
    },
    {
      title: "Midterm Exam",
      meta: "Due Nov 23, 2025 • 60 pts",
    },
    {
      title: "Extra Credit: Workshop/Event Attendance",
      meta: "Due Nov 23, 2025 • 0 pts",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Week 4 – Discussion, Assignment, Lab & Midterm
      </h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        Week 4 continues AWS infrastructure concepts and includes your S3 +
        server deliverables, along with the <strong>Midterm Exam</strong>. Make
        sure you complete all required items by the due date.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Week 4 Deliverables
        </h3>

        {/* Due date block */}
        <div className="mb-4 rounded-md border border-rose-500 bg-rose-900/30 p-4">
          <p className="text-lg font-semibold text-rose-100">
            📅 Due Date — Week 4
          </p>
          <p className="mt-1 text-sm text-rose-200">
            All Week 4 items are due by <strong>Nov 23, 2025 (11:59 PM)</strong>
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
