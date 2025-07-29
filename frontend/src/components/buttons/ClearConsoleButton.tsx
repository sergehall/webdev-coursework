import type { ReactNode } from "react";
import { Trash } from "lucide-react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

type ClearConsoleButtonProps = {
  onClear: () => void;
  disabled?: boolean;
  label?: string;
  icon?: ReactNode;
  size?: ButtonSize;
  variant?: Variants;
  type?: ButtonType;
  className?: string;
};

export default function ClearConsoleButton({
  onClear,
  disabled = false,
  label,
  icon,
  size,
  variant,
  type,
  className = "",
}: ClearConsoleButtonProps) {
  const finalLabel = label ?? "Clear Console";
  const finalIcon = icon ?? <Trash size={16} />;
  const finalSize = size ?? "sm";
  const finalVariant = variant ?? "neutral";
  const finalType = type ?? "button";

  const buttonClass = ColoredButton({
    variant: finalVariant,
    className,
  });

  return (
    <BaseButton
      onClick={onClear}
      disabled={disabled}
      icon={finalIcon}
      size={finalSize}
      type={finalType}
      className={buttonClass}
      title={finalLabel}
      aria-label={finalLabel}
    >
      {finalLabel}
    </BaseButton>
  );
}
