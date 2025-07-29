// src/components/ComponentRenderModal.tsx
import type { ReactNode } from "react";

type Props = {
  title?: string;
  description?: string;
  onClose?: () => void;
  toggle?: () => void;
  children: ReactNode;
  renderCloseButton?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

const ComponentRenderModal = ({
  title,
  description,
  children,
  renderCloseButton,
}: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto px-4 py-6">
        <div className="relative rounded-lg bg-gray-100 p-8 shadow-2xl dark:bg-gray-900">
          {renderCloseButton && (
            <div className="absolute right-4 top-4">{renderCloseButton}</div>
          )}
          {title && (
            <>
              <h2 className="mb-2 border-b border-gray-300 pb-2 text-center text-2xl font-bold text-gray-900 dark:border-gray-700 dark:text-white">
                {title}
              </h2>
              {description && (
                <p className="mb-6 text-center text-sm italic text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              )}
            </>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ComponentRenderModal;
