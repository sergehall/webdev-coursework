// frontend/src/pages/HomePage.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { technologies } from "@/data/technologies";

export default function HomePage() {
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
          Here’s a preview of the technologies you’ll master as you complete
          each course module.
        </h3>
        <div className="mb-6">
          <p className="text-sm italic text-gray-500 dark:text-gray-400">
            As you complete modules, new technologies will unlock and appear
            here.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {technologies.map(({ icon: Icon, color, label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 text-gray-800 shadow-sm backdrop-blur transition-all duration-200 hover:border-gray-300 hover:bg-gray-100 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              <Icon className={`h-5 w-5 ${color}`} />
              <span className="font-medium">{label}</span>
            </a>
          ))}
        </div>

        <Link
          to="/coursework"
          className="mt-4 inline-block transform rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-400 px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg transition-transform hover:scale-105 hover:from-emerald-600 hover:to-lime-500"
        >
          Enter the Coursework & Assignments Portal
        </Link>
      </motion.div>
    </main>
  );
}
