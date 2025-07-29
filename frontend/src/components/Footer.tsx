// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-200 p-4 text-center text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
      Developed by Serge Hall •{" "}
      <a
        href="https://github.com/SergeHall"
        target="_blank"
        rel="noreferrer"
        className="underline hover:text-blue-500"
      >
        GitHub
      </a>{" "}
      • © 2025 Santa Monica College
    </footer>
  );
}
