import { Moon, Sun } from "lucide-react";

type ToggleThemeButtonProps = {
  isDark: boolean;
  toggleTheme: () => void;
  className?: string;
};

export default function ToggleThemeButton({
  isDark,
  toggleTheme,
  className = "",
}: ToggleThemeButtonProps) {
  const mode = isDark ? "Dark" : "Light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-transparent text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-green-400 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 ${className}`}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      aria-label={`Toggle Theme: ${mode} Mode`}
    >
      {isDark ? (
        <Moon size={16} aria-hidden="true" />
      ) : (
        <Sun size={16} aria-hidden="true" />
      )}
    </button>
  );
}
