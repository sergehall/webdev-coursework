import { afterEach, describe, expect, it, vi } from "vitest";

import {
  parseGenerationStream,
  sendGeneration,
} from "./mentor-generation-client";

function splitStream(text: string) {
  const bytes = new TextEncoder().encode(text);
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (let i = 0; i < bytes.length; i += 2)
        controller.enqueue(bytes.slice(i, i + 2));
      controller.close();
    },
  });
}

describe("mentor app SSE parser", () => {
  afterEach(() => vi.restoreAllMocks());
  it("reassembles split UTF-8, CRLF and multiple frames", async () => {
    const raw = [
      'event: accepted\r\ndata: {"event":"accepted","generationId":"g","userMessageId":"u"}\r\n\r\n',
      'event: text_delta\ndata: {"event":"text_delta","delta":"café","sequence":1}\n\n',
      'event: completed\ndata: {"event":"completed","messageId":"m","remaining":14}\n\n',
    ].join("");
    const events = [];
    for await (const event of parseGenerationStream(splitStream(raw)))
      events.push(event);
    expect(events.map((event) => event.event)).toEqual([
      "accepted",
      "text_delta",
      "completed",
    ]);
    expect(events[1]).toMatchObject({ delta: "café", sequence: 1 });
  });
  it("rejects mismatched event names", async () => {
    const read = async () => {
      for await (const _ of parseGenerationStream(
        splitStream(
          'event: completed\ndata: {"event":"failed","code":"AI_UNAVAILABLE"}\n\n'
        )
      ))
        void _;
    };
    await expect(read()).rejects.toThrow();
  });
  it("shows a durable budget pause without suggesting an immediate retry", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ code: "GENERATION_PAUSED" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      })
    );
    await expect(
      sendGeneration(
        "conversation",
        "Question",
        "request",
        "chat",
        new AbortController().signal,
        () => undefined
      )
    ).rejects.toMatchObject({
      code: "GENERATION_PAUSED",
      message: expect.stringContaining("paused"),
    });
  });
});
