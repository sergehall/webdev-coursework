// frontend/src/courses/CS60/assignments/mod8/tasks/Chapter8Overview.tsx

export default function Chapter8Overview() {
  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
        Advanced SQL
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Chapter 8 continues our SQL focus with more advanced query techniques.
        This week emphasizes <strong>joins</strong>,{" "}
        <strong>group queries</strong>, and related operations that are
        essential for working with real-world relational data.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Week 12 announcements and tasks:
        </p>

        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Review <strong>Announcements for Week 12</strong> (starting{" "}
            <strong>11/17/2025</strong>).
          </li>

          <li>
            <strong>Office Hour</strong> is scheduled for Tuesday (
            <strong>11/16</strong>) from <strong>5–6 PM PST</strong>. Join
            using: <strong>https://cccconfer.zoom.us/j/2592572782</strong>
          </li>

          <li>
            Instructor will be out next week —{" "}
            <strong>no office hour next week</strong>. Happy Thanksgiving!
          </li>

          <li>
            <strong>Problem Set 2, 3, and Mid Semester</strong> marking is
            complete for all submissions made through <strong>Canvas</strong>.
          </li>

          <li>
            <strong>Problem Set 4</strong> is posted and due by{" "}
            <strong>midnight on November 25th</strong>. Make sure your final
            submission is uploaded via <strong>Canvas Upload</strong>.
          </li>

          <li>
            <strong>Coverage for this week (Advanced SQL):</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Review the <strong>Chapter 8 PDF Notes</strong>
              </li>
              <li>
                Study:{" "}
                <strong>
                  Chapter 10 Queries with Groups, Joins, and Set Operations,
                  Views, Sequences.pdf
                </strong>
              </li>
              <li>
                Continue practice with <strong>SQL Exercise – Set 3</strong>{" "}
                using <strong>Ch07_SaleCo_ORA.txt</strong>
              </li>
            </ul>
          </li>

          <li>
            <strong>Important SQL links (joins):</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>https://www.w3schools.com/sql/sql_join.asp</strong>
              </li>
              <li>
                <strong>https://www.techonthenet.com/oracle/joins.php</strong>
              </li>
              <li>
                <strong>
                  https://oracle-base.com/articles/misc/sql-for-beginners-joins#setup
                </strong>
              </li>
            </ul>
          </li>

          <li>
            <strong>Quizzes:</strong> Complete the{" "}
            <strong>Chapter 8 quiz</strong> this week. All chapter quizzes
            remain available until <strong>December 5th</strong>.
          </li>

          <li>
            <strong>Coverage for remaining weeks:</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Week of <strong>Nov 24th</strong> — review{" "}
                <strong>Chapter 9</strong>
              </li>
              <li>
                Week of <strong>Dec 01</strong> — review{" "}
                <strong>Chapter 10</strong> and Final Exam format
              </li>
              <li>
                Week of <strong>Dec 08</strong> — <strong>Final Exam</strong>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <p className="text-sm italic text-gray-700 dark:text-gray-400">
        🧠 Joins are one of the most important SQL skills—focus on understanding
        how tables relate and how join conditions affect your result set.
      </p>
    </section>
  );
}
