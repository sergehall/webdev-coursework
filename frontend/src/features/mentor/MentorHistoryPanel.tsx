import { useState } from "react";
import { X } from "lucide-react";

import type { SavedConversation } from "./mentor-api";

export default function MentorHistoryPanel({
  sample,
  count,
  conversations,
  activeId,
  hasMore,
  onOpen,
  onDelete,
  onMore,
  onNew,
  onClose,
}: {
  sample: boolean;
  count: number;
  conversations: SavedConversation[];
  activeId: string | null;
  hasMore: boolean;
  onOpen: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
  onMore: () => void;
  onNew: () => void;
  onClose: () => void;
}) {
  const [confirmId, setConfirmId] = useState<string | null>(null);
  return (
    <aside
      id="mentor-history"
      className="mentor-history"
      aria-label="Conversation history"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
      <div>
        <strong>{sample ? "This visit" : "Saved conversations"}</strong>
        <button
          aria-label="Close conversation history"
          className="mentor-icon-button"
          onClick={onClose}
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
      <p>Current conversation · {count} messages</p>
      {sample ? (
        <p className="mentor-small mentor-muted">
          Preview history is temporary. Starting over clears this conversation,
          but keeps your accepted path.
        </p>
      ) : (
        <>
          {conversations.map((conversation) => (
            <div className="mentor-history-row" key={conversation.id}>
              <button
                className="mentor-history-entry"
                aria-current={activeId === conversation.id ? "true" : undefined}
                onClick={() => onOpen(conversation.id)}
              >
                {conversation.title}
              </button>
              {confirmId === conversation.id ? (
                <span className="mentor-history-confirm">
                  <button onClick={() => void onDelete(conversation.id)}>
                    Confirm delete
                  </button>
                  <button onClick={() => setConfirmId(null)}>Cancel</button>
                </span>
              ) : (
                <button
                  className="mentor-history-delete"
                  aria-label={`Delete conversation: ${conversation.title}`}
                  onClick={() => setConfirmId(conversation.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          {hasMore && (
            <button className="mentor-button" onClick={onMore}>
              Load more conversations
            </button>
          )}
        </>
      )}
      <button className="mentor-button" onClick={onNew}>
        Start a new conversation
      </button>
    </aside>
  );
}
