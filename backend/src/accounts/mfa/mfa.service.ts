import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { createHash, randomBytes, randomUUID } from "crypto";
import { compare, hash } from "bcryptjs";
import type { EntityManager } from "typeorm";
import {
  AnalyticsStore,
  type OwnerAccount,
} from "../../analytics/analytics.store";
import { MfaCrypto } from "./mfa.crypto";

type Method = {
  method_id: string;
  status: "pending" | "verified" | "disabled";
  secret_encrypted: string | null;
  enrollment_expires_at: Date | null;
  verified_at: Date | null;
  last_used_at: Date | null;
  last_step: string;
  locked_until: Date | null;
};
type Challenge = {
  auth_method: "password" | "github";
  account_id: string;
  revision: string;
  attempts: number;
  status: string;
  expires_at: Date;
};
export type LoginResult =
  | { token: string; mfaRequired?: false }
  | { mfaRequired: true; challengeToken: string; expiresAt: string };
const digest = (value: string) =>
  createHash("sha256").update(value).digest("hex");
const invalid = () =>
  new HttpException(
    {
      code: "MFA_INVALID_CODE",
      message:
        "Invalid or already used verification code. Wait for a new authenticator code or use a recovery code.",
    },
    400
  );

@Injectable()
export class MfaService {
  constructor(
    private readonly store: AnalyticsStore,
    private readonly crypto: MfaCrypto
  ) {}

