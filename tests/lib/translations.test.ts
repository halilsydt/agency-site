import { describe, it, expect } from "vitest";
import { getTranslations, type Translations } from "@/lib/translations";
import type { Locale } from "@/lib/types";

describe("translations", () => {
  describe("getTranslations", () => {
    it("returns English translations for 'en' locale", () => {
      const t = getTranslations("en");

      expect(t.nav.services).toBe("Services");
      expect(t.nav.pricing).toBe("Pricing");
      expect(t.nav.about).toBe("About");
      expect(t.nav.contact).toBe("Contact");
    });

    it("returns Turkish translations for 'tr' locale", () => {
      const t = getTranslations("tr");

      expect(t.nav.services).toBe("Hizmetler");
      expect(t.nav.pricing).toBe("Fiyatlandırma");
      expect(t.nav.about).toBe("Hakkımızda");
      expect(t.nav.contact).toBe("İletişim");
    });

    it("includes footer translations for English", () => {
      const t = getTranslations("en");

      expect(t.footer.quickLinks).toBe("Quick Links");
      expect(t.footer.contact).toBe("Contact");
      expect(t.footer.followUs).toBe("Follow Us");
      expect(t.footer.privacyPolicy).toBe("Privacy Policy");
      expect(t.footer.termsOfService).toBe("Terms of Service");
      expect(t.footer.copyright).toContain("{year}");
    });

    it("includes footer translations for Turkish", () => {
      const t = getTranslations("tr");

      expect(t.footer.quickLinks).toBe("Hızlı Bağlantılar");
      expect(t.footer.contact).toBe("İletişim");
      expect(t.footer.followUs).toBe("Bizi Takip Edin");
      expect(t.footer.privacyPolicy).toBe("Gizlilik Politikası");
      expect(t.footer.termsOfService).toBe("Kullanım Şartları");
      expect(t.footer.copyright).toContain("{year}");
    });

    it("includes mobile nav translations for English", () => {
      const t = getTranslations("en");

      expect(t.mobileNav.navigation).toBe("Navigation");
      expect(t.mobileNav.theme).toBe("Theme");
      expect(t.mobileNav.language).toBe("Language");
    });

    it("includes mobile nav translations for Turkish", () => {
      const t = getTranslations("tr");

      expect(t.mobileNav.navigation).toBe("Gezinti");
      expect(t.mobileNav.theme).toBe("Tema");
      expect(t.mobileNav.language).toBe("Dil");
    });

    it("includes common UI translations for English", () => {
      const t = getTranslations("en");

      expect(t.common.faqCtaHeadline).toBe("Still Have Questions?");
      expect(t.common.contactUs).toBe("Contact Us");
    });

    it("includes common UI translations for Turkish", () => {
      const t = getTranslations("tr");

      expect(t.common.faqCtaHeadline).toBe("Hâlâ Sorularınız mı Var?");
      expect(t.common.contactUs).toBe("Bize Ulaşın");
    });

    it("includes Amazon and Etsy service labels for English", () => {
      const t = getTranslations("en");

      expect(t.nav.amazonServices).toBe("Amazon Services");
      expect(t.nav.etsyServices).toBe("Etsy Services");
    });

    it("includes Amazon and Etsy service labels for Turkish", () => {
      const t = getTranslations("tr");

      expect(t.nav.amazonServices).toBe("Amazon Hizmetleri");
      expect(t.nav.etsyServices).toBe("Etsy Hizmetleri");
    });
  });

  describe("translation structure", () => {
    const locales: Locale[] = ["en", "tr"];

    locales.forEach((locale) => {
      it(`${locale} translations have all required keys`, () => {
        const t = getTranslations(locale);

        // Nav keys
        expect(t.nav).toBeDefined();
        expect(t.nav.services).toBeDefined();
        expect(t.nav.amazonServices).toBeDefined();
        expect(t.nav.etsyServices).toBeDefined();
        expect(t.nav.pricing).toBeDefined();
        expect(t.nav.about).toBeDefined();
        expect(t.nav.contact).toBeDefined();

        // Footer keys
        expect(t.footer).toBeDefined();
        expect(t.footer.quickLinks).toBeDefined();
        expect(t.footer.contact).toBeDefined();
        expect(t.footer.followUs).toBeDefined();
        expect(t.footer.privacyPolicy).toBeDefined();
        expect(t.footer.termsOfService).toBeDefined();
        expect(t.footer.tagline).toBeDefined();
        expect(t.footer.copyright).toBeDefined();

        // Mobile nav keys
        expect(t.mobileNav).toBeDefined();
        expect(t.mobileNav.navigation).toBeDefined();
        expect(t.mobileNav.theme).toBeDefined();
        expect(t.mobileNav.language).toBeDefined();

        // Common keys
        expect(t.common).toBeDefined();
        expect(t.common.faqCtaHeadline).toBeDefined();
        expect(t.common.faqCtaDescription).toBeDefined();
        expect(t.common.contactUs).toBeDefined();
      });

      it(`${locale} translations have non-empty string values`, () => {
        const t = getTranslations(locale);

        // Check nav values are non-empty
        Object.values(t.nav).forEach((value) => {
          expect(value).toBeTruthy();
          expect(typeof value).toBe("string");
        });

        // Check footer values are non-empty
        Object.values(t.footer).forEach((value) => {
          expect(value).toBeTruthy();
          expect(typeof value).toBe("string");
        });

        // Check mobile nav values are non-empty
        Object.values(t.mobileNav).forEach((value) => {
          expect(value).toBeTruthy();
          expect(typeof value).toBe("string");
        });

        // Check common values are non-empty
        Object.values(t.common).forEach((value) => {
          expect(value).toBeTruthy();
          expect(typeof value).toBe("string");
        });
      });
    });
  });
});
