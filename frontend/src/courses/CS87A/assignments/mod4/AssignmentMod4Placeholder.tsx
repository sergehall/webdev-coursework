// src/assignments/mod4/AssignmentMod4Placeholder.tsx
export default function AssignmentMod4Placeholder() {
  return (
    <section className="space-y-6 rounded border border-purple-300 bg-purple-50 p-6 dark:border-purple-700 dark:bg-purple-900/10">
      <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300">
        Module 4 – More Fun With Functions & Python Lists
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        In this module, you’ll write and test small, reusable functions that
        operate on <strong>1D</strong> and <strong>2D</strong> lists (vectors
        and matrices). Your implementations must return new values and{" "}
        <strong>must not mutate</strong> their inputs.
      </p>

      <div className="rounded border border-purple-200 bg-purple-100 p-4 dark:border-purple-600 dark:bg-purple-800/30">
        <p>
          <strong>Assignment:</strong> Implement three functions in Python:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>Dot product</strong> — take two same-length numeric vectors
            (1D lists) and return a single scalar result.
          </li>
          <li>
            <strong>Transpose</strong> — take a matrix (2D list), which may be
            non-square, and return its transpose as a new 2D list.
          </li>
          <li>
            <strong>Scalar multiplication</strong> — given a scalar{" "}
            <code>v</code> and a matrix <code>A</code> (2D list), return a new
            matrix where each element is multiplied by <code>v</code>.
          </li>
        </ul>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Follow the examples from the handout to verify correctness (e.g.,
          <code>dot([1,2,3],[4,5,6]) → 32</code>, transposing non-square
          matrices, scaling by a constant).
        </p>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        Return results, don’t modify inputs. Submit a single <code>A04.py</code>{" "}
        with header comments. No external libraries; ensure it runs in IDLE
        (Windows).
      </div>
    </section>
  );
}
