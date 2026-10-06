import type { Transporter } from "nodemailer";
import { SmtpProvider } from "./smtp-mail.provider";
import { renderAuthMail } from "./templates/auth-mail.templates";

describe("SMTP account mail adapter", () => {
  it("forwards both template variants with a stable message ID and configured sender", async () => {
    const sendMail = jest.fn().mockResolvedValue({});
    const from = {
      name: "Web Engineering Portfolio",
      address: "sender@example.test",
    };
    const mail = {
      id: "delivery-1",
      recipient: "student@example.test",
      ...renderAuthMail(
        "verify",
        "Student",
        "https://webdev-coursework.com/account/verify-email#token=preview-only"
      ),
    };
    await new SmtpProvider({ sendMail } as unknown as Transporter, from).send(
      mail
    );
    expect(sendMail).toHaveBeenCalledWith({
      from,
      to: mail.recipient,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      messageId: "<delivery-1@webdev-coursework.com>",
    });
  });

  it("lets the outbox classify a provider rejection", async () => {
    const failure = { responseCode: 421 };
    const provider = new SmtpProvider(
      {
        sendMail: jest.fn().mockRejectedValue(failure),
      } as unknown as Transporter,
      { name: "Portfolio", address: "sender@example.test" }
    );
    await expect(
      provider.send({
        id: "delivery-1",
        recipient: "student@example.test",
        subject: "Confirm email",
        text: "Test",
        html: "<p>Test</p>",
      })
    ).rejects.toBe(failure);
  });
});
