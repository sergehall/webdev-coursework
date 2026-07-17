import { useState } from "react";
import { ClipboardPenLine } from "lucide-react";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

const assignment7BItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 7 Assignment 7B: Basic Routing",
  dueLabel: "Jul 19",
  pointsLabel: "20 pts",
};

const assignment7BFiles = [
  {
    fileUrl:
      "/code-playground/CS85/mod-7/Hancharou_Siarhei_Routing_Documentation.pdf",
    filename: "Hancharou_Siarhei_Routing_Documentation.pdf",
  },
];

const testUrls = [
  ["Home page", "http://localhost:8000/"],
  ["About page", "http://localhost:8000/about"],
  ["Hobbies list", "http://localhost:8000/hobbies"],
  ["First hobby", "http://localhost:8000/hobbies/1"],
  ["Second hobby", "http://localhost:8000/hobbies/2"],
  ["Third hobby", "http://localhost:8000/hobbies/3"],
];

const routeRows = [
  {
    url: "/",
    name: "home",
    type: "Closure",
    purpose: "Show welcome page",
  },
  {
    url: "/about",
    name: "about",
    type: "Closure",
    purpose: "Show info about me",
  },
  {
    url: "/hobbies",
    name: "hobbies.index",
    type: "Controller",
    purpose: "List all hobbies",
  },
  {
    url: "/hobbies/{id}",
    name: "hobbies.show",
    type: "Controller",
    purpose: "Show one hobby",
  },
];

