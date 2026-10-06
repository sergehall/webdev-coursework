import {
  createExamplePath,
  exampleReply,
  type DemoScenario,
  type LearnerProfile,
} from "./mentor-demo";
import {
  mentorRequest,
  type SavedMessage,
  type SavedProposal,
} from "./mentor-api";
import type { MentorRequestKind } from "./mentor-message-map";
import { previewFailure } from "./mentor-preview-failures";

export async function runMentorPreview(
  conversationId: string,
  input: string,
  kind: MentorRequestKind,
  profile: LearnerProfile & { version: number },
  scenario: DemoScenario,
  isCurrent: () => boolean,
  onMessage: (message: SavedMessage) => void
): Promise<SavedProposal | null> {
  const user = await mentorRequest<SavedMessage>(
    `conversations/${conversationId}/preview-messages`,
    "POST",
    { content: input }
  );
  if (!isCurrent()) return null;
  onMessage(user);
  if (scenario !== "normal") throw new Error(previewFailure(scenario));
  const reply =
    kind === "plan"
      ? "Your four-week example path is ready to review. Check each practice step before accepting it."
      : exampleReply(input, profile);
  const assistant = await mentorRequest<SavedMessage>(
    `conversations/${conversationId}/preview-replies`,
    "POST",
    { content: reply }
  );
  if (!isCurrent()) return null;
  onMessage(assistant);
  if (kind !== "plan") return null;
  const saved = await mentorRequest<{
    id: string;
    baseRevision: number;
    profileVersion: number;
    milestones: SavedProposal["content"];
  }>("proposals", "POST", {
    milestones: createExamplePath(profile),
    expectedProfileVersion: profile.version,
  });
  return {
    id: saved.id,
    base_revision: saved.baseRevision,
    profile_version: saved.profileVersion,
    content: saved.milestones,
  };
}
