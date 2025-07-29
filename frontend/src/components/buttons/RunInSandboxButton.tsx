import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import type { ReactNode } from "react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

type RunInSandboxButtonProps = {
  file: string;
  label?: string;
  icon?: ReactNode;
  className?: string;
  variant?: Variants;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
};

export default function RunInSandboxButton({
  file,
  label = "Run in Sandbox",
  icon,
  className = "",
  variant = "green",
  size = "sm",
  type = "button",
  disabled = false,
}: RunInSandboxButtonProps) {
  const navigate = useNavigate();

  const finalIcon = icon ?? <Play size={16} />;

  const handleClick = () => {
    if (!disabled) {
      void navigate(`/sandbox?file=${file}`);
    }
  };

  const colorClass = ColoredButton({
    variant,
    className,
  });

  return (
    <BaseButton
      onClick={handleClick}
      icon={finalIcon}
      className={colorClass}
      size={size}
      type={type}
      disabled={disabled}
      title={label}
      aria-label={label}
    >
      {label}
    </BaseButton>
  );
}
