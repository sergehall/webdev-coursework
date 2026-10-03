import type React from "react";
import { useState } from "react";

type Options = {
  showSuccessBar?: boolean;
  successDuration?: number;
  onSuccess?: () => void;
  simulateRequest?: boolean;
  delayMs?: number;
};

export function useFormSubmitHandler(options?: Options) {
  const {
    showSuccessBar = true,
    successDuration = 3000,
    simulateRequest = false,
    delayMs = 1000,
    onSuccess,
  } = options || {};

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit =
    (callback?: () => void) => async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setLoading(true);

      if (simulateRequest) {
        await new Promise((res) => setTimeout(res, delayMs));
      }

      callback?.();
      onSuccess?.();

      setLoading(false);

      if (showSuccessBar) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), successDuration);
      }
    };

  return { handleSubmit, submitted, loading };
}
