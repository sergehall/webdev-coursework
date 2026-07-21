import { useState } from "react";
import type { ReactNode } from "react";
import { ClipboardPenLine } from "lucide-react";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

const assignment9AItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 9 Assignment 9A: Contact List App",
  dueLabel: "Jul 26",
  pointsLabel: "20 pts",
};

const assignmentPdfUrl =
  "/code-playground/CS85/mod-9/9a/Module9_Assignment_9A.pdf";

const assignmentPdfFiles = [
  {
    fileUrl: assignmentPdfUrl,
    filename: "Module9_Assignment_9A.pdf",
  },
];

const projectSetup = ["cd ~/Sites", "laravel new contact-list"].join("\n");

const databaseSetup = [
  "mysql -u root -p",
  "CREATE DATABASE contact_list;",
  "EXIT;",
].join("\n");

const databaseEnvironment = [
  "DB_CONNECTION=mysql",
  "DB_HOST=127.0.0.1",
  "DB_PORT=3306",
  "DB_DATABASE=contact_list",
  "DB_USERNAME=root",
  "DB_PASSWORD=your_mysql_password",
].join("\n");

const migrationFields = [
  "$table->id();",
  "$table->string('name');",
  "$table->string('email')->unique();",
  "$table->string('phone');",
  "$table->timestamps();",
].join("\n");

const controllerAndRoutes = [
  "php artisan make:controller ContactController --resource",
  "",
  "Route::resource('contacts', ContactController::class);",
].join("\n");

const fillableFields = "protected $fillable = ['name', 'email', 'phone'];";

const laravelConcepts = [
  ["Routing", "Connect URLs to controller logic."],
  ["Controllers", "Handle business logic."],
  ["Models", "Communicate with the database."],
  ["Migrations", "Create and update database tables."],
  ["Blade Views", "Render HTML with PHP-like syntax."],
  ["Validation", "Prevent bad user input."],
  ["CSRF Tokens", "Protect forms from attacks."],
] as const;

