import { useState } from "react";
import { ClipboardPenLine } from "lucide-react";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

const assignment3AItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 3 Assignment 3A: Review and Comment on Form",
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

export function Assignment3AContent() {
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
