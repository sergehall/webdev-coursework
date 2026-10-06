export type AuthMailPurpose = "verify" | "reset" | "add-email";

export const AUTH_MAIL_BRAND = "Web Engineering Portfolio";
export const AUTH_MAIL_TTL_SECONDS: Record<AuthMailPurpose, number> = {
  verify: 86400,
  reset: 3600,
  "add-email": 86400,
};

export type RenderedAuthMail = {
  subject: string;
  html: string;
  text: string;
};

export type AuthMail = RenderedAuthMail & {
  id: string;
  recipient: string;
};

export interface MailProvider {
  send(mail: AuthMail): Promise<void>;
}
