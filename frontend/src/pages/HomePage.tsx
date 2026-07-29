import { useCallback, useRef, useState, type TouchEvent } from "react";
import { motion } from "framer-motion";

import type { CourseName } from "@/data/technologies";
import CourseExplorer from "@/features/home/CourseExplorer";
import FeaturedProjects from "@/features/home/FeaturedProjects";
import HomeHero from "@/features/home/HomeHero";
import { cn } from "@/utils/cn";

const PULL_THRESHOLD = 96;
const MAX_PULL_DISTANCE = 132;
const PULL_DAMPING = 0.45;

type PullState = "idle" | "pulling" | "ready" | "refreshing";

type TouchGesture = {
  startX: number;
  startY: number;
  active: boolean;
  dragging: boolean;
};

export function reloadHomePage() {
  window.location.reload();
}

function clampPullDistance(distance: number) {
  return Math.min(distance * PULL_DAMPING, MAX_PULL_DISTANCE);
}

function isAtTop(container: HTMLElement | null) {
  return (
    window.scrollY <= 0 &&
    document.documentElement.scrollTop <= 0 &&
    (container?.scrollTop ?? 0) <= 0
  );
}

export default function HomePage() {
  return <HomePageContent onRefresh={reloadHomePage} />;
}

type HomePageContentProps = {
  readonly onRefresh?: () => void;
};

export function HomePageContent({
  onRefresh = reloadHomePage,
}: HomePageContentProps) {
  const [openCourse, setOpenCourse] = useState<CourseName | null>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [pullState, setPullState] = useState<PullState>("idle");
  const pageRef = useRef<HTMLDivElement | null>(null);
  const touchGestureRef = useRef<TouchGesture>({
    startX: 0,
    startY: 0,
    active: false,
    dragging: false,
  });

  const handleToggle = useCallback((courseName: CourseName) => {
    setOpenCourse((previous) => (previous === courseName ? null : courseName));
  }, []);

  const resetPullGesture = useCallback(() => {
    touchGestureRef.current = {
      startX: 0,
      startY: 0,
      active: false,
      dragging: false,
    };
    setPullDistance(0);
    setPullState("idle");
  }, []);

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    if (!touch || !isAtTop(pageRef.current)) {
      return;
    }

    touchGestureRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      active: true,
      dragging: false,
    };
  }, []);

  const handleTouchMove = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const touch = event.touches[0];
      const gesture = touchGestureRef.current;

      if (!touch || !gesture.active) {
        return;
      }

      const deltaX = touch.clientX - gesture.startX;
      const deltaY = touch.clientY - gesture.startY;

      if (deltaY <= 0 || !isAtTop(pageRef.current)) {
        resetPullGesture();
        return;
      }

      if (!gesture.dragging && Math.abs(deltaX) > Math.abs(deltaY)) {
        touchGestureRef.current.active = false;
        return;
      }

      touchGestureRef.current.dragging = true;

      const nextDistance = clampPullDistance(deltaY);

      setPullDistance(nextDistance);
      setPullState(nextDistance >= PULL_THRESHOLD ? "ready" : "pulling");
    },
    [resetPullGesture]
  );

  const handleTouchEnd = useCallback(() => {
    const shouldRefresh = pullDistance >= PULL_THRESHOLD;

    touchGestureRef.current = {
      startX: 0,
      startY: 0,
      active: false,
      dragging: false,
    };

    if (!shouldRefresh) {
      setPullDistance(0);
      setPullState("idle");
      return;
    }

    setPullState("refreshing");
    setPullDistance(0);
    onRefresh();
  }, [onRefresh, pullDistance]);

  const pullMessage =
    pullState === "ready"
      ? "Release to refresh"
      : pullState === "refreshing"
        ? "Refreshing..."
        : "Pull down to refresh";

  return (
    <div
      ref={pageRef}
      data-testid="home-page"
      className="relative min-h-full overflow-x-hidden px-2 pt-1 pb-3 sm:pt-2 sm:pb-4"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div
        aria-live="polite"
        className={cn(
          "pointer-events-none absolute top-3 left-1/2 z-20 -translate-x-1/2 rounded-full",
          "border border-sky-200 bg-white/90 px-4 py-2 text-xs font-semibold text-sky-700 shadow-sm",
          "transition-all duration-200 motion-reduce:transition-none",
          "dark:border-sky-900 dark:bg-slate-900/90 dark:text-sky-200",
          pullState === "idle" && pullDistance === 0
            ? "translate-y-[-1rem] opacity-0"
            : "translate-y-0 opacity-100"
        )}
      >
        {pullMessage}
      </div>

      <motion.div
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-8 transition-transform duration-200 motion-reduce:transition-none"
        animate={{ y: pullDistance > 0 ? pullDistance : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <HomeHero />
        <CourseExplorer openCourse={openCourse} onToggle={handleToggle} />
        <FeaturedProjects />
      </motion.div>
    </div>
  );
}
