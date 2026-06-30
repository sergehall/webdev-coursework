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

type ModuleSectionId =
  | "readme"
  | "required-reading"
  | "assignment-3a"
  | "assignment-3b"
  | "quiz";

type CanvasItem = {
  icon: LucideIcon;
  title: string;
  dueLabel?: string;
  pointsLabel?: string;
};

const readmeItem: CanvasItem = {
  icon: FileText,
  title: "ReadMe Module 3: Handling Web Requests",
};

const requiredReadingItem: CanvasItem = {
  icon: Paperclip,
  title: "module3_handlingWeb.pdf",
};

const assignment3AItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 3 Assignment 3A: Review and Comment on Form",
  dueLabel: "Jul 5",
  pointsLabel: "20 pts",
};

const assignment3BItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 3 Assignment 3B: Secure Product Contact Form",
  dueLabel: "Jul 5",
  pointsLabel: "20 pts",
};

const assignment3AFiles = [
  {
    fileUrl: "/code-playground/CS85/mod-3/Module3_Assignment_3A.pdf",
    filename: "Module3_Assignment_3A.pdf",
  },
  {
    fileUrl: "/code-playground/CS85/mod-3/ContactForm.php",
    filename: "ContactForm.php",
  },
];

const assignment3BFiles = [
  {
    fileUrl: "/code-playground/CS85/mod-3/Module3_Assignment_3B.pdf",
    filename: "Module3_Assignment_3B.pdf",
  },
  {
    fileUrl: "/code-playground/CS85/mod-3/SecureProductContactForm.php",
    filename: "SecureProductContactForm.php",
  },
];

const surveyFormExample = `<form action="" method="GET">
  <label for="color">Favorite Color:</label>
  <input type="text" id="color" name="color" required><br>
  <label for="movie">Favorite Movie:</label>
  <input type="text" id="movie" name="movie" required><br>
  <input type="submit" value="Submit Survey">
</form>`;

const surveyPhpExample = `if ($_SERVER['REQUEST_METHOD'] === 'GET' && !empty($_GET)) {
  echo "<h3>Survey Results</h3>";
  echo "<p>Favorite Color: " . htmlspecialchars($_GET['color']) . "</p>";
  echo "<p>Favorite Movie: " . htmlspecialchars($_GET['movie']) . "</p>";
}`;

const moduleThreeQuizId = "CS85Module3HandlingWebRequestsQuiz";

const quizQuestions: UIQuestion[] = [
  {
    id: 1,
    question: "What does PDO stand for in PHP?",
    options: [
      "PHP Data Objects",
      "Programming Database Objects",
      "Public Data Operator",
      "PHP Data Operations",
    ],
  },
  {
    id: 2,
    question: "What SQL command is used to retrieve data from a table?",
    options: ["DELETE", "SELECT", "INSERT", "UPDATE"],
  },
  {
    id: 3,
    question: "Which clause in an SQL SELECT statement filters rows?",
    options: ["GROUP BY", "HAVING", "WHERE", "ORDER BY"],
  },
  {
    id: 4,
    question:
      "Which of these is a prepared statement vulnerability mitigation technique?",
    options: [
      "Using placeholders and binding parameters",
      "Disabling error reporting",
      "Enabling debug mode",
      "Concatenating strings",
    ],
  },
  {
    id: 5,
    question: "Which SQL keyword is used to insert new data into a table?",
    options: ["SELECT", "INSERT", "APPEND", "UPDATE"],
  },
  {
    id: 6,
    question: "Which of the following ensures each row in a table is unique?",
    options: ["PRIMARY KEY", "DEFAULT constraint", "FOREIGN KEY", "NOT NULL"],
  },
  {
    id: 7,
    question: "Which statement prevents SQL injection in PHP using PDO?",
    options: [
      "$stmt->inject($input)",
      "$stmt->execute([$userInput])",
      "$pdo->query(...)",
      "$pdo->unsafeInsert(...)",
    ],
  },
  {
    id: 8,
    question: "Which function returns a single row from a PDO statement?",
    options: ["fetchAll()", "query()", "fetch()", "execute()"],
  },
  {
    id: 9,
    question: "Which SQL type stores large text like blog posts?",
    options: ["VARCHAR", "TEXT", "CHAR", "TINYTEXT"],
  },
  {
    id: 10,
    question: "Which data type is best for monetary values?",
    options: ["INT", "FLOAT", "TEXT", "DECIMAL"],
  },
  {
    id: 11,
    question: "Which SQL statement is used to remove records?",
    options: ["SELECT", "DELETE", "INSERT", "UPDATE"],
  },
  {
    id: 12,
    question: "Which type of database key helps link tables?",
    options: ["Primary Key", "Foreign Key", "Join Key", "Auto Increment"],
  },
  {
    id: 13,
    question: "Which SQL constraint prevents duplicate values?",
    options: ["CHECK", "INDEX", "UNIQUE", "NOT NULL"],
  },
  {
    id: 14,
    question: "What does the NOW() function return in SQL?",
    options: [
      "Session token",
      "Database ID",
      "Current date and time",
      "User's login time",
    ],
  },
  {
    id: 15,
    question:
      'What would cause a "Column count doesn\'t match value count" error?',
    options: [
      "Mismatch between columns and VALUES in INSERT",
      "Wrong primary key type",
      "Invalid SELECT clause",
      "Too many WHERE conditions",
    ],
  },
  {
    id: 16,
    question: "Which PHP function should be avoided due to SQL injection risk?",
    options: [
      "mysqli_query() with direct input",
      "htmlspecialchars()",
      "$_POST['email']",
      "password_hash()",
    ],
  },
  {
    id: 17,
    question: "Which of the following is TRUE about PDO prepared statements?",
    options: [
      "They use old MySQL APIs",
      "They execute SQL inline",
      "They separate logic and data",
      "They allow client-side authentication",
    ],
  },
  {
    id: 18,
    question: "What happens if you omit WHERE in an UPDATE statement?",
    options: [
      "Nothing is updated",
      "All rows are updated",
      "It creates new rows",
      "The SQL is invalid",
    ],
  },
  {
    id: 19,
    question: "Which statements describe the purpose of the C in CRUD?",
    options: [
      "Update existing records",
      "Compile data",
      "Create new records",
      "Destroy database schema",
      "Read existing records",
    ],
  },
];

