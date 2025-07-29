import { Suspense } from "react";
import { useParams } from "react-router-dom";

import assignmentComponents from "@/data/assignmentComponentMap";
import { useCompletedModules } from "@/hooks/useCompletedModules";

export default function AutoAssignmentRouter() {
  const { id } = useParams();
  const { completedModules } = useCompletedModules();

  // Check if the module ID is valid and exists in the assignment map
  if (!id || !assignmentComponents[id]) {
    return <div className="p-6 text-red-600">Module not found</div>;
  }

  const modNumber = parseInt(id, 10);

  // Module 1 is always unlocked; others are unlocked only if the previous one is completed
  const isUnlocked =
    modNumber === 1 || completedModules.includes(modNumber - 1);

  const Component = isUnlocked
    ? assignmentComponents[id].main
    : assignmentComponents[id].placeholder;

  return (
    <Suspense fallback={<div className="p-6">Loading module...</div>}>
      <Component />
    </Suspense>
  );
}
