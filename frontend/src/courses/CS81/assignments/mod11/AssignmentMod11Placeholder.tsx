// src/assignments/mod11/AssignmentMod11Placeholder.tsx

export default function AssignmentMod11Placeholder() {
  return (
    <section className="space-y-6 rounded border border-cyan-300 bg-cyan-50 p-6 shadow-sm dark:border-cyan-700 dark:bg-cyan-900/10">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-cyan-700 dark:text-cyan-300">
        Module 11 – Public APIs
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        The web is full of public APIs that allow you to fetch real-time data —
        from weather and news to trivia and memes. This module introduces how to
        work with external APIs in your React apps using <code>fetch</code> and
        manage their responses with React state.
      </p>

      <div className="rounded border border-cyan-200 bg-cyan-100 p-4 dark:border-cyan-600 dark:bg-cyan-800/30">
        <p className="text-sm leading-relaxed text-cyan-900 dark:text-cyan-100">
          <strong>Assignment:</strong> Build a small application that fetches
          data from a public API and displays it in a clean, styled layout.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Use <code>useEffect</code> to make API requests on component mount
          </li>
          <li>Manage loading and error states</li>
          <li>Render dynamic content based on API data</li>
          <li>Pick any open API (e.g. Pokémon, NASA, Trivia, etc.)</li>
        </ul>
      </div>

      <div className="text-sm italic text-cyan-800 dark:text-cyan-300">
        🌐 APIs allow your app to connect to the world. Practice working with
        async data the right way.
      </div>
    </section>
  );
}
