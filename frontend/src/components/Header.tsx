// src/components/Header.tsx
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-blue-600 px-6 py-4 text-white shadow dark:bg-gray-800 dark:text-gray-100">
      <h1 className="text-xl font-bold">Web Developer</h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
