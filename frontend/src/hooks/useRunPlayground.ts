// src/hooks/useRunPlayground.ts
import React from "react";

import { runPythonWithTimeout } from "@/utils/runPythonWithTimeout";
import { runInSandboxedIframe } from "@/utils/sandboxIframe";

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

/**
 * Re-run button logic for both JS and Python.
 * - For JS files: re-fetch and run inside sandboxed iframe.
 * - For PY files: spawn a fresh Web Worker and wire input/log streaming.
 * - For uploaded code: JS -> iframe, PY -> runPythonWithTimeout (with onInput/onLog).
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
    // clear previous worker if any
    if (workerRef.current) {
      try {
        workerRef.current.terminate();
      } catch (err) {
        // Ignore termination errors, not critical
        console.warn("Worker termination failed:", err);
      }
      workerRef.current = null;
    }
    // clear pending input
    setInputResolver(null);

    setLogs([]);
    setLogs((prev) => [...prev, ">_"]);

    const isFileRun = Boolean(file) && fileExists !== false;

    // ---------- Run from file (in /code-playground) ----------
    if (isFileRun && file) {
      const isJS = file.toLowerCase().endsWith(".js");
      const isPY = file.toLowerCase().endsWith(".py");

      if (isJS) {
        // re-fetch and run in sandboxed iframe
        void fetch(`/code-playground/${file}?t=${Date.now()}`)
          .then((res) => (res.ok ? res.text() : Promise.reject(res.statusText)))
          .then((code) => {
            runInSandboxedIframe(code);
          })
          .catch((err) => {
            setLogs((prev) => [...prev, `❌ Failed to run JS: ${String(err)}`]);
          });
        return;
      }

      if (isPY) {
        // spawn a NEW worker each run
        void fetch(`/code-playground/${file}?t=${Date.now()}`)
          .then((res) => (res.ok ? res.text() : Promise.reject(res.statusText)))
          .then((code) => {
            const worker = new Worker("/workers/pyWorker.js");
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

            worker.postMessage({ type: "start", code });
          })
          .catch((err) => {
            setLogs((prev) => [
              ...prev,
              `❌ Failed to run Python: ${String(err)}`,
            ]);
          });
        return;
      }

      // Unknown extension
      setLogs((prev) => [...prev, "⚠️ Unsupported file type."]);
      return;
    }

    // ---------- Run uploaded code ----------
    if (lastUploadedCode && filename) {
      const isPyUpload = filename.toLowerCase().endsWith(".py");

      if (isPyUpload) {
        // Use runPythonWithTimeout with streaming + input
        void runPythonWithTimeout(
          lastUploadedCode,
          300000, // 5 min, paused during input()
          async (prompt) => {
            setLogs((prev) => [...prev, prompt]);
            return new Promise((resolve) => setInputResolver(() => resolve));
          },
          (text) => {
            setLogs((prev) => [...prev, text]);
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

    // Nothing to run
    setLogs((prev) => [...prev, "⚠️ Nothing to run."]);
  };
}
