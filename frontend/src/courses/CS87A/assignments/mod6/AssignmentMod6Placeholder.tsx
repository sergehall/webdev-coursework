// src/assignments/mod6/AssignmentMod6Placeholder.tsx
export default function AssignmentMod6Placeholder() {
  return (
    <section className="space-y-6 rounded border border-rose-300 bg-rose-50 p-6 shadow-sm dark:border-rose-700 dark:bg-rose-900/10">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-rose-700 dark:text-rose-300">
        Module 6 – Tkinter Pie Chart: Presidential Popular Vote by State & Year
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        In this module, you’ll extend your Python skills into GUI development
        with Tkinter by creating a <strong>PLUI</strong> class that draws a
        two-slice pie chart for a given state and year. The chart will show the
        winner’s popular vote percentage vs. all other candidates, using color
        coding for party affiliation.
      </p>

      <div className="rounded border border-rose-200 bg-rose-100 p-4 dark:border-rose-600 dark:bg-rose-800/30">
        <p>
          <strong>Assignment:</strong> Implement (or reuse) the{" "}
          <code>ElectionData</code> class to load binary data from{" "}
          <code>president_dictionary.dat</code>,{" "}
          <code>house_dictionary.dat</code>, and{" "}
          <code>electoral_results.dat</code> via <code>pickle</code>. Create a{" "}
          <code>PLUI</code> class with methods to:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>Set the state and election year</li>
          <li>
            Compute winner’s percentage and other-candidates’ percentage for
            that state/year
          </li>
          <li>
            Draw a pie chart on a Tkinter <code>Canvas</code> using{" "}
            <code>create_arc()</code>
          </li>
          <li>
            Color slices: <strong>red</strong> for Republican winner,{" "}
            <strong>blue</strong> for Democrat winner, <strong>green</strong>{" "}
            for others
          </li>
        </ul>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          The program runs in a loop: prompt for state (capitalized) and year
          (1976–2016), open the chart window, then after closing it, ask the
          user whether to draw another chart.
        </p>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        Focus on clean class design, accurate angle math (
        <code>percentage * 360</code>), and responsive Canvas drawing. Keep UI
        code separate from data-processing helpers.
      </div>
    </section>
  );
}
