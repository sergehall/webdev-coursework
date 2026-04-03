// src/hooks/useRunPlayground.ts
import type React from "react";

import {
  normalizePlaygroundRelativePath,
  toCodePlaygroundUrl,
} from "@/utils/playgroundPath";
import {
  detectSidecarNames,
  dirname,
  fetchSidecars,
  resolveSidecarByName,
} from "@/utils/playgroundPythonSidecars";
import { runPythonWithTimeout } from "@/utils/runPythonWithTimeout";
import { validateJavaScript } from "@/utils/secureJavaScript";
import { sanitizeAndValidateCode } from "@/utils/securePython";
import { runInSandboxedIframe, runHtmlInSandboxedIframe } from "@/utils/sandboxIframe";

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * Re-run button logic for both JS and Python.
 * - JS files: re-fetch and run in sandboxed iframe.
 * - PY files:
 *    • File mode: fetch code, auto-fetch sidecars from same folder, pass to worker.
 *    • Upload mode: use runPythonWithTimeout with streaming + input.
 */
export function useRunPlayground(
  workerRef: React.RefObject<Worker | null>,
  file: string | null,
  fileExists: boolean | null,
  lastUploadedCode: string | null,
  filename: string | null,
  setLogs: Setter<string[]>,
  setInputResolver: Setter<((value: string) => void) | null>
) {
  return () => {
    const safeFile = normalizePlaygroundRelativePath(file);

    // Kill previous worker (if any)
    if (workerRef.current) {
      try {
        workerRef.current.terminate();
      } catch (err) {
        console.warn("Worker termination failed:", err);
      }
      workerRef.current = null;
    }
    setInputResolver(null);

    setLogs([]);
    setLogs((prev) => [...prev, ">_"]);

    const isFileRun = Boolean(file) && fileExists !== false;

    // ---------- Run from /code-playground ----------
    if (isFileRun && safeFile) {
      const isJS =
        safeFile.toLowerCase().endsWith(".js") ||
        safeFile.toLowerCase().endsWith(".mjs");
      const isPY = safeFile.toLowerCase().endsWith(".py");

      const isHTML =
        safeFile.toLowerCase().endsWith(".html") ||
        safeFile.toLowerCase().endsWith(".htm");
      const isJSON = safeFile.toLowerCase().endsWith(".json");

      if (isHTML) {
        void fetch(`${toCodePlaygroundUrl(safeFile)}?t=${Date.now()}`)
          .then((res) => (res.ok ? res.text() : Promise.reject(res.statusText)))
          .then((html) => {
            runHtmlInSandboxedIframe(html, "html-preview-container");
          })
          .catch((err) =>
            setLogs((prev) => [...prev, `❌ Failed to load HTML: ${String(err)}`])
          );
        return;
      }

      if (isJSON) {
        void fetch(`${toCodePlaygroundUrl(safeFile)}?t=${Date.now()}`)
          .then((res) => (res.ok ? res.text() : Promise.reject(res.statusText)))
          .then((raw) => {
            try {
              const formatted = JSON.stringify(JSON.parse(raw), null, 2);
              setLogs((prev) => [...prev, formatted]);
            } catch {
              setLogs((prev) => [...prev, "❌ Invalid JSON."]);
            }
          })
          .catch((err) =>
            setLogs((prev) => [...prev, `❌ Failed to load JSON: ${String(err)}`])
          );
        return;
      }

      if (isJS) {
        void fetch(`${toCodePlaygroundUrl(safeFile)}?t=${Date.now()}`)
          .then((res) => (res.ok ? res.text() : Promise.reject(res.statusText)))
          .then((code) => {
            const validation = validateJavaScript(code, {
              allowBrowserGlobals: true,
            });
            if (!validation.valid) {
              setLogs((prev) => [
                ...prev,
                `🚫 JS blocked: ${validation.reason ?? "unsafe code detected"}`,
              ]);
              return;
            }
            runInSandboxedIframe(code);
          })
          .catch((err) =>
            setLogs((prev) => [...prev, `❌ Failed to run JS: ${String(err)}`])
          );
        return;
      }

      if (isPY) {
        void (async () => {
          try {
            const res = await fetch(
              `${toCodePlaygroundUrl(safeFile)}?t=${Date.now()}`
            );
            if (!res.ok) throw new Error(res.statusText);

            const code = await res.text();
            const validation = sanitizeAndValidateCode(code);
            if (!validation.valid || !validation.cleanedCode) {
              setLogs((prev) => [
                ...prev,
                `🚫 Python blocked: ${validation.reason ?? "unsafe code detected"}`,
              ]);
              return;
            }

            const safeCode = validation.cleanedCode;
            const baseDir = dirname(safeFile);
            const names = detectSidecarNames(safeCode);
            const sidecars = await fetchSidecars(baseDir, names, (t) =>
              setLogs((prev) => [...prev, t])
            );

            const extras = Object.fromEntries(
              sidecars.map((f) => [f.name, f.content])
            ) as Record<string, string>;

            const output = await runPythonWithTimeout(
              safeCode,
              120000,
              async (prompt) => {
                setLogs((prev) => [...prev, prompt]);
                return new Promise((resolve) =>
                  setInputResolver(() => resolve)
                );
              },
              (text) => setLogs((prev) => [...prev, text]),
              { extras }
            );

            if (output) {
              setLogs((prev) => [...prev, output]);
            }
          } catch (err) {
            setLogs((prev) => [
              ...prev,
              `❌ Failed to run Python: ${String(err)}`,
            ]);
          }
        })();
        return;
      }

      setLogs((prev) => [...prev, "⚠️ Unsupported file type. Supported: .js, .mjs, .py, .html, .htm, .json"]);
      return;
    }

    // ---------- Run uploaded code ----------
    if (lastUploadedCode && filename) {
      const isPyUpload = filename.toLowerCase().endsWith(".py");

      if (isPyUpload) {
        const validation = sanitizeAndValidateCode(lastUploadedCode);
        if (!validation.valid || !validation.cleanedCode) {
          setLogs((prev) => [
            ...prev,
            `🚫 Python blocked: ${validation.reason ?? "unsafe code detected"}`,
          ]);
          return;
        }

        // Use runPythonWithTimeout with streaming + input.
        // runPythonWithTimeout provides sidecars for upload mode through the resolver.
        void runPythonWithTimeout(
          validation.cleanedCode,
          300000, // 5 min (paused during input())
          async (prompt) => {
            setLogs((prev) => [...prev, prompt]);
            return new Promise((resolve) => setInputResolver(() => resolve));
          },
          (text) => setLogs((prev) => [...prev, text]),
          {
            // If sidecars are hosted under /code-playground, resolve them by name
            resolver: resolveSidecarByName,
          }
        )
          .then((output) => {
            if (output) setLogs((prev) => [...prev, output]);
          })
          .catch((err) => {
            setLogs((prev) => [...prev, `❌ Error:\n${String(err)}`]);
          });

        return;
      }

      // JS upload -> iframe
      const validation = validateJavaScript(lastUploadedCode);
      if (!validation.valid) {
        setLogs((prev) => [
          ...prev,
          `🚫 JS blocked: ${validation.reason ?? "unsafe code detected"}`,
        ]);
        return;
      }

      runInSandboxedIframe(lastUploadedCode);
      return;
    }

    setLogs((prev) => [...prev, "⚠️ Nothing to run."]);
  };
}
