import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useEffect, useMemo, useState } from "react";

const gridSize = 3;

const FinalProjectReveal = ({
  completedTasks,
  totalTasks,
  imageUrl,
}: {
  completedTasks: number;
  totalTasks: number;
  imageUrl: string;
}) => {
  const totalPieces = gridSize * gridSize;
  const revealCount = Math.min(completedTasks, totalTasks);
  const progress = Math.floor((revealCount / totalTasks) * totalPieces);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Generate a shuffled array of piece indices to randomize reveal order
  const shuffledOrder = useMemo(() => {
    return Array.from({ length: totalPieces }, (_, i) => i).sort(
      () => Math.random() - 0.5
    );
  }, [totalPieces]);

  // Set initial window size for confetti rendering
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    // Full-width outer container, with dark gradient background
    <div className="relative mx-auto mt-10 w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-2xl">
      {/* Title */}
      <h2 className="mb-4 text-center text-3xl font-extrabold text-white">
        Project Complete!
      </h2>

      {/* Progress bar */}
      <div className="mb-6 h-2 w-full overflow-hidden rounded bg-gray-700">
        <motion.div
          className="h-full bg-green-400"
          initial={{ width: 0 }}
          animate={{ width: `${(progress / totalPieces) * 100}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Puzzle grid with scaling entrance animation */}
      <motion.div
        className="grid aspect-[16/9] w-full overflow-hidden rounded-md"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {/* Render each puzzle piece */}
        {Array.from({ length: totalPieces }).map((_, i) => {
          const row = Math.floor(i / gridSize);
          const col = i % gridSize;
          const flatIndex = i;

          const appearIndex = shuffledOrder.indexOf(flatIndex);
          const isVisible = appearIndex < progress;

          return (
            <motion.div
              key={flatIndex}
              initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.6,
                rotate: isVisible ? 0 : -10,
              }}
              transition={{
                delay: appearIndex * 0.1, // staggered reveal
                duration: 0.6,
                ease: "easeInOut",
              }}
              className="relative h-full w-full"
            >
              {/* Individual tile styling with background image clipping */}
              <div
                className={`absolute inset-0 bg-cover bg-no-repeat transition duration-300 ${
                  isVisible ? "shadow-lg ring-2 ring-white/30" : ""
                }`}
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundPosition: `${(col / (gridSize - 1)) * 100}% ${(row / (gridSize - 1)) * 100}%`,
                  backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Confetti animation when fully revealed */}
      {progress === totalPieces && (
        <>
          <Confetti width={windowSize.width} height={windowSize.height} />
        </>
      )}
    </div>
  );
};

export default FinalProjectReveal;
