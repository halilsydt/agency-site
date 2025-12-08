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
  /** Book free consultation button label */
  bookFreeConsultation: string;
  /** View pricing button label */
  viewPricing: string;
}

/**
 * About page translation strings.
 */
interface AboutPageTranslations {
  /** Meet the Founder section headline */
  meetTheFounder: string;
  /** CTA headline */
  ctaHeadline: string;
  /** CTA description */
  ctaDescription: string;
}

/**
 * Amazon services page translation strings.
 */
interface AmazonPageTranslations {
  /** Hero headline */
  heroHeadline: string;
  /** Hero subheadline */
  heroSubheadline: string;
  /** Services list headline */
  servicesHeadline: string;
  /** Services list subheadline */
  servicesSubheadline: string;
  /** CTA headline */
  ctaHeadline: string;
  /** CTA description */
  ctaDescription: string;
}

/**
 * Etsy services page translation strings.
 */
interface EtsyPageTranslations {
  /** Hero headline */
  heroHeadline: string;
  /** Hero subheadline */
  heroSubheadline: string;
  /** Services list headline */
  servicesHeadline: string;
  /** Services list subheadline */
  servicesSubheadline: string;
  /** CTA headline */
  ctaHeadline: string;
  /** CTA description */
  ctaDescription: string;
}

/**
 * Pricing page translation strings.
 */
interface PricingPageTranslations {
  /** Hero headline */
  heroHeadline: string;
  /** Hero subheadline */
  heroSubheadline: string;
  /** Amazon packages headline */
  amazonPackagesHeadline: string;
  /** Etsy packages headline */
  etsyPackagesHeadline: string;
  /** CTA headline */
  ctaHeadline: string;
  /** CTA description */
  ctaDescription: string;
}

/**
 * Contact page translation strings.
 */
interface ContactPageTranslations {
  /** Send us a message section headline */
  sendMessage: string;
}

/**
 * Home page translation strings.
 */
