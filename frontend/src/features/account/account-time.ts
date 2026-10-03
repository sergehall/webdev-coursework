import type { OwnerProfile } from "./owner-api";

/** Account timestamps use the saved zone; daily analytics buckets stay in UTC. */
export function formatAccountTime(
  value: string | Date,
  profile?: OwnerProfile
): string {
  const date = new Date(value);
  const timeZone = profile?.timeZone ?? "UTC";
  const format = profile?.dateFormat ?? "medium";
  const dateText =
    format === "iso"
      ? (() => {
          const parts = new Intl.DateTimeFormat("en-US", {
            timeZone,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).formatToParts(date);
          const part = (type: string) =>
            parts.find((p) => p.type === type)!.value;
          return `${part("year")}-${part("month")}-${part("day")}`;
        })()
      : new Intl.DateTimeFormat(format === "day-first" ? "en-GB" : "en-US", {
          timeZone,
          dateStyle: format === "day-first" ? "short" : "medium",
        }).format(date);
  const timeText = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: profile?.clockFormat === "24h" ? "h23" : "h12",
  }).format(date);
  return `${dateText}, ${timeText}`;
}
