import type { ReactNode } from "react";
import { X } from "lucide-react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { Variants } from "@/components/buttons/types/variants";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";

type ExitFullscreenButtonProps = {
  onClick: () => void;
  label?: string;
  icon?: ReactNode;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  variant?: Variants;
  className?: string;
};

export default function ExitFullscreenButton({
  onClick,
  label = "Exit Fullscreen",
  icon,
  size = "lg",
  type = "button",
  disabled = false,
  variant = "gradientPurpleBlue",
  className = "",
}: ExitFullscreenButtonProps) {
  const finalIcon = icon ?? <X size={16} />;

  const colorClass = ColoredButton({ variant, className });

  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      icon={finalIcon}
      size={size}
      type={type}
      className={colorClass}
      title={label}
      aria-label={label}
    >
      {label}
    </BaseButton>
  );
}
