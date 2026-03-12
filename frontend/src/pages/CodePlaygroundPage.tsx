import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { CodePlaygroundStatus } from "@/components/CodePlaygroundStatus";
import { useConsoleInterceptor } from "@/hooks/useConsoleInterceptor";
import { usePostMessageLogs } from "@/hooks/usePostMessageLogs";
import { useRunPlayground } from "@/hooks/useRunPlayground";
import { usePythonWorkerRunner } from "@/hooks/usePythonWorkerRunner";
import { useCodePlaygroundFileCheck } from "@/hooks/useCodePlaygroundFileCheck";
import { ConsoleOutput } from "@/components/ConsoleOutput";
import {
  toCodePlaygroundUrl,
  normalizePlaygroundRelativePath,
} from "@/utils/playgroundPath";
import { validateJavaScript } from "@/utils/secureJavaScript";
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

  const runPythonInWorker = usePythonWorkerRunner({
    workerRef,
    setLogs,
    setInputResolver,
    setPendingPrompt,
    timeoutMs: PYTHON_TIMEOUT_MS,
  });

  // Send console input back to worker
  const handleConsoleInput = (value: string) => {
    if (inputResolver) {
      inputResolver(value);
      setInputResolver(null);
      setPendingPrompt(null);
    }
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
  }, [file, fileExists, runPythonInWorker]);

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
