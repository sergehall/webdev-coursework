import type { ReactNode } from "react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

type LoadMoreButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
  icon?: ReactNode;
  size?: ButtonSize;
  variant?: Variants;
  type?: ButtonType;
  className?: string;
};

export default function LoadMoreButton({
  onClick,
  disabled = false,
  label = "Load More Courses",
  icon,
  size = "sm",
  variant = "emerald",
  type = "button",
  className = "",
}: LoadMoreButtonProps) {
  const buttonClass = ColoredButton({
    variant,
    className: `px-6 py-2 rounded-lg font-medium shadow ${className}`,
  });

  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      icon={icon}
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
