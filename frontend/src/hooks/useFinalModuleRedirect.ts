// src/hooks/useFinalModuleRedirect.ts
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useProgress } from "./useProgress";

export function useFinalModuleRedirect(moduleId: number) {
  const { completedModules, maxModules } = useProgress();
  const { code } = useParams();
  const navigate = useNavigate();

  // Build default redirect path if not provided
  const finalRedirect = `/coursework/${code}/assignment/completed`;

  useEffect(() => {
    const allModules = Array.from({ length: maxModules }, (_, i) => i + 1);

    const hasCompletedAll = allModules.every((mod) =>
      completedModules.includes(mod)
    );

    if (hasCompletedAll && completedModules.includes(moduleId)) {
      void navigate(finalRedirect);
    }
  }, [completedModules, moduleId, maxModules, navigate, finalRedirect]);
}
