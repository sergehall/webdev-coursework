import { randomUUID } from "crypto";
import {
  ForbiddenException,
  UnauthorizedException,
  type INestApplication,
} from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request = require("supertest");
import { DataSource } from "typeorm";
import { AddQrAnalytics1790899200000 } from "../db/migrations/2026/10/1790899200000-AddQrAnalytics";
import { AddPublicAccounts1790902800000 } from "../db/migrations/2026/10/1790902800000-AddPublicAccounts";
import { UseAdminAndClientRoles1790906400000 } from "../db/migrations/2026/10/1790906400000-UseAdminAndClientRoles";
import { IndexSecurityActivity1790910000000 } from "../db/migrations/2026/10/1790910000000-IndexSecurityActivity";
import { AddAccountMfa1790913600000 } from "../db/migrations/2026/10/1790913600000-AddAccountMfa";
import { AddAccountPreferences1790917200000 } from "../db/migrations/2026/10/1790917200000-AddAccountPreferences";
import { AddAccountSessions1790920800000 } from "../db/migrations/2026/10/1790920800000-AddAccountSessions";
import { AddAccountProviders1790924400000 } from "../db/migrations/2026/10/1790924400000-AddAccountProviders";
import { AddMentorWorkspace1791244800000 } from "../db/migrations/2026/10/1791244800000-AddMentorWorkspace";
import { AddMentorGenerations1791248400000 } from "../db/migrations/2026/10/1791248400000-AddMentorGenerations";
import { AddMentorPlanGeneration1791252000000 } from "../db/migrations/2026/10/1791252000000-AddMentorPlanGeneration";
import { MentorProfileStore } from "./profile/mentor-profile.store";
import { MentorConversationStore } from "./conversation/mentor-conversation.store";
import { MentorPathwayStore } from "./pathway/mentor-pathway.store";
import { MentorController } from "./api/mentor.controller";
import { MentorAccountAccess } from "./access/mentor-account-access";
import { GenerationStore } from "./generation/generation.store";
import { MentorMaintenanceService } from "./maintenance/mentor-maintenance.service";

const integration =
  process.env.MENTOR_INTEGRATION_TEST === "true" ? describe : describe.skip;
