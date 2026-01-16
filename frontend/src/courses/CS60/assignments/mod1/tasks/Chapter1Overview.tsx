// frontend/src/courses/CS60/assignments/mod1/tasks/Chapter1Overview.tsx
export default function Chapter1Overview() {
  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
        Database Systems
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        This chapter introduces the course structure, tools, and foundational
        concepts of database systems. You will review the syllabus, begin your
        Chapter 1 readings, and set up access to the database tools required for
        the semester.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Tasks and expectations for this chapter:
        </p>

        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Review the <strong>Course Syllabus</strong>, available under the
            <em> General Section</em> in Canvas.
          </li>

          <li>
            Complete the assigned readings for <strong>Chapter 1</strong>. A
            free textbook is available directly under the Chapter 1 section.
          </li>

          <li>
            <strong>Problem Set 1</strong> has been posted and covers
            <strong> Chapters 1 and 2</strong>. The due date is{" "}
            <strong>Midnight on September 19th</strong>. All submissions must be
            uploaded via Canvas.
          </li>

          <li>
            Several diagramming tools are listed in the Problem Set
            instructions.
            <strong> Lucidchart</strong> has been a popular choice among
            students in previous semesters, but you may use any tool you prefer.
          </li>

          <li>
            <strong>Important:</strong> Problem Sets will only be graded if they
            are submitted using the <strong>Canvas Upload</strong>.
          </li>

          <li>
            Quizzes for <strong>Chapters 1 through 10</strong> have been
            enabled. All quizzes remain available until{" "}
            <strong>midnight on December 5th</strong>.
          </li>

          <li>
            Set up <strong>Database and SQL Developer access</strong>.
            Instructions are available on Canvas for connecting via{" "}
            <strong>SMC Azure VCL</strong>, which is the recommended option.
          </li>

          <li>
            As an alternative, you may install the Oracle database and SQL
            Developer locally. Since Oracle 12c is no longer available, install{" "}
            <strong>19c</strong>, <strong>21c</strong>, or{" "}
            <strong>Express Edition</strong>. For installation help, contact the
            SMC Student Helpdesk.
          </li>

          <li>
            For this course, you may use{" "}
            <strong>any relational database tool</strong>, including Oracle,
            MySQL, PostgreSQL, or MongoDB.
          </li>
        </ul>
      </div>

      <p className="text-sm italic text-gray-700 dark:text-gray-400">
        📘 Completing these setup steps early will ensure you are ready for SQL,
        data modeling, and problem set work in the upcoming chapters.
      </p>
    </section>
  );
}
