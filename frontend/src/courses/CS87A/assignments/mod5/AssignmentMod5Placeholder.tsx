export default function AssignmentMod5Placeholder() {
  return (
    <section className="space-y-6 rounded border border-teal-300 bg-teal-50 p-6 dark:border-teal-700 dark:bg-teal-900/10">
      <h2 className="text-xl font-bold text-teal-800 dark:text-teal-300">
        Module 5 – US Election Data Analysis
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        In this module, you will practice reading and processing real-world
        datasets using Python file I/O, dictionaries with tuple keys, nested
        dictionaries, and aggregation logic. You’ll work with U.S. House and
        Presidential election results to compute state-level majorities,
        electoral votes, and determine presidential winners by electoral count.
      </p>

      <div className="rounded border border-teal-200 bg-teal-100 p-4 dark:border-teal-600 dark:bg-teal-800/30">
        <p>
          <strong>Assignment:</strong> Write a Python program that:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Parses <code>house.tab</code> and <code>president.tab</code> into
            dictionaries keyed by <code>(year, state)</code>
          </li>
          <li>
            Determines the majority party in each state from House election
            winners
          </li>
          <li>
            Calculates electoral votes for each state (districts + 2; DC = 3)
          </li>
          <li>
            Computes the presidential winner for each year based on electoral
            votes
          </li>
          <li>
            Displays formatted tables comparing presidential winners and House
            majorities
          </li>
          <li>
            Provides an interactive prompt for year/state queries and allows
            quitting with <code>quit</code>
          </li>
        </ul>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        Focus on clear data structures, correct aggregation, input validation,
        and neatly formatted output.
      </div>
    </section>
  );
}
