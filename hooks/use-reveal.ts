"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Return value of {@link useReveal}.
 */
export interface RevealResult<T extends HTMLElement> {
  /** Ref to attach to the element that should reveal on scroll. */
  ref: React.RefObject<T>;
  /** `true` once the element has entered the viewport (or immediately when reduced-motion). */
  inView: boolean;
}

/**
 * Reveal-on-scroll trigger ported from Atlas (atlas.js:91–95).
 *
 * Sets `inView` to `true` the first time the element enters the viewport,
 * using `IntersectionObserver` with `rootMargin: '0px 0px -18% 0px'` so the
 * reveal fires slightly before the element is fully visible, then unobserves.
 *
 * Honors `prefers-reduced-motion`: reports `inView: true` immediately so
 * content shows with no transform. SSR-safe.
 *
 * Pair with the `.reveal` / `.reveal.in` CSS in `globals.css` (add the `in`
 * class when `inView` is true).
 *
 * @typeParam T - Element type the returned ref attaches to.
 * @returns A `ref` to attach and the `inView` flag.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(): RevealResult<T> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -18% 0px" }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [reducedMotion]);

  return { ref, inView };
}
