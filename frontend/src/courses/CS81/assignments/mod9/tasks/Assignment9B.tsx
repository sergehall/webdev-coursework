import { useState } from "react";

import { userProfilesWithContact } from "@/data/userProfilesWithContact";
import UserProfileListWithContact from "@/components/UserProfileListWithContact";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import ComponentRenderModal from "@/components/ComponentRenderModal";
import {
  CloseModalButton,
  DownloadAssignmentBundleButton,
  ToggleScreenshotButton,
  ExternalLinkButton,
  ToggleModalButton,
} from "@/components/buttons";

const Assignment9B = () => {
  const [isRenderModalOpen, setIsRenderModalOpen] = useState(false);
  const [showScreenshots, setShowScreenshots] = useState(false);
  const screenshots = [
    {
      label:
        "Here is an example of the final component rendering multiple users inside a responsive modal.",
      src: "/sandbox/CS81/mod-9/B/Module-9-Assignment-9B.png",
    },
  ];

  const files = [
    {
      fileUrl: "/sandbox/CS81/mod-9/B/README.md",
      filename: "README.md",
    },
    {
      fileUrl: "/sandbox/CS81/mod-9/B/Module-9-Assignment-9B.png",
      filename: "Module-9-Assignment-9B.png",
    },
    {
      fileUrl: "/sandbox/CS81/mod-9/B/Module9B_README.pdf",
      filename: "Module9B_README.pdf",
    },
    {
      fileUrl: "/sandbox/CS81/mod-9/B/module9b-profile.zip",
      filename: "module9b-profile.zip",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Assignment 9B – Custom Profile Component
      </h2>
      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Project Features
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            UserProfileInline component styled entirely with inline CSS, as
            required by the assignment.
          </li>
          <li>
            ContactCard subcomponent that displays email and GitHub contact
            information, also using inline styles.
          </li>
          <li>
            Hover effects added to profile cards and links for visual
            interactivity.
          </li>
          <li>
            A sample data set of frontend-related users stored in
            frontendProfiles.js.
          </li>
          <li>
            Optional UserProfile component using external class-based styling
            for scalability beyond the assignment.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Submission Instructions
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            A ZIP archive named <code>module9b-profile.zip</code> containing all
            source files of your completed React assignment (including .jsx,
            .js, .css, and configuration files).
          </li>
          <li>
            A link to your GitHub repository:
            <br />
            <a
              href="https://github.com/sergehall/module9b-profile"
              target="_blank"
              rel="noreferrer"
              className="text-gray-700 no-underline transition-colors hover:text-blue-500 hover:underline dark:text-gray-300"
            >
              https://github.com/sergehall/module9b-profile
            </a>
          </li>
          <li>
            A screenshot of your rendered UserProfile components (showing
            layout, styling, and ContactCard).
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ToggleModalButton
          isOpen={isRenderModalOpen}
          label={"Preview Homework"}
          toggle={() => setIsRenderModalOpen(!isRenderModalOpen)}
        />
        <DownloadAssignmentBundleButton files={files} />
        <ToggleScreenshotButton
          show={showScreenshots}
          toggle={() => setShowScreenshots(!showScreenshots)}
        />
        <ExternalLinkButton
          href="https://github.com/sergehall/module9b-profile"
          label="View Solution on GitHub"
        />
      </div>

      {/* Component Render Modal */}
      {isRenderModalOpen && (
        <ComponentRenderModal
          title="User Profiles:"
          onClose={() => setIsRenderModalOpen(false)}
          renderCloseButton={
            <CloseModalButton onClick={() => setIsRenderModalOpen(false)} />
          }
        >
          <UserProfileListWithContact users={userProfilesWithContact} />
        </ComponentRenderModal>
      )}
      {showScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </div>
  );
};

export default Assignment9B;
