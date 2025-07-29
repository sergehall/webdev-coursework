import { use } from "react";

import CircularProgress from "./CircularProgress";
import ProgressBar from "./ProgressBar";

import { ProgressContext } from "@/context/ProgressContext";

export default function ModuleStatus() {
  const context = use(ProgressContext);

  if (!context) return null;

  const { completedModules, maxModules } = context;

  return (
    <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <CircularProgress value={completedModules.length} max={maxModules} />
      <ProgressBar value={completedModules.length} max={maxModules} />
    </div>
  );
}
