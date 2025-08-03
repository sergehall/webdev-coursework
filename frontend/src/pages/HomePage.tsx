import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { technologies } from "@/data/technologies";

export default function HomePage() {
  const [openCourse, setOpenCourse] = useState<string | null>(null);

  const toggleCourse = (courseName: string) => {
    setOpenCourse((prev) => (prev === courseName ? null : courseName));
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl"
      >
        <h1 className="mb-10 bg-gradient-to-r from-indigo-500 via-sky-400 to-cyan-400 bg-clip-text text-5xl font-extrabold text-transparent drop-shadow-lg">
          Welcome to the Web Developer Learning Portal
        </h1>

        <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white sm:text-2xl">
          Explore the technologies you'll master throughout each course module.
        </h3>

        <p className="mb-10 text-sm italic text-gray-500 dark:text-gray-400">
          Select a course to view its full technology stack.
        </p>

        {Object.entries(technologies).map(([courseName, techList]) => (
          <div
            key={courseName}
            className={`mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 shadow-md transition-colors dark:border-gray-700 ${
              courseName.includes("Python")
                ? "bg-emerald-100 dark:bg-emerald-900/40"
                : courseName.includes("JavaScript")
                  ? "bg-orange-100 dark:bg-orange-900/40"
                  : "bg-blue-100 dark:bg-blue-900/40"
            }`}
          >
            {/* Collapsible Header */}
            <button
              onClick={() => toggleCourse(courseName)}
              className="flex w-full items-center justify-between text-left text-xl font-bold text-gray-800 dark:text-white"
            >
              {courseName}
              <span className="text-lg">
                {openCourse === courseName ? "−" : "+"}
              </span>
            </button>

            {/* Description could go here if needed */}

            {/* Technologies list with animation */}
            <AnimatePresence initial={false}>
              {openCourse === courseName && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-4 pb-2 sm:grid-cols-3 lg:grid-cols-4">
                    {techList.map(({ icon: Icon, color, label, url }) => (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 text-gray-800 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-100 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                      >
                        <Icon className={`h-5 w-5 ${color}`} />
                        <span className="font-medium">{label}</span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <Link
          to="/coursework"
          className="mt-8 inline-block transform rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-400 px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg transition-transform hover:scale-105 hover:from-emerald-600 hover:to-lime-500"
        >
          Enter the Coursework & Assignments Portal
        </Link>
      </motion.div>
    </main>
  );
}
