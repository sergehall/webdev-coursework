// frontend/src/courses/assignment-registry/assignmentCS79AComponents.ts
import React, { lazy } from "react";

const assignmentCS79AComponents: Record<
  string,
  {
    main: React.LazyExoticComponent<React.FC>;
    placeholder: React.LazyExoticComponent<React.FC>;
    prefetchMain: () => Promise<{ default: React.FC }>;
    prefetchPlaceholder: () => Promise<{ default: React.FC }>;
  }
> = {
  "1": {
    main: lazy(() => import("@/courses/CS79A/assignments/mod1/AssignmentMod1")),
    placeholder: lazy(
      () => import("@/courses/CS79A/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS79A/assignments/mod1/AssignmentMod1"),
    prefetchPlaceholder: () =>
      import("@/courses/CS79A/assignments/AssignmentPlaceholder"),
  },
  "2": {
    main: lazy(() => import("@/courses/CS79A/assignments/mod2/AssignmentMod2")),
    placeholder: lazy(
      () => import("@/courses/CS79A/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS79A/assignments/mod2/AssignmentMod2"),
    prefetchPlaceholder: () =>
      import("@/courses/CS79A/assignments/AssignmentPlaceholder"),
  },
  "3": {
    main: lazy(() => import("@/courses/CS79A/assignments/mod3/AssignmentMod3")),
    placeholder: lazy(
      () => import("@/courses/CS79A/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS79A/assignments/mod3/AssignmentMod3"),
    prefetchPlaceholder: () =>
      import("@/courses/CS79A/assignments/AssignmentPlaceholder"),
  },
  "4": {
    main: lazy(() => import("@/courses/CS79A/assignments/mod4/AssignmentMod4")),
    placeholder: lazy(
      () => import("@/courses/CS79A/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS79A/assignments/mod4/AssignmentMod4"),
    prefetchPlaceholder: () =>
      import("@/courses/CS79A/assignments/AssignmentPlaceholder"),
  },
  "5": {
    main: lazy(() => import("@/courses/CS79A/assignments/mod5/AssignmentMod5")),
    placeholder: lazy(
      () => import("@/courses/CS79A/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS79A/assignments/mod5/AssignmentMod5"),
    prefetchPlaceholder: () =>
      import("@/courses/CS79A/assignments/AssignmentPlaceholder"),
  },
  "6": {
    main: lazy(() => import("@/courses/CS79A/assignments/mod6/AssignmentMod6")),
    placeholder: lazy(
      () => import("@/courses/CS79A/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS79A/assignments/mod6/AssignmentMod6"),
    prefetchPlaceholder: () =>
      import("@/courses/CS79A/assignments/AssignmentPlaceholder"),
  },
  "7": {
    main: lazy(() => import("@/courses/CS79A/assignments/mod7/AssignmentMod7")),
    placeholder: lazy(
      () => import("@/courses/CS79A/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS79A/assignments/mod7/AssignmentMod7"),
    prefetchPlaceholder: () =>
      import("@/courses/CS79A/assignments/AssignmentPlaceholder"),
  },
  "8": {
    main: lazy(() => import("@/courses/CS79A/assignments/mod8/AssignmentMod8")),
    placeholder: lazy(
      () => import("@/courses/CS79A/assignments/AssignmentPlaceholder")
    ),
    prefetchMain: () =>
      import("@/courses/CS79A/assignments/mod8/AssignmentMod8"),
    prefetchPlaceholder: () =>
      import("@/courses/CS79A/assignments/AssignmentPlaceholder"),
  },
};

export default assignmentCS79AComponents;
