// src/assignments/mod4/AssignmentMod4Placeholder.tsx
export default function AssignmentMod4Placeholder() {
  return (
    <section className="space-y-6 rounded border border-purple-300 bg-purple-50 p-6 dark:border-purple-700 dark:bg-purple-900/10">
      <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300">
        Module 4 – More Fun With Functions & Python Lists
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        In this module, you will practice working with Python functions, 1D and
        2D lists, and menu-driven programs. You’ll build three small programs —
        dot product, matrix transpose, and scalar multiplication — plus a demo
        mode that runs them automatically with random data.
      </p>

      <div className="rounded border border-purple-200 bg-purple-100 p-4 dark:border-purple-600 dark:bg-purple-800/30">
        <p>
          <strong>Assignment:</strong> Create a console application with a menu
          to run the following:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>Program 1 – Dot Product:</strong> calculate the dot product
            of two same-length numeric vectors (1D lists)
          </li>
          <li>
            <strong>Program 2 – Matrix Transpose:</strong> produce the transpose
            of a 2D list (matrix)
          </li>
          <li>
            <strong>Program 3 – Scalar Multiplication:</strong> multiply a 2D
            list (matrix) by a scalar
          </li>
          <li>
            <strong>Demo Mode:</strong> run all three programs sequentially with
            randomly generated values
          </li>
        </ul>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        Focus on clear function design, proper list handling, and user-friendly
        menu interaction. Validate inputs and print results in a clean format.
      </div>
    </section>
  );
}
