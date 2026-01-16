// frontend/src/courses/CS60/assignments/mod7/tasks/Chapter7Overview.tsx
import { DownloadAssignmentBundleButton } from "@/components/buttons";

export default function Chapter7Overview() {
  const problemSet4Files = [
    {
      fileUrl: "/code-playground/CS60/mod-7/CS60_Problem_Set_4-F25.docx",
      filename: "CS60-Problem-Set-4-F25.docx",
    },
    {
      fileUrl: "/code-playground/CS60/mod-7/PS4_Datafile.txt",
      filename: "PS4_Datafile.txt",
    },
    {
      fileUrl: "/code-playground/CS60/mod-7/MySQL_DataFile.txt",
      filename: "MySQL_DataFile.txt",
    },
  ];

  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
        Introduction to Structured Query Language (SQL)
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        This week begins our SQL-focused section of the course. You will start
        working with SQL data types, creating and altering tables, inserting and
        modifying data, and writing <strong>SELECT</strong> queries. For the
        next few weeks, it’s strongly recommended to have a working database and
        SQL environment ready on your laptop.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Week 8 announcements and tasks:
        </p>

        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Review <strong>Announcements for Week 8</strong> (starting{" "}
            <strong>11/03/2025</strong>).
          </li>

          <li>
            <strong>Office Hour</strong> is on Tuesday (<strong>11/04</strong>)
            from <strong>5–6 PM PST</strong>. Join using:{" "}
            <strong>https://cccconfer.zoom.us/j/2592572782</strong>
          </li>

          <li>
            <strong>Problem Set 2</strong> and <strong>Mid Semester</strong>{" "}
            marking is currently in progress.
          </li>

          <li>
            <strong>Problem Set 3</strong> is already posted and due by{" "}
            <strong>midnight on November 7th</strong>.
          </li>

          <li>
            <strong>Coverage for this week (SQL begins):</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Read the <strong>Chapter 7 PDF Notes</strong>
              </li>
              <li>
                Review: <strong>Chapter 03 Oracle Datatypes for SQL.pdf</strong>
              </li>
              <li>
                Review:{" "}
                <strong>Chapter 05 Creating and Altering Tables.pdf</strong>
              </li>
              <li>
                Review:{" "}
                <strong>Chapter 06 Using INSERT, UPDATE, and DELETE.pdf</strong>
              </li>
              <li>
                Review: <strong>Chapter 07 The SQL SELECT Statement.pdf</strong>
              </li>
            </ul>
          </li>

          <li>
            <strong>SQL Developer activity:</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Run: <strong>Week 7 - Lab 2.sql</strong>
              </li>
              <li>
                Complete: <strong>SQL Exercises - Set 1.docx</strong>
              </li>
              <li>
                Work independently on: <strong>Lab Activity 2.docx</strong>
              </li>
              <li>
                Complete: <strong>SQL Exercise - Set 2</strong> using{" "}
                <strong>Ch07_ConstructCo_ORA.txt</strong>
              </li>
              <li>
                Complete: <strong>SQL Exercise - Set 3</strong> using{" "}
                <strong>Ch07_SaleCo_ORA.txt</strong>
              </li>
            </ul>
          </li>

          <li>
            <strong>Database setup options (important):</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                For the next 3 weeks, we will be working on SQL—please ensure
                you have a working SQL environment on your laptop.
              </li>
              <li>
                You may use <strong>any database</strong> (not limited to
                Oracle).
              </li>
              <li>
                Connect via <strong>Azure VCL</strong> (remote database), or
                install locally following the{" "}
                <em>Oracle Database and SQL Developer Instruction</em> section.
              </li>
            </ul>
          </li>

          <li>
            <strong>Quizzes:</strong> Complete the{" "}
            <strong>Chapter 7 quiz</strong> this week. All chapter quizzes
            remain available until <strong>December 5th</strong>.
          </li>

          <li>
            <strong>Problem Set 4</strong> is due by{" "}
            <strong>midnight on November 25th, 2025</strong>. Download the files
            below and submit your completed work via{" "}
            <strong>Canvas Upload</strong>.
          </li>
        </ul>

        {/* Download Problem Set 4 */}
        <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
          <DownloadAssignmentBundleButton files={problemSet4Files} />
        </div>
      </div>

      <p className="text-sm italic text-gray-700 dark:text-gray-400">
        🧠 SQL is a core skill for this course—focus on building confidence with
        table creation, data manipulation, and SELECT queries.
      </p>
    </section>
  );
}
