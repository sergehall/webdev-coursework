// src/assignments/mod3/tasks/ClassroomEngagementSlackPost.tsx
import { useState } from "react";

import { ToggleScreenshotButton } from "@/components/buttons";
import ScreenshotGallery from "@/components/ScreenshotGallery";

const ClassroomEngagementSlackPost = () => {
  const [showScreenshots, setShowScreenshots] = useState(false);
  const screenshots = [
    {
      label: "Slack Module 3 discussion screenshot",
      src: "/sandbox/CS81/mod-3/slack-post/slack-post.png",
    },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Assignment 3B: Slack Post – Module 3 Engagement
      </h2>

      <p className="text-gray-700 dark:text-gray-300">
        For this module’s classroom engagement assignment, I participated in our
        class discussion on Slack. I shared my experience with using Git and
        GitHub in Module 3A, posted a tip for classmates, and asked a discussion
        question about JavaScript functions. I also replied to a peer's post
        about Udemy and shared my thoughts on learning platforms.
      </p>

      <ul className="ml-6 list-disc space-y-1 text-gray-700 dark:text-gray-300">
        <li>
          Posted an original message with tips about <code>git status</code> and{" "}
          <code>git remote</code>
        </li>
        <li>
          Started a conversation asking about first function ideas in{" "}
          <code>journal.js</code>
        </li>
        <li>
          Replied to another student’s post about Udemy and certification prep
        </li>
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

export default ClassroomEngagementSlackPost;
