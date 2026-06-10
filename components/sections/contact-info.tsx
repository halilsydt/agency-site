"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Props for the ContactInfo component.
 */
export interface ContactInfoProps {
  /** Contact email address (rendered as a `mailto` link). */
  email: string;
}

/** Green `.ic` icon tile wrapping a verbatim Atlas glyph (`aria-hidden`). */
function IconTile({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <span className="flex size-11 flex-none items-center justify-center rounded-[12px] bg-green-soft text-green-d">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="size-[21px]"
        aria-hidden="true"
      >
        {children}
      </svg>
    </span>
  );
}

/**
 * Atlas `.contact-info` list (atlas.css:332–339, Contact.html:64–81). Renders
 * four `.ci` rows — Email (a `mailto` link), Phone, Working remotely, and
 * Response time — each with a green `.ic` icon tile and a label/body column.
 * All copy except the literal email address is internationalized.
 *
 * @param props - {@link ContactInfoProps}
 * @param props.email - Email address displayed with a `mailto` link
 *
 * @example
 * ```tsx
 * <ContactInfo email="admin@scalenty.net" />
 * ```
 */
export function ContactInfo({ email }: ContactInfoProps): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);
  const c = t.contactPage;

  return (
    <div className="mt-[26px] flex flex-col gap-1">
      {/* Email */}
      <div className="flex items-start gap-[15px] border-b border-line py-4 last:border-b-0">
        <IconTile>
          <path d="M4 4h16v16H4z" />
          <path d="M4 7l8 6 8-6" />
        </IconTile>
        <div>
          <h4 className="font-disp text-[15px] font-bold">{c.emailLabel}</h4>
          <a
            href={`mailto:${email}`}
            className="mt-[2px] block text-[14.5px] text-soft hover:text-green-d"
          >
            {email}
          </a>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start gap-[15px] border-b border-line py-4 last:border-b-0">
        <IconTile>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
        </IconTile>
        <div>
          <h4 className="font-disp text-[15px] font-bold">{c.phoneRow.label}</h4>
          <p className="mt-[2px] text-[14.5px] text-soft">{c.phoneRow.value}</p>
        </div>
      </div>

      {/* Working remotely */}
      <div className="flex items-start gap-[15px] border-b border-line py-4 last:border-b-0">
        <IconTile>
          <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </IconTile>
        <div>
          <h4 className="font-disp text-[15px] font-bold">{c.remoteRow.label}</h4>
          <p className="mt-[2px] text-[14.5px] text-soft">{c.remoteRow.value}</p>
        </div>
      </div>

      {/* Response time */}
      <div className="flex items-start gap-[15px] border-b border-line py-4 last:border-b-0">
        <IconTile>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </IconTile>
        <div>
          <h4 className="font-disp text-[15px] font-bold">
            {c.responseRow.label}
          </h4>
          <p className="mt-[2px] text-[14.5px] text-soft">
            {c.responseRow.value}
          </p>
        </div>
      </div>
    </div>
  );
}
