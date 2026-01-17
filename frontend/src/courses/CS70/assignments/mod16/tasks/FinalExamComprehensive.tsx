// frontend/src/courses/CS70/assignments/mod16/tasks/FinalExamComprehensive.tsx

export default function FinalExamComprehensive() {
  const availableFrom = "Dec 15, 2025 at 12:00am";
  const availableTo = "Dec 21, 2025 at 11:59pm";
  const dueDate = "Dec 21, 2025 at 11:59pm";

  const examDetails = [
    { label: "Title", value: "Final Exam — Comprehensive" },
    { label: "Due", value: dueDate },
    { label: "Points", value: "150" },
    { label: "Questions", value: "75" },
    { label: "Available", value: `${availableFrom} – ${availableTo}` },
    { label: "Time Limit", value: "75 minutes" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Complete the CS 70 comprehensive final exam during Finals Week. Make
          sure you start the exam within the availability window and finish
          before the due time.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Final Exam Details
        </h3>

        <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
          <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {examDetails.map((item) => (
              <li key={item.label}>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {item.label}:
                </span>{" "}
                <span className="text-gray-700 dark:text-gray-300">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Key Requirements
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Final Exam is available from <strong>{availableFrom}</strong> to{" "}
            <strong>{availableTo}</strong>.
          </li>
          <li>
            Due by <strong>{dueDate}</strong> (late submissions typically not
            accepted).
          </li>
          <li>
            Time limit: <strong>75 minutes</strong> once started.
          </li>
          <li>
            Total: <strong>75 questions</strong> worth{" "}
            <strong>150 points</strong>.
          </li>
          <li>
            Plan a quiet environment and stable internet before you begin.
          </li>
        </ul>
      </div>
    </div>
  );
}
