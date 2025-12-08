"use client";

import Link from "next/link";
import { getAboutContent } from "@/lib/content";
import { AboutHero } from "@/components/sections/about-hero";
import { MissionSection } from "@/components/sections/mission-section";
import { ApproachSection } from "@/components/sections/approach-section";
import { ExperienceHighlights } from "@/components/sections/experience-highlights";
import { TeamSection } from "@/components/sections/team-section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Client component for the About Us page.
 * Handles locale-aware content loading for all about page sections.
 */
export function AboutPageClient(): React.ReactElement {
  const { locale } = useLanguage();
  const about = getAboutContent(locale);
  const t = getTranslations(locale);

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

      <TeamSection headline={t.aboutPage.meetTheFounder} team={about.team} />

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {t.aboutPage.ctaHeadline}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t.aboutPage.ctaDescription}
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">{t.common.bookFreeConsultation}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
