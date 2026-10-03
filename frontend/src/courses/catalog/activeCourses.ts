import type { CourseCode } from "@/courses/catalog/CourseCode";

type ActiveCourseDefinition = {
  readonly code: CourseCode;
  readonly title: string;
  readonly assignmentTitle?: string;
  readonly appId: string;
  readonly maxModules: number;
  readonly client_id_key: "clientId";
};

// Technical course metadata lives here. Curriculum descriptions and module
// content remain owned by their respective pages and course directories.
export const activeCourses = {
  CS56: {
    code: "CS 56",
    title: "Advanced Java Programming",
    appId: "Advanced-Java-Programming",
    maxModules: 15,
    client_id_key: "clientId",
  },
  CS60: {
    code: "CS 60",
    title: "Database Concepts & Applications",
    assignmentTitle: "Database Concepts and Applications",
    appId: "Database-Concepts-Applications",
    maxModules: 10,
    client_id_key: "clientId",
  },
  CS70: {
    code: "CS 70",
    title: "Network Fundamentals and Architecture",
    appId: "Network-Fundamentals-and-Architecture",
    maxModules: 16,
    client_id_key: "clientId",
  },
  CS79A: {
    code: "CS 79A",
    title: "Introduction to Cloud Computing",
    appId: "Cloud-Computing-with-AWS",
    maxModules: 8,
    client_id_key: "clientId",
  },
  CS80: {
    code: "CS 80",
    title: "Internet Programming",
    appId: "Internet-Programming",
    maxModules: 6,
    client_id_key: "clientId",
  },
  CS81: {
    code: "CS 81",
    title: "JavaScript Programming",
    appId: "Javascript-Programming",
    maxModules: 12,
    client_id_key: "clientId",
  },
  CS85: {
    code: "CS 85",
    title: "PHP Programming",
    appId: "PHP-Programming",
    maxModules: 12,
    client_id_key: "clientId",
  },
  CS87A: {
    code: "CS 87A",
    title: "Python Programming",
    appId: "Python-Programming",
    maxModules: 6,
    client_id_key: "clientId",
  },
  CS79C: {
    code: "CS 79C",
    title: "Compute Engines in Amazon Web Services",
    appId: "Compute-Engines-in-Amazon-Web-Services",
    maxModules: 10,
    client_id_key: "clientId",
  },
  CS79D: {
    code: "CS 79D",
    title: "Security in Amazon Web Services",
    appId: "Security-in-Amazon-Web-Services",
    maxModules: 8,
    client_id_key: "clientId",
  },
} as const satisfies Record<string, ActiveCourseDefinition>;

export type ActiveCourseId = keyof typeof activeCourses;
export type ActiveCourseCode = (typeof activeCourses)[ActiveCourseId]["code"];

export const activeCourseCodes: readonly ActiveCourseCode[] = Object.values(
  activeCourses
).map(({ code }) => code);
