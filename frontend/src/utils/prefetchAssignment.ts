// frontend/src/utils/prefetchAssignment.ts

import assignmentCS60Components from "@/courses/assignment-registry/assignmentCS60Components";
import assignmentCS70Components from "@/courses/assignment-registry/assignmentCS70Components";
import assignmentCS79AComponents from "@/courses/assignment-registry/assignmentCS79AComponents";
import assignmentCS80Components from "@/courses/assignment-registry/assignmentCS80Components";
import assignmentCS81Components from "@/courses/assignment-registry/assignmentCS81Components";
import assignmentCS87AComponents from "@/courses/assignment-registry/assignmentCS87AComponents";
import type { CourseCode } from "@/data/types/CourseCode";

export function prefetchAssignmentModule(
  id: string,
  unlocked: boolean,
  code: CourseCode
) {
  let entry;

  switch (code) {
    case "CS 60":
      entry = assignmentCS60Components[id];
      break;
    case "CS 70":
      entry = assignmentCS70Components[id];
      break;
    case "CS 79A":
      entry = assignmentCS79AComponents[id];
      break;
    case "CS 81":
      entry = assignmentCS81Components[id];
      break;
    case "CS 80":
      entry = assignmentCS80Components[id];
      break;
    case "CS 87A":
      entry = assignmentCS87AComponents[id];
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