integration("mentor workspace PostgreSQL integration", () => {
  let db: DataSource;
  let profiles: MentorProfileStore;
  let conversations: MentorConversationStore;
  let paths: MentorPathwayStore;
  const alice = randomUUID();
  const bob = randomUUID();
  beforeAll(async () => {
    db = new DataSource({
      type: "postgres",
      // Dedicated disposable container only. Never use the application's database.
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
    profiles = new MentorProfileStore(db);
    conversations = new MentorConversationStore(db);
    paths = new MentorPathwayStore(db);
    for (const [id, username] of [
      [alice, "mentor_alice"],
      [bob, "mentor_bob"],
    ])
      await db.query(
        `INSERT INTO webdev_accounts(id,role,username,revision,display_name)
         VALUES($1,'client',$2,$3,$2)`,
        [id, username, randomUUID()]
      );
  }, 30000);
  afterAll(async () => {
    if (db?.isInitialized) await db.destroy();
  });

  it("applies the full account release migration chain", async () => {
    expect(await db.showMigrations()).toBe(false);
    const tables: { table_name: string }[] = await db.query(
      `SELECT table_name FROM information_schema.tables WHERE table_name LIKE 'webdev_%'`
    );
    expect(tables.map((row) => row.table_name)).toContain(
      "webdev_learning_milestone_progress"
    );
    expect(tables.map((row) => row.table_name)).toContain(
      "webdev_mentor_generations"
    );
  });

  it("keeps profiles and conversation history within their account", async () => {
    const input = {
      goal: "frontend" as const,
      level: "beginner" as const,
      hours: 5,
      outcome: "A portfolio",
    };
    const saved = await profiles.save(alice, input, null);
    expect(saved?.version).toBe(1);
    await expect(profiles.save(alice, input, null)).rejects.toThrow();
    expect(await profiles.get(bob)).toBeNull();
    const conversation = await conversations.create(alice, "First question");
    await conversations.add(
      alice,
      conversation.id,
      "user",
      "Where do I start?"
    );
    expect(
      (await conversations.messages(alice, conversation.id, 50, null)).entries
    ).toHaveLength(1);
    await expect(
      conversations.messages(bob, conversation.id, 50, null)
    ).rejects.toThrow();
    await expect(
      conversations.add(bob, conversation.id, "user", "Intrusion")
    ).rejects.toThrow();
    await expect(conversations.remove(bob, conversation.id)).rejects.toThrow();
    expect((await conversations.list(bob, 10, null)).entries).toHaveLength(0);
    await expect(
      db.query(
        `INSERT INTO webdev_mentor_messages(id,conversation_id,account_id,sequence,role,content)
       VALUES($1,$2,$3,99,'user','invalid')`,
        [randomUUID(), conversation.id, bob]
      )
    ).rejects.toThrow();
  });

  it("accepts immutable revisions and checks profile, path, and progress versions", async () => {
    const milestones = Array.from({ length: 8 }, (_, i) => ({
      id: `step-${i}`,
      week: Math.floor(i / 2) + 1,
      title: `Step ${i}`,
      doneWhen: "Show a working example",
      hours: 2.5,
    }));
    const proposal = await paths.propose(alice, milestones, 1);
    await expect(paths.proposal(bob, proposal.id)).rejects.toThrow();
    await expect(paths.accept(bob, proposal.id, 0, 1)).rejects.toThrow();
    await expect(paths.accept(alice, proposal.id, 1, 1)).rejects.toThrow();
    const path = await paths.accept(alice, proposal.id, 0, 1);
    expect(path?.version).toBe(1);
    expect(path?.milestones).toEqual(milestones);
    await expect(paths.accept(alice, proposal.id, 0, 1)).rejects.toThrow();
    const first = await paths.progress(alice, "step-0", "done", null, 1);
    expect(first.version).toBe(1);
    await expect(
      paths.progress(alice, "step-0", "pending", null, 1)
    ).rejects.toThrow();
    await expect(
      paths.progress(alice, "step-0", "pending", 1, 2)
    ).rejects.toThrow();
    await expect(
      paths.progress(bob, "step-0", "done", null, 1)
    ).rejects.toThrow();
    expect((await paths.current(alice))?.progress).toHaveLength(1);
    expect(await paths.current(bob)).toBeNull();
    const revised = await profiles.save(
      alice,
      { goal: "backend", level: "foundations", hours: 6, outcome: "An API" },
      1
    );
    expect(revised?.version).toBe(2);
    await expect(paths.propose(alice, milestones, 1)).rejects.toThrow();
    expect((await paths.revisions(alice, 10, null)).entries).toHaveLength(1);
    expect((await paths.revisions(bob, 10, null)).entries).toHaveLength(0);
  });

  it("deletes only the requesting account's workspace", async () => {
    const bobProfile = {
      goal: "explore" as const,
      level: "beginner" as const,
      hours: 4,
      outcome: "",
    };
    await profiles.save(bob, bobProfile, null);
    const bobConversation = await conversations.create(bob, "Keep this");
    await paths.deleteWorkspace(alice);
    expect(await profiles.get(alice)).toBeNull();
    expect(await paths.current(alice)).toBeNull();
    expect((await conversations.list(alice, 10, null)).entries).toHaveLength(0);
    expect(await profiles.get(bob)).not.toBeNull();
    expect((await conversations.list(bob, 10, null)).entries[0].id).toBe(
      bobConversation.id
    );
  });

  it("exposes the private HTTP contract with validation and no-store responses", async () => {
    const charlie = randomUUID();
    await db.query(
      `INSERT INTO webdev_accounts(id,role,username,revision,display_name)
       VALUES($1,'client','mentor_charlie',$2,'Charlie')`,
      [charlie, randomUUID()]
    );
    const module = await Test.createTestingModule({
      controllers: [MentorController],
      providers: [
        {
          provide: MentorAccountAccess,
          useValue: {
            accountId: async (
              req: { get: (name: string) => string | undefined },
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
        { provide: MentorProfileStore, useValue: profiles },
        { provide: MentorConversationStore, useValue: conversations },
        { provide: MentorPathwayStore, useValue: paths },
        { provide: GenerationStore, useValue: new GenerationStore(db) },
      ],
    }).compile();
    const app: INestApplication = module.createNestApplication();
    await app.init();
    try {
      const server = app.getHttpServer();
      const denied = await request(server)
        .get("/api/mentor/bootstrap")
        .expect(401);
      expect(denied.body.code).toBe("SIGN_IN_REQUIRED");
      expect(denied.headers["cache-control"]).toContain("no-store");
      await request(server)
        .put("/api/mentor/profile")
        .set("x-test-account", charlie)
        .send({ goal: "frontend" })
        .expect(403);
      const saved = await request(server)
        .put("/api/mentor/profile")
        .set("x-test-account", charlie)
        .set("origin", "http://mentor.test")
        .send({
          goal: "frontend",
          level: "beginner",
          hours: 4,
          outcome: "Portfolio",
          expectedVersion: null,
        })
        .expect(200);
      expect(saved.body.version).toBe(1);
      const bootstrap = await request(server)
        .get("/api/mentor/bootstrap")
        .set("x-test-account", charlie)
        .expect(200);
      expect(bootstrap.body.profile.outcome).toBe("Portfolio");
      const created = await request(server)
        .post("/api/mentor/conversations")
        .set("x-test-account", charlie)
        .set("origin", "http://mentor.test")
        .send({ title: "A question" })
        .expect(201);
      const alien = await request(server)
        .get(`/api/mentor/conversations/${created.body.id}/messages`)
        .set("x-test-account", bob)
        .expect(404);
      expect(alien.body.code).toBe("NOT_FOUND");
    } finally {
      await app.close();
    }
  });

  it("retains recent work, removes inactive history, and preserves active generations", async () => {
    const account = randomUUID();
    await db.query(
      `INSERT INTO webdev_accounts(id,role,username,revision,display_name)
       VALUES($1,'client','mentor_retention',$2,'Retention')`,
      [account, randomUUID()]
    );
    const old = await conversations.create(account, "Old conversation");
    await conversations.add(account, old.id, "user", "Old private content");
    const active = await conversations.create(account, "Active generation");
    const recent = await conversations.create(account, "Recent conversation");
    await profiles.save(
      account,
      { goal: "frontend", level: "beginner", hours: 4, outcome: "" },
      null
    );
    const proposal = await paths.propose(
      account,
      Array.from({ length: 8 }, (_, index) => ({
        id: `retention-${index}`,
        week: Math.floor(index / 2) + 1,
        title: `Practice ${index}`,
        doneWhen: "Show a working example",
        hours: 2,
      })),
      1
    );
    await db.query(
      `UPDATE webdev_learning_path_revisions
       SET created_at=now()-interval '31 days' WHERE id=$1`,
      [proposal.id]
    );
    const generations = new GenerationStore(db);
    const running = await generations.start(
      account,
      active.id,
      randomUUID(),
      "a".repeat(64),
      "Current question"
    );
    await db.query(
      `UPDATE webdev_mentor_conversations
       SET updated_at=now()-interval '91 days' WHERE id=ANY($1::uuid[])`,
      [[old.id, active.id]]
    );
    await db.query(
      `INSERT INTO webdev_ai_budget_buckets(scope,subject_key,period_start)
       VALUES('account-minute',$1,now()-interval '3 days')`,
      [account]
    );
    const maintenance = new MentorMaintenanceService(db, generations);
    const counts = await maintenance.run();
    expect(counts).toMatchObject({
      conversations: 1,
      proposals: 1,
      budgetBuckets: 1,
    });
    expect(
      (await conversations.list(account, 10, null)).entries.map((row) => row.id)
    ).toEqual(expect.arrayContaining([active.id, recent.id]));
    await expect(
      conversations.messages(account, old.id, 10, null)
    ).rejects.toThrow();
    expect((await generations.get(account, running.row.id)).state).toBe(
      "reserved"
    );
    expect((await maintenance.run())?.conversations).toBe(0);
    await generations.finish(account, running.row.id, "cancelled", "");
    expect((await maintenance.run())?.conversations).toBe(1);
    await db.query(
      `UPDATE webdev_mentor_generations
       SET created_at=now()-interval '31 days' WHERE id=$1`,
      [running.row.id]
    );
    expect((await maintenance.run())?.generations).toBe(1);
  });
});
