// frontend/src/courses/CS79A/assignments/mod8/tasks/FinalExamsOverview.tsx

type TopicItem = {
  title: string;
};

export default function FinalExamsOverview() {
  const topics: TopicItem[] = [
    { title: "Answer theoretical questions covering AWS & cloud fundamentals" },
    {
      title: "Explain core concepts: EC2, S3, IAM, VPC, pricing, and security",
    },
    { title: "Deploy or reuse an S3 Static Website" },
    { title: "Make visible UI/content changes to your static website" },
    { title: "Configure and connect an FTP Server" },
    { title: "Upload or modify files using FTP and verify changes" },
    { title: "Demonstrate that all services are working correctly" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Final Exams – Overview</h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        The Final Exam is a cumulative assessment of both{" "}
        <strong>theoretical knowledge</strong> and{" "}
        <strong>hands-on AWS skills</strong> developed throughout the course.
        You will answer conceptual questions and complete practical cloud tasks
        using AWS services you have already worked with.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          What You Will Be Expected To Do
        </h3>

        {/* Final exam focus block */}
        <div className="mb-4 rounded-md border border-blue-500 bg-blue-900/30 p-4">
          <p className="text-lg font-semibold text-blue-100">
            🎓 Final Assessment Requirements
          </p>
          <p className="mt-1 text-sm text-blue-200">
            This exam combines written explanations with real AWS configuration
            tasks. You should be prepared to justify your answers and
            demonstrate working cloud solutions.
          </p>
        </div>

        {/* Requirements list */}
        <ul className="m-0 list-none space-y-1 p-0 text-sm text-gray-700 dark:text-gray-300">
          {topics.map((item) => (
            <li key={item.title} className="flex items-start gap-2">
              <span className="mt-[2px] inline-flex w-5 shrink-0 items-center justify-center">
                •
              </span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
          Tip: You may reuse work from previous modules (S3 static website, FTP
          server, EC2 instances), but ensure all changes requested in the final
          are clearly visible and functioning at the time of submission.
        </p>
      </div>
    </div>
  );
}
