// src/components/PathwaySections.tsx

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

import { programSections } from "@/constants/programSections";

const PathwaySections = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="divide-y divide-gray-200 rounded-xl border bg-gradient-to-t from-gray-100 via-gray-200 to-gray-300 px-4 py-0 dark:border-gray-700 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 sm:px-5">
      {programSections.map((section, idx) => {
        const isOpen = openIndex === idx;
        return (
          <section
            key={section.title}
            className="py-3 first:pt-2 last:pb-2 sm:py-3.5"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(idx)}
              className="flex w-full items-center gap-3 text-left text-lg font-normal text-slate-800 outline-none dark:text-white sm:text-xl"
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-white transition-colors sm:h-8 sm:w-8 ${
                  isOpen ? "bg-blue-600" : "bg-yellow-400"
                }`}
              >
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
              {section.title}
            </button>

            {isOpen && (
              <div className="mt-2.5 rounded-md p-2 text-sm leading-6 text-slate-700 dark:text-gray-200 sm:p-3">
                {section.content}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default PathwaySections;
