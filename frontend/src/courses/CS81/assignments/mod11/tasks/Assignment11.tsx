import { useState } from "react";

import ContactFormPage from "@/components/ContactFormPage";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import ComponentRenderModal from "@/components/ComponentRenderModal";
import {
  CloseModalButton,
  DownloadAssignmentBundleButton,
  ToggleScreenshotButton,
  ExternalLinkButton,
  ToggleModalButton,
} from "@/components/buttons";

const Assignment11 = () => {
  const [isRenderModalOpen, setIsRenderModalOpen] = useState(false);
  const [showScreenshots, setShowScreenshots] = useState(false);

  const screenshots = [
    {
      label: "Module 11 – Contact Form",
      src: "/code-playground/CS81/mod-11/module11-assignment11a-react-contact-form.png",
    },
  ];

  const files = [
    {
      fileUrl: "/code-playground/CS81/mod-11/README.md",
      filename: "README.md",
    },
    {
      fileUrl:
        "/code-playground/CS81/mod-11/module11-assignment11a-react-contact-form.png",
      filename: "module11-assignment11a-react-contact-form.png",
    },
    {
      fileUrl: "/code-playground/CS81/mod-11/module11-contact-form.zip",
      filename: "module11-contact-form.zip",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Assignment 11 – React Contact Form</h2>

      <div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Try switching between <code>Plain</code> and <code>Styled</code> forms
          to compare implementations.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Objective
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          In this assignment, you'll build a React Contact Form using controlled
          components and <code>useState</code>. You'll practice real-time input
          handling, validation, and dynamic data rendering using JSX.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Project Description
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Create a <strong>"Contact Us"</strong> form with inputs for Name,
          Email, and Message. On submit, validate fields, show formatted data
          using <code>JSON.stringify()</code>, and optionally clear the form.
        </p>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          Key Features
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>Two contact form components: minimal and styled</li>
          <li>Form validation for required fields and email format</li>
          <li>Confetti animation on successful form submission</li>
          <li>
            Submitted data preview using <code>JSON.stringify</code>
          </li>
          <li>Button-based form selection with hover effects</li>
          <li>React Router-based navigation between Home and Contact pages</li>
          <li>Scroll-aware footer that appears at bottom on scroll-up</li>
        </ul>
      </div>

      <div>
        <h3 className="text-md mb-1 font-semibold text-gray-700 dark:text-gray-300">
          What I Learned
        </h3>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>
            React fundamentals: <code>useState</code>, event handling
          </li>
          <li>Basic form validation & controlled components</li>
          <li>Component-based project structure and reusability</li>
          <li>Styling using Tailwind, gradients, hover states</li>
          <li>React Router setup and page routing</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ToggleModalButton
          isOpen={isRenderModalOpen}
          label="Preview Homework"
          toggle={() => setIsRenderModalOpen(!isRenderModalOpen)}
        />
        <DownloadAssignmentBundleButton files={files} />
        <ToggleScreenshotButton
          show={showScreenshots}
          toggle={() => setShowScreenshots(!showScreenshots)}
        />
        <ExternalLinkButton
          href="https://github.com/sergehall/cs81-module11-form"
          label="View Solution on GitHub"
        />
      </div>

      {/* Component Modal Preview */}
      {isRenderModalOpen && (
        <ComponentRenderModal
          title="React Contact Form"
          description="Choose between a plain or styled form, then submit your message."
          onClose={() => setIsRenderModalOpen(false)}
          renderCloseButton={
            <CloseModalButton onClick={() => setIsRenderModalOpen(false)} />
          }
        >
          <ContactFormPage />
        </ComponentRenderModal>
      )}

      {showScreenshots && <ScreenshotGallery screenshots={screenshots} />}
    </div>
  );
};

export default Assignment11;
