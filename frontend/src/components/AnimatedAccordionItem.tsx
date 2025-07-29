import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AnimatedAccordionItem({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm transition-all dark:border-gray-700">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between bg-white px-4 py-3 text-left transition hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
      >
        <span className="text-base font-medium text-gray-800 dark:text-gray-100">
          {title}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
