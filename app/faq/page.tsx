"use client";

import { useState } from "react";
import Link from "next/link";
import { getFAQPageContent } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import {
  FAQCategoryFilter,
  type CategoryOption,
} from "@/components/sections/faq-category-filter";

/**
 * FAQ page with filterable questions.
 * Displays all FAQs with category filtering and contact CTA.
 */
export default function FAQPage(): React.ReactElement {
  const { hero, faqs } = getFAQPageContent();
  const [activeCategory, setActiveCategory] = useState<CategoryOption>("all");

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <main>
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {hero.headline}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">
              {hero.subheadline}
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Category Filter */}
            <div className="mb-8">
              <FAQCategoryFilter
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            {/* FAQ Accordion */}
            <FAQAccordion faqs={filteredFaqs} />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Still Have Questions?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We&apos;re here to help. Reach out and we&apos;ll get back to you
              promptly.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
