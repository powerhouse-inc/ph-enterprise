"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding font-mono text-sm font-semibold whitespace-nowrap uppercase tracking-normal transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border bg-[rgba(4,19,34,0.52)] text-t1 hover:border-brand hover:bg-brand-low hover:text-brand",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
        cta: "border-brand bg-brand text-[#041322] shadow-[0_0_0_1px_rgba(4,193,97,0.25),0_14px_40px_rgba(4,193,97,0.18)] hover:bg-[#00D46E] hover:-translate-y-px",
      },
      size: {
        default: "h-8 gap-1.5 px-2.5",
        sm: "h-7 gap-1 rounded-md px-2.5 text-[0.8rem]",
        lg: "h-9 gap-1.5 px-2.5",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  render,
  nativeButton,
  style,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const mergedClassName = cn(buttonVariants({ variant, size, className }));

  if (asChild) {
    return <Slot data-slot="button" className={mergedClassName} {...props} />;
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      className={mergedClassName}
      render={render}
      nativeButton={nativeButton}
      style={style}
      {...props}
    />
  );
}

export { Button, buttonVariants };
