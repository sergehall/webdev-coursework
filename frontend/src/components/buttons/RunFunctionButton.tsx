import { Play } from "lucide-react";
import type { ReactNode, MouseEventHandler } from "react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

type RunFunctionButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  label?: string;
  icon?: ReactNode;
  size?: ButtonSize;
  variant?: Variants;
  type?: ButtonType;
  className?: string;
};

export default function RunFunctionButton({
  onClick,
  disabled = false,
  label = "Execute function",
  icon,
  size = "sm",
  variant = "purple",
  type = "button",
  className = "",
}: RunFunctionButtonProps) {
  const finalIcon = icon ?? <Play size={16} />;

  const buttonClass = ColoredButton({
    variant,
    className,
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
