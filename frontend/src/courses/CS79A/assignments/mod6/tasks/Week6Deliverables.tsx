// frontend/src/courses/CS79A/assignments/mod6/tasks/Week6Deliverables.tsx

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

export default function Week6Deliverables() {
  const [showScreenshots, setShowScreenshots] = useState(false);

  const files = [
    {
      fileUrl: "/code-playground/CS79A/mod-6/wordPress-Launched.png",
      filename: "wordPress-Launched.png",
    },
    {
      fileUrl: "/code-playground/CS79A/mod-6/wordPress-Site.png",
      filename: "wordPress-Site.png",
    },
    {
      fileUrl: "/code-playground/CS79A/mod-6/VPC-Deliverables.png",
      filename: "VPC-Deliverables.png",
    },
    {
      fileUrl:
        "/code-playground/CS79A/mod-6/Extra-Credit-Pinging-Using-ICMP.png",
      filename: "Extra-Credit-Pinging-Using-ICMP.png",
    },
  ];

  const screenshots = [
    {
      src: "/code-playground/CS79A/mod-6/wordPress-Launched.png",
      label: "WordPress site successfully running on an EC2 instance",
    },
    {
      src: "/code-playground/CS79A/mod-6/wordPress-Site.png",
      label: "WordPress site",
    },
    {
      src: "/code-playground/CS79A/mod-6/VPC-Deliverables.png",
      label: "VPC-Deliverables",
    },
    {
      src: "/code-playground/CS79A/mod-6/Extra-Credit-Pinging-Using-ICMP.png",
      label: "Extra-Credit-Pinging-Using-ICMP",
    },
  ];

  const items: DeliverableItem[] = [
    {
      title: "Discussion Board: Week 6",
      meta: "Due Dec 7, 2025 • 12 pts",
    },
    {
      title: "Assignment 6: WordPress Launched",
      meta: "Due Dec 7, 2025 • 15 pts",
      downloadable: true,
    },
    {
      title: "Lab 6: WordPress Site",
      meta: "Due Dec 7, 2025 • 20 pts",
      downloadable: true,
    },
    {
      title: "Create a VPC Deliverables",
      meta: "Due Dec 7, 2025 • 20 pts",
      downloadable: true,
    },
    {
      title: "Extra Credit: Pinging (Using ICMP).",
      meta: "Due Dec 7, 2025 • 20 pts",
      downloadable: true,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Week 6 – Discussion, Assignment & Lab
      </h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        In Week 6, you will deploy and configure a live{" "}
        <strong>WordPress website</strong> using Amazon EC2. This week focuses
        on real-world application hosting, security group configuration, and
        verifying public access to your site.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Week 6 Deliverables
        </h3>

        {/* Due date block */}
        <div className="mb-4 rounded-md border border-indigo-500 bg-indigo-900/30 p-4">
          <p className="text-lg font-semibold text-indigo-100">
            📅 Due Date — Week 6
          </p>
          <p className="mt-1 text-sm text-indigo-200">
            All Week 6 items are due by <strong>Dec 7, 2025 (11:59 PM)</strong>.
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
