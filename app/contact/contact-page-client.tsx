"use client";

import { getContactContent } from "@/lib/content";
import { ContactHero } from "@/components/sections/contact-hero";
import { ContactInfo } from "@/components/sections/contact-info";
import { ContactForm } from "@/components/forms/contact-form";
import { BookingDialog } from "@/components/forms/booking-dialog";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/** Right-arrow icon that nudges on hover (Atlas `.btn-green`). */
function ArrowIcon(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      className="size-[17px] transition-transform duration-200 group-hover/book:translate-x-[3px]"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * Client component for the Contact page.
 * Re-skinned to the Atlas layout: a `.phero` hero, then a `.contact-grid`
 * (`1.1fr .9fr`) with the message `.form-card` on the left and a stacked right
 * column (ink `.call-card` → Cal.com booking + the `.contact-info` `.ci` list).
 * Handles locale-aware content loading for all contact page sections.
 */
export function ContactPageClient(): React.ReactElement {
  const { locale } = useLanguage();
  const contact = getContactContent(locale);
  const t = getTranslations(locale);
  const c = t.contactPage;

  return (
    <main>
      <ContactHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subheadline={c.heroSubheadline}
      />

      <section className="pt-10">
        <div className="wrap grid grid-cols-1 items-start gap-9 min-[821px]:grid-cols-[1.1fr_.9fr]">
          {/* Left: message form card */}
          <Reveal className="rounded-[24px] border border-line bg-surface p-[38px] shadow-sh-sm">
            <h2 className="font-disp text-[26px] font-bold tracking-[-.01em]">
              {c.sendMessage}
            </h2>
            <p className="mb-[26px] mt-[6px] text-[15px] text-soft">
              {c.formCardSub}
            </p>
            <ContactForm />
          </Reveal>

          {/* Right: ink call-card + contact-info list */}
          <Reveal delay={1}>
            <div className="relative overflow-hidden rounded-[24px] bg-ink p-8 text-white">
              {/* emerald radial overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 100% at 100% 0%,rgba(14,140,90,.4),rgba(21,32,27,0) 65%)",
                }}
              />
              <h4 className="relative font-disp text-[22px] font-bold">
                {c.callHeadline}
              </h4>
              <p className="relative mb-[22px] mt-3 text-[15px] text-white/70">
                {c.callBody}
              </p>
              <BookingDialog
                trigger={
                  <button
                    type="button"
                    className="group/book relative inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-[12px] border-[1.5px] border-transparent bg-green px-8 py-[14px] font-disp text-base font-semibold text-white shadow-[0_10px_24px_-10px_rgba(14,140,90,.6)] transition-all duration-200 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:-translate-y-0.5 hover:bg-green-d focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
                  >
                    {t.common.bookFreeConsultation}
                    <ArrowIcon />
                  </button>
                }
              />
            </div>

            <ContactInfo email={contact.contactInfo.email} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
