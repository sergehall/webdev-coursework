export const apiRequestExample = [
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

export const responseJson = [
  "{",
  '  "choices": [',
  '    { "message": { "role": "assistant", "content": "Hello there, welcome!" } }',
  "  ]",
  "}",
].join("\n");

export const responseExtraction =
  "$text = $response['choices'][0]['message']['content'] ?? 'No output received';";

export const failedResponseExample = [
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

export const configKeyExample = [
  "// OPENAI_API_KEY lives in .env; config() reads it. Never hardcode the key.",
  "$key = config('services.openai.key');",
].join("\n");

export const adaptivePromptExample = [
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

export const formInputsExample = [
  '<select name="tone">',
  "    <option value=\"professional\" @selected(old('tone') === 'professional')>Professional</option>",
  "    <option value=\"casual\" @selected(old('tone') === 'casual')>Casual</option>",
  "</select>",
].join("\n");

export const mockedServiceExample = [
  "$this->mock(AiContentService::class, function ($mock) {",
  "    $mock->shouldReceive('generateDraft')->once()->andReturn('Example output.');",
  "});",
].join("\n");

export const createProjectCommands = [
  "cd ~/Sites    # or your preferred dev folder",
  "laravel new blog-ai",
  "cd blog-ai",
].join("\n");

export const projectTree = [
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

export const createFilesCommands = [
  "mkdir app/Services",
  "touch app/Http/Controllers/AiContentController.php",
  "touch app/Services/AiContentService.php",
  "touch resources/views/ai_form.blade.php",
].join("\n");

export const envConfiguration = [
  "OPENAI_API_KEY=your_openai_api_key_here",
  "OPENAI_API_URL=https://api.openai.com/v1",
  "OPENAI_MODEL=gpt-4o-mini",
].join("\n");

export const servicesConfiguration = [
  "'openai' => [",
  "    'key'   => env('OPENAI_API_KEY'),",
  "    'url'   => env('OPENAI_API_URL', 'https://api.openai.com/v1'),",
  "    'model' => env('OPENAI_MODEL', 'gpt-4o-mini'),",
  "],",
].join("\n");

export const routeConfiguration = [
  "use App\\Http\\Controllers\\AiContentController;",
  "",
  "Route::get('/ai-form', [AiContentController::class, 'showForm'])->name('ai.form');",
  "Route::post('/ai-generate', [AiContentController::class, 'generate'])->name('ai.generate');",
].join("\n");

export const controllerCode = [
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

export const serviceStub = [
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

export const serviceHint = [
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

export const bladeView = [
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

export const runCommands = [
  "# Laravel Herd: http://blog-ai.test",
  "# Or use Laravel's built-in development server:",
  "php artisan serve",
  "",
  "# Then visit http://localhost:8000/ai-form",
].join("\n");

export const gitCommands = [
  "git init",
  "git add .",
  'git commit -m "Add OpenAI content generator (Module 12)"',
  "gh repo create cs85_module12 --public --source=. --remote=origin",
  "git push -u origin main",
].join("\n");

export const bonusTest = [
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
