// frontend/src/courses/CS60/assignments/mod2/tasks/Chapter4Overview.tsx

import { useState } from "react";

import {
  ToggleModalButton,
  DownloadAssignmentBundleButton,
  CloseModalButton,
} from "@/components/buttons";

export default function Chapter2Overview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const problemSetFiles = [
    {
      fileUrl: "/code-playground/CS60/mod-2/1712666_1749_CS60_V4.docx",
      filename: "1712666_1749_CS60_V4.docx",
    },
  ];

  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
        Data Models
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Chapter 2 focuses on <strong>data models</strong>—the ways we represent
        real-world data structures and relationships so they can be stored and
        managed in a database. This chapter directly supports{" "}
        <strong>Problem Set 1</strong>, which covers Chapters 1 and 2.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Tasks and expectations for this chapter:
        </p>

        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Review the <strong>Week 2 Announcements</strong> in Canvas (starting{" "}
            <strong>9/08/2025</strong>).
          </li>
          <li>
            Study the <strong>Chapter 2 Notes</strong> and complete the assigned
            readings for <strong>Chapter 2</strong>.
          </li>
          <li>
            Participate in the <strong>Chapter 2 Discussion</strong> and use it
            to clarify key modeling concepts.
          </li>
          <li>
            Review the <strong>Week 2 Class Example</strong> provided in Canvas.
          </li>
          <li>
            Continue working on <strong>Problem Set 1</strong> (covers{" "}
            <strong>Chapters 1 and 2</strong>) and submit it via{" "}
            <strong>Canvas Upload</strong> by{" "}
            <strong>Midnight on September 19th</strong>.
          </li>
        </ul>

        {/* Buttons (Problem Set 1) */}
        <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
          <ToggleModalButton
            isOpen={isModalOpen}
            toggle={() => setIsModalOpen(!isModalOpen)}
            label="View Problem Set 1"
          />
          <DownloadAssignmentBundleButton files={problemSetFiles} />
        </div>
      </div>

      {/* Modal (Problem Set 1 details) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-[95%] max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-900">
            <CloseModalButton onClick={() => setIsModalOpen(false)} />

            <div className="space-y-4 p-6 text-left">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Problem Set 1 – Chapters 1 & 2
              </h3>

              <p className="text-gray-700 dark:text-gray-300">
                <strong>Due:</strong> Midnight on{" "}
                <strong>September 19th</strong>
                .<br />
                <strong>Submission:</strong> Upload via <strong>Canvas</strong>{" "}
                (Canvas Upload required for grading).
              </p>

              <div className="rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-3 text-[0.95rem] font-medium text-yellow-800 dark:border-gray-600 dark:bg-gray-500/40 dark:text-gray-100">
                <p>
                  <strong>Reminder:</strong> The Problem Set includes
                  recommended diagramming tools. <strong>Lucidchart</strong> has
                  been a popular choice, but you may use any tool you prefer.
                </p>
              </div>

              <div className="text-sm text-gray-700 dark:text-gray-300">
                Use the <strong>Download</strong> button to grab the assignment
                file, complete the work, and submit it in Canvas before the due
                date/time.
              </div>

              <div className="mt-2">
                <DownloadAssignmentBundleButton files={problemSetFiles} />
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-sm italic text-gray-700 dark:text-gray-400">
        🧠 Strong data modeling skills make everything else easier—ER modeling,
        schema design, normalization, and writing correct SQL.
      </p>
    </section>
  );
}
