import type { MentorLimits } from "./mentor-api";

export default function MentorQuota({
  enabled,
  preview,
  limits,
  blocked,
  resetLabel,
  blockReason,
  busy,
  onRefresh,
}: {
  enabled: boolean;
  preview: boolean;
  limits: MentorLimits | null;
  blocked: boolean;
  resetLabel: string | null;
  blockReason: "daily" | "minute" | null;
  busy: boolean;
  onRefresh: () => void;
}) {
  if (preview) return null;
  if (!enabled)
    return (
      <p className="mentor-quota mentor-quota-blocked" role="status">
        AI responses are unavailable for this account. Your saved path and
        conversations remain readable.
      </p>
    );
  return (
    <div
      className={`mentor-quota ${blocked ? "mentor-quota-blocked" : ""}`}
      role="status"
    >
      {blocked ? (
        <span>
          {blockReason === "daily" ? "Daily limit reached" : "Please wait"}
          {resetLabel ? ` · Try again after ${resetLabel}` : ""}. Your saved
          path and history remain available.
        </span>
      ) : (
        <span>
          {limits
            ? `${limits.dailyRemaining} AI requests left today`
            : "Checking AI request limits…"}
        </span>
      )}
      <button type="button" onClick={onRefresh} disabled={busy}>
        Refresh limits
      </button>
    </div>
  );
}
