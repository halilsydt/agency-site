"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarEmbed } from "@/components/forms/calendar-embed";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Props for the BookingDialog component.
 */
export interface BookingDialogProps {
  /** Custom trigger element. If not provided, uses default button */
  trigger?: React.ReactNode;
  /** Button variant when using default trigger */
  variant?: "default" | "outline" | "ghost" | "link";
  /** Button size when using default trigger */
  size?: "default" | "sm" | "lg";
  /** Custom button text */
  buttonText?: string;
  /** Additional className for the trigger button */
  className?: string;
}

/**
 * Dialog component for booking consultations.
 * Opens a modal with the Cal.com calendar embed.
 *
 * @example
 * ```tsx
 * // Default usage
 * <BookingDialog />
 *
 * // With custom trigger
 * <BookingDialog trigger={<span>Click to book</span>} />
 *
 * // With custom button props
 * <BookingDialog variant="outline" size="lg" buttonText="Schedule Now" />
 * ```
 */
export function BookingDialog({
  trigger,
  variant = "default",
  size = "default",
  buttonText,
  className,
}: BookingDialogProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const { locale } = useLanguage();
  const t = getTranslations(locale);

  const defaultTrigger = (
    <Button variant={variant} size={size} className={className}>
      {buttonText || t.common.bookFreeConsultation}
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t.common.bookFreeConsultation}</DialogTitle>
          <DialogDescription>
            {locale === "tr"
              ? "Size en uygun zamanı seçin ve ücretsiz danışmanlık görüşmesi planlayalım."
              : "Choose a time that works for you and let's schedule a free consultation call."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 min-h-0 overflow-hidden">
          <CalendarEmbed />
        </div>
      </DialogContent>
    </Dialog>
  );
}
