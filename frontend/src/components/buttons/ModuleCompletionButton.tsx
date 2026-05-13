import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CheckCircle, Loader2, XCircle } from "lucide-react";

import { useCompletedModules } from "@/hooks/useCompletedModules";
import { BaseButton, ColoredButton } from "@/components/buttons";
import type { ButtonSize, ButtonType } from "@/components/buttons/BaseButton";
import type { Variants } from "@/components/buttons/types/variants";

const ERROR_DISMISS_MS = 4_000;

type MutationError = {
  readonly message: string;
};

interface ModuleCompletionButtonProps {
  moduleId: number;
  size?: ButtonSize;
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
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

  const [isPending, setIsPending] = useState(false);
  const [mutationError, setMutationError] = useState<MutationError | null>(
    null
  );
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(false);
  const errorId = useId();

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      if (dismissTimerRef.current !== null) {
        clearTimeout(dismissTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mutationError) return;

    dismissTimerRef.current = setTimeout(() => {
      setMutationError(null);
    }, ERROR_DISMISS_MS);

    return () => {
      if (dismissTimerRef.current !== null) {
        clearTimeout(dismissTimerRef.current);
      }
    };
  }, [mutationError]);

  const isCompleted = completedModules.includes(moduleId);

  const handleClick = useCallback(async () => {
    if (disabled || isPending) return;
    setIsPending(true);
    setMutationError(null);
    try {
      if (isCompleted) {
        await unmarkAsCompleted(moduleId);
      } else {
        await markAsCompleted(moduleId);
      }
    } catch {
      if (isMountedRef.current) {
        setMutationError({
          message: "Could not save progress. Please try again.",
        });
      }
    } finally {
      if (isMountedRef.current) {
        setIsPending(false);
      }
    }
  }, [
    disabled,
    isPending,
    isCompleted,
    moduleId,
    markAsCompleted,
    unmarkAsCompleted,
  ]);

  const variant: Variants = isCompleted ? "red" : "emerald";

  const label = isPending
    ? "Saving…"
    : isCompleted
      ? `Cancel module ${moduleId}`
      : `Complete module ${moduleId}`;

  const icon = isPending ? (
    <Loader2 size={16} className="animate-spin" />
  ) : isCompleted ? (
    <XCircle size={16} />
  ) : (
    <CheckCircle size={16} />
  );

  const buttonClass = ColoredButton({
    variant,
    className: `px-6 py-2 font-semibold ${className}`,
  });

  return (
    <div className="mb-6 flex flex-col items-center gap-1">
      <BaseButton
        onClick={handleClick}
        icon={icon}
        size={size}
        type={type}
        disabled={disabled || isPending}
        className={buttonClass}
        title={label}
        aria-label={label}
        aria-busy={isPending}
        aria-describedby={mutationError ? errorId : undefined}
      >
        {label}
      </BaseButton>

      {mutationError && (
        <p id={errorId} role="alert" className="text-sm text-red-500">
          {mutationError.message}
        </p>
      )}
    </div>
  );
}
