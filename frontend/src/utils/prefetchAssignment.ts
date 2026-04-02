// frontend/src/utils/prefetchAssignment.ts

import { getAssignmentRegistry } from "@/courses/assignment-registry/courseAssignmentRegistries";
import type { CourseCode } from "@/data/types/CourseCode";

export function prefetchAssignmentModule(
  id: string,
  unlocked: boolean,
  code: CourseCode
) {
  const registry = getAssignmentRegistry(code);

  if (!registry) {
    console.warn(`Unsupported course code: ${code}`);
    return;
  }

  const entry = registry[id];
  if (!entry) return;

  if (unlocked) {
    entry.prefetchMain();
  } else {
    entry.prefetchPlaceholder();
  }
}