interface HomePageTranslations {
  /** Hero headline */
  heroHeadline: string;
  /** Hero subheadline */
  heroSubheadline: string;
  /** Services overview headline */
  servicesHeadline: string;
  /** How it works headline */
  howItWorksHeadline: string;
  /** Why choose us headline */
  whyChooseUsHeadline: string;
  /** Results gallery headline */
  resultsHeadline: string;
  /** Pricing preview headline */
  pricingHeadline: string;
  /** Pricing preview subheadline */
  pricingSubheadline: string;
  /** FAQ preview headline */
  faqHeadline: string;
  /** FAQ preview subheadline */
  faqSubheadline: string;
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
  /** About page strings */
  aboutPage: AboutPageTranslations;
  /** Amazon services page strings */
  amazonPage: AmazonPageTranslations;
  /** Etsy services page strings */
  etsyPage: EtsyPageTranslations;
  /** Pricing page strings */
  pricingPage: PricingPageTranslations;
  /** Contact page strings */
  contactPage: ContactPageTranslations;
  /** Home page strings */
  homePage: HomePageTranslations;
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
      bookFreeConsultation: 'Book Free Consultation',
      viewPricing: 'View Pricing',
    },
    aboutPage: {
      meetTheFounder: 'Meet the Founder',
      ctaHeadline: 'Ready to Grow Your Business?',
      ctaDescription: "Let's discuss how we can help you achieve your marketplace goals.",
    },
    amazonPage: {
      heroHeadline: 'Amazon Services',
      heroSubheadline: "Expert consulting and management services to help your Amazon business thrive. From account setup to advertising optimization, we've got you covered.",
      servicesHeadline: 'Our Amazon Services',
      servicesSubheadline: 'Comprehensive solutions for every aspect of your Amazon selling journey',
      ctaHeadline: 'Ready to Grow Your Amazon Business?',
      ctaDescription: 'Schedule a free consultation to discuss how we can help you achieve your Amazon selling goals.',
    },
    etsyPage: {
      heroHeadline: 'Etsy Services',
      heroSubheadline: "Expert consulting and management services to help your Etsy shop thrive. From shop setup to growth strategies, we've got you covered.",
      servicesHeadline: 'Our Etsy Services',
      servicesSubheadline: 'Comprehensive solutions for every aspect of your Etsy selling journey',
      ctaHeadline: 'Ready to Grow Your Etsy Shop?',
      ctaDescription: 'Schedule a free consultation to discuss how we can help you achieve your Etsy selling goals.',
    },
    pricingPage: {
      heroHeadline: 'Simple, Transparent Pricing',
      heroSubheadline: 'No hidden fees. No surprise charges. Choose the package that fits your business needs and budget.',
      amazonPackagesHeadline: 'Amazon Packages',
      etsyPackagesHeadline: 'Etsy Packages',
      ctaHeadline: 'Not Sure Which Package Is Right For You?',
      ctaDescription: "Schedule a free consultation and we'll help you find the perfect fit for your business goals.",
    },
    contactPage: {
      sendMessage: 'Send us a message',
    },
    homePage: {
      heroHeadline: 'Grow Your Amazon & Etsy Business with Honest Expertise',
      heroSubheadline: 'Results-driven consulting that focuses on real growth, not empty promises. Transparent pricing, practical strategies.',
      servicesHeadline: 'Services for Amazon & Etsy Sellers',
      howItWorksHeadline: 'How It Works',
      whyChooseUsHeadline: 'Why Choose Us',
      resultsHeadline: 'Real Results from Real Clients',
      pricingHeadline: 'Transparent Pricing',
      pricingSubheadline: 'No hidden costs. No surprises. Just honest, results-focused pricing.',
      faqHeadline: 'Common Questions',
      faqSubheadline: 'Quick answers to help you decide',
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
      bookFreeConsultation: 'Ücretsiz Danışmanlık Al',
      viewPricing: 'Fiyatları Görüntüle',
    },
    aboutPage: {
      meetTheFounder: 'Kurucuyla Tanışın',
      ctaHeadline: 'İşinizi Büyütmeye Hazır mısınız?',
      ctaDescription: 'Pazar yeri hedeflerinize ulaşmanızda size nasıl yardımcı olabileceğimizi konuşalım.',
    },
    amazonPage: {
      heroHeadline: 'Amazon Hizmetleri',
      heroSubheadline: 'Amazon işinizin gelişmesine yardımcı olacak uzman danışmanlık ve yönetim hizmetleri. Hesap kurulumundan reklam optimizasyonuna kadar her konuda yanınızdayız.',
      servicesHeadline: 'Amazon Hizmetlerimiz',
      servicesSubheadline: 'Amazon satış yolculuğunuzun her aşaması için kapsamlı çözümler',
      ctaHeadline: 'Amazon İşinizi Büyütmeye Hazır mısınız?',
      ctaDescription: 'Amazon satış hedeflerinize ulaşmanızda size nasıl yardımcı olabileceğimizi görüşmek için ücretsiz danışmanlık randevusu alın.',
    },
    etsyPage: {
      heroHeadline: 'Etsy Hizmetleri',
      heroSubheadline: 'Etsy mağazanızın gelişmesine yardımcı olacak uzman danışmanlık ve yönetim hizmetleri. Mağaza kurulumundan büyüme stratejilerine kadar her konuda yanınızdayız.',
      servicesHeadline: 'Etsy Hizmetlerimiz',
      servicesSubheadline: 'Etsy satış yolculuğunuzun her aşaması için kapsamlı çözümler',
      ctaHeadline: 'Etsy Mağazanızı Büyütmeye Hazır mısınız?',
      ctaDescription: 'Etsy satış hedeflerinize ulaşmanızda size nasıl yardımcı olabileceğimizi görüşmek için ücretsiz danışmanlık randevusu alın.',
    },
    pricingPage: {
      heroHeadline: 'Basit, Şeffaf Fiyatlandırma',
      heroSubheadline: 'Gizli ücret yok. Sürpriz masraf yok. İş ihtiyaçlarınıza ve bütçenize uygun paketi seçin.',
      amazonPackagesHeadline: 'Amazon Paketleri',
      etsyPackagesHeadline: 'Etsy Paketleri',
      ctaHeadline: 'Hangi Paketin Size Uygun Olduğundan Emin Değil misiniz?',
      ctaDescription: 'Ücretsiz danışmanlık randevusu alın, iş hedefleriniz için en uygun paketi bulmanıza yardımcı olalım.',
    },
    contactPage: {
      sendMessage: 'Bize mesaj gönderin',
    },
    homePage: {
      heroHeadline: 'Dürüst Uzmanlıkla Amazon ve Etsy İşinizi Büyütün',
      heroSubheadline: 'Boş vaatler değil, gerçek büyümeye odaklanan sonuç odaklı danışmanlık. Şeffaf fiyatlandırma, pratik stratejiler.',
      servicesHeadline: 'Amazon ve Etsy Satıcıları İçin Hizmetler',
      howItWorksHeadline: 'Nasıl Çalışır',
      whyChooseUsHeadline: 'Neden Bizi Seçmelisiniz',
      resultsHeadline: 'Gerçek Müşterilerden Gerçek Sonuçlar',
      pricingHeadline: 'Şeffaf Fiyatlandırma',
      pricingSubheadline: 'Gizli maliyet yok. Sürpriz yok. Sadece dürüst, sonuç odaklı fiyatlandırma.',
      faqHeadline: 'Sık Sorulan Sorular',
      faqSubheadline: 'Karar vermenize yardımcı olacak hızlı cevaplar',
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
