import { useState, type ReactNode } from "react";
import { ClipboardPenLine } from "lucide-react";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

const assignment11AItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 11 Assignment 11A: API Data",
  dueLabel: "Aug 2",
  pointsLabel: "20 pts",
};

const assignmentPdfUrl =
  "/code-playground/CS85/mod-11/11a/Assignment_11A_API_Data_Report.pdf";

const assignmentPdfFiles = [
  {
    fileUrl: assignmentPdfUrl,
    filename: "Assignment_11A_API_Data_Report.pdf",
  },
];

const macProjectSetup = [
  "laravel new json-playground",
  "cd json-playground",
].join("\n");

const weatherJson = [
  "[",
  '  {"day": "Monday", "high": 75, "low": 60, "condition": "Sunny"},',
  '  {"day": "Tuesday", "high": 72, "low": 58, "condition": "Partly Cloudy"},',
  '  {"day": "Wednesday", "high": 68, "low": 55, "condition": "Rain"}',
  "]",
].join("\n");

const weatherRoute = [
  "use App\\Http\\Controllers\\WeatherController;",
  "",
  "Route::get('/weather', [WeatherController::class, 'index']);",
].join("\n");

const weatherController = [
  "use Illuminate\\Support\\Facades\\Storage;",
  "",
  "public function index()",
  "{",
  "    $json = Storage::get('weather.json');",
  "    $weatherData = json_decode($json, true);",
  "",
  "    return view('weather.index', ['weather' => $weatherData]);",
  "}",
].join("\n");

const storageJsonShortcut = "$weatherData = Storage::json('weather.json');";

const weatherBladeView = [
  "<h1>Weekly Weather Forecast</h1>",
  '<table style="border: 1px solid #ccc; border-collapse: collapse; width: 100%;" cellpadding="10">',
  "  <thead>",
  '    <tr style="background-color: #ecf0f1;">',
  "      <th>Day</th>",
  "      <th>High</th>",
  "      <th>Low</th>",
  "      <th>Condition</th>",
  "    </tr>",
  "  </thead>",
  "  <tbody>",
  "    @foreach ($weather as $day)",
  "      <tr>",
  "        <td>{{ $day['day'] }}</td>",
  "        <td>{{ $day['high'] }}°F</td>",
  "        <td>{{ $day['low'] }}°F</td>",
  "        <td>{{ $day['condition'] }}</td>",
  "      </tr>",
  "    @endforeach",
  "  </tbody>",
  "</table>",
].join("\n");

const jsonDecodeExample = [
  '$json = \'{"name":"Alice"}\';',
  "$data = json_decode($json, true);",
].join("\n");

