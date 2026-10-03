import { useState } from "react";

import {
  Callout,
  CodeBlock,
  SectionHeading,
  TutorialStep,
} from "./components/Assignment12APrimitives";
import {
  apiRequestExample,
  responseJson,
  responseExtraction,
  failedResponseExample,
  configKeyExample,
  adaptivePromptExample,
  formInputsExample,
  mockedServiceExample,
  createProjectCommands,
  projectTree,
  createFilesCommands,
  envConfiguration,
  servicesConfiguration,
  routeConfiguration,
  controllerCode,
  serviceStub,
  serviceHint,
  bladeView,
  runCommands,
  gitCommands,
  bonusTest,
} from "./data/assignment12AExamples";
import {
  assignment12AItem,
  assignmentPdfFiles,
  assignmentPdfUrl,
  rubricRows,
} from "./data/assignment12AMetadata";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import { ModuleItemBlock } from "@/courses/CS85/assignments/shared/canvasItems";

export default function Assignment12AContent() {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleItemBlock item={assignment12AItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <SectionHeading>Assignment Overview</SectionHeading>
          <div className="mt-3 space-y-3 text-sm leading-7 text-sky-950 dark:text-sky-100">
            <p>
              In this assignment, you will integrate the OpenAI Chat Completions
              API using the <code>gpt-4o-mini</code> model into a Laravel
              content generator. Users enter a title, choose a content type and
              tone, and receive an editable AI-generated draft.
            </p>
            <p>
              The routes, controller, configuration, and Blade view are
              provided. The <code>AiContentService</code> starts as a documented
              stub. Your main task is to implement <code>generateDraft()</code>{" "}
              and <code>buildPrompt()</code> so the request is secure and the
              prompt adapts to the selected content type and tone.
            </p>
          </div>
        </article>

        <article className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/50 dark:bg-violet-950/30">
          <SectionHeading>Learning Objectives</SectionHeading>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-violet-950 dark:text-violet-100">
            <li>Securely integrate a third-party AI API using Laravel.</li>
            <li>Implement a service class from a written specification.</li>
            <li>
              Apply prompt engineering that adapts to content type and tone.
            </li>
            <li>Handle API response errors and log failures.</li>
            <li>Display generated content in an editable field.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <SectionHeading>Tutorial: Techniques You Will Apply</SectionHeading>

          <TutorialStep title="1. Call an API with Laravel's HTTP Client">
            <p>
              Laravel&apos;s <code>Http</code> facade sends JSON requests.
              Configure the Authorization header from server-side configuration
              and post to the Chat Completions endpoint.
            </p>
            <CodeBlock>{apiRequestExample}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="2. Read the JSON Response">
            <p>
              The generated text is nested under the first choice&apos;s message
              content:
            </p>
            <CodeBlock>{responseJson}</CodeBlock>
            <CodeBlock>{responseExtraction}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="3. Handle Errors and Log Failures">
            <p>
              Check whether the request succeeded. Log provider details for
              developers, then throw so the controller can return a friendly
              message.
            </p>
            <CodeBlock>{failedResponseExample}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="4. Keep the API Key Secret">
            <p>
              Store the key in <code>.env</code>, read it through{" "}
              <code>config()</code>, and never hardcode or commit it.
            </p>
            <CodeBlock>{configKeyExample}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="5. Build a Prompt That Adapts">
            <p>
              A strong prompt defines a role, states the task, and adds
              constraints. This parallel example demonstrates branching on a
              selected style:
            </p>
            <CodeBlock>{adaptivePromptExample}</CodeBlock>
            <p>
              Your <code>buildPrompt()</code> branches for both content type and
              tone: a full post, one-line meta description, or short email
              subject line.
            </p>
          </TutorialStep>

          <TutorialStep title="6. Understand the Provided Form Inputs">
            <p>
              Each dropdown posts a value. Blade&apos;s <code>old()</code> and{" "}
              <code>@selected</code> helpers preserve the selection after a
              submission.
            </p>
            <CodeBlock>{formInputsExample}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="7. Fake the Service in a Test">
            <p>
              Replace the real service with a mock so controller tests do not
              spend API credits or depend on the network.
            </p>
            <CodeBlock>{mockedServiceExample}</CodeBlock>
          </TutorialStep>
        </article>

        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <SectionHeading>Requirements Checklist</SectionHeading>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
            <li>A form accepts a title, content type, and tone.</li>
            <li>
              The form posts to a controller route that validates all three
              inputs.
            </li>
            <li>
              You implement <code>AiContentService</code> from the provided
              specification.
            </li>
            <li>
              <code>generateDraft()</code> calls OpenAI and returns the content.
            </li>
            <li>
              <code>buildPrompt()</code> adapts to content type and tone.
            </li>
            <li>
              The API key stays in <code>.env</code> and is read through{" "}
              <code>config()</code>.
            </li>
            <li>The generated text appears in an editable field.</li>
            <li>Failed API responses are handled and logged.</li>
            <li>
              The public GitHub repository includes clear README instructions.
            </li>
          </ul>

          <Callout>
            <strong>Real-world relevance:</strong> This service-layer pattern is
            used by AI-assisted products to keep provider calls, secrets, and
            prompt logic outside controllers and views.
          </Callout>
        </article>

        <article className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900/50 dark:bg-cyan-950/30">
          <SectionHeading>Step-by-Step Instructions</SectionHeading>

          <TutorialStep title="Prerequisites">
            <ul className="ml-5 list-disc space-y-2">
              <li>Laravel installed through Composer.</li>
              <li>Laravel Herd running the development environment.</li>
              <li>A GitHub account and Git installed.</li>
              <li>
                An OpenAI API key from{" "}
                <a
                  href="https://platform.openai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2"
                >
                  platform.openai.com
                </a>
                .
              </li>
            </ul>
          </TutorialStep>

          <TutorialStep title="Step 1: Create the Laravel Project">
            <CodeBlock>{createProjectCommands}</CodeBlock>
            <p>
              When the project is in a Herd-parked directory, it is available at{" "}
              <code>http://blog-ai.test</code>.
            </p>
          </TutorialStep>

          <TutorialStep title="Step 2: Set Up the Folder Structure">
            <CodeBlock>{projectTree}</CodeBlock>
            <CodeBlock>{createFilesCommands}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 3: Configure the Environment">
            <p>
              Add these entries to <code>.env</code>. Replace the placeholder
              locally and never commit the real key.
            </p>
            <CodeBlock>{envConfiguration}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 4: Update config/services.php">
            <CodeBlock>{servicesConfiguration}</CodeBlock>
            <Callout>
              Laravel&apos;s HTTP client and Guzzle already ship with the
              framework, so no additional HTTP package is required.
            </Callout>
          </TutorialStep>

          <TutorialStep title="Step 5: Define the Routes">
            <CodeBlock>{routeConfiguration}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 6: Build the Provided Controller">
            <CodeBlock>{controllerCode}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 7: Implement the Service">
            <p>
              Start from this stub. Implement both methods according to the
              comments and prompt requirements.
            </p>
            <CodeBlock>{serviceStub}</CodeBlock>
            <p>The HTTP request should follow this structure:</p>
            <CodeBlock>{serviceHint}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 8: Build the Provided Blade View">
            <p>
              Create <code>resources/views/ai_form.blade.php</code>. The draft
              textarea remains editable before publishing.
            </p>
            <CodeBlock>{bladeView}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 9: Run and Test">
            <CodeBlock>{runCommands}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 10: Push to GitHub">
            <CodeBlock>{gitCommands}</CodeBlock>
          </TutorialStep>
        </article>

        <article className="rounded-xl border border-fuchsia-200 bg-fuchsia-50 p-4 dark:border-fuchsia-900/50 dark:bg-fuchsia-950/30">
          <SectionHeading>Prompt Engineering Requirements</SectionHeading>
          <p className="mt-3 text-sm leading-7 text-fuchsia-950 dark:text-fuchsia-100">
            Inside <code>buildPrompt()</code>, your prompt must:
          </p>
          <ul className="mt-2 ml-5 list-disc space-y-2 text-sm leading-7 text-fuchsia-950 dark:text-fuchsia-100">
            <li>
              Define the AI&apos;s role and reflect the selected tone, such as a
              professional tech blogger or witty copywriter.
            </li>
            <li>
              State the task using the supplied title, such as “Write a blog
              post titled: {"{title}"}.”
            </li>
            <li>
              Adapt to a full blog post, a single meta description of about 155
              characters, or a short email subject line.
            </li>
            <li>Include a sensible length and format for the selected type.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-950/30">
          <SectionHeading>Deliverables</SectionHeading>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-orange-950 dark:text-orange-100">
            <li>A working Laravel application running locally.</li>
            <li>
              A public GitHub repository named <code>cs85_module12</code>.
            </li>
            <li>All source code with clear, descriptive commit messages.</li>
            <li>
              A <code>README.md</code> with Mac and Windows setup, instructions
              for obtaining an OpenAI key, an app description, and a screenshot
              or screencast.
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/30">
          <SectionHeading>Evaluation Criteria — 100 Points</SectionHeading>
          <div className="mt-3 overflow-x-auto rounded-lg border border-blue-200 dark:border-blue-900/60">
            <table className="min-w-[760px] border-collapse text-left text-sm text-blue-950 dark:text-blue-100">
              <caption className="sr-only">
                Assignment 12A grading rubric
              </caption>
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Criterion
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    What we are looking for
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-right font-semibold"
                  >
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-200 bg-white/70 dark:divide-blue-900/60 dark:bg-slate-950/30">
                {rubricRows.map((row) => (
                  <tr key={row.criterion}>
                    <th
                      scope="row"
                      className="w-64 px-4 py-3 align-top font-semibold"
                    >
                      {row.criterion}
                    </th>
                    <td className="px-4 py-3 leading-6">{row.expectation}</td>
                    <td className="w-20 px-4 py-3 text-right align-top text-lg font-semibold text-blue-700 dark:text-blue-300">
                      {row.points}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-blue-100 font-semibold text-blue-950 dark:bg-blue-950/60 dark:text-blue-100">
                <tr>
                  <th scope="row" colSpan={2} className="px-4 py-3 text-right">
                    Total
                  </th>
                  <td className="px-4 py-3 text-right text-lg">100</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </article>

        <article className="rounded-xl border border-lime-200 bg-lime-50 p-4 dark:border-lime-900/50 dark:bg-lime-950/30">
          <SectionHeading>Bonus: Automated Test (+8 Points)</SectionHeading>
          <div className="mt-3 space-y-3 text-sm leading-7 text-lime-950 dark:text-lime-100">
            <p>
              Create <code>tests/Feature/DraftGenerationTest.php</code>. Replace
              the real service with a mock so the test never calls OpenAI:
            </p>
            <CodeBlock>{bonusTest}</CodeBlock>
            <p>
              Run it with <code>php artisan test</code>. Then add one assertion
              of your own, such as verifying that a title shorter than five
              characters produces a validation error.
            </p>
          </div>
        </article>

        <article className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
          <SectionHeading>Reflection Questions</SectionHeading>
          <ol className="mt-3 ml-5 list-decimal space-y-2 text-sm leading-7 text-rose-950 dark:text-rose-100">
            <li>
              How did the AI output change when you modified the tone or role in
              your prompt?
            </li>
            <li>
              How did your prompt differ across the three content types, and
              why?
            </li>
            <li>
              What would you improve about the API integration for a production
              application?
            </li>
          </ol>
        </article>

        <article className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
          <SectionHeading>Completed Assignment</SectionHeading>
          <div className="mt-3 space-y-3 text-sm leading-7 text-indigo-950 dark:text-indigo-100">
            <p>
              The completed four-page report documents the live OpenAI
              integration, server-side secret boundary, adaptive prompts,
              editable browser result, and fake-backed automated tests.
            </p>
            <p>
              Verification recorded in the report includes 204 passing Laravel
              tests with 1,677 assertions, Module 12 service and validation
              tests, Laravel Pint, a Vite production build, and a live API smoke
              test.
            </p>
            <p>
              GitHub implementation:{" "}
              <a
                href="https://github.com/SergeHall/cs85-php-programming/tree/main/assignments/module12a"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2"
              >
                cs85-php-programming / assignments / module12a
              </a>
            </p>
            <p>
              Original Canvas item:{" "}
              <a
                href="https://online.smc.edu/courses/83209/modules/items/5343431"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2"
              >
                Module 12 Assignment 12A: Integrating OpenAI
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
              download="Module_12_Assignment_12A_Integrating_OpenAI_Report.pdf"
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
