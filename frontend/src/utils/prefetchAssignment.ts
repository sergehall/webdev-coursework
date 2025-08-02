// prefetchAssignment.ts

import assignmentCS80Components from "@/data/assignmentCS80Components";
import assignmentCS81Components from "@/data/assignmentCS81Components";
import type { CourseCode } from "@/data/types/CourseCode";

export function prefetchAssignmentModule(
  id: string,
  unlocked: boolean,
  code: CourseCode
) {
  let entry;

  switch (code) {
    case "CS81":
      entry = assignmentCS81Components[id];
      break;
    case "CS80":
      entry = assignmentCS80Components[id];
      break;
    default:
      console.warn(`Unsupported course code: ${code}`);
      return;
  }

  if (!entry) return;

  if (unlocked) {
    entry.prefetchMain();
  } else {
    entry.prefetchPlaceholder();
  }
}
