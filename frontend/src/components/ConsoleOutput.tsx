import { useEffect, useRef } from "react";

export function ConsoleOutput({ logs }: { logs: string[] }) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="mt-4 rounded-lg bg-gray-900 p-4 font-mono text-green-500">
      <div className="mb-2 border-b border-gray-900 font-bold">
        Console Output:
      </div>
      <pre
        ref={ref}
        className="m-0 max-h-[500px] overflow-y-auto rounded-md bg-gray-800 p-4 text-white"
      >
        {logs.map((line, i) => (
          <div
            key={i}
            className={line.trim() === ">_" ? "text-green-400" : "text-white"}
          >
            {line}
          </div>
        ))}
      </pre>
    </div>
  );
}
