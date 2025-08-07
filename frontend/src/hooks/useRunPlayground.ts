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
    setLogs((prev) => [...prev.slice(-99), ">_"]);

    const isJS = file?.toLowerCase().endsWith(".js");
    const isPy = file?.toLowerCase().endsWith(".py");

    // Run from file in /code-playground directory
    if (file && fileExists !== false) {
      if (isJS) {
        const existing = document.querySelector(`script[data-sandbox-reload]`);
        if (existing) existing.remove();

        const script = document.createElement("script");
        script.src = `/code-playground/${file}?t=${Date.now()}`; // force reload
        script.type = "module";
        script.setAttribute("data-code-playground-reload", "true");
        document.body.appendChild(script);
      } else if (isPy) {
        void fetch(`/code-playground/${file}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to load file: ${res.statusText}`);
            }
            return res.text();
          })
          .then(async (code) => {
            if (code.includes("input(")) {
              setLogs([
                "❌ input() is not supported in the browser-based Python interpreter.",
              ]);
              return;
            }

            const output = await runPythonWithTimeout(code);
            setLogs((prev) => [...prev.slice(-99), output]);
          })
          .catch((err) => {
            setLogs((prev) => [
              ...prev.slice(-99),
              `❌ Failed to fetch or run Python file: ${String(err)}`,
            ]);
          });
      }
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
