"use client";

import { getContactContent } from "@/lib/content";
import { ContactHero } from "@/components/sections/contact-hero";
import { ContactInfo } from "@/components/sections/contact-info";
import { ContactForm } from "@/components/forms/contact-form";
import { CalendarEmbed } from "@/components/forms/calendar-embed";
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
          {/* Two-column layout: Contact Form (left) and Booking Calendar (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Send us a message */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                {t.contactPage.sendMessage}
              </h2>
              <ContactForm />
            </div>

            {/* Right: Book Your Free Consultation */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {contact.booking.headline}
              </h2>
              <p className="text-muted-foreground mb-6">
                {contact.booking.subheadline}
              </p>
              <div className="min-h-[500px]">
                <CalendarEmbed />
              </div>
            </div>
          </div>

          {/* Centered: Or reach us directly */}
          <div className="mt-16 text-center">
            <ContactInfo email={contact.contactInfo.email} />
          </div>
        </Container>
      </section>
    </main>
  );
}
