"use client";

import { getTermsOfServiceContent } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { useLanguage } from "@/components/providers/language-provider";

/**
 * Client component for the Terms of Service page.
 * Handles locale-aware content loading for all terms sections.
 */
export function TermsPageClient(): React.ReactElement {
  const { locale } = useLanguage();
  const content = getTermsOfServiceContent(locale);

  return (
    <main>
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {content.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Last updated: {content.lastUpdated}
            </p>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Introduction */}
            <p className="text-lg text-muted-foreground mb-12">
              {content.introduction}
            </p>

            {/* Sections */}
            <div className="space-y-12">
              {content.sections.map((section) => (
                <div key={section.id}>
                  <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.content.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-base text-muted-foreground leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
