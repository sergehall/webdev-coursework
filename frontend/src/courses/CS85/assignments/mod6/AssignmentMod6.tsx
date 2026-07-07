import { useState } from "react";
import { FileText, Paperclip, Rocket } from "lucide-react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import {
  ModuleCompletionButton,
  ShowModalButton,
  ToggleModalButton,
} from "@/components/buttons";
import QuizGenerator from "@/components/quiz/QuizGenerator";
import { quizAnswers, quizQuestions } from "./quizData";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

type ModuleSectionId = "readme" | "required-reading" | "assignment" | "quiz";

const readmeItem: CanvasItem = {
  icon: FileText,
  title: "ReadMe Module 6: Autoloading & The MVC Pattern",
};

const requiredReadingItem: CanvasItem = {
  icon: Paperclip,
  title: "module6_autoload_mvc.pdf",
};

const assignment6AFiles = [
  {
    fileUrl: "/code-playground/CS85/mod-6/Module6_Assignment_6A.pdf",
    filename: "Module6_Assignment_6A.pdf",
  },
];

function Assignment6AContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-4">
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Learning Objectives
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>
              Understand how PSR-4 autoloading organizes and simplifies class
              loading.
            </li>
            <li>
              Apply the MVC pattern to separate concerns in a PHP application.
            </li>
            <li>
              Implement real-world logic using custom Models, Views, and
              Controllers.
            </li>
            <li>
              Gain hands-on experience using Composer to manage autoloading.
            </li>
            <li>
              Reflect critically on architecture, AI tool output, and personal
              coding strategies.
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-100">
            Note
          </h4>
          <p className="mt-2 text-sm leading-7 text-amber-950 dark:text-amber-100">
            Min of 4 GitHub Commits.
          </p>
        </article>

        <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
            Mini Tutorial: MVC + Autoloading
          </h4>
          <div className="mt-3 space-y-4 text-sm leading-7 text-sky-950 dark:text-sky-100">
            <p>
              Autoloading helps you eliminate repetitive{" "}
              <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                require_once
              </code>{" "}
              statements by allowing PHP to automatically load required classes
              based on namespace rules.
            </p>

            <div>
              <p className="font-semibold">
                The MVC Pattern separates logic into:
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-2">
                <li>Model: Handles data and business rules.</li>
                <li>View: Manages the UI and output.</li>
                <li>
                  Controller: Connects Model and View, handles user input.
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold">Composer autoload configuration:</p>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                <code>{`"autoload": {
  "psr-4": {
    "App\\\\": "src/"
  }
}`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold">Run:</p>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                <code>composer dump-autoload</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold">Example Model class:</p>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                <code>{`namespace App\\Models;

class Pet {
    public $name;
    public $type;

    public function speak() {
        return "$this->name says hello!";
    }
}`}</code>
              </pre>
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/50 dark:bg-violet-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-violet-900 uppercase dark:text-violet-100">
            Submission Requirements
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-violet-950 dark:text-violet-100">
            <li>
              Submit GitHub repo URL:{" "}
              <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                cs85-module6b-mvcapp
              </code>
              .
            </li>
            <li>Upload all PHP source files to Canvas.</li>
            <li>
              Include a{" "}
              <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                README.md
              </code>{" "}
              with app description, setup instructions, reflection and AI
              critique.
            </li>
          </ul>
        </article>

        <div className="flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isPreviewOpen}
            label={
              isPreviewOpen
                ? "Close Module 6 Assignment 6A files"
                : "View Module 6 Assignment 6A files"
            }
            toggle={() => setIsPreviewOpen((prev) => !prev)}
          />
        </div>

        <ShowModalButton
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          files={assignment6AFiles}
        />
      </section>
    </div>
  );
}

function ModuleSixQuizShell() {
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
              Quiz: Module 6 Autoload & MVC
            </h3>
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm leading-7 text-slate-700 dark:text-slate-200">
              <span>Due: Jul 12</span>
              <span>15 pts</span>
              <span>Autoloading, namespaces, and MVC review</span>
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

export default function AssignmentMod6() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    assignment: false,
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
            Module 6
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Week 3
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            Sunday, July 12, 2026 at 11:59 PM
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Module 6 - Autoloading & The MVC Pattern
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: Autoloading & The MVC Pattern
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            This page is ready for the Module 6 Canvas materials: autoloading
            and MVC reading, Assignment 6A, and the module Autoload & MVC quiz.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 6: Autoloading & The MVC Pattern"
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
        title="Module 6 Assignment 6A: MVC-Based PHP Application"
        isOpen={openSections.assignment}
        onToggle={() => toggleSection("assignment")}
      >
        <Assignment6AContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 6 Autoload & MVC"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <ModuleSixQuizShell />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={6} />
    </section>
  );
}
