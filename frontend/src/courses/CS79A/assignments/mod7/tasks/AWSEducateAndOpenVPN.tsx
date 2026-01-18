// frontend/src/courses/CS79A/assignments/mod7/tasks/AWSEducateAndOpenVPN.tsx

type TopicItem = {
  title: string;
};

export default function AWSEducateAndOpenVPN() {
  const topics: TopicItem[] = [
    { title: "Week 7" },
    { title: "Logging Into Amazon Educate" },
    { title: "Video – AWS Educate Platform Introduction" },
    { title: "AWS Educate Career Pathways" },
    { title: "Amazon Educate Program Features" },
    { title: "Working With The Amazon Educate Job Board" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">AWS Educate & OpenVPN</h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        This section introduces <strong>AWS Educate</strong> and explores how
        the platform supports cloud learning, career development, and job
        readiness. You will also work with <strong>OpenVPN</strong> to securely
        access cloud resources, reinforcing best practices for secure remote
        connectivity.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Week 7 Topics
        </h3>

        {/* Career & security focus block */}
        <div className="mb-4 rounded-md border border-cyan-500 bg-cyan-900/30 p-4">
          <p className="text-lg font-semibold text-cyan-100">
            🎓 Career Development & Secure Access
          </p>
          <p className="mt-1 text-sm text-cyan-200">
            AWS Educate provides learning pathways, hands-on labs, and career
            resources designed to prepare students for cloud roles. OpenVPN
            introduces secure tunneling concepts used to protect access to
            private cloud environments.
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
