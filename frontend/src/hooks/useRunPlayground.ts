// src/hooks/useRunPlayground.ts
import type React from "react";

import { runPythonWithTimeout } from "@/utils/runPythonWithTimeout";
import { runInSandboxedIframe } from "@/utils/sandboxIframe";

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
type SidecarFile = { name: string; content: string };

// Heuristic: detect local modules / data mentioned in code
function detectSidecarNames(code: string): string[] {
  const need = new Set<string>();
  if (/\bfrom\s+A05ClassPrH\b|\bimport\s+A05ClassPrH\b/.test(code)) {
    need.add("A05ClassPrH.py");
  }
  if (/\bhouse\.tab\b/.test(code)) need.add("house.tab");
  if (/\bpresident\.tab\b/.test(code)) need.add("president.tab");
  return Array.from(need);
}

// Fetch sidecar files relative to a base URL (folder of the .py file)
async function fetchSidecars(
  baseUrl: string,
  names: string[],
  log?: (t: string) => void
): Promise<SidecarFile[]> {
  const out: SidecarFile[] = [];
  for (const name of names) {
    try {
      const url = baseUrl.endsWith("/") ? baseUrl + name : `${baseUrl}/${name}`;
      const res = await fetch(`${url}?t=${Date.now()}`);
      if (!res.ok) {
        log?.(`[host] sidecar not found: ${name} (${res.status})`);
        continue;
      }
      out.push({ name, content: await res.text() });
    } catch (e) {
      log?.(`[host] failed to fetch sidecar ${name}: ${(e as Error).message}`);
    }
  }
  return out;
}

function dirname(path: string): string {
  const idx = path.lastIndexOf("/");
  return idx >= 0 ? path.slice(0, idx) : "";
}

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
    if (isFileRun && file) {
      const isJS = file.toLowerCase().endsWith(".js");
      const isPY = file.toLowerCase().endsWith(".py");

      if (isJS) {
        void fetch(`/code-playground/${file}?t=${Date.now()}`)
          .then((res) => (res.ok ? res.text() : Promise.reject(res.statusText)))
          .then((code) => runInSandboxedIframe(code))
          .catch((err) =>
            setLogs((prev) => [...prev, `❌ Failed to run JS: ${String(err)}`])
          );
        return;
      }

      if (isPY) {
        // 1) fetch main .py code
        void fetch(`/code-playground/${file}?t=${Date.now()}`)
          .then((res) => (res.ok ? res.text() : Promise.reject(res.statusText)))
          .then(async (code) => {
            // 2) detect & fetch sidecars from the SAME folder
            const baseDir = dirname(file);
            const names = detectSidecarNames(code);
            const sidecars = await fetchSidecars(
              `/code-playground/${baseDir}`,
              names,
              (t) => setLogs((prev) => [...prev, t])
            );

            // 3) spawn worker and wire events
            const worker = new Worker("/workers/pyWorker.js"); // classic worker
            workerRef.current = worker;

            worker.onmessage = (e) => {
              const { type, text, prompt, id, error } = e.data || {};

              if (type === "log") {
                setLogs((prev) => [...prev, String(text ?? "")]);
                return;
              }
              if (type === "input") {
                setLogs((prev) => [...prev, String(prompt ?? "Input:")]);
                setInputResolver(() => (value: string) => {
                  worker.postMessage({ type: "inputResponse", id, value });
                });
                return;
              }
              if (type === "result") {
                worker.terminate();
                workerRef.current = null;
                return;
              }
              if (type === "error") {
                setLogs((prev) => [
                  ...prev,
                  `❌ Error:\n${String(error ?? "Unknown")}`,
                ]);
                worker.terminate();
                workerRef.current = null;
                return;
              }
            };

            // 4) start worker with code + sidecars
            worker.postMessage({ type: "start", code, files: sidecars });
          })
          .catch((err) => {
            setLogs((prev) => [
              ...prev,
              `❌ Failed to run Python: ${String(err)}`,
            ]);
          });
        return;
      }

      setLogs((prev) => [...prev, "⚠️ Unsupported file type."]);
      return;
    }

    // ---------- Run uploaded code ----------
    if (lastUploadedCode && filename) {
      const isPyUpload = filename.toLowerCase().endsWith(".py");

      if (isPyUpload) {
        // Use runPythonWithTimeout with streaming + input.
        // Sidecars для upload-режима отдаст сам runPythonWithTimeout (через resolver).
        void runPythonWithTimeout(
          lastUploadedCode,
          300000, // 5 min (paused during input())
          async (prompt) => {
            setLogs((prev) => [...prev, prompt]);
            return new Promise((resolve) => setInputResolver(() => resolve));
          },
          (text) => setLogs((prev) => [...prev, text]),
          {
            // If sidecars are hosted under /code-playground, resolve them by name
            resolver: async (name: string) => {
              try {
                const res = await fetch(
                  `/code-playground/${name}?t=${Date.now()}`
                );
                if (!res.ok) return null;
                return await res.text();
              } catch {
                return null;
              }
            },
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
      runInSandboxedIframe(lastUploadedCode);
      return;
    }

    setLogs((prev) => [...prev, "⚠️ Nothing to run."]);
  };
}
