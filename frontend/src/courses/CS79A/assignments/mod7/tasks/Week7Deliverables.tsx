// frontend/src/courses/CS79A/assignments/mod7/tasks/Week7Deliverables.tsx

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

export default function Week7Deliverables() {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const files = [
    {
      fileUrl: "/code-playground/CS79A/mod-7/AWS-Educate-Guide.png",
      filename: "AWS-Educate-Guide.png",
    },
    {
      fileUrl: "/code-playground/CS79A/mod-7/OpenVPN-Lab-Instructions.png",
      filename: "OpenVPN-Lab-Instructions.png",
    },
  ];

  const screenshots = [
    {
      src: "/code-playground/CS79A/mod-7/AWS-Educate-Guide.png",
      label: "AWS Educate dashboard showing active enrollment and resources",
    },
    {
      src: "/code-playground/CS79A/mod-7/OpenVPN-Lab-Instructions.png",
      label: "OpenVPN client successfully connected to the AWS environment",
    },
  ];

  const items: DeliverableItem[] = [
    {
      title: "Discussion Board: Week 7",
      meta: "Due Dec 14, 2025 • 10 pts",
    },
    {
      title: "Assignment 7: AWS Educate",
      meta: "Due Dec 14, 2025 • 10 pts",
      downloadable: true,
    },
    {
      title: "Lab 7: OpenVPN",
      meta: "Due Dec 14, 2025 • 20 pts",
      downloadable: true,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Week 7 – Discussion, Assignment & Lab
      </h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        Week 7 focuses on career readiness through <strong>AWS Educate</strong>{" "}
        and secure connectivity using <strong>OpenVPN</strong>. These activities
        help reinforce professional cloud practices and real-world access
        control concepts.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Week 7 Deliverables
        </h3>

        {/* Due date block */}
        <div className="mb-4 rounded-md border border-cyan-500 bg-cyan-900/30 p-4">
          <p className="text-lg font-semibold text-cyan-100">
            📅 Due Date — Week 7
          </p>
          <p className="mt-1 text-sm text-cyan-200">
            All Week 7 items are due by <strong>Dec 14, 2025 (11:59 PM)</strong>
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
