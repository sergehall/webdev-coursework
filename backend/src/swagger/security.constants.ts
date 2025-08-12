// src/swagger/security.constants.ts
export const SWAGGER_SECURITY = {
  ANSWERS_BEARER: "answersToken", // default name for answers-token bearer
  USER_BEARER: "bearer", // example: user auth bearer
} as const;

export type SecuritySchemeName =
  (typeof SWAGGER_SECURITY)[keyof typeof SWAGGER_SECURITY];
