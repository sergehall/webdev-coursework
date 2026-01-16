// frontend/src/courses/CS60/assignments/mod9/tasks/Chapter9Overview.tsx
export default function Chapter9Overview() {
  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
        Database Design
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Chapter 9 focuses on <strong>database design principles</strong> and how
        to translate business requirements into well-structured relational
        databases. This chapter builds directly on ER modeling, normalization,
        and SQL concepts covered earlier in the course.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Tasks and expectations for this chapter:
        </p>

        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Review the <strong>Chapter 9 Notes</strong> based on the textbook{" "}
            <em>
              Database Systems: Design, Implementation, and Management (14e)
            </em>
            .
          </li>

          <li>
            Focus on the <strong>database design lifecycle</strong>, including:
            requirements analysis, conceptual design, logical design, and
            physical design.
          </li>

          <li>
            Practice converting <strong>ER diagrams</strong> into relational
            schemas while preserving integrity constraints.
          </li>

          <li>
            Review best practices for:
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Primary and foreign key selection</li>
              <li>Relationship resolution</li>
              <li>Handling weak entities and associative tables</li>
              <li>Applying normalization during design</li>
            </ul>
          </li>

          <li>
            Continue reviewing SQL concepts as they apply to schema creation and
            database design decisions.
          </li>

          <li>
            Complete the <strong>Chapter 9 quiz</strong>. All chapter quizzes
            remain available until <strong>December 5th</strong>.
          </li>
        </ul>
      </div>

      <p className="text-sm italic text-gray-700 dark:text-gray-400">
        🧠 Strong database design reduces redundancy, improves consistency, and
        makes SQL queries easier to write and maintain.
      </p>
    </section>
  );
}
