// frontend/src/components/buttons/ShowModalButton.tsx

import { useEffect, useId, useRef, useState } from "react";

import { CloseModalButton } from "@/components/buttons";

type File = {
  fileUrl: string;
  filename: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  files: File[];
  className?: string;
};

function CodeFilePreview({ file }: { file: File }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadFile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(file.fileUrl);

        if (!response.ok) {
          throw new Error(`Unable to load ${file.filename}`);
        }

        const text = await response.text();

        if (isMounted) {
          setContent(text);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unable to load file");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadFile();

    return () => {
      isMounted = false;
    };
  }, [file.fileUrl, file.filename]);

  if (isLoading) {
    return (
      <div className="rounded border bg-gray-100 p-4 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
        Loading preview...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200">
        {error}
      </div>
    );
  }

  return (
    <pre className="max-h-[70vh] overflow-auto rounded border bg-slate-950 p-4 text-sm leading-6 text-slate-100">
      <code>{content}</code>
    </pre>
  );
}

export default function ShowModalButton({
  isOpen,
  onClose,
  files,
  className = "",
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const dialogTitleId = useId();

  useEffect(() => {
    if (!isOpen || files.length === 0) return;

    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [files.length, isOpen, onClose]);

  if (!isOpen || !files.length) return null;

  const codeExtensions = [".tsx", ".ts", ".jsx", ".js", ".java", ".php"];
  const imageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        tabIndex={-1}
        className={`relative max-h-[100vh] w-[97%] max-w-7xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg dark:bg-gray-700 ${className}`}
      >
        <h2 id={dialogTitleId} className="sr-only">
          File preview
        </h2>
        <CloseModalButton onClick={onClose} />
        <div className="mt-4 space-y-6">
          {files.map((file) => {
            const filename = file.filename.toLowerCase();

            return (
              <div key={file.fileUrl}>
                <p className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                  {file.filename}
                </p>
                <a
                  href={file.fileUrl}
                  download={file.filename}
                  className="mb-3 inline-flex text-sm font-semibold text-blue-600 underline dark:text-blue-300"
                >
                  Download {file.filename}
                </a>

                {filename.endsWith(".html") ? (
                  <iframe
                    src={file.fileUrl}
                    title={file.filename}
                    className="h-[600px] w-full rounded border"
                    sandbox="allow-scripts allow-same-origin"
                  />
                ) : filename.endsWith(".mp3") ? (
                  <audio controls className="w-full">
                    <source src={file.fileUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                ) : filename.endsWith(".md") ? (
                  <a
                    href={file.fileUrl}
                    download
                    className="text-blue-600 underline dark:text-blue-400"
                  >
                    Download {file.filename}
                  </a>
                ) : filename.endsWith(".pdf") ? (
                  <iframe
                    src={file.fileUrl}
                    title={file.filename}
                    className="h-[700px] w-full rounded border bg-white"
                  />
                ) : codeExtensions.some((ext) => filename.endsWith(ext)) ? (
                  <CodeFilePreview file={file} />
                ) : imageExtensions.some((ext) => filename.endsWith(ext)) ? (
                  <img
                    src={file.fileUrl}
                    alt={file.filename}
                    className="mx-auto max-h-[78vh] max-w-full rounded border bg-white object-contain dark:border-gray-600"
                  />
                ) : (
                  <p className="text-gray-500">Unsupported file type</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// import { CloseModalButton } from '@/components/buttons';
//
// type File = {
//   fileUrl: string;
//   filename: string;
// };
//
// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
//   files: File[];
//   className?: string;
// };
//
// export default function ShowModalButton({ isOpen, onClose, files, className = '' }: Props) {
//   if (!isOpen || !files.length) return null;
//
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div
//         className={`relative w-[97%] max-w-7xl max-h-[100vh] overflow-y-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 ${className}`}
//       >
//         <CloseModalButton onClick={onClose} />
//         <div className="space-y-6 mt-4">
//           {files.map((file) => (
//             <div key={file.fileUrl}>
//               <p className="text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">
//                 {file.filename}
//               </p>
//
//               {file.filename.toLowerCase().endsWith('.html') ? (
//                 <iframe
//                   src={file.fileUrl}
//                   title={file.filename}
//                   className="w-full h-[600px] border rounded"
//                   code-playground="allow-scripts allow-same-origin"
//                 />
//               ) : file.filename.toLowerCase().endsWith('.mp3') ? (
//                 <audio controls className="w-full">
//                   <source src={file.fileUrl} type="audio/mpeg" />
//                   Your browser does not support the audio element.
//                 </audio>
//               ) : file.filename.toLowerCase().endsWith('.md') ? (
//                 <a
//                   href={file.fileUrl}
//                   download
//                   className="text-blue-600 dark:text-blue-400 underline"
//                 >
//                   Download {file.filename}
//                 </a>
//               ) : (
//                 <p className="text-gray-500">Unsupported file type</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
