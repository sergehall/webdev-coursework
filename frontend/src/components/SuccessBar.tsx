import { createPortal } from "react-dom";

const SuccessBar = ({ message }: { message: string }) => {
  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="animate-slide-in pointer-events-none fixed top-0 right-0 left-0 z-[9999] flex h-8 items-center justify-center bg-green-600 text-center text-sm text-white shadow-md">
      {message}
    </div>,
    document.body
  );
};

export default SuccessBar;
