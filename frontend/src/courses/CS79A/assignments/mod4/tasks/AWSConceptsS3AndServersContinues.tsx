// frontend/src/courses/CS79A/assignments/mod4/tasks/AWSConceptsS3AndServersContinues.tsx

type TopicItem = {
  title: string;
};

export default function AWSConceptsS3AndServersContinues() {
  const topics: TopicItem[] = [
    { title: "Week 4" },
    { title: "Data Center Concepts" },
    { title: "AWS Global Infrastructure" },
    { title: "Video – What is Cloud Computing" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        AWS Concepts, S3, and Servers Continues
      </h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        This section expands on core <strong>AWS concepts</strong> with a deeper
        look into data centers, global infrastructure, and how cloud computing
        enables scalable and resilient systems. These concepts provide the
        foundation for understanding S3, servers, and enterprise cloud
        architecture.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Week 4 Topics
        </h3>

        {/* ✅ Infrastructure focus block */}
        <div className="mb-4 rounded-md border border-orange-500 bg-orange-900/30 p-4">
          <p className="text-lg font-semibold text-orange-100">
            🌍 Global Cloud Infrastructure
          </p>
          <p className="mt-1 text-sm text-orange-200">
            AWS operates data centers across multiple regions and availability
            zones worldwide. Understanding this infrastructure is critical for
            designing secure, fault-tolerant, and highly available cloud
            solutions.
          </p>
        </div>

        {/* 📄 Topic list */}
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
      </div>
    </div>
  );
}
