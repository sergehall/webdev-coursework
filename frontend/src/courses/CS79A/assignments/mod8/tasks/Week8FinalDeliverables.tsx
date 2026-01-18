// frontend/src/courses/CS79A/assignments/mod8/tasks/Week8FinalDeliverables.tsx

type DeliverableItem = {
  title: string;
  meta?: string;
};

export default function Week8FinalDeliverables() {
  const items: DeliverableItem[] = [
    {
      title: "Discussion Board: Week 8",
      meta: "Due Dec 19, 2025 • 10 pts",
    },
    {
      title: "Final Assessment",
      meta: "Due Dec 19, 2025 • 100 pts",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Week 8 – Discussion & Final Assessment
      </h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        Week 8 is the final week of the course and consists of a discussion
        activity and a comprehensive <strong>Final Assessment</strong>. This
        exam evaluates both your understanding of cloud concepts and your
        ability to apply them in practical AWS scenarios.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Final Exam Requirements
        </h3>

        {/* ✅ Exam emphasis block */}
        <div className="mb-4 rounded-md border border-blue-500 bg-blue-900/30 p-4">
          <p className="text-lg font-semibold text-blue-100">
            🎓 Final Assessment
          </p>
          <p className="mt-1 text-sm text-blue-200">
            The final assessment is a timed exam. No screenshots or file uploads
            are required unless explicitly stated in the exam instructions.
          </p>
        </div>

        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
          During the final exam, you will be expected to:
        </p>

        <ul className="m-0 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Answer theoretical questions covering AWS and cloud computing
            concepts
          </li>
          <li>
            Explain core services such as EC2, S3, IAM, VPC, security, and
            pricing
          </li>
          <li>
            Demonstrate understanding of S3 Static Website hosting concepts
          </li>
          <li>
            Describe how FTP servers are configured and used in cloud
            environments
          </li>
          <li>Apply best practices learned throughout the course</li>
        </ul>

        <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
          Note: The final assessment is cumulative and may reference material
          from all previous modules.
        </p>

        {/* 📄 Deliverables list */}
        <ul className="m-0 mt-4 list-none space-y-1 p-0 text-sm text-gray-700 dark:text-gray-300">
          {items.map((item) => (
            <li key={item.title} className="flex items-start gap-2">
              <span className="mt-[2px] inline-flex w-5 shrink-0 items-center justify-center">
                •
              </span>
              <div>
                <div>{item.title}</div>
                {item.meta && (
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {item.meta}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
