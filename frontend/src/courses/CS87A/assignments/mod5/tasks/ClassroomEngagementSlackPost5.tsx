import { useState } from "react";

import { ToggleScreenshotButton } from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";

const ClassroomEngagementSlackPost5 = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);
  const screenshots = [
    {
      label: "Slack Module 5 discussion screenshot",
      src: "/code-playground/CS81/mod-5/Module-5-Classroom-Engagement–Slack-Post.png",
    },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment 5B: Slack Post
      </h2>

      <p className="text-gray-700 dark:text-gray-300">
        For this module’s classroom engagement assignment, I participated in our
        class discussion on Slack. I replied to a fellow student’s post about
        learning JavaScript through Codecademy and shared that I’m still new to
        programming but finding resources like AWS docs helpful. I also posted a
        helpful link and encouraged other beginners to ask questions.
      </p>

      <ul className="ml-6 list-disc space-y-1 text-gray-700 dark:text-gray-300">
        <li>Replied to a peer’s post recommending Codecademy for JavaScript</li>
        <li>
          Mentioned my experience as a beginner and shared that AWS
          documentation helped
        </li>
        <li>Encouraged other beginners not to be afraid to ask questions</li>
        <li>Included a link to the AWS Lambda documentation</li>
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

export default ClassroomEngagementSlackPost5;
