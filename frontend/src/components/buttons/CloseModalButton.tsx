// src/components/buttons/CloseModalButton.tsx
import { X } from "lucide-react";
import type { ReactNode } from "react";

import type { Variants } from "./types/variants";

import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import { BaseButton, ColoredButton } from "@/components/buttons";

type CloseModalButtonProps = {
  onClick: () => void;
  className?: string;
  variant?: Variants;
  label?: string;
  icon?: ReactNode;
  iconSize?: number;
  size?: ButtonSize;
  type?: ButtonType;
};

const CloseModalButton = ({
  onClick,
  className = "",
  variant = "lightBrown",
  label = "Close",
  icon,
  iconSize = 20,
  size = "sm",
  type = "button",
}: CloseModalButtonProps) => {
  const baseClassName =
    "absolute top-3 right-3 w-10 h-10 p-0 rounded flex items-center justify-center";

  const combinedClassName = ColoredButton({
    variant,
    className: `${baseClassName} ${className}`.trim(),
  });

  const finalIcon = icon ?? <X size={iconSize} />;

  return (
    <BaseButton
      onClick={onClick}
      icon={finalIcon}
      size={size}
      type={type}
      className={combinedClassName}
      title={label}
      aria-label={label}
    />
  );
};

export default CloseModalButton;
