import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { LuX } from "react-icons/lu";

type ModalSize = "sm" | "md" | "lg";

type ModalProps = {
  onClose: () => void;
  size?: ModalSize;
  children?: ReactNode;
};

const modalSize: Record<ModalSize, string> = {
  sm: "max-w-100",
  md: "max-w-125",
  lg: "max-w-150",
};

const Modal = ({ onClose, size = "lg", children }: ModalProps) => {
  // Portal: a position:fixed parent creates its own stacking context, so the
  // modal would otherwise sit under the page content despite z-50.
  return createPortal(
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-screen h-screen bg-black/5 backdrop-blur-xs flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-surface p-6 rounded-lg w-full min-h-10 ${modalSize[size]}`}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex justify-center items-center cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <LuX className="w-4.5 h-4.5 text-muted hover:text-heading transition-colors" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
