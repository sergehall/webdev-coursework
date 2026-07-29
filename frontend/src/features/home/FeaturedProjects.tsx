import { ArrowRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Link } from "react-router-dom";

import { featuredHomeProjects } from "@/features/home/home-content";

export default function FeaturedProjects() {
  return (
    <section aria-labelledby="featured-projects-title" className="text-left">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-[0.16em] text-sky-600 uppercase dark:text-sky-300">
            Applied learning
          </p>
          <h2
            id="featured-projects-title"
            className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl dark:text-white"
          >
            Coursework translated into working systems
          </h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
            Selected projects show the progression from academic cloud labs to
            production-style full-stack and microservices architecture.
          </p>
        </div>
        <Link
          to="/projects"
          className="inline-flex min-h-10 shrink-0 items-center gap-2 self-start rounded-lg text-sm font-bold text-sky-700 transition hover:text-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 sm:self-auto dark:text-sky-300 dark:ring-offset-slate-900"
        >
          View all projects
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {featuredHomeProjects.map((project) => (
          <article
            key={project.id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={project.imageUrl}
                alt={`${project.title} project preview`}
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
              />
            </div>

            <div className="p-5">
              <p className="text-xs font-bold tracking-wide text-sky-600 uppercase dark:text-sky-300">
                {project.category}
              </p>
              <h3 className="mt-2 text-xl font-black text-slate-950 dark:text-white">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {project.summary}
              </p>

              <ul
                className="mt-4 flex flex-wrap gap-2"
                aria-label={`${project.title} architecture highlights`}
              >
                {project.architectureTags.slice(0, 3).map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-bold text-slate-700 transition hover:text-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:text-slate-200 dark:ring-offset-slate-900 dark:hover:text-sky-300"
                >
                  <SiGithub className="h-4 w-4" aria-hidden="true" />
                  View source
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
