// frontend/src/courses/CS79A/assignments/mod5/tasks/IAMAndVirtualPrivateCloud.tsx

type TopicItem = {
  title: string;
};

export default function IAMAndVirtualPrivateCloud() {
  const topics: TopicItem[] = [
    { title: "Week 5" },
    { title: "Video – An Introduction to AWS IAM" },
    { title: "Create IAM user" },
    { title: "The AWS Management Console" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">IAM & Virtual Private Cloud</h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        This section introduces{" "}
        <strong>AWS Identity and Access Management (IAM)</strong> and
        foundational concepts related to secure access within AWS environments.
        You will learn how users are created, managed, and granted permissions,
        as well as how IAM integrates with the AWS Management Console.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Week 5 Topics
        </h3>

        {/* Security focus block */}
        <div className="mb-4 rounded-md border border-red-500 bg-red-900/30 p-4">
          <p className="text-lg font-semibold text-red-100">
            🔐 Security & Access Control
          </p>
          <p className="mt-1 text-sm text-red-200">
            IAM is a critical AWS service used to control who can access
            resources and what actions they can perform. Proper IAM
            configuration is essential for securing cloud environments and
            preventing unauthorized access.
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
