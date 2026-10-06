import type { Message } from "./mentor-demo";
import type { GenerationReceipt } from "./mentor-generation-client";

export function mergeGenerationReceipt(
  messages: Message[],
  receipt: GenerationReceipt,
  input: string,
  pendingId: string
): Message[] {
  let result = messages;
  if (
    receipt.userMessageId &&
    !result.some((message) => message.id === receipt.userMessageId)
  )
    result = [
      ...result,
      { id: receipt.userMessageId, role: "user", text: input },
    ];
  if (receipt.content && receipt.messageId)
    result = [
      ...result.filter(
        (message) =>
          message.id !== pendingId && message.id !== receipt.messageId
      ),
      {
        id: receipt.messageId,
        role: "assistant",
        text: receipt.content,
        partial: receipt.partial,
      },
    ];
  else if (receipt.proposalId && receipt.messageId)
    result = [
      ...result.filter((message) => message.id !== pendingId),
      {
        id: receipt.messageId,
        role: "assistant",
        text: "Your four-week draft is ready. Review the milestones and sources in My path before accepting it.",
      },
    ];
  else if (["failed", "cancelled", "abandoned"].includes(receipt.state))
    result = result.filter((message) => message.id !== pendingId);
  return result;
}

export function receiptOutcome(receipt: GenerationReceipt) {
  switch (receipt.state) {
    case "completed":
      return { error: "", notice: "Response saved.", retry: "none" } as const;
    case "cancelled":
      return { error: "", notice: "Response stopped.", retry: "none" } as const;
    case "failed":
    case "abandoned":
      return {
        error: "The response could not be completed. Your question is saved.",
        notice: "",
        retry: "new",
      } as const;
    default:
      return {
        error:
          "Connection interrupted. Retry checks this request without starting another.",
        notice: `Request status: ${receipt.state}.`,
        retry: "same",
      } as const;
  }
}
