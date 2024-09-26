import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, cx, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import clsx from "clsx";

const neoClasses =
  "w-full rounded-full px-3.5 py-5 border-2 relative z-10 text-lg font-bold hover:translate-y-[-2px] transition-transform-duration-200";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 cursor-pointer",
        ghost: "hover:bg-accent hover:text-accent-foreground cursor-pointer",
        link: "text-primary underline-offset-4 hover:underline cursor-pointer",
        neo: cn(neoClasses, "bg-primary text-white border-blue-900"),
        neoOutline: cn(neoClasses, "bg-[#3e406a] text-white border-[#6366a7]"),
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "rounded-2xl h-16 px-6 py-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const spanVairants = cva(
  ["absolute", "h-12", "bottom-[-7px]", "w-full", "border-2", "left-0", "z-0"],
  {
    variants: {
      variant: {
        default: "hidden",
        destructive: "hidden",
        outline: "hidden",
        secondary: "hidden",
        ghost: "hidden",
        link: "hidden",
        neo: "border-blue-900 bg-primary-shadow ",
        neoOutline: "bg-[#6366a7] border-[#6366f7]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const containerClass = clsx({
      relative: variant === "neo" || variant === "neoOutline",
    });

    const borderRound = clsx({
      "rounded-full": variant === "neo",
      "rounded-xl": variant === "neoOutline",
    });

    return (
      <div className={containerClass}>
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
        <span className={cx(spanVairants({ variant }), borderRound)}></span>
      </div>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
