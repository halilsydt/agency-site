"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { getCookieConsent, setCookieConsent } from "@/lib/cookies";
import { CookieConsentBanner } from "./cookie-consent-banner";
import type { CookieConsentStatus } from "@/lib/types";

/**
 * Cookie consent context value interface.
 */
export interface CookieConsentContextValue {
  /** Whether the user has accepted cookies */
  hasConsent: boolean;
  /** Whether the user has responded to the consent prompt */
  hasResponded: boolean;
  /** Function to accept cookies */
  giveConsent: () => void;
  /** Function to decline cookies */
  denyConsent: () => void;
}

const CookieConsentContext = createContext<
  CookieConsentContextValue | undefined
>(undefined);

/**
 * Props for the CookieConsentProvider component.
 */
export interface CookieConsentProviderProps {
  /** Children to render */
  children: ReactNode;
}

/**
 * Cookie consent context provider.
 * Manages consent state and renders the consent banner when needed.
 * Respects the NEXT_PUBLIC_COOKIE_CONSENT_ENABLED environment variable.
 *
 * @param props - Component props
 * @param props.children - Children to render
 *
 * @example
 * ```tsx
 * // In app/layout.tsx
 * <CookieConsentProvider>
 *   <PlausibleProvider>
 *     {children}
 *   </PlausibleProvider>
 * </CookieConsentProvider>
 * ```
 */
export function CookieConsentProvider({
  children,
}: CookieConsentProviderProps): React.ReactElement {
  const [status, setStatus] = useState<CookieConsentStatus>("pending");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const consent = getCookieConsent();
    if (consent) {
      setStatus(consent.status);
    }
    setIsLoaded(true);
  }, []);

  const giveConsent = () => {
    setCookieConsent("accepted");
    setStatus("accepted");
  };

  const denyConsent = () => {
    setCookieConsent("declined");
    setStatus("declined");
  };

  const value: CookieConsentContextValue = {
    hasConsent: status === "accepted",
    hasResponded: status !== "pending",
    giveConsent,
    denyConsent,
  };

  const isEnabled =
    process.env.NEXT_PUBLIC_COOKIE_CONSENT_ENABLED !== "false";
  const showBanner = isEnabled && isLoaded && status === "pending";

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {showBanner && (
        <CookieConsentBanner onAccept={giveConsent} onDecline={denyConsent} />
      )}
    </CookieConsentContext.Provider>
  );
}

/**
 * Hook to access cookie consent state and methods.
 *
 * @returns Cookie consent context value
 * @throws Error if used outside of CookieConsentProvider
 *
 * @example
 * ```tsx
 * function AnalyticsLoader() {
 *   const { hasConsent } = useCookieConsent();
 *
 *   if (!hasConsent) return null;
 *
 *   return <AnalyticsScript />;
 * }
 * ```
 */
export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider"
    );
  }
  return context;
}
