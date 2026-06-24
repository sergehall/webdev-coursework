import { useState } from "react";
import {
  ClipboardPenLine,
  FileText,
  Paperclip,
  Rocket,
  type LucideIcon,
} from "lucide-react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import QuizGenerator from "@/components/quiz/QuizGenerator";
import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

type ModuleSectionId =
  | "readme"
  | "required-reading"
  | "assignment-2a"
  | "assignment-2b"
  | "quiz";

type CanvasItem = {
  icon: LucideIcon;
  title: string;
  dueLabel?: string;
  pointsLabel?: string;
};

const readmeItem: CanvasItem = {
  icon: FileText,
  title: "ReadMe Module 2: Condition Statements & Loops",
};

const requiredReadingItem: CanvasItem = {
  icon: Paperclip,
  title: "module2_reading.pdf",
};

const assignment2AItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 2 Assignment 2A: if/else Business",
  dueLabel: "Jun 28",
  pointsLabel: "20 pts",
};

const assignment2BItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 2 Assignment 2B: Time loops",
  dueLabel: "Jun 28",
  pointsLabel: "20 pts",
};

const assignment2APdf = {
  fileUrl: "/code-playground/CS85/mod-2/module2_assignment_2a.pdf",
  filename: "module2_assignment_2a.pdf",
};

const assignment2BFiles = [
  {
    fileUrl: "/code-playground/CS85/mod-2/module2_assignment_2b.pdf",
    filename: "module2_assignment_2b.pdf",
  },
  {
    fileUrl: "/code-playground/CS85/mod-2/CosmicCalendarBuilder.php",
    filename: "CosmicCalendarBuilder.php",
  },
];

const quizQuestions: UIQuestion[] = [
  {
    id: 1,
    question:
      "Which of the following is the correct syntax for an if statement?",
    options: [
      "if ($aVariable == 1);",
      "if ($aVariable == 1)()",
      "if $aVariable == 1",
      "if ($aVariable == 1)",
    ],
  },
  {
    id: 2,
    question:
      "An if statement can execute multiple lines of PHP code if they are",
    options: [
      "are excluded from the PHP code",
      "are within a command { ... } block",
      "are within a code segment /* ... */",
      "are within an always false if statement",
    ],
  },
  {
    id: 3,
    question: "Which is the correct PHP syntax for else:",
    options: [
      'else { echo "the else statement"; }',
      'else ; { echo "the else statement"; }',
      'else - echo "the else statement"',
      'else \\/ { echo "the else statement"; }',
    ],
  },
  {
    id: 4,
    question: "Each time a loop run through the code, it's called a",
    options: ["looping", "iteration", "recurrence", "deduplication"],
  },
  {
    id: 5,
    question: "Which while loop syntax is correct?",
    options: [
      "while ($i < 100) { }",
      "while $i < 100 { }",
      "while $i < 100 ...",
      "while ($i < 100; i++) { }",
    ],
  },
  {
    id: 6,
    question: "The for statement can initialize a counter.",
    options: ["True", "False"],
  },
  {
    id: 7,
    question: "The do ... while statement will always execute at least once.",
    options: ["True", "False"],
  },
  {
    id: 8,
    question:
      "The while statement will execute a series of statements as long as a given conditional expression evaluates to FALSE.",
    options: ["True", "False"],
  },
  {
    id: 9,
    question:
      "A if . . . else statement allows a program to make decisions about what statements to execute.",
    options: ["True", "False"],
  },
  {
    id: 10,
    question:
      "The if/else statement will contain at least one condition statement to make the decision to run one block of code and skip over another block of code.",
    options: ["True", "False"],
  },
];

const quizAnswers: CorrectAnswerDto[] = [
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 1,
    correctAnswer: [3],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 2,
    correctAnswer: [1],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 3,
    correctAnswer: [0],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 4,
    correctAnswer: [1],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 5,
    correctAnswer: [0],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 6,
    correctAnswer: [0],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 7,
    correctAnswer: [0],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 8,
    correctAnswer: [1],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 9,
    correctAnswer: [0],
  },
  {
    quizId: "CS85Module2ConditionStatementsLoopsQuiz",
    questionId: 10,
    correctAnswer: [0],
  },
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

function Assignment2AContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleItemBlock item={assignment2AItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Objective
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            This assignment is a real-world simulation of a common developer
            task: first, implementing a set of business rules quickly, and
            second, refactoring that code for clarity and long-term maintenance.
            You will experience firsthand why clean, readable code is critical.
            The logic is complex enough that simply asking an AI to "solve it"
            will be less effective than thinking through the rules yourself.
          </p>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-100">
            Important: Use Git & Push Often
          </h4>
          <p className="mt-2 text-sm leading-7 text-amber-950 dark:text-amber-100">
            Track your progress with frequent, meaningful Git commits. Push
            regularly to GitHub. Your commit history will be reviewed as part of
            your grade. It should show progress over time, not one single commit
            with the final version.
          </p>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            The Scenario
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            You are a junior developer at an online T-shirt store. The marketing
            team has just released a new, complex pricing structure. Your task
            is to write the PHP code that calculates the final price of a
            T-shirt based on its size, color, and customization options.
          </p>
        </article>

        <div className="flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isPreviewOpen}
            label={
              isPreviewOpen
                ? "Close module2_assignment_2a.pdf"
                : "View module2_assignment_2a.pdf"
            }
            toggle={() => setIsPreviewOpen((prev) => !prev)}
          />
        </div>

        <ShowModalButton
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          files={[assignment2APdf]}
        />
      </section>
    </div>
  );
}