const quizAnswers: CorrectAnswerDto[] = [
  { quizId: moduleThreeQuizId, questionId: 1, correctAnswer: [0] },
  { quizId: moduleThreeQuizId, questionId: 2, correctAnswer: [1] },
  { quizId: moduleThreeQuizId, questionId: 3, correctAnswer: [2] },
  { quizId: moduleThreeQuizId, questionId: 4, correctAnswer: [0] },
  { quizId: moduleThreeQuizId, questionId: 5, correctAnswer: [1] },
  { quizId: moduleThreeQuizId, questionId: 6, correctAnswer: [0] },
  { quizId: moduleThreeQuizId, questionId: 7, correctAnswer: [1] },
  { quizId: moduleThreeQuizId, questionId: 8, correctAnswer: [2] },
  { quizId: moduleThreeQuizId, questionId: 9, correctAnswer: [1] },
  { quizId: moduleThreeQuizId, questionId: 10, correctAnswer: [3] },
  { quizId: moduleThreeQuizId, questionId: 11, correctAnswer: [1] },
  { quizId: moduleThreeQuizId, questionId: 12, correctAnswer: [1] },
  { quizId: moduleThreeQuizId, questionId: 13, correctAnswer: [2] },
  { quizId: moduleThreeQuizId, questionId: 14, correctAnswer: [2] },
  { quizId: moduleThreeQuizId, questionId: 15, correctAnswer: [0] },
  { quizId: moduleThreeQuizId, questionId: 16, correctAnswer: [0] },
  { quizId: moduleThreeQuizId, questionId: 17, correctAnswer: [2] },
  { quizId: moduleThreeQuizId, questionId: 18, correctAnswer: [1] },
  { quizId: moduleThreeQuizId, questionId: 19, correctAnswer: [2] },
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

function Assignment3AContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleItemBlock item={assignment3AItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Assignment Overview
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            You are provided with a fully functional "Contact Me" PHP script.
            The goal is not to write new code from scratch, but to deeply
            understand the script and document it thoroughly with inline
            comments. The final file should show how the form handles user
            input, validates fields, preserves submitted values after errors,
            and sends the message using PHP logic.
          </p>
        </article>

        <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
            Set Up Your File and Environment
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-sky-950 dark:text-sky-100">
            <li>Open Laravel Herd and make sure it is running.</li>
            <li>
              In the Herd Sites directory, navigate to
              <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                cs85_projects
              </code>
              .
            </li>
            <li>
              Create a new folder named
              <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                module3a
              </code>
              .
            </li>
            <li>
              Inside
              <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                module3a
              </code>
              , create
              <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                ContactForm.php
              </code>
              .
            </li>
            <li>
              Open the file in VS Code and type the provided PHP code line by
              line.
            </li>
          </ul>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Type and Comment the Code
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>Do not copy and paste. Type the code line by line.</li>
            <li>
              Add clear and thoughtful inline comments with
              <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
                //
              </code>
              or
              <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
                /* ... */
              </code>
              .
            </li>
            <li>
              Explain every function, control structure, and important logic
              block.
            </li>
            <li>
              Pay special attention to
              <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
                validateInput()
              </code>
              ,
              <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
                validateEmail()
              </code>
              ,
              <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
                displayForm()
              </code>
              ,
              <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
                $_POST
              </code>
              handling, sticky form values, and
              <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
                mail()
              </code>
              message handling.
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-emerald-900 uppercase dark:text-emerald-100">
            Test Locally
          </h4>
          <p className="mt-2 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
            Preview the file through Laravel Herd or XAMPP. Test both valid and
            invalid inputs, then observe whether validation messages appear and
            whether the submitted values stay in the form after an error.
          </p>
          <p className="mt-2 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
            Local test URL:
            <code className="ml-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
              http://127.0.0.1:8000/module3a/ContactForm.php
            </code>
          </p>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Reflection at the End of the File
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            Add the reflection as PHP comments at the end of
            <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
              ContactForm.php
            </code>
            .
          </p>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>What does each function do?</li>
            <li>How is user input protected?</li>
            <li>What were the most confusing parts?</li>
            <li>What could be improved?</li>
            <li>Why send a copy of the form to the sender?</li>
          </ul>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-100">
            GitHub and Canvas Submission
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-amber-950 dark:text-amber-100">
            <li>
              Create a GitHub repository named
              <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                cs85-module3a-reviewform
              </code>
              .
            </li>
            <li>Make at least 4 meaningful commits as you work.</li>
            <li>Push the full project to GitHub.</li>
            <li>
              Upload the final
              <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                ContactForm.php
              </code>
              file to Canvas.
            </li>
            <li>Submit the GitHub repository URL to Canvas.</li>
          </ul>
          <p className="mt-3 text-sm leading-7 text-amber-950 dark:text-amber-100">
            GitHub source:
            <a
              href="https://github.com/sergehall/cs85-php-programming/blob/main/public/module3a/ContactForm.php"
              target="_blank"
              rel="noreferrer"
              className="ml-1 font-semibold text-sky-700 underline underline-offset-4 dark:text-sky-300"
            >
              ContactForm.php
            </a>
          </p>
        </article>

        <div className="flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isPreviewOpen}
            label={
              isPreviewOpen
                ? "Close Module 3 Assignment 3A files"
                : "View Module 3 Assignment 3A files"
            }
            toggle={() => setIsPreviewOpen((prev) => !prev)}
          />
        </div>

        <ShowModalButton
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          files={assignment3AFiles}
        />
      </section>
    </div>
  );
}

