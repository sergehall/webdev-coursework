import { createPortal } from "react-dom";

const SuccessBar = ({ message }: { message: string }) => {
  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[9999] flex h-8 animate-slide-in items-center justify-center bg-green-600 text-center text-sm text-white shadow-md">
      {message}
    </div>,
    document.body
  );
};

export default SuccessBar;
