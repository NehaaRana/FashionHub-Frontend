// import React from "react";
// import { Slot } from "@radix-ui/react-slot";
// import { cva } from "class-variance-authority";
// import { cn } from "../../lib/utils";

// const buttonVariants = cva(
//   "inline-flex items-center justify-center rounded-md transition-colors",
//   {
//     variants: {
//       variant: {
//         default: "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
//         outline: "border border-white/30 text-white",
//         gold: "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]",
//       },
//       size: {
//         default: "px-4 py-2 text-sm",
//         lg: "px-8 py-3 text-xs tracking-widest uppercase",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// );

// const Button = React.forwardRef(
//   ({ className, variant, size, asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button";

//     return (
//       <Comp
//         className={cn(buttonVariants({ variant, size }), className)}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );

// Button.displayName = "Button";

// export { Button };


import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ✅ ADD THIS BACK
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-primary text-primary hover:bg-primary hover:text-white",
        hero: "bg-primary text-primary-foreground px-10 py-4 uppercase tracking-[0.2em] text-xs font-semibold",
        gold: "bg-accent text-accent-foreground px-8 py-3 uppercase tracking-[0.15em] text-xs font-semibold",
      },
      size: {
        default: "h-10 px-4",
        lg: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))} // ✅ THIS LINE IS KEY
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };