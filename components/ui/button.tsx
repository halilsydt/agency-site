import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button variant styles using class-variance-authority.
 * Defines all available button variants and sizes for the design system.
 */
const buttonVariants = cva(
  // Atlas .btn base (atlas.css:35–43): display font, semibold, 9px gap, 12px radius,
  // 1.5px transparent border, Atlas easing, 17px icons with hover nudge on green.
  "inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-[12px] font-disp text-[15px] font-semibold border-[1.5px] border-transparent transition-all duration-200 ease-[cubic-bezier(.2,.7,.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-[17px] [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200",
  {
    variants: {
      variant: {
        // .btn-green: emerald + soft glow, hover darker + lift + stronger glow + icon nudge
        default:
          "bg-green text-white shadow-[0_10px_24px_-10px_rgba(14,140,90,.6)] hover:bg-green-d hover:text-white hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-10px_rgba(14,140,90,.65)] hover:[&_svg]:translate-x-[3px] no-underline hover:no-underline",
        // .btn-ink: ink, hover darker + lift
        secondary:
          "bg-ink text-white hover:bg-ink-2 hover:text-white hover:-translate-y-0.5 no-underline hover:no-underline",
        // .btn-ghost: transparent, ink text, line border; hover → ink border + surface
        outline:
          "bg-transparent text-ink border-line hover:border-ink hover:bg-surface hover:text-ink no-underline hover:no-underline",
        // .btn-ghost (borderless variant) — same ghost family, no resting border color
        ghost:
          "bg-transparent text-ink hover:border-ink hover:bg-surface hover:text-ink no-underline hover:no-underline",
        // text link: emerald, underline on hover
        link: "border-transparent text-green underline-offset-4 hover:underline hover:text-green-d",
        // clay CTA treatment
        accent:
          "bg-clay text-white shadow-[0_10px_24px_-10px_rgba(180,90,55,.5)] hover:bg-clay/90 hover:text-white hover:-translate-y-0.5 no-underline hover:no-underline",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/90 hover:text-white no-underline hover:no-underline",
      },
      size: {
        // Atlas default padding ≈ 14px 24px; heights kept distinguishable for size tests.
        default: "h-11 px-6 py-[14px]",
        sm: "h-9 px-4 text-[13.5px]",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Props for the Button component.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a child component using Radix Slot */
  asChild?: boolean;
}

/**
 * Primary button component for user interactions.
 * Supports multiple variants (default, secondary, outline, ghost, link, accent)
 * and sizes (sm, default, lg, icon).
 *
 * @param props - Button props including variant, size, and standard button attributes
 *
 * @example
 * ```tsx
 * // Primary button
 * <Button>Click me</Button>
 *
 * // Outline variant
 * <Button variant="outline">Learn more</Button>
 *
 * // As a link
 * <Button asChild>
 *   <a href="/contact">Contact us</a>
 * </Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