function Assignment3BContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleItemBlock item={assignment3BItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Learning Objectives
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>
              Understand and implement the HTTP request-response model using GET
              and POST.
            </li>
            <li>Create and process an HTML form using PHP.</li>
            <li>Practice output sanitization to prevent XSS attacks.</li>
            <li>Use superglobals to securely access user input.</li>
            <li>
              Reflect on how user data is processed, validated, and secured.
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-emerald-900 uppercase dark:text-emerald-100">
            Example Output
          </h4>
          <p className="mt-2 rounded-lg border border-emerald-200 bg-white/80 p-3 text-sm leading-7 text-emerald-950 dark:border-emerald-900/60 dark:bg-slate-950/30 dark:text-emerald-100">
            Thank you, Jordan! We received your message about: "Labrador
            training tips"
            <br />
            We&apos;ll get back to you at jordan@example.com.
          </p>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Tutorial Summary
          </h4>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              "HTML Form Structure: form, action, method, input types",
              "GET vs POST: when each is appropriate",
              "PHP Superglobals: especially $_POST and $_SERVER",
              "Sanitizing Output: htmlspecialchars() to prevent XSS",
              "Form Submission Detection: isset($_POST['submit']) or $_SERVER['REQUEST_METHOD'] === 'POST'",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
            Mini-Tutorial: Exploring Superglobals with a Survey Example
          </h4>
          <div className="mt-3 grid gap-4 lg:grid-cols-2">
            <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
              <code>{surveyFormExample}</code>
            </pre>
            <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
              <code>{surveyPhpExample}</code>
            </pre>
          </div>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Assignment Instructions
          </h4>
          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            Create a self-processing HTML form with
            <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
              method=&quot;POST&quot;
            </code>
            .
          </p>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Topic of Message, something meaningful to you</li>
            <li>Message textarea, 50-150 words required</li>
          </ul>
        </article>

        <article className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900/50 dark:bg-cyan-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-cyan-900 uppercase dark:text-cyan-100">
            PHP Requirements
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-cyan-950 dark:text-cyan-100">
            <li>Detect submission.</li>
            <li>
              Sanitize inputs using
              <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                htmlspecialchars()
              </code>
              .
            </li>
            <li>Validate inputs and show a thank you message on success.</li>
            <li>
              Use
              <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                $_POST
              </code>
              and
              <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                $_SERVER
              </code>
              carefully when reading request data.
            </li>
          </ul>
        </article>

        <article>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
            Required Comments and Reflection
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-700 dark:text-slate-200">
            <li>Your output predictions</li>
            <li>
              What you expect to see in
              <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">
                $_POST
              </code>
            </li>
            <li>Post-test reflections: surprises, fixes, insights</li>
            <li>Your full name in a comment at the top of the PHP file</li>
          </ul>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-100">
            GitHub and Canvas Submission
          </h4>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-amber-950 dark:text-amber-100">
            <li>
              Create a GitHub repository named
              <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                cs85-module3b-createform
              </code>
              .
            </li>
            <li>
              Place the completed PHP file in a folder called
              <code className="mx-1 rounded bg-white/80 px-1 py-0.5 text-xs dark:bg-slate-900">
                module3/
              </code>
              .
            </li>
            <li>
              Make at least 4 meaningful commits: initial form HTML structure,
              PHP submission handling logic, sanitization and validation
              updates, and final testing/reflection comments.
            </li>
            <li>Push all changes regularly, not just one final push.</li>
            <li>
              Submit the GitHub repository URL via Canvas. The URL can also be
              added in comments at the top of the PHP file.
            </li>
            <li>
              Upload the final PHP file to Canvas as a backup for local review.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-7 text-amber-950 dark:text-amber-100">
            GitHub source:
            <a
              href="https://github.com/sergehall/cs85-php-programming/blob/main/public/module3/SecureProductContactForm.php"
              target="_blank"
              rel="noreferrer"
              className="ml-1 font-semibold text-sky-700 underline underline-offset-4 dark:text-sky-300"
            >
              SecureProductContactForm.php
            </a>
          </p>
        </article>

        <div className="flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isPreviewOpen}
            label={
              isPreviewOpen
                ? "Close Module 3 Assignment 3B files"
                : "View Module 3 Assignment 3B files"
            }
            toggle={() => setIsPreviewOpen((prev) => !prev)}
          />
        </div>

        <ShowModalButton
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          files={assignment3BFiles}
        />
      </section>
    </div>
  );
}

