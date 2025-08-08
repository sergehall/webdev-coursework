// src/components/ConsoleOutput.tsx
import { useEffect, useRef } from "react";

type Props = {
  logs: (string | unknown)[];
  // When provided -> input is active; when omitted -> input is shown but disabled
  onInput?: (value: string) => void;
  // Optional placeholder when input is inactive
  inactivePlaceholder?: string;
};

export function ConsoleOutput({
  logs,
  onInput,
  inactivePlaceholder = "Waiting...",
}: Props) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [logs]);

  // Normalize any value to lines of text; trim trailing newline to avoid blank rows
  const toLines = (x: unknown) => {
    const s =
      typeof x === "string"
        ? x
        : x == null
          ? ""
          : (() => {
              try {
                return JSON.stringify(x);
              } catch {
                return String(x);
              }
            })();
    const trimmed = s.replace(/\r?\n$/, ""); // drop one trailing NL
    return trimmed.split(/\r?\n/);
  };

  const isActive = typeof onInput === "function";

  return (
    <div className="mt-4 rounded-lg bg-gray-300 p-4 font-mono text-green-500 dark:bg-gray-800">
      <div className="mb-2 border-b border-gray-900 font-bold">
        Console Output:
      </div>

      <pre
        ref={ref}
        className="m-0 max-h-[500px] overflow-y-auto rounded-md bg-gray-50 p-4 text-black dark:bg-gray-900 dark:text-white"
      >
        <code>
          {logs.map((log, i) =>
            toLines(log).map((line, j) => (
              <div
                key={`${i}-${j}`}
                className={
                  line.trim() === ">_"
                    ? "text-green-500 dark:text-green-400"
                    : ""
                }
              >
                {line}
              </div>
            ))
          )}

          {/* Inline console input: always rendered; active only when onInput provided */}
          <input
            autoFocus={isActive}
            disabled={!isActive}
            className={`mt-1 w-full border-none bg-transparent outline-none ${
              isActive
                ? "text-green-500 dark:text-green-400"
                : "text-gray-400 dark:text-gray-500"
            }`}
            placeholder={isActive ? "" : inactivePlaceholder}
            onKeyDown={(e) => {
              if (!isActive) return;
              if (e.key === "Enter") {
                const el = e.target as HTMLInputElement;
                const v = el.value;
                el.value = "";
                onInput?.(v);
              }
            }}
          />
        </code>
      </pre>
    </div>
  );
}
