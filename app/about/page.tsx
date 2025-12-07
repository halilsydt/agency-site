import type { Metadata } from "next";
import Link from "next/link";
import { getAboutContent } from "@/lib/content";
import { AboutHero } from "@/components/sections/about-hero";
import { MissionSection } from "@/components/sections/mission-section";
import { ApproachSection } from "@/components/sections/approach-section";
import { ExperienceHighlights } from "@/components/sections/experience-highlights";
import { TeamSection } from "@/components/sections/team-section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

/**
 * SEO metadata for the About Us page.
 */
export const metadata: Metadata = {
  title: "About Us | Marketplace Consultants",
  description:
    "Learn about our team and our honest, results-driven approach to Amazon and Etsy seller consulting. 5+ years of experience helping 100+ clients succeed.",
  openGraph: {
    title: "About Us | Marketplace Consultants",
    description:
      "Meet our team of marketplace experts dedicated to helping sellers succeed.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Marketplace Consultants",
    description:
      "Meet our team of marketplace experts dedicated to helping sellers succeed.",
  },
};

/**
 * About Us page.
 * Displays agency information, mission, approach, team, and experience highlights.
 */
export default function AboutPage(): React.ReactElement {
  const about = getAboutContent();

  return (
    <main>
      <AboutHero
        headline={about.hero.headline}
        subheadline={about.hero.subheadline}
      />

      <MissionSection
        headline={about.mission.headline}
        text={about.mission.text}
      />

      <ApproachSection
        headline={about.approach.headline}
        description={about.approach.description}
        points={about.approach.points}
      />

      <ExperienceHighlights highlights={about.highlights} />

      <TeamSection headline="Meet the Founder" team={about.team} />

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Ready to Grow Your Business?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Let&apos;s discuss how we can help you achieve your marketplace
              goals.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">Book a Free Consultation</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
