// frontend/src/courses/CS79A/assignments/mod6/tasks/UseEC2ToCreateAWordPressSite.tsx

type TopicItem = {
  title: string;
};

export default function UseEC2ToCreateAWordPressSite() {
  const topics: TopicItem[] = [
    { title: "Week 6" },
    { title: "Introduction to EC2" },
    { title: "EC2 Instance Types" },
    { title: "EC2 Machine Images (AMIs)" },
    { title: "EC2 Pricing" },
    { title: "Launch a WordPress Site Using EC2" },
    { title: "Access Your WordPress Site" },
    { title: "**Update for AWS Marketplace AMIs**" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Use EC2 To Create A WordPress Site</h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        This section introduces <strong>Amazon EC2</strong> in more depth and
        walks through launching a fully functional{" "}
        <strong>WordPress website</strong> using an EC2 instance. You’ll explore
        instance types, AMIs, pricing models, and deployment considerations.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Week 6 Topics
        </h3>

        {/* EC2 focus block */}
        <div className="mb-4 rounded-md border border-indigo-500 bg-indigo-900/30 p-4">
          <p className="text-lg font-semibold text-indigo-100">
            🖥️ EC2 & Application Hosting
          </p>
          <p className="mt-1 text-sm text-indigo-200">
            Amazon EC2 provides scalable virtual servers in the cloud. In this
            module, you will deploy a real-world application (WordPress) and
            understand how EC2 configuration choices impact performance, cost,
            and accessibility.
          </p>
        </div>

        {/* Topic list */}
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
