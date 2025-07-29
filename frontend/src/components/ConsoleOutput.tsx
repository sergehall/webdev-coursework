import { useEffect, useRef } from "react";

export function ConsoleOutput({ logs }: { logs: string[] }) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      style={{
        background: "#111827",
        color: "#0f0",
        padding: "1em",
        marginTop: "1em",
        fontFamily: "monospace",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #111827",
          marginBottom: "0.5em",
          fontWeight: "bold",
        }}
      >
        Console Output:
      </div>
      <pre
        ref={ref}
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          margin: 0,
          backgroundColor: "#1f2937",
          color: "white",
          padding: "1em",
          borderRadius: "6px",
        }}
      >
        {logs.join("\n")}
      </pre>
    </div>
  );
}
