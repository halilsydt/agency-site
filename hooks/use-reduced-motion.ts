"use client";

import { useEffect, useState } from "react";

/**
 * Reports whether the user has requested reduced motion via the OS-level
 * `prefers-reduced-motion: reduce` setting.
 *
 * SSR-safe: returns `false` on the server / first client render, then updates
 * after mount once `matchMedia` is available. Animation hooks consume this to
 * decide whether to animate or jump straight to the final state.
 *
 * @returns `true` when the user prefers reduced motion, otherwise `false`.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const onChange = (event: MediaQueryListEvent): void => {
      setReduced(event.matches);
    };
    // Older Safari only supports the deprecated addListener signature.
    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);

  return reduced;
}
