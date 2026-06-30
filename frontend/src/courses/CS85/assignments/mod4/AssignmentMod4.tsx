import { useState } from "react";
import { FileText, Paperclip, Rocket, type LucideIcon } from "lucide-react";

import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import {
  ModuleCompletionButton,
  ShowModalButton,
  ToggleModalButton,
} from "@/components/buttons";
import QuizGenerator from "@/components/quiz/QuizGenerator";
import type { CorrectAnswerDto } from "@/components/quiz/types/correct-answers-map.type";
import type { UIQuestion } from "@/components/quiz/types/UIQuestion.type";

type ModuleSectionId =
  | "readme"
  | "required-reading"
  | "assignment-4a"
  | "assignment-4b"
  | "quiz";

type CanvasItem = {
  icon: LucideIcon;
  title: string;
  dueLabel?: string;
  pointsLabel?: string;
};

const readmeItem: CanvasItem = {
  icon: FileText,
  title: "ReadMe Module 4: Database Fundamentals",
};

const requiredReadingItem: CanvasItem = {
  icon: Paperclip,
  title: "module4_databases.pdf",
};

const assignment4AFiles = [
  {
    fileUrl: "/code-playground/CS85/mod-4/Module4_Assignment_4A.pdf",
    filename: "Module4_Assignment_4A.pdf",
  },
];

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

const moduleFourQuizId = "CS85Module4DatabaseQuiz";

const quizQuestions: UIQuestion[] = [
  {
    id: 1,
    question: "What does PDO stand for in PHP?",
    options: [
      "PHP Data Operations",
      "Public Data Operator",
      "PHP Data Objects",
      "Programming Database Objects",
    ],
  },
  {
    id: 2,
    question: "Which SQL command retrieves data from a table?",
    options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
  },
  {
    id: 3,
    question: "Which SQL command is used to add new data?",
    options: ["SELECT", "ALTER", "INSERT", "DELETE"],
  },
  {
    id: 4,
    question:
      "Which clause is critical for targeting specific rows in SELECT or UPDATE?",
    options: ["HAVING", "GROUP BY", "WHERE", "ORDER BY"],
  },
  {
    id: 5,
    question: "In a SQL query what does the % symbol do when used with LIKE?",
    options: [
      "It ignores nulls",
      "It matches any number of characters",
      "It matches numeric types",
      "It validates email input",
    ],
  },
  {
    id: 6,
    question: "Which of the following statements about primary keys is true?",
    options: [
      "They uniquely identify each row",
      "They accept duplicate values",
      "They allow null values",
      "They store user passwords",
    ],
  },
  {
    id: 7,
    question: "What type of key connects records in related tables?",
    options: ["Composite Key", "Soft Key", "Foreign Key", "Primary Key"],
  },
  {
    id: 8,
    question: "Which SQL data type is best for storing prices?",
    options: ["TEXT", "FLOAT", "DECIMAL", "INT"],
  },
  {
    id: 9,
    question: "Which PDO fetch mode returns data as an associative array?",
    options: [
      "PDO::FETCH_NUM",
      "PDO::FETCH_OBJ",
      "PDO::FETCH_CLASS",
      "PDO::FETCH_ASSOC",
    ],
  },
  {
    id: 10,
    question: "Which of the following best prevents SQL injection in PDO?",
    options: [
      "Prepared statements with parameter binding",
      "HTML escaping",
      "Concatenated SQL queries",
      "Input trimming",
    ],
  },
  {
    id: 11,
    question: "In PDO what does the execute() function do?",
    options: [
      "Runs the prepared statement",
      "Checks query syntax",
      "Starts the database server",
      "Declares variables",
    ],
  },
  {
    id: 12,
    question: "Which of these is considered a security best practice?",
    options: [
      "Hardcoding admin credentials",
      "Writing SQL in JavaScript",
      "Disabling error logs",
      "Using environment variables for credentials",
    ],
  },
  {
    id: 13,
    question: "Which constraint prevents null entries in a column?",
    options: ["CHECK", "NOT NULL", "DEFAULT", "UNIQUE"],
  },
  {
    id: 14,
    question: "What SQL operation is used to change existing data?",
    options: ["UPDATE", "SELECT", "INSERT", "DELETE"],
  },
  {
    id: 15,
    question: "What does fetchAll() return?",
    options: ["String of JSON", "Array of records", "Single record", "Boolean"],
  },
  {
    id: 16,
    question: "What PHP function securely hashes a password?",
    options: ["encrypt()", "md5()", "password_hash()", "sha1()"],
  },
  {
    id: 17,
    question: "In MySQL what is the purpose of AUTO_INCREMENT?",
    options: [
      "Inserts timestamps",
      "Updates all rows",
      "Prepares the query",
      "Automatically assigns unique IDs",
    ],
  },
  {
    id: 18,
    question: "Which type of database model does MySQL use?",
    options: ["Flat file", "Object-oriented", "Relational", "Hierarchical"],
  },
  {
    id: 19,
    question: "Which SQL clause limits the number of returned records?",
    options: ["ORDER BY", "HAVING", "LIMIT", "JOIN"],
  },
  {
    id: 20,
    question: "What is the best data type for a true/false column in MySQL?",
    options: ["DATE", "DECIMAL", "CHAR", "BOOLEAN"],
  },
  {
    id: 21,
    question: "What does the LIKE operator allow you to do in SQL?",
    options: [
      "Delete null records",
      "Sort alphabetically",
      "Perform pattern matching",
      "Filter numeric values",
    ],
  },
];

