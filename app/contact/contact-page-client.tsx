"use client";

import { getContactContent } from "@/lib/content";
import { ContactHero } from "@/components/sections/contact-hero";
import { ContactInfo } from "@/components/sections/contact-info";
import { ContactForm } from "@/components/forms/contact-form";
import { BookingSection } from "@/components/sections/booking-section";
import { Container } from "@/components/layout/container";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Client component for the Contact page.
 * Handles locale-aware content loading for all contact page sections.
 */
export function ContactPageClient(): React.ReactElement {
  const { locale } = useLanguage();
  const contact = getContactContent(locale);
  const t = getTranslations(locale);

  return (
    <main>
      <ContactHero
        headline={contact.hero.headline}
        subheadline={contact.hero.subheadline}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                {t.contactPage.sendMessage}
              </h2>
              <ContactForm />
            </div>
            <div>
              <ContactInfo email={contact.contactInfo.email} />
            </div>
          </div>
        </Container>
      </section>

      <BookingSection
        headline={contact.booking.headline}
        subheadline={contact.booking.subheadline}
      />
    </main>
  );
}