export default function Assignment11AContent() {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleItemBlock item={assignment11AItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <SectionHeading>Scenario</SectionHeading>
          <p className="mt-3 text-sm leading-7 text-sky-950 dark:text-sky-100">
            You are simulating a basic API response by working with a static
            JSON file that mimics weather data. Your goal is to decode this data
            in a Laravel controller, pass it to a Blade view, and display it in
            a styled HTML table. This is a warm-up for the live API integration
            you will build in Module 12.
          </p>
        </article>

        <article className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/50 dark:bg-violet-950/30">
          <SectionHeading>Learning Objectives</SectionHeading>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-violet-950 dark:text-violet-100">
            <li>Understand how to work with JSON data in PHP.</li>
            <li>
              Use <code>json_decode()</code> to convert JSON strings into PHP
              arrays or objects.
            </li>
            <li>Loop through and display structured data using Blade views.</li>
            <li>Practice clean file organization in Laravel.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <SectionHeading>Instructions</SectionHeading>

          <TutorialStep title="Step 1: Set Up Your Laravel Project">
            <p>
              Make sure Laravel is running in Laravel Herd. Open Git Bash or the
              terminal inside VS Code on Windows; use Terminal or the VS Code
              terminal on macOS.
            </p>
            <CodeBlock>{macProjectSetup}</CodeBlock>
            <p>
              A project inside a Herd-parked directory is served automatically
              at <code>http://json-playground.test</code>. You can also run{" "}
              <code>php artisan serve</code> and use{" "}
              <code>http://localhost:8000</code>.
            </p>
          </TutorialStep>

          <TutorialStep title="Step 2: Create a Static JSON File">
            <p>
              Create <code>storage/app/private/weather.json</code> with this
              content:
            </p>
            <CodeBlock>{weatherJson}</CodeBlock>
            <Callout>
              <strong>Why storage/app/private?</strong> In Laravel 11 and later,
              including Laravel 13 used for this course, the default local
              storage disk points to <code>storage/app/private</code>. Therefore{" "}
              <code>Storage::get(&apos;weather.json&apos;)</code> looks for the
              file there. A file placed directly in <code>storage/app</code>{" "}
              will not be found.
            </Callout>
          </TutorialStep>

          <TutorialStep title="Step 3: Create a Route and Controller">
            <CodeBlock>php artisan make:controller WeatherController</CodeBlock>
            <p>
              Add the controller import and route to <code>routes/web.php</code>
              :
            </p>
            <CodeBlock>{weatherRoute}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 4: Build the Controller Logic">
            <p>
              In <code>app/Http/Controllers/WeatherController.php</code>, import
              the Storage facade and add the <code>index</code> method:
            </p>
            <CodeBlock>{weatherController}</CodeBlock>
            <Callout>
              <strong>Modern shortcut (optional):</strong> Laravel can read and
              decode the JSON file in one step:
              <CodeBlock>{storageJsonShortcut}</CodeBlock>
              The required two-step approach is shown so you can see the raw
              JSON string become a PHP associative array.
            </Callout>
          </TutorialStep>

          <TutorialStep title="Step 5: Create the Blade View">
            <p>
              Create <code>resources/views/weather/index.blade.php</code>. This
              path matches the <code>weather.index</code> view name used by the
              controller.
            </p>
            <CodeBlock>{weatherBladeView}</CodeBlock>
            <p>
              Visit <code>/weather</code>, for example{" "}
              <code>http://json-playground.test/weather</code>, and verify that
              the weekly forecast table displays all three records.
            </p>
          </TutorialStep>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <SectionHeading>
            Tutorial: Understanding JSON in Laravel
          </SectionHeading>
          <div className="mt-3 space-y-4 text-sm leading-7 text-amber-950 dark:text-amber-100">
            <section>
              <h5 className="font-semibold">What is JSON?</h5>
              <p>
                JSON (JavaScript Object Notation) is a lightweight format for
                storing and transporting data. APIs often use it to send
                structured data to web applications.
              </p>
            </section>
            <section>
              <h5 className="font-semibold">What is json_decode()?</h5>
              <p>
                This PHP function converts a JSON string into a PHP object or
                array. Passing <code>true</code> as the second argument returns
                an associative array.
              </p>
              <CodeBlock>{jsonDecodeExample}</CodeBlock>
            </section>
            <section>
              <h5 className="font-semibold">Step-by-Step Summary</h5>
              <ol className="mt-2 ml-5 list-decimal space-y-2">
                <li>
                  Create the JSON file in <code>storage/app/private</code>.
                </li>
                <li>Use Laravel&apos;s Storage facade to read it.</li>
                <li>Decode the JSON string into an array.</li>
                <li>Send the data to a Blade view.</li>
                <li>
                  Use <code>@foreach</code> to display the table rows.
                </li>
              </ol>
            </section>
          </div>
        </article>

        <article className="rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/50 dark:bg-orange-950/30">
          <SectionHeading>Submission Guidelines</SectionHeading>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-orange-950 dark:text-orange-100">
            <li>
              Create a GitHub repository named <code>cs85_module11a</code>.
            </li>
            <li>
              Include all project files and a README with setup instructions and
              a screenshot.
            </li>
            <li>Use descriptive commit messages.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-fuchsia-200 bg-fuchsia-50 p-4 dark:border-fuchsia-900/50 dark:bg-fuchsia-950/30">
          <SectionHeading>Optional Improvements</SectionHeading>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-fuchsia-950 dark:text-fuchsia-100">
            <li>
              Add conditional formatting, such as highlighting rainy days in
              blue.
            </li>
            <li>Sort the days alphabetically.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
          <SectionHeading>Completed Assignment</SectionHeading>
          <div className="mt-3 space-y-3 text-sm leading-7 text-indigo-950 dark:text-indigo-100">
            <p>
              The completed 11-page report documents the required static JSON
              workflow, WeatherController, Blade table, conditional formatting,
              alphabetical sorting, real browser and code evidence, and passing
              Laravel tests.
            </p>
            <p>
              It also includes a separate advanced track that evolves the same
              workflow into a server-side JSONPlaceholder integration with
              validation, normalized domain objects, caching, fallback data,
              controlled filters, and clean architecture boundaries.
            </p>
            <p>
              GitHub documentation:{" "}
              <a
                href="https://github.com/sergehall/cs85-php-programming/blob/main/assignments/module11a/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2"
              >
                cs85-php-programming / assignments / module11a
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
              download="Assignment_11A_API_Data_Report.pdf"
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
    <section className="mt-5 text-sm leading-7 text-inherit">
      <h5 className="font-semibold">{title}</h5>
      <div className="mt-2 space-y-3">{children}</div>
    </section>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-emerald-300 bg-white/70 p-3 dark:border-emerald-800 dark:bg-slate-950/30">
      {children}
    </div>
  );
}

function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
      <code>{children}</code>
    </pre>
  );
}
