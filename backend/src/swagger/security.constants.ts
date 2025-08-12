// src/swagger/security.constants.ts
export const SWAGGER_SECURITY = {
  ANSWERS_TOKEN: "answersToken",
  USER_BEARER: "bearer", // example: user auth bearer
} as const;

export type SecuritySchemeName =
  (typeof SWAGGER_SECURITY)[keyof typeof SWAGGER_SECURITY];
