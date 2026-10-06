export type ProviderUpdate =
  | { kind: "text"; text: string }
  | {
      kind: "usage";
      inputTokens: number;
      outputTokens: number;
      neurons?: number;
    }
  | { kind: "finish"; reason: string };

function positiveUsage(value: unknown): number | null {
  return Number.isSafeInteger(value) && (value as number) >= 0
    ? (value as number)
    : null;
}

/** Only answer text and terminal usage cross the Cloudflare boundary. */
export function parseProviderEvent(data: string): ProviderUpdate[] {
  if (data === "[DONE]") return [];
  let payload: unknown;
  try {
    payload = JSON.parse(data);
  } catch {
    throw new Error("Invalid provider event");
  }
  if (!payload || typeof payload !== "object") return [];
  const event = payload as Record<string, unknown>;
  if (cloudflareQuotaCode(event)) throw new CloudflareQuotaExhaustedError();
  if (event.success === false || event.error || event.type === "error")
    throw new Error("Provider reported failure");
  const choices = Array.isArray(event.choices) ? event.choices : [];
  const first = choices[0] as Record<string, unknown> | undefined;
  const delta = first?.delta as Record<string, unknown> | undefined;
  const updates: ProviderUpdate[] = [];
  if (typeof delta?.content === "string" && delta.content)
    updates.push({ kind: "text", text: delta.content });
  if (typeof first?.finish_reason === "string")
    updates.push({ kind: "finish", reason: first.finish_reason });
  const usage = event.usage as Record<string, unknown> | undefined;
  const inputTokens = positiveUsage(usage?.prompt_tokens);
  const outputTokens = positiveUsage(usage?.completion_tokens);
  if (inputTokens !== null && outputTokens !== null)
    updates.push({
      kind: "usage",
      inputTokens,
      outputTokens,
      ...(typeof usage?.neurons === "number" &&
      Number.isFinite(usage.neurons) &&
      usage.neurons >= 0
        ? { neurons: usage.neurons }
        : {}),
    });
  return updates;
}

export async function* readProviderSse(
  body: ReadableStream<Uint8Array>
): AsyncGenerator<ProviderUpdate> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let bytes = 0;
  let doneMarker = false;
  let textSeen = false;
  try {
    while (true) {
      const { value, done } = await reader.read();
      bytes += value?.byteLength ?? 0;
      if (bytes > 512_000) throw new Error("Provider stream too large");
      buffer += decoder.decode(value, { stream: !done });
      const frames = buffer.split(/\r?\n\r?\n/);
      buffer = frames.pop() ?? "";
      for (const frame of frames) {
        const data = frame
          .split(/\r?\n/)
          .filter((line) => line.startsWith("data:"))
          .map((line) => line.slice(5).trimStart())
          .join("\n");
        if (data === "[DONE]") {
          doneMarker = true;
          continue;
        }
        if (data) {
          const updates = parseProviderEvent(data);
          if (!textSeen && !updates.some((update) => update.kind === "text")) {
            const last = JSON.parse(data) as { response?: unknown };
            if (typeof last.response === "string" && last.response)
              updates.unshift({ kind: "text", text: last.response });
          }
          for (const update of updates) {
            if (update.kind === "text") textSeen = true;
            yield update;
          }
        }
      }
      if (done) break;
    }
    if (buffer.trim()) throw new Error("Incomplete provider stream");
    if (!doneMarker)
      throw new Error("Provider stream ended without completion marker");
  } finally {
    reader.releaseLock();
  }
}
import {
  CloudflareQuotaExhaustedError,
  cloudflareQuotaCode,
} from "./provider-errors";
