import { createPortal } from "react-dom";
import { X } from "lucide-react";

const Modal = ({ open, onClose, title, subtitle, children, footer, size = "md" }) => {
  if (!open) return null;

  const widths = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl"
  }[size];

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative bg-white border border-gray-200 rounded-md w-full ${widths} shadow-2xl`}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">{children}</div>

        {/* Footer */}
        {footer && <div className="p-5 border-t">{footer}</div>}
      </div>
    </div>,
    document.body   // 👈 THIS IS THE KEY FIX
  );
};

export default Modal;