function Assignment2BContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleItemBlock item={assignment2BItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Objective
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            This assignment tests loops and conditional logic with live,
            unpredictable API data. Instead of processing a fixed range of
            numbers, the PHP script fetches the current Los Angeles date,
            combines it with my first name, and generates a personalized Cosmic
            Calendar report.
          </p>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Your Mission
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>
              Fetch the current date from the World Time API endpoint for
              America/Los_Angeles.
            </li>
            <li>
              Convert the API response from JSON into PHP data with
              <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
                json_decode()
              </code>
              .
            </li>
            <li>
              Use the length of my first name, Serge, as the loop start value.
            </li>
            <li>
              Use the current day of the year from the API date as the loop end
              value.
            </li>
            <li>
              Apply conditional styling for numbers divisible by the name
              length, the current month, or both.
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900/50 dark:bg-cyan-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-cyan-900 uppercase dark:text-cyan-100">
            Cosmic Number Rules
          </h4>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-violet-200 bg-white p-3 dark:border-violet-900/60 dark:bg-slate-950/40">
              <p className="text-xs font-semibold tracking-wide text-violet-800 uppercase dark:text-violet-200">
                Name Length
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">
                Numbers divisible by 5 are marked as name-length matches.
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-white p-3 dark:border-amber-900/60 dark:bg-slate-950/40">
              <p className="text-xs font-semibold tracking-wide text-amber-800 uppercase dark:text-amber-200">
                Month
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">
                Numbers divisible by the current month receive month styling.
              </p>
            </div>
            <div className="rounded-lg border border-rose-200 bg-white p-3 dark:border-rose-900/60 dark:bg-slate-950/40">
              <p className="text-xs font-semibold tracking-wide text-rose-800 uppercase dark:text-rose-200">
                Both
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">
                Numbers divisible by both values get the strongest highlight.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950/40">
              <p className="text-xs font-semibold tracking-wide text-slate-700 uppercase dark:text-slate-200">
                Regular
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">
                All other numbers render as regular day-number entries.
              </p>
            </div>
          </div>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Implementation
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            The PHP solution is implemented in
            <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
              CosmicCalendarBuilder.php
            </code>
            . It reads the API values
            <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
              dateTime
            </code>
            and
            <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
              month
            </code>
            , calculates the day of year with
            <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
              DateTimeImmutable
            </code>
            , and builds a result array from a
            <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
              for
            </code>
            loop. If the external API is unavailable, the code falls back to the
            local America/Los_Angeles date so the page can still render.
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            GitHub source:
            <a
              href="https://github.com/sergehall/cs85_projects/blob/main/app/Services/Modules/Module2B/CosmicCalendarBuilder.php"
              target="_blank"
              rel="noreferrer"
              className="ml-1 font-semibold text-sky-700 underline underline-offset-4 dark:text-sky-300"
            >
              CosmicCalendarBuilder.php
            </a>
          </p>
        </article>

        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-emerald-900 uppercase dark:text-emerald-100">
            Reflection
          </h4>
          <p className="mt-2 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
            The most important part of this assignment was separating the live
            data step from the loop step. Once the API response was decoded, the
            rest of the problem became a clear set of loop boundaries and
            conditional checks. I also added a fallback date because a real page
            should not fail completely just because a third-party time API is
            temporarily unreachable.
          </p>
        </article>

        <div className="flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isPreviewOpen}
            label={
              isPreviewOpen
                ? "Close Module 2 Assignment 2B files"
                : "View Module 2 Assignment 2B files"
            }
            toggle={() => setIsPreviewOpen((prev) => !prev)}
          />
        </div>

        <ShowModalButton
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          files={assignment2BFiles}
        />
      </section>
    </div>
  );
}

function ModuleTwoQuiz() {
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
              Quiz: Module 2 - Condition Statements & Loops
            </h3>
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm leading-7 text-slate-700 dark:text-slate-200">
              <span>Started: Jun 24 at 1:57am</span>
              <span>Due: Jun 28 at 11:59pm</span>
              <span>10 pts</span>
              <span>Timed quiz</span>
            </p>
          </div>
        </div>
        <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
          Note: this is a timed quiz. You may check the remaining time you have
          at any point while taking the quiz by pressing the keyboard
          combination SHIFT, ALT, and T. Again: SHIFT, ALT, and T.
        </p>
      </header>

      <QuizGenerator questions={quizQuestions} answers={quizAnswers} />
    </section>
  );
}

export default function AssignmentMod2() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    "assignment-2a": false,
    "assignment-2b": false,
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
            Module 2
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
            Module 2 - Control Structures & Loops
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: Condition Statements & Loops
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            Continue building PHP fluency with condition statements, branching
            logic, and loop structures used to make server-side programs respond
            to changing data.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 2: Condition Statements & Loops"
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
        title="Module 2 Assignment 2A: if/else Business"
        isOpen={openSections["assignment-2a"]}
        onToggle={() => toggleSection("assignment-2a")}
      >
        <Assignment2AContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 2 Assignment 2B: Time loops"
        isOpen={openSections["assignment-2b"]}
        onToggle={() => toggleSection("assignment-2b")}
      >
        <Assignment2BContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 2 - Condition Statements & Loops"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <ModuleTwoQuiz />
      </AnimatedAccordionItem>
    </section>
  );
}
