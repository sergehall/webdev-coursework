// // frontend/src/pages/CodePlaygroundPage.tsx

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

  // Reset filename and uploaded code when file changes
  useEffect(() => {
    setFilename(null);
    setLastUploadedCode(null);
  }, [file]);

  // Show warning if file not found
  useEffect(() => {
    if (file && fileExists === false) {
      console.warn(`❌ File not found: /code-playground/${file}`);
    }
  }, [file, fileExists]);

  // Intercept console and iframe logs
  useConsoleInterceptor((msg) => setLogs((prev) => [...prev.slice(-99), msg]));
  usePostMessageLogs((msg) => setLogs((prev) => [...prev.slice(-99), msg]));

  // Load JS script if file is provided and valid
  useEffect(() => {
    if (!file || fileExists !== true || !file.endsWith(".js")) return;

    const existingScript = document.querySelector(
      `script[src="/code-playground/${file}"]`
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = `/code-playground/${file}`;
    script.async = true;
    script.type = "module";
    script.setAttribute("data-code-playground-initial", "true");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [file, fileExists]);

  const handleRunAgain = useRunPlayground(
    file,
    fileExists,
    lastUploadedCode,
    filename, // pass filename so hook knows the file extension
    setLogs
  );

  const handleUpload = (code: string, name: string) => {
    void (async () => {
      const search = new URLSearchParams(location.search);
      search.delete("file");

      await navigate({
        pathname: location.pathname,
        search: search.toString(),
      });

      // Determine file type
      const isPython = name.endsWith(".py");
      const wasPython = filename?.endsWith(".py") ?? false;

      // If switching between JS <-> Python, remove stale iframe
      if (isPython !== wasPython) {
        const existingIframe = document.getElementById("sandboxed-iframe");
        if (existingIframe) {
          existingIframe.remove();
        }
      }

      setFilename(name);
      setLastUploadedCode(code);

      // Python execution
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

        // JavaScript execution
      } else {
        setLogs((prev) => [...prev.slice(-99), ">_"]);

        // Fresh iframe will be created inside runInSandboxedIframe
        runInSandboxedIframe(code);
      }
    })();
  };

  return (
    <div className="p-3">
      <h2 className="mb-4 rounded-xl bg-gradient-to-r from-blue-200 to-purple-300 px-6 py-4 text-3xl font-bold text-slate-700 shadow dark:from-blue-600 dark:to-purple-600 dark:text-white">
        Code Playground
      </h2>

      {/* Loading or error state */}
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

      <div className="mt-4 flex flex-wrap gap-2">
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
