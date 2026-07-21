import { useState } from "react";
import { Paperclip } from "lucide-react";

import Assignment10AContent from "./Assignment10AContent";
import ModuleTenQuiz from "./ModuleTenQuiz";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

type ModuleSectionId =
  | "readme"
  | "required-reading"
  | "assignment-10a"
  | "quiz";

const requiredReadingItem: CanvasItem = {
  icon: Paperclip,
  title: "module10-authentication.pdf",
};

function ModuleTenReadMe() {
  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
      <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
        <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
          User Authentication
        </h4>
        <div className="mt-3 space-y-4 text-sm leading-7 text-sky-950 dark:text-sky-100">
          <p>
            Today, you&apos;re going to learn skills that appear in virtually
            every job posting for web developers: building secure user
            authentication systems and modeling real-world data relationships.
          </p>
          <p>
            Think about every app you use daily—Instagram, your banking app,
            Netflix, even our college portal. They all share two fundamental
            features: they know who you are, and they show you content that
            belongs specifically to you. By the end of this module, you&apos;ll
            understand exactly how to build these systems yourself.
          </p>
          <p>
            We&apos;ll be implementing a complete user registration and login
            system using Laravel Breeze, protecting routes with middleware, and
            connecting users to their content through Eloquent relationships.
            These aren&apos;t just academic exercises—these are the exact
            patterns used by companies like Airbnb, Shopify, and GitHub to serve
            millions of users. Let&apos;s build something that belongs in your
            professional portfolio!
          </p>
        </div>
      </article>

      <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
        <h4 className="text-sm font-semibold tracking-wide text-emerald-900 uppercase dark:text-emerald-100">
          Module 10 Task List
        </h4>
        <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
          <li>Complete all required reading materials for this module.</li>
          <li>Watch Recommended Videos.</li>
          <li>
            Turn in Module 10 Assignments:
            <ul className="mt-2 ml-5 list-disc space-y-2">
              <li>Assignment Module 10A: Laravel Breeze</li>
            </ul>
          </li>
          <li>Complete the Module Quiz.</li>
        </ul>
      </article>
    </section>
  );
}

export default function AssignmentMod10() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    "assignment-10a": false,
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
            Module 10
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Week 5
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            Sunday, July 26, 2026 at 11:59 PM
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Module 10 - User Authentication
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: User Authentication
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            This page is ready for the Module 10 Canvas materials: user
            authentication reading, authentication assignment, and the Module 10
            authentication quiz.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 10: User Authentication"
        isOpen={openSections.readme}
        onToggle={() => toggleSection("readme")}
      >
        <ModuleTenReadMe />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Required Reading"
        isOpen={openSections["required-reading"]}
        onToggle={() => toggleSection("required-reading")}
      >
        <ModuleItemBlock item={requiredReadingItem} />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 10 Assignment 10A: User Authentication"
        isOpen={openSections["assignment-10a"]}
        onToggle={() => toggleSection("assignment-10a")}
      >
        <Assignment10AContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 10 Authentication"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <ModuleTenQuiz />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={10} />
    </section>
  );
}
