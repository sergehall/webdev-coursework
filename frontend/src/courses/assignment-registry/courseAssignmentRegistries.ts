import assignmentCS60Components from "@/courses/assignment-registry/assignmentCS60Components";
import assignmentCS70Components from "@/courses/assignment-registry/assignmentCS70Components";
import assignmentCS79AComponents from "@/courses/assignment-registry/assignmentCS79AComponents";
import assignmentCS80Components from "@/courses/assignment-registry/assignmentCS80Components";
import assignmentCS81Components from "@/courses/assignment-registry/assignmentCS81Components";
import assignmentCS87AComponents from "@/courses/assignment-registry/assignmentCS87AComponents";
import type { AssignmentRegistry } from "@/courses/assignment-registry/types";
import type { CourseCode } from "@/data/types/CourseCode";

export const courseAssignmentRegistries: Partial<
  Record<CourseCode, AssignmentRegistry>
> = {
  "CS 60": assignmentCS60Components,
  "CS 70": assignmentCS70Components,
  "CS 79A": assignmentCS79AComponents,
  "CS 80": assignmentCS80Components,
  "CS 81": assignmentCS81Components,
  "CS 87A": assignmentCS87AComponents,
};

export function getAssignmentRegistry(
  code: CourseCode
): AssignmentRegistry | undefined {
  return courseAssignmentRegistries[code];
}
