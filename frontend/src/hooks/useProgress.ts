// src/hooks/useProgress.ts
import { use } from "react";

import { ProgressContext } from "@/context/ProgressContext";

export const useProgress = () => {
  const ctx = use(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
};
