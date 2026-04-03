// frontend/src/pages/HomePage.tsx
import {
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
  type TouchEvent,
} from "react";

import { technologies, type CourseName, type Tech } from "@/data/technologies";
import { gradientForCourse } from "@/ui/course-theme";
import { getIconComponent } from "@/ui/icons";
import { cn } from "@/utils/cn";
import { slugify } from "@/utils/slugify";

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

/** ------------------------------------------------------------------
 *  TechGrid (memoized)
 *  - Uses a fixed icon container ("icon box") to keep icon sizing consistent
 *    even when labels wrap across multiple lines.
 *  ------------------------------------------------------------------ */
const TechGrid = memo(function TechGrid({
  items,
  courseKey,
}: {
  items: readonly Tech[];
  courseKey: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 pb-2 sm:grid-cols-3 lg:grid-cols-4">
      {items.map(({ icon, color, label, url }) => {
        const Icon = getIconComponent(icon);
        const itemKey = `${courseKey}__${url}`;

        return (
          <a
            key={itemKey}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-3 rounded-xl border border-gray-200",
              "bg-white p-3 text-gray-800 shadow-sm",
              "transition-colors duration-200 motion-reduce:transition-none",
              "hover:border-gray-300 hover:bg-gray-100",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2",
              "dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            )}
          >
            {/* Fixed icon box for consistent optical sizing */}
            <span
              className={cn(
                "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                "bg-black/5 ring-1 ring-black/10",
                "dark:bg-white/5 dark:ring-white/10"
              )}
              aria-hidden="true"
            >
              <Icon size={20} strokeWidth={1.75} className={cn(color)} />
            </span>

            {/* Left-aligned label improves balance for multi-line text */}
            <span className="text-left text-sm font-medium leading-snug">
              {label}
            </span>
          </a>
        );
      })}
    </div>
  );
});

/** ------------------------------------------------------------------
 *  CourseRow (accordion row, memoized)
 *  ------------------------------------------------------------------ */
const CourseRow = memo(function CourseRow({
  name,
  items,
  open,
  onToggle,
}: {
  name: CourseName;
  items: readonly Tech[];
  open: boolean;
  onToggle: () => void;
}) {
  const slug = useMemo(() => slugify(name), [name]);
  const panelId = `course-panel-${slug}`;
  const buttonId = `course-button-${slug}`;
  const gradient = useMemo(() => gradientForCourse(name), [name]);

  return (
    <div className="w-full">
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Escape" && open) onToggle();
        }}
        className={cn(
          // Layout & a11y
          "group relative isolate grid w-full grid-cols-[1fr_auto] items-center text-left",
          "rounded-xl border border-gray-100 dark:border-gray-700",
          "px-4 py-2 sm:px-5 sm:py-3",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2",
          // Text never changes color on hover
          "text-gray-900 dark:text-white",
          // Same gradient for mobile & desktop
          "bg-gradient-to-l",
          gradient,
          "shadow-sm",
          // Prefer reduced motion
          "transition-colors duration-200 ease-in-out motion-reduce:transition-none"
        )}
      >
        {/* Hover overlay darkens ONLY the background, not the text */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-xl",
            "bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/25",
            "transition-colors duration-200 motion-reduce:transition-none"
          )}
        />

        <span className="relative z-10 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold sm:text-base">{name}</span>
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-md bg-black/10 dark:bg-white/10"
          >
            {open ? "−" : "+"}
          </span>
        </span>
      </button>

      {open && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="px-2 pt-2 sm:px-3"
        >
          <TechGrid items={items} courseKey={panelId} />
        </div>
      )}
    </div>
  );
});

/** ------------------------------------------------------------------
 *  Page
 *  ------------------------------------------------------------------ */
export default function HomePage() {
  return <HomePageContent onRefresh={reloadHomePage} />;
}

type HomePageContentProps = {
  onRefresh?: () => void;
};

export function HomePageContent({
  onRefresh = reloadHomePage,
}: HomePageContentProps) {
  const [openCourse, setOpenCourse] = useState<CourseName | null>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [pullState, setPullState] = useState<PullState>("idle");
  const pageRef = useRef<HTMLElement | null>(null);
  const touchGestureRef = useRef<TouchGesture>({
    startX: 0,
    startY: 0,
    active: false,
    dragging: false,
  });

  // Object.entries loses key types — cast once in a single, controlled place
  const techEntries = Object.entries(technologies) as Array<
    [CourseName, readonly Tech[]]
  >;

  const handleToggle = useCallback((courseName: CourseName) => {
    setOpenCourse((prev) => (prev === courseName ? null : courseName));
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

  const handleTouchStart = useCallback((event: TouchEvent<HTMLElement>) => {
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
    (event: TouchEvent<HTMLElement>) => {
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
    <main
      ref={pageRef}
      className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-10 text-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div
        aria-live="polite"
        className={cn(
          "pointer-events-none absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full",
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

      <div
        className="w-full max-w-5xl transition-transform duration-200 motion-reduce:transition-none"
        style={{
          transform:
            pullDistance > 0 ? `translateY(${pullDistance}px)` : undefined,
        }}
      >
        <h1 className="mb-10 bg-gradient-to-r from-indigo-500 via-sky-400 to-cyan-400 bg-clip-text text-5xl font-extrabold text-transparent drop-shadow-lg">
          Welcome to the Web Developer Learning Portal
        </h1>

        <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white sm:text-2xl">
          Explore the technologies you'll master throughout each course module.
        </h2>

        <p className="mb-8 text-sm italic text-gray-500 dark:text-gray-400">
          Select a course to view its full technology stack.
        </p>

        <section>
          <div className="flex flex-col gap-2 sm:gap-3">
            {techEntries.map(([courseName, list]) => (
              <CourseRow
                key={courseName}
                name={courseName}
                items={list}
                open={openCourse === courseName}
                onToggle={() => handleToggle(courseName)}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
