// import { ReactNode } from "react";
// import { X } from "lucide-react";

// // interface Props {
// //   open: boolean;
// //   onClose: () => void;
// //   title: string;
// //   subtitle?: string;
// //   children: ReactNode;
// //   footer?: ReactNode;
// //   size?: "sm" | "md" | "lg";
// // }

// const Modal = ({ open, onClose, title, subtitle, children, footer, size = "md" }) => {
//   if (!open) return null;
//   const widths = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl" }[size];

//   return (
//     // <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
//       {/* <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" onClick={onClose} /> */}
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />
//       <div className={`relative bg-card border border-border rounded-sm w-full ${widths} max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in-up`}>
//         <div className="flex items-start justify-between p-6 border-b border-border">
//           <div>
//             <h2 className="font-display text-2xl font-semibold text-foreground">{title}</h2>
//             {subtitle && (
//               <p className="font-body text-xs text-muted-foreground mt-1">{subtitle}</p>
//             )}
//           </div>
//           <button
//             onClick={onClose}
//             className="h-9 w-9 flex items-center justify-center rounded-sm hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
//             aria-label="Close"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-6">{children}</div>
//         {footer && <div className="p-6 border-t border-border bg-secondary/30">{footer}</div>}
//       </div>
//     </div>
//   );
// };

// export default Modal;


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