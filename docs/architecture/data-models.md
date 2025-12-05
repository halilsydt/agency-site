# Data Models

Since this is a static marketing site with no database, our "data models" are the **content structures** stored in JSON files that get processed at build time.

## Content Model

**Purpose:** Represents all editable content on the site that non-technical stakeholders may need to update.

**Key Attributes:**
- `services`: Service[] - List of services for Amazon and Etsy pages
- `pricing`: PricingPackage[] - Pricing tiers for each platform
- `testimonials`: Testimonial[] - Customer reviews
- `faqs`: FAQ[] - Frequently asked questions
- `team`: TeamMember[] - About page team info
- `siteConfig`: SiteConfig - Global site settings

## TypeScript Interfaces

```typescript
// content/types.ts

/**
 * Represents a service offering for Amazon or Etsy sellers.
 * Used throughout the site for service cards, listings, and detail pages.
 */
export interface Service {
  /** Unique identifier for the service */
  id: string;
  /** Target marketplace platform */
  platform: 'amazon' | 'etsy';
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
 * Pricing package for a specific platform or bundle.
 * Displayed on the pricing page and pricing preview sections.
 */
export interface PricingPackage {
  /** Unique identifier for the package */
  id: string;
  /** Platform this package applies to, or 'bundle' for multi-platform */
  platform: 'amazon' | 'etsy' | 'bundle';
  /** Package tier name (e.g., "Starter", "Growth", "Premium") */
  name: string;
  /** Price in USD (whole dollars) */
  price: number;
  /** Formatted price label for display (e.g., "$499/mo") */
  priceLabel: string;
  /** Brief package description */
  description: string;
  /** List of features included in the package */
  features: string[];
  /** Whether to highlight this as the recommended option */
  isPopular?: boolean;
  /** Call-to-action button text */
  ctaText: string;
  /** Call-to-action button link */
  ctaLink: string;
}

/**
 * Customer testimonial for social proof.
 * Displayed on homepage and potentially dedicated testimonials section.
 */
export interface Testimonial {
  /** Unique identifier for the testimonial */
  id: string;
  /** The testimonial quote text */
  quote: string;
  /** Customer's name (can be anonymized) */
  authorName: string;
  /** Customer's business name (optional) */
  authorBusiness?: string;
  /** Platform the customer sells on */
  platform: 'amazon' | 'etsy';
  /** URL to customer's avatar image (optional) */
  avatarUrl?: string;
}

/**
 * Frequently asked question item.
 * Displayed in FAQ accordion on homepage preview and dedicated FAQ page.
 */
export interface FAQ {
  /** Unique identifier for the FAQ */
  id: string;
  /** The question text */
  question: string;
  /** The answer text (supports markdown) */
  answer: string;
  /** Optional category for grouping */
  category?: 'general' | 'amazon' | 'etsy' | 'pricing';
}

/**
 * Team member information for About page.
 */
export interface TeamMember {
  /** Unique identifier for the team member */
  id: string;
  /** Team member's name */
  name: string;
  /** Job title or role */
  role: string;
  /** Brief biography */
  bio: string;
  /** URL to profile image (optional) */
  imageUrl?: string;
  /** Social media links (optional) */
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
}

/**
 * Dashboard screenshot or result proof.
 * Displayed in the Results/Proof section to demonstrate real client outcomes.
 */
export interface ResultProof {
  /** Unique identifier for the result */
  id: string;
  /** Platform the result is from */
  platform: 'amazon' | 'etsy';
  /** URL to the dashboard screenshot image */
  imageUrl: string;
  /** Alt text for accessibility */
  altText: string;
  /** Caption describing the result (e.g., "3x sales growth in 6 months") */
  caption: string;
}

/**
 * Global site configuration.
 * Contains settings used across multiple pages.
 */
export interface SiteConfig {
  /** Site name for branding */
  siteName: string;
  /** Tagline displayed in footer and meta */
  tagline: string;
  /** Primary contact email */
  contactEmail: string;
  /** Contact phone number (optional) */
  phone?: string;
  /** Physical address (optional) */
  address?: string;
  /** Social media profile links */
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  /** Cal.com booking URL */
  calendarBookingUrl: string;
  /** Formspree form endpoint */
  formspreeEndpoint: string;
  /** ConvertKit/email signup endpoint */
  emailSignupEndpoint: string;
}
```

## Relationships

- `Service` → belongs to a `platform` (amazon/etsy)
- `PricingPackage` → belongs to a `platform` (amazon/etsy/bundle)
- `Testimonial` → associated with a `platform`
- `FAQ` → optionally categorized by topic
- `ResultProof` → associated with a `platform`

## Content File Structure

```
content/
├── services/
│   ├── amazon.json       # Amazon services array
│   └── etsy.json         # Etsy services array
├── pricing/
│   └── packages.json     # All pricing packages
├── testimonials.json     # Customer testimonials
├── faqs.json             # FAQ items
├── team.json             # Team members
├── results.json          # Dashboard screenshots/proofs
└── site-config.json      # Global site configuration
```