export default function Assignment7BContent() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ModuleItemBlock item={assignment7BItem} />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-950/30">
        <article className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-sky-900 uppercase dark:text-sky-100">
            Objective
          </h4>
          <p className="mt-2 text-sm leading-7 text-sky-950 dark:text-sky-100">
            By completing this assignment, you will:
          </p>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-sky-950 dark:text-sky-100">
            <li>
              Create basic routes using both closure and controller approaches.
            </li>
            <li>Understand how to pass data from routes to views.</li>
            <li>Build simple Blade templates with a master layout.</li>
            <li>Implement one dynamic route with parameters.</li>
            <li>Create a working navigation menu using named routes.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-emerald-900 uppercase dark:text-emerald-100">
            Overview
          </h4>
          <p className="mt-2 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
            Create a simple personal website with four pages:
          </p>
          <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-emerald-950 dark:text-emerald-100">
            <li>
              <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                /
              </code>{" "}
              - Home Page: welcome page
            </li>
            <li>
              <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                /about
              </code>{" "}
              - About Page: information about you
            </li>
            <li>
              <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                /hobbies
              </code>{" "}
              - Hobbies Page: list of your hobbies
            </li>
            <li>
              <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                /hobbies/&#123;id&#125;
              </code>{" "}
              - Hobby Detail: details about a specific hobby
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900/50 dark:bg-cyan-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-cyan-900 uppercase dark:text-cyan-100">
            Part 1: Project Setup
          </h4>
          <p className="mt-2 text-sm leading-7 text-cyan-950 dark:text-cyan-100">
            <strong>Step 1:</strong> Create a new Laravel project.
          </p>
        </article>

        <article className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-indigo-900 uppercase dark:text-indigo-100">
            Part 2: Create Simple Routes
          </h4>
          <div className="mt-3 space-y-3 text-sm leading-7 text-indigo-950 dark:text-indigo-100">
            <p>
              <strong>Step 2:</strong> Create basic closure routes.
            </p>
            <p>
              Replace the content in{" "}
              <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                routes/web.php
              </code>
              .
            </p>
          </div>
        </article>

        <article className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/50 dark:bg-violet-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-violet-900 uppercase dark:text-violet-100">
            Part 3: Controller and Blade Views
          </h4>
          <div className="mt-3 space-y-5 text-sm leading-7 text-violet-950 dark:text-violet-100">
            <div>
              <p className="font-semibold">Step 3: Create Simple Controller</p>
              <p className="mt-2">Generate and edit the HobbyController:</p>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                <code>php artisan make:controller HobbyController</code>
              </pre>
              <p className="mt-2">
                Replace the content in{" "}
                <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                  app/Http/Controllers/HobbyController.php
                </code>
                .
              </p>
            </div>
            <div>
              <p className="font-semibold">Step 4: Create Master Layout</p>
              <p className="mt-2">
                Create{" "}
                <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                  resources/views/layouts/app.blade.php
                </code>
                .
              </p>
            </div>
            <div>
              <p className="font-semibold">Step 5: Create Home Page</p>
              <p className="mt-2">
                Create{" "}
                <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                  resources/views/home.blade.php
                </code>
                .
              </p>
            </div>
            <div>
              <p className="font-semibold">Step 6: Create About Page</p>
              <p className="mt-2">
                Create{" "}
                <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                  resources/views/about.blade.php
                </code>
                .
              </p>
            </div>
            <div>
              <p className="font-semibold">Step 7: Create Hobbies Views</p>
              <p className="mt-2">
                Create{" "}
                <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                  resources/views/hobbies/
                </code>{" "}
                and add:
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-2">
                <li>
                  <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                    resources/views/hobbies/index.blade.php
                  </code>
                </li>
                <li>
                  <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                    resources/views/hobbies/show.blade.php
                  </code>
                </li>
              </ul>
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-100">
            Part 4: Customize Your Content
          </h4>
          <div className="mt-3 space-y-4 text-sm leading-7 text-amber-950 dark:text-amber-100">
            <div>
              <p className="font-semibold">Step 8: Personalize Your Website</p>
              <p className="mt-2">
                In{" "}
                <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                  routes/web.php
                </code>
                , replace the placeholder values with your information:
              </p>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                <code>
                  {[
                    '$name = "Your Name Here"; // Put your actual name',
                    "$age = 20; // Put your actual age",
                    '$school = "Community College"; // Put your actual school',
                  ].join("\n")}
                </code>
              </pre>
            </div>
            <div>
              <p className="font-semibold">Customize HobbyController.php</p>
              <p className="mt-2">
                Replace the three hobbies with your actual hobbies, following
                this format:
              </p>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                <code>
                  {[
                    "1 => [",
                    "    'id' => 1,",
                    "    'name' => 'Your Hobby Name',",
                    "    'description' => 'What this hobby involves...',",
                    "    'why_i_like_it' => 'Why you enjoy this hobby...'",
                    "],",
                  ].join("\n")}
                </code>
              </pre>
            </div>
            <p>
              In{" "}
              <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                about.blade.php
              </code>
              , add more personal information if you want.
            </p>
            <p>
              <strong>What to document:</strong> Screenshot of your personalized
              content.
            </p>
          </div>
        </article>

        <article className="rounded-xl border border-teal-200 bg-teal-50 p-4 dark:border-teal-900/50 dark:bg-teal-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-teal-900 uppercase dark:text-teal-100">
            Part 5: Testing
          </h4>
          <div className="mt-3 space-y-5 text-sm leading-7 text-teal-950 dark:text-teal-100">
            <div>
              <p className="font-semibold">Step 9: Test All Pages</p>
              <p className="mt-2">Visit each page and make sure it works:</p>
              <ul className="mt-2 ml-5 list-disc space-y-2">
                {testUrls.map(([label, url]) => (
                  <li key={url}>
                    {label}:{" "}
                    <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                      {url}
                    </code>
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                Test error handling with{" "}
                <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                  http://localhost:8000/hobbies/999
                </code>
                . It should show a 404 page.
              </p>
              <p className="mt-3">
                <strong>What to document:</strong> Screenshot of each page
                working and the 404 error page.
              </p>
            </div>
            <p>
              <strong>Step 10:</strong> Test navigation.
            </p>
          </div>
        </article>

        <article className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
          <h4 className="text-sm font-semibold tracking-wide text-rose-900 uppercase dark:text-rose-100">
            Submit
          </h4>
          <div className="mt-3 space-y-5 text-sm leading-7 text-rose-950 dark:text-rose-100">
            <div>
              <p className="font-semibold">1. Complete Laravel Project</p>
              <ul className="mt-2 ml-5 list-disc space-y-2">
                <li>Zip your entire project folder.</li>
                <li>
                  Name it{" "}
                  <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                    Lastname_Firstname_Simple_Website.zip
                  </code>
                  .
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">2. Simple Documentation</p>
              <p className="mt-2">Create a Word or PDF document containing:</p>
              <ul className="mt-2 ml-5 list-disc space-y-2">
                <li>Cover page with your name, assignment title, and date.</li>
                <li>Screenshot of the routes file.</li>
                <li>Screenshot of the controller file.</li>
                <li>
                  Screenshot of each working page: four pages and the 404 page.
                </li>
                <li>Screenshot of navigation with its active state.</li>
                <li>Personal information you added.</li>
                <li>The hobbies you chose and why.</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Route List</p>
              <div className="mt-2 overflow-x-auto rounded-lg border border-rose-200 bg-white/70 dark:border-rose-900/50 dark:bg-slate-950/30">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-rose-200 dark:border-rose-900/50">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-semibold">
                        URL
                      </th>
                      <th scope="col" className="px-3 py-2 font-semibold">
                        Route Name
                      </th>
                      <th scope="col" className="px-3 py-2 font-semibold">
                        Type
                      </th>
                      <th scope="col" className="px-3 py-2 font-semibold">
                        Purpose
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {routeRows.map((route) => (
                      <tr
                        key={route.url}
                        className="border-b border-rose-100 align-top last:border-b-0 dark:border-rose-900/30"
                      >
                        <td className="px-3 py-2 font-mono text-xs">
                          {route.url}
                        </td>
                        <td className="px-3 py-2">{route.name}</td>
                        <td className="px-3 py-2">{route.type}</td>
                        <td className="px-3 py-2">{route.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <p className="font-semibold">
                Reflection: 2-3 sentences for each question
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-2">
                <li>What was the easiest part of this assignment?</li>
                <li>What was the most challenging part?</li>
                <li>What did you learn about Laravel routing?</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Submission Requirements</p>
              <ul className="mt-2 ml-5 list-disc space-y-2">
                <li>
                  Project zip file:{" "}
                  <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                    Lastname_Firstname_Simple_Website.zip
                  </code>
                </li>
                <li>
                  Documentation PDF:{" "}
                  <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs dark:bg-slate-950/50">
                    Lastname_Firstname_Routing_Documentation.pdf
                  </code>
                </li>
                <li>Submit both files together.</li>
              </ul>
            </div>
          </div>
        </article>

        <div className="flex flex-wrap gap-3">
          <ToggleModalButton
            isOpen={isPreviewOpen}
            label={
              isPreviewOpen
                ? "Close Module 7 Assignment 7B PDF"
                : "View Module 7 Assignment 7B PDF"
            }
            toggle={() => setIsPreviewOpen((prev) => !prev)}
          />
        </div>

        <ShowModalButton
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          files={assignment7BFiles}
        />
      </section>
    </div>
  );
}
