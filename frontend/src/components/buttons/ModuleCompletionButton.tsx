import type { ReactNode } from "react";
import { CheckCircle, XCircle } from "lucide-react";

import { useCompletedModules } from "@/hooks/useCompletedModules";
import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

interface ModuleCompletionButtonProps {
  moduleId: number;
  size?: ButtonSize;
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  variant?: Variants;
}

export default function ModuleCompletionButton({
  moduleId,
  size = "md",
  type = "button",
  className = "",
  disabled = false,
}: ModuleCompletionButtonProps) {
  const { completedModules, markAsCompleted, unmarkAsCompleted } =
    useCompletedModules();

  const isCompleted = completedModules.includes(moduleId);

  const handleClick = () =>
    isCompleted ? unmarkAsCompleted(moduleId) : markAsCompleted(moduleId);

  const variant: Variants = isCompleted ? "red" : "emerald";
  const label = isCompleted
    ? `Cancel module ${moduleId}`
    : `Complete module ${moduleId}`;
  const icon = isCompleted ? <XCircle size={16} /> : <CheckCircle size={16} />;

  const buttonClass = ColoredButton({
    variant,
    className: `px-6 py-2 font-semibold ${className}`,
  });

  return (
    <div className="mb-6 flex justify-center">
      <BaseButton
        onClick={handleClick}
        icon={icon}
        size={size}
        type={type}
        disabled={disabled}
        className={buttonClass}
        title={label}
        aria-label={label}
      >
        {label}
      </BaseButton>
    </div>
  );
}
