import type { Metadata } from "next";
import { getContactContent } from "@/lib/content";
import { ContactHero } from "@/components/sections/contact-hero";
import { ContactInfo } from "@/components/sections/contact-info";
import { ContactForm } from "@/components/forms/contact-form";
import { BookingSection } from "@/components/sections/booking-section";
import { Container } from "@/components/layout/container";

/**
 * SEO metadata for the Contact page.
 */
export const metadata: Metadata = {
  title: "Contact Us | Scalenty",
  description:
    "Get in touch with our team. Ask questions about Amazon or Etsy consulting services, or book a free consultation.",
  openGraph: {
    title: "Contact Us | Scalenty",
    description:
      "Have questions? Reach out to our marketplace consulting experts.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Scalenty",
    description:
      "Have questions? Reach out to our marketplace consulting experts.",
  },
};

/**
 * Contact page.
 * Displays contact form and contact information for reaching the agency.
 */
export default function ContactPage(): React.ReactElement {
  const contact = getContactContent();

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
                Send us a message
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
