import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const PRESENTATION_QR_URL =
  "https://webdev-coursework.com/coursework/ESL10G/presentation-1?source=esl10g-presentation-qr";

export function useQrVisit() {
  const { search } = useLocation();
  const sent = useRef(false);
  useEffect(() => {
    if (
      sent.current ||
      import.meta.env.VITE_QR_ANALYTICS_ENABLED !== "true" ||
      new URLSearchParams(search).get("source") !== "esl10g-presentation-qr"
    )
      return;
    sent.current = true;
    void fetch(
      `${import.meta.env.VITE_OWNER_API_URL ?? import.meta.env.VITE_API_URL ?? ""}/api/analytics/qr-events`,
      {
        method: "POST",
        credentials: "omit",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: crypto.randomUUID(),
          campaign: "esl10g-presentation-1",
        }),
      }
    ).catch(() => {
      /* Statistics must never interrupt the presentation. */
    });
  }, [search]);
}
