import { useState } from "react";
import type { ReactNode } from "react";
import { ClipboardPenLine } from "lucide-react";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

const assignment10AItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 10 Assignment 10A: User Authentication",
  dueLabel: "Jul 26",
  pointsLabel: "20 pts",
};

const assignmentPdfUrl =
  "/code-playground/CS85/mod-10/10a/Module_10A_completion_summary.pdf";

const assignmentPdfFiles = [
  {
    fileUrl: assignmentPdfUrl,
    filename: "Module_10A_completion_summary.pdf",
  },
];

const macProjectSetup = [
  "cd ~/Sites",
  "laravel new auth-demo",
  "cd auth-demo",
  "code .",
].join("\n");

const windowsProjectSetup = [
  "cd C:\\laravel-sites",
  "laravel new auth-demo",
  "cd auth-demo",
  "code .",
].join("\n");

const runProject = [
  "composer run dev",
  "",
  "# Alternative: run these in separate terminals",
  "php artisan serve",
  "npm run dev",
].join("\n");

const protectedDashboardRoute = [
  "Route::view('dashboard', 'dashboard')",
  "    ->middleware(['auth', 'verified'])",
  "    ->name('dashboard');",
].join("\n");

const secretPageRoute = "Route::view('secret', 'secret')->middleware('auth');";

const secretPageView = [
  "<!-- resources/views/secret.blade.php -->",
  "<h1>Members only!</h1>",
].join("\n");

const personalizedGreeting = "<p>Welcome back, {{ auth()->user()->name }}!</p>";

const authenticationFiles = [
  ["routes/auth.php", "Registration, login, logout, and password routes."],
  ["resources/views/livewire/auth/", "Authentication form views."],
  ["resources/views/dashboard.blade.php", "Protected dashboard view."],
  ["resources/views/livewire/settings/", "Profile and account settings."],
  ["app/Livewire/Actions/Logout.php", "Logout action."],
  ["config/fortify.php", "Authentication feature configuration."],
  ["database/migrations/", "User and authentication database tables."],
] as const;

const glossary = [
  ["Authentication", "Verifies who a user is."],
  ["Authorization", "Determines what an authenticated user may access."],
  ["Hash", "A one-way representation used to store passwords safely."],
  ["Session", "Keeps a user signed in across multiple requests."],
  ["Middleware", "Checks a request before it reaches protected content."],
  ["Fortify", "Laravel's backend authentication feature layer."],
  ["Livewire and Volt", "Tools for interactive Laravel interfaces."],
] as const;

