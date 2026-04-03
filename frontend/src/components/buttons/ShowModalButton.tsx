// frontend/src/components/buttons/ShowModalButton.tsx

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

export default function ShowModalButton({
  isOpen,
  onClose,
  files,
  className = "",
}: Props) {
  if (!isOpen || !files.length) return null;

  const codeExtensions = [".tsx", ".ts", ".jsx", ".js"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`relative max-h-[100vh] w-[97%] max-w-7xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg dark:bg-gray-700 ${className}`}
      >
        <CloseModalButton onClick={onClose} />
        <div className="mt-4 space-y-6">
          {files.map((file) => {
            const filename = file.filename.toLowerCase();

            return (
              <div key={file.fileUrl}>
                <p className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                  {file.filename}
                </p>

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
                  <iframe
                    src={file.fileUrl}
                    title={file.filename}
                    className="h-[600px] w-full rounded border bg-gray-100 dark:bg-gray-800"
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
