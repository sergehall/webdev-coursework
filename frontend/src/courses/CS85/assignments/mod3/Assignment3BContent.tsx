import { useState } from "react";
import { ClipboardPenLine } from "lucide-react";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

const assignment3BItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 3 Assignment 3B: Secure Product Contact Form",
  dueLabel: "Jul 5",
  pointsLabel: "20 pts",
};

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

export function Assignment3BContent() {
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
