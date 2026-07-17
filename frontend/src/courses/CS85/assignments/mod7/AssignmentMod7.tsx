import { useState } from "react";
import { ClipboardPenLine, FileText, Paperclip } from "lucide-react";

import Assignment7BContent from "./Assignment7BContent";
import ModuleSevenQuiz from "./ModuleSevenQuiz";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import {
  ModuleCompletionButton,
  ShowModalButton,
  ToggleModalButton,
} from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

type ModuleSectionId =
  | "readme"
  | "required-reading"
  | "assignment-7a"
  | "assignment-7b"
  | "quiz";

const readmeItem: CanvasItem = {
  icon: FileText,
  title: "ReadMe Module 7: Laravel Intro",
};

const requiredReadingItem: CanvasItem = {
  icon: Paperclip,
  title: "module7-lavravel.pdf",
};

const assignment7AItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 7 Assignment 7A: Hello Route",
  dueLabel: "Jul 19",
  pointsLabel: "20 pts",
};

const assignment7AFiles = [
  {
    fileUrl:
      "/code-playground/CS85/mod-7/Module7_Assignment_7A_Hello_Route.pdf",
    filename: "Module7_Assignment_7A_Hello_Route.pdf",
  },
];

function ModuleSevenReadMe() {
  return (
    <div className="space-y-4">
      <ModuleItemBlock item={readmeItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
            Laravel Introduction
          </h4>
          <div className="mt-3 space-y-4 text-sm leading-7 text-sky-950 dark:text-sky-100">
            <p>
              Today marks your transition from writing raw PHP to building
              applications with Laravel, the industry&apos;s most popular PHP
              framework. Over the next few hours, you&apos;ll experience the
              &quot;aha!&quot; moment that thousands of professional developers
              have had when they first discover how Laravel transforms web
              development from tedious manual coding into elegant, expressive
              craftsmanship.
            </p>
            <p>
              You&apos;re about to learn the four foundational skills that power
              every Laravel application: Artisan command-line mastery, clean
              routing systems, organized controllers, and secure Blade
              templating. These aren&apos;t just academic concepts—they&apos;re
              the exact tools used by development teams at Disney+, Twitch, and
              countless startups to build applications serving millions of
              users.
            </p>
            <p>
              By the end of this module, you&apos;ll understand why Laravel
              developers are in such high demand and why this framework has
              become the standard for modern PHP development. Let&apos;s begin
              building your Laravel expertise!
            </p>
          </div>
        </article>

        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-emerald-900 uppercase dark:text-emerald-100">
            Module 7 Task List
          </h4>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
            <li>Complete all required reading materials for this module.</li>
            <li>Watch Recommended Videos.</li>
            <li>
              Turn in Module 7 Assignments:
              <ul className="mt-2 ml-5 list-disc space-y-2">
                <li>Assignment Module 7A: Hello Route</li>
                <li>Assignment Module 7B: Basic Routing</li>
              </ul>
            </li>
            <li>Complete the Module Quiz.</li>
          </ul>
        </article>
      </section>
    </div>
  );
}

function Assignment7AContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleItemBlock item={assignment7AItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
            Objective
          </h4>
          <p className="mt-2 text-sm leading-7 text-sky-950 dark:text-sky-100">
            This assignment introduces students to the Laravel framework and the
            concept of routing. Students will learn to set up a Laravel
            development environment, define and test simple routes, and publish
            their project to GitHub. This provides foundational experience with
            Laravel and version control.
          </p>
        </article>

        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-emerald-900 uppercase dark:text-emerald-100">
            Part 1: Laravel Installation &amp; Project Setup
          </h4>
          <ol className="mt-3 ml-5 list-decimal space-y-2 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
            <li>Verify prerequisites.</li>
            <li>Install the Laravel Installer.</li>
            <li>Create your Laravel project.</li>
          </ol>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
            <code>
              {[
                "# Mac/Linux",
                "cd ~/Documents/Development",
                "",
                "# Windows",
                "cd C:\\Users\\YourName\\Documents\\Development",
                "",
                "laravel new module7a-helloroute",
                "cd module7a-helloroute",
              ].join("\n")}
            </code>
          </pre>
        </article>

        <article className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900/50 dark:bg-cyan-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-cyan-900 uppercase dark:text-cyan-100">
            Part 2: Laravel Concepts Tutorial
          </h4>
          <div className="mt-3 space-y-4 text-sm leading-7 text-cyan-950 dark:text-cyan-100">
            <div>
              <p className="font-semibold">What is Laravel?</p>
              <p className="mt-2">
                Laravel is a modern web application framework for PHP. It
                provides a clean and elegant syntax for building web
                applications quickly and securely. Laravel includes built-in
                tools for routing, database access, authentication, and more,
                making it ideal for both beginners and experienced developers.
              </p>
            </div>
            <div>
              <p className="font-semibold">What is a Route?</p>
              <p className="mt-2">
                A route in Laravel connects a URL to a specific function or
                controller method. When a user visits a URL, Laravel checks its
                route definitions to determine what code to execute. Routes are
                defined in the{" "}
                <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                  routes/web.php
                </code>{" "}
                file for web-based applications.
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/50 dark:bg-violet-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-violet-900 uppercase dark:text-violet-100">
            Part 3: Define Two Routes and Push to GitHub
          </h4>
          <div className="mt-3 space-y-4 text-sm leading-7 text-violet-950 dark:text-violet-100">
            <div>
              <p className="font-semibold">
                Step 4: Review Laravel File Structure
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-2">
                <li>
                  <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                    routes/web.php
                  </code>
                  : Route logic
                </li>
                <li>
                  <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                    resources/views/
                  </code>
                  : Blade templates
                </li>
                <li>
                  <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                    app/Http/Controllers/
                  </code>
                  : Controllers
                </li>
                <li>
                  <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                    .env
                  </code>
                  : Environment variables (don&apos;t commit)
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">
                Step 5: Push Your Project to GitHub
              </p>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                <code>
                  {[
                    "git init",
                    "git add .",
                    'git commit -m "Initial commit: Laravel routes assignment"',
                    "",
                    "git remote add origin https://github.com/YOUR_USERNAME/module7a-helloroute.git",
                    "git push -u origin main",
                  ].join("\n")}
                </code>
              </pre>
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-100">
            Part 4: Required Knowledge Check (README.md)
          </h4>
          <p className="mt-2 text-sm leading-7 text-amber-950 dark:text-amber-100">
            In your README.md file, write 2–3 sentence answers to:
          </p>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-amber-950 dark:text-amber-100">
            <li>What is Laravel and why is it useful for developers?</li>
            <li>What does the /greet/&#123;name&#125; route do?</li>
            <li>
              Why is it important to use Git and GitHub in software projects?
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-rose-900 uppercase dark:text-rose-100">
            Submit
          </h4>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-rose-950 dark:text-rose-100">
            <li>Screenshot of PHP and Composer versions.</li>
            <li>Screenshot of Laravel install and project folder.</li>
            <li>
              Browser screenshots of /hello and two /greet/&#123;name&#125;
              URLs.
            </li>
            <li>
              GitHub repo link:
              https://github.com/yourusername/module7a-helloroute
            </li>
            <li>Completed README.md with answers.</li>
          </ul>
        </article>

        <div className="flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isPreviewOpen}
            label={
              isPreviewOpen
                ? "Close Module 7 Assignment 7A PDF"
                : "View Module 7 Assignment 7A PDF"
            }
            toggle={() => setIsPreviewOpen((prev) => !prev)}
          />
        </div>

        <ShowModalButton
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          files={assignment7AFiles}
        />
      </section>
    </div>
  );
}

