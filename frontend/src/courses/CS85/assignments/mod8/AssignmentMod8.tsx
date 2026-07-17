import { useState } from "react";
import { FileText, Paperclip } from "lucide-react";

import Assignment8AContent from "./Assignment8AContent";
import Assignment8BContent from "./Assignment8BContent";
import ModuleEightQuiz from "./ModuleEightQuiz";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

type ModuleSectionId =
  | "readme"
  | "required-reading"
  | "assignment-8a"
  | "assignment-8b"
  | "quiz";

const readmeItem: CanvasItem = {
  icon: FileText,
  title: "ReadMe Module 8: ORM & Database Migrations",
};

const requiredReadingItem: CanvasItem = {
  icon: Paperclip,
  title: "module8-ORMDatabase.pdf",
};

function ModuleEightReadMe() {
  return (
    <div className="space-y-4">
      <ModuleItemBlock item={readmeItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
            ORM &amp; Database Migrations
          </h4>
          <div className="mt-3 space-y-4 text-sm leading-7 text-sky-950 dark:text-sky-100">
            <p>
              Welcome to what I consider the most career transformative module
              in our course! You&apos;ve built an incredible foundation over the
              past few weeks, and now you&apos;re ready to master the tools that
              separate hobby projects from professional applications.
            </p>
            <p>
              This week, you&apos;ll learn the same database management
              techniques used by developers at Netflix, Shopify, and thousands
              of successful startups. Laravel&apos;s migration system and
              Eloquent ORM aren&apos;t just fancy features—they&apos;re
              essential skills that appear in 95% of web developer job postings
              and consistently rank among the top 10 most in-demand competencies
              in our field.
            </p>
            <p>
              Soon you&apos;ll be confidently managing database schemas like a
              professional, writing secure and efficient queries, and
              understanding why companies invest billions in &quot;database as
              code&quot; methodologies. These aren&apos;t just technical skills;
              they&apos;re your gateway to $70,000+ developer positions.
            </p>
          </div>
        </article>

        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-emerald-900 uppercase dark:text-emerald-100">
            Module 8 Task List
          </h4>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
            <li>Complete all required reading materials for this module.</li>
            <li>Watch Recommended Videos.</li>
            <li>
              Turn in Module 8 Assignments:
              <ul className="mt-2 ml-5 list-disc space-y-2">
                <li>Assignment Module 8A: Laravel w/ Database Setup</li>
                <li>
                  Assignment Module 8B: Rebuild Your Inventory with Laravel
                  Eloquent
                </li>
              </ul>
            </li>
            <li>Complete the Module Quiz.</li>
          </ul>
        </article>
      </section>
    </div>
  );
}

export default function AssignmentMod8() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    "assignment-8a": false,
    "assignment-8b": false,
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
            Module 8
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
            Module 8 - ORM & Database Migrations
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: ORM & Database Migrations
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            This page is ready for the Module 8 Canvas materials: ORM and
            database migrations reading, Laravel database environment, inventory
            rebuild with Eloquent, and the module quiz.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 8: ORM & Database Migrations"
        isOpen={openSections.readme}
        onToggle={() => toggleSection("readme")}
      >
        <ModuleEightReadMe />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Required Reading"
        isOpen={openSections["required-reading"]}
        onToggle={() => toggleSection("required-reading")}
      >
        <ModuleItemBlock item={requiredReadingItem} />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 8 Assignment 8A: Laravel w/ Database Environment"
        isOpen={openSections["assignment-8a"]}
        onToggle={() => toggleSection("assignment-8a")}
      >
        <Assignment8AContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 8 Assignment 8B: Rebuild Your Inventory with Laravel Eloquent"
        isOpen={openSections["assignment-8b"]}
        onToggle={() => toggleSection("assignment-8b")}
      >
        <Assignment8BContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 8 ORM & Database Migrations"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <ModuleEightQuiz />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={8} />
    </section>
  );
}
