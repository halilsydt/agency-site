"use client";

import { Mail } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Props for the ContactInfo component.
 */
export interface ContactInfoProps {
  /** Contact email address */
  email: string;
  /** Optional phone number */
  phone?: string;
  /** Optional physical address */
  address?: string;
}

/**
 * Contact information section displaying alternative contact methods.
 * Shows email with mailto link, and optional phone/address.
 * Supports internationalization through the language context.
 *
 * @param props - ContactInfo component props
 * @param props.email - Email address displayed with mailto link
 * @param props.phone - Optional phone number
 * @param props.address - Optional physical address
 *
 * @example
 * ```tsx
 * <ContactInfo email="hello@agency.com" />
 * ```
 */
export function ContactInfo({
  email,
  phone,
  address,
}: ContactInfoProps): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">
        {t.common.orReachUsDirectly}
      </h2>

      <div className="space-y-4">
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={`Email us at ${email}`}
        >
          <Mail className="h-5 w-5" />
          <span>{email}</span>
        </a>

        {phone && (
          <p className="text-muted-foreground">
            <span className="font-medium">Phone:</span> {phone}
          </p>
        )}

        {address && (
          <p className="text-muted-foreground">
            <span className="font-medium">Address:</span> {address}
          </p>
        )}
      </div>
    </div>
  );
}
