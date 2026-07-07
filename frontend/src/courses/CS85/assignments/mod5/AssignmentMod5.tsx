import { useState } from "react";
import {
  ClipboardPenLine,
  FileText,
  Paperclip,
  Rocket,
  type LucideIcon,
} from "lucide-react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import {
  ModuleCompletionButton,
  ShowModalButton,
  ToggleModalButton,
} from "@/components/buttons";
import QuizGenerator from "@/components/quiz/QuizGenerator";
import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

type ModuleSectionId = "readme" | "required-reading" | "assignment" | "quiz";

type CanvasItem = {
  icon: LucideIcon;
  title: string;
  dueLabel?: string;
  pointsLabel?: string;
};

const readmeItem: CanvasItem = {
  icon: FileText,
  title: "ReadMe Module 5: Object Oriented Programming",
};

const requiredReadingItem: CanvasItem = {
  icon: Paperclip,
  title: "module5-oop.pdf",
};

const assignmentItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 5 Assignment 5A: Designing Your Own Object Oriented World",
  dueLabel: "Jul 12",
  pointsLabel: "20 pts",
};

const assignment5AFiles = [
  {
    fileUrl: "/code-playground/CS85/mod-5/Module5_Assignment_5A.pdf",
    filename: "Module5_Assignment_5A.pdf",
  },
];

const moduleFiveQuizId = "CS85Module5OOPQuiz";

const quizQuestions: UIQuestion[] = [
  {
    id: 1,
    question: "What is a class in Object-Oriented Programming?",
    options: [
      "A collection of related files",
      "A blueprint for creating objects",
      "An algorithm used for calculations",
      "A function that stores variables",
    ],
  },
  {
    id: 2,
    question: "Which keyword is used to define a class in PHP?",
    options: ["function", "class", "new", "define"],
  },
  {
    id: 3,
    question: "What does the new keyword do in PHP OOP?",
    options: [
      "Defines a property",
      "Creates a new object from a class",
      "Imports a module",
      "Declares a new function",
    ],
  },
  {
    id: 4,
    question: "True or False: An object is a specific instance of a class.",
    options: ["True", "False"],
  },
  {
    id: 5,
    question:
      "Which of the following symbols is used to access properties and methods of an object?",
    options: ["::", "=>", "->", "."],
  },
  {
    id: 6,
    question: "What are object properties in OOP?",
    options: [
      "Functions within an object",
      "Private members of a class",
      "Attributes inherited from a parent class",
      "Variables that belong to a class",
    ],
  },
  {
    id: 7,
    question: "What does the this keyword refer to?",
    options: [
      "The file name",
      "The parent class",
      "The current object",
      "A global variable",
    ],
  },
  {
    id: 8,
    question: "What is the purpose of a constructor in a class?",
    options: [
      "To initialize object properties when created",
      "To define global functions",
      "To create static properties",
      "To validate form inputs",
    ],
  },
  {
    id: 9,
    question: "What visibility keyword allows property access from anywhere?",
    options: ["protected", "private", "public", "static"],
  },
  {
    id: 10,
    question: "In the statement book title equals PHP Basics, what is title?",
    options: [
      "Class name",
      "Method name",
      "Constant",
      "Property of the object",
    ],
  },
  {
    id: 11,
    question: "How do you define a method inside a class?",
    options: [
      "Declare with define",
      "Use the function keyword inside the class",
      "Write it after the constructor",
      "Assign using this",
    ],
  },
  {
    id: 12,
    question: "Which method runs automatically when an object is created?",
    options: ["__construct()", "__get()", "__set()", "__toString()"],
  },
  {
    id: 13,
    question:
      "True or False: Each object created from a class shares the same property values.",
    options: ["True", "False"],
  },
  {
    id: 14,
    question: "Which of these is NOT a characteristic of good OOP design?",
    options: ["Encapsulation", "Tight Coupling", "Reusability", "Modularity"],
  },
  {
    id: 15,
    question: "What is an example of using a method in OOP?",
    options: [
      "User.getName()",
      "getName($user)",
      "$user->getName()",
      "get(User->name)",
    ],
  },
];

const quizAnswers: CorrectAnswerDto[] = [
  { quizId: moduleFiveQuizId, questionId: 1, correctAnswer: [1] },
  { quizId: moduleFiveQuizId, questionId: 2, correctAnswer: [1] },
  { quizId: moduleFiveQuizId, questionId: 3, correctAnswer: [1] },
  { quizId: moduleFiveQuizId, questionId: 4, correctAnswer: [0] },
  { quizId: moduleFiveQuizId, questionId: 5, correctAnswer: [2] },
  { quizId: moduleFiveQuizId, questionId: 6, correctAnswer: [3] },
  { quizId: moduleFiveQuizId, questionId: 7, correctAnswer: [2] },
  { quizId: moduleFiveQuizId, questionId: 8, correctAnswer: [0] },
  { quizId: moduleFiveQuizId, questionId: 9, correctAnswer: [2] },
  { quizId: moduleFiveQuizId, questionId: 10, correctAnswer: [3] },
  { quizId: moduleFiveQuizId, questionId: 11, correctAnswer: [1] },
  { quizId: moduleFiveQuizId, questionId: 12, correctAnswer: [0] },
  { quizId: moduleFiveQuizId, questionId: 13, correctAnswer: [1] },
  { quizId: moduleFiveQuizId, questionId: 14, correctAnswer: [1] },
  { quizId: moduleFiveQuizId, questionId: 15, correctAnswer: [2] },
];

