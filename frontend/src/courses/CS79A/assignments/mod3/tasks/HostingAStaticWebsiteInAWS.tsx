// frontend/src/courses/CS79A/assignments/mod3/tasks/HostingAStaticWebsiteInAWS.tsx

type TopicItem = {
  title: string;
};

export default function HostingAStaticWebsiteInAWS() {
  const topics: TopicItem[] = [
    { title: "Week 3b" },
    { title: "Introduction to Hosting" },
    { title: "Create Buckets For Your Website" },
    { title: "Configure Your Root Domain Website Bucket" },
    { title: "Enable Logging For Your Website" },
    { title: "Upload Website Content" },
    { title: "Configure Your Root Bucket As A Website" },
    { title: "Test Your Website" },
    { title: "*If your website does not load" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Hosting A Static Website In AWS</h2>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        This section walks through hosting a <strong>static website</strong> on
        AWS using <strong>Amazon S3</strong>. You’ll create and configure S3
        buckets, upload site files, enable logging, and test your site. Follow
        the steps in order to avoid common configuration issues.
      </p>

      <div className="rounded border border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800/30">
        <h3 className="text-md mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Week 3b Hosting Topics & Steps
        </h3>

        {/* ✅ S3 focus block */}
        <div className="mb-4 rounded-md border border-sky-500 bg-sky-900/30 p-4">
          <p className="text-lg font-semibold text-sky-100">
            🪣 S3 Static Website Hosting
          </p>
          <p className="mt-1 text-sm text-sky-200">
            Amazon S3 can host static websites by serving files directly from a
            bucket. Correct bucket settings, permissions, and website
            configuration are required for the site to load properly.
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
