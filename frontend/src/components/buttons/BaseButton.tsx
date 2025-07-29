// src/components/buttons/BaseButton.tsx
import { type ReactNode, type HTMLAttributes } from "react";
import clsx from "clsx";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonType = "button" | "submit" | "reset";

export interface BaseButtonProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  as?: "button" | "a";
  href?: string;
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-5 py-3",
};

export default function BaseButton({
  children,
  size = "md",
  icon,
  iconPosition = "left",
  className = "",
  as = "button",
  href,
  disabled = false,
  ...props
}: BaseButtonProps) {
  const composed = clsx(
    "inline-flex items-center gap-2 rounded transition font-medium shadow disabled:opacity-50",
    sizeClasses[size],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </>
  );

  if (as === "a" && href) {
    return (
      <a href={href} className={composed} aria-disabled={disabled} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" disabled={disabled} className={composed} {...props}>
      {content}
    </button>
  );
}
