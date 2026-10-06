import { randomUUID } from "crypto";
import {
  ForbiddenException,
  UnauthorizedException,
  type INestApplication,
} from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request = require("supertest");
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
import { MentorConversationStore } from "../conversation/mentor-conversation.store";
import { MentorProfileStore } from "../profile/mentor-profile.store";
import { MentorAccountAccess } from "../access/mentor-account-access";
import { MentorGenerationController } from "../api/mentor-generation.controller";
import { GenerationStore } from "./generation.store";
import { GenerationPrompt } from "./generation-prompt";
import { CloudflareProvider, type PromptMessage } from "./cloudflare-provider";
import { GenerationService } from "./generation.service";
import { PlanPrompt } from "../pathway/plan-prompt";
import { PlanGenerationStore } from "../pathway/plan-generation.store";
import { MentorPathwayStore } from "../pathway/mentor-pathway.store";
import type { ProviderUpdate } from "./provider-sse";

const integration =
  process.env.MENTOR_INTEGRATION_TEST === "true" ? describe : describe.skip;
integration("mentor generation ledger in disposable PostgreSQL", () => {
  let db: DataSource;
  let store: GenerationStore;
  let conversations: MentorConversationStore;
  const alice = randomUUID();
  const bob = randomUUID();
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
      ],
    });
    await db.initialize();
    await db.runMigrations();
    await db.query("TRUNCATE webdev_accounts CASCADE");
    await db.query("TRUNCATE webdev_ai_budget_buckets");
    store = new GenerationStore(db);
    conversations = new MentorConversationStore(db);
    for (const [id, name] of [
      [alice, "generation_alice"],
      [bob, "generation_bob"],
    ])
      await db.query(
        `INSERT INTO webdev_accounts(id,role,username,revision,display_name)
        VALUES($1,'client',$2,$3,$2)`,
        [id, name, randomUUID()]
      );
  }, 30000);
  afterAll(async () => {
    if (db?.isInitialized) await db.destroy();
  });

  it("atomically deduplicates, isolates ownership and settles one reservation", async () => {
    const conversation = await conversations.create(alice, "Learning CSS");
    const requestId = randomUUID();
    const [a, b] = await Promise.all([
      store.start(alice, conversation.id, requestId, "a".repeat(64), "CSS?"),
      store.start(alice, conversation.id, requestId, "a".repeat(64), "CSS?"),
    ]);
    expect(a.row.id).toBe(b.row.id);
    expect([a.duplicate, b.duplicate].sort()).toEqual([false, true]);
    expect(
      (await conversations.messages(alice, conversation.id, 50, null)).entries
    ).toHaveLength(1);
    await expect(
      store.start(alice, conversation.id, requestId, "b".repeat(64), "Other")
    ).rejects.toThrow();
    await expect(
      store.start(alice, conversation.id, randomUUID(), "c".repeat(64), "Again")
    ).rejects.toThrow();
    await expect(store.get(bob, a.row.id)).rejects.toThrow();
    expect(await store.markDispatched(alice, a.row.id)).toBe(true);
    const result = await store.finish(
      alice,
      a.row.id,
      "completed",
      "Start with flexbox.",
      { inputTokens: 90, outputTokens: 25 }
    );
    expect(result.state).toBe("completed");
    expect((await store.receipt(alice, a.row.id)).content).toBe(
      "Start with flexbox."
    );
    const [bucket] =
      await db.query(`SELECT reserved_neurons,consumed_neurons,request_count
      FROM webdev_ai_budget_buckets WHERE scope='global-day' AND subject_key='all'`);
    expect(bucket).toMatchObject({
      reserved_neurons: 0,
      consumed_neurons: 400,
      request_count: 1,
    });
    expect((await store.limits(alice)).dailyRemaining).toBe(14);
  });

  it("deduplicates simultaneous starts from independent database pools", async () => {
    const secondPool = new DataSource({
      type: "postgres",
      url: "postgres://postgres:test-local-only@127.0.0.1:55439/mentor_test",
    });
    await secondPool.initialize();
    try {
      const conversation = await conversations.create(alice, "Two instances");
      const requestId = randomUUID();
      const input = [
        alice,
        conversation.id,
        requestId,
        "9".repeat(64),
        "HTML?",
      ] as const;
      const [first, second] = await Promise.all([
        store.start(...input),
        new GenerationStore(secondPool).start(...input),
      ]);
      expect(first.row.id).toBe(second.row.id);
      expect([first.duplicate, second.duplicate].sort()).toEqual([false, true]);
      expect(
        (await conversations.messages(alice, conversation.id, 50, null)).entries
      ).toHaveLength(1);
      await store.finish(alice, first.row.id, "cancelled", "");
    } finally {
      await secondPool.destroy();
    }
  });

  it("releases a cancelled pre-dispatch reservation and retains dispatched unknown usage", async () => {
    const conversation = await conversations.create(bob, "Learning JS");
    const before = await store.start(
      bob,
      conversation.id,
      randomUUID(),
      "d".repeat(64),
      "JS?"
    );
    await store.cancel(bob, before.row.id);
    await store.finish(bob, before.row.id, "cancelled", "");
    const after = await store.start(
      bob,
      conversation.id,
      randomUUID(),
      "e".repeat(64),
      "Next?"
    );
    await store.markDispatched(bob, after.row.id);
    await db.query(
      `UPDATE webdev_mentor_generations SET lease_until=now()-interval '1 second' WHERE id=$1`,
      [after.row.id]
    );
    expect((await store.receipt(bob, after.row.id)).state).toBe("abandoned");
    const [bucket] =
      await db.query(`SELECT reserved_neurons,consumed_neurons FROM webdev_ai_budget_buckets
      WHERE scope='global-day' AND subject_key='all'`);
    expect(bucket).toMatchObject({
      reserved_neurons: 0,
      consumed_neurons: 800,
    });
  });

  it("rejects a sixth request in one UTC minute", async () => {
    const account = randomUUID();
    await db.query(
      `INSERT INTO webdev_accounts(id,role,username,revision,display_name)
      VALUES($1,'client','generation_quota',$2,'Quota')`,
      [account, randomUUID()]
    );
    const conversation = await conversations.create(account, "Limits");
    for (let i = 0; i < 5; i++) {
      const started = await store.start(
        account,
        conversation.id,
        randomUUID(),
        "f".repeat(64),
        `Question ${i}`
      );
      await store.finish(account, started.row.id, "failed", "");
    }
    await expect(
      store.start(
        account,
        conversation.id,
        randomUUID(),
        "f".repeat(64),
        "Sixth"
      )
    ).rejects.toMatchObject({ status: 429 });
    expect((await store.limits(account)).minuteRemaining).toBe(0);
  });

  it("caps active conversations even when creation is concurrent", async () => {
    const account = randomUUID();
    await db.query(
      `INSERT INTO webdev_accounts(id,role,username,revision,display_name)
      VALUES($1,'client','generation_conversation_cap',$2,'Cap')`,
      [account, randomUUID()]
    );
    const results = await Promise.allSettled(
      Array.from({ length: 11 }, (_, index) =>
        conversations.create(account, `Conversation ${index}`)
      )
    );
    expect(
      results.filter((result) => result.status === "fulfilled")
    ).toHaveLength(10);
    expect(
      results.filter((result) => result.status === "rejected")
    ).toHaveLength(1);
  });

  it("does not recreate a reply after its conversation is deleted", async () => {
    const account = randomUUID();
    await db.query(
      `INSERT INTO webdev_accounts(id,role,username,revision,display_name)
      VALUES($1,'client','generation_deleted',$2,'Deleted')`,
      [account, randomUUID()]
    );
    const conversation = await conversations.create(
      account,
      "Delete during answer"
    );
    const started = await store.start(
      account,
      conversation.id,
      randomUUID(),
      "2".repeat(64),
      "Question"
    );
    await store.markDispatched(account, started.row.id);
    await conversations.remove(account, conversation.id);
    const finished = await store.finish(
      account,
      started.row.id,
      "completed",
      "Too late"
    );
    expect(finished.state).toBe("cancelled");
    expect((await store.receipt(account, started.row.id)).messageId).toBeNull();
  });

  it("Stop aborts an active stream and preserves a partial answer", async () => {
    const account = randomUUID();
    await db.query(
      `INSERT INTO webdev_accounts(id,role,username,revision,display_name)
      VALUES($1,'client','generation_stop',$2,'Stop')`,
      [account, randomUUID()]
    );
    const profiles = new MentorProfileStore(db);
    await profiles.save(
      account,
      { goal: "frontend", level: "beginner", hours: 4, outcome: "A site" },
      null
    );
    const conversation = await conversations.create(account, "Stop test");
    class WaitingProvider extends CloudflareProvider {
      override async *stream(
        _messages: PromptMessage[],
        signal: AbortSignal
      ): AsyncGenerator<ProviderUpdate> {
        yield { kind: "text", text: "Partial answer" };
        if (!signal.aborted)
          await new Promise<void>((resolve) =>
            signal.addEventListener("abort", () => resolve(), { once: true })
          );
      }
    }
    const service = new GenerationService(
      store,
      new GenerationPrompt(profiles, conversations),
      new WaitingProvider(),
      new PlanPrompt(profiles, new MentorPathwayStore(db)),
      new PlanGenerationStore(db)
    );
    const started = await store.start(
      account,
      conversation.id,
      randomUUID(),
      "1".repeat(64),
      "Question"
    );
    const stream = service.run(
      account,
      conversation.id,
      started.row.id,
      "Question",
      started.remaining
    );
    expect((await stream.next()).value).toMatchObject({
      event: "text_delta",
      delta: "Partial answer",
    });
    expect((await service.cancel(account, started.row.id)).state).toBe(
      "cancel_requested"
    );
    expect((await stream.next()).value).toMatchObject({
      event: "cancelled",
      partial: true,
    });
    await stream.next();
    expect(await store.receipt(account, started.row.id)).toMatchObject({
      state: "cancelled",
      content: "Partial answer",
      partial: true,
    });
  });

  it("streams one private English mock reply and returns a duplicate receipt", async () => {
    const account = randomUUID();
    await db.query(
      `INSERT INTO webdev_accounts(id,role,username,revision,display_name)
      VALUES($1,'client','generation_http',$2,'HTTP')`,
      [account, randomUUID()]
    );
    const profiles = new MentorProfileStore(db);
    await profiles.save(
      account,
      {
        goal: "frontend",
        level: "beginner",
        hours: 4,
        outcome: "Build a site",
      },
      null
    );
    const conversation = await conversations.create(account, "A question");
    const previous = {
      AI_MENTOR_ENABLED: process.env.AI_MENTOR_ENABLED,
      AI_GENERATION_ENABLED: process.env.AI_GENERATION_ENABLED,
      AI_MENTOR_BETA_ACCOUNT_IDS: process.env.AI_MENTOR_BETA_ACCOUNT_IDS,
      AI_PROVIDER_MODE: process.env.AI_PROVIDER_MODE,
    };
    Object.assign(process.env, {
      AI_MENTOR_ENABLED: "true",
      AI_GENERATION_ENABLED: "true",
      AI_MENTOR_BETA_ACCOUNT_IDS: account,
      AI_PROVIDER_MODE: "mock",
    });
    const generation = new GenerationService(
      store,
      new GenerationPrompt(profiles, conversations),
      new CloudflareProvider(),
      new PlanPrompt(profiles, new MentorPathwayStore(db)),
      new PlanGenerationStore(db)
    );
    const module = await Test.createTestingModule({
      controllers: [MentorGenerationController],
      providers: [
        {
          provide: MentorAccountAccess,
          useValue: {
            accountId: async (
              req: { get: (key: string) => string | undefined },
              _action: string,
              write: boolean
            ) => {
              if (write && req.get("origin") !== "http://mentor.test")
                throw new ForbiddenException();
              const id = req.get("x-test-account");
              if (!id) throw new UnauthorizedException();
              return id;
            },
          },
        },
        { provide: GenerationService, useValue: generation },
      ],
    }).compile();
    const app: INestApplication = module.createNestApplication();
    await app.init();
    try {
      const path = `/api/mentor/conversations/${conversation.id}/messages`;
      const payload = {
        content: "How do I learn CSS?",
        clientRequestId: randomUUID(),
        intent: "chat",
      };
      await request(app.getHttpServer())
        .post(path)
        .set("origin", "http://mentor.test")
        .send(payload)
        .expect(401);
      await request(app.getHttpServer())
        .post(path)
        .set("x-test-account", account)
        .send(payload)
        .expect(403);
      process.env.AI_GENERATION_ENABLED = "false";
      const disabled = await request(app.getHttpServer())
        .post(path)
        .set("x-test-account", account)
        .set("origin", "http://mentor.test")
        .send(payload)
        .expect(503);
      expect(disabled.body.code).toBe("GENERATION_DISABLED");
      process.env.AI_GENERATION_ENABLED = "true";
      const streamed = await request(app.getHttpServer())
        .post(path)
        .set("x-test-account", account)
        .set("origin", "http://mentor.test")
        .send(payload)
        .expect(200);
      expect(streamed.headers["content-type"]).toContain("text/event-stream");
      expect(streamed.text).toContain("event: accepted");
      expect(streamed.text).toContain("event: text_delta");
      expect(streamed.text).toContain("event: completed");
      expect(streamed.text).not.toContain("reasoning");
      const duplicate = await request(app.getHttpServer())
        .post(path)
        .set("x-test-account", account)
        .set("origin", "http://mentor.test")
        .send(payload)
        .expect(200);
      expect(duplicate.body.state).toBe("completed");
      expect(duplicate.body.content).toContain("one small web project");
      await request(app.getHttpServer())
        .get(`/api/mentor/generations/${duplicate.body.generationId}`)
        .set("x-test-account", bob)
        .expect(404);
      expect(
        (await conversations.messages(account, conversation.id, 50, null))
          .entries
      ).toHaveLength(2);
    } finally {
      await app.close();
      for (const [key, value] of Object.entries(previous)) {
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
      }
    }
  });
});