export default function Assignment10AContent() {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleItemBlock item={assignment10AItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <SectionHeading>Objective</SectionHeading>
          <p className="mt-3 text-sm leading-7 text-sky-950 dark:text-sky-100">
            Install a complete user authentication system with an official
            Laravel 12 starter kit, explore the generated code, verify
            registration and login, and explain the commands and concepts that
            make the system work.
          </p>
        </article>

        <article className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/50 dark:bg-violet-950/30">
          <SectionHeading>
            Part A — Before You Touch the Keyboard: The Concepts
          </SectionHeading>
          <div className="mt-3 space-y-4 text-sm leading-7 text-violet-950 dark:text-violet-100">
            <p>
              <strong>Authentication</strong> is the identity check: it answers
              “Who are you?” <strong>Authorization</strong> happens afterward
              and decides what that authenticated user is allowed to do—like a
              VIP wristband that grants access to a specific area.
            </p>
            <p>
              Social networks, banking apps, Canvas, and online stores all need
              authentication to connect people with private, personalized data.
              Use Laravel&apos;s tested authentication tools instead of building
              the entire security flow with raw PHP.
            </p>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <ConceptCard title="1. Password Hashing">
              Passwords must be stored as one-way hashes, never as plain text.
            </ConceptCard>
            <ConceptCard title="2. Sessions">
              A session and its browser cookie keep a verified user signed in
              between requests.
            </ConceptCard>
            <ConceptCard title="3. Middleware">
              The auth middleware acts as a checkpoint before a protected route
              is displayed.
            </ConceptCard>
          </div>
        </article>

        <article className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900/50 dark:bg-cyan-950/30">
          <SectionHeading>Laravel 12 Starter Kit</SectionHeading>
          <div className="mt-3 space-y-3 text-sm leading-7 text-cyan-950 dark:text-cyan-100">
            <p>
              A starter kit scaffolds the routes, forms, views, and backend
              behavior required for authentication. Laravel Fortify provides the
              backend features; Livewire and Volt provide interactive
              components; Blade renders templates; and Tailwind CSS with Flux UI
              styles the interface.
            </p>
            <p>
              <strong>Laravel 12 note:</strong> Breeze and Jetstream are no
              longer the current starter-kit path. Choose the official Livewire
              starter kit. Tutorials beginning with{" "}
              <code>composer require laravel/breeze</code> describe an older
              workflow.
            </p>
          </div>
        </article>

        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <SectionHeading>Part B — Build It</SectionHeading>

          <TutorialStep title="Step 1: Create the Laravel Project">
            <p className="font-semibold">macOS</p>
            <CodeBlock>{macProjectSetup}</CodeBlock>
            <p className="font-semibold">Windows</p>
            <CodeBlock>{windowsProjectSetup}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Installer Answers">
            <dl className="grid gap-2 sm:grid-cols-2">
              <InstallerChoice label="Starter kit" value="Livewire" />
              <InstallerChoice
                label="Authentication provider"
                value="Laravel"
              />
              <InstallerChoice label="Volt" value="Yes" />
              <InstallerChoice label="Testing framework" value="Pest" />
              <InstallerChoice label="Database" value="SQLite" />
              <InstallerChoice label="Install and build assets" value="Yes" />
            </dl>
            <p>
              This generates registration, login, password reset, email
              verification, dashboard, and settings features. The required
              SQLite tables are created automatically.
            </p>
          </TutorialStep>

          <TutorialStep title="Step 2: Run and Test the App">
            <CodeBlock>{runProject}</CodeBlock>
            <p>Visit and test each generated page:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <code>/register</code> — create an account.
              </li>
              <li>
                <code>/login</code> — sign in with the new account.
              </li>
              <li>
                <code>/dashboard</code> — verify protected access.
              </li>
              <li>Open Settings and then test Log Out.</li>
            </ul>
            <p>
              Visit <code>/dashboard</code> while logged out to confirm the auth
              middleware redirects you to login. Sign in and visit it again to
              confirm access is granted.
            </p>
          </TutorialStep>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <SectionHeading>Part C — Read the Code</SectionHeading>
          <div className="mt-3 space-y-4 text-sm leading-7 text-amber-950 dark:text-amber-100">
            <p>
              Follow the login journey from a form in{" "}
              <code>resources/views/livewire/auth</code>, through{" "}
              <code>routes/auth.php</code> and Fortify configuration, into the
              authenticated session, and finally to the dashboard view.
            </p>

            <CodeBlock>{protectedDashboardRoute}</CodeBlock>
            <p>
              The <code>auth</code> middleware requires a signed-in user and the{" "}
              <code>verified</code> middleware requires a verified email. As a
              short experiment, remove <code>auth</code>, observe the result
              while logged out, and restore it immediately afterward.
            </p>

            <dl className="grid gap-3 md:grid-cols-2">
              {authenticationFiles.map(([file, description]) => (
                <div
                  key={file}
                  className="rounded-lg border border-amber-200 bg-white/70 p-3 dark:border-amber-900/60 dark:bg-slate-950/30"
                >
                  <dt>
                    <code className="font-semibold">{file}</code>
                  </dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>

        <article className="rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-950/30">
          <SectionHeading>Part D — Make It Yours</SectionHeading>
          <div className="mt-3 space-y-4 text-sm leading-7 text-orange-950 dark:text-orange-100">
            <TutorialStep title="Create a Protected /secret Page">
              <CodeBlock>{secretPageRoute}</CodeBlock>
              <CodeBlock>{secretPageView}</CodeBlock>
            </TutorialStep>

            <TutorialStep title="Personalize the Dashboard">
              <CodeBlock>{personalizedGreeting}</CodeBlock>
            </TutorialStep>

            <section>
              <h5 className="font-semibold">README Short-Answer Questions</h5>
              <ol className="mt-2 ml-5 list-decimal space-y-2">
                <li>
                  What is the difference between authentication and
                  authorization?
                </li>
                <li>
                  Why are passwords hashed instead of stored as plain text?
                </li>
                <li>Which file defines the login and register routes?</li>
                <li>
                  What does the auth middleware do, and what happens when a
                  logged-out visitor opens a protected page?
                </li>
              </ol>
            </section>
          </div>
        </article>

        <article className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
          <SectionHeading>Part E — Submit</SectionHeading>
          <ol className="mt-3 ml-5 list-decimal space-y-2 text-sm leading-7 text-rose-950 dark:text-rose-100">
            <li>
              Push the project to a GitHub repository named{" "}
              <code>module10a-auth</code>. Confirm that <code>.env</code> is
              excluded from Git.
            </li>
            <li>
              Capture registration, login, personalized dashboard, protected{" "}
              <code>/secret</code>, and VS Code <code>routes/auth.php</code>{" "}
              screenshots.
            </li>
            <li>Submit the GitHub URL and screenshots to Canvas.</li>
          </ol>
        </article>

        <article className="rounded-xl border border-fuchsia-200 bg-fuchsia-50 p-4 dark:border-fuchsia-900/50 dark:bg-fuchsia-950/30">
          <SectionHeading>Grading Highlights</SectionHeading>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-fuchsia-950 dark:text-fuchsia-100">
            <li>The Livewire starter-kit application runs correctly.</li>
            <li>Registration, login, dashboard, and logout all work.</li>
            <li>
              The protected secret page and personalized greeting are present.
            </li>
            <li>The README contains all four short answers.</li>
            <li>The GitHub repository does not contain the .env file.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/60">
          <SectionHeading>Troubleshooting and Glossary</SectionHeading>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>
              If <code>laravel</code> is not found, confirm Laravel Installer
              and Composer&apos;s global bin path are configured.
            </li>
            <li>
              If the page is unstyled, run <code>npm install</code> and{" "}
              <code>npm run dev</code>.
            </li>
            <li>
              If the SQLite database is missing, create{" "}
              <code>database/database.sqlite</code> and run{" "}
              <code>php artisan migrate</code>.
            </li>
            <li>
              If login fails, verify the credentials and hard-refresh the
              browser after rebuilding assets.
            </li>
          </ul>
          <dl className="mt-4 grid gap-3 text-sm leading-7 text-slate-700 md:grid-cols-2 dark:text-slate-200">
            {glossary.map(([term, description]) => (
              <div
                key={term}
                className="rounded-lg border border-slate-200 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-950/30"
              >
                <dt className="font-semibold">{term}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
          <SectionHeading>Completed Assignment</SectionHeading>
          <div className="mt-3 space-y-3 text-sm leading-7 text-indigo-950 dark:text-indigo-100">
            <p>
              The completed report documents registration, login, logout, a
              personalized protected dashboard, the members-only secret page,
              authentication routes, and answers to all four concept questions.
            </p>
            <p>
              The course-aligned solution is integrated into a larger Laravel 13
              application with a custom Blade/controller authentication layer
              while preserving the assignment&apos;s required routes and
              behavior. The report also demonstrates MFA, GitHub OAuth, roles,
              session revocation, audit logs, and administrative user controls.
            </p>
            <p>
              GitHub repository:{" "}
              <a
                href="https://github.com/sergehall/cs85-php-programming/tree/main/assignments/module10a"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2"
              >
                cs85-php-programming / assignments / module10a
              </a>
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <ToggleModalButton
              isOpen={isPdfOpen}
              label={isPdfOpen ? "Close assignment PDF" : "View assignment PDF"}
              toggle={() => setIsPdfOpen((previous) => !previous)}
            />
            <a
              href={assignmentPdfUrl}
              download="Module_10A_completion_summary.pdf"
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

function ConceptCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-violet-200 bg-white/70 p-3 dark:border-violet-900/60 dark:bg-slate-950/30">
      <h5 className="font-semibold">{title}</h5>
      <p className="mt-1 text-sm leading-7">{children}</p>
    </section>
  );
}

function InstallerChoice({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-emerald-200 bg-white/70 p-3 dark:border-emerald-900/60 dark:bg-slate-950/30">
      <dt className="font-semibold">{label}</dt>
      <dd>{value}</dd>
    </div>
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
    <section className="mt-5 text-sm leading-7 text-inherit">
      <h5 className="font-semibold">{title}</h5>
      <div className="mt-2 space-y-3">{children}</div>
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
