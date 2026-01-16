// frontend/src/courses/CS60/assignments/mod6/tasks/Chapter6Overview.tsx

export default function Chapter6Overview() {
  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
        Normalization of Database Tables
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Chapter 6 focuses on <strong>database normalization</strong>, a critical
        process used to organize relational tables efficiently, reduce
        redundancy, and maintain data integrity. This chapter supports{" "}
        <strong>Problem Set 3</strong>, which emphasizes normalization concepts.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Tasks and expectations for this chapter:
        </p>

        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Review the <strong>Chapter 6 Notes</strong> and study the concepts
            of normalization and functional dependencies.
          </li>

          <li>
            Complete the <strong>Week 6 Class Activity</strong>. These
            activities are for practice and do <strong>not</strong> need to be
            submitted.
          </li>

          <li>
            Review the <strong>Additional Class Activity – Week 6</strong> to
            reinforce normalization concepts.
          </li>

          <li>
            Review the optional resource{" "}
            <strong>Boyce-Codd Normal Form (BCNF)</strong> project for a deeper
            understanding of advanced normalization topics.
          </li>

          <li>
            Download and explore the provided{" "}
            <strong>Chapter 6 Student Data Files</strong> to practice applying
            normalization rules to real datasets.
          </li>

          <li>
            <strong>Problem Set 3</strong> has been posted and is due by{" "}
            <strong>midnight on November 7th, 2025</strong>.
            <br />
            <strong>Important:</strong> All submissions must be uploaded via{" "}
            <strong>Canvas Upload</strong> to be graded.
          </li>

          <li>
            Participate in the <strong>Problem Set 3 Discussion</strong> if you
            have questions or want to compare approaches.
          </li>

          <li>
            Review the <strong>Zoom Office Hour Recording</strong> from{" "}
            <strong>10/06/2025</strong> if you need additional clarification.
          </li>
        </ul>
      </div>

      <p className="text-sm italic text-gray-700 dark:text-gray-400">
        🧠 Normalization is essential for building clean, reliable database
        designs—mastering these rules will make your schemas easier to maintain
        and query.
      </p>
    </section>
  );
}
