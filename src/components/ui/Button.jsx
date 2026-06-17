import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ADD THIS BACK
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // outline: "border border-primary text-primary hover:bg-primary hover:text-white",
        outline:
  "border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
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
        className={cn(buttonVariants({ variant, size, className }))} // THIS LINE IS KEY
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };