/**
 * @fileoverview Content accessor functions for the agency site.
 * Provides type-safe access to JSON content files.
 * All components should use these functions instead of importing JSON directly.
 */

import amazonServicesData from "@/content/services/amazon.json";
import etsyServicesData from "@/content/services/etsy.json";
import pricingPackagesData from "@/content/pricing/packages.json";
import aboutData from "@/content/about.json";
import contactData from "@/content/contact.json";
import faqData from "@/content/faq.json";
import privacyData from "@/content/legal/privacy.json";
import termsData from "@/content/legal/terms.json";
import type { Service, PricingPackage, TeamMember, ExperienceHighlight, BookingContent, FAQ, FAQCategory, FAQPageContent, PrivacyPolicyContent, TermsOfServiceContent } from "./types";

/**
 * Retrieves all Amazon-specific services.
 *
 * @returns Array of Amazon services
 *
 * @example
 * ```ts
 * const services = getAmazonServices();
 * // Returns Service[] for Amazon platform
 * ```
 */
export function getAmazonServices(): Service[] {
  return amazonServicesData as Service[];
}

/**
 * Retrieves all Etsy-specific services.
 *
 * @returns Array of Etsy services
 *
 * @example
 * ```ts
 * const services = getEtsyServices();
 * // Returns Service[] for Etsy platform
 * ```
 */
export function getEtsyServices(): Service[] {
  return etsyServicesData as Service[];
}

/**
 * Retrieves all Amazon pricing packages.
 *
 * @returns Array of Amazon pricing packages sorted by tier
 *
 * @example
 * ```ts
 * const packages = getAmazonPricingPackages();
 * // Returns PricingPackage[] for Amazon platform
 * ```
 */
export function getAmazonPricingPackages(): PricingPackage[] {
  return pricingPackagesData.amazon as PricingPackage[];
}

/**
 * Retrieves all Etsy pricing packages.
 *
 * @returns Array of Etsy pricing packages sorted by tier
 *
 * @example
 * ```ts
 * const packages = getEtsyPricingPackages();
 * // Returns PricingPackage[] for Etsy platform
 * ```
 */
export function getEtsyPricingPackages(): PricingPackage[] {
  return pricingPackagesData.etsy as PricingPackage[];
}

/**
 * Retrieves all pricing packages for both platforms.
 *
 * @returns Object containing amazon and etsy pricing package arrays
 *
 * @example
 * ```ts
 * const { amazon, etsy } = getAllPricingPackages();
 * // Access packages for each platform
 * ```
 */
export function getAllPricingPackages(): {
  amazon: PricingPackage[];
  etsy: PricingPackage[];
} {
  return {
    amazon: getAmazonPricingPackages(),
    etsy: getEtsyPricingPackages(),
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
 * @returns Complete About page content object
 *
 * @example
 * ```ts
 * const about = getAboutContent();
 * // Access about.mission, about.approach, etc.
 * ```
 */
export function getAboutContent(): AboutContent {
  return aboutData as AboutContent;
}

/**
 * Retrieves all team members.
 *
 * @returns Array of team members
 *
 * @example
 * ```ts
 * const team = getTeamMembers();
 * // Returns TeamMember[]
 * ```
 */
export function getTeamMembers(): TeamMember[] {
  return aboutData.team as TeamMember[];
}

/**
 * Retrieves experience highlights.
 *
 * @returns Array of experience highlights
 *
 * @example
 * ```ts
 * const highlights = getExperienceHighlights();
 * // Returns ExperienceHighlight[]
 * ```
 */
export function getExperienceHighlights(): ExperienceHighlight[] {
  return aboutData.highlights as ExperienceHighlight[];
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
 * @returns Complete Contact page content object
 *
 * @example
 * ```ts
 * const contact = getContactContent();
 * // Access contact.hero, contact.contactInfo, etc.
 * ```
 */
export function getContactContent(): ContactContent {
  return contactData as ContactContent;
}

/**
 * Retrieves all FAQ items.
 *
 * @returns Array of all FAQ items
 *
 * @example
 * ```ts
 * const faqs = getFAQs();
 * // Returns FAQ[]
 * ```
 */
export function getFAQs(): FAQ[] {
  return faqData.faqs as FAQ[];
}

/**
 * Retrieves FAQ items filtered by category.
 *
 * @param category - The category to filter by
 * @returns Array of FAQs matching the category
 *
 * @example
 * ```ts
 * const pricingFaqs = getFAQsByCategory("pricing");
 * // Returns FAQ[] for pricing category only
 * ```
 */
export function getFAQsByCategory(category: FAQCategory): FAQ[] {
  return getFAQs().filter((faq) => faq.category === category);
}

/**
 * Retrieves FAQ page content including hero and all FAQs.
 *
 * @returns Complete FAQ page content
 *
 * @example
 * ```ts
 * const { hero, faqs } = getFAQPageContent();
 * ```
 */
export function getFAQPageContent(): FAQPageContent {
  return faqData as FAQPageContent;
}

/**
 * Retrieves Privacy Policy page content.
 *
 * @returns Complete Privacy Policy content including title, lastUpdated, introduction, and sections
 *
 * @example
 * ```ts
 * const privacy = getPrivacyPolicyContent();
 * // Access privacy.title, privacy.lastUpdated, privacy.sections
 * ```
 */
export function getPrivacyPolicyContent(): PrivacyPolicyContent {
  return privacyData as PrivacyPolicyContent;
}

/**
 * Retrieves Terms of Service page content.
 *
 * @returns Complete Terms of Service content including title, lastUpdated, introduction, and sections
 *
 * @example
 * ```ts
 * const terms = getTermsOfServiceContent();
 * // Access terms.title, terms.lastUpdated, terms.sections
 * ```
 */
export function getTermsOfServiceContent(): TermsOfServiceContent {
  return termsData as TermsOfServiceContent;
}
