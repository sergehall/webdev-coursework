/**
 * Applies the saved theme from localStorage (if available),
 * or falls back to system preference if none is set.
 *
 * Adds or removes the `dark` class on <html> accordingly.
 */
export function applySavedTheme() {
  try {
    const saved = localStorage.getItem("theme"); // 'dark' | 'light' | null
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const isDark = saved === "dark" || (!saved && prefersDark);

    document.documentElement.classList.toggle("dark", isDark);
  } catch (error) {
    console.warn("Could not apply theme from localStorage:", error);
  }
}
