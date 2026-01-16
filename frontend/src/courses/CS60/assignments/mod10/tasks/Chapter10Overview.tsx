// frontend/src/courses/CS60/assignments/mod10/tasks/Chapter10Overview.tsx
import { DownloadAssignmentBundleButton } from "@/components/buttons";

export default function Chapter10Overview() {
  const finalExamFiles = [
    {
      fileUrl: "/code-playground/CS60/final-exam/CS60_Final_Exam-F25.pdf",
      filename: "CS60_Final_Exam-F25.pdf",
    },
  ];

  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
        Transaction Management and Concurrency Control
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Chapter 10 concludes the course by introducing{" "}
        <strong>transaction management</strong> and{" "}
        <strong>concurrency control</strong>. These concepts explain how modern
        database systems maintain data integrity and consistency when multiple
        users and applications access data simultaneously.
      </p>

      {/* Week 14 Announcements */}
      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Week 14 announcements and course wrap-up:
        </p>

        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>Announcements for Week 14</strong> (starting{" "}
            <strong>12/01/2025</strong>). This is the final week of classes.
          </li>

          <li>
            <strong>Final Office Hour:</strong> Tuesday (
            <strong>12/02/2025</strong>) from <strong>5–6 PM PST</strong>. Join
            using: <strong>https://cccconfer.zoom.us/j/2592572782</strong>
          </li>

          <li>
            <strong>Coverage for this week:</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Review <strong>Chapter 9</strong> content
              </li>
              <li>
                Complete <strong>Chapter 10</strong> content
              </li>
            </ul>
          </li>

          <li>
            <strong>Quizzes:</strong> Complete the{" "}
            <strong>Chapter 10 quiz</strong>. All quizzes remain available until{" "}
            <strong>December 5th</strong>.
          </li>

          <li>
            <strong>Problem Set 1, 2, 3 and Mid Semester Test</strong> have been
            marked and grades posted on Canvas. Any missing grades are being
            updated.
          </li>

          <li>
            <strong>Problem Set 4</strong> is already due and will be marked
            later this week.
          </li>
        </ul>
      </div>

      {/* Final Exam Announcements */}
      <div className="rounded border-l-4 border-blue-500 bg-blue-50 p-4 dark:border-blue-400 dark:bg-blue-900/20">
        <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
          Final Exam Announcements
        </p>

        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-blue-900 dark:text-blue-200">
          <li>
            The <strong>Final Exam</strong> will be enabled from{" "}
            <strong>9am Monday, December 8th</strong> until{" "}
            <strong>10pm Tuesday, December 9th, 2025</strong>. An announcement
            will be posted as soon as the final exam is enabled.
          </li>

          <li>
            The exam will be accessible under the{" "}
            <strong>Final Exam section in Canvas</strong>.
          </li>

          <li>
            If you have questions during the exam, use the{" "}
            <strong>Final Exam Discussion</strong> forum. Responses will be
            provided promptly.
          </li>

          <li>
            A <strong>Final Exam office hour</strong> will be held on{" "}
            <strong>Monday, December 8th</strong> from <strong>5–6 PM</strong>.
            Use the class Zoom link to join:{" "}
            <strong>https://cccconfer.zoom.us/j/2592572782</strong>
          </li>

          <li>
            For diagrams, you may draw them on paper, take a photo, and upload
            the image.
          </li>

          <li>
            <strong>SQL Question:</strong> It uses the{" "}
            <strong>same dataset as Problem Set 4</strong>. If you already built
            the dataset for PS4, you do not need to recreate it—just run SELECT
            statements to confirm your tables and data exist.
          </li>

          <li>
            <strong>Final Exam format / coverage:</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Coverage: <strong>Chapters 6–10</strong>
              </li>
              <li>
                <strong>10–15 multiple choice questions</strong>
              </li>
              <li>Question 1: Chapter 6 (similar to Q3 from Problem Set 3)</li>
              <li>Question 2: Chapters 9 and 10</li>
              <li>Question 3: SQL (similar to Problem Set 4)</li>
            </ul>
          </li>

          <li>
            <strong>
              Good luck on your final exam — it was great teaching you all this
              semester! Best wishes, and have a wonderful Winter break. Happy
              Holidays!
            </strong>
          </li>
        </ul>

        {/* Download Final Exam files */}
        <div className="mt-4 flex flex-wrap gap-3">
          <DownloadAssignmentBundleButton files={finalExamFiles} />
        </div>
      </div>

      <p className="text-sm italic text-gray-700 dark:text-gray-400">
        🎓 You’ve made it to the finish line — stay calm, review the key topics,
        and good luck!
      </p>
    </section>
  );
}
