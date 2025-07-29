import { Check } from "lucide-react";
import type { ReactNode } from "react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

type SubmitButtonProps = {
  loading: boolean;
  submitted: boolean;
  label?: string;
  icon?: ReactNode;
  className?: string;
  variant?: Variants;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
};

export default function SubmitButton({
  loading,
  submitted,
  label,
  icon,
  className = "",
  variant,
  size = "sm",
  type = "submit",
  disabled,
}: SubmitButtonProps) {
  const autoLabel = loading
    ? "Submitting..."
    : submitted
      ? "Submitted!"
      : "Submit";

  const resolvedLabel = label ?? autoLabel;
  const resolvedVariant = variant ?? (loading ? "gray" : "blue");
  const isDisabled = disabled ?? loading;
  const finalIcon = icon ?? <Check size={16} />;

  const combinedClassName = ColoredButton({
    variant: resolvedVariant,
    className: `px-5 py-2 rounded shadow ${loading ? "cursor-not-allowed" : ""} ${className}`,
  });

  return (
    <BaseButton
      type={type}
      size={size}
      icon={finalIcon}
      disabled={isDisabled}
      className={combinedClassName}
      title={resolvedLabel}
      aria-label={resolvedLabel}
    >
      {resolvedLabel}
    </BaseButton>
  );
}