export default function AssignmentMod7() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    "assignment-7a": false,
    "assignment-7b": false,
    quiz: false,
  });

  const toggleSection = (sectionId: ModuleSectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-sky-800 uppercase dark:bg-sky-900/40 dark:text-sky-200">
            Module 7
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Week 4
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            Sunday, July 19, 2026 at 11:59 PM
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Module 7 - Laravel Intro
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: Laravel Intro
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            This page is ready for the Module 7 Canvas materials: Laravel intro
            reading, Hello Route, Basic Routing, and the Laravel quiz.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 7: Laravel Intro"
        isOpen={openSections.readme}
        onToggle={() => toggleSection("readme")}
      >
        <ModuleSevenReadMe />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Required Reading"
        isOpen={openSections["required-reading"]}
        onToggle={() => toggleSection("required-reading")}
      >
        <ModuleItemBlock item={requiredReadingItem} />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 7 Assignment 7A: Hello Route"
        isOpen={openSections["assignment-7a"]}
        onToggle={() => toggleSection("assignment-7a")}
      >
        <Assignment7AContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 7 Assignment 7B: Basic Routing"
        isOpen={openSections["assignment-7b"]}
        onToggle={() => toggleSection("assignment-7b")}
      >
        <Assignment7BContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 7 Laravel"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <ModuleSevenQuiz />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={7} />
    </section>
  );
}
