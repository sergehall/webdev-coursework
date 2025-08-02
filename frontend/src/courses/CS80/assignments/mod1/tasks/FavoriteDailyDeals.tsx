import { useState } from "react";
import { Globe } from "lucide-react";

import TogglePreviewButton from "@/components/buttons/TogglePreviewButton";
import { DownloadHtmlButton } from "@/components/buttons";

const FavoriteDailyDeals = () => {
  const [showPreview, setShowPreview] = useState(false);

  const sites = [
    { name: "Groupon", url: "https://www.groupon.com" },
    { name: "Living Social", url: "https://www.livingsocial.com" },
    { name: "Slickdeals", url: "https://www.slickdeals.net" },
    { name: "DealNews", url: "https://www.dealnews.com" },
    { name: "RetailMeNot", url: "https://www.retailmenot.com" },
  ];

  return (
    <div className="space-y-4">
      {/* Task prompt block */}
      <div className="rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-2 text-[0.95rem] font-medium italic text-yellow-800 dark:border-gray-600 dark:bg-gray-500/40 dark:text-gray-100">
        <strong>Task:</strong> Create an HTML5 document that contains links to
        your five favorite daily deals websites (possibly Groupon, Living
        Social, etc.). Your page should contain the heading “My Favorite Daily
        Deals Web Sites.” Click on each of these links to test your page.
      </div>

      {/* Buttons */}
      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <TogglePreviewButton
          isPreviewShown={showPreview}
          toggle={() => setShowPreview(!showPreview)}
        />

        <DownloadHtmlButton
          fileUrl="/sandbox/CS80/mod-1/favorite-daily-deals.html"
          filename="favorite-daily-deals.html"
        />
      </div>

      {/* Preview / Code */}
      <div className="rounded-md border border-gray-300 bg-white p-4 transition-all dark:border-gray-700 dark:bg-gray-900">
        {showPreview ? (
          <div>
            <h1 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-100">
              My Favorite Daily Deals Web Sites
            </h1>
            <ul className="flex flex-col gap-2">
              {sites.map(({ name, url }) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 font-medium text-blue-700 no-underline shadow-sm transition-colors hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-blue-900"
                  >
                    <Globe size={18} />
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap text-sm text-gray-100 dark:text-gray-100">
            &lt;!-- HTML file preview hidden. Click "Show Preview" --&gt;
          </pre>
        )}
      </div>
    </div>
  );
};

export default FavoriteDailyDeals;
