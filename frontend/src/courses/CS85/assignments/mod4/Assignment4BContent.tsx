import { useState } from "react";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";

const assignment4BFiles = [
  {
    fileUrl: "/code-playground/CS85/mod-4/Module4_Assignment_4B.pdf",
    filename: "Module4_Assignment_4B.pdf",
  },
  {
    fileUrl: "/code-playground/CS85/mod-4/show_inventory.php",
    filename: "show_inventory.php",
  },
];

export function Assignment4BContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-4">
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Learning Objectives
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>Understand how to design and populate a database table.</li>
            <li>Use PDO in PHP to connect to a MySQL database.</li>
            <li>
              Retrieve and display data securely using prepared statements.
            </li>
            <li>Reflect on database design and basic SQL usage.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
            Assignment Description
          </h4>
          <p className="mt-2 text-sm leading-7 text-sky-950 dark:text-sky-100">
            Create a personal inventory database and a PHP script that displays
            your items. This project gives you hands-on experience with MySQL
            and secure access to data using PHP&apos;s PDO extension.
          </p>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Tutorial: Connecting to MySQL with PDO and Displaying Data
          </h4>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {[
              "Create the Database",
              "Insert Sample Records",
              "PHP Code to Display Items",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950/40"
              >
                <p className="text-xs font-semibold tracking-wide text-sky-700 uppercase dark:text-sky-300">
                  Step {index + 1}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-emerald-900 uppercase dark:text-emerald-100">
            Your Task
          </h4>
          <div className="mt-2 grid gap-4 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-emerald-950 dark:text-emerald-100">
                Create the Database
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
                <li>
                  Use Laravel Herd/XAMPP and MySQL to create
                  <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                    inventory_db
                  </code>
                  .
                </li>
                <li>
                  Create a table named
                  <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                    items
                  </code>
                  .
                </li>
                <li>Insert 5 or more of your own items.</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-950 dark:text-emerald-100">
                Create PHP File
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
                <li>
                  Save it as
                  <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                    show_inventory.php
                  </code>
                  .
                </li>
                <li>
                  Place it in the
                  <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                    module4b
                  </code>
                  folder inside
                  <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                    cs85_projects
                  </code>
                  .
                </li>
                <li>
                  Use PDO to connect, retrieve items, and display them in a
                  table or list.
                </li>
              </ul>
            </div>
          </div>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Comment and Reflect
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            Write a paragraph in PHP comments explaining:
          </p>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>Why you chose your items.</li>
            <li>How this could scale to real-world inventory systems.</li>
            <li>How using PDO protects from SQL injection.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900/50 dark:bg-cyan-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-cyan-900 uppercase dark:text-cyan-100">
            Implementation Notes
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-cyan-950 dark:text-cyan-100">
            <li>
              Test URL:
              <code className="ml-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                http://127.0.0.1:8000/module4b/show_inventory.php
              </code>
            </li>
            <li>Use prepared statements when retrieving inventory records.</li>
            <li>
              Escape displayed database values before rendering them into HTML.
            </li>
            <li>
              Optional enhancements can include search, filtering, categories,
              quantity thresholds, and sorting.
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-100">
            Canvas Submission
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-amber-950 dark:text-amber-100">
            <li>
              Create a GitHub repository named
              <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                cs85-module4b-inventory
              </code>
              .
            </li>
            <li>Push your file with at least 3 meaningful commits.</li>
            <li>Submit the GitHub URL and upload your PHP file to Canvas.</li>
            <li>
              Submit your test URL, for example
              <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                http://localhost/module4b/show_inventory.php
              </code>
              .
            </li>
          </ul>
          <p className="mt-3 text-sm leading-7 text-amber-950 dark:text-amber-100">
            GitHub source:
            <a
              href="https://github.com/sergehall/cs85-php-programming/blob/main/public/module4b/show_inventory.php"
              target="_blank"
              rel="noreferrer"
              className="ml-1 font-semibold text-sky-700 underline underline-offset-4 dark:text-sky-300"
            >
              show_inventory.php
            </a>
          </p>
        </article>

        <div className="flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isPreviewOpen}
            label={
              isPreviewOpen
                ? "Close Module 4 Assignment 4B files"
                : "View Module 4 Assignment 4B files"
            }
            toggle={() => setIsPreviewOpen((prev) => !prev)}
          />
        </div>

        <ShowModalButton
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          files={assignment4BFiles}
        />
      </section>
    </div>
  );
}