const quizAnswers: CorrectAnswerDto[] = [
  { quizId: moduleFourQuizId, questionId: 1, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 2, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 3, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 4, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 5, correctAnswer: [1] },
  { quizId: moduleFourQuizId, questionId: 6, correctAnswer: [0] },
  { quizId: moduleFourQuizId, questionId: 7, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 8, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 9, correctAnswer: [3] },
  { quizId: moduleFourQuizId, questionId: 10, correctAnswer: [0] },
  { quizId: moduleFourQuizId, questionId: 11, correctAnswer: [0] },
  { quizId: moduleFourQuizId, questionId: 12, correctAnswer: [3] },
  { quizId: moduleFourQuizId, questionId: 13, correctAnswer: [1] },
  { quizId: moduleFourQuizId, questionId: 14, correctAnswer: [0] },
  { quizId: moduleFourQuizId, questionId: 15, correctAnswer: [1] },
  { quizId: moduleFourQuizId, questionId: 16, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 17, correctAnswer: [3] },
  { quizId: moduleFourQuizId, questionId: 18, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 19, correctAnswer: [2] },
  { quizId: moduleFourQuizId, questionId: 20, correctAnswer: [3] },
  { quizId: moduleFourQuizId, questionId: 21, correctAnswer: [2] },
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

function Assignment4AContent() {
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

function Assignment4BContent() {
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

function ModuleFourQuizShell() {
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
              Quiz: Module 4 - Database
            </h3>
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm leading-7 text-slate-700 dark:text-slate-200">
              <span>Started: Jun 29 at 6:54pm</span>
              <span>Due: Jul 5</span>
              <span>21 pts</span>
              <span>Database fundamentals review</span>
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

export default function AssignmentMod4() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    "assignment-4a": false,
    "assignment-4b": false,
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
            Module 4
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Week 2
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            Sunday, July 5, 2026 at 11:59 PM
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Module 4 - Database Fundamentals
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: Database Fundamentals
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            This page is ready for the Module 4 Canvas materials: database
            reading notes, setup work, a personal inventory database assignment,
            and the module database quiz.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 4: Database Fundamentals"
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
        title="Module 4 Assignment 4A: Database Setup"
        isOpen={openSections["assignment-4a"]}
        onToggle={() => toggleSection("assignment-4a")}
      >
        <Assignment4AContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 4 Assignment 4B: Personal Inventory Database"
        isOpen={openSections["assignment-4b"]}
        onToggle={() => toggleSection("assignment-4b")}
      >
        <Assignment4BContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 4 - Database"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <ModuleFourQuizShell />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={4} />
    </section>
  );
}
