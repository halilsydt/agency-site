"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Options for {@link useCountUp}.
 */
export interface CountUpOptions {
  /** Target value to count up to. */
  to: number;
  /** Optional prefix prepended to the displayed value (e.g. "$"). */
  prefix?: string;
  /** Optional suffix appended to the displayed value (e.g. "+", "M+"). */
  suffix?: string;
  /** Number of decimal places to render. Defaults to 0. */
  decimals?: number;
  /** Animation duration in milliseconds. Defaults to 1300ms (Atlas). */
  duration?: number;
}

/**
 * Return value of {@link useCountUp}.
 */
export interface CountUpResult<T extends HTMLElement> {
  /** Ref to attach to the element that should trigger the count when visible. */
  ref: React.RefObject<T>;
  /** Formatted display string (prefix + value + suffix). */
  value: string;
}

/**
 * Animated count-up that starts when the target element scrolls into view.
 *
 * Ports Atlas's `countUp` (atlas.js:97–107) to idiomatic React: an
 * `IntersectionObserver` triggers an ease-out-cubic `requestAnimationFrame`
 * ramp from 0 → `to` over ~1300ms, firing once then unobserving.
 *
 * Honors `prefers-reduced-motion`: jumps straight to the final value with no
 * animation. SSR-safe — observers are wired in `useEffect`.
 *
 * @typeParam T - Element type the returned ref attaches to.
 * @param options - Count-up configuration ({@link CountUpOptions}).
 * @returns A `ref` to attach and the formatted `value` string.
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1300,
}: CountUpOptions): CountUpResult<T> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      setCurrent(to);
      return;
    }

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // Without an observer (or element) fall back to showing the final value.
      setCurrent(to);
      return;
    }

    let rafId = 0;

    const run = (): void => {
      if (startedRef.current) return;
      startedRef.current = true;
      const start = performance.now();
      const tick = (now: number): void => {
        const progress = Math.min((now - start) / duration, 1);
        // ease-out cubic (atlas.js)
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrent(to * eased);
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setCurrent(to);
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            run();
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [to, duration, reducedMotion]);

  const display = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();

  return { ref, value: `${prefix}${display}${suffix}` };
}
