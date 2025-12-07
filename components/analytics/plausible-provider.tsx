import Script from "next/script";

/**
 * Props for the PlausibleProvider component.
 */
export interface PlausibleProviderProps {
  /** Children to render */
  children: React.ReactNode;
}

/**
 * Plausible Analytics provider component.
 * Loads the Plausible script for privacy-friendly analytics.
 * Only renders script when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is configured.
 *
 * Note: Plausible Analytics is cookie-free by default and GDPR-compliant
 * without requiring cookie consent. The script loads regardless of consent
 * status. See: https://plausible.io/data-policy
 *
 * @example
 * ```tsx
 * // In app/layout.tsx
 * <PlausibleProvider>
 *   {children}
 * </PlausibleProvider>
 * ```
 */
export function PlausibleProvider({
  children,
}: PlausibleProviderProps): React.ReactElement {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  // Plausible is privacy-first and does not use cookies.
  // No consent check required - loads unconditionally when domain is set.
  return (
    <>
      {domain && (
        <Script
          defer
          data-domain={domain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
      {children}
    </>
  );
}
