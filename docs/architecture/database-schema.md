# Database Schema

**This section is N/A for this project.**

There is no database. All content is stored in JSON files within the repository and processed at build time.

## Content Storage (File-Based)

Instead of database tables, we have JSON files:

| "Table" Equivalent | File Location | Structure |
|-------------------|---------------|-----------|
| Services | `content/services/amazon.json`, `content/services/etsy.json` | `Service[]` |
| Pricing | `content/pricing/packages.json` | `PricingPackage[]` |
| Testimonials | `content/testimonials.json` | `Testimonial[]` |
| FAQs | `content/faqs.json` | `FAQ[]` |
| Team | `content/team.json` | `TeamMember[]` |
| Results | `content/results.json` | `ResultProof[]` |
| Site Config | `content/site-config.json` | `SiteConfig` |

## Content Access Pattern

```typescript
// lib/content.ts

import amazonServices from '@/content/services/amazon.json';
import etsyServices from '@/content/services/etsy.json';
import packages from '@/content/pricing/packages.json';
import testimonials from '@/content/testimonials.json';
import faqs from '@/content/faqs.json';
import team from '@/content/team.json';
import results from '@/content/results.json';
import siteConfig from '@/content/site-config.json';

import type { Service, PricingPackage, Testimonial, FAQ, TeamMember, ResultProof, SiteConfig } from './types';

/**
 * Retrieves all Amazon services from the content store.
 * Services are sorted by display order.
 *
 * @returns Array of Amazon-specific services
 */
export const getAmazonServices = (): Service[] => amazonServices;

/**
 * Retrieves all Etsy services from the content store.
 * Services are sorted by display order.
 *
 * @returns Array of Etsy-specific services
 */
export const getEtsyServices = (): Service[] => etsyServices;

/**
 * Retrieves all services across both platforms.
 *
 * @returns Combined array of Amazon and Etsy services
 */
export const getAllServices = (): Service[] => [...amazonServices, ...etsyServices];

/**
 * Filters pricing packages by platform.
 *
 * @param platform - Optional platform filter ('amazon', 'etsy', or 'bundle')
 * @returns Filtered array of pricing packages, or all packages if no filter
 */
export const getPricingPackages = (platform?: 'amazon' | 'etsy' | 'bundle'): PricingPackage[] =>
  platform ? packages.filter(p => p.platform === platform) : packages;

/**
 * Retrieves all customer testimonials.
 *
 * @returns Array of testimonials
 */
export const getTestimonials = (): Testimonial[] => testimonials;

/**
 * Retrieves FAQs, optionally filtered by category.
 *
 * @param category - Optional category filter
 * @returns Filtered array of FAQs, or all FAQs if no filter
 */
export const getFAQs = (category?: string): FAQ[] =>
  category ? faqs.filter(f => f.category === category) : faqs;

/**
 * Retrieves all team members for the About page.
 *
 * @returns Array of team members
 */
export const getTeam = (): TeamMember[] => team;

/**
 * Retrieves all result proof items (dashboard screenshots).
 *
 * @returns Array of result proofs
 */
export const getResults = (): ResultProof[] => results;

/**
 * Retrieves the global site configuration.
 *
 * @returns Site configuration object
 */
export const getSiteConfig = (): SiteConfig => siteConfig;
```
