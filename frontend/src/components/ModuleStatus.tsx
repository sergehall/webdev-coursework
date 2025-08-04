"use client";

import { use } from "react";

import CircularProgress from "./CircularProgress";
import ProgressBar from "./ProgressBar";

import { ProgressContext } from "@/context/ProgressContext";

export default function ModuleStatus() {
  const context = use(ProgressContext);
  if (!context) return null;

  const { completedModules, maxModules } = context;

  return (
    <div className="mb-6 flex w-full flex-nowrap items-center gap-4 overflow-x-auto sm:gap-6">
      <div className="relative h-24 w-24 shrink-0">
        <CircularProgress value={completedModules.length} max={maxModules} />
      </div>

      <div className="min-w-0 flex-1">
        <ProgressBar value={completedModules.length} max={maxModules} />
      </div>
    </div>
  );
}
