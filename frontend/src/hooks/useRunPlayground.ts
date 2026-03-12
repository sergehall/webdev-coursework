// src/hooks/useRunPlayground.ts
import type React from "react";

import {
  normalizePlaygroundRelativePath,
  toCodePlaygroundUrl,
} from "@/utils/playgroundPath";
import { runPythonWithTimeout } from "@/utils/runPythonWithTimeout";
import { validateJavaScript } from "@/utils/secureJavaScript";
import { sanitizeAndValidateCode } from "@/utils/securePython";
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

function joinRelativePath(baseDir: string, name: string): string {
  return baseDir ? `${baseDir}/${name}` : name;
}

// Fetch sidecar files relative to a base folder (folder of the .py file)
async function fetchSidecars(
  baseDir: string,
  names: string[],
  log?: (t: string) => void
): Promise<SidecarFile[]> {
  const out: SidecarFile[] = [];
  for (const name of names) {
    try {
      const rel = joinRelativePath(baseDir, name);
      const url = toCodePlaygroundUrl(rel);
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

      setLogs((prev) => [...prev, "⚠️ Unsupported file type."]);
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
        // Sidecars для upload-режима отдаст сам runPythonWithTimeout (через resolver).
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
            resolver: async (name: string) => {
              try {
                const res = await fetch(
                  `${toCodePlaygroundUrl(name)}?t=${Date.now()}`
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
