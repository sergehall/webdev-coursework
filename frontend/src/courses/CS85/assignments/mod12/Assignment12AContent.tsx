import { useState, type ReactNode } from "react";
import { ClipboardPenLine } from "lucide-react";

import { ShowModalButton, ToggleModalButton } from "@/components/buttons";
import {
  ModuleItemBlock,
  type CanvasItem,
} from "@/courses/CS85/assignments/shared/canvasItems";

const assignment12AItem: CanvasItem = {
  icon: ClipboardPenLine,
  title: "Module 12 Assignment 12A: Integrating OpenAI",
  dueLabel: "Aug 2",
  pointsLabel: "100 pts",
};

const assignmentPdfUrl =
  "/code-playground/CS85/mod-12/12a/Module_12_Assignment_12A_Integrating_OpenAI_Report.pdf";

const assignmentPdfFiles = [
  {
    fileUrl: assignmentPdfUrl,
    filename: "Module_12_Assignment_12A_Integrating_OpenAI_Report.pdf",
  },
];

const apiRequestExample = [
  "use Illuminate\\Support\\Facades\\Http;",
  "",
  "$response = Http::withHeaders([",
  "    'Authorization' => 'Bearer ' . config('services.openai.key'),",
  "    'Content-Type'  => 'application/json',",
  "])->post(config('services.openai.url') . '/chat/completions', [",
  "    'model' => config('services.openai.model'),",
  "    'messages' => [",
  "        ['role' => 'user', 'content' => 'Say hello in one short sentence.'],",
  "    ],",
  "]);",
].join("\n");

const responseJson = [
  "{",
  '  "choices": [',
  '    { "message": { "role": "assistant", "content": "Hello there, welcome!" } }',
  "  ]",
  "}",
].join("\n");

const responseExtraction =
  "$text = $response['choices'][0]['message']['content'] ?? 'No output received';";

const failedResponseExample = [
  "use Illuminate\\Support\\Facades\\Log;",
  "",
  "if (! $response->successful()) {",
  "    Log::error('API call failed', [",
  "        'status' => $response->status(),",
  "        'body'   => $response->body(),",
  "    ]);",
  "",
  "    throw new \\Exception('The request failed.');",
  "}",
].join("\n");

const configKeyExample = [
  "// OPENAI_API_KEY lives in .env; config() reads it. Never hardcode the key.",
  "$key = config('services.openai.key');",
].join("\n");

const adaptivePromptExample = [
  "private function buildTaglinePrompt(string $product, string $style): string",
  "{",
  '    $task = "Write a catchy tagline for: {$product}.";',
  "",
  "    $styleInstruction = match ($style) {",
  "        'bold'    => 'Make it punchy and confident. Under 10 words.',",
  "        'playful' => 'Make it fun and lighthearted. Under 10 words.',",
  "        default   => 'Keep it clear and professional. Under 10 words.',",
  "    };",
  "",
  "    return $task . ' ' . $styleInstruction;",
  "}",
].join("\n");

const formInputsExample = [
  '<select name="tone">',
  "    <option value=\"professional\" @selected(old('tone') === 'professional')>Professional</option>",
  "    <option value=\"casual\" @selected(old('tone') === 'casual')>Casual</option>",
  "</select>",
].join("\n");

const mockedServiceExample = [
  "$this->mock(AiContentService::class, function ($mock) {",
  "    $mock->shouldReceive('generateDraft')->once()->andReturn('Example output.');",
  "});",
].join("\n");

const createProjectCommands = [
  "cd ~/Sites    # or your preferred dev folder",
  "laravel new blog-ai",
  "cd blog-ai",
].join("\n");

const projectTree = [
  "app/",
  "|-- Http/",
  "|   `-- Controllers/",
  "|-- Services/        <- you create this",
  "resources/",
  "|-- views/",
  "routes/",
  "|-- web.php",
  ".env",
].join("\n");

const createFilesCommands = [
  "mkdir app/Services",
  "touch app/Http/Controllers/AiContentController.php",
  "touch app/Services/AiContentService.php",
  "touch resources/views/ai_form.blade.php",
].join("\n");

const envConfiguration = [
  "OPENAI_API_KEY=your_openai_api_key_here",
  "OPENAI_API_URL=https://api.openai.com/v1",
  "OPENAI_MODEL=gpt-4o-mini",
].join("\n");

const servicesConfiguration = [
  "'openai' => [",
  "    'key'   => env('OPENAI_API_KEY'),",
  "    'url'   => env('OPENAI_API_URL', 'https://api.openai.com/v1'),",
  "    'model' => env('OPENAI_MODEL', 'gpt-4o-mini'),",
  "],",
].join("\n");

