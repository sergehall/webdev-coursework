import { useState } from "react";
import {
  ClipboardPenLine,
  FileText,
  GitBranch,
  Paperclip,
  Rocket,
} from "lucide-react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import {
  ModuleCompletionButton,
  ShowModalButton,
  ToggleModalButton,
} from "@/components/buttons";
import QuizGenerator from "@/components/quiz/QuizGenerator";
import { quizAnswers, quizQuestions } from "./quizData";
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

const assignment1AItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 1 Assignment 1A: Home Dev Environment & hello world",
  dueLabel: "Jun 28",
  pointsLabel: "20 pts",
};

const assignment1BItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 1 Assignment 1B: Setup Slack Account and App",
  dueLabel: "Jun 28",
  pointsLabel: "20 pts",
};

const assignment1APdf = {
  fileUrl: "/code-playground/CS85/mod-1/assignment_1a.pdf",
  filename: "assignment_1a.pdf",
};

function Assignment1AContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ul className="overflow-hidden rounded-xl border border-slate-200 bg-white/70 dark:border-slate-700 dark:bg-slate-950/30">
        <CanvasRow item={assignment1AItem} />
      </ul>

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Objective
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            The purpose of this assignment is to establish a complete,
            professional-grade PHP development environment on your personal
            computer using Laravel Herd. Along the way you will create your very
            first Laravel application, install Visual Studio Code as your code
            editor, install Git for version control, and push your work to
            GitHub. This is the same toolchain used by working developers in
            industry, and everything you set up here will be reused in every
            future assignment in this course. Take your time - doing this
            carefully once means you won't fight your tools later.
          </p>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-100">
            Important: Use Git & Push Often
          </h4>
          <p className="mt-2 text-sm leading-7 text-amber-950 dark:text-amber-100">
            Track your progress with frequent, meaningful Git commits rather
            than one final upload. A healthy commit history that shows progress
            over time is a habit you start building now and rely on for the rest
            of the course.
          </p>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Submit
          </h4>
          <div className="mt-3 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
              <h5 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <GitBranch aria-hidden="true" className="h-4 w-4" />
                GitHub Repository Link
              </h5>
              <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
                Submit the link to your repo, for example{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                  https://github.com/your-username/cs85_projects
                </code>
                .
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
              <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Screenshots
              </h5>
              <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
                Combine screenshots into one PDF or DOC before submitting.
              </p>
            </div>
          </div>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>The Laravel Herd app running.</li>
            <li>
              VS Code showing your edited{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                routes/web.php
              </code>{" "}
              file.
            </li>
            <li>
              Browser showing{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                http://cs85_projects.test
              </code>{" "}
              with your custom "Hello World from Laravel Herd!" message.
            </li>
            <li>Your GitHub repo showing the files pushed and committed.</li>
          </ul>
        </article>

        <div className="flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isPreviewOpen}
            label={
              isPreviewOpen
                ? "Close assignment_1a.pdf"
                : "View assignment_1a.pdf"
            }
            toggle={() => setIsPreviewOpen((prev) => !prev)}
          />
        </div>

        <ShowModalButton
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          files={[assignment1APdf]}
        />
      </section>
    </div>
  );
}

function Assignment1BContent() {
  return (
    <div className="space-y-4">
      <ul className="overflow-hidden rounded-xl border border-slate-200 bg-white/70 dark:border-slate-700 dark:bg-slate-950/30">
        <CanvasRow item={assignment1BItem} />
      </ul>

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Objective
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            To ensure all students are connected to the course communication
            platform, Slack, and can effectively communicate with the instructor
            and classmates.
          </p>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Task
          </h4>
          <div className="mt-3 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
              <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Sign Up for Slack
              </h5>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
                <li>Go to SlackLinks.</li>
                <li>
                  Click Sign Up and create an account using your preferred email
                  address, preferably your SMC email.
                </li>
                <li>Verify your email and complete your profile setup.</li>
              </ol>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
              <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Join the CS 85 Slack Workspace
              </h5>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
                <li>Click the invite link: Join CS 85 Slack Workspace.</li>
                <li>
                  Sign in with your newly created Slack account or use an
                  existing one if you already have Slack.
                </li>
                <li>
                  Set your display name to your full name as it appears in
                  Canvas for easy identification.
                </li>
              </ol>
            </div>
          </div>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Submission Instructions
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            Submit a screenshot showing the following:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>Your name visible in the CS 85 Slack Workspace.</li>
            <li>
              The workspace name{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-900 dark:bg-slate-800 dark:text-slate-100">
                smccs85sum2026
              </code>{" "}
              visible in the Slack interface.
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Why Slack?
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            Slack will be our primary communication tool for questions,
            discussions, and announcements throughout the semester in addition
            to Canvas announcements. Ensuring you are connected early will set
            you up for success in this course.
          </p>
        </article>
      </section>
    </div>
  );
}

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
