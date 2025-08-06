import { useEffect, useRef } from "react";

export function ConsoleOutput({ logs }: { logs: string[] }) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [logs]);

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
          {logs.map((log, i) => {
            const lines = log.split("\n");
            return lines.map((line, j) => (
              <span
                key={`${i}-${j}`}
                className={
                  line.trim() === ">_"
                    ? "text-green-500 dark:text-green-400"
                    : ""
                }
              >
                {line}
                {"\n"}
              </span>
            ));
          })}
        </code>
      </pre>
    </div>
  );
}
