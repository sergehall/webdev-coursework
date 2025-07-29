import { Eye, X } from "lucide-react";
import type { ReactNode } from "react";

import type { Variants } from "./types/variants";

import { BaseButton, ColoredButton } from "@/components/buttons/index";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";

type ToggleModalButtonProps = {
  isOpen: boolean;
  toggle: () => void;
  className?: string;
  variant?: Variants;
  label?: string;
  icon?: ReactNode;
  iconSize?: number;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
};

const ToggleModalButton = ({
  isOpen,
  toggle,
  className = "",
  variant = "brown",
  label,
  icon,
  iconSize = 16,
  size = "sm",
  type = "button",
  disabled = false,
}: ToggleModalButtonProps) => {
  const finalIcon =
    icon ?? (isOpen ? <X size={iconSize} /> : <Eye size={iconSize} />);
  const finalLabel = label ?? (isOpen ? "Close modal" : "Open modal");

  const colorClass = ColoredButton({ variant, className });

  return (
    <BaseButton
      onClick={toggle}
      icon={finalIcon}
      size={size}
      type={type}
      disabled={disabled}
      className={colorClass}
      aria-label={finalLabel}
      title={finalLabel}
    >
      {finalLabel}
    </BaseButton>
  );
};

export default ToggleModalButton;
