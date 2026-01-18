// frontend/src/courses/CS79A/assignments/mod1/tasks/AWSLearnerLabWeek1.tsx

import { DownloadAssignmentBundleButton } from "@/components/buttons";

type LabItem = {
  title: string;
  meta?: string;
  downloadable?: boolean;
};

export default function AWSLearnerLabWeek1() {
  const files = [
    {
      fileUrl: "/code-playground/CS79A/AWS-Learner-Lab-Setup.pdf",
      filename: "AWS-Learner-Lab-Setup.pdf",
    },
  ];

  const items: LabItem[] = [
    { title: "AWS Console – Supported Browsers" },
    { title: "Video – AWS in 5 Minutes" },
    {
      title: "Discussion Board: Week 1",
      meta: "Due Nov 2, 2025 • 10 pts",
    },
    {
      title: "Assignment 1: Required Tasks",
      meta: "Due Nov 2, 2025 • 15 pts",
    },
    {
      title: "Lab 1: Acquire an AWS Learner Lab account",
      meta: "Due Nov 2, 2025 • 15 pts",
      downloadable: true,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">AWS Learner Lab – Week 1</h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        This section introduces you to <strong>AWS Academy</strong> and
        <strong> AWS Learner Labs</strong>. Follow the steps carefully to ensure
        your account is set up correctly before continuing with future labs and
        assignments.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Week 1 AWS Learner Lab Tasks
        </h3>

        {/* Dedicated lab requirement block */}
        <div className="mb-4 rounded-md border border-amber-500 bg-amber-900/30 p-4">
          <p className="text-lg font-semibold text-amber-100">
            🔐 AWS Learner Lab Account Setup
          </p>
          <p className="mt-1 text-sm text-amber-200">
            Creating and accessing your AWS Learner Lab account is required to
            complete this course. Follow the instructions carefully to avoid
            access issues later in the term.
          </p>
        </div>

        {/* Main task list */}
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

        <div className="mt-5">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Downloadable Files
          </p>
          <div className="mt-2">
            <DownloadAssignmentBundleButton files={files} />
          </div>
        </div>
      </div>
    </div>
  );
}
