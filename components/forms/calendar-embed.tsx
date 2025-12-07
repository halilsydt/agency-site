"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { trackEvent } from "@/lib/api/plausible";

/**
 * Props for the CalendarEmbed component.
 */
export interface CalendarEmbedProps {
  /** Cal.com link in format "username/event-type" */
  calLink?: string;
}

/**
 * Embeds Cal.com scheduling widget.
 * Displays available time slots for booking consultations.
 *
 * @example
 * ```tsx
 * // Using environment variable
 * <CalendarEmbed />
 *
 * // Using explicit link
 * <CalendarEmbed calLink="username/consultation" />
 * ```
 */
export function CalendarEmbed({ calLink }: CalendarEmbedProps): React.ReactElement {
  const calendarLink = calLink || process.env.NEXT_PUBLIC_CAL_LINK;

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#3b82f6" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      trackEvent("booking_initiated");
    })();
  }, []);

  if (!calendarLink) {
    return (
      <div className="p-8 text-center text-foreground/70 bg-muted rounded-lg">
        <p>Calendar booking is not configured yet.</p>
        <p className="text-sm mt-2">
          Please set NEXT_PUBLIC_CAL_LINK environment variable.
        </p>
      </div>
    );
  }

  return (
    <Cal
      calLink={calendarLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
