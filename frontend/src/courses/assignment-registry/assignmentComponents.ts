import { getAssignmentRegistry } from "@/courses/assignment-registry/courseAssignmentRegistries";
import type { AssignmentRegistryEntry } from "@/courses/assignment-registry/types";
import type { CourseCode } from "@/data/types/CourseCode";

export function assignmentComponents(
  id: string,
  code: CourseCode
): AssignmentRegistryEntry | undefined {
  const registry = getAssignmentRegistry(code);

  if (!registry) {
    console.warn(`Unsupported course code: ${code}`);
    return undefined;
  }

  return registry[id];
}
