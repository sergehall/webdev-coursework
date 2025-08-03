// @/api/config/course-progress.ts
export const COURSE_PROGRESS_CONFIG = {
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
} as const;

export type CourseId = keyof typeof COURSE_PROGRESS_CONFIG;
