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
      <Moon size={16} className="text-white" />
    ) : (
      <Sun size={16} className="text-yellow-500" />
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
      className={`${colorClass} h-10 w-10 rounded-full p-0`}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      aria-label={`Toggle Theme: ${finalLabel}`}
    />
  );
}
