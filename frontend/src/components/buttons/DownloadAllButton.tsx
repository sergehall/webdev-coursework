// src/components/buttons/DownloadAllButton.tsx
import { Download as DownloadIcon } from "lucide-react";
import type { ReactNode } from "react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { Variants } from "@/components/buttons/types/variants";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";

type DownloadAllButtonProps = {
  onClick: () => void;
  label?: string;
  icon?: ReactNode;
  size?: ButtonSize;
  type?: ButtonType;
  variant?: Variants;
  className?: string;
};

export default function DownloadAllButton({
  onClick,
  label = "Download All Files",
  icon,
  size = "sm",
  type = "button",
  variant = "green",
  className = "",
}: DownloadAllButtonProps) {
  const finalIcon = icon ?? <DownloadIcon size={16} />;

  const colorClass = ColoredButton({ variant, className });

  return (
    <BaseButton
      onClick={onClick}
      icon={finalIcon}
      size={size}
      type={type}
      className={`${colorClass} bg-gradient-to-r from-green-700 to-purple-600 text-white hover:from-green-800 hover:to-purple-700 dark:from-green-800 dark:to-purple-700 dark:hover:from-green-700 dark:hover:to-purple-600`}
      title={label}
      aria-label={label}
    >
      {label}
    </BaseButton>
  );
}
