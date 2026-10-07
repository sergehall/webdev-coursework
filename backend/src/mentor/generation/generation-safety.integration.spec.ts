import { randomUUID } from "crypto";
import { DataSource } from "typeorm";
import { AddQrAnalytics1790899200000 } from "../../db/migrations/2026/10/1790899200000-AddQrAnalytics";
import { AddPublicAccounts1790902800000 } from "../../db/migrations/2026/10/1790902800000-AddPublicAccounts";
import { UseAdminAndClientRoles1790906400000 } from "../../db/migrations/2026/10/1790906400000-UseAdminAndClientRoles";
import { IndexSecurityActivity1790910000000 } from "../../db/migrations/2026/10/1790910000000-IndexSecurityActivity";
import { AddAccountMfa1790913600000 } from "../../db/migrations/2026/10/1790913600000-AddAccountMfa";
import { AddAccountPreferences1790917200000 } from "../../db/migrations/2026/10/1790917200000-AddAccountPreferences";
import { AddAccountSessions1790920800000 } from "../../db/migrations/2026/10/1790920800000-AddAccountSessions";
import { AddAccountProviders1790924400000 } from "../../db/migrations/2026/10/1790924400000-AddAccountProviders";
import { AddMentorWorkspace1791244800000 } from "../../db/migrations/2026/10/1791244800000-AddMentorWorkspace";
import { AddMentorGenerations1791248400000 } from "../../db/migrations/2026/10/1791248400000-AddMentorGenerations";
import { AddMentorPlanGeneration1791252000000 } from "../../db/migrations/2026/10/1791252000000-AddMentorPlanGeneration";
import { AddMentorGenerationPause1791255600000 } from "../../db/migrations/2026/10/1791255600000-AddMentorGenerationPause";
import { AddMentorAccountControls1791334800000 } from "../../db/migrations/2026/10/1791334800000-AddMentorAccountControls";
import type { MailProvider } from "../../accounts/mail/auth-mail.contract";
import {
  BudgetAlertDelivery,
  BUDGET_ALERT_RECIPIENT,
} from "../alerts/budget-alert-mail";
import { MentorConversationStore } from "../conversation/mentor-conversation.store";
import { GenerationStore } from "./generation.store";

const integration =
  process.env.MENTOR_INTEGRATION_TEST === "true" ? describe : describe.skip;

