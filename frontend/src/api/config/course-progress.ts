// @/api/config/course-progress.ts
export const COURSE_PROGRESS_CONFIG = {
  CS60: {
    appId: "Database-Concepts-Applications",
    maxModules: 10,
    client_id_key: "clientId",
  },
  CS70: {
    appId: "Network-Fundamentals-and-Architecture",
    maxModules: 16,
    client_id_key: "clientId",
  },
  CS79A: {
    appId: "Cloud-Computing-with-AWS",
    maxModules: 8,
    client_id_key: "clientId",
  },
  CS81: {
    appId: "Javascript-Programming",
    maxModules: 12,
    client_id_key: "clientId",
  },
  CS80: {
    appId: "Internet-Programming",
    maxModules: 6,
    client_id_key: "clientId",
  },
  CS87A: {
    appId: "Python-Programming",
    maxModules: 6,
    client_id_key: "clientId",
  },
} as const;

export type CourseId = keyof typeof COURSE_PROGRESS_CONFIG;
