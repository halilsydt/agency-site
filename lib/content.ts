/**
 * @fileoverview Content accessor functions for the agency site.
 * Provides type-safe access to JSON content files with i18n support.
 * All components should use these functions instead of importing JSON directly.
 */

// Static imports for English content
import enAmazonServicesData from "@/content/en/services/amazon.json";
import enEtsyServicesData from "@/content/en/services/etsy.json";
import enPricingPackagesData from "@/content/en/pricing/packages.json";
import enAboutData from "@/content/en/about.json";
import enContactData from "@/content/en/contact.json";
import enFaqData from "@/content/en/faq.json";
import enPrivacyData from "@/content/en/legal/privacy.json";
import enTermsData from "@/content/en/legal/terms.json";

// Static imports for Turkish content
import trAmazonServicesData from "@/content/tr/services/amazon.json";
import trEtsyServicesData from "@/content/tr/services/etsy.json";
import trPricingPackagesData from "@/content/tr/pricing/packages.json";
import trAboutData from "@/content/tr/about.json";
import trContactData from "@/content/tr/contact.json";
import trFaqData from "@/content/tr/faq.json";
import trPrivacyData from "@/content/tr/legal/privacy.json";
import trTermsData from "@/content/tr/legal/terms.json";

import type {
  Service,
  PricingPackage,
  TeamMember,
  ExperienceHighlight,
  BookingContent,
  FAQ,
  FAQCategory,
  FAQPageContent,
  PrivacyPolicyContent,
  TermsOfServiceContent,
  Locale,
} from "./types";
import { DEFAULT_LOCALE } from "./types";

/**
 * Content lookup maps by locale.
 */
const contentMaps = {
  amazonServices: {
    en: enAmazonServicesData,
    tr: trAmazonServicesData,
  },
  etsyServices: {
    en: enEtsyServicesData,
    tr: trEtsyServicesData,
  },
  pricing: {
    en: enPricingPackagesData,
    tr: trPricingPackagesData,
  },
  about: {
    en: enAboutData,
    tr: trAboutData,
  },
  contact: {
    en: enContactData,
    tr: trContactData,
  },
  faq: {
    en: enFaqData,
    tr: trFaqData,
  },
  privacy: {
    en: enPrivacyData,
    tr: trPrivacyData,
  },
  terms: {
    en: enTermsData,
    tr: trTermsData,
  },
} as const;

/**
 * Retrieves all Amazon-specific services.
 *
 * @param locale - The locale to load content for (defaults to 'en')
 * @returns Array of Amazon services
 *
 * @example
 * ```ts
 * const services = getAmazonServices();
 * // Returns Service[] for Amazon platform
 *
 * const trServices = getAmazonServices('tr');
 * // Returns Turkish content
 * ```
 */
export function getAmazonServices(locale: Locale = DEFAULT_LOCALE): Service[] {
  return contentMaps.amazonServices[locale] as Service[];
}

/**
 * Retrieves all Etsy-specific services.
 *
 * @param locale - The locale to load content for (defaults to 'en')
 * @returns Array of Etsy services
 *
 * @example
 * ```ts
 * const services = getEtsyServices();
 * // Returns Service[] for Etsy platform
 * ```
 */
export function getEtsyServices(locale: Locale = DEFAULT_LOCALE): Service[] {
  return contentMaps.etsyServices[locale] as Service[];
}

/**
 * Pricing packages data structure from JSON file.
 */
interface PricingPackagesData {
  amazon: PricingPackage[];
  etsy: PricingPackage[];
}

/**
 * Retrieves all Amazon pricing packages.
 *
 * @param locale - The locale to load content for (defaults to 'en')
 * @returns Array of Amazon pricing packages sorted by tier
 *
 * @example
 * ```ts
 * const packages = getAmazonPricingPackages();
 * // Returns PricingPackage[] for Amazon platform
 * ```
 */
export function getAmazonPricingPackages(
  locale: Locale = DEFAULT_LOCALE
): PricingPackage[] {
  const data = contentMaps.pricing[locale] as PricingPackagesData;
  return data.amazon;
}

/**
 * Retrieves all Etsy pricing packages.
 *
 * @param locale - The locale to load content for (defaults to 'en')
 * @returns Array of Etsy pricing packages sorted by tier
 *
 * @example
 * ```ts
 * const packages = getEtsyPricingPackages();
 * // Returns PricingPackage[] for Etsy platform
 * ```
 */
export function getEtsyPricingPackages(
  locale: Locale = DEFAULT_LOCALE
): PricingPackage[] {
  const data = contentMaps.pricing[locale] as PricingPackagesData;
  return data.etsy;
}

/**
 * Retrieves all pricing packages for both platforms.
 *
 * @param locale - The locale to load content for (defaults to 'en')
 * @returns Object containing amazon and etsy pricing package arrays
 *
 * @example
 * ```ts
 * const { amazon, etsy } = getAllPricingPackages();
 * // Access packages for each platform
 * ```
 */
export function getAllPricingPackages(locale: Locale = DEFAULT_LOCALE): {
  amazon: PricingPackage[];
  etsy: PricingPackage[];
} {
  const data = contentMaps.pricing[locale] as PricingPackagesData;
  return {
    amazon: data.amazon,
    etsy: data.etsy,
  };
}