const routeConfiguration = [
  "use App\\Http\\Controllers\\AiContentController;",
  "",
  "Route::get('/ai-form', [AiContentController::class, 'showForm'])->name('ai.form');",
  "Route::post('/ai-generate', [AiContentController::class, 'generate'])->name('ai.generate');",
].join("\n");

const controllerCode = [
  "namespace App\\Http\\Controllers;",
  "",
  "use App\\Services\\AiContentService;",
  "use Illuminate\\Http\\Request;",
  "",
  "class AiContentController extends Controller",
  "{",
  "    public function showForm()",
  "    {",
  "        return view('ai_form');",
  "    }",
  "",
  "    public function generate(Request $request, AiContentService $ai)",
  "    {",
  "        $validated = $request->validate([",
  "            'title' => 'required|string|min:5|max:255',",
  "            'type'  => 'required|in:blog post,meta description,email subject line',",
  "            'tone'  => 'required|in:professional,casual,humorous',",
  "        ]);",
  "",
  "        try {",
  "            $output = $ai->generateDraft(",
  "                $validated['title'],",
  "                $validated['type'],",
  "                $validated['tone'],",
  "            );",
  "",
  "            return view('ai_form', [",
  "                'output' => $output,",
  "                'title'  => $validated['title'],",
  "            ]);",
  "        } catch (\\Throwable $e) {",
  "            return back()",
  "                ->withInput()",
  "                ->withErrors(['error' => 'AI request failed: ' . $e->getMessage()]);",
  "        }",
  "    }",
  "}",
].join("\n");

const serviceStub = [
  "namespace App\\Services;",
  "",
  "use Illuminate\\Support\\Facades\\Http;",
  "use Illuminate\\Support\\Facades\\Log;",
  "",
  "class AiContentService",
  "{",
  "    /**",
  "     * Generate a draft from a title, content type, and tone.",
  "     *",
  "     * Build the prompt, POST to /chat/completions with the configured",
  "     * key, send system and user messages, log failed responses, and",
  "     * safely return the assistant message content.",
  "     *",
  "     * @throws \\Exception",
  "     */",
  "    public function generateDraft(",
  "        string $title,",
  "        string $type = 'blog post',",
  "        string $tone = 'professional'",
  "    ): string {",
  "        // TODO: implement per the specification.",
  "    }",
  "",
  "    /**",
  "     * Build a type-aware and tone-aware prompt.",
  "     */",
  "    private function buildPrompt(",
  "        string $title,",
  "        string $type,",
  "        string $tone",
  "    ): string {",
  "        // TODO: implement per the specification.",
  "    }",
  "}",
].join("\n");

const serviceHint = [
  "$response = Http::withHeaders([",
  "    'Authorization' => 'Bearer ' . config('services.openai.key'),",
  "    'Content-Type'  => 'application/json',",
  "])->post(config('services.openai.url') . '/chat/completions', [",
  "    'model' => config('services.openai.model'),",
  "    'messages' => [",
  "        ['role' => 'system', 'content' => /* TODO: role reflecting $tone */],",
  "        ['role' => 'user', 'content' => $this->buildPrompt($title, $type, $tone)],",
  "    ],",
  "    'temperature' => 0.7,",
  "    'max_tokens'  => 500,",
  "]);",
  "",
  "// TODO: log and throw when the response is not successful.",
  "// TODO: safely return choices[0].message.content.",
].join("\n");

