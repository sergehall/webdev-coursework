import { useContext } from "react";

import { ProgressContext } from "@/context/ProgressContext";

export function useCompletedModules() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error("useCompletedModules must be used within ProgressProvider");
  }

  return context;
}
