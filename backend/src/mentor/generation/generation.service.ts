import { Injectable } from "@nestjs/common";
import { createHash } from "crypto";
import { CloudflareProvider } from "./cloudflare-provider";
import { assertGenerationReady, DEADLINE_MS } from "./generation-config";
import { GenerationPrompt } from "./generation-prompt";
import { GenerationStore } from "./generation.store";
import { PlanPrompt } from "../pathway/plan-prompt";
import { PlanGenerationStore } from "../pathway/plan-generation.store";
import { validatePlanProposal } from "../pathway/plan-proposal";
import { CloudflareQuotaExhaustedError } from "./provider-errors";

export type AppEvent =
  | { event: "accepted"; generationId: string; userMessageId: string | null }
  | { event: "text_delta"; delta: string; sequence: number }
  | { event: "progress"; stage: "planning" }
  | {
      event: "completed";
      messageId: string | null;
      remaining: number;
      proposalId?: string;
    }
  | { event: "failed"; code: string; partial: boolean; canRetry: boolean }
  | { event: "cancelled"; partial: boolean };

@Injectable()
export class GenerationService {
  private readonly running = new Map<string, AbortController>();
  constructor(
    private readonly store: GenerationStore,
    private readonly prompt: GenerationPrompt,
    private readonly provider: CloudflareProvider,
    private readonly planPrompt: PlanPrompt,
    private readonly planStore: PlanGenerationStore
  ) {}

  async start(
    accountId: string,
    conversationId: string,
    requestId: string,
    content: string,
    intent: "chat" | "propose_plan" = "chat"
  ) {
    assertGenerationReady(accountId);
    const hash = createHash("sha256")
      .update(JSON.stringify({ conversationId, content, intent }))
      .digest("hex");
    return this.store.start(
      accountId,
      conversationId,
      requestId,
      hash,
      content,
      intent
    );
  }

  async cancel(accountId: string, generationId: string) {
    const row = await this.store.cancel(accountId, generationId);
    this.running.get(generationId)?.abort("cancelled");
    return { generationId: row.id, state: row.state };
  }

  receipt(accountId: string, id: string) {
    return this.store.receipt(accountId, id);
  }

  async *runPlan(
    accountId: string,
    id: string,
    request: string,
    remaining: number
  ): AsyncGenerator<AppEvent> {
    const controller = new AbortController();
    this.running.set(id, controller);
    let timedOut = false;
    const deadline = setTimeout(() => {
      timedOut = true;
      controller.abort("timeout");
    }, DEADLINE_MS);
    const cancelPoll = setInterval(() => {
      void this.store
        .cancelled(accountId, id)
        .then((cancelled) => {
          if (cancelled) controller.abort("cancelled");
        })
        .catch(() => controller.abort("storage"));
    }, 500);
    try {
      const context = await this.planPrompt.build(accountId, request);
      if (
        controller.signal.aborted ||
        !(await this.store.markDispatched(accountId, id))
      ) {
        await this.store.finish(accountId, id, "cancelled", "");
        yield { event: "cancelled", partial: false };
        return;
      }
      yield { event: "progress", stage: "planning" };
      const response = this.provider.completePlan(
        context.messages,
        controller.signal
      );
      let result: Awaited<
        ReturnType<CloudflareProvider["completePlan"]>
      > | null = null;
      while (!result) {
        let timer: ReturnType<typeof setTimeout> | undefined;
        try {
          result = await Promise.race([
            response,
            new Promise<null>((resolve) => {
              timer = setTimeout(() => resolve(null), 10_000);
            }),
          ]);
        } finally {
          clearTimeout(timer);
        }
        if (!result) yield { event: "progress", stage: "planning" };
      }
      if (
        controller.signal.aborted ||
        (await this.store.cancelled(accountId, id))
      ) {
        await this.store.finish(accountId, id, "cancelled", "", result.usage);
        yield { event: "cancelled", partial: false };
        return;
      }
      const plan = validatePlanProposal(
        result.value,
        context.profile,
        context.evidence
      );
      const saved = await this.planStore.complete(
        accountId,
        id,
        plan,
        context.profile.version,
        context.baseRevision,
        context.evidence.catalogVersion,
        result.usage
      );
      if (saved.state === "cancelled") {
        await this.store.finish(accountId, id, "cancelled", "", result.usage);
        yield { event: "cancelled", partial: false };
      } else if (saved.state === "failed") {
        yield {
          event: "failed",
          code: "AI_TIMEOUT",
          partial: false,
          canRetry: true,
        };
      } else {
        yield {
          event: "completed",
          messageId: saved.messageId!,
          proposalId: saved.proposalId,
          remaining,
        };
      }
    } catch (error) {
      const quotaExhausted = error instanceof CloudflareQuotaExhaustedError;
      if (quotaExhausted) await this.store.pauseForCloudflareQuota();
      const reason = error instanceof Error ? error.message : "";
      const code = quotaExhausted
        ? "GENERATION_PAUSED"
        : timedOut || reason === "AI_TIMEOUT"
          ? "AI_TIMEOUT"
          : [
                "INVALID_PLAN",
                "PROFILE_CHANGED",
                "PATH_CHANGED",
                "WORKSPACE_CHANGED",
              ].includes(reason)
            ? reason
            : "AI_UNAVAILABLE";
      const cancelled = controller.signal.reason === "cancelled";
      const row = await this.store.finish(
        accountId,
        id,
        cancelled ? "cancelled" : "failed",
        "",
        undefined,
        cancelled ? undefined : code
      );
      if (row.state === "cancelled")
        yield { event: "cancelled", partial: false };
      else
        yield {
          event: "failed",
          code,
          partial: false,
          canRetry: !quotaExhausted,
        };
    } finally {
      clearTimeout(deadline);
      clearInterval(cancelPoll);
      this.running.delete(id);
    }
  }

