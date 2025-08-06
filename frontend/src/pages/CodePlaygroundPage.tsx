// frontend/src/pages/CodePlaygroundPage.tsx

import { useEffect, useState } from "react";
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
} from "@/components/buttons";
import SecurePythonUploadButton from "@/components/buttons/SecurePythonUploadButton";

export default function CodePlaygroundPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const file = searchParams.get("file");

  const [logs, setLogs] = useState<string[]>([]);
  const [filename, setFilename] = useState<string | null>(null);
  const [lastUploadedCode, setLastUploadedCode] = useState<string | null>(null);

  const { fileExists } = useCodePlaygroundFileCheck(file);

  // Automatically load and run file if it's valid
  useEffect(() => {
    if (!file || fileExists !== true) return;

    const isPython = file.endsWith(".py");
    const isJavaScript = file.endsWith(".js");

    // Load and run JavaScript file
    if (isJavaScript) {
      void fetch(`/code-playground/${file}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to load file: ${res.statusText}`);
          }
          return res.text();
        })
        .then((code) => {
          setLogs((prev) => [...prev.slice(-99), ">_"]);
          runInSandboxedIframe(code);
        })
        .catch((err) => {
          setLogs((prev) => [
            ...prev.slice(-99),
            `❌ Failed to fetch or run JS file: ${String(err)}`,
          ]);
        });
    }

    // Load and run Python file
    if (isPython) {
      void fetch(`/code-playground/${file}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to load file: ${res.statusText}`);
          }
          return res.text();
        })
        .then(async (code) => {
          if (code.includes("input(")) {
            setLogs((prev) => [
              ...prev.slice(-99),
              "❌ input() is not supported in the browser-based Python interpreter.",
            ]);
            return;
          }

          try {
            setLogs((prev) => [...prev.slice(-99), ">_"]);
            const output = await runPythonWithTimeout(code);
            setLogs((prev) => [...prev.slice(-99), `${output}`]);
          } catch (err: unknown) {
            setLogs((prev) => [
              ...prev.slice(-99),
              `❌ Error:\n${String(err instanceof Error ? err.message : err)}`,
            ]);
          }
        })
        .catch((err) => {
          setLogs((prev) => [
            ...prev.slice(-99),
            `❌ Failed to fetch or run file: ${String(err)}`,
          ]);
        });
    }

    return undefined; // Explicitly return undefined to satisfy TS
  }, [file, fileExists]);

  // Log warning in dev tools if file is not found
  useEffect(() => {
    if (file && fileExists === false) {
      console.warn(`❌ File not found: /code-playground/${file}`);
    }
  }, [file, fileExists]);

  // Intercept logs from iframe and console
  useConsoleInterceptor((msg) => setLogs((prev) => [...prev.slice(-99), msg]));
  usePostMessageLogs((msg) => setLogs((prev) => [...prev.slice(-99), msg]));

  // Hook to rerun code on button click
  const handleRunAgain = useRunPlayground(
    file,
    fileExists,
    lastUploadedCode,
    filename,
    setLogs
  );

  // Handle new code uploads (JS or Python)
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

      // Clear iframe if switching between JS <-> Python
      if (isPython !== wasPython) {
        const existingIframe = document.getElementById("sandboxed-iframe");
        if (existingIframe) {
          existingIframe.remove();
        }
      }

      setFilename(name);
      setLastUploadedCode(code);

      if (isPython) {
        if (code.includes("input(")) {
          setLogs((prev) => [
            ...prev.slice(-99),
            "❌ input() is not supported in the browser-based Python interpreter.",
          ]);
          return;
        }

        setLogs((prev) => [...prev.slice(-99), ">_"]);

        try {
          const output = await runPythonWithTimeout(code);
          setLogs((prev) => [...prev.slice(-99), `${output}`]);
        } catch (err: unknown) {
          setLogs((prev) => [
            ...prev.slice(-99),
            `❌ Error:\n${String(err instanceof Error ? err.message : err)}`,
          ]);
        }
      } else {
        setLogs((prev) => [...prev.slice(-99), ">_"]);
        runInSandboxedIframe(code);
      }
    })();
  };

  return (
    <div className="p-3">
      <h2 className="mb-4 rounded-xl bg-gradient-to-r from-blue-200 to-purple-300 px-6 py-4 text-3xl font-bold text-slate-700 shadow dark:from-blue-600 dark:to-purple-600 dark:text-white">
        Code Playground
      </h2>

      {/* Error and loading messages */}
      {file && fileExists === false && (
        <div className="mb-4 rounded bg-red-100 p-3 text-red-800 dark:bg-red-800 dark:text-red-100">
          Error: File <code>{file}</code> not found in Code Playground.
        </div>
      )}
      {file && fileExists === null && (
        <div className="mb-4 rounded bg-yellow-100 p-3 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
          Checking file <code>{file}</code>...
        </div>
      )}

      <CodePlaygroundStatus
        file={file}
        fileExists={fileExists}
        filename={filename}
        lastUploadedCode={lastUploadedCode}
      />

      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <ClearConsoleButton onClear={() => setLogs([])} />
        <SecureJsUploadButton onSafeUpload={handleUpload} />
        <SecurePythonUploadButton onSafeUpload={handleUpload} />
        {Boolean(file || lastUploadedCode) && (
          <RunAgainButton onRunAgain={handleRunAgain} />
        )}
      </div>

      <ConsoleOutput logs={logs} />
    </div>
  );
}
