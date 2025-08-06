import { useState } from "react";

import UserProfileList from "@/components/UserProfileList";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import { userProfiles } from "@/data/userProfiles";
import CodePreviewModal from "@/components/CodePreviewModal";
import ComponentRenderModal from "@/components/ComponentRenderModal";
import {
  OpenCodeModalButton,
  CloseModalButton,
  DownloadAssignmentBundleButton,
  ToggleScreenshotButton,
  ExternalLinkButton,
  ToggleModalButton,
} from "@/components/buttons";

const Assignment9A = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRenderModalOpen, setIsRenderModalOpen] = useState(false);
  const [showScreenshots, setShowScreenshots] = useState(false);
  const screenshots = [
    {
      label:
        "Here is an example of the final component rendering multiple users inside a responsive modal.",
      src: "/code-playground/CS81/mod-9/A/user-profiles.png",
    },
  ];

  const files = [
    {
      fileUrl: "/code-playground/CS81/mod-9/A/UserProfile.jsx",
      filename: "UserProfile.jsx",
    },
    {
      fileUrl: "/code-playground/CS81/mod-9/A/module9a-firstreact.zip",
      filename: "module9a-firstreact.zip",
    },
    {
      fileUrl: "/code-playground/CS81/mod-9/A/user-profiles.png",
      filename: "user-profiles.png",
    },
    {
      fileUrl: "/code-playground/CS81/mod-9/A/README.md",
      filename: "README.md",
    },
  ];

  const file = {
    fileUrl: "/code-playground/CS81/mod-9/A/UserProfile.jsx",
    filename: "UserProfile.jsx",
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Assignment 9A – Build Your First React Component
      </h2>
      <p className="max-w-2xl space-y-1 text-sm text-gray-700 dark:text-gray-300">
        <ul className="list-inside list-disc space-y-1">
          <li>Set up a React app using Vite with JavaScript template</li>
          <li>
            Create a functional <strong>UserProfile</strong> component
          </li>
          <li>Display a name, bio, and profile image inside the component</li>
          <li>Apply inline styles (initially), then switch to Tailwind</li>
          <li>
            Render the component inside <code>App.jsx</code>
          </li>
          <li>(Bonus) Support multiple profiles and add another component</li>
          <li>
            Create a <code>README.md</code> with description, learnings, and
            screenshot
          </li>
          <li>Push your code to GitHub and submit via Canvas</li>
          <li>
            A ZIP archive named <code>module9a-firstreact.zip</code> containing
            all source files of your completed React assignment (including .jsx,
            .js, .css, and configuration files).
          </li>
          <li>
            Files: UserProfile.jsx, README.md, user-profiles.png,
            UserProfile.jsx, module9a-firstreact.zip
          </li>
        </ul>
      </p>

      {/* Action Buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <OpenCodeModalButton
          onClick={() => setIsModalOpen(true)}
          label={"Show starter code JSX"}
        />
        <ToggleModalButton
          isOpen={isModalOpen}
          label={"Preview Homework"}
          toggle={() => setIsModalOpen(true)}
        />
        <DownloadAssignmentBundleButton files={files} />
        <ToggleScreenshotButton
          show={showScreenshots}
          toggle={() => setShowScreenshots(!showScreenshots)}
        />
        <ExternalLinkButton
          href="https://github.com/sergehall/module9a-firstreact"
          label="View Solution on GitHub"
        />
      </div>

      {/* Code Modal */}
      {isModalOpen && (
        <CodePreviewModal
          fileUrl={file.fileUrl}
          filename={file.filename}
          onClose={() => setIsModalOpen(false)}
          renderCloseButton={
            <CloseModalButton onClick={() => setIsModalOpen(false)} />
          }
        />
      )}

      {/* Component Render Modal */}
      {isRenderModalOpen && (
        <ComponentRenderModal
          title="User Profiles:"
          onClose={() => setIsRenderModalOpen(false)}
          renderCloseButton={
            <CloseModalButton onClick={() => setIsRenderModalOpen(false)} />
          }
        >
          <UserProfileList users={userProfiles} />
        </ComponentRenderModal>
      )}
      {showScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </div>
  );
};

export default Assignment9A;
