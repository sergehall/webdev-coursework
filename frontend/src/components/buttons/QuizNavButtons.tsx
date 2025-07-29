// src/components/buttons/QuizNavButtons.tsx
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

interface NavButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  icon: React.ReactNode;
  size?: ButtonSize;
  variant?: Variants;
  type?: ButtonType;
  className?: string;
}

const NavButton = ({
  onClick,
  disabled = false,
  label,
  icon,
  size = "sm",
  variant = "gray",
  type = "button",
  className = "",
}: NavButtonProps) => {
  const buttonClass = ColoredButton({ variant, className });

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
};

export const PreviousButton = ({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) => (
  <NavButton
    onClick={onClick}
    disabled={disabled}
    label="Previous"
    icon={<ArrowLeft size={16} />}
    variant="gray"
  />
);

export const NextButton = ({ onClick }: { onClick: () => void }) => (
  <NavButton
    onClick={onClick}
    label="Next"
    icon={<ArrowRight size={16} />}
    variant="blue"
  />
);
