import { randomUUID } from "crypto";
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { DataSource } from "typeorm";
import type { AccessAudit } from "../../analytics/analytics.types";
import type { DeviceDescriptor } from "../../security/device";
import type {
  AuditQueryDto,
  OwnerPreferencesDto,
  SessionQueryDto,
} from "../account-access.dto";
import { auditGroups, decodeActivityCursor } from "./audit-query";
import { decodeSessionCursor } from "./session-cursor";

export type OwnerAccount = {
  id: string;
  role: "admin" | "client";
  username: string;
  email: string | null;
  emailVerified: boolean;
  githubId: string | null;
  githubUsername?: string | null;
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

@Injectable()
export class AccountStore {
  constructor(readonly db: DataSource) {}

  static readonly ROOT_ID = "00000000-0000-4000-8000-000000000001";
  private readonly selectAccount = `SELECT id, role, username, email, email_verified_at IS NOT NULL AS "emailVerified", github_id AS "githubId", github_username AS "githubUsername", password_hash AS "passwordHash", revision, display_name AS "displayName", time_zone AS "timeZone", theme, report_days AS "reportDays", date_format AS "dateFormat", clock_format AS "clockFormat", activity_days AS "activityDays", activity_page_size AS "activityPageSize" FROM webdev_accounts`;

  async initializeOwner(hash: string, revision: string): Promise<void> {
    await this.db.query(
      "INSERT INTO webdev_accounts(id,role,username,password_hash,revision,display_name) VALUES($1,'admin','sergehall',$2,$3,'Serge') ON CONFLICT(id) DO NOTHING",
      [AccountStore.ROOT_ID, hash, revision]
    );
  }
  async owner(): Promise<OwnerAccount> {
    return (await this.account(AccountStore.ROOT_ID))!;
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
  async listForAdministration() {
    return this.db.query(
      `SELECT id,username,display_name AS "displayName",role,email,
        email_verified_at IS NOT NULL AS "emailVerified",created_at AS "createdAt"
       FROM webdev_accounts ORDER BY created_at DESC,id DESC LIMIT 100`
    );
  }
  async pageForAdministration(search: string, page: number) {
    const rows = await this.db.query(
      `SELECT id,username,display_name AS "displayName",role,email,
        email_verified_at IS NOT NULL AS "emailVerified",created_at AS "createdAt"
       FROM webdev_accounts
       WHERE $1::text='' OR strpos(lower(username),lower($1))>0
         OR strpos(lower(display_name),lower($1))>0
         OR strpos(lower(coalesce(email,'')),lower($1))>0
       ORDER BY created_at DESC,id DESC LIMIT 11 OFFSET $2`,
      [search, (page - 1) * 10]
    );
    return { page, entries: rows.slice(0, 10), hasMore: rows.length > 10 };
  }
  async githubAccount(
    identity: { id: number; login: string; name?: string | null },
    ownerId: string
  ): Promise<OwnerAccount> {
    const githubId = String(identity.id);
    if (githubId === ownerId) {
      const owner = await this.owner();
      if (owner.githubId !== githubId)
        throw new UnauthorizedException(
          "GitHub is not connected to the administrator account"
        );
      await this.db.query(
        "UPDATE webdev_accounts SET github_username=$1 WHERE id=$2",
        [identity.login, AccountStore.ROOT_ID]
      );
      return this.owner();
    }
    const existing: OwnerAccount[] = await this.db.query(
      this.selectAccount + " WHERE github_id=$1",
      [githubId]
    );
    if (existing[0]) {
      await this.db.query(
        "UPDATE webdev_accounts SET github_username=$1 WHERE id=$2",
        [identity.login, existing[0].id]
      );
      return { ...existing[0], githubUsername: identity.login };
    }
    const id = randomUUID();
    // GitHub identities never auto-link to an email/password account.
    const username = `gh-${identity.login.slice(0, 20)}-${githubId}`.slice(
      0,
      40
    );
    await this.db.query(
      "INSERT INTO webdev_accounts(id,role,username,github_id,revision,display_name,github_username) VALUES($1,'client',$2,$3,$4,$5,$6) ON CONFLICT(github_id) WHERE github_id IS NOT NULL DO NOTHING",
      [
        id,
        username,
        githubId,
        randomUUID(),
        (identity.name || identity.login).slice(0, 80),
        identity.login,
      ]
    );
    const rows: OwnerAccount[] = await this.db.query(
      this.selectAccount + " WHERE github_id=$1",
      [githubId]
    );
    return rows[0];
  }

  async linkGithub(
    id: string,
    revision: string,
    identity: { id: number; login: string },
    ownerId: string
  ) {
    try {
      await this.db.transaction(async (q) => {
        const [account]: {
          revision: string;
          github_id: string | null;
          role: string;
        }[] = await q.query(
          "SELECT revision,github_id,role FROM webdev_accounts WHERE id=$1 FOR UPDATE",
          [id]
        );
        if (!account || account.revision !== revision)
          throw new UnauthorizedException("Sign in again");
        if (
          account.github_id ||
          (String(identity.id) === ownerId && id !== AccountStore.ROOT_ID)
        )
          throw new ConflictException(
            "GitHub cannot be connected to this account"
          );
        await q.query(
          "UPDATE webdev_accounts SET github_id=$1,github_username=$2,revision=$3,updated_at=now() WHERE id=$4",
          [String(identity.id), identity.login, randomUUID(), id]
        );
        await q.query(
          "INSERT INTO webdev_analytics_access_audit(event_id,occurred_at,actor,action,allowed) VALUES($1,now(),$2,'account.providers.github.link',true)",
          [randomUUID(), account.role === "admin" ? "site-owner" : "anonymous"]
        );
      });
    } catch (error) {
      if ((error as { code?: string }).code === "23505")
        throw new ConflictException(
          "GitHub cannot be connected to this account"
        );
      throw error;
    }
  }
  async profile(
    displayName: string,
    id = AccountStore.ROOT_ID,
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
    id = AccountStore.ROOT_ID
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
  async recordSession(session: {
    tokenHash: string;
    accountId: string;
    revision: string;
    issuedAt: string;
    expiresAt: string;
    authMethod: "password" | "github" | "unknown";
    device: DeviceDescriptor["device"];
    os: DeviceDescriptor["os"];
    browser: DeviceDescriptor["browser"];
  }): Promise<void> {
    await this.db.query(
      `INSERT INTO webdev_account_sessions
      (id,token_hash,account_id,revision,issued_at,expires_at,device,os,browser,auth_method)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      ON CONFLICT(token_hash) DO UPDATE SET last_seen_at=now()
      WHERE webdev_account_sessions.account_id=EXCLUDED.account_id
        AND webdev_account_sessions.revision=EXCLUDED.revision
        AND webdev_account_sessions.last_seen_at < now() - interval '1 minute'`,
      [
        randomUUID(),
        session.tokenHash,
        session.accountId,
        session.revision,
        session.issuedAt,
        session.expiresAt,
        session.device,
        session.os,
        session.browser,
        session.authMethod,
      ]
    );
  }
  async forgetSession(tokenHash: string, accountId: string): Promise<void> {
    await this.db.query(
      "DELETE FROM webdev_account_sessions WHERE token_hash=$1 AND account_id=$2",
      [tokenHash, accountId]
    );
  }
  async sessions(
    accountId: string,
    revision: string,
    query: SessionQueryDto = {}
  ) {
    const { at, id } = decodeSessionCursor(query.cursor);
    // Apply account/revision isolation and filters before selecting a page.
    const rows: {
      id: string;
      tokenHash: string;
      issuedAt: Date;
      expiresAt: Date;
      lastSeenAt: Date;
      device: string;
      os: string;
      browser: string;
      authMethod: string;
    }[] = await this.db.query(
      `
      SELECT id,token_hash AS "tokenHash",issued_at AS "issuedAt",expires_at AS "expiresAt",last_seen_at AS "lastSeenAt",device,os,browser,auth_method AS "authMethod"
      FROM webdev_account_sessions WHERE account_id=$1 AND revision=$2 AND expires_at>now()
        AND ($3::timestamptz IS NULL OR (issued_at,id)<($3::timestamptz,$4::uuid))
        AND ($5::text IS NULL OR device=$5)
        AND ($6::text IS NULL OR auth_method=$6)
      ORDER BY issued_at DESC,id DESC LIMIT 6`,
      [
        accountId,
        revision,
        at,
        id,
        query.device ?? null,
        query.authMethod ?? null,
      ]
    );
    const entries = rows.slice(0, 5),
      last = entries.at(-1);
    return {
      entries,
      nextCursor:
        rows.length > 5 && last
          ? Buffer.from(
              JSON.stringify({ at: last.issuedAt.toISOString(), id: last.id })
            ).toString("base64url")
          : null,
    };
  }

  async password(
    hash: string,
    revision: string,
    previousRevision: string,
    id = AccountStore.ROOT_ID
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
    id = AccountStore.ROOT_ID
  ): Promise<void> {
    await this.db.query(
      "UPDATE webdev_accounts SET revision=$1,updated_at=now() WHERE id=$2",
      [revision, id]
    );
  }

  async audits(query: AuditQueryDto) {
    const limit = query.limit ?? 10,
      days = query.days ?? 7;
    const { before, beforeId } = decodeActivityCursor(query.cursor);
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
          auditGroups[query.group] ?? null,
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
}
