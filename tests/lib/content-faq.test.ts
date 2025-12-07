import { describe, it, expect } from "vitest";
import { getFAQs, getFAQsByCategory, getFAQPageContent } from "@/lib/content";

describe("FAQ Content Accessors", () => {
  it("getFAQs returns all FAQs", () => {
    const faqs = getFAQs();
    expect(Array.isArray(faqs)).toBe(true);
    expect(faqs.length).toBeGreaterThanOrEqual(8);
  });

  it("getFAQs returns items with correct structure", () => {
    const faqs = getFAQs();
    faqs.forEach((faq) => {
      expect(faq).toHaveProperty("id");
      expect(faq).toHaveProperty("category");
      expect(faq).toHaveProperty("question");
      expect(faq).toHaveProperty("answer");
    });
  });

  it("getFAQsByCategory returns filtered FAQs for pricing", () => {
    const pricingFaqs = getFAQsByCategory("pricing");
    expect(Array.isArray(pricingFaqs)).toBe(true);
    expect(pricingFaqs.length).toBeGreaterThan(0);
    pricingFaqs.forEach((faq) => {
      expect(faq.category).toBe("pricing");
    });
  });

  it("getFAQsByCategory returns filtered FAQs for amazon", () => {
    const amazonFaqs = getFAQsByCategory("amazon");
    expect(Array.isArray(amazonFaqs)).toBe(true);
    expect(amazonFaqs.length).toBeGreaterThan(0);
    amazonFaqs.forEach((faq) => {
      expect(faq.category).toBe("amazon");
    });
  });

  it("getFAQsByCategory returns filtered FAQs for etsy", () => {
    const etsyFaqs = getFAQsByCategory("etsy");
    expect(Array.isArray(etsyFaqs)).toBe(true);
    expect(etsyFaqs.length).toBeGreaterThan(0);
    etsyFaqs.forEach((faq) => {
      expect(faq.category).toBe("etsy");
    });
  });

  it("getFAQsByCategory returns filtered FAQs for general", () => {
    const generalFaqs = getFAQsByCategory("general");
    expect(Array.isArray(generalFaqs)).toBe(true);
    expect(generalFaqs.length).toBeGreaterThan(0);
    generalFaqs.forEach((faq) => {
      expect(faq.category).toBe("general");
    });
  });

  it("getFAQPageContent returns hero content", () => {
    const content = getFAQPageContent();
    expect(content.hero).toBeDefined();
    expect(content.hero.headline).toBeDefined();
    expect(typeof content.hero.headline).toBe("string");
    expect(content.hero.subheadline).toBeDefined();
    expect(typeof content.hero.subheadline).toBe("string");
  });

  it("getFAQPageContent returns faqs array", () => {
    const content = getFAQPageContent();
    expect(Array.isArray(content.faqs)).toBe(true);
    expect(content.faqs.length).toBeGreaterThanOrEqual(8);
  });

  it("all categories have at least one FAQ", () => {
    const categories = ["general", "amazon", "etsy", "pricing"] as const;
    categories.forEach((category) => {
      const faqs = getFAQsByCategory(category);
      expect(faqs.length).toBeGreaterThan(0);
    });
  });
});
