import { parseProviderEvent, readProviderSse } from "./provider-sse";

function chunks(parts: string[]): ReadableStream<Uint8Array> {
  const bytes = new TextEncoder().encode(parts.join(""));
  return new ReadableStream({
    start(controller) {
      for (let i = 0; i < bytes.length; i += 3)
        controller.enqueue(bytes.slice(i, i + 3));
      controller.close();
    },
  });
}

describe("Cloudflare SSE boundary", () => {
  it("reassembles split UTF-8 and emits only answer text and usage", async () => {
    const stream = chunks([
      `data: ${JSON.stringify({ choices: [{ delta: { content: "café", reasoning_content: "secret" } }], prompt_text: "private" })}\r\n\r\n`,
      `data: ${JSON.stringify({ choices: [{ finish_reason: "stop" }], usage: { prompt_tokens: 10, completion_tokens: 4, neurons: 1.1 } })}\n\n`,
      "data: [DONE]\n\n",
    ]);
    const output = [];
    for await (const event of readProviderSse(stream)) output.push(event);
    expect(output).toEqual([
      { kind: "text", text: "café" },
      { kind: "finish", reason: "stop" },
      { kind: "usage", inputTokens: 10, outputTokens: 4, neurons: 1.1 },
    ]);
    expect(JSON.stringify(output)).not.toContain("secret");
  });
  it("fails closed on provider errors and incomplete streams", async () => {
    expect(() => parseProviderEvent('{"error":"failure"}')).toThrow();
    const consume = async () => {
      for await (const _ of readProviderSse(
        chunks(['data: {"choices":[]}\n\n'])
      ))
        void _;
    };
    await expect(consume()).rejects.toThrow();
  });
});
