// src/data/assignmentComponents.ts
import React from "react";

import assignmentCS60Components from "@/courses/assignment-registry/assignmentCS60Components";
import assignmentCS70Components from "@/courses/assignment-registry/assignmentCS70Components";
import assignmentCS80Components from "@/courses/assignment-registry/assignmentCS80Components";
import assignmentCS81Components from "@/courses/assignment-registry/assignmentCS81Components";
import assignmentCS87AComponents from "@/courses/assignment-registry/assignmentCS87AComponents";
import type { CourseCode } from "@/data/types/CourseCode";

type AssignmentEntry = {
  main: React.LazyExoticComponent<React.FC>;
  placeholder: React.LazyExoticComponent<React.FC>;
};

export function assignmentComponents(
  id: string,
  code: CourseCode
): AssignmentEntry | undefined {
  switch (code) {
    case "CS 60":
      return assignmentCS60Components[id];
    case "CS 70":
      return assignmentCS70Components[id];
    case "CS 81":
      return assignmentCS81Components[id];
    case "CS 80":
      return assignmentCS80Components[id];
    case "CS 87A":
      return assignmentCS87AComponents[id];
    default:
      console.warn(`Unsupported course code: ${code}`);
      return undefined;
  }
}
