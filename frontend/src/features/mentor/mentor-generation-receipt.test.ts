import { describe, expect, it } from "vitest";

import { mergeGenerationReceipt } from "./mentor-generation-receipt";

describe("generation recovery", () => {
  it("replaces an interrupted plan placeholder with the validated draft notice", () => {
    const messages = mergeGenerationReceipt(
      [{ id: "pending-1", role: "assistant", text: "Building…" }],
      {
        generationId: "g",
        state: "completed",
        userMessageId: "u",
        messageId: "a",
        proposalId: "p",
        content: null,
        partial: false,
        failureCode: null,
      },
      "Build a plan",
      "pending-1"
    );
    expect(messages.map((message) => message.id)).toEqual(["u", "a"]);
    expect(messages[1].text).toContain("draft is ready");
  });
});
