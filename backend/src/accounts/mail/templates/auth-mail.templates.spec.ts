import type { AuthMailPurpose } from "../auth-mail.contract";
import { renderAuthMail } from "./auth-mail.templates";

const cases: [AuthMailPurpose, string, string, string][] = [
  [
    "verify",
    "Confirm your Web Engineering Portfolio account",
    "Confirm email",
    "24 hours",
  ],
  ["reset", "Reset your portfolio password", "Reset password", "one hour"],
  [
    "add-email",
    "Confirm the email for your portfolio account",
    "Confirm email address",
    "24 hours",
  ],
];

describe("Account email templates", () => {
  it.each(cases)(
    "renders the %s intent in HTML and plain text",
    (purpose, subject, action, lifetime) => {
      const url = `https://webdev-coursework.com/account/${purpose === "reset" ? "reset-password" : "verify-email"}#token=preview-only`;
      const result = renderAuthMail(purpose, "Student", url);
      expect(result.subject).toBe(subject);
      expect(result.html).toContain('<html lang="en">');
      expect(result.html).toContain("Hello Student,");
      expect(result.text).toContain("Hello Student,");
      expect(result.html).toContain(`>${action}</a>`);
      expect(result.text).toContain(`${action}: ${url}`);
      expect(result.html.match(new RegExp(`href="${url}"`, "g"))).toHaveLength(
        2
      );
      expect(result.html).toContain("Copy and paste this link");
      expect(result.html).toContain(lifetime);
      expect(result.text).toContain(lifetime);
      expect(result.html).toContain("can be used once");
      expect(result.text).toContain("can be used once");
    }
  );

  it("escapes names and links without creating markup or link attributes", () => {
    const result = renderAuthMail(
      "verify",
      '<img src=x onerror="alert(1)"> & Student',
      'https://webdev-coursework.com/account/verify-email#token=preview-only&extra="<bad>'
    );
    expect(result.html).not.toContain("<img");
    expect(result.html).toContain(
      "&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; Student"
    );
    expect(result.html).toContain("preview-only&amp;extra=%22%3Cbad%3E");
    expect(result.html).not.toContain('extra="<bad>');
  });

  it.each([
    "javascript:alert(1)",
    "data:text/html,unsafe",
    "https://user:password@example.test/verify",
  ])("rejects unsafe action URLs", (url) => {
    expect(() => renderAuthMail("verify", "Student", url)).toThrow(
      "Invalid account email action URL"
    );
  });

  it("keeps the actual expiry after a delivery delay in both versions", () => {
    const result = renderAuthMail(
      "reset",
      "Student",
      "https://webdev-coursework.com/account/reset-password#token=preview-only",
      new Date("2026-10-06T09:30:00Z")
    );
    expect(result.text).toContain("Oct 6, 2026, 9:30 AM UTC");
    expect(result.html).toContain("Oct 6, 2026, 9:30 AM UTC");
    expect(result.text).not.toContain("valid for one hour");
  });

  it("describes adding an email without claiming that a new account was created", () => {
    const result = renderAuthMail(
      "add-email",
      " ",
      "https://webdev-coursework.com/account/verify-email#token=preview-only"
    );
    expect(result.text).toContain("Hello there,");
    expect(result.text).toContain("add this email address");
    expect(result.text).toContain("sign in again");
    expect(result.text).not.toContain("creating an account");
  });

  it("rejects an unknown persisted template rather than sending the wrong intent", () => {
    expect(() =>
      renderAuthMail(
        "unknown" as AuthMailPurpose,
        "Student",
        "https://webdev-coursework.com/account/verify-email#token=preview-only"
      )
    ).toThrow("Unknown account email template");
  });
});
