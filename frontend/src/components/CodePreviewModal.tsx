import { useEffect, useState, type ReactNode } from "react";

type Props = {
  fileUrl: string;
  filename: string;
  onClose?: () => void;
  toggle?: () => void;
  renderCloseButton?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

const CodePreviewModal = ({
  fileUrl,
  filename,
  renderCloseButton,
  header,
  footer,
}: Props) => {
  const [code, setCode] = useState<string>("");

  // Load code from the given file URL
  useEffect(() => {
    fetch(fileUrl)
      .then((res) => res.text())
      .then(setCode)
      .catch(() => setCode("// Failed to load code"));
  }, [fileUrl]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[95%] max-w-4xl rounded-lg bg-white p-6 text-sm shadow-lg dark:bg-gray-800">
        {/* Optional external close button */}
        {renderCloseButton && (
          <div className="absolute right-3 top-2">{renderCloseButton}</div>
        )}

        {/* Optional header override or fallback to filename */}
        {header || (
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {filename}
          </h2>
        )}

        {/* Display loaded code content */}
        <pre className="overflow-x-auto rounded bg-gray-100 p-4 text-xs text-gray-800 dark:bg-gray-900 dark:text-gray-100">
          <code>{code}</code>
        </pre>

        {/* Optional footer section */}
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
};

export default CodePreviewModal;
