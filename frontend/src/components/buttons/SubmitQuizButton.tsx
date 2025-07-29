// src/components/buttons/SubmitQuizButton.tsx
import type { ReactNode } from "react";
import { Check } from "lucide-react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

type SubmitQuizButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  icon?: ReactNode;
  size?: ButtonSize;
  variant?: Variants;
  type?: ButtonType;
  className?: string;
};

export default function SubmitQuizButton(props: SubmitQuizButtonProps) {
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

  const finalLabel = label ?? "Submit Quiz";
  const finalIcon = icon ?? <Check size={16} />;
  const finalSize = size ?? "md";
  const finalVariant = variant ?? "blue";
  const finalType = type ?? "submit";

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
