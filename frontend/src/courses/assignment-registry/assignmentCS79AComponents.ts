import { createAssignmentRegistry } from "./createAssignmentRegistry";

const loadPlaceholder = () =>
  import("@/courses/CS79A/assignments/AssignmentPlaceholder");

const assignmentCS79AComponents = createAssignmentRegistry(
  {
    "1": () => import("@/courses/CS79A/assignments/mod1/AssignmentMod1"),
    "2": () => import("@/courses/CS79A/assignments/mod2/AssignmentMod2"),
    "3": () => import("@/courses/CS79A/assignments/mod3/AssignmentMod3"),
    "4": () => import("@/courses/CS79A/assignments/mod4/AssignmentMod4"),
    "5": () => import("@/courses/CS79A/assignments/mod5/AssignmentMod5"),
    "6": () => import("@/courses/CS79A/assignments/mod6/AssignmentMod6"),
    "7": () => import("@/courses/CS79A/assignments/mod7/AssignmentMod7"),
    "8": () => import("@/courses/CS79A/assignments/mod8/AssignmentMod8"),
  },
  loadPlaceholder
);

export default assignmentCS79AComponents;
