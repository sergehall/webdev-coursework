import {
  mentorRequest,
  type SavedConversation,
  type SavedMessage,
} from "./mentor-api";

export function conversationMessages(id: string, cursor?: number) {
  const query = new URLSearchParams({ limit: "50" });
  if (cursor !== undefined) query.set("cursor", String(cursor));
  return mentorRequest<{
    entries: SavedMessage[];
    nextCursor: number | null;
  }>(`conversations/${id}/messages?${query}`);
}

export function initialConversation(id: string | null) {
  return id
    ? conversationMessages(id)
    : Promise.resolve({ entries: [] as SavedMessage[], nextCursor: null });
}

export function conversationPage(cursor: string) {
  return mentorRequest<{
    entries: SavedConversation[];
    nextCursor: string | null;
  }>(`conversations?limit=10&cursor=${cursor}`);
}
