import React from "react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

type Props = {
  onClick: () => void;
  label?: string;
  icon?: React.ReactNode;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  variant?: Variants;
  className?: string;
};

const OpenCodeModalButton = ({
  onClick,
  label = "Show Code",
  icon,
  size = "sm",
  type = "button",
  disabled = false,
  variant = "slate",
  className = "",
}: Props) => {
  const colorClass = ColoredButton({ variant, className });

  return (
    <BaseButton
      onClick={onClick}
      icon={icon}
      size={size}
      type={type}
      disabled={disabled}
      className={colorClass}
      title={label}
      aria-label={label}
    >
      {label}
    </BaseButton>
  );
};

export default OpenCodeModalButton;
