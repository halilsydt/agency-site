"use client";

import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";

/**
 * Props for the {@link Reveal} component.
 */
export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content to reveal on scroll. */
  children: React.ReactNode;
  /** Use the "pop" variant (scale + translate) instead of plain translate. */
  pop?: boolean;
  /** Stagger delay step (1–3), maps to Atlas `data-d` transition-delays. */
  delay?: 1 | 2 | 3;
  /** Render as a `<section>` instead of a `<div>`. */
  as?: "div" | "section";
}

/**
 * Wraps content in an Atlas reveal-on-scroll container. Adds the `.reveal` (or
 * `.reveal.pop`) class and toggles `.in` when the element scrolls into view via
 * {@link useReveal}, which honors `prefers-reduced-motion`.
 *
 * The matching transition CSS lives in `app/globals.css` (sourced from
 * `atlas.css:138–145`).
 *
 * @param props - {@link RevealProps}.
 */
export function Reveal({
  children,
  pop = false,
  delay,
  as = "div",
  className,
  ...rest
}: RevealProps): React.ReactElement {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const Comp = as;

  return (
    <Comp
      ref={ref}
      data-d={delay}
      className={cn("reveal", pop && "pop", inView && "in", className)}
      {...rest}
    >
      {children}
    </Comp>
  );
}
