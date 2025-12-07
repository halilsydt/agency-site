"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Props for the CookieConsentBanner component.
 */
export interface CookieConsentBannerProps {
  /** Handler called when user accepts cookies */
  onAccept: () => void;
  /** Handler called when user declines cookies */
  onDecline: () => void;
}

/**
 * Cookie consent banner component.
 * Displays a fixed bottom banner for GDPR compliance.
 * Presents Accept/Decline options and links to Privacy Policy.
 *
 * @param props - Component props
 * @param props.onAccept - Handler called when user accepts cookies
 * @param props.onDecline - Handler called when user declines cookies
 *
 * @example
 * ```tsx
 * <CookieConsentBanner
 *   onAccept={() => saveConsent("accepted")}
 *   onDecline={() => saveConsent("declined")}
 * />
 * ```
 */
export function CookieConsentBanner({
  onAccept,
  onDecline,
}: CookieConsentBannerProps): React.ReactElement {
  return (
    <div
      role="region"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg md:p-6"
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          We use cookies to improve your experience.{" "}
          <Link
            href="/privacy"
            className="underline hover:text-primary"
          >
            Privacy Policy
          </Link>
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onDecline}>
            Decline
          </Button>
          <Button onClick={onAccept}>Accept</Button>
        </div>
      </div>
    </div>
  );
}
