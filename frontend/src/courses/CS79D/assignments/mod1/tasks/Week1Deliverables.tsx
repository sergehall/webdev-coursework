// frontend/src/courses/CS79D/assignments/mod1/tasks/Week1Deliverables.tsx

type DeliverableItem = {
  title: string;
  meta?: string;
};

export default function Week1Deliverables() {
  const resources: DeliverableItem[] = [
    { title: "Week 1" },
    { title: "Slide Deck: W1" },
    { title: "AWS Console – Supported Browsers" },
    { title: "How to use Learner Lab" },
  ];

  const assignments: DeliverableItem[] = [
    { title: "Tell Us About You!", meta: "Apr 24 • 5 pts" },
    {
      title: "Assignment 1: Acquire an AWS Learner Lab account",
      meta: "Apr 24 • 10 pts",
    },
    {
      title: "Assignment 1b: AWS Management Console",
      meta: "Apr 24 • 10 pts",
    },
    {
      title: "Assignment 1c: Shared Responsibility Model",
      meta: "Apr 24 • 10 pts",
    },
    { title: "Quiz: Security Introduction", meta: "Apr 24 • 26 pts" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Week 1 – Introduction to AWS Security
      </h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        This week introduces the AWS security landscape, the Shared
        Responsibility Model, and the AWS Management Console. Complete all
        assignments and the quiz by <strong>April 24</strong>. Missing any
        deadline may result in being dropped from CS 79D.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Reading &amp; Resources
        </h3>

        <ul className="m-0 list-none space-y-1 p-0 text-sm text-gray-700 dark:text-gray-300">
          {resources.map((item) => (
            <li key={item.title} className="flex items-start gap-2">
              <span className="mt-[2px] inline-flex w-5 shrink-0 items-center justify-center">
                •
              </span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Assignments &amp; Deliverables
        </h3>

        <div className="mb-4 rounded-md border border-amber-500 bg-amber-900/30 p-4">
          <p className="text-lg font-semibold text-amber-100">
            ⚠️ Week 1 Deadline — April 24
          </p>
          <p className="mt-1 text-sm text-amber-200">
            Missing ANY of these assignment deadlines means you will be dropped
            from CS 79D. Submit all work through SMC Canvas.
          </p>
        </div>

        <ul className="m-0 list-none space-y-2 p-0 text-sm text-gray-700 dark:text-gray-300">
          {assignments.map((item) => (
            <li key={item.title} className="flex items-start gap-2">
              <span className="mt-[2px] inline-flex w-5 shrink-0 items-center justify-center">
                •
              </span>
              <div>
                <div>{item.title}</div>
                {item.meta ? (
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {item.meta}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
