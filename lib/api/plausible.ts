/**
 * @fileoverview Plausible Analytics event tracking utility.
 */

/**
 * Supported analytics events for type safety.
 */
export type AnalyticsEvent =
  | "contact_form_submit"
  | "email_signup"
  | "booking_initiated"
  | "pricing_page_view";

/**
 * Type definition for Plausible function on window object.
 */
declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, string> }
    ) => void;
  }
}

/**
 * Tracks a custom event in Plausible Analytics.
 * No-op if Plausible is not loaded or analytics is disabled.
 *
 * @param eventName - The name of the event to track
 * @param props - Optional properties to attach to the event
 *
 * @example
 * ```ts
 * // Track form submission
 * trackEvent("contact_form_submit", { platform: "amazon" });
 *
 * // Track page view
 * trackEvent("pricing_page_view");
 * ```
 */
export function trackEvent(
  eventName: AnalyticsEvent,
  props?: Record<string, string>
): void {
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(eventName, props ? { props } : undefined);
  }
}
