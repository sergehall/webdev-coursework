import { useState } from "react";
import type { ReactNode } from "react";
import { ClipboardPenLine } from "lucide-react";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

const assignment8BItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 8 Assignment 8B: Rebuild Your Inventory with Laravel Eloquent",
  dueLabel: "Jul 19",
  pointsLabel: "20 pts",
};

const assignmentPdfUrl =
  "/code-playground/CS85/mod-8/8b/Module8_Assignment_8B.pdf";

const assignmentPdfFiles = [
  {
    fileUrl: assignmentPdfUrl,
    filename: "Module8_Assignment_8B.pdf",
  },
];

const databaseEnvironment = [
  "DB_CONNECTION=mysql",
  "DB_HOST=127.0.0.1",
  "DB_PORT=3306",
  "DB_DATABASE=inventory_db",
  "DB_USERNAME=root",
  "DB_PASSWORD=",
].join("\n");

const migrationExample = [
  "php artisan make:migration create_items_table",
  "",
  "Schema::create('items', function (Blueprint $table): void {",
  "    $table->id();",
  "    $table->string('item_name');",
  "    $table->string('category')->nullable();",
  "    $table->integer('quantity')->default(0);",
  "    $table->date('purchase_date')->nullable();",
  "    $table->timestamps();",
  "});",
  "",
  "php artisan migrate",
].join("\n");

const modelExample = [
  "php artisan make:model Item",
  "",
  "protected $fillable = [",
  "    'item_name',",
  "    'category',",
  "    'quantity',",
  "    'purchase_date',",
  "];",
].join("\n");

const tinkerExample = [
  "php artisan tinker",
  "",
  "App\\Models\\Item::create([",
  "    'item_name' => 'Notebook',",
  "    'category' => 'Office',",
  "    'quantity' => 12,",
  "    'purchase_date' => '2026-07-10',",
  "]);",
  "",
  "App\\Models\\Item::create([",
  "    'item_name' => 'Wireless Mouse',",
  "    'category' => 'Electronics',",
  "    'quantity' => 7,",
  "    'purchase_date' => '2026-07-12',",
  "]);",
].join("\n");

const controllerExample = [
  "php artisan make:controller InventoryController",
  "",
  "public function index(): View",
  "{",
  "    $items = Item::query()->get();",
  "",
  "    return view('inventory', ['items' => $items]);",
  "}",
].join("\n");

const routeExample = [
  "Route::get('/inventory', [InventoryController::class, 'index'])",
  "    ->name('inventory.index');",
].join("\n");

const bladeExample = [
  "<table>",
  "    <thead>",
  "        <tr>",
  "            <th>Item</th>",
  "            <th>Category</th>",
  "            <th>Quantity</th>",
  "            <th>Purchase Date</th>",
  "        </tr>",
  "    </thead>",
  "    <tbody>",
  "        @foreach ($items as $item)",
  "            <tr>",
  "                <td>{{ $item->item_name }}</td>",
  "                <td>{{ $item->category }}</td>",
  "                <td>{{ $item->quantity }}</td>",
  "                <td>{{ $item->purchase_date }}</td>",
  "            </tr>",
  "        @endforeach",
  "    </tbody>",
  "</table>",
].join("\n");

const reflectionExample = [
  "{{--",
  "Reflection:",
  "Eloquent simplified how I interacted with the database.",
  "It helped me write less code and think in objects instead of queries.",
  "It’s a more modern, scalable way to work with data.",
  "--}}",
].join("\n");

