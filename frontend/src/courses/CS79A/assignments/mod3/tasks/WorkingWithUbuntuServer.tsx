// frontend/src/courses/CS79A/assignments/mod3/tasks/WorkingWithUbuntuServer.tsx

type TopicItem = {
  title: string;
};

export default function WorkingWithUbuntuServer() {
  const topics: TopicItem[] = [
    { title: "Week 3" },
    { title: "EC2 – Ubuntu Server" },
    { title: "For Mac Users: Connect to Ubuntu Server using Terminal" },
    { title: "For PC Users: Connect to Ubuntu Server using Putty" },
    { title: "For AWS Console Users: Connect to Ubuntu through web browser" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Working With Ubuntu Server</h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        This section focuses on launching and connecting to an{" "}
        <strong>Ubuntu Linux server</strong> on AWS EC2. You will learn multiple
        connection methods depending on your operating system and preferred
        tools, preparing you for real-world Linux server administration.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Week 3 Ubuntu Server Topics
        </h3>

        {/* ✅ Linux focus block */}
        <div className="mb-4 rounded-md border border-green-500 bg-green-900/30 p-4">
          <p className="text-lg font-semibold text-green-100">
            🐧 Linux Server Fundamentals
          </p>
          <p className="mt-1 text-sm text-green-200">
            Ubuntu is one of the most widely used Linux distributions in cloud
            environments. Understanding how to connect and navigate a Linux
            server is a critical skill for cloud and DevOps roles.
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
