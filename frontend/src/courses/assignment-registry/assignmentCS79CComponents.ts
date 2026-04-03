import { createAssignmentRegistry } from "./createAssignmentRegistry";

const loadPlaceholder = () =>
  import("@/courses/CS79C/assignments/AssignmentPlaceholder");

const assignmentCS79CComponents = createAssignmentRegistry(
  {
    "1": () => import("@/courses/CS79C/assignments/mod1/AssignmentMod1"),
    "2": () => import("@/courses/CS79C/assignments/mod2/AssignmentMod2"),
    "3": () => import("@/courses/CS79C/assignments/mod3/AssignmentMod3"),
    "4": () => import("@/courses/CS79C/assignments/mod4/AssignmentMod4"),
    "5": () => import("@/courses/CS79C/assignments/mod5/AssignmentMod5"),
    "6": () => import("@/courses/CS79C/assignments/mod6/AssignmentMod6"),
    "7": () => import("@/courses/CS79C/assignments/mod7/AssignmentMod7"),
    "8": () => import("@/courses/CS79C/assignments/mod8/AssignmentMod8"),
    "9": () => import("@/courses/CS79C/assignments/mod9/AssignmentMod9"),
    "10": () => import("@/courses/CS79C/assignments/mod10/AssignmentMod10"),
  },
  loadPlaceholder
);

export default assignmentCS79CComponents;
