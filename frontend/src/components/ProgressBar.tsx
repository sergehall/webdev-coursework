"use client";

import { motion } from "framer-motion";

export default function ProgressBar({
  value,
  max,
}: {
  value: number;
  max: number;
}) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className="w-full max-w-md">
      <div className="mb-1 flex items-center justify-between text-sm font-medium tracking-wide text-gray-800 dark:text-gray-200">
        <span>
          {value} of {max} modules completed
        </span>
        <span>{percent}%</span>
      </div>

      <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-300 shadow-inner dark:bg-gray-700">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-green-500 to-green-400 dark:from-green-500 dark:to-emerald-500"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-full bg-white/5 mix-blend-overlay dark:bg-white/5" />
      </div>
    </div>
  );
}
