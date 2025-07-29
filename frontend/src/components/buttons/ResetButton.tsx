import type { ReactNode } from "react";
import { RotateCcw } from "lucide-react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

type ResetButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
  icon?: ReactNode;
  size?: ButtonSize;
  variant?: Variants;
  type?: ButtonType;
  className?: string;
};

export default function ResetButton({
  onClick,
  disabled = false,
  label = "Reset",
  icon,
  size = "sm",
  variant = "default",
  type = "reset",
  className = "",
}: ResetButtonProps) {
  const finalIcon = icon ?? <RotateCcw size={16} />;

  const buttonClass = ColoredButton({
    variant,
    className: `px-5 py-2 rounded shadow ${className}`,
  });

  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
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
