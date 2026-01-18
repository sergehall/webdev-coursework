// frontend/src/courses/CS79A/assignments/mod3/tasks/Week3bDeliverables.tsx

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

export default function Week3bDeliverables() {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const files = [
    {
      fileUrl: "/code-playground/CS79A/mod-3/S3-Static-Website-Lab.png",
      filename: "S3-Static-Website-Lab.png",
    },
    {
      fileUrl: "/code-playground/CS79A/mod-3/S3-Website-Troubleshooting.png",
      filename: "S3-Website-Troubleshooting.png",
    },
  ];

  const screenshots = [
    {
      src: "/code-playground/CS79A/mod-3/S3-Static-Website-Lab.png",
      label: "S3 bucket configured for static website hosting",
    },
    {
      src: "/code-playground/CS79A/mod-3/S3-Website-Troubleshooting.png",
      label: "Static website successfully loading from the S3 website endpoint",
    },
  ];

  const items: DeliverableItem[] = [
    {
      title: "Discussion Board: Week 3b",
      meta: "Due Nov 16, 2025 • 6 pts",
    },
    {
      title: "Lab 3b: S3 Static Website",
      meta: "Due Nov 16, 2025 • 20 pts",
      downloadable: true,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Week 3b – Discussion & Lab</h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        In Week 3b, you’ll host a <strong>static website</strong> using{" "}
        <strong>Amazon S3</strong>. Configure buckets, upload content, enable
        logging, and verify the website loads from the S3 website endpoint.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Week 3b Deliverables
        </h3>

        {/* Due date block */}
        <div className="mb-4 rounded-md border border-sky-500 bg-sky-900/30 p-4">
          <p className="text-lg font-semibold text-sky-100">
            📅 Due Date — Week 3b
          </p>
          <p className="mt-1 text-sm text-sky-200">
            All Week 3b items are due by{" "}
            <strong>Nov 16, 2025 (11:59 PM)</strong>.
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
