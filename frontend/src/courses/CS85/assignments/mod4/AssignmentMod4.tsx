import { useState } from "react";
import { FileText, Paperclip, Rocket } from "lucide-react";

import { quizAnswers, quizQuestions } from "./quizData";
import { Assignment4AContent, Assignment4BContent } from "./assignmentContent";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import QuizGenerator from "@/components/quiz/QuizGenerator";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

type ModuleSectionId =
  | "readme"
  | "required-reading"
  | "assignment-4a"
  | "assignment-4b"
  | "quiz";

const readmeItem: CanvasItem = {
  icon: FileText,
  title: "ReadMe Module 4: Database Fundamentals",
};

const requiredReadingItem: CanvasItem = {
  icon: Paperclip,
  title: "module4_databases.pdf",
};

function ModuleFourQuizShell() {
  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
      <header className="space-y-2">
        <div className="flex items-start gap-4">
          <div className="flex w-10 shrink-0 justify-center pt-1">
            <Rocket
              aria-hidden="true"
              className="h-5 w-5 text-slate-700 dark:text-slate-200"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Quiz: Module 4 - Database
            </h3>
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm leading-7 text-slate-700 dark:text-slate-200">
              <span>Started: Jun 29 at 6:54pm</span>
              <span>Due: Jul 5</span>
              <span>21 pts</span>
              <span>Database fundamentals review</span>
            </p>
          </div>
        </div>
      </header>

      <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
        This quiz block is available directly in the module for review and
        practice before submitting on SMC Canvas.
      </p>

      <QuizGenerator questions={quizQuestions} answers={quizAnswers} />
    </section>
  );
}

export default function AssignmentMod4() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    "assignment-4a": false,
    "assignment-4b": false,
    quiz: false,
  });

  const toggleSection = (id: ModuleSectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-sky-800 uppercase dark:bg-sky-900/40 dark:text-sky-200">
            Module 4
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Week 2
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            Sunday, July 5, 2026 at 11:59 PM
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Module 4 - Database Fundamentals
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: Database Fundamentals
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            This page is ready for the Module 4 Canvas materials: database
            reading notes, setup work, a personal inventory database assignment,
            and the module database quiz.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 4: Database Fundamentals"
        isOpen={openSections.readme}
        onToggle={() => toggleSection("readme")}
      >
        <ModuleItemBlock item={readmeItem} />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Required Reading"
        isOpen={openSections["required-reading"]}
        onToggle={() => toggleSection("required-reading")}
      >
        <ModuleItemBlock item={requiredReadingItem} />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 4 Assignment 4A: Database Setup"
        isOpen={openSections["assignment-4a"]}
        onToggle={() => toggleSection("assignment-4a")}
      >
        <Assignment4AContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 4 Assignment 4B: Personal Inventory Database"
        isOpen={openSections["assignment-4b"]}
        onToggle={() => toggleSection("assignment-4b")}
      >
        <Assignment4BContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 4 - Database"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <ModuleFourQuizShell />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={4} />
    </section>
  );
}
