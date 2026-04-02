import { createAssignmentRegistry } from "./createAssignmentRegistry";

const loadPlaceholder = () =>
  import("@/courses/CS70/assignments/AssignmentPlaceholder");

const assignmentCS70Components = createAssignmentRegistry(
  {
    "1": () => import("@/courses/CS70/assignments/mod1/AssignmentMod1"),
    "2": () => import("@/courses/CS70/assignments/mod2/AssignmentMod2"),
    "3": () => import("@/courses/CS70/assignments/mod3/AssignmentMod3"),
    "4": () => import("@/courses/CS70/assignments/mod4/AssignmentMod4"),
    "5": () => import("@/courses/CS70/assignments/mod5/AssignmentMod5"),
    "6": () => import("@/courses/CS70/assignments/mod6/AssignmentMod6"),
    "7": () => import("@/courses/CS70/assignments/mod7/AssignmentMod7"),
    "8": () => import("@/courses/CS70/assignments/mod8/AssignmentMod8"),
    "9": () => import("@/courses/CS70/assignments/mod9/AssignmentMod9"),
    "10": () => import("@/courses/CS70/assignments/mod10/AssignmentMod10"),
    "11": () => import("@/courses/CS70/assignments/mod11/AssignmentMod11"),
    "12": () => import("@/courses/CS70/assignments/mod12/AssignmentMod12"),
    "13": () => import("@/courses/CS70/assignments/mod13/AssignmentMod13"),
    "14": () => import("@/courses/CS70/assignments/mod14/AssignmentMod14"),
    "15": () => import("@/courses/CS70/assignments/mod15/AssignmentMod15"),
    "16": () => import("@/courses/CS70/assignments/mod16/AssignmentMod16"),
  },
  loadPlaceholder
);

export default assignmentCS70Components;
