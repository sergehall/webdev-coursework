import { NavLink, useParams } from "react-router-dom";
import { CheckCircle, Circle } from "lucide-react";

import { useCompletedModules } from "@/hooks/useCompletedModules";
import { prefetchAssignmentModule } from "@/utils/prefetchAssignment";

const modules = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function AssignmentNav() {
  const { completedModules } = useCompletedModules();
  const { code } = useParams();

  if (!code) return null;

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
            // Prefetch the module on hover for faster perceived load time
            onMouseEnter={() => prefetchAssignmentModule(modId, isUnlocked)}
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
}
