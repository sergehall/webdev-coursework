import { Eye, Code2 } from "lucide-react";
import type { ReactNode } from "react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { Variants } from "@/components/buttons/types/variants";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";

type TogglePreviewButtonProps = {
  isPreviewShown: boolean;
  toggle: () => void;
  label?: string;
  icon?: ReactNode;
  iconSize?: number;
  size?: ButtonSize;
  type?: ButtonType;
  variant?: Variants;
  disabled?: boolean;
  className?: string;
};

const TogglePreviewButton = ({
  isPreviewShown,
  toggle,
  label,
  icon,
  iconSize = 16,
  size = "sm",
  type = "button",
  variant = "blue",
  disabled = false,
  className = "",
}: TogglePreviewButtonProps) => {
  const defaultLabel = isPreviewShown ? "Show Code" : "Show Preview";
  const finalLabel = label ?? defaultLabel;
  const finalIcon =
    icon ??
    (isPreviewShown ? <Code2 size={iconSize} /> : <Eye size={iconSize} />);

  const colorClass = ColoredButton({ variant, className });

  return (
    <BaseButton
      onClick={toggle}
      icon={finalIcon}
      size={size}
      type={type}
      disabled={disabled}
      className={colorClass}
      title={finalLabel}
      aria-label={finalLabel}
    >
      {finalLabel}
    </BaseButton>
  );
};

export default TogglePreviewButton;
