import { Injectable } from "@nestjs/common";
import { DEADLINE_MS, MAX_OUTPUT_TOKENS, MODEL } from "./generation-config";
import { readProviderSse, type ProviderUpdate } from "./provider-sse";

export type PromptMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

@Injectable()
export class CloudflareProvider {
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
    if (
      !response.ok ||
      !response.body ||
      !response.headers.get("content-type")?.includes("text/event-stream")
    )
      throw new Error("Provider unavailable");
    yield* readProviderSse(response.body);
  }
}
