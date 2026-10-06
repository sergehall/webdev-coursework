import { mentorRequest, type SavedPath } from "./mentor-api";

export async function toggleSavedProgress(
  path: SavedPath,
  milestoneId: string
): Promise<SavedPath> {
  const current = path.progress.find(
    (entry) => entry.milestone_id === milestoneId
  );
  const updated = await mentorRequest<{
    milestoneId: string;
    status: "done" | "pending";
    version: number;
  }>(`pathway/milestones/${encodeURIComponent(milestoneId)}`, "PATCH", {
    status: current?.status === "done" ? "pending" : "done",
    expectedVersion: current?.version ?? null,
    expectedPathVersion: path.version,
  });
  return {
    ...path,
    progress: [
      ...path.progress.filter((entry) => entry.milestone_id !== milestoneId),
      {
        milestone_id: milestoneId,
        status: updated.status,
        version: updated.version,
      },
    ],
  };
}