export default function Assignment9AContent() {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleItemBlock item={assignment9AItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <SectionHeading>Learning Objectives</SectionHeading>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-sky-950 dark:text-sky-100">
            <li>Build a Laravel CRUD app.</li>
            <li>Connect Laravel to MySQL.</li>
            <li>Use MVC: Models, Views, and Controllers.</li>
            <li>Handle form validation.</li>
            <li>Use GitHub and Canvas for submission.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/50 dark:bg-violet-950/30">
          <SectionHeading>App Overview</SectionHeading>
          <p className="mt-2 text-sm leading-7 text-violet-950 dark:text-violet-100">
            Create an app that allows you to:
          </p>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-violet-950 dark:text-violet-100">
            <li>Add a contact with a name, email address, and phone number.</li>
            <li>View the contact list.</li>
            <li>Edit contacts.</li>
            <li>Delete contacts.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900/50 dark:bg-cyan-950/30">
          <SectionHeading>Laravel Concepts</SectionHeading>
          <dl className="mt-3 grid gap-3 text-sm leading-7 text-cyan-950 md:grid-cols-2 dark:text-cyan-100">
            {laravelConcepts.map(([term, description]) => (
              <div
                key={term}
                className="rounded-lg border border-cyan-200 bg-white/70 p-3 dark:border-cyan-900/60 dark:bg-slate-950/30"
              >
                <dt className="font-semibold">{term}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/60">
          <SectionHeading>Tools</SectionHeading>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>Laravel via Laravel Herd (free).</li>
            <li>MySQL Community Edition, installed separately.</li>
            <li>Optional: TablePlus or MySQL Workbench.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <SectionHeading>Project Setup</SectionHeading>

          <TutorialStep title="1. Create Laravel Project">
            <CodeBlock>{projectSetup}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="2. Install MySQL">
            <p>Download MySQL Community Edition from:</p>
            <a
              href="https://dev.mysql.com/downloads/mysql/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex font-semibold underline underline-offset-2"
            >
              https://dev.mysql.com/downloads/mysql/
            </a>
          </TutorialStep>

          <TutorialStep title="3. Create MySQL Database">
            <CodeBlock>{databaseSetup}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="4. Update the .env File">
            <CodeBlock>{databaseEnvironment}</CodeBlock>
            <p>
              Replace the password placeholder with your local MySQL password.
              Never commit the real .env file or database credentials to GitHub.
            </p>
          </TutorialStep>

          <TutorialStep title="5. Create the Model and Migration">
            <CodeBlock>php artisan make:model Contact -m</CodeBlock>
            <p className="font-semibold">Migration file fields</p>
            <CodeBlock>{migrationFields}</CodeBlock>
            <p className="font-semibold">Run the migration</p>
            <CodeBlock>php artisan migrate</CodeBlock>
          </TutorialStep>

          <TutorialStep title="6. Create the Controller and Routes">
            <CodeBlock>{controllerAndRoutes}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="7. Configure Model Fillable Fields">
            <CodeBlock>{fillableFields}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="8. Build Controller Logic">
            <p>
              Refer to the Laravel CRUD controller example from the course
              notes. Implement the resource actions needed to list, create,
              store, edit, update, and delete contacts.
            </p>
          </TutorialStep>

          <TutorialStep title="9. Create Views">
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <code>layout.blade.php</code> - master layout.
              </li>
              <li>
                <code>index.blade.php</code> - show the contact list.
              </li>
              <li>
                <code>create.blade.php</code> - add contact form.
              </li>
              <li>
                <code>edit.blade.php</code> - edit contact form.
              </li>
            </ul>
          </TutorialStep>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <SectionHeading>Testing the App</SectionHeading>
          <CodeBlock>php artisan serve</CodeBlock>
          <p className="mt-3 text-sm leading-7 text-amber-950 dark:text-amber-100">
            Then visit:
          </p>
          <a
            href="http://127.0.0.1:8000/contacts"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex text-sm font-semibold text-amber-950 underline underline-offset-2 dark:text-amber-100"
          >
            http://127.0.0.1:8000/contacts
          </a>
        </article>

        <article className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
          <SectionHeading>Submission Instructions</SectionHeading>
          <ol className="mt-3 ml-5 list-decimal space-y-2 text-sm leading-7 text-rose-950 dark:text-rose-100">
            <li>Push the project to GitHub.</li>
            <li>ZIP the Laravel project folder.</li>
            <li>Submit the GitHub link and ZIP file to Canvas.</li>
          </ol>
        </article>

        <article className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
          <SectionHeading>Completed Assignment</SectionHeading>
          <p className="mt-2 text-sm leading-7 text-indigo-950 dark:text-indigo-100">
            Open the completed Module 9 Assignment 9A report to review the
            Contact List CRUD implementation, Laravel and MySQL architecture,
            validation, CSRF protection, screenshots, tests, and project links.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <ToggleModalButton
              isOpen={isPdfOpen}
              label={isPdfOpen ? "Close assignment PDF" : "View assignment PDF"}
              toggle={() => setIsPdfOpen((previous) => !previous)}
            />
            <a
              href={assignmentPdfUrl}
              download="Module9_Assignment_9A.pdf"
              className="inline-flex items-center justify-center rounded-lg border border-indigo-300 bg-white px-4 py-2 text-sm font-semibold text-indigo-900 transition-colors hover:bg-indigo-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none dark:border-indigo-800 dark:bg-slate-950/40 dark:text-indigo-100 dark:hover:bg-slate-950/70"
            >
              Download assignment PDF
            </a>
          </div>
        </article>

        <ShowModalButton
          isOpen={isPdfOpen}
          onClose={() => setIsPdfOpen(false)}
          files={assignmentPdfFiles}
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
    <section className="mt-5 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
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
