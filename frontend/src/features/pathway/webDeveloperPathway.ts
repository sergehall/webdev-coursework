import {
  area1ACourses,
  type GeneralEducationCourse,
} from "./generalEducationCourses";

import {
  courses,
  isBaseCourse,
  type Course,
} from "@/courses/catalog/webDeveloperCourses";
import type { TagIconLabel } from "@/components/tags";

export const programSource =
  "https://www.smc.edu/academics/classes/program.php?id=52";
export const degreeSource =
  "https://catalog.smc.edu/current/local-associate-degree/";
export const pathwayReviewedAt = "October 8, 2026";

export type PathwayEntry = {
  id: string;
  title: string;
  units: string;
  course?: Course;
  tags: TagIconLabel[];
  note?: string;
  href?: string;
  options?: GeneralEducationCourse[];
};

const courseEntry = (id: string, note?: string): PathwayEntry => {
  const course = courses.find((item) =>
    isBaseCourse(item) ? item.code === id : item.title === id
  );
  if (!course) throw new Error(`Missing pathway course: ${id}`);
  return {
    id,
    title: course.title,
    units: String(course.units),
    course,
    tags: course.tags as TagIconLabel[],
    note,
  };
};

const generalEducation = (
  area: string,
  title: string,
  programId: number,
  intersession = false,
  note?: string
): PathwayEntry => ({
  id: `ge-${area}`,
  title: `SMC GE Area ${area}: ${title}`,
  units: "3",
  tags: [
    "General Education",
    ...(intersession ? ["Appropriate for Intersession" as const] : []),
  ],
  href: `https://www.smc.edu/academics/classes/program.php?id=${programId}`,
  options: area === "1A" ? area1ACourses : undefined,
  note: note ?? "Choose one approved course from the official SMC list.",
});

const elective = (
  semester: number,
  units = "3",
  note?: string
): PathwayEntry => ({
  id: `elective-${semester}`,
  title: "Elective Course",
  units,
  tags: semester === 3 ? ["Appropriate for Intersession"] : [],
  href: degreeSource,
  note:
    note ??
    "Choose degree-applicable elective units with a counselor to reach at least 60 semester units.",
});

export const pathwaySemesters = [
  {
    number: 1,
    units: "15–17",
    entries: [
      courseEntry(
        "CS 3",
        "Take in the intersession before Semester 1 if needed as advisory preparation for other CS courses. CS 3 is also a prerequisite for CS 79A."
      ),
      courseEntry("CS 70"),
      elective(
        1,
        "3–5",
        "Cal-GETC Area 2 (Math) is recommended for transfer options. For the local degree, approved major courses such as CS 80, CS 81, and CS 87A can satisfy SMC GE Area 2; confirm your GE pattern with a counselor."
      ),
      generalEducation("1A", "English Composition", 414),
      courseEntry("COUNS 20"),
    ],
  },
  {
    number: 2,
    units: "15",
    entries: [
      courseEntry("CS 60"),
      courseEntry("CS 87A"),
      courseEntry("One Server Programming Course"),
      courseEntry("CS 80"),
      generalEducation(
        "3",
        "Arts and Humanities",
        413,
        true,
        "ENGL C1001 (formerly ENGL 2) is recommended for transfer options. Choose from the official list; a course with the Global Citizenship designation can also meet that graduation requirement."
      ),
    ],
  },
  {
    number: 3,
    units: "15",
    entries: [
      courseEntry("One Security Course"),
      courseEntry("CS 81"),
      courseEntry("CS 79A"),
      generalEducation(
        "1B",
        "Oral Communication & Critical Thinking",
        411,
        true,
        "COMM C1000 (formerly COM ST 11) or COM ST 21 is recommended for transfer options. A course listed in multiple GE areas cannot be used to satisfy more than one GE area."
      ),
      elective(3),
    ],
  },
  {
    number: 4,
    units: "15",
    entries: [
      courseEntry("One Cloud Skills Course"),
      generalEducation("4", "Social and Behavioral Sciences", 412, true),
      generalEducation("5", "Natural Sciences", 410),
      generalEducation("6", "Ethnic Studies", 416, true),
      elective(4),
    ],
  },
];

export const certificateEntries = pathwaySemesters.flatMap((semester) =>
  semester.entries.filter((entry) => entry.tags.includes("Program Requirement"))
);
