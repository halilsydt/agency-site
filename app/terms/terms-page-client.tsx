"use client";

import { getTermsOfServiceContent } from "@/lib/content";
import { getTranslations } from "@/lib/translations";
import { LegalPage } from "@/components/sections/legal-page";
import { useLanguage } from "@/components/providers/language-provider";

/**
 * Client component for the Terms of Service page.
 * Handles locale-aware content loading for all terms sections and renders the
 * shared Atlas {@link LegalPage} layout.
 */
export function TermsPageClient(): React.ReactElement {
  const { locale } = useLanguage();
  const content = getTermsOfServiceContent(locale);
  const t = getTranslations(locale);

  return (
    <LegalPage
      eyebrow={t.legalPages.heroEyebrow}
      title={t.legalPages.terms.heroTitle}
      subheadline={t.legalPages.terms.heroSubheadline}
      summary={t.legalPages.terms.summary}
      lastUpdatedLabel={t.legalPages.lastUpdatedLabel}
      lastUpdated={content.lastUpdated}
      introduction={content.introduction}
      sections={content.sections}
    />
  );
}
