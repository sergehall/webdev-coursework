import {
  AUTH_MAIL_BRAND,
  AUTH_MAIL_TTL_SECONDS,
  type AuthMailPurpose,
  type RenderedAuthMail,
} from "../auth-mail.contract";
import { renderAuthMailLayout } from "./auth-mail.layout";

// Copy varies by intent; transport and token handling do not belong to templates.
const templates = {
  verify: {
    subject: "Confirm your Web Engineering Portfolio account",
    preheader:
      "One more step: confirm your email to finish creating your account.",
    eyebrow: "Welcome to your portfolio",
    title: "Your next chapter starts here.",
    message:
      "Thanks for creating an account. Confirm your email address to finish setting up your Web Engineering Portfolio account.",
    actionLabel: "Confirm email",
    nextStep:
      "Open the confirmation page and select Confirm email. Once your address is verified, you can sign in to your account.",
    securityNote:
      "If you did not create an account, you can safely ignore this email. Your address will not be confirmed unless you complete this step.",
  },
  reset: {
    subject: "Reset your portfolio password",
    preheader: "Use this secure, single-use link to choose a new password.",
    eyebrow: "Account recovery",
    title: "A fresh start for your password.",
    message:
      "We received a request to reset your Web Engineering Portfolio password. Use the secure link below to choose a new one.",
    actionLabel: "Reset password",
    nextStep:
      "Choose a new password on the reset page, then sign in again. Your existing sessions will be signed out after the password is changed.",
    securityNote:
      "If you did not request a password reset, ignore this email. Your password will stay the same. Keep this link private.",
  },
  "add-email": {
    subject: "Confirm the email for your portfolio account",
    preheader: "Confirm this address to add a recovery email to your account.",
    eyebrow: "Account security",
    title: "Keep your account within reach.",
    message:
      "You requested to add this email address to your Web Engineering Portfolio account. Confirm that it belongs to you to finish adding it.",
    actionLabel: "Confirm email address",
    nextStep:
      "Confirm your address on the verification page, then sign in again. You can manage your sign-in methods in account settings.",
    securityNote:
      "If you did not request to add this email, ignore this message. This address will not be added without your confirmation.",
  },
} satisfies Record<
  AuthMailPurpose,
  {
    subject: string;
    preheader: string;
    eyebrow: string;
    title: string;
    message: string;
    actionLabel: string;
    nextStep: string;
    securityNote: string;
  }
>;

export function renderAuthMail(
  purpose: AuthMailPurpose,
  name: string,
  url: string,
  expiresAt?: Date
): RenderedAuthMail {
  const actionUrl = new URL(url);
  if (
    !["https:", "http:"].includes(actionUrl.protocol) ||
    actionUrl.username ||
    actionUrl.password
  )
    throw new Error("Invalid account email action URL");
  const template = templates[purpose];
  if (!template) throw new Error("Unknown account email template");
  const greeting = `Hello ${name.trim() || "there"},`;
  const lifetime =
    AUTH_MAIL_TTL_SECONDS[purpose] === 3600 ? "one hour" : "24 hours";
  const expiry = expiresAt
    ? `This link can be used once and expires on ${new Intl.DateTimeFormat(
        "en-US",
        {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "UTC",
        }
      ).format(expiresAt)} UTC.`
    : `This link can be used once and is valid for ${lifetime} after your request.`;

  return {
    subject: template.subject,
    html: renderAuthMailLayout({
      ...template,
      greeting,
      actionUrl: actionUrl.href,
      expiry,
    }),
    text: [
      AUTH_MAIL_BRAND,
      "",
      template.title,
      "",
      greeting,
      "",
      template.message,
      "",
      `${template.actionLabel}: ${actionUrl.href}`,
      "",
      expiry,
      "",
      `What happens next: ${template.nextStep}`,
      "",
      template.securityNote,
      "",
      "This is an automated message. Please do not reply.",
    ].join("\n"),
  };
}
