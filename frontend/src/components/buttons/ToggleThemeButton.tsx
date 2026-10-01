// src/components/buttons/ToggleThemeButton.tsx
import { Sun, Moon } from "lucide-react";
import type { ReactNode } from "react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { Variants } from "@/components/buttons/types/variants";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";

type ToggleThemeButtonProps = {
  isDark: boolean;
  toggleTheme: () => void;
  className?: string;
  variant?: Variants;
  size?: ButtonSize;
  type?: ButtonType;
  icon?: ReactNode;
  label?: string;
};

export default function ToggleThemeButton({
  isDark,
  toggleTheme,
  className = "",
  variant = "gray",
  size = "sm",
  type = "button",
  icon,
  label,
}: ToggleThemeButtonProps) {
  const finalIcon =
    icon ??
    (isDark ? (
      <Moon size={16} aria-hidden="true" />
    ) : (
      <Sun size={16} aria-hidden="true" />
    ));

  const finalLabel = label ?? (isDark ? "Dark Mode" : "Light Mode");

  const colorClass = ColoredButton({
    variant,
    className,
  });

  return (
    <BaseButton
      onClick={toggleTheme}
      icon={finalIcon}
      size={size}
      type={type}
      className={`${variant === "gray" ? "border border-green-700 bg-green-100 text-green-900 hover:bg-green-200 dark:border-green-400 dark:bg-[#24e66f] dark:text-green-950 dark:hover:bg-green-300" : colorClass} h-10 shrink-0 rounded-lg font-bold ${className}`}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      aria-label={`Toggle Theme: ${finalLabel}`}
    >
      {finalLabel}
    </BaseButton>
  );
}
