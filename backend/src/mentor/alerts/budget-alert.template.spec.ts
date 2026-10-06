import { renderBudgetAlert } from "./budget-alert.template";

describe("mentor budget alert email", () => {
  const base = {
    budgetDay: "2026-10-05",
    accountedNeurons: 8000,
    occurredAt: new Date("2026-10-05T20:15:00.000Z"),
  };

  it("renders an honest application-budget notice in HTML and plain text", () => {
    const mail = renderBudgetAlert({ ...base, reason: "app_budget" });
    expect(mail.subject).toContain("application safety budget reached");
    expect(mail.html).toContain('<html lang="en">');
    expect(mail.html).toContain("8,000");
    expect(mail.text).toContain("does not confirm");
    expect(mail.text).toContain("2026-10-05T20:15:00.000Z");
    expect(mail.text).toContain("paused for everyone");
  });

  it("identifies Cloudflare code 3036 without user content", () => {
    const mail = renderBudgetAlert({
      ...base,
      reason: "cloudflare_quota",
    });
    expect(mail.subject).toContain("Cloudflare free allocation exhausted");
    expect(mail.text).toContain("10,000 Neurons");
    expect(mail.text).toContain("3036");
    expect(mail.html).not.toContain("<script");
  });
});
