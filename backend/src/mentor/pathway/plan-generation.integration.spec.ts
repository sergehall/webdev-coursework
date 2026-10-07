import { randomUUID } from "node:crypto";
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
import { ArchiveMentorPathProgress1791331200000 } from "../../db/migrations/2026/10/1791331200000-ArchiveMentorPathProgress";
import { MentorProfileStore } from "../profile/mentor-profile.store";
import { MentorConversationStore } from "../conversation/mentor-conversation.store";
import { MentorPathwayStore } from "./mentor-pathway.store";
import { PlanPrompt } from "./plan-prompt";
import { PlanGenerationStore } from "./plan-generation.store";
import { GenerationStore } from "../generation/generation.store";
import { CloudflareProvider } from "../generation/cloudflare-provider";
import { validatePlanProposal } from "./plan-proposal";
import {
  GenerationService,
  type AppEvent,
} from "../generation/generation.service";

const integration =
  process.env.MENTOR_INTEGRATION_TEST === "true" ? describe : describe.skip;
integration("mentor plan generation in disposable PostgreSQL", () => {
  let db: DataSource;
  let profiles: MentorProfileStore;
  let conversations: MentorConversationStore;
  let pathways: MentorPathwayStore;
  let generations: GenerationStore;
  let service: GenerationService;
  const account = randomUUID();
  const other = randomUUID();
  let conversationId: string;
  let otherConversationId: string;
  const previousMode = process.env.AI_PROVIDER_MODE;

  beforeAll(async () => {
    process.env.AI_PROVIDER_MODE = "mock";
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
      ],
    });
    await db.initialize();
    await db.runMigrations();
    await db.query("TRUNCATE webdev_accounts CASCADE");
    await db.query("TRUNCATE webdev_ai_budget_buckets");
    for (const [id, username] of [
      [account, "plan_owner"],
      [other, "plan_other"],
    ])
      await db.query(
        `INSERT INTO webdev_accounts(id,role,username,revision,display_name)
         VALUES($1,'client',$2,$3,$2)`,
        [id, username, randomUUID()]
      );
    profiles = new MentorProfileStore(db);
    conversations = new MentorConversationStore(db);
    pathways = new MentorPathwayStore(db);
    generations = new GenerationStore(db);
    service = new GenerationService(
      generations,
      // The plan path has its own prompt; chat prompt is unused here.
      {} as ConstructorParameters<typeof GenerationService>[1],
      new CloudflareProvider(),
      new PlanPrompt(profiles, pathways),
      new PlanGenerationStore(db)
    );
    await profiles.save(
      account,
      {
        goal: "frontend",
        level: "beginner",
        hours: 3,
        outcome: "Build a site",
      },
      null
    );
    await profiles.save(
      other,
      {
        goal: "backend",
        level: "foundations",
        hours: 4,
        outcome: "Build an API",
      },
      null
    );
    conversationId = (await conversations.create(account, "Learning plan")).id;
    otherConversationId = (await conversations.create(other, "Other plan")).id;
  }, 30000);
  afterAll(async () => {
    process.env.AI_PROVIDER_MODE = previousMode;
    if (db?.isInitialized) await db.destroy();
  });

  async function generate(requestId = randomUUID()) {
    const started = await generations.start(
      account,
      conversationId,
      requestId,
      "a".repeat(64),
      "Build a plan",
      "propose_plan"
    );
    const events: AppEvent[] = [];
    for await (const event of service.runPlan(
      account,
      started.row.id,
      "Build a plan",
      started.remaining
    ))
      events.push(event);
    return { started, events };
  }

  it("creates a sourced draft, accepts it, and preserves unchanged progress on revision", async () => {
    const first = await generate();
    const completed = first.events.find((event) => event.event === "completed");
    expect(completed).toMatchObject({ event: "completed", remaining: 14 });
    if (!completed || completed.event !== "completed" || !completed.proposalId)
      throw new Error("Missing proposal");
    const proposal = await pathways.proposal(account, completed.proposalId);
    expect(proposal.content).toHaveLength(8);
    expect(proposal.metadata?.sources).toHaveLength(1);
    await expect(
      pathways.proposal(other, completed.proposalId)
    ).rejects.toBeDefined();
    let path = await pathways.accept(account, proposal.id, 0, 1);
    expect(path?.version).toBe(1);
    const milestoneId = proposal.content[0].id;
    await pathways.progress(account, milestoneId, "done", null, 1);
    const revised = await generate();
    const second = revised.events.find((event) => event.event === "completed");
    if (!second || second.event !== "completed" || !second.proposalId)
      throw new Error("Missing revision");
    path = await pathways.accept(account, second.proposalId, 1, 1);
    expect(path?.version).toBe(2);
    expect(path?.progress).toContainEqual({
      milestone_id: milestoneId,
      status: "done",
      version: 1,
    });
    expect(
      await generations.receipt(account, revised.started.row.id)
    ).toMatchObject({
      state: "completed",
      proposalId: second.proposalId,
    });
    const [budget]: { reserved_neurons: number; consumed_neurons: number }[] =
      await db.query(
        `SELECT reserved_neurons,consumed_neurons FROM webdev_ai_budget_buckets
         WHERE scope='global-day' AND subject_key='all'`
      );
    expect(budget).toMatchObject({
      reserved_neurons: 0,
      consumed_neurons: 800,
    });
  });

  it("deduplicates the request and never publishes a cancelled draft", async () => {
    const requestId = randomUUID();
    const first = await generations.start(
      account,
      conversationId,
      requestId,
      "b".repeat(64),
      "Cancel plan",
      "propose_plan"
    );
    const duplicate = await generations.start(
      account,
      conversationId,
      requestId,
      "b".repeat(64),
      "Cancel plan",
      "propose_plan"
    );
    expect(duplicate.duplicate).toBe(true);
    await generations.cancel(account, first.row.id);
    const events: AppEvent[] = [];
    for await (const event of service.runPlan(
      account,
      first.row.id,
      "Cancel plan",
      first.remaining
    ))
      events.push(event);
    expect(events.at(-1)).toMatchObject({ event: "cancelled" });
    expect(await generations.receipt(account, first.row.id)).toMatchObject({
      state: "cancelled",
      proposalId: null,
    });
    const rows: { count: string }[] = await db.query(
      "SELECT count(*)::text AS count FROM webdev_learning_path_revisions WHERE generation_id=$1",
      [first.row.id]
    );
    expect(rows[0].count).toBe("0");
  });

  it("rejects invalid provider output without creating a proposal", async () => {
    class InvalidProvider extends CloudflareProvider {
      override async completePlan() {
        return { value: { goal: "backend", milestones: [] } };
      }
    }
    const invalid = new GenerationService(
      generations,
      {} as ConstructorParameters<typeof GenerationService>[1],
      new InvalidProvider(),
      new PlanPrompt(profiles, pathways),
      new PlanGenerationStore(db)
    );
    const started = await generations.start(
      other,
      otherConversationId,
      randomUUID(),
      "c".repeat(64),
      "Build a plan",
      "propose_plan"
    );
    const events: AppEvent[] = [];
    for await (const event of invalid.runPlan(
      other,
      started.row.id,
      "Build a plan",
      started.remaining
    ))
      events.push(event);
    expect(events.at(-1)).toMatchObject({
      event: "failed",
      code: "INVALID_PLAN",
    });
    expect(await generations.receipt(other, started.row.id)).toMatchObject({
      state: "failed",
      proposalId: null,
    });
  });

  it("rejects a stale profile before publishing a model result", async () => {
    const started = await generations.start(
      other,
      otherConversationId,
      randomUUID(),
      "d".repeat(64),
      "Revise plan",
      "propose_plan"
    );
    const context = await new PlanPrompt(profiles, pathways).build(
      other,
      "Revise plan"
    );
    await generations.markDispatched(other, started.row.id);
    const result = await new CloudflareProvider().completePlan(
      context.messages,
      new AbortController().signal
    );
    const plan = validatePlanProposal(
      result.value,
      context.profile,
      context.evidence
    );
    await profiles.save(
      other,
      {
        goal: "backend",
        level: "foundations",
        hours: 5,
        outcome: "Build an API",
      },
      1
    );
    await expect(
      new PlanGenerationStore(db).complete(
        other,
        started.row.id,
        plan,
        context.profile.version,
        context.baseRevision,
        context.evidence.catalogVersion,
        result.usage
      )
    ).rejects.toThrow("PROFILE_CHANGED");
    await generations.finish(
      other,
      started.row.id,
      "failed",
      "",
      result.usage,
      "PROFILE_CHANGED"
    );
    expect(await generations.receipt(other, started.row.id)).toMatchObject({
      state: "failed",
      proposalId: null,
    });
  });

  it("does not apply completed work to different milestones after a goal change", async () => {
    const previous = await pathways.current(account);
    expect(previous?.version).toBe(2);
    if (!previous) throw new Error("Missing accepted path");
    const completedId = previous?.progress[0].milestone_id;
    expect(completedId).toBeDefined();
    const changed = await profiles.save(
      account,
      {
        goal: "backend",
        level: "foundations",
        hours: 3,
        outcome: "Build an API",
      },
      1
    );
    expect(changed?.version).toBe(2);
    if (!changed) throw new Error("Missing updated profile");
    const revision = await generate();
    const completed = revision.events.find(
      (event) => event.event === "completed"
    );
    if (!completed || completed.event !== "completed" || !completed.proposalId)
      throw new Error("Missing revised proposal");
    const accepted = await pathways.accept(
      account,
      completed.proposalId,
      previous.version,
      changed.version
    );
    expect(accepted?.version).toBe(3);
    expect(accepted?.milestones.some((step) => step.id === completedId)).toBe(
      false
    );
    expect(accepted?.progress).toEqual([]);
    const history = (await pathways.revisions(account, 10, null)).entries;
    expect(history).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          revision: 2,
          progress_snapshot: expect.arrayContaining([
            expect.objectContaining({
              milestoneId: completedId,
              status: "done",
            }),
          ]),
        }),
      ])
    );
    expect((await pathways.revisions(other, 10, null)).entries).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ revision: 2 })])
    );
  });
});