  async enabled(id: string): Promise<boolean> {
    const rows: { enabled: boolean }[] = await this.store.db.query(
      "SELECT status='verified' AS enabled FROM webdev_mfa_methods WHERE account_id=$1",
      [id]
    );
    return rows[0]?.enabled ?? false;
  }
  async status(id: string, currentSessionVerifiedAt?: string) {
    const rows: Method[] = await this.store.db.query(
      "SELECT * FROM webdev_mfa_methods WHERE account_id=$1",
      [id]
    );
    const method = rows[0];
    const [count]: { remaining: number }[] = await this.store.db.query(
      "SELECT count(*)::integer AS remaining FROM webdev_mfa_recovery_codes WHERE account_id=$1 AND used_at IS NULL",
      [id]
    );
    return {
      configured: this.crypto.available,
      enabled: method?.status === "verified",
      pendingEnrollment:
        method?.status === "pending" &&
        !!method.enrollment_expires_at &&
        method.enrollment_expires_at.getTime() > Date.now(),
      enrolledAt: method?.verified_at?.toISOString() ?? null,
      recoveryCodesRemaining: count.remaining,
      currentSessionVerifiedAt: currentSessionVerifiedAt ?? null,
    };
  }
  private async accountLock(q: EntityManager, id: string, revision: string) {
    const [account]: { revision: string; role: string }[] = await q.query(
      "SELECT revision,role FROM webdev_accounts WHERE id=$1 FOR UPDATE",
      [id]
    );
    if (!account || account.revision !== revision)
      throw new UnauthorizedException("Sign in again");
    return account;
  }
  private async methodLock(
    q: EntityManager,
    id: string
  ): Promise<Method | undefined> {
    const rows: Method[] = await q.query(
      "SELECT * FROM webdev_mfa_methods WHERE account_id=$1 FOR UPDATE",
      [id]
    );
    return rows[0];
  }
  private async audit(
    q: EntityManager,
    role: string,
    action: string,
    allowed: boolean
  ) {
    await q.query(
      "INSERT INTO webdev_analytics_access_audit(event_id,occurred_at,actor,action,allowed) VALUES($1,now(),$2,$3,$4)",
      [
        randomUUID(),
        role === "admin" ? "site-owner" : "anonymous",
        action,
        allowed,
      ]
    );
  }
  private async proof(
    q: EntityManager,
    id: string,
    method: Method,
    code: string
  ): Promise<boolean> {
    if (method.locked_until && method.locked_until.getTime() > Date.now())
      return false;
    let valid = false;
    if (/^\d{6}$/.test(code) && method.secret_encrypted) {
      const step = this.crypto.matchStep(
        method.secret_encrypted,
        id,
        code,
        Number(method.last_step)
      );
      if (step !== null) {
        await q.query(
          "UPDATE webdev_mfa_methods SET last_step=$1,last_used_at=now(),attempts=0,locked_until=NULL WHERE account_id=$2",
          [step, id]
        );
        valid = true;
      }
    } else if (method.status === "verified") {
      const codes: { id: string; code_hash: string }[] = await q.query(
        "SELECT id,code_hash FROM webdev_mfa_recovery_codes WHERE account_id=$1 AND used_at IS NULL",
        [id]
      );
      for (const saved of codes) {
        if (await compare(code.toUpperCase(), saved.code_hash)) {
          await q.query(
            "UPDATE webdev_mfa_recovery_codes SET used_at=now() WHERE id=$1 AND used_at IS NULL",
            [saved.id]
          );
          await q.query(
            "UPDATE webdev_mfa_methods SET last_used_at=now(),attempts=0,locked_until=NULL WHERE account_id=$1",
            [id]
          );
          valid = true;
          break;
        }
      }
    }
    if (!valid)
      await q.query(
        "UPDATE webdev_mfa_methods SET attempts=CASE WHEN locked_until<=now() THEN 1 ELSE attempts+1 END,locked_until=CASE WHEN (CASE WHEN locked_until<=now() THEN 1 ELSE attempts+1 END)>=5 THEN now()+interval '15 minutes' ELSE NULL END WHERE account_id=$1",
        [id]
      );
    return valid;
  }
  private async codes(q: EntityManager, id: string): Promise<string[]> {
    const codes = Array.from({ length: 10 }, () =>
      randomBytes(10).toString("hex").toUpperCase().match(/.{5}/g)!.join("-")
    );
    const hashes = await Promise.all(codes.map((code) => hash(code, 10)));
    await q.query("DELETE FROM webdev_mfa_recovery_codes WHERE account_id=$1", [
      id,
    ]);
    for (const encoded of hashes)
      await q.query(
        "INSERT INTO webdev_mfa_recovery_codes(id,account_id,code_hash) VALUES($1,$2,$3)",
        [randomUUID(), id, encoded]
      );
    return codes;
  }
  assertRecentSignIn(issuedAt: string) {
    if (
      Date.now() - Date.parse(issuedAt) > 300000 ||
      !Number.isFinite(Date.parse(issuedAt))
    )
      throw new HttpException(
        {
          code: "RECENT_SIGN_IN_REQUIRED",
          message: "Sign in again before starting authenticator setup.",
        },
        403
      );
  }
  async enroll(account: OwnerAccount, issuedAt: string) {
    this.assertRecentSignIn(issuedAt);
    const setup = this.crypto.enrollment(account.id, account.username),
      enrollmentId = randomUUID();
    const expiresAt = await this.store.db.transaction(async (q) => {
      await this.accountLock(q, account.id, account.revision);
      const method = await this.methodLock(q, account.id);
      if (method?.status === "verified")
        throw new ConflictException(
          "Two-factor authentication is already enabled"
        );
      const [saved]: { enrollment_expires_at: Date }[] = await q.query(
        "INSERT INTO webdev_mfa_methods(account_id,method_id,status,secret_encrypted,enrollment_expires_at) VALUES($1,$2,'pending',$3,now()+interval '10 minutes') ON CONFLICT(account_id) DO UPDATE SET method_id=$2,status='pending',secret_encrypted=$3,enrollment_expires_at=now()+interval '10 minutes',last_step=-1,attempts=0,locked_until=NULL,verified_at=NULL,disabled_at=NULL RETURNING enrollment_expires_at",
        [account.id, enrollmentId, setup.encrypted]
      );
      await this.audit(q, account.role, "account.mfa.enroll", true);
      return saved.enrollment_expires_at.toISOString();
    });
    const { encrypted: _encrypted, ...publicSetup } = setup;
    return {
      setup: { ...publicSetup, enrollmentId, expiresAt },
      mfa: await this.status(account.id),
    };
  }
  async cancel(account: OwnerAccount) {
    await this.store.db.transaction(async (q) => {
      await this.accountLock(q, account.id, account.revision);
      await q.query(
        "UPDATE webdev_mfa_methods SET status='disabled',secret_encrypted=NULL,enrollment_expires_at=NULL,disabled_at=now() WHERE account_id=$1 AND status='pending'",
        [account.id]
      );
      await this.audit(q, account.role, "account.mfa.cancel", true);
    });
  }
  async verifyEnrollment(
    account: OwnerAccount,
    enrollmentId: string,
    code: string
  ) {
    const result = await this.store.db.transaction(async (q) => {
      await this.accountLock(q, account.id, account.revision);
      const method = await this.methodLock(q, account.id);
      if (
        !method ||
        method.status !== "pending" ||
        method.method_id !== enrollmentId ||
        !method.enrollment_expires_at ||
        method.enrollment_expires_at.getTime() <= Date.now()
      )
        throw new BadRequestException({
          code: "MFA_ENROLLMENT_EXPIRED",
          message: "Authenticator setup expired. Start again.",
        });
      if (!(await this.proof(q, account.id, method, code))) {
        await this.audit(q, account.role, "account.mfa.enable", false);
        return null;
      }
      const recoveryCodes = await this.codes(q, account.id),
        revision = randomUUID();
      await q.query(
        "UPDATE webdev_mfa_methods SET status='verified',verified_at=now(),enrollment_expires_at=NULL WHERE account_id=$1",
        [account.id]
      );
      await q.query(
        "UPDATE webdev_accounts SET revision=$1,updated_at=now() WHERE id=$2",
        [revision, account.id]
      );
      await this.audit(q, account.role, "account.mfa.enable", true);
      return { recoveryCodes, revision };
    });
    if (!result) throw invalid();
    return result;
  }
  async action(
    account: OwnerAccount,
    code: string,
    action: "disable" | "regenerate" | "step-up"
  ) {
    const result = await this.store.db.transaction(async (q) => {
      await this.accountLock(q, account.id, account.revision);
      const method = await this.methodLock(q, account.id);
      if (method?.status !== "verified")
        throw new BadRequestException(
          "Two-factor authentication is not enabled"
        );
      if (!(await this.proof(q, account.id, method, code))) {
        await this.audit(q, account.role, `account.mfa.${action}`, false);
        return null;
      }
      let recoveryCodes: string[] | undefined;
      if (action === "disable") {
        await q.query(
          "UPDATE webdev_mfa_methods SET status='disabled',secret_encrypted=NULL,disabled_at=now(),enrollment_expires_at=NULL WHERE account_id=$1",
          [account.id]
        );
        await q.query(
          "DELETE FROM webdev_mfa_recovery_codes WHERE account_id=$1",
          [account.id]
        );
        await q.query(
          "UPDATE webdev_accounts SET revision=$1,updated_at=now() WHERE id=$2",
          [randomUUID(), account.id]
        );
      } else if (action === "regenerate")
        recoveryCodes = await this.codes(q, account.id);
      await this.audit(q, account.role, `account.mfa.${action}`, true);
      return { recoveryCodes, verifiedAt: new Date().toISOString() };
    });
    if (!result) throw invalid();
    return result;
  }
  async challenge(account: OwnerAccount, authMethod: "password" | "github") {
    const token = randomBytes(32).toString("base64url"),
      expiresAt = new Date(Date.now() + 300000);
    const required = await this.store.db.transaction(async (q) => {
      await this.accountLock(q, account.id, account.revision);
      if ((await this.methodLock(q, account.id))?.status !== "verified")
        return false;
      await q.query(
        "DELETE FROM webdev_mfa_challenges WHERE expires_at<now()-interval '1 day'"
      );
      await q.query(
        "INSERT INTO webdev_mfa_challenges(token_hash,account_id,revision,auth_method,expires_at) VALUES($1,$2,$3,$4,$5)",
        [digest(token), account.id, account.revision, authMethod, expiresAt]
      );
      return true;
    });
    return required
      ? {
          mfaRequired: true as const,
          challengeToken: token,
          expiresAt: expiresAt.toISOString(),
        }
      : null;
  }
  private async pending(token?: string) {
    if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token))
      throw new UnauthorizedException("Verification expired. Sign in again.");
    const rows: Challenge[] = await this.store.db.query(
      "SELECT c.* FROM webdev_mfa_challenges c JOIN webdev_accounts a ON a.id=c.account_id AND a.revision=c.revision WHERE token_hash=$1 AND status='pending' AND attempts<5 AND expires_at>now()",
      [digest(token)]
    );
    if (!rows[0])
      throw new UnauthorizedException("Verification expired. Sign in again.");
    return rows[0];
  }
  async challengeStatus(token?: string) {
    const pending = await this.pending(token);
    return { expiresAt: pending.expires_at.toISOString() };
  }
  async cancelChallenge(token?: string) {
    if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token)) return;
    await this.store.db.query(
      "UPDATE webdev_mfa_challenges SET status='consumed',consumed_at=now() WHERE token_hash=$1 AND status='pending'",
      [digest(token)]
    );
  }
  async verifyChallenge(token: string | undefined, code: string) {
    const pending = await this.pending(token);
    const result = await this.store.db.transaction(async (q) => {
      const account = await this.accountLock(
        q,
        pending.account_id,
        pending.revision
      );
      const [challenge]: Challenge[] = await q.query(
        "SELECT * FROM webdev_mfa_challenges WHERE token_hash=$1 FOR UPDATE",
        [digest(token!)]
      );
      if (
        !challenge ||
        challenge.status !== "pending" ||
        challenge.attempts >= 5 ||
        challenge.expires_at.getTime() <= Date.now()
      )
        throw new UnauthorizedException("Verification expired. Sign in again.");
      const method = await this.methodLock(q, pending.account_id);
      if (method?.status !== "verified")
        throw new UnauthorizedException("Sign in again");
      const valid = await this.proof(q, pending.account_id, method, code);
      await q.query(
        "UPDATE webdev_mfa_challenges SET attempts=attempts+1,status=CASE WHEN $2 THEN 'consumed' WHEN attempts+1>=5 THEN 'locked' ELSE 'pending' END,consumed_at=CASE WHEN $2 THEN now() ELSE NULL END WHERE token_hash=$1",
        [digest(token!), valid]
      );
      await this.audit(q, account.role, "account.mfa.login", valid);
      return valid
        ? {
            accountId: pending.account_id,
            revision: pending.revision,
            verifiedAt: new Date().toISOString(),
            authMethod: pending.auth_method,
          }
        : null;
    });
    if (!result) throw invalid();
    return result;
  }
}
