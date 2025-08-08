// src/assignments/mod3/AssignmentMod3Placeholder.tsx
export default function AssignmentMod3Placeholder() {
  return (
    <section className="space-y-6 rounded border border-yellow-300 bg-yellow-50 p-6 dark:border-yellow-700 dark:bg-yellow-900/10">
      <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300">
        Module 3 – Tic-Tac-Toe (Single Player vs Computer)
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        In this module, you’ll create a Python Tic-Tac-Toe game where a single
        player competes against the computer. You’ll use two-dimensional lists
        to store the board, <code>randint</code> from the <code>random</code>{" "}
        module for computer moves, and implement functions to check for wins
        across rows, columns, and diagonals. The computer moves first and plays
        as <strong>O</strong>.
      </p>

      <div className="rounded border border-yellow-200 bg-yellow-100 p-4 dark:border-yellow-600 dark:bg-yellow-800/30">
        <p>
          <strong>Assignment:</strong> Implement a Python program that:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Stores the board as a 2D list and displays it after each move via{" "}
            <code>print_board()</code>
          </li>
          <li>
            Implements <code>move()</code> for the computer using{" "}
            <code>random</code>
          </li>
          <li>
            Implements <code>check_cols()</code>, <code>check_rows()</code>,{" "}
            <code>check_diag1()</code>, and <code>check_diag2()</code> to detect
            wins
          </li>
          <li>
            Uses the provided <code>check_ifwin()</code> to determine the winner
            and announce results
          </li>
          <li>
            Continues until the player or computer wins, or the game is a draw,
            then offers to play again
          </li>
          <li>
            Validates user input and ensures the program runs in IDLE on Windows
          </li>
        </ul>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        🎯 Focus on clean, modular functions, accurate win detection, and a
        smooth play loop.
      </div>
    </section>
  );
}
