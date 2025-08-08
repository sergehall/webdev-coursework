// src/assignments/mod3/AssignmentMod3Placeholder.tsx
export default function AssignmentMod3Placeholder() {
  return (
    <section className="space-y-6 rounded border border-yellow-300 bg-yellow-50 p-6 dark:border-yellow-700 dark:bg-yellow-900/10">
      <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300">
        Module 3 – Tic-Tac-Toe with Variable Board Size & Difficulty
      </h2>

      <p className="text-gray-800 dark:text-gray-100">
        In this module, you’ll implement a console-based Tic-Tac-Toe game in
        Python. You’ll practice using two-dimensional lists, loops, conditional
        logic, and input validation. The game will allow the player to choose
        both the board size and a difficulty level for the computer opponent.
      </p>

      <div className="rounded border border-yellow-200 bg-yellow-100 p-4 dark:border-yellow-600 dark:bg-yellow-800/30">
        <p>
          <strong>Assignment:</strong> Create a Python program that:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>
            Prompts the user for the board diagonal length (minimum{" "}
            <code>3</code>) and difficulty level (<code>1</code> = random moves,
            <code>2</code> = try to win or draw)
          </li>
          <li>
            Represents the board as a two-dimensional list and displays it after
            each move
          </li>
          <li>
            Alternates turns between the player (<code>X</code>) and computer (
            <code>0</code>)
          </li>
          <li>
            Checks for wins in rows, columns, and diagonals; detects draws
          </li>
          <li>Validates all user input and handles errors gracefully</li>
          <li>Offers to play again after the game ends</li>
        </ul>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        🎯 Focus on clean code, clear game logic, and a smooth user experience.
      </div>
    </section>
  );
}
