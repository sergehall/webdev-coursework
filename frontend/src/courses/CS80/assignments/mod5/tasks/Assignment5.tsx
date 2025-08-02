import { useState } from "react";

import {
  ToggleModalButton,
  DownloadAssignmentBundleButton,
  DownloadHtmlButton,
  CloseModalButton,
} from "@/components/buttons";

const Assignment5 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const files = [
    {
      fileUrl: "/sandbox/CS80/mod-5/form.html",
      filename: "form.html",
    },
    {
      fileUrl: "/sandbox/CS80/mod-5/nutrition.xml",
      filename: "nutrition.xml",
    },
    {
      fileUrl: "/sandbox/CS80/mod-5/nutrition.json",
      filename: "nutrition.json",
    },
    {
      fileUrl: "/sandbox/CS80/mod-5/nutrition.dtd",
      filename: "nutrition.dtd",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Assignment description */}
      <div className="space-y-2 rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-3 text-[0.95rem] font-medium text-yellow-800 dark:border-gray-600 dark:bg-gray-500/40 dark:text-gray-100">
        <p>
          <strong>Assignment – Mod 5:</strong> Simple Form and Nutrition Facts
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Problem 1:</strong> Create a jQuery-powered form with three
            number inputs.
            <ul className="list-disc pl-5">
              <li>Input A and B accept numbers.</li>
              <li>
                Clicking the button sums A + B and places the result in C.
              </li>
              <li>Hovering over C clears all inputs.</li>
              <li>All logic must use the jQuery library.</li>
            </ul>
          </li>
          <li>
            <strong>Problem 2 – 15.7:</strong> Nutrition Information
            <ul className="list-disc pl-5">
              <li>
                <em>Part 1:</em> Create an XML document{" "}
                <code>nutrition.xml</code> describing nutrition facts for
                Grandma White’s cookies. Include product name, serving size,
                calories, fat, sodium, etc.
              </li>
              <li>
                <em>Part 2:</em> Convert the XML structure into{" "}
                <code>nutrition.json</code>.
              </li>
              <li>
                <strong>Note:</strong> A DTD is optional, but included in this
                solution as <code>nutrition.dtd</code> to support custom
                validation and tooling.
              </li>
            </ul>
          </li>
        </ul>
        <p>
          <strong>Preview:</strong> This form and nutrition data rendering can
          be viewed live using the modal below.
        </p>
      </div>

      {/* Action buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ToggleModalButton
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen(!isModalOpen)}
          label={"Preview Homework"}
        />
        <DownloadAssignmentBundleButton files={files} />
        <DownloadHtmlButton
          fileUrl="/sandbox/CS80/mod-5/form.html"
          filename="form.html"
          label="View HTML Only"
        />
      </div>

      {/* Modal preview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative h-[90vh] w-[95%] max-w-6xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-900">
            <CloseModalButton onClick={() => setIsModalOpen(false)} />
            <iframe
              src="/sandbox/CS80/mod-5/form.html"
              className="h-full w-full border-none"
              title="Assignment 5 Preview"
              sandbox="allow-scripts allow-same-origin allow-modals"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignment5;
