"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/api/plausible";

/**
 * Client component that tracks pricing page views.
 * Fires the pricing_page_view event once on mount.
 *
 * @example
 * ```tsx
 * // In pricing page
 * <PricingPageTracker />
 * ```
 */
export function PricingPageTracker(): null {
  useEffect(() => {
    trackEvent("pricing_page_view");
  }, []);

  return null;
}
