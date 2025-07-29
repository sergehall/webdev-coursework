// src/components/buttons/RunAgainButton.tsx
import { RefreshCw } from "lucide-react";
import type { ReactNode } from "react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

type Props = {
  onRunAgain: () => void;
  disabled?: boolean;
  label?: string;
  icon?: ReactNode;
  size?: ButtonSize;
  variant?: Variants;
  type?: ButtonType;
  className?: string;
};

export default function RunAgainButton({
  onRunAgain,
  disabled = false,
  label = "Run Again",
  icon,
  size = "sm",
  variant = "blue",
  type = "button",
  className = "",
}: Props) {
  const finalIcon = icon ?? <RefreshCw size={16} />;

  const buttonClass = ColoredButton({
    variant,
    className,
  });

  return (
    <BaseButton
      onClick={onRunAgain}
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
