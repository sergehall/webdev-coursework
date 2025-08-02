// src/components/buttons/ResetDayButton.tsx
import { RotateCcw } from "lucide-react";
import type { ReactNode } from "react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

type ResetDayButtonProps = {
  onClick: () => void;
  label?: string;
  icon?: ReactNode;
  size?: ButtonSize;
  variant?: Variants;
  type?: ButtonType;
  className?: string;
};

export default function ResetDayButton({
  onClick,
  label = "Pick another day",
  icon,
  size = "sm",
  variant = "gray",
  type = "button",
  className = "",
}: ResetDayButtonProps) {
  const finalIcon = icon ?? <RotateCcw size={14} />;

  const buttonClass = ColoredButton({
    variant,
    className: `text-sm px-4 py-1.5 ${className}`,
  });

  return (
    <BaseButton
      onClick={onClick}
      icon={finalIcon}
      size={size}
      type={type}
      className={buttonClass}
      title={label}
      aria-label={label}
    >
      {label}
    </BaseButton>
  );
}
