import { useCallback } from "react";
import type React from "react";

import { JAVASCRIPT_EXECUTION_TIMEOUT_MS } from "@/features/playground/playground-security";
import { validateJavaScript } from "@/utils/secureJavaScript";

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

type UseJavaScriptWorkerRunnerOptions = {
  readonly workerRef: React.RefObject<Worker | null>;
  readonly setLogs: Setter<string[]>;
  readonly timeoutMs?: number;
};

type JavaScriptWorkerMessage = {
  readonly token?: string;
  readonly type?: "log" | "error" | "result";
  readonly text?: string;
};

export function useJavaScriptWorkerRunner({
  workerRef,
  setLogs,
  timeoutMs = JAVASCRIPT_EXECUTION_TIMEOUT_MS,
}: UseJavaScriptWorkerRunnerOptions) {
  return useCallback(
    (code: string) => {
      const validation = validateJavaScript(code);
      if (!validation.valid) {
        setLogs((previous) => [
          ...previous,
          `🚫 JavaScript blocked: ${validation.reason ?? "unsafe code detected"}`,
        ]);
        return;
      }

      workerRef.current?.terminate();

      const worker = new Worker("/workers/jsWorker.js");
      const token = crypto.randomUUID();
      workerRef.current = worker;

      const finish = () => {
        window.clearTimeout(timer);
        worker.terminate();
        if (workerRef.current === worker) {
          workerRef.current = null;
        }
      };

      const timer = window.setTimeout(() => {
        setLogs((previous) => [
          ...previous,
          `❌ JavaScript execution stopped after ${timeoutMs / 1000}s.`,
        ]);
        finish();
      }, timeoutMs);

      worker.onmessage = (event: MessageEvent<JavaScriptWorkerMessage>) => {
        if (event.data.token !== token) return;

        if (event.data.type === "log" && event.data.text) {
          setLogs((previous) => [...previous, event.data.text ?? ""]);
          return;
        }

        if (event.data.type === "error") {
          setLogs((previous) => [
            ...previous,
            `❌ JavaScript error: ${event.data.text ?? "Unknown error"}`,
          ]);
        }

        if (event.data.type === "result" || event.data.type === "error") {
          finish();
        }
      };

      worker.onerror = (event) => {
        setLogs((previous) => [
          ...previous,
          `❌ JavaScript worker error: ${event.message || "Unknown error"}`,
        ]);
        finish();
      };

      setLogs((previous) => [...previous, ">_"]);
      worker.postMessage({ type: "start", code, token });
    },
    [setLogs, timeoutMs, workerRef]
  );
}
