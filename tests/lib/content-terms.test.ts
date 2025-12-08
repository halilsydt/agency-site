import { describe, it, expect } from "vitest";
import { getTermsOfServiceContent } from "@/lib/content";

describe("getTermsOfServiceContent", () => {
  it("returns valid terms of service content", () => {
    const content = getTermsOfServiceContent();
    expect(content).toBeDefined();
    expect(content.title).toBeTruthy();
    expect(content.lastUpdated).toBeTruthy();
    expect(content.introduction).toBeTruthy();
  });

  it("has lastUpdated in valid date format", () => {
    const content = getTermsOfServiceContent();
    // Check ISO date format (YYYY-MM-DD)
    expect(content.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("has sections array with expected structure", () => {
    const content = getTermsOfServiceContent();
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
    const content = getTermsOfServiceContent();
    const sectionIds = content.sections.map((s) => s.id);

    expect(sectionIds).toContain("services");
    expect(sectionIds).toContain("disclaimers");
    expect(sectionIds).toContain("liability");
    expect(sectionIds).toContain("intellectual-property");
    expect(sectionIds).toContain("termination");
    expect(sectionIds).toContain("governing-law");
    expect(sectionIds).toContain("contact");
  });

  it("has disclaimer content about results not guaranteed", () => {
    const content = getTermsOfServiceContent();
    const disclaimerSection = content.sections.find(
      (s) => s.id === "disclaimers"
    );
    expect(disclaimerSection).toBeDefined();

    const sectionText = disclaimerSection!.content.join(" ").toLowerCase();
    expect(sectionText).toContain("results");
  });

  it("returns English content by default", () => {
    const content = getTermsOfServiceContent();
    expect(content.title).toBe("Terms of Service");
  });

  it("accepts locale parameter", () => {
    const enContent = getTermsOfServiceContent("en");
    const trContent = getTermsOfServiceContent("tr");

    expect(enContent.title).toBeTruthy();
    expect(trContent.title).toBeTruthy();
  });
});
