// frontend/src/components/FinalProjectReveal.tsx
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useEffect, useMemo, useState } from "react";

import ExitFullscreenButton from "@/components/buttons/ExitFullscreenButton";

const gridSize = 3;
const puzzleColumnOffsets = ["left-0", "left-[-100%]", "left-[-200%]"];
const puzzleRowOffsets = ["top-0", "top-[-100%]", "top-[-200%]"];

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
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const shuffledOrder = useMemo(() => {
    return Array.from({ length: totalPieces }, (_, i) => i).sort(
      () => Math.random() - 0.5
    );
  }, [totalPieces]);

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerClasses = isFullscreen
    ? "fixed inset-0 z-50 bg-gradient-to-br from-gray-800 to-gray-900 p-6 overflow-hidden"
    : "relative mx-auto mt-10 w-full rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-2xl overflow-hidden";

  return (
    <>
      {/* Fullscreen confetti layer */}
      {progress === totalPieces && (
        <div className="pointer-events-none fixed inset-0 z-[9999]">
          <Confetti width={windowSize.width} height={windowSize.height} />
        </div>
      )}

      <div className={containerClasses}>
        {/* Exit Fullscreen Button */}
        {isFullscreen && (
          <ExitFullscreenButton
            onClick={() => setIsFullscreen(false)}
            className="absolute bottom-6 left-1/2 z-[10000] -translate-x-1/2"
          />
        )}

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

        {/* Puzzle grid */}
        <motion.div
          className="grid aspect-[16/9] w-full grid-cols-3 grid-rows-3 overflow-hidden rounded-md"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
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
                  delay: appearIndex * 0.1,
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                className="relative h-full w-full overflow-hidden"
              >
                <img
                  src={imageUrl}
                  alt=""
                  className={`absolute h-[300%] w-[300%] max-w-none object-cover transition duration-300 ${
                    isVisible ? "shadow-lg ring-2 ring-white/30" : ""
                  } ${puzzleColumnOffsets[col]} ${puzzleRowOffsets[row]}`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </>
  );
};

export default FinalProjectReveal;
