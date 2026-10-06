import { Injectable } from "@nestjs/common";
import {
  DEADLINE_MS,
  MAX_OUTPUT_TOKENS,
  MODEL,
  PLAN_OUTPUT_TOKENS,
} from "./generation-config";
import { readProviderSse, type ProviderUpdate } from "./provider-sse";
import { PLAN_SCHEMA } from "../pathway/plan-proposal";
import { throwProviderHttpError } from "./provider-errors";

export type PromptMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

@Injectable()
export class CloudflareProvider {
  async completePlan(
    messages: PromptMessage[],
    signal: AbortSignal
  ): Promise<{
    value: unknown;
    usage?: { inputTokens: number; outputTokens: number; neurons?: number };
  }> {
    if (process.env.AI_PROVIDER_MODE === "mock") {
      const profileText = messages[0]?.content.match(/^Profile: (.+)$/m)?.[1];
      const profile = profileText
        ? JSON.parse(profileText)
        : { goal: "explore" };
      const evidenceText = messages[0]?.content.match(
        /selected evidence: (.+)$/m
      )?.[1];
      const evidence = evidenceText
        ? (JSON.parse(evidenceText) as { id: string }[])
        : [];
      const sourceId = evidence[0]?.id;
      return {
        value: {
          goal: profile.goal,
          assumptions: ["Practice with a small project each week."],
          rationale: "Start with a small result and build on it each week.",
          sourceIds: sourceId ? [sourceId] : [],
          milestones: Array.from({ length: 8 }, (_, index) => ({
            week: Math.floor(index / 2) + 1,
            title: `Practice milestone ${index + 1}`,
            doneWhen: `A working example for milestone ${index + 1} is saved.`,
            hours: 0.5,
            sourceIds: sourceId && index === 0 ? [sourceId] : [],
          })),
        },
        usage: { inputTokens: 100, outputTokens: 250, neurons: 10 },
      };
    }
    const account = process.env.CLOUDFLARE_ACCOUNT_ID;
    const token =
      process.env.CLOUDFLARE_AI_API_TOKEN || process.env.CLOUDFLARE_API_TOKEN;
    if (!account || !token) throw new Error("Provider unavailable");
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(account)}/ai/run/${MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
          stream: false,
          max_tokens: PLAN_OUTPUT_TOKENS,
          response_format: { type: "json_schema", json_schema: PLAN_SCHEMA },
        }),
        signal: AbortSignal.any([signal, AbortSignal.timeout(DEADLINE_MS)]),
      }
    );
    if (!response.ok) await throwProviderHttpError(response);
    if (Number(response.headers.get("content-length")) > 65536)
      throw new Error("Provider response too large");
    const body = await response.text();
    if (body.length > 65536) throw new Error("Provider response too large");
    const envelope = JSON.parse(body) as {
      success?: boolean;
      result?: {
        response?: unknown;
        choices?: { finish_reason?: string; message?: { content?: unknown } }[];
        usage?: Record<string, unknown>;
      };
    };
    if (envelope.success === false || !envelope.result)
      throw new Error("Provider unavailable");
    const result = envelope.result;
    const choice = result.choices?.[0];
    if (choice?.finish_reason === "length")
      throw new Error("Incomplete provider response");
    const content = result.response ?? choice?.message?.content;
    const value = typeof content === "string" ? JSON.parse(content) : content;
    if (!value || typeof value !== "object")
      throw new Error("Invalid provider response");
    return {
      value,
      usage: result.usage
        ? {
            inputTokens:
              Number(result.usage.prompt_tokens ?? result.usage.input_tokens) ||
              0,
            outputTokens:
              Number(
                result.usage.completion_tokens ?? result.usage.output_tokens
              ) || 0,
            neurons: Number(result.usage.total_neurons) || undefined,
          }
        : undefined,
    };
  }

  async *stream(
    messages: PromptMessage[],
    signal: AbortSignal
  ): AsyncGenerator<ProviderUpdate> {
    if (process.env.AI_PROVIDER_MODE === "mock") {
      yield {
        kind: "text",
        text: "Choose one small web project, then build and review it this week.",
      };
      yield { kind: "usage", inputTokens: 100, outputTokens: 20, neurons: 1.8 };
      return;
    }
    const account = process.env.CLOUDFLARE_ACCOUNT_ID;
    const token =
      process.env.CLOUDFLARE_AI_API_TOKEN || process.env.CLOUDFLARE_API_TOKEN;
    if (!account || !token) throw new Error("Provider unavailable");
    const url = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(account)}/ai/run/${MODEL}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        stream: true,
        max_tokens: MAX_OUTPUT_TOKENS,
      }),
      signal: AbortSignal.any([signal, AbortSignal.timeout(DEADLINE_MS)]),
    });
    if (!response.ok) await throwProviderHttpError(response);
    if (
      !response.body ||
      !response.headers.get("content-type")?.includes("text/event-stream")
    )
      throw new Error("Provider unavailable");
    yield* readProviderSse(response.body);
  }
}
