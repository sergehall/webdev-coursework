import { useState } from "react";

import StudentCardList from "@/components/StudentCardList";
import { studentData } from "@/data/studentData";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import ComponentRenderModal from "@/components/ComponentRenderModal";
import {
  CloseModalButton,
  DownloadAssignmentBundleButton,
  ToggleScreenshotButton,
  ExternalLinkButton,
  ToggleModalButton,
} from "@/components/buttons";

const Assignment10A = () => {
  const [isRenderModalOpen, setIsRenderModalOpen] = useState(false);
  const [showScreenshots, setShowScreenshots] = useState(false);

  const studentArray = [studentData];

  const screenshots = [
    {
      label: "StudentCard with Comments",
      src: "/code-playground/CS81/mod-10/A/StudentCard-Component.png",
    },
  ];

  const files = [
    {
      fileUrl: "/code-playground/CS81/mod-10/A/README.md",
      filename: "README.md",
    },
    {
      fileUrl: "/code-playground/CS81/mod-10/A/StudentCard-Component.png",
      filename: "StudentCard-Component.png",
    },
    {
      fileUrl:
        "/code-playground/CS81/mod-10/A/module10a-studentcard-review.zip",
      filename: "module10a-studentcard-review.zip",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Assignment 10A – Code Review: StudentCard Component
      </h2>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-100">
          Project Description
        </h3>
        <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
          This React code review task focuses on understanding how{" "}
          <code>props</code> and <code>state</code> work inside a component.
          You’ll review a pre-written <code>StudentCard</code> component and add
          inline comments that explain its structure, logic, and interactivity.
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Your main goal is to document the usage of props, the role of{" "}
          <code>useState</code>, and how the component renders conditionally
          based on user interaction.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Key Objectives
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Understand how props are passed to components to customize output.
          </li>
          <li>
            Use <code>useState</code> to toggle bio visibility in the card.
          </li>
          <li>Document the code with meaningful and clear inline comments.</li>
          <li>Improve your understanding of real-world component logic.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Submission Instructions
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Submit a ZIP archive named{" "}
            <code>module10a-studentcard-review.zip</code> containing all source
            code, including <code>StudentCard.jsx</code>, <code>README.md</code>
            , and any assets.
          </li>
          <li>
            Share your GitHub repo link:
            <br />
            <a
              href="https://github.com/sergehall/module10a-studentcard-review"
              target="_blank"
              rel="noreferrer"
              className="text-gray-700 no-underline transition-colors hover:text-blue-500 hover:underline dark:text-gray-300"
            >
              https://github.com/sergehall/module10a-studentcard-review
            </a>
          </li>
          <li>
            Include a screenshot of the StudentCard component and your inline
            comments.
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
          href="https://github.com/sergehall/module10a-studentcard-review"
          label="View Solution on GitHub"
        />
      </div>

      {/* Component Render Modal */}
      {isRenderModalOpen && (
        <ComponentRenderModal
          title="StudentCard Component"
          onClose={() => setIsRenderModalOpen(false)}
          renderCloseButton={
            <CloseModalButton onClick={() => setIsRenderModalOpen(false)} />
          }
        >
          <StudentCardList students={studentArray} />
          {/*<StudentCard />*/}
        </ComponentRenderModal>
      )}
      {showScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </div>
  );
};

export default Assignment10A;
