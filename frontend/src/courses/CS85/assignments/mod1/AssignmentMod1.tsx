import { useState } from "react";
import { FileText, Paperclip, Rocket } from "lucide-react";

import { quizAnswers, quizQuestions } from "./quizData";
import { Assignment1AContent, Assignment1BContent } from "./assignmentContent";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ModuleCompletionButton } from "@/components/buttons";
import QuizGenerator from "@/components/quiz/QuizGenerator";
import {
  CanvasRow,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

type ModuleSectionId =
  | "readme"
  | "required-reading"
  | "assignment-1a"
  | "assignment-1b"
  | "quiz";

const readmeItems: CanvasItem[] = [
  {
    icon: FileText,
    title: "ReadMe Module 1: Introduction to PHP",
  },
];

const requiredReadingItems: CanvasItem[] = [
  {
    icon: Paperclip,
    title: "module_1_reading.pdf",
  },
  {
    icon: Paperclip,
    title: "PHP_HTML_CSS_Guide.pdf",
  },
];

function ModuleOneQuiz() {
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
            <h3 className="text-sm leading-7 font-medium text-slate-700 dark:text-slate-200">
              Quiz: Module 1 - Intro to PHP
            </h3>
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm leading-7 text-slate-700 dark:text-slate-200">
              <span>Due: Jun 28 at 11:59pm</span>
              <span>10 pts</span>
              <span>30 min limit</span>
              <span>2 attempts</span>
            </p>
          </div>
        </div>
        <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
          This quiz block is available directly in the module for review and
          practice before submitting on SMC Canvas.
        </p>
      </header>

      <QuizGenerator questions={quizQuestions} answers={quizAnswers} />
    </section>
  );
}

export default function AssignmentMod1() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    "assignment-1a": false,
    "assignment-1b": false,
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
            Module 1
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Week 1
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            Sunday, June 28, 2026 at 11:59 PM
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Module 1 - Introduction to PHP
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: Introduction to PHP
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            Start CS 85 by reviewing the PHP introduction, confirming the local
            development environment, setting up course communication, and
            completing the first assignment and quiz by the Canvas deadline.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 1: Introduction to PHP"
        isOpen={openSections.readme}
        onToggle={() => toggleSection("readme")}
      >
        <ul className="overflow-hidden rounded-xl border border-slate-200 bg-white/70 dark:border-slate-700 dark:bg-slate-950/30">
          {readmeItems.map((item) => (
            <CanvasRow key={item.title} item={item} />
          ))}
        </ul>
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Required Reading"
        isOpen={openSections["required-reading"]}
        onToggle={() => toggleSection("required-reading")}
      >
        <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white/70 dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-950/30">
          {requiredReadingItems.map((item) => (
            <CanvasRow key={item.title} item={item} />
          ))}
        </ul>
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 1 Assignment 1A: Home Dev Environment & hello world"
        isOpen={openSections["assignment-1a"]}
        onToggle={() => toggleSection("assignment-1a")}
      >
        <Assignment1AContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 1 Assignment 1B: Setup Slack Account and App"
        isOpen={openSections["assignment-1b"]}
        onToggle={() => toggleSection("assignment-1b")}
      >
        <Assignment1BContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 1 - Intro to PHP"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <ModuleOneQuiz />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={1} />
    </section>
  );
}
