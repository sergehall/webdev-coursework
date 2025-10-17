// src/pages/HomePage.tsx
import { useEffect, useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";

type IconComponent = ComponentType<{ className?: string }>;
type TechItem = {
  icon: IconComponent;
  color: string;
  label: string;
  url: string;
};
type TechMap = Record<string, TechItem[]>;

export default function HomePage() {
  const [openCourse, setOpenCourse] = useState<string | null>(null);
  const [techData, setTechData] = useState<TechMap | null>(null);
  const [decorOn, setDecorOn] = useState<boolean>(false);

  useEffect(() => {
    // First paint → then decorate and load heavy data
    requestAnimationFrame(() => {
      setDecorOn(true);

      const load = () =>
        import("@/data/technologies").then((m) => setTechData(m.technologies));

      // Tiny local typings for requestIdleCallback
      interface IdleRequestOptions {
        timeout?: number;
      }
      type IdleRequestCallback = (d: {
        didTimeout: boolean;
        timeRemaining: () => number;
      }) => void;

      const w = window as unknown as {
        requestIdleCallback?: (
          cb: IdleRequestCallback,
          opts?: IdleRequestOptions
        ) => number;
      };

      if (typeof w.requestIdleCallback === "function") {
        w.requestIdleCallback(load, { timeout: 1000 });
      } else {
        setTimeout(load, 0);
      }
    });
  }, []);

  const toggleCourse = (courseName: string) => {
    setOpenCourse((prev) => (prev === courseName ? null : courseName));
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center">
      {/* Network hints via Helmet (improves FCP on mobile) */}
      <Helmet>
        {/* Preconnect to Google Fonts for faster font CSS/asset fetch */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* Non-blocking font CSS with swap to avoid FOIT */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
        />
        {/* DNS prefetch for Cloudflare beacon (Lighthouse flagged it) */}
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
      </Helmet>

      <div className="w-full max-w-6xl">
        <h1
          className={[
            "mb-10 bg-gradient-to-r from-indigo-500 via-sky-400 to-cyan-400",
            "bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl",
            decorOn ? "drop-shadow-lg" : "",
          ].join(" ")}
        >
          Welcome to the Web Developer Learning Portal
        </h1>

        <h2 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white sm:text-2xl">
          Explore the technologies you'll master throughout each course module.
        </h2>

        <p className="mb-6 text-sm italic text-gray-500 dark:text-gray-400 sm:mb-10">
          Select a course to view its full technology stack.
        </p>

        {/* Reserve space to avoid CTA layout shifts (CLS) */}
        <section className="min-h-[36rem]">
          {techData ? (
            Object.entries(techData).map(([courseName, techList]) => (
              <div
                key={courseName}
                className={[
                  "mb-4 w-full rounded-2xl border border-gray-100 px-4 py-3",
                  "shadow-sm transition-all duration-200 ease-in-out sm:shadow-md",
                  "dark:border-gray-700",
                  courseName.includes("Python")
                    ? "bg-gradient-to-l from-emerald-100 to-emerald-200 dark:from-emerald-800 dark:via-emerald-900 dark:to-emerald-950"
                    : courseName.includes("JavaScript")
                      ? "bg-gradient-to-l from-yellow-100 to-orange-200 dark:from-yellow-800 dark:via-orange-900 dark:to-amber-950"
                      : "bg-gradient-to-l from-sky-100 to-blue-200 dark:from-sky-800 dark:via-blue-900 dark:to-indigo-950",
                  "text-gray-800 ring-1 ring-white/20 dark:text-white",
                  decorOn ? "hover:shadow-md" : "",
                ].join(" ")}
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  <button
                    onClick={() => toggleCourse(courseName)}
                    aria-expanded={openCourse === courseName}
                    className="flex w-full items-center justify-between text-left"
                  >
                    {courseName}
                    <span className="text-lg">
                      {openCourse === courseName ? "−" : "+"}
                    </span>
                  </button>
                </h3>

                {openCourse === courseName && (
                  <div className="mt-3 overflow-hidden">
                    <div className="grid grid-cols-2 gap-3 pb-2 sm:grid-cols-3 lg:grid-cols-4">
                      {techList.map(({ icon: Icon, color, label, url }) => (
                        <a
                          key={label}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 text-gray-800 shadow-sm hover:border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                        >
                          <Icon className={`h-5 w-5 ${color}`} />
                          <span className="font-medium">{label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            // Skeleton sized close to final content to avoid pushing the CTA
            <div className="space-y-3">
              <div className="h-10 rounded-2xl bg-gray-100 dark:bg-gray-800" />
              <div className="h-10 rounded-2xl bg-gray-100 dark:bg-gray-800" />
              <div className="h-10 rounded-2xl bg-gray-100 dark:bg-gray-800" />
              <div className="h-10 rounded-2xl bg-gray-100 dark:bg-gray-800" />
              <div className="h-10 rounded-2xl bg-gray-100 dark:bg-gray-800" />
              <div className="h-10 rounded-2xl bg-gray-100 dark:bg-gray-800" />
            </div>
          )}
        </section>

        {/* CTA area with fixed height to prevent CLS */}
        <div className="contain-layout mt-6 h-[56px] sm:mt-8">
          <Link
            to="/coursework"
            className={[
              "inline-flex h-full items-center justify-center rounded-2xl",
              "bg-gradient-to-br from-emerald-500 to-lime-400",
              "px-6 text-base font-semibold text-gray-900 sm:px-8 sm:text-lg",
              decorOn
                ? "shadow-md hover:from-emerald-600 hover:to-lime-500 hover:shadow-lg"
                : "",
            ].join(" ")}
          >
            Enter the Coursework & Assignments Portal
          </Link>
        </div>
      </div>
    </main>
  );
}
