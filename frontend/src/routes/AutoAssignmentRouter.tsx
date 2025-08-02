// src/components/AutoAssignmentRouter.tsx

import { Suspense } from "react";
import { useParams } from "react-router-dom";

import { assignmentComponents } from "@/data/assignmentComponents";
import type { CourseCode } from "@/data/types/CourseCode";
import { useCompletedModules } from "@/hooks/useCompletedModules";

export default function AutoAssignmentRouter() {
  const { id, code } = useParams();
  const { completedModules } = useCompletedModules();

  if (!id || !code) {
    return <div className="p-6 text-red-600">Module not found</div>;
  }

  const components = assignmentComponents(id, code as CourseCode);
  if (!components) {
    return <div className="p-6 text-red-600">Module not found</div>;
  }

  const modNumber = parseInt(id, 10);
  const isUnlocked =
    modNumber === 1 || completedModules.includes(modNumber - 1);

  const Component = isUnlocked ? components.main : components.placeholder;

  return (
    <Suspense fallback={<div className="p-6">Loading module...</div>}>
      <Component />
    </Suspense>
  );
}
