// frontend/src/courses/CS60/assignments/mod5/tasks/Chapter5Overview.tsx
import { DownloadAssignmentBundleButton } from "@/components/buttons";

export default function Chapter5Overview() {
  const midtermFiles = [
    {
      fileUrl:
        "/code-playground/CS60/Mid-Semester-Test/1712666_1749_CS60_ Mid_Semester_Test.docx.docx",
      filename: "1712666_1749_CS60_ Mid_Semester_Test.docx.docx",
    },
  ];

  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
        Advanced Data Modeling
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Chapter 5 builds on ER modeling by introducing{" "}
        <strong>advanced data modeling concepts</strong>, including
        specialization hierarchies and more complex relationship structures.
        This week also prepares you for the <strong>Mid Semester Test</strong>.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Tasks and expectations for this week:
        </p>

        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Review <strong>Announcements for Week 5</strong> (starting{" "}
            <strong>9/29/2025</strong>).
          </li>

          <li>
            <strong>Office Hour</strong> will be held on Tuesday (
            <strong>9/30</strong>) from <strong>5–6 PM PST</strong>. Join using
            this link: <strong>https://cccconfer.zoom.us/j/2592572782</strong>
          </li>

          <li>
            <strong>Problem Set 1</strong> is already due and marking is
            currently in progress.
          </li>

          <li>
            <strong>Problem Set 2</strong> is due by{" "}
            <strong>midnight on October 10th</strong>. It covers{" "}
            <strong>Chapters 3 and 4</strong>.
            <br />
            <strong>Important:</strong> Submissions must be made via{" "}
            <strong>Canvas Upload</strong>.
          </li>

          <li>
            <strong>Coverage for this week:</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Complete the <strong>Chapter 5 Notes</strong>
              </li>
              <li>
                Complete <strong>Week 5 Class Activities</strong> (practice only
                — no submission required)
              </li>
            </ul>
          </li>

          <li>
            <strong>Database & SQL Developer options:</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Use <strong>Azure VCL</strong> with the{" "}
                <strong>Windows App</strong> (Remote Desktop App is no longer
                supported).
              </li>
              <li>
                Or install locally; for help email{" "}
                <strong>studentithelp@smc.edu</strong>.
              </li>
            </ul>
          </li>

          <li>
            <strong>Quizzes:</strong> Complete the{" "}
            <strong>Chapter 5 quiz</strong> this week. All chapter quizzes
            remain available until <strong>December 5th</strong>.
          </li>

          <li>
            <strong>Mid Semester Test:</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Available from <strong>9am Monday, October 13th</strong> until{" "}
                <strong>10pm Tuesday, October 14th, 2025</strong> (PST)
              </li>
              <li>
                <strong>Open materials</strong> test
              </li>
              <li>
                <strong>Part A:</strong> 10 multiple-choice questions
              </li>
              <li>
                <strong>Part B:</strong> 3 questions (similar to Problem Sets
                and Weekly Activities)
              </li>
              <li>
                Coverage includes <strong>Chapters 1–5</strong>, focusing on ERD
                diagrams, relational diagrams, keys, integrity constraints, and
                specialization hierarchies.
              </li>
            </ul>

            {/* Download Midterm */}
            <div className="mt-4">
              <DownloadAssignmentBundleButton files={midtermFiles} />
            </div>
          </li>
        </ul>
      </div>

      <p className="text-sm italic text-gray-700 dark:text-gray-400">
        🧠 Reviewing ER diagrams, keys, and specialization hierarchies now will
        significantly improve your performance on the midterm.
      </p>
    </section>
  );
}
