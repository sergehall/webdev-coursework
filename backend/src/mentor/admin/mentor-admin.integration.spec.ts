import { randomUUID } from "crypto";
import { DataSource } from "typeorm";
import { AccountStore } from "../../accounts/store/account.store";
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
import { ArchiveMentorPathProgress1791331200000 } from "../../db/migrations/2026/10/1791331200000-ArchiveMentorPathProgress";
import { AddMentorAccountControls1791334800000 } from "../../db/migrations/2026/10/1791334800000-AddMentorAccountControls";
import { MentorConversationStore } from "../conversation/mentor-conversation.store";
import { GenerationStore } from "../generation/generation.store";
import { MentorAdminStore } from "./mentor-admin.store";

const integration =
  process.env.MENTOR_INTEGRATION_TEST === "true" ? describe : describe.skip;

integration("Mentor admin usage and per-account controls", () => {
  let db: DataSource;
  let admin: MentorAdminStore;
  let generations: GenerationStore;
  let conversations: MentorConversationStore;
  const alice = randomUUID();
  const bob = randomUUID();
  const root = AccountStore.ROOT_ID;

  beforeAll(async () => {
    db = new DataSource({
      type: "postgres",
      url: "postgres://postgres:test-local-only@127.0.0.1:55439/mentor_test",
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
        ArchiveMentorPathProgress1791331200000,
        AddMentorAccountControls1791334800000,
      ],
    });
    await db.initialize();
    await db.runMigrations();
    await db.query("TRUNCATE webdev_accounts CASCADE");
    await db.query("TRUNCATE webdev_ai_budget_buckets");
    await db.query(
      "UPDATE webdev_ai_generation_control SET muted_at=NULL,reason=NULL WHERE id=1"
    );
    for (const [id, role, name] of [
      [root, "admin", "mentor_root"],
      [alice, "client", "mentor_alice"],
      [bob, "client", "mentor_bob"],
    ])
      await db.query(
        `INSERT INTO webdev_accounts(id,role,username,revision,display_name)
         VALUES($1,$2,$3,$4,$3)`,
        [id, role, name, randomUUID()]
      );
    admin = new MentorAdminStore(db);
    generations = new GenerationStore(db);
    conversations = new MentorConversationStore(db);
  }, 30000);

  afterAll(async () => {
    if (db?.isInitialized) await db.destroy();
  });

  it("reports per-account usage and distinguishes known tokens from budget Neurons", async () => {
    const conversation = await conversations.create(alice, "HTML study");
    const first = await generations.start(
      alice,
      conversation.id,
      randomUUID(),
      "a".repeat(64),
      "How do I start?"
    );
    await generations.markDispatched(alice, first.row.id);
    await generations.finish(
      alice,
      first.row.id,
      "completed",
      "Start with HTML.",
      {
        inputTokens: 24,
        outputTokens: 8,
      }
    );
    const second = await generations.start(
      alice,
      conversation.id,
      randomUUID(),
      "b".repeat(64),
      "And CSS?"
    );
    await generations.markDispatched(alice, second.row.id);
    await generations.finish(alice, second.row.id, "cancelled", "");

    const report = await admin.usage(30, 1);
    expect(report.totals).toMatchObject({
      requestCount: 2,
      completedCount: 1,
      activeAccounts: 1,
      inputTokens: 24,
      outputTokens: 8,
      tokenReportedCount: 1,
      accountedNeurons: 800,
    });
    expect(report.entries[0]).toMatchObject({
      id: alice,
      requestCount: 2,
      tokenReportedCount: 1,
      disabledAt: null,
    });
    expect(report.entries.some((entry) => entry.id === bob)).toBe(true);
  });

  it("blocks new generation and cancels active work while preserving saved history", async () => {
    const conversation = await conversations.create(alice, "CSS study");
    const active = await generations.start(
      alice,
      conversation.id,
      randomUUID(),
      "c".repeat(64),
      "Explain CSS"
    );
    expect(await admin.setGenerationEnabled(alice, false, root)).toEqual({
      enabled: false,
    });
    expect((await generations.get(alice, active.row.id)).state).toBe(
      "cancel_requested"
    );
    expect(await generations.markDispatched(alice, active.row.id)).toBe(false);
    expect((await generations.limits(alice)).accountDisabled).toBe(true);
    await expect(
      generations.start(
        alice,
        conversation.id,
        randomUUID(),
        "d".repeat(64),
        "Try again"
      )
    ).rejects.toMatchObject({ status: 403 });
    expect(
      (await conversations.messages(alice, conversation.id, 10, null)).entries
    ).toHaveLength(1);
    await generations.finish(alice, active.row.id, "cancelled", "");
    expect(await admin.setGenerationEnabled(alice, true, root)).toEqual({
      enabled: true,
    });
    expect((await generations.limits(alice)).accountDisabled).toBe(false);
    const resumed = await generations.start(
      alice,
      conversation.id,
      randomUUID(),
      "e".repeat(64),
      "Continue"
    );
    await generations.finish(alice, resumed.row.id, "cancelled", "");
    await expect(
      admin.setGenerationEnabled(root, false, root)
    ).rejects.toMatchObject({ status: 400 });
    const [{ count }]: { count: string }[] = await db.query(
      "SELECT count(*)::text AS count FROM webdev_ai_account_control_audit WHERE account_id=$1",
      [alice]
    );
    expect(Number(count)).toBe(2);
  });

  it("serializes a generation start against an administrator disable", async () => {
    const second = new DataSource({
      type: "postgres",
      url: "postgres://postgres:test-local-only@127.0.0.1:55439/mentor_test",
    });
    await second.initialize();
    try {
      const conversation = await conversations.create(bob, "Concurrent access");
      const started = new GenerationStore(second).start(
        bob,
        conversation.id,
        randomUUID(),
        "f".repeat(64),
        "Can I learn CSS?"
      );
      const disabled = admin.setGenerationEnabled(bob, false, root);
      const [attempt] = await Promise.allSettled([started, disabled] as const);
      expect(await disabled).toEqual({ enabled: false });
      if (attempt.status === "fulfilled") {
        expect((await generations.get(bob, attempt.value.row.id)).state).toBe(
          "cancel_requested"
        );
        await generations.finish(bob, attempt.value.row.id, "cancelled", "");
      } else {
        expect(attempt.reason).toMatchObject({ status: 403 });
      }
      await expect(
        generations.start(
          bob,
          conversation.id,
          randomUUID(),
          "g".repeat(64),
          "Another question"
        )
      ).rejects.toMatchObject({ status: 403 });
    } finally {
      await second.destroy();
    }
  });
});
