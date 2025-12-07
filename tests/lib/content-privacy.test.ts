import { describe, it, expect } from "vitest";
import { getPrivacyPolicyContent } from "@/lib/content";

describe("getPrivacyPolicyContent", () => {
  it("returns valid privacy policy content", () => {
    const content = getPrivacyPolicyContent();
    expect(content).toBeDefined();
    expect(content.title).toBeTruthy();
    expect(content.lastUpdated).toBeTruthy();
    expect(content.introduction).toBeTruthy();
  });

  it("has lastUpdated in valid date format", () => {
    const content = getPrivacyPolicyContent();
    // Check ISO date format (YYYY-MM-DD)
    expect(content.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("has sections array with expected structure", () => {
    const content = getPrivacyPolicyContent();
    expect(Array.isArray(content.sections)).toBe(true);
    expect(content.sections.length).toBeGreaterThan(0);

    content.sections.forEach((section) => {
      expect(section.id).toBeTruthy();
      expect(section.title).toBeTruthy();
      expect(Array.isArray(section.content)).toBe(true);
      expect(section.content.length).toBeGreaterThan(0);
    });
  });

  it("includes required sections", () => {
    const content = getPrivacyPolicyContent();
    const sectionIds = content.sections.map((s) => s.id);

    expect(sectionIds).toContain("data-collection");
    expect(sectionIds).toContain("cookies");
    expect(sectionIds).toContain("third-party-services");
    expect(sectionIds).toContain("user-rights");
    expect(sectionIds).toContain("contact");
    expect(sectionIds).toContain("changes");
  });

  it("mentions third-party services in content", () => {
    const content = getPrivacyPolicyContent();
    const thirdPartySection = content.sections.find(
      (s) => s.id === "third-party-services"
    );
    expect(thirdPartySection).toBeDefined();

    const sectionText = thirdPartySection!.content.join(" ").toLowerCase();
    expect(sectionText).toContain("plausible");
    expect(sectionText).toContain("formspree");
    expect(sectionText).toContain("cal.com");
  });
});
