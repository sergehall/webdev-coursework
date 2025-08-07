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
  let colorClass: string;

  if (file && fileExists === false) {
    message = `File not found: ${file.split("/").pop()}`;
    colorClass = "text-red-500 dark:text-red-400";
  } else if (file && fileExists === true && !lastUploadedCode) {
    message = `Running script from project files: ${file.split("/").pop()}`;
    colorClass = "text-emerald-600 dark:emerald-400";
  } else if (filename) {
    message = `Running uploaded script: ${filename}`;
    colorClass = "text-emerald-600 dark:text-emerald-400";
  } else {
    message = "Please upload a Python (.py) or JavaScript (.js) file using the form below.";
    colorClass = "text-black dark:text-white";
  }

  return (
    <div className="my-2 min-h-[40px] rounded bg-gray-200 px-4 py-2 font-mono text-sm transition-colors dark:bg-gray-800">
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
