import { describe, expect, it } from "vitest";

import {
  featuredHomeProjects,
  homeCourses,
  homeStats,
} from "@/features/home/home-content";

describe("home content model", () => {
  it("derives stable portfolio metrics from the source catalogs", () => {
    expect(homeCourses).toHaveLength(10);
    expect(homeStats.map(({ value }) => value)).toEqual([
      "10",
      "103",
      "128",
      "8",
    ]);
  });

  it("maps every course to a unique assignment route", () => {
    const assignmentPaths = homeCourses.map(
      ({ assignmentPath }) => assignmentPath
    );

    expect(new Set(assignmentPaths).size).toBe(homeCourses.length);
    expect(assignmentPaths).toContain("/coursework/CS85/assignment");
    expect(assignmentPaths).toContain("/coursework/CS79D/assignment");
  });

  it("keeps the featured project progression explicit", () => {
    expect(featuredHomeProjects.map(({ id }) => id)).toEqual([
      "aws-learning-portal",
      "sergioartg",
      "lens-lounge",
    ]);
  });
});
