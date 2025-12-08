import { describe, it, expect } from "vitest";
import {
  getAmazonServices,
  getEtsyServices,
  getAmazonPricingPackages,
  getEtsyPricingPackages,
  getAboutContent,
  getContactContent,
} from "@/lib/content";

describe("Content i18n", () => {
  describe("getAmazonServices", () => {
    it("returns English content by default", () => {
      const services = getAmazonServices();
      expect(services.length).toBeGreaterThan(0);
      expect(services[0].title).toBeTruthy();
    });

    it("returns content for English locale", () => {
      const services = getAmazonServices("en");
      expect(services.length).toBeGreaterThan(0);
      expect(services[0].platform).toBe("amazon");
    });

    it("returns content for Turkish locale", () => {
      const services = getAmazonServices("tr");
      expect(services.length).toBeGreaterThan(0);
      expect(services[0].platform).toBe("amazon");
    });
  });

  describe("getEtsyServices", () => {
    it("returns English content by default", () => {
      const services = getEtsyServices();
      expect(services.length).toBeGreaterThan(0);
      expect(services[0].title).toBeTruthy();
    });

    it("returns content for both locales", () => {
      const enServices = getEtsyServices("en");
      const trServices = getEtsyServices("tr");

      expect(enServices.length).toBeGreaterThan(0);
      expect(trServices.length).toBeGreaterThan(0);
      expect(enServices[0].platform).toBe("etsy");
      expect(trServices[0].platform).toBe("etsy");
    });
  });

  describe("getAmazonPricingPackages", () => {
    it("returns English content by default", () => {
      const packages = getAmazonPricingPackages();
      expect(packages.length).toBe(3); // starter, growth, premium
      expect(packages[0].platform).toBe("amazon");
    });

    it("returns content for both locales", () => {
      const enPackages = getAmazonPricingPackages("en");
      const trPackages = getAmazonPricingPackages("tr");

      expect(enPackages.length).toBe(3);
      expect(trPackages.length).toBe(3);
    });
  });

  describe("getEtsyPricingPackages", () => {
    it("returns English content by default", () => {
      const packages = getEtsyPricingPackages();
      expect(packages.length).toBe(3);
      expect(packages[0].platform).toBe("etsy");
    });

    it("returns content for both locales", () => {
      const enPackages = getEtsyPricingPackages("en");
      const trPackages = getEtsyPricingPackages("tr");

      expect(enPackages.length).toBe(3);
      expect(trPackages.length).toBe(3);
    });
  });

  describe("getAboutContent", () => {
    it("returns English content by default", () => {
      const about = getAboutContent();
      expect(about.hero.headline).toBeTruthy();
      expect(about.team.length).toBeGreaterThan(0);
    });

    it("returns content for both locales", () => {
      const enAbout = getAboutContent("en");
      const trAbout = getAboutContent("tr");

      expect(enAbout.hero.headline).toBeTruthy();
      expect(trAbout.hero.headline).toBeTruthy();
    });
  });

  describe("getContactContent", () => {
    it("returns English content by default", () => {
      const contact = getContactContent();
      expect(contact.hero.headline).toBeTruthy();
      expect(contact.contactInfo.email).toBeTruthy();
    });

    it("returns content for both locales", () => {
      const enContact = getContactContent("en");
      const trContact = getContactContent("tr");

      expect(enContact.hero.headline).toBeTruthy();
      expect(trContact.hero.headline).toBeTruthy();
    });
  });

  describe("fallback behavior", () => {
    it("all content functions return valid data for supported locales", () => {
      const locales = ["en", "tr"] as const;

      locales.forEach((locale) => {
        const amazonServices = getAmazonServices(locale);
        const etsyServices = getEtsyServices(locale);
        const amazonPackages = getAmazonPricingPackages(locale);
        const etsyPackages = getEtsyPricingPackages(locale);
        const about = getAboutContent(locale);
        const contact = getContactContent(locale);

        expect(amazonServices.length).toBeGreaterThan(0);
        expect(etsyServices.length).toBeGreaterThan(0);
        expect(amazonPackages.length).toBe(3);
        expect(etsyPackages.length).toBe(3);
        expect(about.hero.headline).toBeTruthy();
        expect(contact.hero.headline).toBeTruthy();
      });
    });
  });
});
