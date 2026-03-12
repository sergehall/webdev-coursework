// src/hooks/usePostMessageLogs.ts
import { useEffect } from "react";

import { SANDBOX_IFRAME_ID } from "@/utils/sandboxIframe";

type SandboxLogMessage = {
  source?: "sandbox";
  type: "log";
  payload: string; // sanitized single-line string from the iframe
};

export function usePostMessageLogs(onLog: (msg: string) => void): void {
  useEffect(() => {
    const handler = (event: MessageEvent<unknown>) => {
      const sandboxFrame = document.getElementById(SANDBOX_IFRAME_ID);
      if (!(sandboxFrame instanceof HTMLIFrameElement)) return;
      if (event.source !== sandboxFrame.contentWindow) return;

      const data = event.data as Partial<SandboxLogMessage>;
      if (data?.type !== "log" || data?.source !== "sandbox") return;

      // payload is guaranteed to be a string in the new protocol
      let text = data.payload ?? "";
      if (!text) return;

      // Normalize: drop a single trailing newline, if any
      text = text.replace(/\r?\n$/u, "");
      if (text) onLog(text);
    };

    // Note: srcdoc iframes have opaque origins ("null"), so origin checks are not useful here
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onLog]);
}
