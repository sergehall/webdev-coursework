// src/components/CompletionCelebration.tsx

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Wand2 } from "lucide-react";

export default function CompletionCelebration() {
  useEffect(() => {
    void confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      ticks: 200,
    });
  }, []);

  return (
    <motion.div
      className="mt-12 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="relative w-full max-w-xl rounded-2xl border border-blue-400 bg-gradient-to-br from-emerald-50 via-sky-100 to-blue-100 px-8 py-6 text-center text-gray-800 shadow-2xl dark:border-emerald-500 dark:from-emerald-900/20 dark:via-lime-900/10 dark:to-yellow-900/10 dark:text-white"
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="absolute -top-6 left-1/2 -translate-x-1/2 transform rounded-full bg-emerald-500 p-2 shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Trophy className="h-8 w-8 text-white" />
        </motion.div>

        <h2 className="mb-2 mt-4 text-3xl font-extrabold tracking-tight">
          All Modules Completed!
        </h2>

        <p className="mb-3 flex items-center justify-center gap-2 text-xl">
          <Wand2 className="h-5 w-5 text-purple-500" />
          You’re a{" "}
          <span className="underline decoration-purple-500 decoration-wavy">
            Web Wizard
          </span>
          <Sparkles className="h-5 w-5 text-yellow-400" />
        </p>

        <p className="text-sm italic text-gray-600 dark:text-gray-300">
          Your journey through the code realms is complete.
        </p>

        <motion.div
          className="mt-4 flex justify-center gap-3 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.span
            className="text-emerald-400"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
          >
            ✨
          </motion.span>
          <motion.span
            className="text-yellow-500"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
          >
            🚀
          </motion.span>
          <motion.span
            className="text-purple-400"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.9 }}
          >
            🌐
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