const bladeView = [
  "<!DOCTYPE html>",
  '<html lang="en">',
  "<head>",
  '    <meta charset="utf-8">',
  '    <meta name="viewport" content="width=device-width, initial-scale=1">',
  "    <title>AI Content Generator</title>",
  '    <script src="https://cdn.tailwindcss.com"></script>',
  "</head>",
  '<body class="bg-gray-100">',
  '<div class="container mx-auto mt-6 max-w-2xl px-4">',
  '    <h1 class="mb-4 text-2xl font-bold">AI Content Generator</h1>',
  "",
  '    <form method="POST" action="{{ route(\'ai.generate\') }}">',
  "        @csrf",
  "",
  '        <label for="title" class="block font-medium">Title or topic:</label>',
  '        <input type="text" name="title" id="title"',
  "               value=\"{{ old('title', $title ?? '') }}\"",
  '               class="mt-1 w-full border p-2" required>',
  "        @error('title')",
  '            <div class="mt-1 text-red-600">{{ $message }}</div>',
  "        @enderror",
  "",
  '        <label for="type" class="mt-3 block font-medium">Content type:</label>',
  '        <select name="type" id="type" class="mt-1 w-full border p-2">',
  "            <option value=\"blog post\" @selected(old('type') === 'blog post')>Blog Post</option>",
  "            <option value=\"meta description\" @selected(old('type') === 'meta description')>Meta Description</option>",
  "            <option value=\"email subject line\" @selected(old('type') === 'email subject line')>Email Subject Line</option>",
  "        </select>",
  "",
  '        <label for="tone" class="mt-3 block font-medium">Tone:</label>',
  '        <select name="tone" id="tone" class="mt-1 w-full border p-2">',
  "            <option value=\"professional\" @selected(old('tone') === 'professional')>Professional</option>",
  "            <option value=\"casual\" @selected(old('tone') === 'casual')>Casual</option>",
  "            <option value=\"humorous\" @selected(old('tone') === 'humorous')>Humorous</option>",
  "        </select>",
  "",
  '        <button type="submit" class="mt-4 rounded bg-blue-600 px-4 py-2 text-white">Generate</button>',
  "    </form>",
  "",
  "    @error('error')",
  '        <div class="mt-4 text-red-600">{{ $message }}</div>',
  "    @enderror",
  "",
  "    @isset($output)",
  '        <div class="mt-6">',
  '            <h2 class="mb-2 text-xl font-semibold">Generated draft (edit as needed):</h2>',
  '            <textarea class="h-64 w-full whitespace-pre-wrap border p-3">{{ $output }}</textarea>',
  "        </div>",
  "    @endisset",
  "</div>",
  "</body>",
  "</html>",
].join("\n");

const runCommands = [
  "# Laravel Herd: http://blog-ai.test",
  "# Or use Laravel's built-in development server:",
  "php artisan serve",
  "",
  "# Then visit http://localhost:8000/ai-form",
].join("\n");

const gitCommands = [
  "git init",
  "git add .",
  'git commit -m "Add OpenAI content generator (Module 12)"',
  "gh repo create cs85_module12 --public --source=. --remote=origin",
  "git push -u origin main",
].join("\n");

const bonusTest = [
  "namespace Tests\\Feature;",
  "",
  "use App\\Services\\AiContentService;",
  "use Tests\\TestCase;",
  "",
  "class DraftGenerationTest extends TestCase",
  "{",
  "    public function test_generate_returns_the_services_output(): void",
  "    {",
  "        $this->mock(AiContentService::class, function ($mock) {",
  "            $mock->shouldReceive('generateDraft')",
  "                 ->once()",
  "                 ->andReturn('A generated draft.');",
  "        });",
  "",
  "        $this->post(route('ai.generate'), [",
  "            'title' => 'A meaningful test title',",
  "            'type'  => 'blog post',",
  "            'tone'  => 'professional',",
  "        ])->assertOk()->assertSee('A generated draft.');",
  "    }",
  "}",
].join("\n");

const rubricRows = [
  {
    criterion: "Form, route, and controller wired correctly",
    expectation:
      "The form POSTs to a named route. The controller validates the title, content type, and tone, and delegates to the service.",
    points: 15,
  },
  {
    criterion: "Service implemented from the spec",
    expectation:
      "You wrote generateDraft(): it sends the correct request, logs and throws on a failed response, and returns the content safely.",
    points: 25,
  },
  {
    criterion: "Prompt adapts to type and tone",
    expectation:
      "buildPrompt() asks for a different result for each content type and reflects the chosen tone.",
    points: 20,
  },
  {
    criterion: "Secure API key handling",
    expectation:
      "The key lives in .env and is read through config('services.openai.key'). Nothing sensitive is committed.",
    points: 12,
  },
  {
    criterion: "Error handling and logging",
    expectation:
      "Failures are caught, logged with Log::error, and shown to the user as a friendly message.",
    points: 8,
  },
  {
    criterion: "Editable draft output",
    expectation: "The generated draft is displayed in an editable textarea.",
    points: 5,
  },
  {
    criterion: "README quality",
    expectation:
      "Include Mac and Windows setup, how to obtain an API key, an app description, and a screenshot or screencast.",
    points: 10,
  },
  {
    criterion: "Git hygiene",
    expectation:
      "Use a public repository named cs85_module12 with clear, descriptive commits.",
    points: 5,
  },
] as const;

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
    <div className="mt-3 rounded-lg border border-emerald-300 bg-white/70 p-3 dark:border-emerald-800 dark:bg-slate-950/30">
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
