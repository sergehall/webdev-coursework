// // src/components/CodePlaygroundStatus.tsx

export function CodePlaygroundStatus({
  file,
  fileExists,
  filename,
  lastUploadedCode,
}: {
  file: string | null;
  fileExists: boolean | null;
  filename: string | null;
  lastUploadedCode: string | null;
}) {
  let message: string;
  let colorClass = "text-slate-200 italic";

  if (file && fileExists === false) {
    message = `File not found: ${file.split("/").pop()}`;
    colorClass = "text-red-400";
  } else if (file && fileExists === true && !lastUploadedCode) {
    message = `Running script from project files: ${file.split("/").pop()}`;
    colorClass = "text-emerald-400";
  } else if (filename) {
    message = `Running uploaded script: ${filename}`;
    colorClass = "text-emerald-400";
  } else {
    message = "Specify a file using ?file=your-script.js or upload below.";
  }

  return (
    <div className="my-2 min-h-[40px] rounded bg-gray-800 px-4 py-2 font-mono text-sm transition-colors">
      <span className={colorClass}>
        {message.includes(":") ? (
          <>
            {message.split(":")[0]}:{" "}
            <strong>{message.split(":").slice(1).join(":").trim()}</strong>
          </>
        ) : (
          message
        )}
      </span>
    </div>
  );
}
