// src/components/buttons/ToggleScreenshotButton.tsx
import { Eye, EyeOff } from "lucide-react";
import type { ReactNode } from "react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { Variants } from "@/components/buttons/types/variants";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";

type ToggleScreenshotButtonProps = {
  show: boolean;
  toggle: () => void;
  label?: string;
  icon?: ReactNode;
  size?: ButtonSize;
  type?: ButtonType;
  variant?: Variants;
  className?: string;
};

export default function ToggleScreenshotButton({
  show,
  toggle,
  label = "Screenshots",
  icon,
  size = "sm",
  type = "button",
  variant = "info",
  className = "",
}: ToggleScreenshotButtonProps) {
  const finalIcon = icon ?? (show ? <EyeOff size={16} /> : <Eye size={16} />);
  const colorClass = ColoredButton({ variant, className });

  return (
    <BaseButton
      onClick={toggle}
      size={size}
      type={type}
      icon={finalIcon}
      className={colorClass}
      title={`${show ? "Hide" : "Show"} ${label}`}
      aria-label={`${show ? "Hide" : "Show"} ${label}`}
    >
      {show ? `Hide ${label}` : `Show ${label}`}
    </BaseButton>
  );
}
