// src/components/TagLegend.tsx

import { tagIcons } from "./TagIcons";

export const TagLegend = () => {
  return (
    <section className="w-full rounded-xl border bg-gradient-to-t from-gray-100 via-gray-200 to-gray-300 p-6 shadow-md dark:border-gray-700 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
        Icon Key
      </h2>

      <div className="flex flex-wrap gap-4">
        {tagIcons.map((item) => (
          <div key={item.label} className="flex items-center gap-3 px-3 py-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${item.bg}`}
            >
              {item.icon}
            </div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
