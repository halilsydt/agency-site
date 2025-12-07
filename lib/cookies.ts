/**
 * @fileoverview Cookie consent management utilities.
 * Handles reading and writing consent state to localStorage.
 */

import type { CookieConsentState, CookieConsentStatus } from "./types";

const CONSENT_KEY = "cookie-consent";

/**
 * Gets the current cookie consent state from localStorage.
 *
 * @returns The consent state or null if not yet set
 *
 * @example
 * ```ts
 * const consent = getCookieConsent();
 * if (consent?.status === "accepted") {
 *   loadAnalytics();
 * }
 * ```
 */
export function getCookieConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(CONSENT_KEY);
  return stored ? JSON.parse(stored) : null;
}

/**
 * Saves cookie consent state to localStorage.
 *
 * @param status - The consent status to save
 *
 * @example
 * ```ts
 * setCookieConsent("accepted");
 * ```
 */
export function setCookieConsent(status: CookieConsentStatus): void {
  if (typeof window === "undefined") return;
  const state: CookieConsentState = {
    status,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
}

/**
 * Checks if the user has already made a consent choice.
 *
 * @returns true if consent has been given or declined
 *
 * @example
 * ```ts
 * if (!hasConsentBeenGiven()) {
 *   showConsentBanner();
 * }
 * ```
 */
export function hasConsentBeenGiven(): boolean {
  const consent = getCookieConsent();
  return consent !== null && consent.status !== "pending";
}
