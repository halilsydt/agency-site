/**
 * @fileoverview Static UI string translations for internationalization.
 * Contains navigation, footer, mobile nav, and component-level translations for supported locales.
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
  /** Starting at price label */
  startingAt: string;
  /** Per month label */
  perMonth: string;
  /** Or reach us directly label */
  orReachUsDirectly: string;
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
 * Bundle highlight section translations.
 */
interface BundleTranslations {
  /** Bundle title */
  title: string;
  /** Bundle description */
  description: string;
  /** Get bundle quote CTA */
  cta: string;
  /** Bundle save text for pricing preview */
  saveText: string;
}

/**
 * Services overview platform card translations.
 */
interface ServicesOverviewTranslations {
  /** Amazon card title */
  amazonTitle: string;
  /** Amazon card description */
  amazonDescription: string;
  /** Amazon card CTA */
  amazonCta: string;
  /** Etsy card title */
  etsyTitle: string;
  /** Etsy card description */
  etsyDescription: string;
  /** Etsy card CTA */
  etsyCta: string;
}

/**
 * How it works step translations.
 */
interface HowItWorksTranslations {
  /** Step 1 title */
  step1Title: string;
  /** Step 1 description */
  step1Description: string;
  /** Step 2 title */
  step2Title: string;
  /** Step 2 description */
  step2Description: string;
  /** Step 3 title */
  step3Title: string;
  /** Step 3 description */
  step3Description: string;
}

/**
 * Why choose us differentiator translations.
 */
interface WhyChooseUsTranslations {
  /** Honest approach title */
  honestTitle: string;
  /** Honest approach description */
  honestDescription: string;
  /** Real results title */
  resultsTitle: string;
  /** Real results description */
  resultsDescription: string;
  /** Transparent pricing title */
  pricingTitle: string;
  /** Transparent pricing description */
  pricingDescription: string;
  /** Platform expertise title */
  expertiseTitle: string;
  /** Platform expertise description */
  expertiseDescription: string;
}

/**
 * Results gallery translations.
 */
interface ResultsGalleryTranslations {
  /** Result 1 caption */
  result1Caption: string;
  /** Result 1 metric */
  result1Metric: string;
  /** Result 1 alt text */
  result1Alt: string;
  /** Result 2 caption */
  result2Caption: string;
  /** Result 2 metric */
  result2Metric: string;
  /** Result 2 alt text */
  result2Alt: string;
  /** Result 3 caption */
  result3Caption: string;
  /** Result 3 metric */
  result3Metric: string;
  /** Result 3 alt text */
  result3Alt: string;
  /** Result 4 caption */
  result4Caption: string;
  /** Result 4 metric */
  result4Metric: string;
  /** Result 4 alt text */
  result4Alt: string;
}

/**
 * Pricing preview translations.
 */
interface PricingPreviewTranslations {
  /** Amazon title */
  amazonTitle: string;
  /** Amazon feature 1 */
  amazonFeature1: string;
  /** Amazon feature 2 */
  amazonFeature2: string;
  /** Amazon feature 3 */
  amazonFeature3: string;
  /** Amazon feature 4 */
  amazonFeature4: string;
  /** Etsy title */
  etsyTitle: string;
  /** Etsy feature 1 */
  etsyFeature1: string;
  /** Etsy feature 2 */
  etsyFeature2: string;
  /** Etsy feature 3 */
  etsyFeature3: string;
  /** Etsy feature 4 */
  etsyFeature4: string;
  /** View full pricing CTA */
  viewFullPricing: string;
}

/**
 * FAQ preview translations.
 */
interface FAQPreviewTranslations {
  /** Question 1 */
  q1: string;
  /** Answer 1 */
  a1: string;
  /** Question 2 */
  q2: string;
  /** Answer 2 */
  a2: string;
  /** Question 3 */
  q3: string;
  /** Answer 3 */
  a3: string;
  /** Question 4 */
  q4: string;
  /** Answer 4 */
  a4: string;
  /** Question 5 */
  q5: string;
  /** Answer 5 */
  a5: string;
  /** View all FAQs CTA */
  viewAllFaqs: string;
}

/**
 * Contact form translations.
 */
