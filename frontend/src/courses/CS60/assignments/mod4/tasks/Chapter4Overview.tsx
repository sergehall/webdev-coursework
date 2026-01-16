// frontend/src/courses/CS60/assignments/mod4/tasks/Chapter4Overview.tsx

import { DownloadAssignmentBundleButton } from "@/components/buttons";

export default function Chapter4Overview() {
  const problemSetFiles = [
    {
      fileUrl: "/code-playground/CS60/mod-2/1712666_1749_CS60_V4.docx",
      filename: "CS60-Problem-Set-1-Fall-2025.docx",
    },
    {
      fileUrl: "/code-playground/CS60/mod-4/1712666_1749_CS60_PS2.docx",
      filename: "1712666_1749_CS60_PS2.docx",
    },
  ];

  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
        Entity Relationship (ER) Modeling
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Chapter 4 introduces <strong>Entity Relationship (ER) modeling</strong>,
        a key technique used to visually design databases before implementing
        them using the relational model. This chapter directly supports{" "}
        <strong>Problem Set 2</strong>, which covers Chapters 3 and 4.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Tasks and expectations for this week:
        </p>

        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Review <strong>Announcements for Week 4</strong> (starting{" "}
            <strong>9/22/2025</strong>).
          </li>

          <li>
            <strong>Office Hour</strong> will be held on Tuesday (
            <strong>9/23</strong>) from <strong>5–6 PM PST</strong>. Join via{" "}
            <strong>https://cccconfer.zoom.us/j/2592572782</strong>
          </li>

          <li>
            <strong>Problem Set 1</strong> is already due and will be graded
            later this week.
          </li>

          <li>
            <strong>Problem Set 2</strong> is due by{" "}
            <strong>midnight on October 10th</strong> and covers{" "}
            <strong>Chapters 3 and 4</strong>.
            <br />
            <strong>Important:</strong> Submissions must be made via{" "}
            <strong>Canvas Upload</strong>.
          </li>

          <li>
            <strong>Coverage for this week:</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Complete the <strong>Chapter 4 Notes</strong>
              </li>
              <li>
                Complete <strong>Week 4 Class Activities</strong> (practice
                only, no submission required)
              </li>
            </ul>
          </li>

          <li>
            <strong>Database tools:</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Use <strong>Azure VCL</strong> with the{" "}
                <strong>Windows App</strong> (recommended).
              </li>
              <li>
                Or install locally; for help email{" "}
                <strong>studentithelp@smc.edu</strong>.
              </li>
            </ul>
          </li>

          <li>
            <strong>Quizzes:</strong> Complete the{" "}
            <strong>Chapter 4 quiz</strong> this week. All chapter quizzes
            remain available until <strong>December 5th</strong>.
          </li>
        </ul>

        {/* Download buttons */}
        <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
          <DownloadAssignmentBundleButton files={problemSetFiles} />
        </div>
      </div>

      <p className="text-sm italic text-gray-700 dark:text-gray-400">
        🧠 ER modeling is the bridge between real-world requirements and clean
        relational database design—mastering it will make normalization and SQL
        much easier.
      </p>
    </section>
  );
}
