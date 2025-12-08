/**
 * @fileoverview Static UI string translations for internationalization.
 * Contains navigation, footer, and mobile nav labels for supported locales.
 */

import type { Locale } from '@/lib/types';

/**
 * Navigation translation strings.
 */
interface NavTranslations {
  /** Services menu label */
  services: string;
  /** Amazon Services submenu label */
  amazonServices: string;
  /** Etsy Services submenu label */
  etsyServices: string;
  /** Pricing page label */
  pricing: string;
  /** About page label */
  about: string;
  /** Contact page label */
  contact: string;
}

/**
 * Footer translation strings.
 */
interface FooterTranslations {
  /** Quick Links section heading */
  quickLinks: string;
  /** Contact section heading */
  contact: string;
  /** Follow Us section heading */
  followUs: string;
  /** Privacy Policy link label */
  privacyPolicy: string;
  /** Terms of Service link label */
  termsOfService: string;
  /** Company tagline */
  tagline: string;
  /** Copyright text template (use {year} placeholder) */
  copyright: string;
}

/**
 * Mobile navigation translation strings.
 */
interface MobileNavTranslations {
  /** Navigation section heading */
  navigation: string;
  /** Theme toggle label */
  theme: string;
  /** Language toggle label */
  language: string;
}

/**
 * Common UI translation strings used across pages.
 */
interface CommonTranslations {
  /** FAQ page CTA headline */
  faqCtaHeadline: string;
  /** FAQ page CTA description */
  faqCtaDescription: string;
  /** Contact us button label */
  contactUs: string;
}

/**
 * Complete translations object structure for a locale.
 */
export interface Translations {
  /** Navigation labels */
  nav: NavTranslations;
  /** Footer labels */
  footer: FooterTranslations;
  /** Mobile navigation labels */
  mobileNav: MobileNavTranslations;
  /** Common UI strings */
  common: CommonTranslations;
}

/**
 * All translations organized by locale.
 */
const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      services: 'Services',
      amazonServices: 'Amazon Services',
      etsyServices: 'Etsy Services',
      pricing: 'Pricing',
      about: 'About',
      contact: 'Contact',
    },
    footer: {
      quickLinks: 'Quick Links',
      contact: 'Contact',
      followUs: 'Follow Us',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      tagline: 'Honest e-commerce consulting for Amazon & Etsy sellers',
      copyright: '© {year} Scalenty. All rights reserved.',
    },
    mobileNav: {
      navigation: 'Navigation',
      theme: 'Theme',
      language: 'Language',
    },
    common: {
      faqCtaHeadline: 'Still Have Questions?',
      faqCtaDescription: "We're here to help. Reach out and we'll get back to you promptly.",
      contactUs: 'Contact Us',
    },
  },
  tr: {
    nav: {
      services: 'Hizmetler',
      amazonServices: 'Amazon Hizmetleri',
      etsyServices: 'Etsy Hizmetleri',
      pricing: 'Fiyatlandırma',
      about: 'Hakkımızda',
      contact: 'İletişim',
    },
    footer: {
      quickLinks: 'Hızlı Bağlantılar',
      contact: 'İletişim',
      followUs: 'Bizi Takip Edin',
      privacyPolicy: 'Gizlilik Politikası',
      termsOfService: 'Kullanım Şartları',
      tagline: 'Amazon ve Etsy satıcıları için dürüst e-ticaret danışmanlığı',
      copyright: '© {year} Scalenty. Tüm hakları saklıdır.',
    },
    mobileNav: {
      navigation: 'Gezinti',
      theme: 'Tema',
      language: 'Dil',
    },
    common: {
      faqCtaHeadline: 'Hâlâ Sorularınız mı Var?',
      faqCtaDescription: 'Yardım etmek için buradayız. Bize ulaşın, en kısa sürede size döneceğiz.',
      contactUs: 'Bize Ulaşın',
    },
  },
};

/**
 * Returns translations for the specified locale.
 *
 * @param locale - The locale to get translations for
 * @returns The translations object for the specified locale
 *
 * @example
 * ```ts
 * const t = getTranslations('tr');
 * console.log(t.nav.services); // "Hizmetler"
 * ```
 */
export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}
