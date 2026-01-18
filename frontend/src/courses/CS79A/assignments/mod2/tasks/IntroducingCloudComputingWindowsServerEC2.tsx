// frontend/src/courses/CS79A/assignments/mod2/tasks/IntroducingCloudComputingWindowsServerEC2.tsx

type TopicItem = {
  title: string;
};

export default function IntroducingCloudComputingWindowsServerEC2() {
  const topics: TopicItem[] = [
    { title: "Week 2" },
    { title: "Video: What is AWS?" },
    { title: "A Brief History" },
    { title: "Business Drivers" },
    { title: "Concepts and Terminology" },
    { title: "Goals and Benefits" },
    { title: "Risks and Challenges" },
    { title: "From Google's Perspective" },
    { title: "From Amazon's Perspective" },
    { title: "From Dilbert's Perspective" },
    { title: "Infrastructure as a Service (IaaS)" },
    { title: "Platform as a Service (PaaS)" },
    { title: "Software as a Service (SaaS)" },
    { title: "... as a Service Comparison" },
    { title: "Step 1: How to use Learner Lab" },
    { title: "Step 2: Launching EC2 Windows Instance" },
    { title: "Step 3: Connecting to an EC2 Windows Instance" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Introducing Cloud Computing & Windows Server EC2
      </h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        This section introduces core cloud computing concepts and service
        models, with a practical focus on launching and connecting to a{" "}
        <strong>Windows Server EC2 instance</strong> using AWS Learner Labs.
        Review the materials in order before completing the Week 2 labs and
        discussion.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Week 2 Learning Topics & Lab Preparation
        </h3>

        {/* Concept focus block */}
        <div className="mb-4 rounded-md border border-indigo-500 bg-indigo-900/30 p-4">
          <p className="text-lg font-semibold text-indigo-100">
            ☁️ Cloud Computing Foundations
          </p>
          <p className="mt-1 text-sm text-indigo-200">
            Understanding cloud service models and business drivers is essential
            before deploying infrastructure in AWS. Pay close attention to the
            differences between IaaS, PaaS, and SaaS.
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
