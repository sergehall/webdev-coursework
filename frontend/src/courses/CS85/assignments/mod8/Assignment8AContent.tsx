import { useState } from "react";
import type { ReactNode } from "react";
import { ClipboardPenLine } from "lucide-react";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

const assignment8AItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 8 Assignment 8A: Laravel w/ Database Environment",
  dueLabel: "Jul 19",
  pointsLabel: "20 pts",
};

const migrationScreenshotFiles = [
  {
    fileUrl: "/code-playground/CS85/mod-8/8a/php_artisan_migrate.png",
    filename: "php_artisan_migrate.png",
  },
];

const submissionArtifacts = [
  {
    href: "/code-playground/CS85/mod-8/8a/README.md",
    filename: "README.md",
    description:
      "Setup instructions, implementation notes, and troubleshooting.",
  },
  {
    href: "/code-playground/CS85/mod-8/8a/env.example",
    filename: ".env.example",
    description: "Sanitized local configuration with placeholder credentials.",
  },
  {
    href: "/code-playground/CS85/mod-8/8a/php_artisan_migrate.png",
    filename: "php_artisan_migrate.png",
    description: "Screenshot confirming successful Laravel migrations.",
  },
];

export default function Assignment8AContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleItemBlock item={assignment8AItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <SectionHeading>Objective</SectionHeading>
          <p className="mt-2 text-sm leading-7 text-sky-950 dark:text-sky-100">
            The purpose of this assignment is to help students learn how to
            configure a Laravel application to connect to a MySQL database using
            local tools. Students will use Herd if they are on macOS or XAMPP if
            they are on Windows. They will verify their configuration by running
            a test migration and prepare their project to be shared with others
            via GitHub using best practices.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/60">
          <SectionHeading>Tools Needed</SectionHeading>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>Laravel, installed using Composer.</li>
            <li>Herd for macOS users or XAMPP for Windows users.</li>
            <li>Visual Studio Code as the IDE.</li>
            <li>
              Git and a GitHub account for version control and submission.
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <SectionHeading>Tutorial: Step-by-Step Instructions</SectionHeading>

          <TutorialStep title="Step 1: Install Laravel">
            <p>Laravel should be installed globally using Composer:</p>
            <CodeBlock>composer global require laravel/installer</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 2: Create a New Laravel Project">
            <CodeBlock>{`laravel new orm_practice
cd orm_practice
code .`}</CodeBlock>
          </TutorialStep>
        </article>

        <article className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/50 dark:bg-violet-950/30">
          <SectionHeading>
            Step 3: Start the MySQL Server Using Herd or XAMPP
          </SectionHeading>
          <div className="mt-3 grid gap-4 text-sm leading-7 text-violet-950 md:grid-cols-2 dark:text-violet-100">
            <div className="rounded-lg border border-violet-200 bg-white/70 p-4 dark:border-violet-900/60 dark:bg-slate-950/30">
              <p className="font-semibold">For macOS (Herd)</p>
              <ul className="mt-2 ml-5 list-disc space-y-2">
                <li>Launch Herd and ensure MySQL is running.</li>
                <li>Host: 127.0.0.1</li>
                <li>Port: 3306</li>
                <li>Username: root</li>
                <li>Password: blank</li>
              </ul>
            </div>
            <div className="rounded-lg border border-violet-200 bg-white/70 p-4 dark:border-violet-900/60 dark:bg-slate-950/30">
              <p className="font-semibold">For Windows (XAMPP)</p>
              <ul className="mt-2 ml-5 list-disc space-y-2">
                <li>Start MySQL and Apache in the XAMPP Control Panel.</li>
                <li>
                  <a
                    href="http://localhost/phpmyadmin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline underline-offset-2"
                  >
                    Open phpMyAdmin
                  </a>
                  .
                </li>
                <li>
                  Create a database named{" "}
                  <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                    orm_practice_db
                  </code>
                  .
                </li>
              </ul>
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900/50 dark:bg-cyan-950/30">
          <SectionHeading>
            Step 4: Configure Laravel&apos;s .env File
          </SectionHeading>
          <p className="mt-2 text-sm leading-7 text-cyan-950 dark:text-cyan-100">
            Update the local .env file with the MySQL connection settings:
          </p>
          <CodeBlock>{`DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=orm_practice_db
DB_USERNAME=root
DB_PASSWORD=`}</CodeBlock>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <SectionHeading>Step 5: Run Migrations</SectionHeading>
          <CodeBlock>php artisan migrate</CodeBlock>
        </article>

        <article className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
          <SectionHeading>Step 6: Prepare for GitHub Submission</SectionHeading>
          <ol className="mt-3 ml-5 list-decimal space-y-2 text-sm leading-7 text-rose-950 dark:text-rose-100">
            <li>
              Copy .env to .env.example, then remove every real credential and
              secret value.
            </li>
            <li>Initialize Git, add the project files, and create a commit.</li>
            <li>Create a GitHub repository and push the project.</li>
          </ol>
          <CodeBlock>{`cp .env .env.example
git init
git add .
git commit -m "Configure Laravel MySQL environment"`}</CodeBlock>
          <div className="mt-4 rounded-lg border border-rose-300 bg-white/70 p-3 text-sm leading-6 text-rose-950 dark:border-rose-900 dark:bg-slate-950/30 dark:text-rose-100">
            <strong className="block">Security check</strong>
            Never commit the real .env file. Confirm that .env.example contains
            only safe defaults or placeholders before pushing to GitHub.
          </div>
        </article>

        <article className="rounded-xl border border-teal-200 bg-teal-50 p-4 dark:border-teal-900/50 dark:bg-teal-950/30">
          <SectionHeading>What to Submit</SectionHeading>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-teal-950 dark:text-teal-100">
            <li>A sanitized .env.example file.</li>
            <li>
              A README.md with setup instructions and troubleshooting notes.
            </li>
            <li>A screenshot of successful php artisan migrate output.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
          <SectionHeading>Completed Project Artifacts</SectionHeading>
          <p className="mt-2 text-sm leading-7 text-indigo-950 dark:text-indigo-100">
            The completed coursework adapts the tutorial to the existing Laravel
            repository and its Docker-based MySQL service. The README documents
            the named database connection, port 3307, migration command, and
            troubleshooting steps.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {submissionArtifacts.map((artifact) => (
              <a
                key={artifact.href}
                href={artifact.href}
                download={artifact.filename}
                className="rounded-lg border border-indigo-200 bg-white/80 p-4 transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none dark:border-indigo-900/60 dark:bg-slate-950/30 dark:hover:bg-slate-950/60"
              >
                <span className="block font-semibold text-indigo-950 dark:text-indigo-100">
                  {artifact.filename}
                </span>
                <span className="mt-1 block text-xs leading-5 text-indigo-800 dark:text-indigo-200">
                  {artifact.description}
                </span>
              </a>
            ))}
          </div>
        </article>

        <div className="flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isPreviewOpen}
            label={
              isPreviewOpen
                ? "Close migration screenshot"
                : "View migration screenshot"
            }
            toggle={() => setIsPreviewOpen((previous) => !previous)}
          />
        </div>

        <ShowModalButton
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          files={migrationScreenshotFiles}
        />
      </section>
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h4 className="text-sm font-semibold tracking-wide text-slate-900 uppercase dark:text-white">
      {children}
    </h4>
  );
}

function TutorialStep({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-4 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
      <h5 className="font-semibold">{title}</h5>
      <div className="mt-2 space-y-2">{children}</div>
    </section>
  );
}

function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
      <code>{children}</code>
    </pre>
  );
}
