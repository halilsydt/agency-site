import type { Metadata } from "next";
import { getPrivacyPolicyContent } from "@/lib/content";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Privacy Policy | Marketplace Consultants",
  description:
    "Learn how Marketplace Consultants collects, uses, and protects your personal information.",
  openGraph: {
    title: "Privacy Policy | Marketplace Consultants",
    description:
      "Learn how Marketplace Consultants collects, uses, and protects your personal information.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Marketplace Consultants",
    description:
      "Learn how Marketplace Consultants collects, uses, and protects your personal information.",
  },
};

/**
 * Privacy Policy page.
 * Displays the privacy policy content with sections for data collection,
 * cookies, third-party services, user rights, and contact information.
 */
export default function PrivacyPage(): React.ReactElement {
  const content = getPrivacyPolicyContent();

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
