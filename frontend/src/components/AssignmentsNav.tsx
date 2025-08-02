import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { CheckCircle, Circle } from "lucide-react";

import type { CourseCode } from "@/data/types/CourseCode";
import { courseCodes } from "@/data/courseCodes";
import { useCompletedModules } from "@/hooks/useCompletedModules";
import { prefetchAssignmentModule } from "@/utils/prefetchAssignment";

interface AssignmentNavProps {
  totalModules: number; // Total number of modules, e.g. 12
}

const AssignmentNav: React.FC<AssignmentNavProps> = ({ totalModules }) => {
  const { completedModules } = useCompletedModules();
  const { code } = useParams();
  if (!code || !courseCodes.includes(code.toUpperCase())) return null;
  // Generate an array like [1, 2, 3, ..., totalModules]
  const modules = Array.from({ length: totalModules }, (_, i) => i + 1);

  return (
    <nav className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
      {modules.map((mod) => {
        const isCompleted = completedModules.includes(mod);
        const isUnlocked = mod === 1 || completedModules.includes(mod - 1);
        const modId = mod.toString();

        return (
          <NavLink
            key={mod}
            to={`/coursework/${code}/assignment/${modId}`}
            onMouseEnter={() =>
              prefetchAssignmentModule(modId, isUnlocked, code as CourseCode)
            }
            className={({ isActive }) =>
              `rounded-xl border border-gray-200 p-4 text-center font-semibold shadow transition-all dark:border-gray-700 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 hover:bg-blue-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              }`
            }
          >
            <div className="flex flex-col items-center space-y-1">
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
              <span>Mod {mod}</span>
            </div>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default AssignmentNav;
