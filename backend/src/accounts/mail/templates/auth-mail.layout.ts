import { AUTH_MAIL_BRAND } from "../auth-mail.contract";

type AuthMailLayout = {
  subject: string;
  preheader: string;
  eyebrow: string;
  title: string;
  greeting: string;
  message: string;
  actionLabel: string;
  actionUrl: string;
  expiry: string;
  nextStep: string;
  securityNote: string;
};

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!
  );
}

// Presentation tables and inline styles remain usable when a mail client strips CSS.
export function renderAuthMailLayout(input: AuthMailLayout): string {
  const content = Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, escapeHtml(value)])
  ) as AuthMailLayout;
  const siteUrl = escapeHtml(new URL(input.actionUrl).origin);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${content.subject}</title>
  <style>
    @media only screen and (max-width:480px) {
      .mail-outer { padding:16px 8px!important; }
      .mail-content { padding:28px 22px!important; }
      .mail-header { padding:24px 22px!important; }
      .mail-title { font-size:28px!important;line-height:34px!important; }
      .mail-action-table { width:100%!important; }
      .mail-action { display:block!important;text-align:center!important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f3f5f7;color:#202936;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${content.preheader}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background-color:#f3f5f7;">
    <tr><td class="mail-outer" align="center" style="padding:40px 16px;">
      <!--[if mso]><table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;">
        <tr><td class="mail-header" style="padding:28px 36px;background-color:#102539;border-radius:16px 16px 0 0;border-bottom:3px solid #d9fa86;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr>
            <td style="font-family:Consolas,monospace;font-size:26px;font-weight:700;color:#d9fa86;padding-right:16px;">{&nbsp;}</td>
            <td><a href="${siteUrl}" style="font-size:15px;line-height:22px;font-weight:700;color:#ffffff;text-decoration:none;">${AUTH_MAIL_BRAND}</a><p style="margin:3px 0 0;font-size:11px;line-height:16px;letter-spacing:1.5px;color:#c1cfdb;">LEARN. BUILD. GROW.</p></td>
          </tr></table>
        </td></tr>
        <tr><td class="mail-content" style="padding:36px;background-color:#ffffff;border:1px solid #d9e0e8;border-top:0;border-radius:0 0 16px 16px;">
          <p style="margin:0 0 14px;font-size:11px;line-height:16px;font-weight:700;letter-spacing:1.8px;color:#38664c;text-transform:uppercase;">${content.eyebrow}</p>
          <h1 class="mail-title" style="margin:0 0 24px;font-size:34px;line-height:40px;letter-spacing:-1px;color:#102539;">${content.title}</h1>
          <p style="margin:0 0 10px;font-size:16px;line-height:26px;color:#202936;">${content.greeting}</p>
          <p style="margin:0 0 26px;font-size:16px;line-height:26px;color:#5e6b7c;">${content.message}</p>
          <table class="mail-action-table" role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;"><tr>
            <td align="center" bgcolor="#38664c" style="background-color:#38664c;border-radius:8px;mso-padding-alt:16px 28px;">
              <a class="mail-action" href="${content.actionUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:16px 28px;font-size:15px;line-height:20px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:8px;mso-padding-alt:0;">${content.actionLabel}</a>
            </td>
          </tr></table>
          <p style="margin:16px 0 28px;font-size:12px;line-height:19px;color:#5e6b7c;">${content.expiry}</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;"><tr>
            <td style="padding:18px 20px;background-color:#e8f1eb;border-left:3px solid #38664c;">
              <p style="margin:0 0 6px;font-size:12px;line-height:18px;font-weight:700;color:#38664c;">WHAT HAPPENS NEXT</p>
              <p style="margin:0;font-size:14px;line-height:22px;color:#202936;">${content.nextStep}</p>
            </td>
          </tr></table>
          <p style="margin:28px 0 8px;font-size:12px;line-height:19px;color:#5e6b7c;">Button not working? Copy and paste this link into your browser:</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;table-layout:fixed;"><tr><td style="word-wrap:break-word;word-break:break-all;">
            <a href="${content.actionUrl}" target="_blank" rel="noopener noreferrer" style="font-size:12px;line-height:20px;color:#38664c;text-decoration:underline;word-wrap:break-word;word-break:break-all;">${content.actionUrl}</a>
          </td></tr></table>
        </td></tr>
        <tr><td style="padding:22px 12px 0;text-align:center;">
          <p style="margin:0 0 10px;font-size:12px;line-height:20px;color:#5e6b7c;">${content.securityNote}</p>
          <p style="margin:0;font-size:11px;line-height:18px;color:#5e6b7c;">${AUTH_MAIL_BRAND} &middot; Account security<br />This is an automated message. Please do not reply.</p>
        </td></tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td></tr>
  </table>
</body>
</html>`;
}
