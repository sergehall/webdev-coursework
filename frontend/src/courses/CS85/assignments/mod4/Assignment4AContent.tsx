import { useState } from "react";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";

const assignment4AFiles = [
  {
    fileUrl: "/code-playground/CS85/mod-4/Module4_Assignment_4A.pdf",
    filename: "Module4_Assignment_4A.pdf",
  },
];

export function Assignment4AContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-4">
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Objective
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            By the end of this assignment, you will have a working local
            environment with PHP, MySQL, and phpMyAdmin using either Laravel
            Herd on macOS or XAMPP cross-platform. You will confirm the setup by
            logging into your MySQL server and submitting screenshots.
          </p>
        </article>

        <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
            Learning Goals
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-sky-950 dark:text-sky-100">
            <li>Install and configure PHP and MySQL locally.</li>
            <li>Understand different development environment options.</li>
            <li>
              Log into a MySQL server using a graphical or command-line
              interface.
            </li>
            <li>Access and manage databases with phpMyAdmin.</li>
          </ul>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Option 1: Laravel Herd Setup (macOS)
          </h4>
          <div className="mt-2 space-y-4 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Install Laravel Herd
              </p>
              <p>
                Go to{" "}
                <a
                  href="https://herd.laravel.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-sky-700 underline underline-offset-4 dark:text-sky-300"
                >
                  herd.laravel.com
                </a>
                , download and install the application, then open Herd to verify
                PHP is running.
              </p>
            </div>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Install MySQL
              </p>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                <code>{`brew install mysql
sudo mysql_secure_installation`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Add and secure phpMyAdmin
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-2">
                <li>
                  Download phpMyAdmin from{" "}
                  <a
                    href="https://www.phpmyadmin.net/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-sky-700 underline underline-offset-4 dark:text-sky-300"
                  >
                    phpmyadmin.net
                  </a>
                  .
                </li>
                <li>
                  Move the unzipped folder into your
                  <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
                    ~/Herd
                  </code>
                  directory.
                </li>
                <li>In Terminal, navigate to the folder and run:</li>
              </ul>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                <code>{`herd link
herd secure`}</code>
              </pre>
              <p className="mt-2">
                Open{" "}
                <a
                  href="https://phpmyadmin.test/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-sky-700 underline underline-offset-4 dark:text-sky-300"
                >
                  https://phpmyadmin.test
                </a>{" "}
                in your browser.
              </p>
            </div>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Log in to MySQL
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-2">
                <li>
                  Browser: use phpMyAdmin with username
                  <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
                    root
                  </code>
                  and a blank password or the password set during installation.
                </li>
                <li>
                  Terminal:
                  <code className="ml-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
                    mysql -u root -p
                  </code>
                </li>
              </ul>
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-emerald-900 uppercase dark:text-emerald-100">
            Option 2: XAMPP Setup (Windows/macOS/Linux)
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
            <li>
              Go to{" "}
              <a
                href="https://www.apachefriends.org/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-sky-700 underline underline-offset-4 dark:text-sky-300"
              >
                apachefriends.org
              </a>{" "}
              and install XAMPP for your OS.
            </li>
            <li>Open the XAMPP Control Panel and start Apache and MySQL.</li>
            <li>
              Open{" "}
              <a
                href="http://localhost/phpmyadmin"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-sky-700 underline underline-offset-4 dark:text-sky-300"
              >
                http://localhost/phpmyadmin
              </a>{" "}
              in your browser.
            </li>
            <li>Log in using phpMyAdmin or the command line.</li>
          </ul>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
            <code>mysql -u root -p</code>
          </pre>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-100">
            Canvas Submission
          </h4>
          <p className="mt-2 text-sm leading-7 text-amber-950 dark:text-amber-100">
            Submit a single PDF or DOC file with screenshots based on the setup
            option you used.
          </p>
          <div className="mt-3 grid gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-amber-200 bg-white/80 p-3 dark:border-amber-900/60 dark:bg-slate-950/30">
              <p className="text-sm font-semibold text-amber-950 dark:text-amber-100">
                Laravel Herd screenshots
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-amber-950 dark:text-amber-100">
                <li>Laravel Herd running.</li>
                <li>Terminal showing MySQL installed or running.</li>
                <li>Browser with https://phpmyadmin.test open.</li>
                <li>Logged into MySQL through phpMyAdmin or the terminal.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-amber-200 bg-white/80 p-3 dark:border-amber-900/60 dark:bg-slate-950/30">
              <p className="text-sm font-semibold text-amber-950 dark:text-amber-100">
                XAMPP screenshots
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-amber-950 dark:text-amber-100">
                <li>XAMPP Control Panel with Apache and MySQL running.</li>
                <li>Browser with http://localhost/phpmyadmin open.</li>
                <li>Logged into MySQL through phpMyAdmin or the terminal.</li>
              </ul>
            </div>
          </div>
        </article>

        <div className="flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isPreviewOpen}
            label={
              isPreviewOpen
                ? "Close Module 4 Assignment 4A files"
                : "View Module 4 Assignment 4A files"
            }
            toggle={() => setIsPreviewOpen((prev) => !prev)}
          />
        </div>

        <ShowModalButton
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          files={assignment4AFiles}
        />
      </section>
    </div>
  );
}
