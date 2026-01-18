// frontend/src/courses/CS79A/assignments/mod1/tasks/CourseIntroduction.tsx

import { DownloadAssignmentBundleButton } from "@/components/buttons";

type IntroItem = {
  title: string;
  downloadable?: boolean;
};

export default function CourseIntroduction() {
  const files = [
    {
      fileUrl: "/code-playground/CS79A/Syllabus-Cloud-Computing-AWS-CS-79A.pdf",
      filename: "Syllabus-Cloud-Computing-AWS-CS-79A.pdf",
    },
    {
      fileUrl: "/code-playground/CS79A/Welcome.pdf",
      filename: "CS79A/Welcome.pdf",
    },
  ];

  const items: IntroItem[] = [
    { title: "Welcome!", downloadable: true },
    { title: "Academic Honesty Policy" },
    { title: "Santa Monica College Honor Code" },
    { title: "Fall 2025 Academic Calendar" },
    { title: "AWS Overview" },
    { title: "Course Syllabus", downloadable: true },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">CS 79A – Course Introduction</h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        Use this section to get started with CS 79A. Review the welcome message,
        course policies, academic integrity guidelines, and syllabus before
        beginning Week 1 deliverables.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Course Introduction Resources
        </h3>

        {/* ✅ Dedicated syllabus block (required document) */}
        <div className="mb-4 rounded-md border border-blue-500 bg-blue-900/30 p-4">
          <p className="text-lg font-semibold text-blue-100">
            📘 Course Syllabus — CS 79A
          </p>
          <p className="mt-1 text-sm text-blue-200">
            Read the syllabus carefully for policies, grading, weekly
            expectations, and participation requirements. Available for download
            below.
          </p>
        </div>

        {/* Main resource list */}
        <ul className="m-0 list-none space-y-1 p-0 text-sm text-gray-700 dark:text-gray-300">
          {items.map((item) => (
            <li key={item.title} className="flex items-start gap-2">
              <span className="mt-[2px] inline-flex w-5 shrink-0 items-center justify-center">
                {item.downloadable ? "📘" : "•"}
              </span>
              <span>{item.title}</span>
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