/**
 * About page content structure.
 */
export interface AboutContent {
  /** Hero section content */
  hero: { headline: string; subheadline: string };
  /** Mission section content */
  mission: { headline: string; text: string };
  /** Approach section content */
  approach: { headline: string; description: string; points: string[] };
  /** Team members array */
  team: TeamMember[];
  /** Experience highlights array */
  highlights: ExperienceHighlight[];
}

/**
 * Retrieves all About page content.
 *
 * @param locale - The locale to load content for (defaults to 'en')
 * @returns Complete About page content object
 *
 * @example
 * ```ts
 * const about = getAboutContent();
 * // Access about.mission, about.approach, etc.
 * ```
 */
export function getAboutContent(locale: Locale = DEFAULT_LOCALE): AboutContent {
  return contentMaps.about[locale] as AboutContent;
}

/**
 * Retrieves all team members.
 *
 * @param locale - The locale to load content for (defaults to 'en')
 * @returns Array of team members
 *
 * @example
 * ```ts
 * const team = getTeamMembers();
 * // Returns TeamMember[]
 * ```
 */
export function getTeamMembers(locale: Locale = DEFAULT_LOCALE): TeamMember[] {
  const about = getAboutContent(locale);
  return about.team;
}

/**
 * Retrieves experience highlights.
 *
 * @param locale - The locale to load content for (defaults to 'en')
 * @returns Array of experience highlights
 *
 * @example
 * ```ts
 * const highlights = getExperienceHighlights();
 * // Returns ExperienceHighlight[]
 * ```
 */
export function getExperienceHighlights(
  locale: Locale = DEFAULT_LOCALE
): ExperienceHighlight[] {
  const about = getAboutContent(locale);
  return about.highlights;
}

/**
 * Contact page content structure.
 */
export interface ContactContent {
  /** Hero section content */
  hero: { headline: string; subheadline: string };
  /** Contact information */
  contactInfo: { email: string; phone?: string; address?: string };
  /** Booking section content */
  booking: BookingContent;
}

/**
 * Retrieves all Contact page content.
 *
 * @param locale - The locale to load content for (defaults to 'en')
 * @returns Complete Contact page content object
 *
 * @example
 * ```ts
 * const contact = getContactContent();
 * // Access contact.hero, contact.contactInfo, etc.
 * ```
 */
export function getContactContent(
  locale: Locale = DEFAULT_LOCALE
): ContactContent {
  return contentMaps.contact[locale] as ContactContent;
}

/**
 * Retrieves all FAQ items.
 *
 * @param locale - The locale to load content for (defaults to 'en')
 * @returns Array of all FAQ items
 *
 * @example
 * ```ts
 * const faqs = getFAQs();
 * // Returns FAQ[]
 * ```
 */
export function getFAQs(locale: Locale = DEFAULT_LOCALE): FAQ[] {
  const data = contentMaps.faq[locale] as FAQPageContent;
  return data.faqs;
}

/**
 * Retrieves FAQ items filtered by category.
 *
 * @param category - The category to filter by
 * @param locale - The locale to load content for (defaults to 'en')
 * @returns Array of FAQs matching the category
 *
 * @example
 * ```ts
 * const pricingFaqs = getFAQsByCategory("pricing");
 * // Returns FAQ[] for pricing category only
 * ```
 */
export function getFAQsByCategory(
  category: FAQCategory,
  locale: Locale = DEFAULT_LOCALE
): FAQ[] {
  const faqs = getFAQs(locale);
  return faqs.filter((faq) => faq.category === category);
}

/**
 * Retrieves FAQ page content including hero and all FAQs.
 *
 * @param locale - The locale to load content for (defaults to 'en')
 * @returns Complete FAQ page content
 *
 * @example
 * ```ts
 * const { hero, faqs } = getFAQPageContent();
 * ```
 */
export function getFAQPageContent(
  locale: Locale = DEFAULT_LOCALE
): FAQPageContent {
  return contentMaps.faq[locale] as FAQPageContent;
}

/**
 * Retrieves Privacy Policy page content.
 *
 * @param locale - The locale to load content for (defaults to 'en')
 * @returns Complete Privacy Policy content including title, lastUpdated, introduction, and sections
 *
 * @example
 * ```ts
 * const privacy = getPrivacyPolicyContent();
 * // Access privacy.title, privacy.lastUpdated, privacy.sections
 * ```
 */
export function getPrivacyPolicyContent(
  locale: Locale = DEFAULT_LOCALE
): PrivacyPolicyContent {
  return contentMaps.privacy[locale] as PrivacyPolicyContent;
}

/**
 * Retrieves Terms of Service page content.
 *
 * @param locale - The locale to load content for (defaults to 'en')
 * @returns Complete Terms of Service content including title, lastUpdated, introduction, and sections
 *
 * @example
 * ```ts
 * const terms = getTermsOfServiceContent();
 * // Access terms.title, terms.lastUpdated, terms.sections
 * ```
 */
export function getTermsOfServiceContent(
  locale: Locale = DEFAULT_LOCALE
): TermsOfServiceContent {
  return contentMaps.terms[locale] as TermsOfServiceContent;
}
