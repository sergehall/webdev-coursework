import { useState } from "react";

import { DownloadHtmlButton, TogglePreviewButton } from "@/components/buttons";

const HtmlOrderedListWithFlavors = () => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-4">
      {/* Task prompt block */}
      <div className="rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-2 text-[0.95rem] font-medium italic text-yellow-800 dark:border-gray-600 dark:bg-gray-500/40 dark:text-gray-100">
        <strong>Task:</strong> Create an HTML5 document containing an ordered
        list of three items—ice cream, soft serve and frozen yogurt. Each
        ordered list item should contain a nested, unordered list of your
        favorite flavors. Provide three flavors in each unordered list.
      </div>

      {/* Buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <TogglePreviewButton
          isPreviewShown={showPreview}
          toggle={() => setShowPreview(!showPreview)}
        />

        <DownloadHtmlButton
          fileUrl="/sandbox/CS80/mod-1/list-with-flavors.html"
          filename="list-with-flavors.html"
        />
      </div>

      {/* Preview / Code */}
      <div className="rounded-md border border-gray-300 bg-white p-4 transition-all dark:border-gray-700 dark:bg-gray-900">
        {showPreview ? (
          <div className="text-sm leading-relaxed text-gray-900 dark:text-gray-100">
            <ol className="list-inside list-decimal space-y-2">
              <li>
                Ice Cream
                <ul className="ml-4 list-inside list-disc">
                  <li>Chocolate</li>
                  <li>Vanilla</li>
                  <li>Strawberry</li>
                </ul>
              </li>
              <li>
                Soft Serve
                <ul className="ml-4 list-inside list-disc">
                  <li>Twist</li>
                  <li>Chocolate</li>
                  <li>Vanilla</li>
                </ul>
              </li>
              <li>
                Frozen Yogurt
                <ul className="ml-4 list-inside list-disc">
                  <li>Mango</li>
                  <li>Peach</li>
                  <li>Berry</li>
                </ul>
              </li>
            </ol>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap text-sm text-gray-100 dark:text-gray-100">
            {`<ol>
  <li>Ice Cream
    <ul>
      <li>Chocolate</li>
      <li>Vanilla</li>
      <li>Strawberry</li>
    </ul>
  </li>
  <li>Soft Serve
    <ul>
      <li>Twist</li>
      <li>Chocolate</li>
      <li>Vanilla</li>
    </ul>
  </li>
  <li>Frozen Yogurt
    <ul>
      <li>Mango</li>
      <li>Peach</li>
      <li>Berry</li>
    </ul>
  </li>
</ol>`}
          </pre>
        )}
      </div>
    </div>
  );
};

export default HtmlOrderedListWithFlavors;