function CanvasRow({ item }: { item: CanvasItem }) {
  const Icon = item.icon;

  return (
    <li className="flex gap-4 px-4 py-3 transition hover:bg-sky-50/70 dark:hover:bg-sky-950/20">
      <div className="flex w-10 shrink-0 justify-center pt-1">
        <Icon
          aria-hidden="true"
          className="h-5 w-5 text-slate-700 dark:text-slate-200"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-7 font-medium break-words text-slate-700 dark:text-slate-200">
          {item.title}
        </p>
        {item.dueLabel || item.pointsLabel ? (
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm leading-7 text-slate-700 dark:text-slate-200">
            {item.dueLabel ? <span>{item.dueLabel}</span> : null}
            {item.pointsLabel ? <span>{item.pointsLabel}</span> : null}
          </p>
        ) : null}
      </div>
    </li>
  );
}

function ModuleItemBlock({ item }: { item: CanvasItem }) {
  return (
    <ul className="overflow-hidden rounded-xl border border-slate-200 bg-white/70 dark:border-slate-700 dark:bg-slate-950/30">
      <CanvasRow item={item} />
    </ul>
  );
}

function Assignment5AContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleItemBlock item={assignmentItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Learning Objectives
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>
              Understand and apply core OOP concepts: classes, objects,
              properties, methods, and constructors.
            </li>
            <li>
              Design and implement PHP classes based on real life entities.
            </li>
            <li>Use personal data to instantiate and manipulate objects.</li>
            <li>Reflect on class design choices and code behavior.</li>
            <li>
              Analyze and critique AI generated code for correctness and style.
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
            Assignment Instructions
          </h4>
          <div className="mt-3 space-y-4 text-sm leading-7 text-sky-950 dark:text-sky-100">
            <div>
              <p className="font-semibold">Design a class based on your life</p>
              <ul className="mt-2 ml-5 list-disc space-y-2">
                <li>
                  Pick a personally meaningful topic, such as a budget tracker
                  or workout log.
                </li>
                <li>
                  Create a PHP class with at least 5 properties and 4 methods.
                </li>
                <li>Include a constructor that initializes real data.</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold">Required methods</p>
              <ul className="mt-2 ml-5 list-disc space-y-2">
                <li>A summary display method.</li>
                <li>A method returning a calculated value.</li>
                <li>A method to change a property value.</li>
                <li>A method with decision logic.</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold">Make a prediction</p>
              <p className="mt-2">
                Before running your code, comment what each method and the
                constructor should output.
              </p>
            </div>

            <div>
              <p className="font-semibold">Create and use objects</p>
              <p className="mt-2">
                Instantiate at least 2 objects from your class. Call your
                methods and output their results using realistic data.
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/50 dark:bg-violet-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-violet-900 uppercase dark:text-violet-100">
            Use and Critique AI
          </h4>
          <div className="mt-2 space-y-3 text-sm leading-7 text-violet-950 dark:text-violet-100">
            <p>
              Generate one method using ChatGPT or a similar tool. Include all
              required AI documentation in your submission.
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>The exact prompt you used.</li>
              <li>The raw AI-generated code.</li>
              <li>
                A critique discussing security, efficiency, correctness, style,
                and changes you made.
              </li>
            </ul>
          </div>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-100">
            Submission Requirements
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-amber-950 dark:text-amber-100">
            <li>
              Push all project files to GitHub repository{" "}
              <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                cs85-module5b-oopworld
              </code>
              .
            </li>
            <li>
              Include at least 4 meaningful commits with descriptive messages.
            </li>
            <li>Submit the GitHub repo link.</li>
            <li>Upload PHP files to Canvas.</li>
            <li>
              Include your AI method critique as{" "}
              <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                critique.md
              </code>{" "}
              or{" "}
              <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                critique.txt
              </code>
              .
            </li>
          </ul>
        </article>

        <div className="flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isPreviewOpen}
            label={
              isPreviewOpen
                ? "Close Module 5 Assignment 5A files"
                : "View Module 5 Assignment 5A files"
            }
            toggle={() => setIsPreviewOpen((prev) => !prev)}
          />
        </div>

        <ShowModalButton
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          files={assignment5AFiles}
        />
      </section>
    </div>
  );
}

function ModuleFiveQuizShell() {
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
              Quiz: Module 5 - OOP
            </h3>
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm leading-7 text-slate-700 dark:text-slate-200">
              <span>Started: Jul 6 at 5:26pm</span>
              <span>Due: Jul 12</span>
              <span>15 pts</span>
              <span>Object-oriented programming review</span>
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

export default function AssignmentMod5() {
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
            Module 5
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
            Module 5 - Object Oriented Programming
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: Object Oriented Programming
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            This page is ready for the Module 5 Canvas materials: object
            oriented programming reading, Assignment 5A, and the module OOP
            quiz.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 5: Object Oriented Programming"
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
        title="Module 5 Assignment 5A: Designing Your Own Object Oriented World"
        isOpen={openSections.assignment}
        onToggle={() => toggleSection("assignment")}
      >
        <Assignment5AContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 5 - OOP"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <ModuleFiveQuizShell />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={5} />
    </section>
  );
}
