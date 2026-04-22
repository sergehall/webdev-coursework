import { createAssignmentRegistry } from "./createAssignmentRegistry";

const loadPlaceholder = () =>
  import("@/courses/CS79D/assignments/AssignmentPlaceholder");

const assignmentCS79DComponents = createAssignmentRegistry(
  {
    "1": () => import("@/courses/CS79D/assignments/mod1/AssignmentMod1"),
    "2": () => import("@/courses/CS79D/assignments/AssignmentPlaceholder"),
    "3": () => import("@/courses/CS79D/assignments/AssignmentPlaceholder"),
    "4": () => import("@/courses/CS79D/assignments/AssignmentPlaceholder"),
    "5": () => import("@/courses/CS79D/assignments/AssignmentPlaceholder"),
    "6": () => import("@/courses/CS79D/assignments/AssignmentPlaceholder"),
    "7": () => import("@/courses/CS79D/assignments/AssignmentPlaceholder"),
    "8": () => import("@/courses/CS79D/assignments/AssignmentPlaceholder"),
  },
  loadPlaceholder
);

export default assignmentCS79DComponents;
