import { randomUUID } from "crypto";
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { DataSource } from "typeorm";
import { QR_CAMPAIGN, type QrEvent } from "./analytics.types";
import type { AuditQueryDto, OwnerPreferencesDto } from "./analytics.dto";

export type OwnerAccount = {
  id: string;
  role: "admin" | "client";
  username: string;
  email: string | null;
  emailVerified: boolean;
  githubId: string | null;
  passwordHash: string | null;
  revision: string;
  displayName: string;
  timeZone: string;
  theme: "system" | "light" | "dark";
  reportDays: number;
  dateFormat?: "medium" | "day-first" | "iso";
  clockFormat?: "12h" | "24h";
  activityDays?: number;
  activityPageSize?: number;
};

export type AccessAudit = {
  eventId: string;
  occurredAt: string;
  actor: "site-owner" | "anonymous";
  action: string;
  allowed: boolean;
};

@Injectable()
export class AnalyticsStore {
  constructor(readonly db: DataSource) {}

  static readonly ROOT_ID = "00000000-0000-4000-8000-000000000001";
  private readonly selectAccount = `SELECT id, role, username, email, email_verified_at IS NOT NULL AS "emailVerified", github_id AS "githubId", password_hash AS "passwordHash", revision, display_name AS "displayName", time_zone AS "timeZone", theme, report_days AS "reportDays", date_format AS "dateFormat", clock_format AS "clockFormat", activity_days AS "activityDays", activity_page_size AS "activityPageSize" FROM webdev_accounts`;

  async initializeOwner(hash: string, revision: string): Promise<void> {
    await this.db.query(
      "INSERT INTO webdev_accounts(id,role,username,password_hash,revision,display_name) VALUES($1,'admin','sergehall',$2,$3,'Serge') ON CONFLICT(id) DO NOTHING",
      [AnalyticsStore.ROOT_ID, hash, revision]
    );
  }
  async owner(): Promise<OwnerAccount> {
    return (await this.account(AnalyticsStore.ROOT_ID))!;
  }
  async account(id: string): Promise<OwnerAccount | null> {
    const rows: OwnerAccount[] = await this.db.query(
      this.selectAccount + " WHERE id=$1",
      [id]
    );
    return rows[0] ?? null;
  }
  async byLogin(identity: string): Promise<OwnerAccount | null> {
    const rows: OwnerAccount[] = await this.db.query(
      this.selectAccount +
        " WHERE lower(username)=lower($1) OR lower(email)=lower($1)",
      [identity]
    );
    return rows[0] ?? null;
  }
  async githubAccount(
    identity: { id: number; login: string; name?: string | null },
    ownerId: string
  ): Promise<OwnerAccount> {
    const githubId = String(identity.id);
    if (githubId === ownerId) {
      await this.db.query(
        "UPDATE webdev_accounts SET github_id=$1 WHERE id=$2",
        [githubId, AnalyticsStore.ROOT_ID]
      );
      return this.owner();
    }
    const existing: OwnerAccount[] = await this.db.query(
      this.selectAccount + " WHERE github_id=$1",
      [githubId]
    );
    if (existing[0]) return existing[0];
    const id = randomUUID();
    // GitHub identities never auto-link to an email/password account.
    const username = `gh-${identity.login.slice(0, 20)}-${githubId}`.slice(
      0,
      40
    );
    await this.db.query(
      "INSERT INTO webdev_accounts(id,role,username,github_id,revision,display_name) VALUES($1,'client',$2,$3,$4,$5) ON CONFLICT(github_id) WHERE github_id IS NOT NULL DO NOTHING",
      [
        id,
        username,
        githubId,
        randomUUID(),
        (identity.name || identity.login).slice(0, 80),
      ]
    );
    const rows: OwnerAccount[] = await this.db.query(
      this.selectAccount + " WHERE github_id=$1",
      [githubId]
    );
    return rows[0];
  }
  async profile(
    displayName: string,
    id = AnalyticsStore.ROOT_ID,
    username?: string
  ): Promise<void> {
    try {
      await this.db.query(
        "UPDATE webdev_accounts SET display_name=$1,username=COALESCE($3,username),updated_at=now() WHERE id=$2",
        [displayName.trim(), id, username ?? null]
      );
    } catch (error) {
      // The unique index also protects concurrent updates and ignores case.
      const failure = error as { code?: string; constraint?: string };
      if (
        failure.code === "23505" &&
        failure.constraint === "webdev_accounts_username"
      )
        throw new ConflictException("This username is already in use");
      throw error;
    }
  }
  async preferences(
    dto: OwnerPreferencesDto,
    id = AnalyticsStore.ROOT_ID
  ): Promise<void> {
    await this.db.query(
      "UPDATE webdev_accounts SET time_zone=$1,theme=$2,report_days=$3,date_format=COALESCE($5,date_format),clock_format=COALESCE($6,clock_format),activity_days=COALESCE($7,activity_days),activity_page_size=COALESCE($8,activity_page_size),updated_at=now() WHERE id=$4",
      [
        dto.timeZone,
        dto.theme,
        dto.reportDays,
        id,
        dto.dateFormat,
        dto.clockFormat,
        dto.activityDays,
        dto.activityPageSize,
      ]
    );
  }
  async password(
    hash: string,
    revision: string,
    previousRevision: string,
    id = AnalyticsStore.ROOT_ID
  ): Promise<void> {
    const rows = await this.db.query(
      "WITH changed AS (UPDATE webdev_accounts SET password_hash=$1,revision=$2,updated_at=now() WHERE id=$3 AND revision=$4 RETURNING id) SELECT id FROM changed",
      [hash, revision, id, previousRevision]
    );
    if (!rows.length)
      throw new ConflictException("Account changed; sign in again");
  }
  async revokeSessions(
    revision: string,
    id = AnalyticsStore.ROOT_ID
  ): Promise<void> {
    await this.db.query(
      "UPDATE webdev_accounts SET revision=$1,updated_at=now() WHERE id=$2",
      [revision, id]
    );
  }

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

