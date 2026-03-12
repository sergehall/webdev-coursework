// src/components/TagLegend.tsx

import { tagIcons } from "./TagIcons";

export const TagLegend = () => {
  return (
    <section className="w-full rounded-xl border bg-gradient-to-t from-gray-100 via-gray-200 to-gray-300 px-4 py-2 shadow-md dark:border-gray-700 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 sm:px-5 sm:py-2">
      <h2 className="mb-2 text-lg font-normal text-gray-900 dark:text-gray-100">
        Icon Key
      </h2>

      <div className="overflow-x-auto py-1">
        <div className="flex min-w-max items-center gap-3">
          {tagIcons.map((item) => (
            <div
              key={item.label}
              className="flex shrink-0 items-center gap-2 rounded-md px-2 py-1"
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full ${item.bg}`}
              >
                {item.icon}
              </div>
              <span className="text-sm font-normal text-gray-800 dark:text-gray-200">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
