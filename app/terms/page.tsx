import type { Metadata } from "next";
import { getTermsOfServiceContent } from "@/lib/content";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Terms of Service | Scalenty",
  description:
    "Read our terms of service and conditions for using our consulting services.",
  openGraph: {
    title: "Terms of Service | Scalenty",
    description:
      "Read our terms of service and conditions for using our consulting services.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Scalenty",
    description:
      "Read our terms of service and conditions for using our consulting services.",
  },
};

/**
 * Terms of Service page.
 * Displays the terms of service content with sections for service terms,
 * disclaimers, liability limitations, and other legal information.
 */
export default function TermsPage(): React.ReactElement {
  const content = getTermsOfServiceContent();

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
