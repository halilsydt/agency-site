/**
 * @fileoverview Static UI string translations for internationalization.
 * Contains navigation, footer, mobile nav, and component-level translations for supported locales.
 */

import type { Locale } from '@/lib/types';

/**
 * Navigation translation strings.
 */
interface NavTranslations {
  /** Home page label */
  home: string;
  /** Services menu label */
  services: string;
  /** Amazon top-level nav label */
  amazon: string;
  /** Etsy top-level nav label */
  etsy: string;
  /** Amazon Services submenu/footer label */
  amazonServices: string;
  /** Etsy Services submenu/footer label */
  etsyServices: string;
  /** Pricing page label */
  pricing: string;
  /** About page label */
  about: string;
  /** FAQ page label */
  faq: string;
  /** Contact page label */
  contact: string;
  /** "Book a Call" CTA label */
  bookCall: string;
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
  /** Most popular badge label */
  mostPopular: string;
  /** Phone label */
  phone: string;
  /** Address label */
  address: string;
  /** Illustration placeholder text */
  illustrationPlaceholder: string;
}

/**
 * FAQ category filter translation strings.
 */
interface FAQCategoriesTranslations {
  /** All categories label */
  all: string;
  /** General category label */
  general: string;
  /** Amazon category label */
  amazon: string;
  /** Etsy category label */
  etsy: string;
  /** Pricing category label */
  pricing: string;
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
 * A single animated hero statistic (count-up figure + label).
 */
interface HeroStat {
  /** Numeric target the figure counts up to. */
  value: number;
  /** Optional prefix (e.g. "$"). */
  prefix?: string;
  /** Optional suffix (e.g. "+", "M+"). */
  suffix?: string;
  /** Label shown beneath the figure. */
  label: string;
}

/**
 * Home page translation strings.
 */
interface HomePageTranslations {
  /** Hero eyebrow label */
  heroEyebrow: string;
  /** Hero headline — first line */
  heroLine1: string;
  /** Hero headline — second line */
  heroLine2: string;
  /** Hero headline — third line (the emphasized `.mark` word) */
  heroMark: string;
  /** Hero headline (single-string fallback / a11y) */
  heroHeadline: string;
  /** Hero subheadline */
  heroSubheadline: string;
  /** Hero animated stats (3) */
  heroStats: [HeroStat, HeroStat, HeroStat];
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
  /** Closing CTA section headline */
  ctaHeadline: string;
  /** Closing CTA section subheadline */
  ctaSubheadline: string;
}

/**
 * Hero viz-card label translations (figures are illustrative constants).
 */
interface HomeVizTranslations {
  /** "Total sales · 2025" label */
  totalSalesLabel: string;
  /** Big sales figure (illustrative) */
  totalSalesValue: string;
  /** Growth pill text (illustrative, e.g. "▲ +212%") */
  pill: string;
  /** Ad ROAS cell value */
  roasValue: string;
  /** Ad ROAS cell label */
  roasLabel: string;
  /** Conversion cell value */
  convValue: string;
  /** Conversion cell label */
  convLabel: string;
  /** Floating chip value ("30 days") */
  floatValue: string;
  /** Floating chip label ("to first results") */
  floatLabel: string;
}

/**
 * Marquee strip translations.
 */
interface HomeMarqueeTranslations {
  /** Service-name items scrolled in the marquee. */
  items: string[];
}

/**
 * A single results-showcase client dataset (copy + chart series).
 */
interface ShowcaseDataset {
  /** Tab label */
  tab: string;
  /** Period eyebrow */
  per: string;
  /** Title */
  title: string;
  /** Description */
  desc: string;
  /** Three stat figures + labels; `g` flags the mint-highlighted stat. */
  stats: { value: string; label: string; highlight?: boolean }[];
  /** X-axis labels */
  labels: string[];
  /** Numeric series */
  series: number[];
  /** Value prefix (e.g. "$") */
  prefix: string;
  /** Value suffix (e.g. "k") */
  suffix: string;
}

/**
 * Results showcase translations.
 */
interface HomeShowcaseTranslations {
  /** Eyebrow ("Proof, not promises") */
  eyebrow: string;
  /** Headline */
  headline: string;
  /** Four client datasets. */
  datasets: ShowcaseDataset[];
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
  /** Section eyebrow ("What we do") */
  eyebrow: string;
  /** Section supporting paragraph */
  supporting: string;
  /** Amazon card title */
  amazonTitle: string;
  /** Amazon card description */
  amazonDescription: string;
  /** Amazon card CTA */
  amazonCta: string;
  /** Amazon panel checklist bullets */
  amazonBullets: string[];
  /** Etsy card title */
  etsyTitle: string;
  /** Etsy card description */
  etsyDescription: string;
  /** Etsy card CTA */
  etsyCta: string;
  /** Etsy panel checklist bullets */
  etsyBullets: string[];
}

/**
 * How it works step translations.
 */
interface HowItWorksTranslations {
  /** Section eyebrow ("How it works") */
  eyebrow: string;
  /** "STEP" word, prefixed before the zero-padded number (e.g. "STEP 01") */
  stepPrefix: string;
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
  /** Section eyebrow ("Transparent pricing") */
  eyebrow: string;
  /** "Starting at · cancel anytime" line under the price */
  fromLine: string;
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
  /** Error title */
  errorTitle: string;
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
  /** Hero viz-card labels */
  homeViz: HomeVizTranslations;
  /** Marquee strip items */
  homeMarquee: HomeMarqueeTranslations;
  /** Results showcase copy + datasets */
  homeShowcase: HomeShowcaseTranslations;
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
  /** FAQ category filter labels */
  faqCategories: FAQCategoriesTranslations;
}

/**
 * All translations organized by locale.
 */
const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      amazon: 'Amazon',
      etsy: 'Etsy',
      amazonServices: 'Amazon Services',
      etsyServices: 'Etsy Services',
      pricing: 'Pricing',
      about: 'About',
      faq: 'FAQ',
      contact: 'Contact',
      bookCall: 'Book a Call',
    },
    footer: {
      quickLinks: 'Quick Links',
      contact: 'Contact',
      followUs: 'Follow Us',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      tagline: 'Honest e-commerce consulting for Etsy & Amazon sellers',
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
      mostPopular: 'Most Popular',
      phone: 'Phone',
      address: 'Address',
      illustrationPlaceholder: 'Illustration Placeholder',
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
      heroEyebrow: 'Amazon & Etsy Consulting',
      heroLine1: 'Grow what you',
      heroLine2: 'built, with',
      heroMark: 'honesty',
      heroHeadline: 'Grow what you built, with honesty',
      heroSubheadline: 'Results-driven consulting for Amazon & Etsy sellers. Real growth, not empty promises — with pricing you can actually see.',
      heroStats: [
        { value: 5, suffix: '+', label: 'Years experience' },
        { value: 100, suffix: '+', label: 'Sellers helped' },
        { value: 1, prefix: '$', suffix: 'M+', label: 'Revenue generated' },
      ],
      servicesHeadline: 'Specialists in the two platforms that matter.',
      howItWorksHeadline: 'Three steps to growth',
      whyChooseUsHeadline: 'Why Choose Us',
      resultsHeadline: 'Real Results from Real Clients',
      pricingHeadline: 'No hidden costs. No surprises.',
      pricingSubheadline: 'Honest, results-focused pricing. Pick the package that fits — change it anytime.',
      faqHeadline: 'Common Questions',
      faqSubheadline: 'Quick answers to help you decide',
      ctaHeadline: "Let's grow your business.",
      ctaSubheadline: "Book a free consultation — no pressure, no obligation. Just an honest conversation about what's possible.",
    },
    homeViz: {
      totalSalesLabel: 'Total sales · 2025',
      totalSalesValue: '$1.28M',
      pill: '▲ +212%',
      roasValue: '2.1×',
      roasLabel: 'Ad ROAS',
      convValue: '+38%',
      convLabel: 'Conversion rate',
      floatValue: '30 days',
      floatLabel: 'to first results',
    },
    homeMarquee: {
      items: [
        'Account Setup',
        'Listing Optimization',
        'PPC Advertising',
        'Etsy SEO',
        'Brand Stores',
        'Account Health',
        'Growth Strategy',
      ],
    },
    homeShowcase: {
      eyebrow: 'Proof, not promises',
      headline: 'Real results from real clients',
      datasets: [
        {
          tab: 'Amazon · full year',
          per: '2025 Annual Results',
          title: 'A stalled catalog, scaled to seven figures.',
          desc: 'Listing overhaul, A+ Content, and profit-first PPC turned a plateaued account into a full-year growth story.',
          stats: [
            { value: '+212%', label: 'Revenue', highlight: true },
            { value: '2.1×', label: 'Ad ROAS' },
            { value: '+38%', label: 'Conv. rate' },
          ],
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [34, 33, 41, 39, 52, 55, 63, 68, 82, 89, 108, 124],
          prefix: '$',
          suffix: 'k',
        },
        {
          tab: 'Etsy · 5 years',
          per: '2020–2025 Growth',
          title: 'Five years of compounding growth.',
          desc: 'Steady SEO, seasonal planning, and listing refreshes compounded into year-over-year gains since 2020.',
          stats: [
            { value: '4.4×', label: 'vs. 2020', highlight: true },
            { value: '5 yr', label: 'Consistent' },
            { value: '+27%', label: 'Avg/yr' },
          ],
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          series: [48, 72, 98, 134, 176, 214],
          prefix: '$',
          suffix: 'k',
        },
        {
          tab: 'Etsy · full year',
          per: '2025 Annual Results',
          title: 'A strong year, made stronger.',
          desc: 'Tag research and conversion-focused listings lifted an already-healthy shop to its best year yet.',
          stats: [
            { value: '+148%', label: 'Revenue', highlight: true },
            { value: '+41%', label: 'Visibility' },
            { value: '4.9★', label: 'Rating' },
          ],
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [12, 13, 16, 15, 19, 22, 24, 27, 31, 34, 42, 48],
          prefix: '$',
          suffix: 'k',
        },
        {
          tab: 'New Etsy shop',
          per: 'May–Dec 2025',
          title: 'From zero to traction in eight months.',
          desc: 'A brand-new shop, set up right and marketed deliberately — rapid, sustainable growth since launch.',
          stats: [
            { value: '$63k', label: 'In 8 mo', highlight: true },
            { value: '1.1k', label: 'Orders' },
            { value: '8 mo', label: 'Since launch' },
          ],
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [2, 5, 9, 14, 22, 33, 48, 63],
          prefix: '$',
          suffix: 'k',
        },
      ],
    },
    bundle: {
      title: 'Bundle & Save 15%',
      description: 'Get both Etsy + Amazon services and save on your monthly package',
      cta: 'Get Bundle Quote',
      saveText: 'Bundle & Save: Get both Etsy + Amazon services at a discount',
    },
    servicesOverview: {
      eyebrow: 'What we do',
      supporting: 'Hands-on support across both ecosystems — from first setup to advertising, SEO, and sustained growth.',
      amazonTitle: 'Amazon Services',
      amazonDescription: 'From account setup to advertising and store optimization — built around profit, not just clicks.',
      amazonCta: 'Explore Amazon Services',
      amazonBullets: [
        'Account setup',
        'Listing optimization',
        'PPC management',
        'Performance reports',
      ],
      etsyTitle: 'Etsy Services',
      etsyDescription: 'SEO, listings, and marketing strategy that help handmade shops get found and grow sustainably.',
      etsyCta: 'Explore Etsy Services',
      etsyBullets: [
        'Shop setup',
        'SEO & search',
        'Listing optimization',
        'Marketing strategy',
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      stepPrefix: 'STEP',
      step1Title: 'Book a consultation',
      step1Description: 'Schedule a free discovery call to discuss your marketplace goals and challenges.',
      step2Title: 'Get Custom Strategy',
      step2Description: 'Receive a tailored action plan designed specifically for your Etsy or Amazon business.',
      step3Title: 'Implement & Grow',
      step3Description: 'Execute the strategy with our guidance and watch your business thrive.',
    },
    whyChooseUs: {
      honestTitle: 'Honest Approach',
      honestDescription: 'No hype, no empty promises. Just real strategies that work for your business.',
      resultsTitle: 'Real Results',
      resultsDescription: 'Track record of measurable growth for Etsy and Amazon sellers.',
      pricingTitle: 'Transparent Pricing',
      pricingDescription: 'Clear pricing with no hidden fees or surprises. Know exactly what you pay for.',
      expertiseTitle: 'Platform Expertise',
      expertiseDescription: 'Deep specialization in both Etsy and Amazon ecosystems.',
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
      eyebrow: 'Transparent pricing',
      fromLine: 'Starting at · cancel anytime',
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
      a1: "We specialize in Etsy and Amazon marketplace consulting. Whether you're selling on one platform or both, we can help optimize your presence and grow your sales.",
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
      errorTitle: 'Error',
      errorMessage: 'Something went wrong. Please try again.',
    },
    faqCategories: {
      all: 'All',
      general: 'General',
      amazon: 'Amazon',
      etsy: 'Etsy',
      pricing: 'Pricing',
    },
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      services: 'Hizmetler',
      amazon: 'Amazon',
      etsy: 'Etsy',
      amazonServices: 'Amazon Hizmetleri',
      etsyServices: 'Etsy Hizmetleri',
      pricing: 'Fiyatlar',
      about: 'Hakkımızda',
      faq: 'SSS',
      contact: 'İletişim',
      bookCall: 'Randevu Al',
    },
    footer: {
      quickLinks: 'Hızlı Bağlantılar',
      contact: 'İletişim',
      followUs: 'Bizi Takip Edin',
      privacyPolicy: 'Gizlilik Politikası',
      termsOfService: 'Hizmet Şartları',
      tagline: 'Amazon ve Etsy satıcıları için dürüst e-ticaret danışmanlığı',
      copyright: '© {year} Scalenty. Tüm hakları saklıdır.',
    },
    mobileNav: {
      navigation: 'Gezinti',
      theme: 'Tema',
      language: 'Dil',
    },
    common: {
      faqCtaHeadline: 'Hâlâ sorularınız mı var?',
      faqCtaDescription: 'Yardıma hazırız. Bize ulaşın, en kısa sürede size dönüş yapalım.',
      contactUs: 'Bize Ulaşın',
      bookFreeConsultation: 'Ücretsiz Görüşme Ayarlayın',
      viewPricing: 'Fiyatları Görün',
      startingAt: 'Başlangıç',
      perMonth: '/ay',
      orReachUsDirectly: 'Veya doğrudan bize ulaşın',
      mostPopular: 'En Popüler',
      phone: 'Telefon',
      address: 'Adres',
      illustrationPlaceholder: 'Görsel Yer Tutucu',
    },
    aboutPage: {
      meetTheFounder: 'Kurucularla tanışın',
      ctaHeadline: 'İşinizi büyütmeye hazır mısınız?',
      ctaDescription: 'Pazaryeri hedeflerinize ulaşmanıza nasıl yardımcı olabileceğimizi konuşalım.',
    },
    amazonPage: {
      heroHeadline: 'Amazon Hizmetleri',
      heroSubheadline: 'Amazon işinizin gelişmesine yardımcı olan uzman danışmanlık ve yönetim — hesap kurulumundan reklam optimizasyonuna kadar her şey bizden.',
      servicesHeadline: 'Amazon hizmetlerimiz',
      servicesSubheadline: 'İster yeni başlıyor olun ister hızla büyüyün, Amazon satış yolculuğunuzun her yönünü ele alıyoruz.',
      ctaHeadline: 'Amazon\'da büyümeye hazır mısınız?',
      ctaDescription: 'Amazon satış hedeflerinize ulaşmanıza nasıl yardımcı olabileceğimizi konuşmak için ücretsiz bir görüşme ayarlayın.',
    },
    etsyPage: {
      heroHeadline: 'Etsy Hizmetleri',
      heroSubheadline: 'Etsy mağazanızın gelişmesine yardımcı olan uzman danışmanlık ve yönetim — mağaza kurulumundan büyüme stratejilerine kadar her şey bizden.',
      servicesHeadline: 'Etsy hizmetlerimiz',
      servicesSubheadline: 'İster yeni bir mağaza açın ister mevcut birini büyütün, Etsy satış yolculuğunuzun her yönünü ele alıyoruz.',
      ctaHeadline: 'Etsy mağazanızı büyütmeye hazır mısınız?',
      ctaDescription: 'Etsy satış hedeflerinize ulaşmanıza nasıl yardımcı olabileceğimizi konuşmak için ücretsiz bir görüşme ayarlayın.',
    },
    pricingPage: {
      heroHeadline: 'Basit, şeffaf fiyatlandırma.',
      heroSubheadline: 'Gizli ücret yok. Sürpriz masraf yok. İşinizin ihtiyaçlarına ve bütçenize uyan paketi seçin.',
      amazonPackagesHeadline: 'Amazon Paketleri',
      etsyPackagesHeadline: 'Etsy Paketleri',
      ctaHeadline: 'Hangisinin uygun olduğundan emin değil misiniz?',
      ctaDescription: 'Ücretsiz bir görüşme ayarlayın, hedeflerinize en uygun paketi bulmanıza yardımcı olalım — baskı yok, yükümlülük yok.',
    },
    contactPage: {
      sendMessage: 'Bize mesaj gönderin',
    },
    homePage: {
      heroEyebrow: 'Amazon & Etsy Danışmanlığı',
      heroLine1: 'Kurduğunuz işi',
      heroLine2: 'dürüstlükle',
      heroMark: 'büyütün',
      heroHeadline: 'Kurduğunuz işi dürüstlükle büyütün',
      heroSubheadline: 'Amazon ve Etsy satıcıları için sonuç odaklı danışmanlık. Boş vaatler değil gerçek büyüme — ve görebileceğiniz şeffaf fiyatlar.',
      heroStats: [
        { value: 5, suffix: '+', label: 'Yıl deneyim' },
        { value: 100, suffix: '+', label: 'Satıcıya destek' },
        { value: 1, prefix: '$', suffix: 'M+', label: 'Oluşturulan gelir' },
      ],
      servicesHeadline: 'Önemli olan iki platformun uzmanları.',
      howItWorksHeadline: 'Büyümeye üç adım',
      whyChooseUsHeadline: 'Neden Bizi Seçmelisiniz',
      resultsHeadline: 'Gerçek müşterilerden gerçek sonuçlar',
      pricingHeadline: 'Gizli maliyet yok. Sürpriz yok.',
      pricingSubheadline: 'Dürüst, sonuç odaklı fiyatlandırma. Size uyan paketi seçin — istediğiniz zaman değiştirin.',
      faqHeadline: 'Sık Sorulan Sorular',
      faqSubheadline: 'Karar vermenize yardımcı olacak hızlı cevaplar',
      ctaHeadline: 'İşinizi birlikte büyütelim.',
      ctaSubheadline: 'Ücretsiz bir görüşme ayarlayın — baskı yok, yükümlülük yok. Sadece neyin mümkün olduğuna dair dürüst bir sohbet.',
    },
    homeViz: {
      totalSalesLabel: 'Toplam satış · 2025',
      totalSalesValue: '$1.28M',
      pill: '▲ +212%',
      roasValue: '2.1×',
      roasLabel: 'Reklam ROAS',
      convValue: '+38%',
      convLabel: 'Dönüşüm oranı',
      floatValue: '30 gün',
      floatLabel: 'ilk sonuçlara',
    },
    homeMarquee: {
      items: [
        'Hesap Kurulumu',
        'Liste Optimizasyonu',
        'PPC Reklamcılığı',
        'Etsy SEO',
        'Marka Mağazaları',
        'Hesap Sağlığı',
        'Büyüme Stratejisi',
      ],
    },
    homeShowcase: {
      eyebrow: 'Vaat değil, kanıt',
      headline: 'Gerçek müşterilerden gerçek sonuçlar',
      datasets: [
        {
          tab: 'Amazon · tüm yıl',
          per: '2025 Yıllık Sonuçlar',
          title: 'Durağan bir katalog, yedi haneli rakamlara ölçeklendi.',
          desc: 'Liste yenileme, A+ İçerik ve kâr öncelikli PPC, durağan bir hesabı tüm yıl süren bir büyüme hikâyesine dönüştürdü.',
          stats: [
            { value: '+212%', label: 'Gelir', highlight: true },
            { value: '2.1×', label: 'Reklam ROAS' },
            { value: '+38%', label: 'Dönüşüm' },
          ],
          labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
          series: [34, 33, 41, 39, 52, 55, 63, 68, 82, 89, 108, 124],
          prefix: '$',
          suffix: 'k',
        },
        {
          tab: 'Etsy · 5 yıl',
          per: '2020–2025 Büyüme',
          title: 'Beş yıllık birikimli büyüme.',
          desc: 'İstikrarlı SEO, sezonsal planlama ve liste yenilemeleri 2020\'den beri yıldan yıla kazanca dönüştü.',
          stats: [
            { value: '4.4×', label: '2020\'ye göre', highlight: true },
            { value: '5 yıl', label: 'İstikrarlı' },
            { value: '+27%', label: 'Yıllık ort.' },
          ],
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          series: [48, 72, 98, 134, 176, 214],
          prefix: '$',
          suffix: 'k',
        },
        {
          tab: 'Etsy · tüm yıl',
          per: '2025 Yıllık Sonuçlar',
          title: 'Güçlü bir yıl, daha da güçlendi.',
          desc: 'Etiket araştırması ve dönüşüm odaklı listeler, zaten sağlıklı bir mağazayı en iyi yılına taşıdı.',
          stats: [
            { value: '+148%', label: 'Gelir', highlight: true },
            { value: '+41%', label: 'Görünürlük' },
            { value: '4.9★', label: 'Puan' },
          ],
          labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
          series: [12, 13, 16, 15, 19, 22, 24, 27, 31, 34, 42, 48],
          prefix: '$',
          suffix: 'k',
        },
        {
          tab: 'Yeni Etsy mağazası',
          per: 'May–Ara 2025',
          title: 'Sekiz ayda sıfırdan ivmeye.',
          desc: 'Doğru kurulan ve özenle pazarlanan yepyeni bir mağaza — lansmandan beri hızlı, sürdürülebilir büyüme.',
          stats: [
            { value: '$63k', label: '8 ayda', highlight: true },
            { value: '1.1k', label: 'Sipariş' },
            { value: '8 ay', label: 'Lansmandan beri' },
          ],
          labels: ['May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
          series: [2, 5, 9, 14, 22, 33, 48, 63],
          prefix: '$',
          suffix: 'k',
        },
      ],
    },
    bundle: {
      title: 'Paket alın, %15 tasarruf',
      description: 'Amazon + Etsy\'yi birlikte bizimle yürütün ve aylık paketinizde tasarruf edin.',
      cta: 'Paket Teklifi Alın',
      saveText: 'Paket alın, %15 tasarruf: Amazon + Etsy hizmetlerini birlikte alın, indirim kazanın',
    },
    servicesOverview: {
      eyebrow: 'Ne yapıyoruz',
      supporting: 'İlk kurulumdan reklamcılığa, SEO\'ya ve sürdürülebilir büyümeye kadar her iki ekosistemde uygulamalı destek.',
      amazonTitle: 'Amazon Hizmetleri',
      amazonDescription: 'Hesap kurulumundan reklamcılığa ve mağaza optimizasyonuna — sadece tıklama değil, kâr odaklı.',
      amazonCta: 'Amazon Hizmetlerini Keşfedin',
      amazonBullets: [
        'Hesap kurulumu',
        'Liste optimizasyonu',
        'PPC yönetimi',
        'Performans raporları',
      ],
      etsyTitle: 'Etsy Hizmetleri',
      etsyDescription: 'El yapımı mağazaların bulunmasına ve sürdürülebilir büyümesine yardımcı olan SEO, liste ve pazarlama stratejisi.',
      etsyCta: 'Etsy Hizmetlerini Keşfedin',
      etsyBullets: [
        'Mağaza kurulumu',
        'SEO ve arama',
        'Liste optimizasyonu',
        'Pazarlama stratejisi',
      ],
    },
    howItWorks: {
      eyebrow: 'Nasıl çalışır',
      stepPrefix: 'ADIM',
      step1Title: 'Görüşme ayarlayın',
      step1Description: 'Hedeflerinizi, kataloğunuzu ve nerede takıldığınızı anlamak için ücretsiz bir tanışma görüşmesi.',
      step2Title: 'Özel strateji alın',
      step2Description: 'Amazon veya Etsy işiniz için özel olarak hazırlanmış, lafı dolandırmayan bir eylem planı.',
      step3Title: 'Uygulayın ve büyüyün',
      step3Description: 'Sizinle birlikte uygular ve rakamları gerçekten neyin hareket ettirdiğini raporlarız.',
    },
    whyChooseUs: {
      honestTitle: 'Dürüst Yaklaşım',
      honestDescription: 'Abartı yok, boş vaatler yok. Sadece işinize yarayan gerçek stratejiler.',
      resultsTitle: 'Gerçek Sonuçlar',
      resultsDescription: 'Etsy ve Amazon satıcıları için ölçülebilir büyüme geçmişi.',
      pricingTitle: 'Şeffaf Fiyatlandırma',
      pricingDescription: 'Gizli ücret veya sürpriz olmadan net fiyatlandırma. Ne ödediğinizi tam olarak bilin.',
      expertiseTitle: 'Platform Uzmanlığı',
      expertiseDescription: 'Hem Etsy hem de Amazon ekosistemlerinde derin uzmanlaşma.',
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
      eyebrow: 'Şeffaf fiyatlandırma',
      fromLine: 'Başlangıç · istediğiniz zaman iptal',
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
      viewFullPricing: 'Tüm Fiyatları Görün',
    },
    faqPreview: {
      q1: 'Hangi platformları destekliyorsunuz?',
      a1: 'Amazon ve Etsy pazaryeri danışmanlığında uzmanız. İster tek platformda ister her ikisinde satış yapın, varlığınızı optimize etmenize ve satışlarınızı büyütmenize yardımcı olabiliriz.',
      q2: 'Danışmanlık süreci nasıl işliyor?',
      a2: 'İşinizi ve hedeflerinizi anlamak için ücretsiz bir tanışma görüşmesiyle başlarız. Ardından özel ihtiyaçlarınıza göre bir strateji oluşturur ve uygulama boyunca sürekli destek sağlarız.',
      q3: 'Gizli ücret var mı?',
      a3: 'Asla gizli ücret yok. Şeffaf fiyatlandırmaya inanıyoruz. Fiyat sayfamızda gördüğünüz, ödeyeceğiniz tutardır. Çalışmaya başlamadan önce tüm maliyetleri her zaman önceden konuşuruz.',
      q4: 'Sonuçları ne kadar sürede görürüm?',
      a4: 'Sonuçlar başlangıç noktanıza ve hedeflerinize göre değişir, ancak çoğu müşteri 30–60 gün içinde ölçülebilir iyileşmeler görür. Hızlı çözümlere değil, sürdürülebilir büyümeye odaklanırız.',
      q5: 'İade veya garanti sunuyor musunuz?',
      a5: 'İşimizin arkasındayız. Pazaryeri başarısı birçok faktöre bağlı olsa da, danışmanlık hizmetlerimizde memnuniyet garantisi sunuyoruz. Önerilerimizden memnun kalmazsanız, durumu düzeltmek için sizinle çalışırız.',
      viewAllFaqs: 'Tüm SSS\'leri Görüntüle',
    },
    contactForm: {
      nameLabel: 'İsim',
      namePlaceholder: 'Adınız',
      emailLabel: 'E-posta',
      emailPlaceholder: 'siz@ornek.com',
      platformLabel: 'Platform',
      platformPlaceholder: 'Bir platform seçin',
      platformAmazon: 'Amazon',
      platformEtsy: 'Etsy',
      platformBoth: 'Her ikisi',
      messageLabel: 'Mesaj',
      messagePlaceholder: 'Size nasıl yardımcı olabiliriz?',
      submitButton: 'Mesaj Gönder',
      submittingButton: 'Gönderiliyor...',
      successTitle: 'Teşekkürler!',
      successMessage: 'En kısa sürede size döneceğiz.',
      errorTitle: 'Hata',
      errorMessage: 'Bir şeyler yanlış gitti. Lütfen tekrar deneyin.',
    },
    faqCategories: {
      all: 'Tümü',
      general: 'Genel',
      amazon: 'Amazon',
      etsy: 'Etsy',
      pricing: 'Fiyatlandırma',
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
