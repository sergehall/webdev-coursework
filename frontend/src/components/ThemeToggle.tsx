import { ToggleThemeButton } from "@/components/buttons";
import { useThemeContext } from "@/context/useThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeContext();

  return <ToggleThemeButton isDark={isDark} toggleTheme={toggleTheme} />;
}
