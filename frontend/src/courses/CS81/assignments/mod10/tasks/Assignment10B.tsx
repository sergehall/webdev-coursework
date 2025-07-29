import { useState } from "react";

import DynamicProfile from "@/components/DynamicProfile";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import ComponentRenderModal from "@/components/ComponentRenderModal";
import {
  CloseModalButton,
  DownloadAssignmentBundleButton,
  ToggleScreenshotButton,
  ExternalLinkButton,
  ToggleModalButton,
} from "@/components/buttons";

const Assignment10B = () => {
  const [isRenderModalOpen, setIsRenderModalOpen] = useState(false);
  const [showScreenshots, setShowScreenshots] = useState(false);

  const screenshots = [
    {
      label: "Dynamic Profile Component",
      src: "/sandbox/mod-10/B/profile.png",
    },
  ];

  const files = [
    {
      fileUrl: "/sandbox/mod-10/B/README.md",
      filename: "README.md",
    },
    {
      fileUrl: "/sandbox/mod-10/B/profile.png",
      filename: "profile.png",
    },
    {
      fileUrl: "/sandbox/mod-10/B/module10a-profile.zip",
      filename: "module10a-profile.zip",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Assignment 10B – Dynamic Profile Search
      </h2>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Project Description
        </h3>
        <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
          This React project demonstrates how to use props and state to build an
          interactive, searchable profile component. Students create a custom
          profile card (e.g. for a developer, artist, or teacher) and display
          additional info via toggleable state.
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Example names you can search: <code>Serge Hall</code>,{" "}
          <code>Ravi Patel</code>, <code>Lina Gomez</code>,{" "}
          <code>Marco Rossi</code>.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Key Features
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Profile component that accepts props like name, image, role, and fun
            fact.
          </li>
          <li>
            Expandable bio section using the <code>useState</code> hook.
          </li>
          <li>
            Search input to find a profile by name with live matching and
            validation.
          </li>
          <li>
            Hover effects on email and GitHub links with icon support via{" "}
            <code>react-icons</code>.
          </li>
          <li>Responsive design with custom styles in a separate CSS file.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Submission Instructions
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            ZIP archive named <code>module10b-dynamic-profile.zip</code> with
            source code, styles, and assets.
          </li>
          <li>
            GitHub repository:
            <br />
            <a
              href="https://github.com/sergehall/module10a-profile"
              target="_blank"
              rel="noreferrer"
              className="text-gray-700 no-underline transition-colors hover:text-blue-500 hover:underline dark:text-gray-300"
            >
              https://github.com/sergehall/module10a-profile
            </a>
          </li>
          <li>
            Screenshot of the profile with expanded bio view and icons visible.
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
          href="https://github.com/sergehall/module10a-profile"
          label="View Solution on GitHub"
        />
      </div>

      {/* Component Render Modal */}
      {isRenderModalOpen && (
        <ComponentRenderModal
          title="User profiles"
          description="Example user profiles you can search: Serge Hall, Ravi Patel, Lina Gomez, Marco Rossi."
          onClose={() => setIsRenderModalOpen(false)}
          renderCloseButton={
            <CloseModalButton onClick={() => setIsRenderModalOpen(false)} />
          }
        >
          <DynamicProfile />
        </ComponentRenderModal>
      )}
      {showScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </div>
  );
};

export default Assignment10B;
