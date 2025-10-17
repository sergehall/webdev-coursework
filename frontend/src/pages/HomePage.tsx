import React, { useState } from "react";

import { technologies } from "@/data/technologies";

type IconProps = { className?: string };
type TechItem = {
  icon: React.ComponentType<IconProps>;
  color: string;
  label: string;
  url: string;
};
type TechMap = Record<string, TechItem[]>;

const gradients: Record<"python" | "js" | "default", string> = {
  python:
    "from-emerald-200 to-emerald-300 dark:from-emerald-900 dark:to-emerald-950",
  js: "from-amber-200 to-orange-300 dark:from-amber-900 dark:to-orange-950",
  default: "from-sky-200 to-blue-300 dark:from-sky-900 dark:to-indigo-950",
};

function gradientFor(courseName: string) {
  const n = courseName.toLowerCase();
  if (n.includes("python")) return gradients.python;
  if (n.includes("javascript")) return gradients.js;
  return gradients.default;
}

function TechGrid({ items }: { items: TechItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 pb-2 sm:grid-cols-3 lg:grid-cols-4">
      {items.map(({ icon: Icon, color, label, url }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={[
            "flex items-center gap-2 rounded-xl border border-gray-200",
            "bg-white p-2.5 text-gray-800 shadow-sm",
            "transition-colors duration-200",
            "hover:border-gray-300 hover:bg-gray-100",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2",
            "dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
          ].join(" ")}
        >
          <Icon className={`h-5 w-5 ${color}`} />
          <span className="text-sm font-medium">{label}</span>
        </a>
      ))}
    </div>
  );
}

function CourseRow({
  name,
  items,
  open,
  onToggle,
}: {
  name: string;
  items: TechItem[];
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `course-panel-${name.replace(/\s+/g, "-")}`;

  return (
    <div className="w-full">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={[
          "group grid w-full grid-cols-[1fr_auto] items-center",
          "rounded-xl border border-gray-100 text-left",
          "bg-gradient-to-l",
          gradientFor(name),
          "text-gray-900 ring-1 ring-white/20 dark:text-white",
          "px-4 py-2 shadow-sm sm:px-5 sm:py-3",
          "transition-colors duration-200 ease-in-out",
          "hover:brightness-90",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2",
          "dark:border-gray-700",
        ].join(" ")}
      >
        <span className="text-sm font-semibold sm:text-base">{name}</span>
        <span
          aria-hidden="true"
          className="flex h-6 w-6 items-center justify-center rounded-md bg-black/10 dark:bg-white/10"
        >
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div id={panelId} className="px-2 pt-2 sm:px-3">
          <TechGrid items={items} />
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const [openCourse, setOpenCourse] = useState<string | null>(null);
  const techData: TechMap = technologies;

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center">
      <div className="w-full max-w-5xl">
        <h1 className="mb-8 bg-gradient-to-r from-indigo-500 via-sky-400 to-cyan-400 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
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
            {Object.entries(techData).map(([courseName, list]) => (
              <CourseRow
                key={courseName}
                name={courseName}
                items={list}
                open={openCourse === courseName}
                onToggle={() =>
                  setOpenCourse((prev) =>
                    prev === courseName ? null : courseName
                  )
                }
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
