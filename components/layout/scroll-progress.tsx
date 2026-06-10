"use client";

import * as React from "react";

/**
 * Fixed scroll-progress indicator pinned to the top of the viewport.
 * The bar's width tracks how far the document has been scrolled
 * (`scrollTop / (scrollHeight - clientHeight)`), rendering a green→clay
 * gradient. Mirrors the Atlas `.scrollbar` behaviour (`atlas.js:83–89`,
 * `atlas.css:79`).
 *
 * Mounted globally above the header in `app/layout.tsx`. It is a functional
 * indicator (not a decorative entrance animation), so it intentionally has no
 * `prefers-reduced-motion` opt-out beyond the absence of any entrance effect.
 *
 * @example
 * ```tsx
 * // In app/layout.tsx, above <Header />
 * <ScrollProgress />
 * ```
 */
export function ScrollProgress(): React.ReactElement {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight || 1;
      setProgress(Math.min(1, Math.max(0, el.scrollTop / max)));
    };

    // Coalesce scroll events into a single rAF tick.
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      data-testid="scroll-progress"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className="fixed left-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-green to-clay transition-[width] duration-100 ease-linear"
      style={{ width: `${progress * 100}%` }}
    />
  );
}