interface ContactFormTranslations {
  /** Name field label */
  nameLabel: string;
  /** Name field placeholder */
  namePlaceholder: string;
  /** Email field label */
  emailLabel: string;
  /** Email field placeholder */
  emailPlaceholder: string;
  /** Platform field label */
  platformLabel: string;
  /** Platform field placeholder */
  platformPlaceholder: string;
  /** Amazon option */
  platformAmazon: string;
  /** Etsy option */
  platformEtsy: string;
  /** Both option */
  platformBoth: string;
  /** Message field label */
  messageLabel: string;
  /** Message field placeholder */
  messagePlaceholder: string;
  /** Submit button label */
  submitButton: string;
  /** Submitting button label */
  submittingButton: string;
  /** Success title */
  successTitle: string;
  /** Success message */
  successMessage: string;
  /** Error message */
  errorMessage: string;
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
  /** Bundle highlight section */
  bundle: BundleTranslations;
  /** Services overview section */
  servicesOverview: ServicesOverviewTranslations;
  /** How it works section */
  howItWorks: HowItWorksTranslations;
  /** Why choose us section */
  whyChooseUs: WhyChooseUsTranslations;
  /** Results gallery section */
  resultsGallery: ResultsGalleryTranslations;
  /** Pricing preview section */
  pricingPreview: PricingPreviewTranslations;
  /** FAQ preview section */
  faqPreview: FAQPreviewTranslations;
  /** Contact form */
  contactForm: ContactFormTranslations;
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
      startingAt: 'Starting at',
      perMonth: '/month',
      orReachUsDirectly: 'Or reach us directly',
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
    bundle: {
      title: 'Bundle & Save 15%',
      description: 'Get both Amazon + Etsy services and save on your monthly package',
      cta: 'Get Bundle Quote',
      saveText: 'Bundle & Save: Get both Amazon + Etsy services at a discount',
    },
    servicesOverview: {
      amazonTitle: 'Amazon Services',
      amazonDescription: 'Expert guidance for Amazon sellers—from account setup to advertising and store optimization.',
      amazonCta: 'Explore Amazon Services',
      etsyTitle: 'Etsy Services',
      etsyDescription: 'Specialized support for Etsy shops—SEO, marketing, listings, and growth strategies.',
      etsyCta: 'Explore Etsy Services',
    },
    howItWorks: {
      step1Title: 'Book Consultation',
      step1Description: 'Schedule a free discovery call to discuss your marketplace goals and challenges.',
      step2Title: 'Get Custom Strategy',
      step2Description: 'Receive a tailored action plan designed specifically for your Amazon or Etsy business.',
      step3Title: 'Implement & Grow',
      step3Description: 'Execute the strategy with our guidance and watch your business thrive.',
    },
    whyChooseUs: {
      honestTitle: 'Honest Approach',
      honestDescription: 'No hype, no empty promises. Just real strategies that work for your business.',
      resultsTitle: 'Real Results',
      resultsDescription: 'Track record of measurable growth for Amazon and Etsy sellers.',
      pricingTitle: 'Transparent Pricing',
      pricingDescription: 'Clear pricing with no hidden fees or surprises. Know exactly what you pay for.',
      expertiseTitle: 'Platform Expertise',
      expertiseDescription: 'Deep specialization in both Amazon and Etsy ecosystems.',
    },
    resultsGallery: {
      result1Caption: 'Amazon seller: Full year sales growth',
      result1Metric: '2025 Annual Results',
      result1Alt: 'Amazon seller dashboard showing yearly sales performance',
      result2Caption: 'Etsy shop: 5 years of consistent growth',
      result2Metric: '2020-2025 Growth',
      result2Alt: 'Etsy shop analytics showing all-time sales from 2020 to 2025',
      result3Caption: 'Etsy shop: Strong yearly performance',
      result3Metric: '2025 Annual Results',
      result3Alt: 'Etsy shop dashboard showing yearly sales performance',
      result4Caption: 'New Etsy shop: Rapid growth since launch',
      result4Metric: 'May-Dec 2025 Growth',
      result4Alt: 'New Etsy shop growth from May showing rapid sales increase',
    },
    pricingPreview: {
      amazonTitle: 'Amazon Services',
      amazonFeature1: 'Account setup & optimization',
      amazonFeature2: 'Product listing optimization',
      amazonFeature3: 'PPC advertising management',
      amazonFeature4: 'Monthly performance reports',
      etsyTitle: 'Etsy Services',
      etsyFeature1: 'Shop setup & configuration',
      etsyFeature2: 'SEO & search optimization',
      etsyFeature3: 'Listing optimization',
      etsyFeature4: 'Marketing strategy',
      viewFullPricing: 'View Full Pricing',
    },
    faqPreview: {
      q1: 'What platforms do you support?',
      a1: "We specialize in Amazon and Etsy marketplace consulting. Whether you're selling on one platform or both, we can help optimize your presence and grow your sales.",
      q2: 'How does the consultation process work?',
      a2: 'We start with a free discovery call to understand your business and goals. From there, we create a custom strategy tailored to your specific needs and provide ongoing support throughout implementation.',
      q3: 'Are there any hidden fees?',
      a3: "No hidden fees, ever. We believe in transparent pricing. What you see on our pricing page is what you pay. We'll always discuss any costs upfront before starting work.",
      q4: 'How long before I see results?',
      a4: 'Results vary depending on your starting point and goals, but most clients see measurable improvements within 30-60 days. We focus on sustainable growth, not quick fixes.',
      q5: 'Do you offer refunds or guarantees?',
      a5: "We stand behind our work. While marketplace success depends on many factors, we offer a satisfaction guarantee on our consulting services. If you're not happy with our recommendations, we'll work with you to make it right.",
      viewAllFaqs: 'View All FAQs',
    },
    contactForm: {
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'you@example.com',
      platformLabel: 'Platform',
      platformPlaceholder: 'Select a platform',
      platformAmazon: 'Amazon',
      platformEtsy: 'Etsy',
      platformBoth: 'Both',
      messageLabel: 'Message',
      messagePlaceholder: 'How can we help you?',
      submitButton: 'Send Message',
      submittingButton: 'Sending...',
      successTitle: 'Thank you!',
      successMessage: "We'll get back to you soon.",
      errorMessage: 'Something went wrong. Please try again.',
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
      startingAt: 'Başlangıç fiyatı',
      perMonth: '/ay',
      orReachUsDirectly: 'Veya doğrudan bize ulaşın',
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
    bundle: {
      title: 'Paket Al ve %15 Tasarruf Et',
      description: 'Amazon + Etsy hizmetlerini birlikte alın ve aylık paketinizde tasarruf edin',
      cta: 'Paket Teklifi Al',
      saveText: 'Paket ve Tasarruf: Amazon + Etsy hizmetlerini birlikte alın, indirim kazanın',
    },
    servicesOverview: {
      amazonTitle: 'Amazon Hizmetleri',
      amazonDescription: 'Amazon satıcıları için uzman rehberliği—hesap kurulumundan reklam ve mağaza optimizasyonuna kadar.',
      amazonCta: 'Amazon Hizmetlerini Keşfedin',
      etsyTitle: 'Etsy Hizmetleri',
      etsyDescription: 'Etsy mağazaları için özel destek—SEO, pazarlama, ürün listeleme ve büyüme stratejileri.',
      etsyCta: 'Etsy Hizmetlerini Keşfedin',
    },
    howItWorks: {
      step1Title: 'Danışmanlık Randevusu Al',
      step1Description: 'Pazar yeri hedeflerinizi ve zorluklarınızı görüşmek için ücretsiz keşif görüşmesi planlayın.',
      step2Title: 'Özel Strateji Al',
      step2Description: 'Amazon veya Etsy işinize özel tasarlanmış bir eylem planı alın.',
      step3Title: 'Uygula ve Büyü',
      step3Description: 'Stratejinizi rehberliğimizle uygulayın ve işinizin gelişmesini izleyin.',
    },
    whyChooseUs: {
      honestTitle: 'Dürüst Yaklaşım',
      honestDescription: 'Abartı yok, boş vaatler yok. Sadece işinize yarayan gerçek stratejiler.',
      resultsTitle: 'Gerçek Sonuçlar',
      resultsDescription: 'Amazon ve Etsy satıcıları için ölçülebilir büyüme geçmişi.',
      pricingTitle: 'Şeffaf Fiyatlandırma',
      pricingDescription: 'Gizli ücret veya sürpriz olmadan net fiyatlandırma. Ne ödediğinizi tam olarak bilin.',
      expertiseTitle: 'Platform Uzmanlığı',
      expertiseDescription: 'Hem Amazon hem de Etsy ekosistemlerinde derin uzmanlaşma.',
    },
    resultsGallery: {
      result1Caption: 'Amazon satıcısı: Yıllık satış büyümesi',
      result1Metric: '2025 Yıllık Sonuçlar',
      result1Alt: 'Yıllık satış performansını gösteren Amazon satıcı paneli',
      result2Caption: 'Etsy mağazası: 5 yıllık istikrarlı büyüme',
      result2Metric: '2020-2025 Büyüme',
      result2Alt: '2020-2025 arası tüm zamanların satışlarını gösteren Etsy mağaza analitiği',
      result3Caption: 'Etsy mağazası: Güçlü yıllık performans',
      result3Metric: '2025 Yıllık Sonuçlar',
      result3Alt: 'Yıllık satış performansını gösteren Etsy mağaza paneli',
      result4Caption: 'Yeni Etsy mağazası: Açılıştan bu yana hızlı büyüme',
      result4Metric: 'Mayıs-Aralık 2025 Büyüme',
      result4Alt: 'Mayıs ayından itibaren hızlı satış artışı gösteren yeni Etsy mağazası',
    },
    pricingPreview: {
      amazonTitle: 'Amazon Hizmetleri',
      amazonFeature1: 'Hesap kurulumu ve optimizasyonu',
      amazonFeature2: 'Ürün listeleme optimizasyonu',
      amazonFeature3: 'PPC reklam yönetimi',
      amazonFeature4: 'Aylık performans raporları',
      etsyTitle: 'Etsy Hizmetleri',
      etsyFeature1: 'Mağaza kurulumu ve yapılandırması',
      etsyFeature2: 'SEO ve arama optimizasyonu',
      etsyFeature3: 'Listeleme optimizasyonu',
      etsyFeature4: 'Pazarlama stratejisi',
      viewFullPricing: 'Tüm Fiyatları Görüntüle',
    },
    faqPreview: {
      q1: 'Hangi platformları destekliyorsunuz?',
      a1: 'Amazon ve Etsy pazar yeri danışmanlığında uzmanız. Tek bir platformda veya her ikisinde de satış yapıyor olun, varlığınızı optimize etmenize ve satışlarınızı artırmanıza yardımcı olabiliriz.',
      q2: 'Danışmanlık süreci nasıl işliyor?',
      a2: 'İşinizi ve hedeflerinizi anlamak için ücretsiz bir keşif görüşmesiyle başlıyoruz. Ardından, özel ihtiyaçlarınıza göre uyarlanmış bir strateji oluşturuyor ve uygulama boyunca sürekli destek sağlıyoruz.',
      q3: 'Gizli ücretler var mı?',
      a3: 'Asla gizli ücret yok. Şeffaf fiyatlandırmaya inanıyoruz. Fiyatlandırma sayfamızda gördüğünüz ödediğiniz tutardır. Çalışmaya başlamadan önce tüm maliyetleri her zaman önceden tartışırız.',
      q4: 'Sonuçları ne kadar sürede görürüm?',
      a4: 'Sonuçlar başlangıç noktanıza ve hedeflerinize göre değişir, ancak çoğu müşteri 30-60 gün içinde ölçülebilir iyileştirmeler görür. Hızlı çözümlere değil, sürdürülebilir büyümeye odaklanıyoruz.',
      q5: 'İade veya garanti sunuyor musunuz?',
      a5: 'Çalışmalarımızın arkasında duruyoruz. Pazar yeri başarısı birçok faktöre bağlı olsa da, danışmanlık hizmetlerimiz için memnuniyet garantisi sunuyoruz. Önerilerimizden memnun kalmazsanız, durumu düzeltmek için sizinle birlikte çalışacağız.',
      viewAllFaqs: 'Tüm SSS\'leri Görüntüle',
    },
    contactForm: {
      nameLabel: 'İsim',
      namePlaceholder: 'Adınız',
      emailLabel: 'E-posta',
      emailPlaceholder: 'siz@ornek.com',
      platformLabel: 'Platform',
      platformPlaceholder: 'Platform seçin',
      platformAmazon: 'Amazon',
      platformEtsy: 'Etsy',
      platformBoth: 'Her İkisi',
      messageLabel: 'Mesaj',
      messagePlaceholder: 'Size nasıl yardımcı olabiliriz?',
      submitButton: 'Mesaj Gönder',
      submittingButton: 'Gönderiliyor...',
      successTitle: 'Teşekkürler!',
      successMessage: 'En kısa sürede size döneceğiz.',
      errorMessage: 'Bir şeyler yanlış gitti. Lütfen tekrar deneyin.',
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