export default function Assignment8BContent() {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleItemBlock item={assignment8BItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <SectionHeading>Objectives</SectionHeading>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-sky-950 dark:text-sky-100">
            <li>
              Understand how Eloquent connects Laravel models to MySQL tables.
            </li>
            <li>
              Rebuild an inventory database using Laravel migrations and
              Eloquent models.
            </li>
            <li>Use a controller and Blade template to display data.</li>
            <li>Reflect on how ORM changes database workflows.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/50 dark:bg-violet-950/30">
          <SectionHeading>Project Overview</SectionHeading>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-violet-950 dark:text-violet-100">
            <li>Create a new Laravel project.</li>
            <li>Rebuild the items table using a Laravel migration.</li>
            <li>Create and configure an Eloquent model.</li>
            <li>Insert sample data using Laravel Tinker.</li>
            <li>Use a controller to retrieve data.</li>
            <li>Display inventory items using Blade.</li>
            <li>Add a reflection on your experience with Eloquent.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <SectionHeading>Step-by-Step Tutorial</SectionHeading>

          <TutorialStep title="Step 1: Create a New Laravel Project">
            <CodeBlock>
              {["laravel new inventory_app", "cd inventory_app", "code ."].join(
                "\n"
              )}
            </CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 2: Configure the Database">
            <p>
              Edit the Laravel .env file with the MySQL connection settings:
            </p>
            <CodeBlock>{databaseEnvironment}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 3: Create a Migration">
            <p>
              Generate the migration, define the inventory columns, and migrate
              the database.
            </p>
            <CodeBlock>{migrationExample}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 4: Create the Model">
            <p>
              Create the Item model and allow the inventory fields to be mass
              assigned.
            </p>
            <CodeBlock>{modelExample}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 5: Insert Sample Data with Tinker">
            <CodeBlock>{tinkerExample}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 6: Create a Controller">
            <p>
              Retrieve the records through Eloquent and pass them to the Blade
              view.
            </p>
            <CodeBlock>{controllerExample}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 7: Define a Route">
            <CodeBlock>{routeExample}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 8: Create a Blade Template">
            <CodeBlock>{bladeExample}</CodeBlock>
          </TutorialStep>

          <TutorialStep title="Step 9: Run the Project">
            <CodeBlock>php artisan serve</CodeBlock>
            <p>Visit the inventory page:</p>
            <a
              href="http://localhost:8000/inventory"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex font-semibold underline underline-offset-2"
            >
              http://localhost:8000/inventory
            </a>
          </TutorialStep>

          <TutorialStep title="Step 10: Add a Reflection">
            <CodeBlock>{reflectionExample}</CodeBlock>
          </TutorialStep>
        </article>

        <article className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900/50 dark:bg-cyan-950/30">
          <SectionHeading>Completed Project Adaptation</SectionHeading>
          <p className="mt-2 text-sm leading-7 text-cyan-950 dark:text-cyan-100">
            The completed coursework reuses the existing CS85 Laravel
            application and isolates this assignment with a dedicated module8b
            MySQL connection on port 3307 and a dedicated migration directory.
            It includes the Item model, a thin controller, a named inventory
            route, a Blade view, sample Notebook and Wireless Mouse records,
            search, filtering, sorting, and seven feature tests with 45
            assertions.
          </p>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <SectionHeading>Submission Instructions</SectionHeading>
          <div className="mt-3 space-y-3 text-sm leading-7 text-amber-950 dark:text-amber-100">
            <p>GitHub repository name:</p>
            <code className="inline-block rounded bg-white/80 px-2 py-1 text-xs dark:bg-slate-950/40">
              cs85-module8b-inventory-eloquent
            </code>
            <p>Push the project and submit these items to Canvas:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>GitHub repository URL.</li>
              <li>A screenshot of the inventory page.</li>
              <li>Test URL: http://localhost:8000/inventory</li>
            </ul>
          </div>
        </article>

        <article className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
          <SectionHeading>Completed Assignment</SectionHeading>
          <p className="mt-2 text-sm leading-7 text-indigo-950 dark:text-indigo-100">
            Open the submitted report to review the implementation, terminal
            output, inventory page screenshots, automated tests, reflection,
            repository link, and local test URL.
          </p>
          <a
            href="https://github.com/sergehall/cs85-php-programming"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex font-semibold text-indigo-900 underline underline-offset-2 dark:text-indigo-100"
          >
            GitHub repository: cs85-php-programming
          </a>
          <div className="mt-4 flex flex-wrap gap-3">
            <ToggleModalButton
              isOpen={isPdfOpen}
              label={isPdfOpen ? "Close assignment PDF" : "View assignment PDF"}
              toggle={() => setIsPdfOpen((previous) => !previous)}
            />
            <a
              href={assignmentPdfUrl}
              download="Module8_Assignment_8B.pdf"
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
