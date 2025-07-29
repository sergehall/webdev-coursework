// src/components/buttons/RetryQuizButton.tsx
import type { ReactNode } from "react";
import { RotateCcw } from "lucide-react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

type RetryQuizButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  icon?: ReactNode;
  size?: ButtonSize;
  variant?: Variants;
  type?: ButtonType;
  className?: string;
};

export default function RetryQuizButton(props: RetryQuizButtonProps) {
  const {
    onClick,
    disabled = false,
    label,
    icon,
    size,
    variant,
    type,
    className = "",
  } = props;

  const finalLabel = label ?? "Retry Quiz";
  const finalIcon = icon ?? <RotateCcw size={16} />;
  const finalSize = size ?? "md";
  const finalVariant = variant ?? "default";
  const finalType = type ?? "button";

  const buttonClass = ColoredButton({
    variant: finalVariant,
    className: `px-4 py-2 rounded ${className}`,
  });

  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      icon={finalIcon}
      size={finalSize}
      className={buttonClass}
      type={finalType}
      title={finalLabel}
      aria-label={finalLabel}
    >
      {finalLabel}
    </BaseButton>
  );
}
