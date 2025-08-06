// src/hooks/useRunPlayground.ts

import React from "react";

import { runPythonWithTimeout } from "@/utils/runPythonWithTimeout";
import { runInSandboxedIframe } from "@/utils/sandboxIframe";

/**
 * Hook to provide a function that re-runs code in the playground.
 * It supports both built-in files (via URL) and user-uploaded code (JS or Python).
 */
export function useRunPlayground(
  file: string | null,
  fileExists: boolean | null,
  lastUploadedCode: string | null,
  filename: string | null,
  setLogs: React.Dispatch<React.SetStateAction<string[]>>
) {
  return () => {
    // Clear logs on re-run
    setLogs([]);

    // Run from file in /code-playground directory
    if (file && fileExists !== false) {
      const existing = document.querySelector(`script[data-sandbox-reload]`);
      if (existing) existing.remove();

      const script = document.createElement("script");
      script.src = `/code-playground/${file}?t=${Date.now()}`; // Add timestamp to force reload
      script.type = "module";
      script.setAttribute("data-code-playground-reload", "true");
      document.body.appendChild(script);
    }

    // Run uploaded code (JS or Python)
    else if (lastUploadedCode && filename) {
      const isPython = filename.toLowerCase().endsWith(".py");

      if (isPython) {
        runPythonWithTimeout(lastUploadedCode).then((output) => {
          setLogs((prev) => [...prev.slice(-99), output]);
        });
      } else {
        runInSandboxedIframe(lastUploadedCode);
      }
    }
  };
}
