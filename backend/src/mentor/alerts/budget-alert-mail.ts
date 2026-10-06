import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import * as nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { DataSource } from "typeorm";
import {
  AUTH_MAIL_BRAND,
  type MailProvider,
} from "../../accounts/mail/auth-mail.contract";
import { SmtpProvider } from "../../accounts/mail/smtp-mail.provider";
import { returnedRows } from "../mentor-sql";
import type { PauseReason } from "../generation/generation-safety";
import { renderBudgetAlert } from "./budget-alert.template";

export const BUDGET_ALERT_RECIPIENT = "serge.hall.dev@gmail.com";
type AlertRow = {
  id: string;
  reason: PauseReason;
  budget_day: string | Date;
  accounted_neurons: number;
  created_at: Date;
  attempts: number;
};

/** A stable outbox ID becomes the SMTP Message-ID across retries. */
export class BudgetAlertDelivery {
  constructor(
    private readonly db: DataSource,
    private readonly provider: MailProvider
  ) {}

  async deliverOne(): Promise<boolean> {
    const [alert] = returnedRows<AlertRow>(
      await this.db.query(
        `WITH due AS (
           SELECT id FROM webdev_ai_budget_alerts
           WHERE (status='pending' AND next_attempt_at<=now())
              OR (status='sending' AND lease_until<now())
           ORDER BY created_at FOR UPDATE SKIP LOCKED LIMIT 1
         )
         UPDATE webdev_ai_budget_alerts a
         SET status='sending',attempts=attempts+1,
             lease_until=now()+interval '60 seconds'
         FROM due WHERE a.id=due.id RETURNING a.*`
      )
    );
    if (!alert) return false;
    try {
      const mail = renderBudgetAlert({
        reason: alert.reason,
        budgetDay:
          alert.budget_day instanceof Date
            ? alert.budget_day.toISOString().slice(0, 10)
            : String(alert.budget_day).slice(0, 10),
        accountedNeurons: alert.accounted_neurons,
        occurredAt: new Date(alert.created_at),
      });
      await this.provider.send({
        ...mail,
        id: alert.id,
        recipient: BUDGET_ALERT_RECIPIENT,
      });
      await this.db.query(
        `UPDATE webdev_ai_budget_alerts
         SET status='sent',sent_at=now(),lease_until=NULL
         WHERE id=$1 AND status='sending' AND attempts=$2`,
        [alert.id, alert.attempts]
      );
    } catch {
      const delay = Math.min(3600, 30 * 2 ** Math.min(alert.attempts, 7));
      await this.db.query(
        `UPDATE webdev_ai_budget_alerts
         SET status='pending',lease_until=NULL,next_attempt_at=$3
         WHERE id=$1 AND status='sending' AND attempts=$2`,
        [alert.id, alert.attempts, new Date(Date.now() + delay * 1000)]
      );
    }
    return true;
  }
}

@Injectable()
export class BudgetAlertMailWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BudgetAlertMailWorker.name);
  private timer?: ReturnType<typeof setInterval>;
  private transport?: Transporter;
  private delivery?: BudgetAlertDelivery;
  private busy = false;

  constructor(@InjectDataSource() private readonly db: DataSource) {}

  onModuleInit(): void {
    if (process.env.AI_MENTOR_ENABLED !== "true") return;
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USERNAME;
    const pass = process.env.SMTP_PASSWORD;
    const from = process.env.SMTP_FROM_EMAIL;
    if (!host || !user || !pass || !from) {
      this.logger.warn("Budget alert mail pending: SMTP is not configured");
      return;
    }
    const port = Number(process.env.SMTP_PORT ?? 587);
    if (!Number.isInteger(port) || port < 1 || port > 65535)
      throw new Error("Invalid SMTP port");
    const secure = process.env.SMTP_USE_SSL === "true";
    this.transport = nodemailer.createTransport({
      host,
      port,
      secure,
      requireTLS: !secure,
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
      tls: { rejectUnauthorized: true },
    });
    this.delivery = new BudgetAlertDelivery(
      this.db,
      new SmtpProvider(this.transport, { name: AUTH_MAIL_BRAND, address: from })
    );
    void this.run();
    this.timer = setInterval(() => void this.run(), 15_000);
    this.timer.unref();
  }

  onModuleDestroy(): void {
    if (this.timer) clearInterval(this.timer);
    this.transport?.close();
  }

  private async run(): Promise<void> {
    if (this.busy || !this.delivery) return;
    this.busy = true;
    try {
      await this.delivery.deliverOne();
    } catch {
      this.logger.warn("Budget alert mail deferred; pending alert retained");
    } finally {
      this.busy = false;
    }
  }
}