function ModuleThreeQuizShell() {
  return (
    <div className="space-y-4">
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
                Quiz: Module 3 - Handling Web Requests
              </h3>
              <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm leading-7 text-slate-700 dark:text-slate-200">
                <span>Started: Jun 29 at 6:37pm</span>
                <span>Due: Jul 5</span>
                <span>19 pts</span>
                <span>PDO, SQL, and CRUD review</span>
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
    </div>
  );
}

export default function AssignmentMod3() {
  const [openSections, setOpenSections] = useState<
    Record<ModuleSectionId, boolean>
  >({
    readme: false,
    "required-reading": false,
    "assignment-3a": false,
    "assignment-3b": false,
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
            Module 3
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
            Module 3 - Handling Web Requests
          </h2>
          <p className="mt-2 text-sm font-medium text-sky-700 dark:text-sky-300">
            Scheduled topic: Handling Web Requests
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 dark:text-gray-300">
            This page is ready for the Module 3 Canvas materials: request
            handling notes, form-review work, secure contact form deliverables,
            and the module quiz.
          </p>
        </div>
      </header>

      <AnimatedAccordionItem
        title="ReadMe Module 3: Handling Web Requests"
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
        title="Module 3 Assignment 3A: Review and Comment on Form"
        isOpen={openSections["assignment-3a"]}
        onToggle={() => toggleSection("assignment-3a")}
      >
        <Assignment3AContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Module 3 Assignment 3B: Secure Product Contact Form"
        isOpen={openSections["assignment-3b"]}
        onToggle={() => toggleSection("assignment-3b")}
      >
        <Assignment3BContent />
      </AnimatedAccordionItem>

      <AnimatedAccordionItem
        title="Quiz: Module 3 - Handling Web Requests"
        isOpen={openSections.quiz}
        onToggle={() => toggleSection("quiz")}
      >
        <ModuleThreeQuizShell />
      </AnimatedAccordionItem>

      <ModuleCompletionButton moduleId={3} />
    </section>
  );
}
