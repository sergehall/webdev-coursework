// frontend/src/courses/CS60/assignments/mod3/tasks/Chapter4Overview.tsx

export default function Chapter3Overview() {
  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
        The Relational Data Model
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Week 3 focuses on completing Chapter 3 content and class activities,
        plus a brief introduction to SQL. Make sure you stay on schedule—Problem
        Set 1 is due this week and must be uploaded through Canvas to be graded.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Tasks and expectations for this week:
        </p>

        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Review <strong>Announcements for Week 3</strong> (starting{" "}
            <strong>9/15/2025</strong>).
          </li>

          <li>
            <strong>Office Hour</strong> is on Tuesday (<strong>9/16</strong>)
            from <strong>5–6 PM PST</strong>. Use this Zoom link to join:{" "}
            <strong>https://cccconfer.zoom.us/j/2592572782</strong>
          </li>

          <li>
            <strong>Problem Set 1</strong> is due by{" "}
            <strong>midnight on September 19th</strong>. Complete and upload it
            to <strong>Canvas</strong> by the deadline.
            <br />
            <strong>Important:</strong> Problem Sets will only be graded if
            submitted using <strong> Canvas Upload</strong>.
          </li>

          <li>
            <strong>Coverage for this week:</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Complete the <strong>Chapter 3 Notes</strong>
              </li>
              <li>
                Complete <strong>Week 3 Class Activities</strong>
              </li>
              <li>
                Brief look at SQL: review <strong>Week3 SQL Files.sql</strong>
              </li>
            </ul>
          </li>

          <li>
            <strong>Azure VCL update:</strong> The VCL system account is
            currently <strong>locked</strong>. A reset request has been sent to
            SMC IT Helpdesk. A follow-up note will be posted once access is
            restored.
          </li>

          <li>
            <strong>Options for Oracle Database and SQL Developer:</strong>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Connect remotely via <strong>Azure VCL</strong> (recommended).
                Refer to <em>Connecting to Azure VCL - Remote Database</em>.
              </li>
              <li>
                To connect to VCL, use the <strong>Windows App</strong> (Remote
                Desktop App is no longer supported by Microsoft). See{" "}
                <strong>Accessing Azure VCL Using the Windows App.pdf</strong>.
              </li>
              <li>
                Install locally: review{" "}
                <em>Oracle Database and SQL Developer Instruction</em> and start
                installing your database/SQL Developer.
              </li>
              <li>
                For macOS, review the Mac options and the{" "}
                <em>
                  Oracle Database and SQL Developer Installation Discussion
                </em>
                .
              </li>
            </ul>
          </li>

          <li>
            <strong>Quizzes:</strong> Quizzes have been enabled—please complete
            the <strong>Chapter 3 quiz</strong> this week. There are{" "}
            <strong>10 chapter quizzes</strong> total, and all quizzes remain
            available until <strong>midnight on December 5th, 2025</strong>.
          </li>
        </ul>
      </div>

      <p className="text-sm italic text-gray-700 dark:text-gray-400">
        🧠 Chapter 3 is where the course “clicks”: the relational model becomes
        the foundation for schemas, keys, and eventually writing correct SQL.
      </p>
    </section>
  );
}
