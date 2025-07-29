// src/hooks/useRunSandbox.ts

import { runInSandboxedIframe } from "@/utils/sandboxIframe";

export function useRunSandbox(
  file: string | null,
  fileExists: boolean | null,
  lastUploadedCode: string | null,
  setLogs: (v: string[]) => void
) {
  return () => {
    setLogs([]);
    if (file && fileExists !== false) {
      const existing = document.querySelector(`script[data-sandbox-reload]`);
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.src = `/sandbox/${file}?t=${Date.now()}`;
      script.type = "module";
      script.setAttribute("data-sandbox-reload", "true");
      document.body.appendChild(script);
    } else if (lastUploadedCode) {
      runInSandboxedIframe(lastUploadedCode);
    }
  };
}
