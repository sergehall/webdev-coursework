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
    <div className="divide-y divide-gray-200 rounded-xl border bg-gradient-to-t from-gray-100 via-gray-200 to-gray-300 p-6 dark:border-gray-700 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
      {programSections.map((section, idx) => {
        const isOpen = openIndex === idx;
        return (
          <section key={section.title} className="py-5">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(idx)}
              className="flex w-full items-center gap-4 text-left text-2xl font-semibold text-slate-800 outline-none dark:text-white"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors ${
                  isOpen ? "bg-blue-600" : "bg-yellow-400"
                }`}
              >
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
              </span>
              {section.title}
            </button>

            {isOpen && (
              <div className="mt-4 rounded-md p-4 text-base leading-7 text-slate-700 dark:text-gray-200">
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