  async audits(query: AuditQueryDto) {
    const limit = query.limit ?? 10,
      days = query.days ?? 7;
    const groups: Record<string, string[]> = {
      "sign-in": [
        "owner.login%",
        "owner.github.%",
        "account.github.%",
        "account.mfa.login",
      ],
      sessions: ["owner.session%", "owner.logout"],
      profile: ["owner.profile.%", "owner.preferences.%"],
      security: ["owner.password.%", "owner.sessions.revoke", "account.mfa.%"],
      administration: ["accounts.%"],
      analytics: ["analytics.%"],
      limits: ["rate.%"],
    };
    let before: string | null = null,
      beforeId: string | null = null;
    if (query.cursor) {
      try {
        const cursor = JSON.parse(
          Buffer.from(query.cursor, "base64url").toString("utf8")
        ) as { at: string; id: string };
        if (
          typeof cursor.at !== "string" ||
          !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3,6}Z$/.test(cursor.at) ||
          new Date(cursor.at).toISOString().slice(0, 19) !==
            cursor.at.slice(0, 19) ||
          !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
            cursor.id
          )
        )
          throw new Error();
        before = cursor.at;
        beforeId = cursor.id;
      } catch {
        throw new BadRequestException("Invalid activity cursor");
      }
    }
    const rows: (AccessAudit & { eventId: string; cursorAt: string })[] =
      await this.db.query(
        `
      SELECT event_id AS "eventId",occurred_at AS "occurredAt",actor,action,allowed,
        to_char(occurred_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS "cursorAt"
      FROM webdev_analytics_access_audit
      WHERE occurred_at >= now() - $1 * interval '1 day'
        AND ($2::boolean IS NULL OR allowed=$2)
        AND ($3::text[] IS NULL OR action LIKE ANY($3))
        AND ($4::timestamptz IS NULL OR (occurred_at,event_id)<($4::timestamptz,$5::uuid))
      ORDER BY occurred_at DESC,event_id DESC LIMIT $6`,
        [
          days,
          query.result === "denied"
            ? false
            : query.result === "allowed"
              ? true
              : null,
          groups[query.group] ?? null,
          before,
          beforeId,
          limit + 1,
        ]
      );
    const entries = rows.slice(0, limit),
      last = entries.at(-1);
    return {
      entries: entries.map(({ cursorAt: _cursorAt, ...entry }) => entry),
      nextCursor:
        rows.length > limit && last
          ? Buffer.from(
              JSON.stringify({
                at: last.cursorAt,
                id: last.eventId,
              })
            ).toString("base64url")
          : null,
    };
  }

  async retain(): Promise<void> {
    await this.db.transaction(async (db) => {
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
