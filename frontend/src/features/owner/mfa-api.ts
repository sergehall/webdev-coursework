export type MfaStatus = {
  configured: boolean;
  enabled: boolean;
  pendingEnrollment: boolean;
  enrolledAt: string | null;
  recoveryCodesRemaining: number;
  currentSessionVerifiedAt: string | null;
};
export type MfaSetup = {
  enrollmentId: string;
  issuer: string;
  accountName: string;
  secret: string;
  otpauthUri: string;
};
export type MfaResponse = {
  mfa: MfaStatus;
  setup?: MfaSetup;
  recoveryCodes?: string[];
};
