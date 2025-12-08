/**
 * @fileoverview TypeScript type definitions for the agency site.
 * Contains interfaces and types used throughout the application.
 */

/**
 * Represents a service offering for Amazon or Etsy sellers.
 * Used throughout the site for service cards, listings, and detail pages.
 */
export interface Service {
  /** Unique identifier for the service */
  id: string;
  /** Target marketplace platform */
  platform: "amazon" | "etsy";
  /** Display title for the service */
  title: string;
  /** Brief description shown on service cards */
  description: string;
  /** Icon name from the icon library */
  icon: string;
  /** List of features included in this service */
  features: string[];
}

/**
 * Represents a pricing package for Amazon or Etsy sellers.
 * Used on the pricing page to display package options with tiers.
 */
export interface PricingPackage {
  /** Unique identifier for the package */
  id: string;
  /** Target marketplace platform */
  platform: "amazon" | "etsy";
  /** Package tier level */
  tier: "starter" | "growth" | "premium";
  /** Display name for the package */
  name: string;
  /** Monthly price in dollars */
  price: number;
  /** Price unit display (e.g., "/month") */
  priceUnit: string;
  /** Brief description of the package */
  description: string;
  /** List of included features */
  features: string[];
  /** Whether this is the recommended package */
  isPopular?: boolean;
  /** CTA button text */
  ctaText: string;
  /** CTA button link destination */
  ctaHref: string;
}

/**
 * Represents a team member displayed on the About page.
 */
export interface TeamMember {
  /** Unique identifier for the team member */
  id: string;
  /** Team member's full name */
  name: string;
  /** Job title or role */
  role: string;
  /** Brief biography or description */
  bio: string;
  /** Optional URL to profile photo */
  imageUrl?: string;
}

/**
 * Represents an experience highlight/metric on the About page.
 */
export interface ExperienceHighlight {
  /** Unique identifier for the highlight */
  id: string;
  /** Label describing the metric (e.g., "Years Experience") */
  label: string;
  /** Value of the metric (e.g., "5+") */
  value: string;
  /** Optional lucide-react icon name */
  icon?: string;
}

/**
 * Contact form data structure.
 * Used for form submission to Formspree.
 */
export interface ContactFormData {
  /** Visitor's full name */
  name: string;
  /** Visitor's email address */
  email: string;
  /** Platform they're interested in */
  platform: "amazon" | "etsy" | "both";
  /** Their message or inquiry */
  message: string;
}

/**
 * Contact form submission status.
 */
export type ContactFormStatus = "idle" | "submitting" | "success" | "error";

/**
 * Booking section content for contact page.
 */
export interface BookingContent {
  /** Section headline */
  headline: string;
  /** Supporting description */
  subheadline: string;
}

/**
 * FAQ category for filtering.
 */
export type FAQCategory = "general" | "amazon" | "etsy" | "pricing";

/**
 * Represents a single FAQ item with category.
 */
export interface FAQ {
  /** Unique identifier for the FAQ */
  id: string;
  /** Category for filtering */
  category: FAQCategory;
  /** The question text */
  question: string;
  /** The answer text */
  answer: string;
}

/**
 * FAQ page hero content.
 */
export interface FAQPageContent {
  /** Hero section content */
  hero: { headline: string; subheadline: string };
  /** All FAQ items */
  faqs: FAQ[];
}

/**
 * Represents a section in a legal document (privacy policy, terms).
 */
export interface LegalSection {
  /** Section identifier */
  id: string;
  /** Section heading */
  title: string;
  /** Section content (array of paragraphs) */
  content: string[];
}

/**
 * Privacy Policy page content structure.
 */
export interface PrivacyPolicyContent {
  /** Page title */
  title: string;
  /** Last updated date (ISO format) */
  lastUpdated: string;
  /** Introduction text */
  introduction: string;
  /** Content sections */
  sections: LegalSection[];
}

/**
 * Terms of Service page content structure.
 */
export interface TermsOfServiceContent {
  /** Page title */
  title: string;
  /** Last updated date (ISO format) */
  lastUpdated: string;
  /** Introduction text */
  introduction: string;
  /** Content sections */
  sections: LegalSection[];
}

/**
 * Cookie consent status values.
 */
export type CookieConsentStatus = "pending" | "accepted" | "declined";

/**
 * Cookie consent state structure.
 */
export interface CookieConsentState {
  /** Current consent status */
  status: CookieConsentStatus;
  /** Timestamp when consent was given/denied */
  timestamp?: string;
}

/**
 * Supported locale codes for internationalization.
 * - 'en': English (default)
 * - 'tr': Turkish
 */
export type Locale = "en" | "tr";

/**
 * Array of all supported locale codes.
 * Used for validation and iteration over available locales.
 */
export const SUPPORTED_LOCALES: readonly Locale[] = ["en", "tr"] as const;

/**
 * Default locale used when no preference is set or locale is unsupported.
 */
export const DEFAULT_LOCALE: Locale = "en";
