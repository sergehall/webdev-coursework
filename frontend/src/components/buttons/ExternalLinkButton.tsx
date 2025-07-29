import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { Variants } from "@/components/buttons/types/variants";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";

type ExternalLinkButtonProps = {
  href: string;
  label?: string;
  icon?: ReactNode;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  variant?: Variants;
  className?: string;
};

export default function ExternalLinkButton({
  href,
  label = "View Repository",
  icon,
  size = "sm",
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
}: ExternalLinkButtonProps) {
  const handleClick = () => {
    if (!disabled) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const finalIcon = icon ?? <ExternalLink size={16} />;

  const colorClass = ColoredButton({ variant, className });

  return (
    <BaseButton
      onClick={handleClick}
      disabled={disabled}
      icon={finalIcon}
      size={size}
      type={type}
      className={colorClass}
      title={label}
      aria-label={label}
    >
      {label}
    </BaseButton>
  );
}
