import { useCallback } from "react";
import type React from "react";

import { sanitizeAndValidateCode } from "@/utils/securePython";

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

type UsePythonWorkerRunnerOptions = {
  workerRef: React.RefObject<Worker | null>;
  setLogs: Setter<string[]>;
  setInputResolver: Setter<((value: string) => void) | null>;
  setPendingPrompt: Setter<string | null>;
  timeoutMs?: number;
};

export function usePythonWorkerRunner({
  workerRef,
  setLogs,
  setInputResolver,
  setPendingPrompt,
  timeoutMs = 45_000,
}: UsePythonWorkerRunnerOptions) {
  return useCallback(
    (code: string, extras?: Record<string, string>) => {
      const validated = sanitizeAndValidateCode(code);
      if (!validated.valid || !validated.cleanedCode) {
        setLogs((prev) => [
          ...prev,
          `🚫 Python blocked: ${validated.reason ?? "unsafe code detected"}`,
        ]);
        return;
      }

      if (workerRef.current) {
        try {
          workerRef.current.terminate();
        } catch (e) {
          // Worker may already be terminated; ignore
          // (add a no-op so the block isn't empty)
          void e;
        }
        workerRef.current = null;
      }

      let executionTimer: ReturnType<typeof setTimeout> | undefined;
      const clearExecutionTimer = () => {
        if (executionTimer) {
          clearTimeout(executionTimer);
          executionTimer = undefined;
        }
      };

      const worker = new Worker(`workers/pyWorker.js?ts=${Date.now()}`); // cache-busting
      workerRef.current = worker;
      const cleanupWorker = () => {
        clearExecutionTimer();
        setInputResolver(null);
        setPendingPrompt(null);
        try {
          worker.terminate();
        } catch {
          /* worker already stopped */
        }
        if (workerRef.current === worker) {
          workerRef.current = null;
        }
      };

      const armExecutionTimer = () => {
        clearExecutionTimer();
        executionTimer = setTimeout(() => {
          setLogs((prev) => [
            ...prev,
            `❌ Python execution timed out after ${timeoutMs / 1000}s`,
          ]);
          cleanupWorker();
        }, timeoutMs);
      };

      worker.onerror = (ev: ErrorEvent) => {
        const msg =
          ev.message ||
          (ev.error && (ev.error as Error)?.message) ||
          `${ev.filename}:${ev.lineno}:${ev.colno}` ||
          String(ev);
        setLogs((prev) => [...prev, `❌ Worker error: ${msg}`]);
        cleanupWorker();
      };

      worker.onmessage = (e: MessageEvent) => {
        const { type, text, prompt, id, error } = (e.data || {}) as {
          type?: string;
          text?: string;
          prompt?: string;
          id?: number;
          error?: string;
        };

        if (type === "log") {
          setLogs((prev) => [...prev, String(text ?? "")]);
          return;
        }
        if (type === "input") {
          clearExecutionTimer();
          setPendingPrompt(String(prompt ?? "Input:"));
          setLogs((prev) => [...prev, String(prompt ?? "Input:")]);
          setInputResolver(() => (value: string) => {
            armExecutionTimer();
            setPendingPrompt(null);
            worker.postMessage({ type: "inputResponse", id, value });
          });
          return;
        }
        if (type === "result") {
          cleanupWorker();
          return;
        }
        if (type === "error") {
          setLogs((prev) => [
            ...prev,
            `❌ Error:\n${String(error ?? "Unknown")}`,
          ]);
          cleanupWorker();
          return;
        }
      };

      armExecutionTimer();
      setLogs((prev) => [...prev, ">_"]);

      // Build sidecar file list from extras (already validated by the upload button)
      const files = extras
        ? Object.entries(extras).map(([name, content]) => ({ name, content }))
        : [];

      worker.postMessage({ type: "start", code: validated.cleanedCode, files });
    },
    [setInputResolver, setLogs, setPendingPrompt, timeoutMs, workerRef]
  );
}
