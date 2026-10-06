import type { Transporter } from "nodemailer";
import type { AuthMail, MailProvider } from "./auth-mail.contract";

export class SmtpProvider implements MailProvider {
  constructor(
    private readonly transport: Transporter,
    private readonly from: { name: string; address: string }
  ) {}

  async send(mail: AuthMail): Promise<void> {
    await this.transport.sendMail({
      from: this.from,
      to: mail.recipient,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      messageId: `<${mail.id}@webdev-coursework.com>`,
    });
  }
}
