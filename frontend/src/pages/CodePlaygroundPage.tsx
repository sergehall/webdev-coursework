import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { CodePlaygroundStatus } from "@/components/CodePlaygroundStatus";
import { useConsoleInterceptor } from "@/hooks/useConsoleInterceptor";
import { usePostMessageLogs } from "@/hooks/usePostMessageLogs";
import { useRunPlayground } from "@/hooks/useRunPlayground";
import { useCodePlaygroundFileCheck } from "@/hooks/useCodePlaygroundFileCheck";
import { ConsoleOutput } from "@/components/ConsoleOutput";
import {
  toCodePlaygroundUrl,
  normalizePlaygroundRelativePath,
} from "@/utils/playgroundPath";
import { validateJavaScript } from "@/utils/secureJavaScript";
import { sanitizeAndValidateCode } from "@/utils/securePython";
import { SANDBOX_IFRAME_ID, runInSandboxedIframe } from "@/utils/sandboxIframe";
import {
  ClearConsoleButton,
  RunAgainButton,
  SecureJsUploadButton,
  SecurePythonUploadButton,
} from "@/components/buttons";

const PYTHON_TIMEOUT_MS = 45_000;

export default function CodePlaygroundPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const rawFile = searchParams.get("file");
  const file = normalizePlaygroundRelativePath(rawFile);

  const workerRef = useRef<Worker | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [filename, setFilename] = useState<string | null>(null);
  const [lastUploadedCode, setLastUploadedCode] = useState<string | null>(null);

  // Input prompt integration for bottom input bar
  const [inputResolver, setInputResolver] = useState<
    ((value: string) => void) | null
  >(null);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const { fileExists } = useCodePlaygroundFileCheck(rawFile);

  // Send console input back to worker
  const handleConsoleInput = (value: string) => {
    if (inputResolver) {
      inputResolver(value);
      setInputResolver(null);
      setPendingPrompt(null);
    }
  };

  // Helper to run Python code via worker (used by both auto-run and uploads)
  const runPythonInWorker = (code: string) => {
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
          `❌ Python execution timed out after ${PYTHON_TIMEOUT_MS / 1000}s`,
        ]);
        cleanupWorker();
      }, PYTHON_TIMEOUT_MS);
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
    worker.postMessage({ type: "start", code: validated.cleanedCode });
  };

  // Auto-run file if present in /code-playground
  useEffect(() => {
    if (!file || fileExists !== true) return;

    const lower = file.toLowerCase();
    const isPython = lower.endsWith(".py");
    const isJavaScript = lower.endsWith(".js") || lower.endsWith(".mjs");

    if (isJavaScript) {
      void fetch(toCodePlaygroundUrl(file))
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
          setLogs((prev) => [...prev, ">_"]);
          runInSandboxedIframe(code);
        })
        .catch((err) =>
          setLogs((prev) => [...prev, `❌ Failed to run JS: ${String(err)}`])
        );
    }

    if (isPython) {
      void fetch(toCodePlaygroundUrl(file))
        .then((res) => (res.ok ? res.text() : Promise.reject(res.statusText)))
        .then((code) => runPythonInWorker(code))
        .catch((err) =>
          setLogs((prev) => [
            ...prev,
            `❌ Failed to run Python: ${String(err)}`,
          ])
        );
    }
  }, [file, fileExists]);

  // Capture browser console + postMessage logs
  useConsoleInterceptor((msg) => setLogs((prev) => [...prev, msg]));
  usePostMessageLogs((msg) => setLogs((prev) => [...prev, msg]));

  // Run again button
  const handleRunAgain = useRunPlayground(
    workerRef,
    file,
    fileExists,
    lastUploadedCode,
    filename,
    setLogs,
    setInputResolver
  );

  // Upload handler
  const handleUpload = (code: string, name: string) => {
    void (async () => {
      const search = new URLSearchParams(location.search);
      search.delete("file");
      await navigate({
        pathname: location.pathname,
        search: search.toString(),
      });

      const isPython = name.endsWith(".py");
      const wasPython = filename?.endsWith(".py") ?? false;

      if (isPython !== wasPython) {
        document.getElementById(SANDBOX_IFRAME_ID)?.remove();
      }

      setFilename(name);
      setLastUploadedCode(code);

      if (isPython) {
        runPythonInWorker(code); // unified path for Python
      } else {
        setLogs((prev) => [...prev, ">_"]);
        runInSandboxedIframe(code);
      }
    })();
  };

  return (
    <div className="p-3">
      <h2 className="mb-4 rounded-xl bg-gradient-to-r from-blue-200 to-purple-300 px-6 py-4 text-3xl font-bold text-slate-700 shadow dark:from-blue-600 dark:to-purple-600 dark:text-white">
        Code Playground
      </h2>

      <CodePlaygroundStatus
        file={file ?? rawFile}
        fileExists={fileExists}
        filename={filename}
        lastUploadedCode={lastUploadedCode}
      />

      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ClearConsoleButton onClear={() => setLogs([])} />
        <SecureJsUploadButton onSafeUpload={handleUpload} />
        <SecurePythonUploadButton onSafeUpload={handleUpload} />
        {(file || lastUploadedCode) && (
          <RunAgainButton onRunAgain={handleRunAgain} />
        )}
      </div>

      <ConsoleOutput
        logs={logs}
        onInput={inputResolver ? handleConsoleInput : undefined}
        awaitingPrompt={pendingPrompt || undefined}
      />
    </div>
  );
}
