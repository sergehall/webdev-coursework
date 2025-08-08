import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { runPythonWithTimeout } from "@/utils/runPythonWithTimeout";
import { CodePlaygroundStatus } from "@/components/CodePlaygroundStatus";
import { useConsoleInterceptor } from "@/hooks/useConsoleInterceptor";
import { usePostMessageLogs } from "@/hooks/usePostMessageLogs";
import { useRunPlayground } from "@/hooks/useRunPlayground";
import { useCodePlaygroundFileCheck } from "@/hooks/useCodePlaygroundFileCheck";
import { ConsoleOutput } from "@/components/ConsoleOutput";
import { runInSandboxedIframe } from "@/utils/sandboxIframe";
import {
  ClearConsoleButton,
  RunAgainButton,
  SecureJsUploadButton,
  SecurePythonUploadButton,
} from "@/components/buttons";

export default function CodePlaygroundPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const file = searchParams.get("file");

  const workerRef = useRef<Worker | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [filename, setFilename] = useState<string | null>(null);
  const [lastUploadedCode, setLastUploadedCode] = useState<string | null>(null);
  const [inputResolver, setInputResolver] = useState<
    ((value: string) => void) | null
  >(null);

  const { fileExists } = useCodePlaygroundFileCheck(file);

  // Handle text input from console
  const handleConsoleInput = (value: string) => {
    if (inputResolver) {
      inputResolver(value);
      setInputResolver(null);
    }
  };

  // Auto-run file if it exists
  useEffect(() => {
    if (!file || fileExists !== true) return;

    const isPython = file.endsWith(".py");
    const isJavaScript = file.endsWith(".js");

    // Handle JavaScript execution
    if (isJavaScript) {
      void fetch(`/code-playground/${file}`)
        .then((res) => (res.ok ? res.text() : Promise.reject(res.statusText)))
        .then((code) => {
          setLogs((prev) => [...prev, ">_"]);
          runInSandboxedIframe(code);
        })
        .catch((err) =>
          setLogs((prev) => [...prev, `❌ Failed to run JS: ${String(err)}`])
        );
    }

    // Handle Python execution
    if (isPython) {
      void fetch(`/code-playground/${file}`)
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
              return;
            }
            if (type === "error") {
              setLogs((prev) => [
                ...prev,
                `❌ Error:\n${String(error ?? "Unknown")}`,
              ]);
              worker.terminate();
              return;
            }
          };

          // Start execution
          setLogs((prev) => [...prev, ">_"]);
          worker.postMessage({ type: "start", code });
        })
        .catch((err) =>
          setLogs((prev) => [
            ...prev,
            `❌ Failed to run Python: ${String(err)}`,
          ])
        );
    }
  }, [file, fileExists]);

  // Capture browser console logs
  useConsoleInterceptor((msg) => setLogs((prev) => [...prev, msg]));
  usePostMessageLogs((msg) => setLogs((prev) => [...prev, msg]));

  // Run again button handler
  const handleRunAgain = useRunPlayground(
    workerRef,
    file,
    fileExists,
    lastUploadedCode,
    filename,
    setLogs,
    setInputResolver
  );

  // Handle file uploads
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
        document.getElementById("sandboxed-iframe")?.remove();
      }

      setFilename(name);
      setLastUploadedCode(code);

      if (isPython) {
        setLogs((prev) => [...prev, ">_"]);
        try {
          // Let runPythonWithTimeout handle progressive logging
          const output = await runPythonWithTimeout(
            code,
            300000, // 5 minutes default
            async (prompt) => {
              setLogs((prev) => [...prev, prompt]);
              return new Promise((resolve) => setInputResolver(() => resolve));
            },
            (text) => {
              setLogs((prev) => [...prev, text]);
            }
          );
          if (output) setLogs((prev) => [...prev, output]);
        } catch (err: unknown) {
          setLogs((prev) => [...prev, `❌ Error:\n${String(err)}`]);
        }
      } else {
        setLogs((prev) => [...prev, ">_"]);
        runInSandboxedIframe(code);
      }
    })();
  };

  return (
    <div className="p-3">
      <h2 className="mb-4 rounded-xl bg-gradient-to-r from-blue-200 to-purple-300 px-6 py-4 text-3xl font-bold text-slate-700 shadow dark:from-blue-600 dark:to-purple-600 dark:text-white">
        {" "}
        Code Playground
      </h2>

      <CodePlaygroundStatus
        file={file}
        fileExists={fileExists}
        filename={filename}
        lastUploadedCode={lastUploadedCode}
      />

      {/* Action Buttons */}
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
        onInput={inputResolver ? handleConsoleInput : () => {}}
      />
    </div>
  );
}
