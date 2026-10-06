import type { Message } from "./mentor-demo";
import type { SavedMessage } from "./mentor-api";

export type MentorRequestKind = "chat" | "plan";
export type LastMentorRequest = {
  text: string;
  kind: MentorRequestKind;
  requestId: string | null;
};
export const mapMessage = (row: SavedMessage): Message => ({
  id: row.id,
  role: row.role,
  text: row.content,
});
