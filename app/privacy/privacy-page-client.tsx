"use client";

import { getPrivacyPolicyContent } from "@/lib/content";
import { getTranslations } from "@/lib/translations";
import { LegalPage } from "@/components/sections/legal-page";
import { useLanguage } from "@/components/providers/language-provider";

/**
 * Client component for the Privacy Policy page.
 * Handles locale-aware content loading for all privacy policy sections and
 * renders the shared Atlas {@link LegalPage} layout.
 */
export function PrivacyPageClient(): React.ReactElement {
  const { locale } = useLanguage();
  const content = getPrivacyPolicyContent(locale);
  const t = getTranslations(locale);

  return (
    <LegalPage
      eyebrow={t.legalPages.heroEyebrow}
      title={t.legalPages.privacy.heroTitle}
      subheadline={t.legalPages.privacy.heroSubheadline}
      summary={t.legalPages.privacy.summary}
      lastUpdatedLabel={t.legalPages.lastUpdatedLabel}
      lastUpdated={content.lastUpdated}
      introduction={content.introduction}
      sections={content.sections}
    />
  );
}