  async *run(
    accountId: string,
    conversationId: string,
    id: string,
    question: string,
    remaining: number
  ): AsyncGenerator<AppEvent> {
    const controller = new AbortController();
    this.running.set(id, controller);
    let text = "";
    let usage:
      | { inputTokens: number; outputTokens: number; neurons?: number }
      | undefined;
    let sequence = 0;
    let truncated = false;
    let deadlineReached = false;
    const deadline = setTimeout(() => {
      deadlineReached = true;
      controller.abort("timeout");
    }, DEADLINE_MS);
    const cancelPoll = setInterval(() => {
      void this.store
        .cancelled(accountId, id)
        .then((cancelled) => {
          if (cancelled) controller.abort("cancelled");
        })
        .catch(() => controller.abort("storage"));
    }, 500);
    try {
      const messages = await this.prompt.build(
        accountId,
        conversationId,
        question
      );
      if (
        controller.signal.aborted ||
        !(await this.store.markDispatched(accountId, id))
      ) {
        await this.store.finish(accountId, id, "cancelled", "");
        yield { event: "cancelled", partial: false };
        return;
      }
      if (
        controller.signal.aborted ||
        (await this.store.cancelled(accountId, id))
      ) {
        await this.store.finish(accountId, id, "cancelled", "");
        yield { event: "cancelled", partial: false };
        return;
      }
      for await (const update of this.provider.stream(
        messages,
        controller.signal
      )) {
        if (
          controller.signal.aborted ||
          (await this.store.cancelled(accountId, id))
        ) {
          controller.abort("cancelled");
          break;
        }
        if (update.kind === "usage") {
          usage = update;
          continue;
        }
        if (update.kind === "finish") {
          truncated = update.reason === "length";
          continue;
        }
        if (text.length + update.text.length > 4000)
          throw new Error("Response bound exceeded");
        text += update.text;
        await this.store.markStreaming(accountId, id);
        yield { event: "text_delta", delta: update.text, sequence: ++sequence };
      }
      if (controller.signal.aborted) {
        const cancelled = controller.signal.reason === "cancelled";
        const code = deadlineReached ? "AI_TIMEOUT" : "AI_UNAVAILABLE";
        const row = await this.store.finish(
          accountId,
          id,
          cancelled ? "cancelled" : "failed",
          text,
          usage,
          cancelled ? undefined : code
        );
        yield row.state === "cancelled"
          ? { event: "cancelled", partial: Boolean(text) }
          : {
              event: "failed",
              code: row.state === "abandoned" ? "AI_TIMEOUT" : code,
              partial: Boolean(text),
              canRetry: true,
            };
        return;
      }
      if (!text.trim() || truncated)
        throw new Error("Incomplete provider response");
      const row = await this.store.finish(
        accountId,
        id,
        "completed",
        text,
        usage
      );
      if (row.state === "cancelled") {
        yield { event: "cancelled", partial: Boolean(text) };
      } else {
        yield {
          event: "completed",
          messageId: row.assistant_message_id,
          remaining,
        };
      }
    } catch (error) {
      const quotaExhausted = error instanceof CloudflareQuotaExhaustedError;
      if (quotaExhausted) await this.store.pauseForCloudflareQuota();
      const code = quotaExhausted
        ? "GENERATION_PAUSED"
        : deadlineReached
          ? "AI_TIMEOUT"
          : "AI_UNAVAILABLE";
      const row = await this.store.finish(
        accountId,
        id,
        "failed",
        text,
        usage,
        code
      );
      if (row.state === "cancelled")
        yield { event: "cancelled", partial: Boolean(text) };
      else
        yield {
          event: "failed",
          code,
          partial: Boolean(text),
          canRetry: !quotaExhausted,
        };
    } finally {
      clearTimeout(deadline);
      clearInterval(cancelPoll);
      this.running.delete(id);
    }
  }
}
