import React, { useCallback, useEffect, useMemo, useState } from "react";

import { ProgressContext } from "./ProgressContext";

import { QUIZ_APP_CONFIG } from "@/api/config/quiz-app";
import {
  fetchProgress,
  markModuleCompleted,
  unmarkModuleCompleted,
} from "@/api/quiz-progress";
import { useClientId } from "@/hooks/useClientId";

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const clientId = useClientId();
  const appId = QUIZ_APP_CONFIG.appId;
  const maxModules = QUIZ_APP_CONFIG.maxModules;

  const [completedModules, setCompletedModules] = useState<number[]>([]);

  useEffect(() => {
    if (!clientId) return;

    const load = async () => {
      try {
        const data = await fetchProgress(clientId);
        setCompletedModules(data);
      } catch (err) {
        console.error("Failed to fetch progress:", err);
      }
    };
    load();
  }, [clientId]);

  const markAsCompleted = useCallback(
    async (mod: number) => {
      if (!clientId || completedModules.includes(mod)) return;
      setCompletedModules((prev) => [...prev, mod]);
      await markModuleCompleted({ clientId, appId, moduleNumber: mod });
    },
    [clientId, completedModules, appId]
  );

  const unmarkAsCompleted = useCallback(
    async (mod: number) => {
      if (!clientId) return;
      setCompletedModules((prev) => prev.filter((m) => m !== mod));
      await unmarkModuleCompleted({ clientId, appId, moduleNumber: mod });
    },
    [clientId, appId]
  );

  const value = useMemo(
    () => ({
      completedModules,
      markAsCompleted,
      unmarkAsCompleted,
      maxModules,
    }),
    [completedModules, markAsCompleted, unmarkAsCompleted, maxModules]
  );

  // Conditional return — only within JSX, hook order is not violated
  if (!clientId) return <>{children}</>;

  return <ProgressContext value={value}>{children}</ProgressContext>;
};

export default ProgressProvider;
