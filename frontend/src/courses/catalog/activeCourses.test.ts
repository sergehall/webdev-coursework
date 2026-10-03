import { describe, expect, it } from "vitest";

import { activeCourseCodes, activeCourses } from "./activeCourses";

import { getAssignmentRegistry } from "@/courses/assignment-registry/courseAssignmentRegistries";
import { courses } from "@/data/webDeveloperCourses";
import { homeCourses } from "@/features/home/home-content";

describe("active course catalog", () => {
  it("keeps course routes, curriculum, and home metrics aligned", () => {
    const definitions = Object.entries(activeCourses);
    const curriculumCodes = courses.flatMap((course) =>
      "options" in course
        ? course.options.map((option) => option.code)
        : [course.code]
    );

    expect(definitions).toHaveLength(10);
    expect(new Set(activeCourseCodes).size).toBe(definitions.length);
    expect(
      definitions.reduce((sum, [, course]) => sum + course.maxModules, 0)
    ).toBe(103);

    for (const [id, course] of definitions) {
      expect(curriculumCodes).toContain(course.code);
      expect(homeCourses).toContainEqual(
        expect.objectContaining({
          id,
          code: course.code,
          moduleCount: course.maxModules,
          assignmentPath: `/coursework/${id}/assignment`,
        })
      );
    }
  });

  it("has one assignment entry for each advertised module", () => {
    for (const course of Object.values(activeCourses)) {
      const registry = getAssignmentRegistry(course.code);
      expect(Object.keys(registry ?? {})).toEqual(
        Array.from({ length: course.maxModules }, (_, index) =>
          String(index + 1)
        )
      );
    }
  });
});
