import { AUTH_MAIL_BRAND } from "../../accounts/mail/auth-mail.contract";
import { escapeHtml } from "../../accounts/mail/templates/auth-mail.layout";
import type { PauseReason } from "../generation/generation-safety";

export type BudgetAlertData = {
  reason: PauseReason;
  budgetDay: string;
  accountedNeurons: number;
  occurredAt: Date;
};

export function renderBudgetAlert(input: BudgetAlertData) {
  const providerExhausted = input.reason === "cloudflare_quota";
  const subject = providerExhausted
    ? "AI Pathway Mentor paused: Cloudflare free allocation exhausted"
    : "AI Pathway Mentor paused: application safety budget reached";
  const reason = providerExhausted
    ? "Cloudflare reported that the account's daily free allocation of 10,000 Neurons is exhausted (error 3036)."
    : "The application's protective limit of 8,000 reserved or accounted Neurons was reached. This does not confirm that Cloudflare's account-wide allocation is exhausted.";
  const occurred = input.occurredAt.toISOString();
  const details = [
    `Reason: ${reason}`,
    `Paused at: ${occurred}`,
    `Budget day (UTC): ${input.budgetDay}`,
    `Mentor accounted or reserved Neurons: ${input.accountedNeurons}`,
  ];
  const next =
    "New AI chat and plan requests are paused for everyone. Saved conversations and plans remain available. Check Cloudflare Workers AI usage and billing, then explicitly resume generation if you want it available again. The pause does not clear at the next UTC reset.";
  const text = [
    AUTH_MAIL_BRAND,
    "",
    "AI Pathway Mentor is paused",
    "",
    "Hello Serge,",
    "",
    ...details,
    "",
    next,
    "",
    "This automated operational alert contains no user messages or API credentials.",
  ].join("\n");
  const paragraph = (value: string) =>
    `<p style="margin:0 0 14px;font-size:15px;line-height:24px;color:#243447;">${escapeHtml(value)}</p>`;
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:30px 12px;background:#f3f5f7;font-family:Arial,Helvetica,sans-serif;color:#243447;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #d9e0e8;border-radius:14px;">
<tr><td style="padding:26px 32px;background:#102539;color:#ffffff;border-radius:14px 14px 0 0;border-bottom:3px solid #d9fa86;font-size:17px;font-weight:700;">${AUTH_MAIL_BRAND}</td></tr>
<tr><td style="padding:32px;">
<p style="margin:0 0 8px;color:#38664c;font-size:12px;font-weight:700;letter-spacing:1.3px;">OPERATIONAL ALERT</p>
<h1 style="margin:0 0 24px;color:#102539;font-size:28px;line-height:34px;">AI Pathway Mentor is paused</h1>
${paragraph("Hello Serge,")}
${details.map(paragraph).join("\n")}
<div style="margin-top:24px;padding:18px;background:#e8f1eb;border-left:3px solid #38664c;">${paragraph(next)}</div>
<p style="margin:24px 0 0;font-size:12px;line-height:19px;color:#5e6b7c;">This automated operational alert contains no user messages or API credentials.</p>
</td></tr></table></body></html>`;
  return { subject, text, html };
}
