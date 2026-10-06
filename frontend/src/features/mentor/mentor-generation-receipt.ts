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
  return result;
}
