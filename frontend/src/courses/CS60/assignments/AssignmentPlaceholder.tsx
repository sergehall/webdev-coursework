export default function AssignmentPlaceholder() {
  return (
    <section className="space-y-6 rounded border border-gray-300 bg-gray-50 p-6 shadow-sm dark:border-gray-600 dark:bg-gray-900/10">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
        CS 60 – Database Concepts & Applications
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        Welcome to <strong>CS 60 – Database Concepts & Applications</strong>.
        This course focuses on the principles of database systems, relational
        data modeling, SQL, and effective database design.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <p className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">
          <strong>What you’ll work on in this course:</strong>
        </p>

        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Understanding database systems and how they differ from file-based
            data storage
          </li>
          <li>
            Designing databases using the relational model and ER diagrams
          </li>
          <li>Applying normalization techniques to reduce redundancy</li>
          <li>
            Writing SQL queries to create, retrieve, update, and manage data
          </li>
          <li>
            Learning core DBMS concepts such as keys, constraints, and
            transactions
          </li>
        </ul>
      </div>

      <div className="text-sm italic text-gray-700 dark:text-gray-400">
        📘 Select a module from the navigation to begin working on assignments
        and problem sets for this course.
      </div>
    </section>
  );
}