integration("mentor global budget pause and owner alert", () => {
  let db: DataSource;
  let second: DataSource;
  let store: GenerationStore;
  const alice = randomUUID();
  const bob = randomUUID();
  let aliceConversation: string;
  let bobConversation: string;

  beforeAll(async () => {
    const url =
      "postgres://postgres:test-local-only@127.0.0.1:55439/mentor_test";
    db = new DataSource({
      type: "postgres",
      url,
      migrations: [
        AddQrAnalytics1790899200000,
        AddPublicAccounts1790902800000,
        UseAdminAndClientRoles1790906400000,
        IndexSecurityActivity1790910000000,
        AddAccountMfa1790913600000,
        AddAccountPreferences1790917200000,
        AddAccountSessions1790920800000,
        AddAccountProviders1790924400000,
        AddMentorWorkspace1791244800000,
        AddMentorGenerations1791248400000,
        AddMentorPlanGeneration1791252000000,
        AddMentorGenerationPause1791255600000,
        AddMentorAccountControls1791334800000,
      ],
    });
    second = new DataSource({ type: "postgres", url });
    await db.initialize();
    await db.runMigrations();
    await second.initialize();
    await db.query("TRUNCATE webdev_accounts CASCADE");
    await db.query(
      "TRUNCATE webdev_ai_budget_buckets,webdev_ai_budget_alerts,webdev_ai_control_audit"
    );
    await db.query(
      "UPDATE webdev_ai_generation_control SET muted_at=NULL,reason=NULL WHERE id=1"
    );
    store = new GenerationStore(db);
    const conversations = new MentorConversationStore(db);
    for (const [id, username] of [
      [alice, "safety_alice"],
      [bob, "safety_bob"],
    ])
      await db.query(
        `INSERT INTO webdev_accounts(id,role,username,revision,display_name)
         VALUES($1,'client',$2,$3,$2)`,
        [id, username, randomUUID()]
      );
    aliceConversation = (await conversations.create(alice, "Safety A")).id;
    bobConversation = (await conversations.create(bob, "Safety B")).id;
  }, 30000);

  afterAll(async () => {
    if (db?.isInitialized) {
      await db.query(
        "UPDATE webdev_ai_generation_control SET muted_at=NULL,reason=NULL WHERE id=1"
      );
      await db.query(
        "TRUNCATE webdev_ai_budget_alerts,webdev_ai_control_audit,webdev_ai_budget_buckets"
      );
      await db.destroy();
    }
    if (second?.isInitialized) await second.destroy();
  });

  it("pauses atomically across pools at the app budget and queues one alert", async () => {
    const day = new Date();
    day.setUTCHours(0, 0, 0, 0);
    await db.query(
      `INSERT INTO webdev_ai_budget_buckets
       (scope,subject_key,period_start,consumed_neurons)
       VALUES('global-day','all',$1,7600)`,
      [day.toISOString()]
    );
    const first = await store.start(
      alice,
      aliceConversation,
      randomUUID(),
      "a".repeat(64),
      "Question A"
    );
    expect(await store.markDispatched(alice, first.row.id)).toBe(true);
    const input = [
      bob,
      bobConversation,
      randomUUID(),
      "b".repeat(64),
      "Question B",
    ] as const;
    const attempts = await Promise.allSettled([
      store.start(...input),
      new GenerationStore(second).start(
        bob,
        bobConversation,
        randomUUID(),
        "c".repeat(64),
        "Question C"
      ),
    ]);
    expect(attempts.every((result) => result.status === "rejected")).toBe(true);
    const [control] = await db.query(
      "SELECT reason,muted_at FROM webdev_ai_generation_control WHERE id=1"
    );
    expect(control.reason).toBe("app_budget");
    expect(control.muted_at).not.toBeNull();
    const [count] = await db.query(
      "SELECT count(*)::integer AS count FROM webdev_ai_budget_alerts"
    );
    expect(count.count).toBe(1);
    expect(
      (await new GenerationStore(second).limits(bob)).generationPaused
    ).toBe(true);
    await store.finish(alice, first.row.id, "completed", "Answer");
  });

  it("retries mail without new alerts and keeps the same message ID", async () => {
    const sent: {
      id: string;
      recipient: string;
      text: string;
      html: string;
    }[] = [];
    let fail = true;
    const provider: MailProvider = {
      send: async (mail) => {
        sent.push(mail);
        if (fail) throw new Error("temporary SMTP failure");
      },
    };
    const delivery = new BudgetAlertDelivery(db, provider);
    expect(await delivery.deliverOne()).toBe(true);
    const [retry] = await db.query(
      "SELECT status FROM webdev_ai_budget_alerts"
    );
    expect(retry.status).toBe("pending");
    await db.query("UPDATE webdev_ai_budget_alerts SET next_attempt_at=now()");
    fail = false;
    expect(await delivery.deliverOne()).toBe(true);
    expect(await delivery.deliverOne()).toBe(false);
    expect(sent).toHaveLength(2);
    expect(sent[0].id).toBe(sent[1].id);
    expect(sent[1].recipient).toBe(BUDGET_ALERT_RECIPIENT);
    expect(sent[1].text).toContain("8,000");
    expect(sent[1].text).not.toContain("API token");
    const [final] = await db.query(
      "SELECT status FROM webdev_ai_budget_alerts"
    );
    expect(final.status).toBe("sent");
  });

  it("pauses and queues mail when the final admitted request settles at the cap", async () => {
    await db.query(
      "UPDATE webdev_ai_generation_control SET muted_at=NULL,reason=NULL WHERE id=1"
    );
    await db.query(
      `UPDATE webdev_ai_budget_buckets SET consumed_neurons=7600
       WHERE scope='global-day' AND subject_key='all'`
    );
    const last = await store.start(
      bob,
      bobConversation,
      randomUUID(),
      "e".repeat(64),
      "Last free request"
    );
    expect(await store.markDispatched(bob, last.row.id)).toBe(true);
    await store.finish(bob, last.row.id, "completed", "Answer");
    expect((await store.limits(bob)).generationPaused).toBe(true);
    const [pending] = await db.query(
      "SELECT count(*)::integer AS count FROM webdev_ai_budget_alerts WHERE status='pending'"
    );
    expect(pending.count).toBe(1);
    await db.query(
      "DELETE FROM webdev_ai_budget_alerts WHERE status='pending'"
    );
  });

  it("records a distinct Cloudflare quota event only after an explicit resume", async () => {
    await db.query(
      "UPDATE webdev_ai_generation_control SET muted_at=NULL,reason=NULL WHERE id=1"
    );
    await db.query(
      "UPDATE webdev_ai_budget_buckets SET consumed_neurons=0 WHERE scope='global-day'"
    );
    const pending = await store.start(
      alice,
      aliceConversation,
      randomUUID(),
      "d".repeat(64),
      "Question D"
    );
    await Promise.all([
      store.pauseForCloudflareQuota(),
      new GenerationStore(second).pauseForCloudflareQuota(),
    ]);
    expect(await store.markDispatched(alice, pending.row.id)).toBe(false);
    await store.finish(alice, pending.row.id, "cancelled", "");
    const [control] = await db.query(
      "SELECT reason FROM webdev_ai_generation_control WHERE id=1"
    );
    expect(control.reason).toBe("cloudflare_quota");
    const [count] = await db.query(
      "SELECT count(*)::integer AS count FROM webdev_ai_budget_alerts"
    );
    expect(count.count).toBe(2);
  });

  it("keeps the last per-account daily slot atomic across independent pools", async () => {
    const account = randomUUID();
    await db.query(
      `INSERT INTO webdev_accounts(id,role,username,revision,display_name)
       VALUES($1,'client',$2,$3,'Boundary learner')`,
      [account, `boundary_${account.slice(0, 8)}`, randomUUID()]
    );
    const conversation = (
      await new MentorConversationStore(db).create(account, "Daily boundary")
    ).id;
    const day = new Date();
    day.setUTCHours(0, 0, 0, 0);
    await db.query(
      `INSERT INTO webdev_ai_budget_buckets
       (scope,subject_key,period_start,request_count)
       VALUES('account-day',$1,$2,14)
       ON CONFLICT(scope,subject_key,period_start)
       DO UPDATE SET request_count=14`,
      [account, day.toISOString()]
    );
    await db.query(
      "UPDATE webdev_ai_generation_control SET muted_at=NULL,reason=NULL WHERE id=1"
    );
    const attempts = await Promise.allSettled([
      store.start(account, conversation, randomUUID(), "e".repeat(64), "One"),
      new GenerationStore(second).start(
        account,
        conversation,
        randomUUID(),
        "f".repeat(64),
        "Two"
      ),
    ]);
    const admitted = attempts.filter(
      (
        result
      ): result is PromiseFulfilledResult<
        Awaited<ReturnType<GenerationStore["start"]>>
      > => result.status === "fulfilled"
    );
    expect(admitted).toHaveLength(1);
    expect(
      attempts.filter((result) => result.status === "rejected")
    ).toHaveLength(1);
    await store.finish(account, admitted[0].value.row.id, "cancelled", "");
    await expect(
      new GenerationStore(second).start(
        account,
        conversation,
        randomUUID(),
        "a".repeat(64),
        "Three"
      )
    ).rejects.toMatchObject({
      status: 429,
      response: { code: "USER_LIMIT_REACHED" },
    });
    expect((await store.limits(account)).dailyRemaining).toBe(0);
    const [bucket] = await db.query(
      `SELECT request_count FROM webdev_ai_budget_buckets
       WHERE scope='account-day' AND subject_key=$1 AND period_start=$2`,
      [account, day.toISOString()]
    );
    expect(bucket.request_count).toBe(15);
  });
});
