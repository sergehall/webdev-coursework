export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-xs leading-5 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <p>
        © {currentYear} Serge Hall ·{" "}
        <a
          href="https://github.com/SergeHall"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline decoration-slate-300 underline-offset-4 transition hover:text-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:decoration-slate-700 dark:hover:text-sky-300"
        >
          GitHub
        </a>
      </p>
      <p className="mt-1">
        Independent academic portfolio based on coursework completed at Santa
        Monica College. This is not an official SMC website.
      </p>
    </footer>
  );
}
