export const QR_CAMPAIGN = "esl10g-presentation-1";

export type QrEvent = {
  eventId: string;
  campaign: typeof QR_CAMPAIGN;
  occurredAt: string;
  device: "phone" | "tablet" | "desktop" | "unknown";
  os: "iOS" | "Android" | "Windows" | "macOS" | "Linux" | "Other";
  browser: "Chrome" | "Safari" | "Firefox" | "Edge" | "Other";
};

// Store broad categories, never the full header or an exact device model.
export function normalizeDevice(
  header: string
): Pick<QrEvent, "device" | "os" | "browser"> {
  const ua = header.slice(0, 512);
  const os = /iPhone|iPad|iPod/.test(ua)
    ? "iOS"
    : /Android/.test(ua)
      ? "Android"
      : /Windows/.test(ua)
        ? "Windows"
        : /Macintosh|Mac OS X/.test(ua)
          ? "macOS"
          : /Linux/.test(ua)
            ? "Linux"
            : "Other";
  const device =
    /iPad|Tablet/.test(ua) || (/Android/.test(ua) && !/Mobile/.test(ua))
      ? "tablet"
      : /Mobile|iPhone|iPod/.test(ua)
        ? "phone"
        : /Windows|Macintosh|Linux/.test(ua)
          ? "desktop"
          : "unknown";
  const browser = /Edg\/|EdgiOS\/|EdgA\//.test(ua)
    ? "Edge"
    : /Firefox\/|FxiOS\//.test(ua)
      ? "Firefox"
      : /Chrome\/|CriOS\//.test(ua)
        ? "Chrome"
        : /Safari\//.test(ua)
          ? "Safari"
          : "Other";
  return { device, os, browser };
}
