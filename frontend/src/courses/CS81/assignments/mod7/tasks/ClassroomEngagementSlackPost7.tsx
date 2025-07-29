// frontend/src/assignments/mod7/tasks/ClassroomEngagementSlackPost7.tsx
import { useState } from "react";

import { ToggleScreenshotButton } from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";

const ClassroomEngagementSlackPost7 = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);
  const screenshots = [
    {
      label: "Slack Module 7 discussion screenshot",
      src: "/sandbox/mod-7/Module-7-Classroom-Engagement–Slack-Post.png",
    },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment: Slack Post
      </h2>

      <p className="text-gray-700 dark:text-gray-300">
        For this week’s classroom engagement, I shared my experience setting up
        AWS S3 for storing image files. I mentioned that I added a file size
        limit to stay within the free tier and keep storage free. I also
        discussed the difference between S3 and EBS, and how S3 is better for
        static file storage like images. I asked if anyone had similar IAM
        permission issues, since I had to troubleshoot trust policies.
      </p>

      <ul className="ml-6 list-disc space-y-1 text-gray-700 dark:text-gray-300">
        <li>
          Described configuring S3 with size restrictions for free-tier usage
        </li>
        <li>
          Reflected on differences between S3 (object storage) and EBS (block
          storage)
        </li>
        <li>Mentioned learning experience with IAM roles and trust policies</li>
        <li>Asked peers if they faced similar permission issues</li>
      </ul>

      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ToggleScreenshotButton
          show={showScreenshots}
          toggle={() => setShowScreenshots(!showScreenshots)}
        />
      </div>
      {showScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </div>
  );
};

export default ClassroomEngagementSlackPost7;
