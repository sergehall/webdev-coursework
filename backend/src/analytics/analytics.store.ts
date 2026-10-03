import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { QR_CAMPAIGN, type QrEvent, type AccessAudit } from "./analytics.types";

@Injectable()
export class AnalyticsStore {
  constructor(readonly db: DataSource) {}

  async persistEvents(events: QrEvent[]): Promise<void> {
    if (!events.length) return;
    // The same statement deduplicates raw events and updates aggregates only
    // for newly inserted rows. Queue retries cannot inflate the visit counts.
    await this.db.query(
      `
      WITH inserted AS (
        INSERT INTO webdev_qr_events (event_id, campaign, occurred_at, device, os, browser)
        SELECT "eventId", campaign, "occurredAt", device, os, browser
        FROM jsonb_to_recordset($1::jsonb) AS x("eventId" uuid, campaign text, "occurredAt" timestamptz, device text, os text, browser text)
        ON CONFLICT (event_id) DO NOTHING
        RETURNING *
      )
      INSERT INTO webdev_qr_daily_stats (day, campaign, device, os, browser, visits)
      SELECT (occurred_at AT TIME ZONE 'UTC')::date, campaign, device, os, browser, count(*)::integer
      FROM inserted GROUP BY 1, 2, 3, 4, 5
      ON CONFLICT (day, campaign, device, os, browser)
      DO UPDATE SET visits = webdev_qr_daily_stats.visits + EXCLUDED.visits
    `,
      [JSON.stringify(events)]
    );
  }

  async persistAudits(events: AccessAudit[]): Promise<void> {
    if (!events.length) return;
    await this.db.query(
      `
      INSERT INTO webdev_analytics_access_audit (event_id, occurred_at, actor, action, allowed)
      SELECT "eventId", "occurredAt", actor, action, allowed
      FROM jsonb_to_recordset($1::jsonb) AS x("eventId" uuid, "occurredAt" timestamptz, actor text, action text, allowed boolean)
      ON CONFLICT (event_id) DO NOTHING
    `,
      [JSON.stringify(events)]
    );
  }

  async dashboard(days: number) {
    const rows: {
      day: string;
      device: string;
      os: string;
      browser: string;
      visits: number;
    }[] = await this.db.query(
      `
      SELECT day::text, device, os, browser, visits FROM webdev_qr_daily_stats
      WHERE campaign = $1 AND day >= (now() AT TIME ZONE 'UTC')::date - ($2::integer - 1)
      ORDER BY day
    `,
      [QR_CAMPAIGN, days]
    );
    const daily: Record<string, number> = {};
    const devices: Record<string, number> = {};
    const systems: Record<string, number> = {};
    const browsers: Record<string, number> = {};
    let total = 0;
    for (const row of rows) {
      daily[row.day] = (daily[row.day] ?? 0) + row.visits;
      devices[row.device] = (devices[row.device] ?? 0) + row.visits;
      systems[row.os] = (systems[row.os] ?? 0) + row.visits;
      browsers[row.browser] = (browsers[row.browser] ?? 0) + row.visits;
      total += row.visits;
    }
    return {
      campaign: QR_CAMPAIGN,
      days,
      total,
      daily,
      devices,
      systems,
      browsers,
      generatedAt: new Date().toISOString(),
    };
  }

  async retain(): Promise<void> {
    await this.db.transaction(async (db) => {
      await db.query(
        "DELETE FROM webdev_account_sessions s WHERE expires_at <= now() OR NOT EXISTS (SELECT 1 FROM webdev_accounts a WHERE a.id=s.account_id AND a.revision=s.revision)"
      );
      await db.query(
        "DELETE FROM webdev_runtime_state WHERE expires_at < now()"
      );
      await db.query(
        "DELETE FROM webdev_account_tokens WHERE expires_at < now() - interval '7 days'"
      );
      await db.query(
        "DELETE FROM webdev_mail_outbox WHERE status IN ('sent','failed') AND created_at < now() - interval '30 days'"
      );
      await db.query(
        "DELETE FROM webdev_qr_events WHERE occurred_at < now() - interval '30 days'"
      );
      await db.query(
        "DELETE FROM webdev_qr_daily_stats WHERE day < (now() AT TIME ZONE 'UTC')::date - 365"
      );
      await db.query(
        "DELETE FROM webdev_analytics_access_audit WHERE occurred_at < now() - interval '365 days'"
      );
    });
  }
}
